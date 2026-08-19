import { useMemo, type CSSProperties, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { useInView } from "../hooks/useInView";

export const v = (o: Record<string, string | number>) => o as CSSProperties;

/* ---------------- texture ---------------- */

export function Grain({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("grain pointer-events-none absolute inset-0", className)}
    />
  );
}

/* ---------------- tape ---------------- */

export function Tape({
  className,
  blush,
  style,
}: {
  className?: string;
  blush?: boolean;
  style?: CSSProperties;
}) {
  return (
    <span
      aria-hidden
      className={cn("tape block h-7 w-24", blush && "tape-blush", className)}
      style={style}
    />
  );
}

export function TornDivider({
  className,
  tone = "bg-blush/25",
}: {
  className?: string;
  tone?: string;
}) {
  return <div aria-hidden className={cn("torn-top h-14 w-full", tone, className)} />;
}

/* ---------------- scroll reveal ---------------- */

export function Reveal({
  children,
  className,
  delay = 0,
  from = 3,
  to = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: number;
  to?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn("reveal", inView && "in", className)}
      style={v({ "--rd": `${delay}ms`, "--rf": `${from}deg`, "--rt": `${to}deg` })}
    >
      {children}
    </div>
  );
}

/* ---------------- ribbon bow ---------------- */

export function Bow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 52" className={className} aria-hidden>
      <path d="M31 24 C 18 8, 3 12, 7 22 C 10 32, 24 32, 31 25 Z" fill="currentColor" />
      <path d="M33 24 C 46 8, 61 12, 57 22 C 54 32, 40 32, 33 25 Z" fill="currentColor" />
      <path d="M29 28 C 27 35, 24 40, 19 45 L 27 42 C 29 37, 30 33, 31 29 Z" fill="currentColor" />
      <path d="M35 28 C 37 35, 40 40, 45 45 L 37 42 C 35 37, 34 33, 33 29 Z" fill="currentColor" />
      <circle cx="32" cy="24.5" r="4.6" fill="currentColor" />
    </svg>
  );
}

/* ---------------- dried flowers ---------------- */

export function Flower({
  variant = 0,
  className,
}: {
  variant?: 0 | 1;
  className?: string;
}) {
  if (variant === 1) {
    return (
      <svg viewBox="0 0 60 70" className={className} aria-hidden>
        <g stroke="#8d7a5b" strokeWidth="1.1" fill="none" strokeLinecap="round">
          <path d="M30 68 C 28 52, 26 40, 18 26" />
          <path d="M30 68 C 31 50, 34 38, 40 24" />
          <path d="M30 68 C 29 54, 30 42, 30 28" />
        </g>
        <g fill="#fbf7ef" stroke="#d9c9a8" strokeWidth="0.8">
          <circle cx="17" cy="23" r="3.4" />
          <circle cx="23" cy="16" r="2.8" />
          <circle cx="30" cy="12" r="3.2" />
          <circle cx="37" cy="15" r="2.6" />
          <circle cx="42" cy="22" r="3.4" />
          <circle cx="26" cy="27" r="2.4" />
          <circle cx="34" cy="28" r="2.6" />
        </g>
        <g fill="#e8d9b8">
          <circle cx="17" cy="23" r="1" />
          <circle cx="30" cy="12" r="1" />
          <circle cx="42" cy="22" r="1" />
        </g>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 70 80" className={className} aria-hidden>
      <g stroke="#7e6a4e" strokeWidth="1.4" fill="none" strokeLinecap="round">
        <path d="M35 78 C 34 58, 33 42, 30 24" />
        <path d="M35 78 C 38 62, 44 48, 52 34" />
      </g>
      <path d="M33 52 C 26 50, 20 44, 19 37 C 27 38, 32 44, 33 52 Z" fill="#9a8a63" opacity="0.75" />
      <path d="M36 60 C 43 60, 49 56, 52 50 C 44 49, 38 53, 36 60 Z" fill="#9a8a63" opacity="0.75" />
      <circle cx="30" cy="19" r="5.2" fill="#c98794" />
      <circle cx="30" cy="19" r="2" fill="#8d5461" />
      <circle cx="53" cy="30" r="4.4" fill="#d9b48f" />
      <circle cx="53" cy="30" r="1.7" fill="#8a6a3f" />
      <circle cx="41" cy="12" r="3.4" fill="#e7b4bb" />
      <circle cx="41" cy="12" r="1.3" fill="#8d5461" />
    </svg>
  );
}

/* ---------------- butterfly ---------------- */

export function Butterfly({
  className,
  tone = "#e5aeb6",
}: {
  className?: string;
  tone?: string;
}) {
  return (
    <svg viewBox="0 0 48 42" className={className} aria-hidden>
      <g className="bfl">
        <path
          d="M23 16 C 16 4, 4 4, 5 13 C 5.5 20, 15 23, 23 19 Z"
          fill={tone}
          stroke="#262019"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        <path
          d="M23 21 C 16 21, 8 25, 9 31 C 10 37, 19 35, 23 27 Z"
          fill="#f4dbe0"
          stroke="#262019"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      </g>
      <g className="bfr">
        <path
          d="M25 16 C 32 4, 44 4, 43 13 C 42.5 20, 33 23, 25 19 Z"
          fill={tone}
          stroke="#262019"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        <path
          d="M25 21 C 32 21, 40 25, 39 31 C 38 37, 29 35, 25 27 Z"
          fill="#f4dbe0"
          stroke="#262019"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      </g>
      <ellipse cx="24" cy="22" rx="1.7" ry="8" fill="#262019" />
      <path
        d="M22.5 14 C 21 11, 19 9, 16.5 7.5 M25.5 14 C 27 11, 29 9, 31.5 7.5"
        stroke="#262019"
        strokeWidth="1.1"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="16.5" cy="7.5" r="0.9" fill="#262019" />
      <circle cx="31.5" cy="7.5" r="0.9" fill="#262019" />
    </svg>
  );
}

/* ---------------- paperclip ---------------- */

export function Paperclip({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 40" className={className} aria-hidden>
      <path
        d="M8 10 L8 30 a6 6 0 0 0 12 0 L20 12 a4 4 0 0 0 -8 0 L12 28"
        fill="none"
        stroke="#262019"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ---------------- pearls ---------------- */

export function Pearl({ size = 10, className }: { size?: number; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("pearl inline-block rounded-full", className)}
      style={{ width: size, height: size }}
    />
  );
}

export function PearlString({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("flex gap-1.5", className)}>
      {Array.from({ length: 7 }).map((_, i) => (
        <Pearl key={i} size={i === 3 ? 11 : 9} />
      ))}
    </span>
  );
}

/* ---------------- squiggle underline ---------------- */

export function Squiggle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 12" className={className} aria-hidden preserveAspectRatio="none">
      <path
        d="M2 8 C 12 2, 20 10, 30 6 C 42 1, 50 10, 62 6 C 74 2, 84 10, 96 6 C 104 3, 112 6, 118 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  );
}

/* ---------------- heart & star ---------------- */

const HEART =
  "M12 20.7 C 7 17 3.2 13.4 2.4 9.6 C 1.7 6 4.2 3.4 7.2 3.4 C 9.2 3.4 11 4.5 12 6.1 C 13 4.5 14.8 3.4 16.8 3.4 C 19.8 3.4 22.3 6 21.6 9.6 C 20.8 13.4 17 17 12 20.7 Z";
const STAR = "M12 2 L14.3 9.7 L22 12 L14.3 14.3 L12 22 L9.7 14.3 L2 12 L9.7 9.7 Z";

export function HeartIcon({ className, solid = true }: { className?: string; solid?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d={HEART} fill={solid ? "currentColor" : "none"} stroke="currentColor" strokeWidth={solid ? 0 : 1.6} />
    </svg>
  );
}

/* ---------------- sparkle burst ---------------- */

export function SparkleBurst({ count = 16, className }: { count?: number; className?: string }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const a = (i / count) * Math.PI * 2 + Math.random() * 0.6;
        const d = 55 + Math.random() * 95;
        return {
          tx: Math.cos(a) * d,
          ty: Math.sin(a) * d * 0.85 - 24,
          size: 7 + Math.random() * 10,
          delay: Math.random() * 130,
          color: i % 3 === 0 ? "#c07f8d" : i % 3 === 1 ? "#b98f52" : "#262019",
        };
      }),
    [count],
  );
  return (
    <div aria-hidden className={cn("pointer-events-none absolute left-1/2 top-1/2 z-30", className)}>
      {stars.map((s, i) => (
        <span
          key={i}
          className="sparkle absolute"
          style={v({ "--tx": `${s.tx}px`, "--ty": `${s.ty}px`, animationDelay: `${s.delay}ms` })}
        >
          <svg viewBox="0 0 24 24" style={{ width: s.size, height: s.size }}>
            <path d={STAR} fill={s.color} />
          </svg>
        </span>
      ))}
    </div>
  );
}

/* ---------------- ambient floating hearts ---------------- */

export function FloatingHearts({ count = 9 }: { count?: number }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 94,
        size: 10 + Math.random() * 14,
        dur: 13 + Math.random() * 12,
        delay: -Math.random() * 22,
        dx: Math.random() * 70 - 35,
        rr: Math.random() * 90 - 45,
        o: 0.22 + Math.random() * 0.3,
        solid: Math.random() > 0.45,
      })),
    [count],
  );
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {hearts.map((h, i) => (
        <span
          key={i}
          className="float-heart absolute"
          style={v({
            left: `${h.left}%`,
            bottom: "-8vh",
            animationDuration: `${h.dur}s`,
            animationDelay: `${h.delay}s`,
            "--dx": `${h.dx}px`,
            "--rr": `${h.rr}deg`,
            "--o": h.o,
          })}
        >
          <svg viewBox="0 0 24 24" style={{ width: h.size, height: h.size }}>
            <path
              d={HEART}
              fill={h.solid ? "#e5aeb6" : "none"}
              stroke="#e5aeb6"
              strokeWidth={h.solid ? 0 : 1.6}
            />
          </svg>
        </span>
      ))}
    </div>
  );
}

/* ---------------- twinkling glitter field ---------------- */

export function Glitter({ count = 10, className }: { count?: number; className?: string }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 3 + Math.random() * 5,
        delay: Math.random() * 3,
        color: ["#b98f52", "#c07f8d", "#fffaf0"][Math.floor(Math.random() * 3)],
      })),
    [count],
  );
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      {dots.map((d, i) => (
        <span
          key={i}
          className="twinkle absolute rounded-full"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            background: d.color,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ---------------- small icons ---------------- */

export function CameraIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M4 8 h3 l2-2.5 h6 L17 8 h3 a1 1 0 0 1 1 1 v9 a1 1 0 0 1 -1 1 H4 a1 1 0 0 1 -1 -1 V9 a1 1 0 0 1 1 -1 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="13" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="18.2" cy="10.2" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function NoteIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M9.5 17.5 V6 L20 4 V15.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="7" cy="17.5" r="2.6" fill="currentColor" />
      <circle cx="17.5" cy="15.5" r="2.6" fill="currentColor" />
    </svg>
  );
}

export function PlusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 5v14 M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
