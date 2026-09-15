"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ServiceVisual } from "@/content/de/serviceVisuals";
import { Container } from "@/components/ui/Container";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface KrankenkasseZusatzversicherungProps {
  heading: string;
  paragraph: string;
  checklist: string[];
  ctaLabel: string;
  ctaHref: string;
  photo: ServiceVisual;
}

/** Phase 7F.5 — live-remeasured against https://finwiwo.ch/krankenkasse/'s
 * "Zusatzversicherungen für mehr Komfort" module, independently of
 * `KrankenkasseGrundversicherung`'s own geometry (not assumed).
 *
 * MEASURED GEOMETRY: `full-width-content` row, transparent background, no
 * row-level radius, 7% left/right padding — confirmed via direct element
 * x-positions (not just class-name inference) that this row **mirrors**
 * Grundversicherung: text column at x≈158/w≈492 (LEFT) at 1440, image
 * column at x≈720/w≈619 outer (RIGHT), image itself 544.9×363.7 (the same
 * ≈3:2 size as Grundversicherung's own photo, just mirrored to the other
 * side) with 20px radius. The row's own `reverse` class is what performs
 * this mirror. On mobile (390/360, independently confirmed via direct
 * element y-positions) the image again renders FIRST (top) and text
 * second — the same convention already used by Grundversicherung's
 * mobile layout, despite the two modules being mirrored on desktop.
 *
 * HEADING: live `outerHTML` shows `<em>Zusatzversicherungen</em>für mehr
 * Komfort` — the swash wraps only the first word. Per this phase's own
 * brief (prefer the client-safe noun, do not reuse FINWIWO's "mehr
 * Komfort" marketing framing), NEOSURA's heading is the single word
 * "Zusatzversicherung" — the entire heading wrapped in the swash `<em>`,
 * matching the exact same single-word-heading pattern already used by
 * the sibling `KrankenkasseGrundversicherung` (not the rest/accent split
 * used by `KrankenkasseExplainer`/`KrankenkasseFranchise`, which both
 * have multi-word headings).
 *
 * CLIENT COPY: the paragraph is the client guide's exact §4.3
 * Zusatzversicherung sentence, verbatim, unchanged
 * (`gesundheitDeep.zusatzversicherung.paragraphs[0]`, already
 * transcribed in Phase 7M.1) — FINWIWO's own two paragraphs are not
 * reused. FINWIWO's own second paragraph states "Im Gegensatz zur
 * Grundversicherung können die Kassen hier Gesundheitsfragen stellen und
 * Vorbehalte anbringen" — a true, non-oversold statement (it does NOT
 * claim guaranteed acceptance), so there is no misleading switching claim
 * here that needed neutralizing. NEOSURA does not reproduce FINWIWO's
 * wording regardless, per the source hierarchy.
 *
 * SUPPORTING LIST: FINWIWO's own module has exactly THREE checklist
 * slots ("Freie Arztwahl im Spital (Halbprivat/Privat)" / "Beiträge an
 * Brillen, Fitness und Prävention" / "Alternativmedizin und
 * Naturheilkunde") — not six, so the client guide's six named concepts
 * (Ambulante Zusätze/Spitalversicherung/Zahnversicherung/Brillen/
 * Alternativmedizin/Fitness) are not force-fit into this slot; all six
 * remain visible in the verbatim paragraph above regardless. The three
 * slots reuse the already-approved, already-correctly-scoped
 * `gesundheitDeep.zusatzversicherung.checklist` (Phase 7M.1) rather than
 * inventing new wording — its own middle item ("Gesundheitsprüfung durch
 * den Versicherer möglich") already correctly captures the client FAQ's
 * acceptance-can-be-declined nuance without needing a new disclaimer
 * here (the full FAQ text belongs later, in the FAQ module).
 *
 * IMAGE MOTION (independently re-measured, not assumed from
 * Grundversicherung's "no parallax" finding): the image has **no
 * parallax/scroll-transform** (`transform: none` at every sampled scroll
 * offset), but unlike Grundversicherung's image, it DOES carry a
 * one-time opacity fade-in on scroll-into-view (0 → 1, confirmed via
 * incremental-scroll sampling, not an instant jump which under-samples
 * lazy-loaded images). Reproduced here using this project's own
 * established one-time-reveal mechanism (IntersectionObserver +
 * `useReducedMotion`, the same pattern already used for every swash
 * draw in this project) applied to the image wrapper's opacity instead
 * of an SVG stroke — a genuine, measured divergence from the sibling
 * Grundversicherung module, not a copy-paste assumption.
 *
 * CTA: FINWIWO's own link is a plain text link with a trailing arrow
 * icon and an underline-on-hover treatment, `#formular` destination, and
 * **no hover transform** (confirmed static). Reworded to "Beratung
 * anfragen" and mapped to `/analyse` — not the dead `#formular` anchor —
 * matching the identical established pattern from `KrankenkasseGrundversicherung`
 * and `KrankenkasseFranchise`.
 *
 * CANONICAL ANCHOR: the live FINWIWO module carries `id="zusatzversicherung"`
 * directly on its own row (confirmed via `document.getElementById`, not
 * just inferred from the mega-menu link) — reproduced identically here,
 * with `scroll-mt-24` so `/privatkunden/krankenkasse#zusatzversicherung`
 * lands correctly below the sticky header, matching the same convention
 * already used by `#grundversicherung`.
 *
 * No bear here — the only image slot is the single content photo,
 * already carrying the section's real subject; no secondary decorative
 * slot exists on this module (deferred again, see the running bear-status
 * note in the architecture doc). Built as a dedicated component — not a
 * revival of `ServiceContentChapter`/`CategoryAdvantages`. */
/* Phase 8D — reference rows: photo 545x364 (20px radius) beside a
 * 467/493px text column, set as an inset ~1113px block; H2 30/36 (Grund)
 * and 28.8/34.56 (Zusatz) at normal tracking; body 16/300/24; checklist
 * 16/300 on a 31px step. */
export function KrankenkasseZusatzversicherung({
  heading,
  paragraph,
  checklist,
  ctaLabel,
  ctaHref,
  photo,
}: KrankenkasseZusatzversicherungProps) {
  const [headingDrawn, setHeadingDrawn] = useState(false);
  const [imageRevealed, setImageRevealed] = useState(false);
  const emRef = useRef<HTMLElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isHeadingDrawn = headingDrawn || reducedMotion;
  const isImageRevealed = imageRevealed || reducedMotion;

  useEffect(() => {
    if (reducedMotion) return;
    const el = emRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeadingDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    const el = imgWrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <section id="zusatzversicherung" className="scroll-mt-24 bg-transparent">
      <Container className="py-[60px] lg:grid lg:max-w-[1233px] lg:grid-cols-[minmax(0,1fr)_545px] lg:items-center lg:gap-x-[80px] lg:py-[86px]">
        <div
          ref={imgWrapRef}
          className="relative h-[224px] w-full overflow-hidden rounded-[20px] transition-opacity duration-700 ease-out sm:h-[300px] lg:order-2 lg:h-[364px]"
          style={{ opacity: isImageRevealed ? 1 : 0 }}
        >
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
          <h2 className="text-[1.6875rem] font-normal leading-[1.2] tracking-normal text-ink lg:text-[1.8rem]">
            <em ref={emRef} className="relative inline-block not-italic">
              {heading}
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
                    strokeDashoffset: isHeadingDrawn ? 0 : 1,
                    opacity: isHeadingDrawn ? 1 : 0,
                    transition: reducedMotion ? "none" : "stroke-dashoffset 1.8s ease-out, opacity 0.3s ease-out",
                  }}
                />
              </svg>
            </em>
          </h2>

          <p className="mt-6 max-w-[493px] text-[1rem] font-light leading-[1.5] text-ink">{paragraph}</p>

          <ul className="mt-6 flex flex-col gap-[10px]">
            {checklist.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[1rem] font-light leading-[20.8px] text-ink">
                <svg viewBox="0 0 20 20" fill="none" aria-hidden className="mt-[3px] h-[18px] w-[18px] shrink-0 text-purple">
                  <path d="M4 10.5l3.5 3.5L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{item}</span>
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
      </Container>
    </section>
  );
}
