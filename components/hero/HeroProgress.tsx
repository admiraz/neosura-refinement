"use client";

interface HeroProgressProps {
  progress: number;
  reducedMotion: boolean;
  tone: "light" | "dark";
  size?: number;
  className?: string;
}

/** Small, restrained circular autoplay-progress indicator — purposeful
 * (maps to real slide duration), not a copy of FINWIWO's unidentified one. */
export function HeroProgress({ progress, reducedMotion, tone, size = 32, className }: HeroProgressProps) {
  const stroke = 1.75;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.min(1, Math.max(0, progress));
  const offset = reducedMotion ? c * 0.25 : c * (1 - clamped);
  const track = tone === "light" ? "rgba(255,255,255,0.3)" : "rgba(26,20,32,0.22)";
  const active = tone === "light" ? "var(--color-teal)" : "var(--color-purple)";

  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`-rotate-90 transition-[color] duration-500 ${className ?? ""}`}
    >
      <circle cx={size / 2} cy={size / 2} r={r} stroke={track} strokeWidth={stroke} fill="none" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke={active}
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={c}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: reducedMotion ? "none" : "stroke-dashoffset 120ms linear" }}
      />
    </svg>
  );
}
