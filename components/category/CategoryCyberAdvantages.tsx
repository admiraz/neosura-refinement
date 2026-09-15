"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ServiceVisual } from "@/content/de/serviceVisuals";
import { Container } from "@/components/ui/Container";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface CategoryCyberAdvantagesProps {
  headingAccent: string;
  headingRest: string;
  paragraph: string;
  /** Title-only items (no per-item description) — FINWIWO's own row 4
   * uses two independent `nectar-fancy-ul` lists of 3 short titles laid
   * out side by side, the same checkmark glyph as rows 1-3's checklist
   * but without a body line per item. Not the `CategoryAdvantages`
   * `items` shape (title+body). */
  chips: string[];
  ctaLabel: string;
  ctaHref: string;
  photo: ServiceVisual;
}

/** Phase 7E.5 — FINWIWO's fourth `/unternehmen` editorial row ("Cyber-Risk
 * – Schutz vor digitalen Bedrohungen"), independently live-remeasured
 * (Phase 7E.4 had already flagged it as materially different from rows
 * 1-3, not a drop-in `CategoryAdvantages` reuse — confirmed true).
 *
 * Same outer-row family as rows 1-3 (0px gap on both sides, transparent
 * bg on `bg-paper-2`, `right_padding_7pct`/`left_padding_7pct` desktop,
 * 20px image radius, ~3:2 photo ratio, image-right/text-left — confirmed
 * independently, not assumed from the row1/2/3 alternation). H2 measured
 * 30px/36px/400 (close to but not identical to rows 1-3's 28.8/34.56 —
 * this row's own type scale is used as-is rather than forced to match).
 *
 * The genuinely different part: instead of a single-column list of 2-3
 * `{title, body}` checklist rows, FINWIWO renders two independent
 * 3-item `nectar-fancy-ul` lists side by side (`icon-salient-check` —
 * the SAME glyph as rows 1-3's checklist, confirmed via computed style,
 * not a new icon), each item title-only, no description line, no
 * pill/badge/border/background — a plain two-column checkmark list, not
 * a "chip" component despite that shorthand. Reproduced here as a
 * 2-column desktop / 1-column mobile grid of short title-only rows,
 * matching that shape without forcing it through `CategoryAdvantages`'
 * `items` prop (which always renders a `body` line).
 *
 * Mobile (measured 390/360, `reverse_columns_column_phone` class on the
 * live row despite that): image still renders FIRST, same as rows 1-3 —
 * the class does not actually invert stacking order on this row, so no
 * special-cased mobile order is built here.
 *
 * CTA: FINWIWO's own row 4 CTA ("Jetzt Offerten vergleichen" → `#formular`)
 * measured with `transform: none` before/after hover — no lift, matching
 * row 3's finding, unlike rows 1-2's `~3px` lift. This component never
 * applies a hover-lift transform (no `ctaHoverLift`-equivalent prop). */
export function CategoryCyberAdvantages({
  headingAccent,
  headingRest,
  paragraph,
  chips,
  ctaLabel,
  ctaHref,
  photo,
}: CategoryCyberAdvantagesProps) {
  const [drawn, setDrawn] = useState(false);
  const emRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const stroke = "var(--color-purple)";

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

  return (
    <div className="bg-paper-2 py-14 lg:py-[86px]">
      <Container>
        {/* Phase 8C — same inset geometry as the other three business rows
            (photo 545x364, text column ~493px, 30/36 H2 at normal tracking). */}
        <div className="lg:mx-auto lg:grid lg:max-w-[1113px] lg:grid-cols-[minmax(0,1fr)_545px] lg:items-center lg:gap-x-[80px]">
          <div className="relative h-[224px] w-full overflow-hidden rounded-[20px] sm:h-[300px] lg:order-2 lg:h-[364px]">
            <Image
              src={photo.photo}
              alt={photo.alt}
              fill
              loading="lazy"
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
              style={{ objectPosition: photo.objectPosition }}
            />
          </div>

          <div className="mt-8 lg:order-1 lg:mt-0">
            <h2 className="text-[1.6875rem] font-normal leading-[1.2] tracking-normal text-ink lg:text-[1.875rem] lg:leading-[36px]">
              {headingRest}{" "}
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
              </em>
            </h2>

            <p className="mt-6 max-w-[493px] text-[1rem] font-light leading-[1.5] text-ink">{paragraph}</p>

            <ul className="mt-7 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {chips.map((label) => (
                <li key={label} className="flex items-start gap-3">
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden
                    className="mt-[3px] h-[18px] w-[18px] shrink-0 text-purple"
                  >
                    <path
                      d="M4 10.5l3.5 3.5L16 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-[1rem] leading-[1.3] text-ink">{label}</span>
                </li>
              ))}
            </ul>

            <Link
              href={ctaHref}
              className="mt-7 inline-block text-[0.9rem] font-medium text-purple underline underline-offset-4 transition-colors hover:text-ink"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
