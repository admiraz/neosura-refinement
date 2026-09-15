"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface CategoryExplainerProps {
  headingAccent: string;
  headingRest: string;
  paragraphs: string[];
  accent: "purple" | "teal";
}

/** Phase 7D.3 — rebuilt from FINWIWO's live `/versicherungen/` explainer
 * section (measured 1440/1280/1024/390/360): a single `wpb_row` starting
 * exactly at the locked Statement's bottom edge (zero gap, confirmed),
 * rounded on the TOP corners only (`90px 90px 0px 0px`, identical at
 * every breakpoint tested — not responsively scaled), flat bottom, on
 * the SAME light `bg-paper-2` surface as Hero/Statement — the radius is
 * architecturally real but visually invisible since the color doesn't
 * change here (confirmed live: no visible seam between Statement's text
 * and this section's heading). A centered H2 (28.8px/lh34.56/weight 400
 * desktop, 27px/lh32.4 mobile — NOT scaled from the homepage's own
 * heading sizes, measured independently) followed by a single centered-
 * column, left-aligned editorial body: 6 paragraphs, 16px/lh24/weight
 * light, ~837px column width desktop. No CTA, no cards, no columns —
 * confirmed by the live DOM (`ctas: []`).
 *
 * The heading's first phrase carries a genuine animated underline — not
 * `text-decoration`, an actual inline SVG "scribble" stroke
 * (`nectar-scribble` on FINWIWO) that draws itself in via
 * `stroke-dasharray`/`stroke-dashoffset` (~1.8s) the first time it
 * scrolls into view, confirmed live by sampling far-before (opacity 0,
 * dashoffset 1) through fully-drawn (opacity 1, dashoffset 0) — a real,
 * one-time, IntersectionObserver-gated reveal (FINWIWO's own class name
 * quite literally toggles to "animated"), not inferred from a class
 * name. Reproduced here the same way: an inline SVG that sits in the
 * text flow right after the accent phrase (so it naturally wraps to
 * whichever line that phrase lands on, matching FINWIWO's own mobile
 * behavior where the stroke follows the wrapped word, not a fixed
 * position), gated by IntersectionObserver, respecting
 * `prefers-reduced-motion` (shown fully drawn, no animation, per the
 * project's established motion rule). */
export function CategoryExplainer({ headingAccent, headingRest, paragraphs, accent }: CategoryExplainerProps) {
  const [drawn, setDrawn] = useState(false);
  const emRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const stroke = accent === "teal" ? "var(--color-purple)" : "var(--color-purple)";

  const isDrawn = drawn || reducedMotion;

  useEffect(() => {
    if (reducedMotion) return;
    const el = emRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  /* Visual polish pass — the measured 90px top radius was documented as
   * architecturally real but visually invisible because this row shares its
   * surface with the Statement above it. In practice the corners cut through
   * to the page background and read as a stray curved seam, so the radius is
   * dropped and the shared surface runs flat: the intended result. */
  return (
    <div className="bg-paper-2">
      <div className="mx-auto max-w-[1340px] px-6 pb-12 pt-12 sm:px-8 lg:px-0 lg:pb-[43px] lg:pt-[58px]">
        <h2 className="text-center text-[1.6875rem] font-normal leading-[1.2] tracking-normal text-ink lg:text-[1.8rem]">
          <em ref={emRef} className="relative inline-block not-italic">
            {headingAccent}
            <svg
              viewBox="0 0 300 30"
              preserveAspectRatio="none"
              aria-hidden
              className="pointer-events-none absolute inset-x-0 -bottom-[0.12em] h-[0.35em] w-full"
            >
              <path
                d="M5 15c25-10 60-16 135-17c25 0 90-1 155 8"
                stroke={stroke}
                strokeWidth="6"
                fill="none"
                pathLength={1}
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: isDrawn ? 0 : 1,
                  opacity: isDrawn ? 1 : 0,
                  transition: reducedMotion ? "none" : "stroke-dashoffset 1.8s ease-out, opacity 0.3s ease-out",
                }}
              />
            </svg>
          </em>{" "}
          {headingRest}
        </h2>

        {/* Phase 9B — reading measure 837px -> 680px (~110 -> ~85 characters
            per line); same six paragraphs, same rhythm. */}
        <div className="mx-auto mt-10 flex max-w-[680px] flex-col gap-6 text-left lg:mt-12">
          {paragraphs.map((p) => (
            <p key={p} className="text-[1rem] font-light leading-[1.5] text-ink">
              {p}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
