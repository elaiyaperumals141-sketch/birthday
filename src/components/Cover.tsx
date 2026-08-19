import { useMemo, useState } from "react";
import { cn } from "../utils/cn";
import { usePrefersReducedMotion } from "../hooks/useInView";
import {
  Bow,
  Butterfly,
  Flower,
  Grain,
  Pearl,
  PearlString,
  SparkleBurst,
  Squiggle,
  Tape,
  v,
} from "./decor";

export default function Cover({ onDone }: { onDone: () => void }) {
  const reduced = usePrefersReducedMotion();
  const [opening, setOpening] = useState(false);

  const hearts = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        left: 22 + Math.random() * 56,
        top: 48 + Math.random() * 18,
        hx: Math.random() * 80 - 40,
        hr: Math.random() * 60 - 30,
        delay: i * 70,
        size: 12 + Math.random() * 10,
      })),
    [],
  );

  const open = () => {
    if (opening) return;
    if (reduced) {
      onDone();
      return;
    }
    setOpening(true);
    window.setTimeout(onDone, 1400);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 90% at 50% 8%, #fbf7ee 0%, #f6f0e3 45%, #eee1c8 100%)",
      }}
    >
      <Grain />

      {/* torn blush bands */}
      <div aria-hidden className="torn-top absolute -top-12 left-0 h-28 w-full bg-blush/35" />
      <div
        aria-hidden
        className="torn-top absolute -bottom-20 left-0 h-36 w-full rotate-180 bg-blush-soft/70"
      />

      {/* loose paper behind the card */}
      <div
        aria-hidden
        className="torn-a absolute left-1/2 top-1/2 h-[420px] w-[300px] -translate-x-1/2 -translate-y-1/2 rotate-[4deg] bg-paper-2/80"
      />

      {/* scattered keepsakes */}
      <Flower variant={1} className="absolute left-5 top-24 w-16 -rotate-24 opacity-90" />
      <Flower variant={0} className="absolute bottom-24 right-4 w-20 rotate-12 opacity-90" />
      <span className="butterfly-float absolute right-8 top-16">
        <Butterfly className="w-10" />
      </span>
      <PearlString className="absolute bottom-14 left-7 -rotate-6" />

      {/* the journal front page */}
      <div className="relative z-10 flex min-h-full items-center justify-center px-6">
        <div
          className={cn(
            "relative w-full max-w-[330px] -rotate-1 rounded-[6px] bg-cream p-7 pb-8 paper-shadow",
            opening && "cover-fold",
          )}
        >
          <Tape className="absolute -top-3.5 left-1/2 w-28 -translate-x-1/2 rotate-2" />
          <Tape blush className="absolute -bottom-3.5 left-6 w-20 -rotate-12" />
          <Tape blush className="absolute -bottom-3.5 right-6 w-20 rotate-10" />
          <Bow className="absolute -right-5 -top-7 w-14 rotate-12 text-ink" />
          <Pearl size={9} className="absolute -left-1.5 top-10" />
          <Pearl size={7} className="absolute -left-2.5 top-20" />

          {/* seal */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-blush-deep/60 bg-blush-soft">
            <span className="font-script text-4xl font-semibold text-blush-deep">A</span>
          </div>

          <h1 className="mt-5 text-center font-hand text-[46px] font-bold leading-none">
            Hey Akka... 🤍
          </h1>
          <p className="mt-2 text-center font-hand text-[24px] font-medium text-ink-soft">
            Unakkaga oru small surprise...
          </p>

          <Squiggle className="mx-auto mt-4 w-24 text-blush-deep" />

          <button
            onClick={open}
            className="group relative mx-auto mt-7 block rounded-full bg-ink px-9 py-3.5 font-hand text-[25px] font-semibold text-paper transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_28px_-10px_rgba(38,32,25,0.5)] active:translate-y-0"
          >
            Open Your Surprise 🎀
            <span className="absolute inset-0 -z-10 -scale-100 rounded-full border border-blush/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </button>

          <p className="mt-6 text-center font-serif2 text-[13.5px] italic tracking-wide text-ink-soft/85">
            tap when you're ready · best experienced with sound 🎧
          </p>

          {/* opening burst */}
          {opening && (
            <>
              <SparkleBurst count={18} />
              {hearts.map((h, i) => (
                <span
                  key={i}
                  aria-hidden
                  className="cover-heart absolute"
                  style={v({
                    left: `${h.left}%`,
                    top: `${h.top}%`,
                    animationDelay: `${h.delay}ms`,
                    "--hx": `${h.hx}px`,
                    "--hr": `${h.hr}deg`,
                  })}
                >
                  <svg viewBox="0 0 24 24" style={{ width: h.size, height: h.size }}>
                    <path
                      d="M12 20.7 C 7 17 3.2 13.4 2.4 9.6 C 1.7 6 4.2 3.4 7.2 3.4 C 9.2 3.4 11 4.5 12 6.1 C 13 4.5 14.8 3.4 16.8 3.4 C 19.8 3.4 22.3 6 21.6 9.6 C 20.8 13.4 17 17 12 20.7 Z"
                      fill="#e5aeb6"
                    />
                  </svg>
                </span>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
