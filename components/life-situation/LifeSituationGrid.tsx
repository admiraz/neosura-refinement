"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { LifeSituationCard, type LifeSituationIcon } from "./LifeSituationCard";

export interface LifeSituationItem {
  icon: LifeSituationIcon;
  heading: string;
  body: string;
  href: string;
  linkLabel: string;
}

interface LifeSituationGridProps {
  headingRest: string;
  headingAccent: string;
  items: LifeSituationItem[];
}

/** Phase 7Q — the life-situation routing section, from the live FINWIWO
 * "Ihre Situation – unsere Lösung" module. `headingRest`/`headingAccent`
 * mirrors the split-heading prop pattern of `CategoryFaq`; only the
 * trailing accent gets the swash, as on the reference. Heading text itself
 * is STRUCTURALLY DERIVED — CLIENT GUIDE SILENT FOR EXACT UI HEADING (see
 * the page content files). FINWIWO's "In welcher Situation befinden Sie
 * sich?" sub-line only restates the Hero intro, so none is rendered.
 *
 * Phase 8G — re-measured on both reference pages (same template):
 * - Section: no background of its own (white), 72px vertical padding
 *   (~55px on phones). The previous pass sat the grid on `paper-2`.
 * - H2: 30/400/35, normal tracking, CENTRED (27/32 on phones) — not the
 *   28.8/500 left-aligned heading with negative tracking used before.
 * - Grid: one 1265px column pair with NO gap; items are divided only by a
 *   1px hairline under each row, none under the last row (see
 *   `LifeSituationCard`). One column on phones.
 * The reference always shows six items in two columns. NEOSURA's pages
 * carry four (Familie — a clean 2 x 2) and three (Neu in der Schweiz);
 * three in two columns would orphan the last item, so three items sit in
 * one row of three once the desktop layout starts (1180px, the header's
 * own desktop breakpoint) and stack as divided rows below it.
 *
 * Motion: static, as on the reference (no entrance, no hover); the only
 * motion is the sitewide one-time swash draw, reduced-motion-safe. */
export function LifeSituationGrid({ headingRest, headingAccent, items }: LifeSituationGridProps) {
  const [drawn, setDrawn] = useState(false);
  const emRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const isDrawn = drawn || reducedMotion;
  const count = items.length;
  const threeUp = count === 3;
  const lastRowStart = threeUp ? 0 : count - (count % 2 === 0 ? 2 : 1);

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
    <section className="bg-white">
      <Container className="py-14 lg:py-[72px]">
        <h2 className="mx-auto max-w-[32ch] text-center text-[1.6875rem] font-normal leading-[32px] tracking-normal text-ink lg:text-[1.875rem] lg:leading-[35px]">
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
                stroke="var(--color-purple)"
                strokeWidth="6"
                fill="none"
                pathLength={1}
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: isDrawn ? 0 : 1,
                  opacity: isDrawn ? 1 : 0,
                  transition: reducedMotion ? "none" : "stroke-dashoffset 1.8s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.3s cubic-bezier(0.65, 0, 0.35, 1)",
                }}
              />
            </svg>
          </em>
        </h2>

        <div className={cn("mx-auto mt-8 grid max-w-[1265px] grid-cols-1 lg:mt-10", threeUp ? "min-[1180px]:grid-cols-3" : "md:grid-cols-2")}>
          {items.map((item, i) => (
            <LifeSituationCard
              key={item.href + item.heading}
              {...item}
              className={cn(
                i < count - 1 && "border-b",
                threeUp ? "min-[1180px]:border-b-0" : i >= lastRowStart && "md:border-b-0"
              )}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
