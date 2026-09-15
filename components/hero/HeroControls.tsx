"use client";

import { cn } from "@/lib/cn";

interface HeroControlsProps {
  onPrev: () => void;
  onNext: () => void;
  tone: "light" | "dark";
  className?: string;
}

/** Editorial text controls — "Zurück / Weiter" — part of the slide composition
 * rather than viewport-edge carousel arrows.
 *
 * Phase 8A — measured against the reference hero's own slider controls, which
 * sit in exactly this role and position (x=160, just under the headline):
 * 18px / weight 700 / letter-spacing 1px, full white, with a "/" separator.
 * NEOSURA's were 12.8px / 300 / white-70 and read as an afterthought next to
 * them. */
export function HeroControls({ onPrev, onNext, tone, className }: HeroControlsProps) {
  const isLight = tone === "light";
  const base = isLight ? "text-white/85 hover:text-white" : "text-ink-soft hover:text-ink";
  return (
    <div className={cn("flex items-center gap-3 text-[1rem] font-semibold tracking-[0.045em]", className)}>
      <button type="button" onClick={onPrev} className={cn("arrow-trigger transition-colors duration-[var(--dur-micro)]", base)}>
        <span className="link-line pb-[3px]">Zurück</span>
      </button>
      <span className={isLight ? "text-white/40" : "text-muted/50"} aria-hidden>
        /
      </span>
      <button type="button" onClick={onNext} className={cn("arrow-trigger transition-colors duration-[var(--dur-micro)]", base)}>
        <span className="link-line pb-[3px]">Weiter</span>
      </button>
    </div>
  );
}
