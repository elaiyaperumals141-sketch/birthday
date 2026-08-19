import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { useInView, usePrefersReducedMotion } from "../hooks/useInView";
import { Bow, Butterfly, Glitter, Reveal } from "./decor";

const COLORS = ["#e5aeb6", "#f4dbe0", "#c07f8d", "#b98f52", "#fffaf0", "#262019"];

const HEART_SHAPE = confetti.shapeFromPath(
  "M12 20.7 C 7 17 3.2 13.4 2.4 9.6 C 1.7 6 4.2 3.4 7.2 3.4 C 9.2 3.4 11 4.5 12 6.1 C 13 4.5 14.8 3.4 16.8 3.4 C 19.8 3.4 22.3 6 21.6 9.6 C 20.8 13.4 17 17 12 20.7 Z",
);

export default function Birthday() {
  const { ref, inView } = useInView<HTMLDivElement>(0.35);
  const fired = useRef(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!inView || fired.current) return;
    fired.current = true;
    if (reduced) return;
    const base = {
      colors: COLORS,
      disableForReducedMotion: true,
      scalar: 0.8,
      ticks: 220,
    } as const;

    confetti({
      ...base,
      particleCount: 80,
      spread: 100,
      startVelocity: 26,
      gravity: 0.62,
      origin: { x: 0.5, y: 0.3 },
      shapes: [HEART_SHAPE, "circle", "star"],
    });
    window.setTimeout(() => {
      confetti({
        ...base,
        particleCount: 45,
        angle: 62,
        spread: 55,
        startVelocity: 44,
        gravity: 0.9,
        origin: { x: 0.02, y: 0.66 },
      });
      confetti({
        ...base,
        particleCount: 45,
        angle: 118,
        spread: 55,
        startVelocity: 44,
        gravity: 0.9,
        origin: { x: 0.98, y: 0.66 },
      });
    }, 280);
  }, [inView, reduced]);

  return (
    <section ref={ref} className="relative overflow-x-clip px-5 py-24">
      <Glitter count={14} />

      {/* torn blush sheet behind the words */}
      <div
        aria-hidden
        className="torn-big absolute inset-x-[-10%] top-1/2 h-72 -translate-y-1/2 -rotate-2 bg-blush-soft/60"
      />

      <div className="relative z-10 text-center">
        <Reveal>
          <p className="font-serif2 text-[13px] font-medium italic tracking-[0.3em] text-blush-deep">
            — it's her day —
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div aria-hidden className="bob my-5 text-6xl">
            🎂
          </div>
        </Reveal>

        <Reveal delay={200} from={-4} to={0}>
          <h2 className="font-script text-[62px] font-bold leading-[0.9] tracking-wide">
            HAPPY
            <br />
            BIRTHDAY
          </h2>
        </Reveal>

        <Reveal delay={340} from={4} to={-1}>
          <div className="mt-3">
            <span className="hl font-script text-[92px] font-bold leading-none text-ink">
              AKKA
            </span>
          </div>
        </Reveal>

        <Reveal delay={440}>
          <p className="mt-4 text-4xl leading-none">🤍</p>
        </Reveal>

        <Reveal delay={560}>
          <p className="mt-8 font-serif2 text-[14px] italic tracking-wide text-ink-soft">
            today, the whole scrapbook is about you.
          </p>
        </Reveal>
      </div>

      {/* keepsakes */}
      <Bow className="absolute left-6 top-14 w-11 -rotate-12 text-ink/80" />
      <Bow className="absolute bottom-16 right-7 w-10 rotate-12 text-ink/80" />
      <span className="butterfly-float absolute right-8 top-16">
        <Butterfly className="w-9" />
      </span>
      <span className="butterfly-float absolute left-8 bottom-24" style={{ animationDelay: "-3s" }}>
        <Butterfly className="w-8" tone="#d9b48f" />
      </span>
      <span
        className="butterfly-float absolute right-1/3 bottom-10"
        style={{ animationDelay: "-6s" }}
      >
        <Butterfly className="w-6" tone="#c07f8d" />
      </span>
    </section>
  );
}
