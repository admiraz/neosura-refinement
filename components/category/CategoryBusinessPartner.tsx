"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ServiceVisual } from "@/content/de/serviceVisuals";
import { Container } from "@/components/ui/Container";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface CategoryBusinessPartnerProps {
  headingRest: string;
  headingAccent: string;
  subheading: string;
  audienceIntro: string;
  audiences: string[];
  valueLabel: string;
  values: string[];
  photoTop: ServiceVisual;
  photoBottom: ServiceVisual;
}

/** Phase 7E.7 — FINWIWO's `/unternehmen/` trust/partner module ("Ihr
 * Partner für Unternehmensversicherungen"), independently live-
 * remeasured. A plain `full-width-section` — no card radius, no scale
 * transform (unlike the process module right above it), transparent
 * background, `padding: 57.6px 0` — confirmed via computed style, not
 * assumed from the process section's own card treatment. ~17px gap from
 * the process card, same rhythm as every other module boundary on this
 * page.
 *
 * Structure (verified, not assumed to be one row): a centered H2+H4 pair
 * spanning the full section width, THEN a two-column area below it —
 * left: two stacked images (measured 630×630 then 630×420, second one
 * 20px radius; the live FIRST image slot has an empty `src` — a genuine
 * FINWIWO content bug, not a real second photo, so NOT reproduced as a
 * broken slot — NEOSURA uses two real photos instead), right: two text
 * chapters. H2 has the same one-time `nectar-scribble` swash draw as
 * every other module (`stroke-dashoffset` sampled 0.97→0 across scroll
 * entry) — reused verbatim, no new motion. Confirmed zero links/CTA in
 * the live module (no `<a>` anywhere inside it) — this component has no
 * CTA either, matching that absence exactly rather than inventing one.
 *
 * Content roles (classified from the live DOM, not assumed):
 * chapter A = "who this is for" (FINWIWO: "Wir verstehen die Bedürfnisse
 * von KMU... Handwerksbetrieb, IT-Unternehmen, Gastrobetrieb,
 * Arztpraxis" — FINWIWO's own 4 example branches); chapter B = a
 * 3-item value list, live-rendered as flat lines with a checkmark icon
 * (not a title+body pair). FINWIWO's own opening context paragraph ("Als
 * Unternehmer tragen Sie Verantwortung…") and its 3-item list content
 * ("Attraktive BVG-Lösungen für Ihre Mitarbeitenden" is FINWIWO's own
 * product-promotion framing, not client-guide-supplied) are NOT reused
 * as NEOSURA copy — chapter A instead uses the client guide's exact
 * §4.8 "Für wen" audience list (KMU/Startups/Selbständige/Handwerk/
 * Gastronomie/Bau/Transport, all seven, not FINWIWO's own four
 * examples), and chapter B's three labels are UI LABELS DERIVED FROM
 * CLIENT COPY — condensed from the exact, already-approved
 * `businessIntro.lead`/`clientGuideBusinessHub.subline` sentence's own
 * clauses ("bei einem Ansprechpartner" / "prüfen jedes Jahr nach" /
 * "begleiten Sie im Schadenfall"), not invented. No stats/proof slot —
 * the live module has none (no customer counts, no ratings), so none is
 * forced here either.
 *
 * No bear illustration: the two stacked images leave only ~15px between
 * them (no real whitespace pocket), and the heading area's side margins
 * shrink to near-zero at tablet/mobile where the H2/H4 wrap close to
 * full width — no reliable, breakpoint-stable slot exists without
 * altering the measured content flow, so this is deferred again (see
 * docs/finwiwo-architecture — `/unternehmen` still has no bear anywhere
 * after seven build phases, an open gap for a future, more suitable
 * location, most plausibly the hero). */
export function CategoryBusinessPartner({
  headingRest,
  headingAccent,
  subheading,
  audienceIntro,
  audiences,
  valueLabel,
  values,
  photoTop,
  photoBottom,
}: CategoryBusinessPartnerProps) {
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
    <div className="bg-paper-2 pt-[17px]">
      <Container className="py-14 lg:py-[58px]">
        <h2 className="text-center text-[1.6875rem] font-normal leading-[1.2] tracking-normal text-ink lg:text-[1.8rem]">
          {headingRest}{" "}
          <em ref={emRef} className="relative inline-block max-w-full [hyphens:auto] [overflow-wrap:break-word] not-italic">
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

        {/* Phase 8C — reference sub-line 20/300/27/-0.2 in an 800px measure. */}
        <p className="mx-auto mt-4 max-w-[800px] text-center text-[1.1rem] font-light leading-[27px] tracking-[-0.2px] text-ink-soft lg:mt-5 lg:text-[1.25rem]">
          {subheading}
        </p>

        <div className="mt-12 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-[80px] lg:mt-14">
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-[20px] lg:rounded-none">
              <Image
                src={photoTop.photo}
                alt={photoTop.alt}
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
                style={{ objectPosition: photoTop.objectPosition }}
              />
            </div>
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[20px]">
              <Image
                src={photoBottom.photo}
                alt={photoBottom.alt}
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
                style={{ objectPosition: photoBottom.objectPosition }}
              />
            </div>
          </div>

          <div className="mt-10 lg:mt-0">
            <h3 className="text-[1.1rem] font-medium text-ink">Für wen</h3>
            <p className="mt-2 text-[1rem] font-light leading-[24px] text-ink-soft">{audienceIntro}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {audiences.map((label) => (
                <li
                  key={label}
                  className="rounded-full border border-line-soft bg-white px-3.5 py-1.5 text-[0.85rem] text-ink"
                >
                  {label}
                </li>
              ))}
            </ul>

            <h3 className="mt-8 text-[1.1rem] font-medium text-ink">{valueLabel}</h3>
            <ul className="mt-3 flex flex-col gap-3">
              {values.map((label) => (
                <li key={label} className="flex items-center gap-3">
                  <svg viewBox="0 0 20 20" fill="none" aria-hidden className="h-[18px] w-[18px] shrink-0 text-purple">
                    <path
                      d="M4 10.5l3.5 3.5L16 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-[1rem] font-light leading-[24px] text-ink">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}
