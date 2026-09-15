"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ServiceVisual } from "@/content/de/serviceVisuals";
import { Container } from "@/components/ui/Container";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface BusinessProcessStep {
  num: string;
  title: string;
  body: string;
  photo: ServiceVisual;
}

interface CategoryBusinessProcessProps {
  headingRest: string;
  headingAccent: string;
  subheading: string;
  steps: BusinessProcessStep[];
}

/** Phase 7E.6 — FINWIWO's `/unternehmen/` process module ("So einfach
 * funktioniert's"), independently live-remeasured — NOT reused from
 * `CategoryProcess` (built in 7D.6 from the *different* `/versicherungen`
 * page's own process module). Confirmed genuinely different architecture
 * between the two live FINWIWO pages, not assumed:
 *   - No circular icon badge here (unlike `/versicherungen`'s 68px
 *     badge straddling the image) — DOM inspection found only a plain
 *     `<span style="color:#40ae91">01.</span>` prefix inside the H3,
 *     nothing else.
 *   - No individual card border/background/shadow (`border: 0px none`,
 *     `background: transparent` confirmed via computed style) — just an
 *     image stacked directly above title/body, no bordered card unit.
 *   - Image radius is top-corners-only (15px 15px 0 0, ~16:9), not a
 *     small all-around radius.
 *
 * Outer module: white background, `border-radius: 50px` all corners,
 * static `transform: scale(0.95)` confirmed identical across 6 scroll
 * samples (before/top/15%/30%/50%/70%/85%/after) and 6 load-timing
 * samples (0–1800ms) — a permanent cosmetic inset, not a reveal or
 * scroll-linked effect, reproduced as a correctly-sized box rather than
 * the transform hack (project's standing rule). ~17px gap from the Cyber
 * & Rechtsschutz row above (measured, not the 0px gap the editorial row
 * family itself uses). H2 does carry the same one-time `nectar-scribble`
 * swash draw as the editorial rows, on its TRAILING word this time
 * ("funktioniert's") — already matching NEOSURA's own established
 * trailing-accent convention, reused verbatim, no new motion invented.
 * Confirmed fully static: no fade/stagger/reveal at any sampled load
 * timing, no hover/click semantics on any step (no `<a>` ancestor,
 * `cursor: auto`).
 *
 * FINWIWO's own reference is 4 steps across at every breakpoint down to
 * 1024px, 2×2 at 768px, and a single column at 390/360px — but the
 * client guide's canonical advisory journey (§4.16) is 5 steps, not 4.
 * Squeezing 5 across at 1440 would shrink each card from FINWIWO's own
 * ~298px to ~234px (-22%), too narrow for the guide's considerably
 * longer paragraphs without wrapping awkwardly — so this uses FINWIWO's
 * own measured card grammar (image ratio, radius, gaps, typography)
 * but a 3-then-2 grid at the `lg` breakpoint (mirroring the SAME
 * proportions FINWIWO uses further down at its own 768px 2-column
 * checkpoint, just centered as a shorter final row), 2 columns at `sm`
 * (identical column count to FINWIWO's own 768px behavior — a 5-item
 * 2-column wrap naturally ends in one centered card, not a forced
 * layout), and a single column at the base breakpoint (matches FINWIWO's
 * mobile stack exactly). */
export function CategoryBusinessProcess({ headingRest, headingAccent, subheading, steps }: CategoryBusinessProcessProps) {
  const [drawn, setDrawn] = useState(false);
  const emRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
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

  function StepCard({ step }: { step: BusinessProcessStep }) {
    return (
      <div className="w-full sm:w-[calc((100%-50px)/2)] lg:w-[299px]">
        <div className="relative aspect-[7/4] overflow-hidden rounded-t-[15px]">
          <Image
            src={step.photo.photo}
            alt={step.photo.alt}
            fill
            loading="lazy"
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover"
            style={{ objectPosition: step.photo.objectPosition }}
          />
        </div>
        <h3 className="mt-4 text-[1.15rem] font-medium leading-[1.3] tracking-[-0.23px] text-ink lg:text-center lg:text-[1.4375rem] lg:leading-[29px]">
          <span className="text-purple">{step.num}.</span> {step.title}
        </h3>
        <p className="mt-2 text-[1rem] font-light leading-[24px] text-ink-soft lg:text-center">{step.body}</p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="py-14 lg:py-[92px]">
          <h2 className="text-center text-[1.6875rem] font-normal leading-[1.2] tracking-normal text-ink lg:text-[1.875rem] lg:leading-[36px]">
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
                    transition: reducedMotion ? "none" : "stroke-dashoffset 1.8s ease-out, opacity 0.3s ease-out",
                  }}
                />
              </svg>
            </em>
          </h2>

          <p className="mx-auto mt-4 max-w-[52ch] text-center text-[1.1rem] font-medium leading-[27.6px] tracking-[-0.23px] text-ink lg:mt-5 lg:text-[1.4375rem]">
            {subheading}
          </p>

          {/* Phase 8C — reference step cards are 299px (image 299x171, 7/4) on a
              25px gap, titles 23/500/29 and 16/300/24 body, both centred. Five
              NEOSURA steps keep that card size as a centred 3 + 2 rather than
              stretching to 369px columns. */}
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-8 sm:gap-x-[50px] lg:mt-14 lg:gap-x-[25px] lg:gap-y-12">
            {steps.map((step) => (
              <StepCard key={step.num} step={step} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
