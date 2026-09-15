"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface KrankenkasseExplainerProps {
  headingRest: string;
  headingAccent: string;
  paragraphs: string[];
}

/** Phase 7F.2 — live-remeasured against https://finwiwo.ch/krankenkasse/.
 * FINWIWO's own module: H2 "Nervig, komplex und zeitraubend – aber
 * trotzdem so einfach wie noch nie" (30px/36px, confirmed `hasSvg: true`
 * — the same one-time `nectar-scribble` swash draw already built
 * elsewhere in this project, reused verbatim, not a new mechanic) plus
 * two body paragraphs, centered-ish column, transparent background,
 * top-only 90px corner radius on the row (irrelevant without a
 * background to show it, so not reproduced — no visual difference).
 * FINWIWO's own two paragraphs are its own marketing narrative ("Fragen
 * Sie sich manchmal, ob Sie... wirklich optimal versichert sind...") —
 * not reused. The client guide has no dedicated text for this exact
 * "how we help you navigate the complexity" explainer role (distinct
 * from the Hero's own §4.3 intro and from the not-yet-built
 * Grundversicherung/Zusatzversicherung chapters) — this is CLIENT GUIDE
 * SILENT for this specific slot, so it uses `gesundheitDeep.koordination`
 * (already-approved existing NEOSURA copy, not FINWIWO's wording, not
 * invented) rather than duplicating the Hero's own intro sentence on the
 * same page. Built as a dedicated component, not a reuse of the locked
 * `CategoryExplainer` (a different, hub-level component with its own
 * measured geometry). */
export function KrankenkasseExplainer({ headingRest, headingAccent, paragraphs }: KrankenkasseExplainerProps) {
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

  return (
    <section className="bg-transparent">
      {/* Phase 8D — reference explainer: H2 30/36 normal in a 683px measure;
          body 16/300/24, left-aligned in a centred 840px column; row padding
          58 / 43. */}
      <Container className="py-[60px] lg:pb-[43px] lg:pt-[58px]">
        <h2 className="mx-auto max-w-[683px] text-center text-[1.6875rem] font-normal leading-[1.2] tracking-normal text-ink lg:text-[1.875rem] lg:leading-[36px]">
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

        <div className="mx-auto mt-6 flex max-w-[840px] flex-col gap-4 lg:mt-8">
          {paragraphs.map((p) => (
            <p key={p} className="text-left text-[1rem] font-light leading-[24px] text-ink-soft">
              {p}
            </p>
          ))}
        </div>
      </Container>
    </section>
  );
}
