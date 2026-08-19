import { useState } from "react";
import { cn } from "../utils/cn";
import {
  compressImage,
  loadMems,
  saveMemCap,
  saveMemPhoto,
  type Mem,
} from "../lib/store";
import { Bow, CameraIcon, Paperclip, Reveal, Squiggle, Tape } from "./decor";

export default function Memories() {
  const [mems, setMems] = useState<Mem[]>(() => loadMems());
  const [editing, setEditing] = useState<number | null>(null);

  const addPhoto = async (i: number, file: File | undefined) => {
    if (!file) return;
    try {
      const url = await compressImage(file, 1000, 0.78);
      saveMemPhoto(i, url);
      setMems((m) => m.map((x, j) => (j === i ? { ...x, src: url } : x)));
    } catch {
      /* ignore */
    }
  };

  const setCap = (i: number, cap: string) => {
    setMems((m) => m.map((x, j) => (j === i ? { ...x, cap } : x)));
    saveMemCap(i, cap);
  };

  return (
    <section className="relative px-5 py-16">
      <Reveal className="mb-12 text-center">
        <p className="font-serif2 text-[13px] font-medium italic tracking-[0.22em] text-ink-soft">
          chapter iii — the photo album
        </p>
        <h2 className="mt-4 font-script text-[52px] font-bold leading-none">
          Our Little Memories <span className="align-middle text-4xl">📸</span>
        </h2>
        <Squiggle className="mx-auto mt-4 w-28 text-blush-deep" />
        <p className="mt-4 font-serif2 text-[13.5px] italic text-ink-soft">
          tap a frame to add our photos · tap the note to write on it
        </p>
      </Reveal>

      <div className="mt-6 space-y-12">
        {mems.map((m, i) => (
          <Reveal
            key={i}
            delay={i * 110}
            from={i % 2 ? 5 : -5}
            to={i % 2 ? 2 : -2}
            className={cn(
              "relative mx-auto w-full max-w-[290px]",
              i % 2 ? "ml-auto mr-3" : "ml-3 mr-auto",
            )}
          >
            <div className="card-shadow relative bg-[#fffdf8] p-2 pb-3">
              {i % 2 === 0 ? (
                <Tape className="absolute -top-3.5 left-6 w-24 -rotate-6" />
              ) : (
                <Tape blush className="absolute -top-3.5 right-6 w-24 rotate-6" />
              )}

              <div className="relative aspect-square overflow-hidden bg-paper-2">
                {m.src ? (
                  <img src={m.src} alt={`Memory ${i + 1} with akka`} className="h-full w-full object-cover" />
                ) : (
                  <label
                    htmlFor={`mem-photo-${i}`}
                    className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 border-[3px] border-dashed border-ink/20 p-5 text-center transition-colors duration-300 hover:border-blush-deep"
                  >
                    <CameraIcon className="h-9 w-9 text-ink/45" />
                    <span className="font-hand text-[22px] font-semibold">add our photo</span>
                    <span className="font-serif2 text-[11.5px] italic text-ink-soft">
                      frame {i + 1}
                    </span>
                  </label>
                )}
                <input
                  id={`mem-photo-${i}`}
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => {
                    addPhoto(i, e.target.files?.[0]);
                    e.target.value = "";
                  }}
                />
              </div>

              <div className="mt-2.5 px-1">
                {editing === i ? (
                  <input
                    autoFocus
                    value={m.cap}
                    onChange={(e) => setCap(i, e.target.value)}
                    onBlur={() => setEditing(null)}
                    onKeyDown={(e) => e.key === "Enter" && (e.target as HTMLInputElement).blur()}
                    aria-label={`Caption for memory ${i + 1}`}
                    className="w-full border-b border-dashed border-blush-deep/50 bg-transparent text-center font-hand text-[23px] font-semibold outline-none"
                  />
                ) : (
                  <button
                    onClick={() => setEditing(i)}
                    className="block w-full text-center font-hand text-[23px] font-semibold leading-snug transition-colors hover:text-blush-deep"
                  >
                    {m.cap}
                  </button>
                )}
              </div>
            </div>

            {i === 1 && <Paperclip className="absolute -left-3.5 top-10 w-6 rotate-[20deg]" />}
            {i === 2 && <Bow className="absolute -right-4 -top-5 w-10 rotate-[10deg] text-ink" />}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
