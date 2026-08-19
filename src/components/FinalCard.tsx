import { usePrefersReducedMotion } from "../hooks/useInView";
import {
  Bow,
  Flower,
  Glitter,
  PearlString,
  Reveal,
  Squiggle,
} from "./decor";

export default function FinalCard() {
  const reduced = usePrefersReducedMotion();
  return (
    <section className="relative px-5 pb-12 pt-16">
      <Reveal from={-4} to={-0.8} className="relative mx-auto max-w-[352px]">
        <div className="torn-big card-shadow relative bg-[#f8edf0] px-7 py-9">
          <PearlString className="absolute -top-2.5 left-1/2 -translate-x-1/2" />
          <Glitter count={6} />

          <p className="relative text-center font-hand text-[30px] font-bold leading-tight">
            Happy Birthday once again, Akka! 🎂
          </p>

          <span className="relative my-6 flex justify-center">
            <Squiggle className="w-24 text-blush-deep" />
          </span>

          <p className="relative text-center font-hand text-[26px] font-medium leading-relaxed">
            Un dreams ellam achieve pannanum.
            <br />
            Un face-la always indha smile irukanum.
            <br />
            Life full-a happiness,
            <br />
            success and beautiful memories irukanum. ✨
          </p>

          <Flower variant={0} className="absolute -bottom-7 -left-4 w-14 -rotate-[18deg]" />
          <Bow className="absolute -bottom-6 right-6 w-11 rotate-[8deg] text-ink" />
        </div>
      </Reveal>

      <Reveal delay={200} className="mt-16 text-center">
        <p className="font-hand text-[27px] font-bold">
          Made with ❤️ specially for Akka
        </p>
        <p className="mt-2 font-serif2 text-[13px] italic tracking-[0.18em] text-ink-soft">
          — the end · page ∞ —
        </p>
        <button
          onClick={() =>
            window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })
          }
          className="mt-5 font-serif2 text-[13.5px] italic text-blush-deep underline decoration-dashed underline-offset-4 transition-colors hover:text-ink"
        >
          ↑ back to the beginning
        </button>
        <p className="mt-10 font-serif2 text-[11.5px] italic text-ink-soft/60">
          a tiny corner of the internet, made just for you
        </p>
      </Reveal>
    </section>
  );
}
