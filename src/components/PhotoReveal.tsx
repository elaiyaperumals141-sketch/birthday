import { useRef, useState } from "react";
import {
  compressImage,
  loadMainPhoto,
  saveMainPhoto,
} from "../lib/store";
import {
  Bow,
  Butterfly,
  CameraIcon,
  Flower,
  Paperclip,
  Pearl,
  Reveal,
  Squiggle,
  Tape,
} from "./decor";

export default function PhotoReveal() {
  const [src, setSrc] = useState<string | null>(
    () => loadMainPhoto() ?? "/images/sister.jpg",
  );
  const [missing, setMissing] = useState(false);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const showPhoto = !!src && !missing;

  const onPick = async (file: File | undefined) => {
    if (!file || busy) return;
    setBusy(true);
    try {
      const url = await compressImage(file);
      saveMainPhoto(url);
      setSrc(url);
      setMissing(false);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="relative px-5 pb-14 pt-16">
      {/* chapter marker */}
      <Reveal className="mb-10 flex items-center gap-4">
        <span className="h-px flex-1 bg-ink/15" />
        <p className="font-serif2 text-[13px] font-medium italic tracking-[0.22em] text-ink-soft">
          chapter i — the girl herself
        </p>
        <span className="h-px flex-1 bg-ink/15" />
      </Reveal>

      {/* the polaroid */}
      <Reveal from={-6} to={0} className="relative mx-auto max-w-[320px]">
        {/* loose paper behind */}
        <div aria-hidden className="torn-a absolute -inset-3 rotate-3 bg-blush-soft/75" />
        <div aria-hidden className="torn-a absolute -inset-2 -rotate-2 bg-paper-2/90" />

        <div className="paper-shadow relative -rotate-2 bg-[#fffdf8] p-2.5 pb-4">
          <Tape className="absolute -top-3.5 -left-6 -rotate-[38deg]" />
          <Tape blush className="absolute -top-3.5 -right-6 rotate-[36deg]" />
          <Paperclip className="absolute -left-3.5 top-16 w-7 rotate-[18deg]" />

          <div className="relative aspect-[4/5] overflow-hidden bg-paper-2">
            {showPhoto ? (
              <img
                src={src}
                alt="My dearest akka, on her day"
                onError={() => setMissing(true)}
                className="photo-breathe h-full w-full object-cover"
              />
            ) : (
              <button
                onClick={() => inputRef.current?.click()}
                className="flex h-full w-full flex-col items-center justify-center gap-3 border-[3px] border-dashed border-ink/25 bg-[#f3ead8] p-6 text-center transition-colors duration-300 hover:border-blush-deep"
              >
                <CameraIcon className="h-10 w-10 text-ink/45" />
                <span className="font-hand text-[24px] font-semibold leading-tight">
                  {busy ? "pinning it down…" : "Tap to add Akka's photo 🤍"}
                </span>
                <span className="font-serif2 text-[12.5px] italic text-ink-soft">
                  stays private · on this device only
                </span>
              </button>
            )}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 shadow-[inset_0_0_42px_rgba(120,90,60,0.16)]"
            />
          </div>

          <p className="mt-3 text-center font-hand text-[27px] font-semibold leading-tight">
            Just a girl,
            <br />
            building her dreams... 🤍
          </p>

          {showPhoto && (
            <button
              onClick={() => inputRef.current?.click()}
              className="mx-auto mt-1 block font-serif2 text-[12px] italic text-ink-soft/70 underline decoration-dashed underline-offset-2 transition-colors hover:text-blush-deep"
            >
              replace photo
            </button>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => {
            onPick(e.target.files?.[0]);
            e.target.value = "";
          }}
        />

        {/* keepsakes around the frame */}
        <Bow className="absolute -right-6 top-9 w-12 rotate-[14deg] text-ink" />
        <Flower variant={0} className="absolute -left-9 -top-8 w-16 -rotate-[24deg]" />
        <Flower variant={1} className="absolute -bottom-9 -right-7 w-16 rotate-12" />
        <Pearl size={10} className="absolute -bottom-3 left-8" />
        <Pearl size={7} className="absolute -bottom-5 left-16" />
        <span className="butterfly-float absolute -left-7 bottom-12">
          <Butterfly className="w-9" />
        </span>
        <span
          className="butterfly-float absolute -bottom-7 -left-2"
          style={{ animationDelay: "-4.2s" }}
        >
          <Butterfly className="w-7" tone="#d9b48f" />
        </span>
      </Reveal>

      {/* handwritten note */}
      <Reveal delay={160} from={5} to={1.4} className="relative mx-auto mt-14 max-w-[330px]">
        <div className="torn-a card-shadow relative bg-[#f9f2e2] px-6 py-7">
          <Tape blush className="absolute -top-3.5 left-1/2 w-24 -translate-x-1/2 rotate-2" />
          <p className="text-center font-hand text-[30px] font-semibold leading-snug">
            "Enakku romba special-aana
            <br />
            oru person." 🤍
          </p>
        </div>
      </Reveal>

      <Squiggle className="mx-auto mt-12 w-20 text-blush-deep/60" />
    </section>
  );
}
