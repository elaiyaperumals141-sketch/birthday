import { useEffect, useRef, useState } from "react";
import { cn } from "../utils/cn";
import {
  fileToDataUrl,
  loadCustomAudio,
  saveCustomAudio,
} from "../lib/store";
import { NoteIcon, PlusIcon } from "./decor";

/* soft "music box" rendition of Happy Birthday, used when no file is found */
const BEAT = 0.42;
const NOTE_DATA: [number, number][] = [
  [392.0, 0.5], [392.0, 0.5], [440.0, 1], [392.0, 1], [523.25, 1], [493.88, 2],
  [392.0, 0.5], [392.0, 0.5], [440.0, 1], [392.0, 1], [587.33, 1], [523.25, 2],
  [392.0, 0.5], [392.0, 0.5], [783.99, 1], [659.25, 1], [523.25, 1], [493.88, 1], [440.0, 2],
  [698.46, 0.5], [698.46, 0.5], [659.25, 1], [523.25, 1], [587.33, 1], [523.25, 2],
];
const SEQ = (() => {
  let t = 0;
  return NOTE_DATA.map(([f, b]) => {
    const n = { f, t: t * BEAT };
    t += b;
    return n;
  });
})();
const SONG_END = SEQ[SEQ.length - 1].t + 1.6;

type AudioCtx = AudioContext;

export default function MusicButton() {
  const [playing, setPlaying] = useState(false);
  const [customName, setCustomName] = useState<string | null>(null);
  const [ready, setReady] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioCtx | null>(null);
  const timerRef = useRef<number | null>(null);
  const customRef = useRef<string | null>(loadCustomAudio());

  useEffect(() => () => kill(), []);

  function kill() {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (ctxRef.current) {
      ctxRef.current.close().catch(() => {});
      ctxRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }
  }

  function startSynth() {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    const ctx = new Ctor();
    ctxRef.current = ctx;

    const master = ctx.createGain();
    master.gain.value = 0.22;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 3400;
    master.connect(lp);
    lp.connect(ctx.destination);

    const playPass = (t0: number) => {
      for (const n of SEQ) {
        const t = t0 + n.t;
        const o = ctx.createOscillator();
        o.type = "sine";
        o.frequency.value = n.f;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.55, t + 0.012);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 1.6);
        o.connect(g);
        g.connect(master);
        o.start(t);
        o.stop(t + 1.7);

        const o2 = ctx.createOscillator();
        o2.type = "sine";
        o2.frequency.value = n.f * 2.76;
        const g2 = ctx.createGain();
        g2.gain.setValueAtTime(0.0001, t);
        g2.gain.exponentialRampToValueAtTime(0.11, t + 0.008);
        g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
        o2.connect(g2);
        g2.connect(master);
        o2.start(t);
        o2.stop(t + 0.6);
      }
    };

    playPass(ctx.currentTime + 0.08);
    const loop = () => {
      const wait = (SONG_END - ctx.currentTime + 1.4) * 1000;
      timerRef.current = window.setTimeout(() => {
        if (ctxRef.current !== ctx) return;
        playPass(ctx.currentTime + 0.05);
        loop();
      }, Math.max(wait, 300));
    };
    loop();
  }

  function start() {
    const custom = customRef.current;
    if (custom) {
      const a = new Audio(custom);
      a.loop = true;
      a.volume = 0.85;
      audioRef.current = a;
      a.play().catch(() => startSynth());
      return;
    }
    fetch("/music/birthday.mp3", { method: "HEAD" })
      .then((r) => {
        if (r.ok) {
          const a = new Audio("/music/birthday.mp3");
          a.loop = true;
          a.volume = 0.9;
          audioRef.current = a;
          a.play().catch(() => startSynth());
        } else {
          startSynth();
        }
      })
      .catch(() => startSynth());
  }

  const toggle = () => {
    if (playing) {
      kill();
      setPlaying(false);
    } else {
      start();
      setPlaying(true);
    }
  };

  const onSong = async (file: File | undefined) => {
    if (!file) return;
    const url = await fileToDataUrl(file);
    customRef.current = url;
    saveCustomAudio(url);
    setCustomName(file.name);
    kill();
    setReady(true);
    start();
    setPlaying(true);
  };

  return (
    <div className="fixed bottom-5 right-4 z-40 flex items-center gap-2.5">
      <label
        htmlFor="sb-song"
        title={
          customName
            ? `your song: ${customName}`
            : "add your own song (plays from next tap)"
        }
        className={cn(
          "card-shadow flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border transition-transform duration-200 hover:-translate-y-0.5",
          customName ? "border-blush-deep/50 bg-blush-soft text-blush-deep" : "border-ink/25 bg-cream/95 text-ink",
        )}
      >
        <PlusIcon className="h-4 w-4" />
        <input
          id="sb-song"
          type="file"
          accept="audio/*"
          className="sr-only"
          onChange={(e) => {
            onSong(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
      </label>

      <button
        onClick={toggle}
        disabled={!ready}
        aria-label={playing ? "Pause music" : "Play music"}
        title={playing ? "pause the song" : "play the song"}
        className={cn(
          "card-shadow relative flex h-14 w-14 items-center justify-center rounded-full border transition-all duration-300",
          playing
            ? "border-ink bg-ink text-paper"
            : "border-ink/25 bg-cream/95 text-ink hover:-translate-y-0.5",
        )}
      >
        {playing && (
          <span
            aria-hidden
            className="spin-slow absolute -inset-1.5 rounded-full border border-dashed border-blush-deep/70"
          />
        )}
        {playing ? (
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
            <rect x="6.5" y="5" width="3.6" height="14" rx="1" fill="currentColor" />
            <rect x="13.9" y="5" width="3.6" height="14" rx="1" fill="currentColor" />
          </svg>
        ) : (
          <NoteIcon className="h-6 w-6" />
        )}
      </button>
    </div>
  );
}
