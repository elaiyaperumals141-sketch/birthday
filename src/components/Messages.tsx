import {
  Bow,
  Flower,
  HeartIcon,
  Paperclip,
  Reveal,
  Squiggle,
  Tape,
} from "./decor";

export default function Messages() {
  return (
    <section className="relative px-5 py-16">
      <Reveal className="mb-10 flex items-center gap-4">
        <span className="h-px flex-1 bg-ink/15" />
        <p className="font-serif2 text-[13px] font-medium italic tracking-[0.22em] text-ink-soft">
          chapter ii — a few honest lines
        </p>
        <span className="h-px flex-1 bg-ink/15" />
      </Reveal>

      {/* card one */}
      <Reveal delay={80} from={-5} to={-1.2} className="relative mx-auto mt-6 max-w-[340px]">
        <div className="torn-a card-shadow relative bg-[#f9f1df] px-6 py-7">
          <Tape className="absolute -top-3.5 right-8 w-24 -rotate-6" />
          <Paperclip className="absolute -left-3.5 top-9 w-6 rotate-[15deg]" />
          <p className="font-hand text-[28px] font-semibold leading-snug">
            Nee enakku sister mattum illa...
            <br />
            En life-la romba special-aana person. 🤍
          </p>
        </div>
        <Flower variant={1} className="absolute -right-7 -top-9 w-14 rotate-[18deg]" />
      </Reveal>

      {/* card two */}
      <Reveal delay={220} from={5} to={1.6} className="relative mx-auto mt-12 max-w-[340px]">
        <div className="torn-a card-shadow relative bg-[#f6e4e8] px-6 py-7">
          <Tape blush className="absolute -top-3.5 left-7 w-24 rotate-6" />
          <p className="font-hand text-[28px] font-semibold leading-snug">
            Sometimes nee scold pannuva 😂
            <br />
            Sometimes support pannuva ❤️
            <br />
            Sometimes torture pannuva 😭😂
          </p>
          <span className="my-4 flex justify-center">
            <Squiggle className="w-24 text-blush-deep" />
          </span>
          <p className="font-hand text-[28px] font-semibold leading-snug">
            But honestly...
            <br />
            un maari oru Akka irukkuradhu.
            <br />
            romba lucky feeling. 🤍
          </p>
          <Bow className="absolute -bottom-5 -right-3 w-10 rotate-[10deg] text-ink" />
        </div>
        <HeartIcon className="absolute -left-4 bottom-8 w-4 text-blush-deep/70" />
        <HeartIcon className="absolute -left-7 bottom-14 w-3 text-blush/80" solid={false} />
      </Reveal>

      <Reveal delay={320} className="mt-12">
        <p className="text-center font-serif2 text-[14px] italic text-ink-soft">
          p.s. — I rewrote this page three times. It kept getting emotional. 🤍
        </p>
      </Reveal>
    </section>
  );
}
