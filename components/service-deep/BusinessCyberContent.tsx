"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ServiceVisual } from "@/content/de/serviceVisuals";
import { Container } from "@/components/ui/Container";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface BusinessCyberContentProps {
  id?: string;
  heading: string;
  paragraph: string;
  checklist: string[];
  ctaLabel: string;
  ctaHref: string;
  /** Phase 7P.B — optional atmospheric background photo, desktop/tablet
   * only (`lg:` and up). See this component's own docstring for the full
   * measurement record on why this exists and why it deliberately does
   * NOT reproduce FINWIWO's own real `#cyber` photo. */
  backgroundPhoto?: ServiceVisual;
}

/** Phase 7P.A — CORRECTION of Phase 7P's own `WohnenEditorialRow` reuse
 * for the Cyberversicherung module. A fresh, targeted re-measurement of
 * `https://finwiwo.ch/unternehmen/`'s own `#cyber` row (not carried over
 * from the generic `WohnenEditorialRow` family measurements) found its
 * `childStructure` is exactly TWO direct children: `.row-bg-wrap` (a
 * full-row background-photo layer, same mechanism as `ServiceHeroFullbleed`)
 * and a SINGLE `.row_col_wrap_12.col.span_12` column — i.e. one full-width
 * text column, not a two-column image+text grid. There is no boxed
 * editorial photo beside the content anywhere in this row's own markup.
 * External visual review of both the live reference and NEOSURA's own
 * Phase 7P screenshot independently confirmed the same thing: no photo
 * renders next to this block. `WohnenEditorialRow`'s image+text split was
 * therefore an over-application of the shared family to a row that
 * genuinely doesn't share that architecture — this dedicated component
 * replaces it instead of forcing new special-case props onto the shared
 * row template (per this phase's own "keep the shared component simple"
 * instruction).
 *
 * ARCHITECTURE: single text-led column, `bg-white` (the locked "white
 * editorial surfaces" value — FINWIWO's own row uses a dark/photo
 * treatment behind the text, which is NOT reproduced; NEOSURA's own
 * locked restrained-color system governs here, matching the sibling
 * Betriebsrechtsschutz row's own white background). Heading uses the
 * exact same swash mechanism as `WohnenEditorialRow` (`nectarStrokeAnimation`-
 * equivalent, 1.8s, `cubic-bezier(0.65,0,0.35,1)`, one-time,
 * IntersectionObserver-triggered) — FINWIWO's own `#cyber` H2 genuinely
 * does swash-underline part of its heading (`<em>Cyber-Risk<svg
 * class="nectar-scribble">`), confirming a swash treatment is reference-
 * backed here, not an assumption; NEOSURA's own heading is the single
 * word "Cyberversicherung" (the exact client-approved topic word), so the
 * swash wraps it in full — the same "wrap the topic word" convention
 * already established sitewide, not a new rule invented for this row.
 *
 * CHECKLIST: FINWIWO's own `<ul>` is genuinely two separate lists placed
 * side by side (its own single `<ul>` query returns only half the visible
 * items — confirmed via direct DOM inspection), not one list under CSS
 * multi-column — reproduced here as two explicit column arrays (first
 * `Math.ceil(n/2)` items left, remainder right), collapsing to one column
 * on mobile via `sm:grid-cols-2` (FINWIWO's own mobile measurement showed
 * the same single-column stacking). TRUTHFUL CONTENT REDUCTION FROM
 * FINWIWO CHECKLIST COUNT (6: Betriebsunterbrechung/Erpressungszahlungen/
 * 24/7 Notfall-Hotline/Datenwiederherstellung/Rechtskosten & PR/
 * Forensische Analyse) TO CLIENT-SUPPORTED CONTENT COUNT (5: the exact
 * concepts named in the client guide's own §4.14 Cyber sentence —
 * Ertragsausfall, Wiederherstellungskosten, IT-Forensik,
 * Krisenkommunikation, Haftpflichtansprüche nach Datenschutzverletzungen).
 * None of FINWIWO's own ransom-payment/24-7-hotline/PR-cost/named-
 * forensics-tier claims are reproduced.
 *
 * MOTION: `getAnimations({ subtree: true })` sampled on the live `#cyber`
 * row before/after scroll found only the swash stroke animation and
 * generic finished button/image-fade transitions already documented
 * project-wide (`finwiwo-visual-system.md`) — no deliberate content
 * fade-up on the paragraph or checklist. This component renders both
 * statically, matching that finding and the locked "FINWIWO editorial
 * content is generally static" rule.
 *
 * CTA: FINWIWO's own small CTA family ("Jetzt Offerten vergleichen" →
 * a live comparison tool) is replaced with the established truthful text
 * link ("Beratung anfragen" → `/analyse`), the same plain purple
 * underlined link style/behavior already used by `WohnenEditorialRow`.
 *
 * Phase 7P.B — BACKGROUND PHOTO ADDED. A deeper re-measurement of
 * `#cyber` (this time waiting for the lazy-loaded image to actually
 * finish, via a realistic incremental `page.mouse.wheel()` scroll rather
 * than the instant `scrollIntoView` + short wait used in Phase 7P.A's own
 * pass) found the Phase 7P.A "no photo at all" conclusion was itself
 * incomplete: `#cyber`'s inner `.row_col_wrap_12.col.span_12` wrapper
 * DOES contain a nested `vc_col-sm-6` half-width column with a real,
 * fully-loaded, fully-opaque `<img>` (544.9×363.7 at x=720, `class=
 * "img-with-animation ... loaded"`, `opacity: 1`) — Phase 7P.A's own
 * `childStructure` probe only inspected `#cyber`'s DIRECT children and
 * queried the image before its lazy-load resolved, so it never saw this
 * nested column. Once loaded, that image is a sharp, high-contrast,
 * NOT-faded server-room/data-center photo (person holding a laptop among
 * server racks) — i.e. the live reference is architecturally closer to
 * a normal two-column image+text row than either Phase 7P.A or this
 * phase's own initial "faded background layer" brief description
 * assumed (the "faded" impression very likely came from catching the
 * image mid fade-in transition, matching its own `img-with-animation`
 * class name).
 *
 * That real FINWIWO photo is also exactly the "server-room cliché" this
 * project's Phase 7P brief explicitly said not to reproduce. Rather than
 * re-reversing back to a prominent foreground image+text row (undoing
 * Phase 7P.A's genuine improvement to this module's density and rhythm),
 * this phase implements the specific, explicitly-requested design
 * outcome instead: a deliberately faded, atmospheric background photo
 * behind the text-led content — reference-INSPIRED (FINWIWO does have
 * *some* photographic presence in this row) rather than reference-
 * IDENTICAL (NEOSURA's own version is intentionally much more restrained
 * than FINWIWO's own sharp, opaque treatment). `backgroundPhoto` reuses
 * `manifesto-advisor.webp` (a person actively typing on a laptop with two
 * colleagues, "real workplace / digital operations" per this phase's own
 * asset criteria) — the same asset Phase 7P originally placed here as a
 * prominent foreground image before Phase 7P.A removed it; reusing it in
 * this new, much-more-faded BACKGROUND role is a genuinely different
 * architectural function, not an undo of that removal.
 *
 * Implementation follows the same established "fullbleed photo + white
 * wash overlay + relative content on top" pattern already used by
 * `ServiceHeroFullbleed`/`ServiceHeroSplit`, not a new mechanic: an
 * absolutely-positioned `next/image` `fill` layer, then a horizontal
 * white gradient overlay (heaviest — fully opaque — under the text
 * column, lightest at the section's far right edge, never below ~65%
 * white), then the existing content `Container` on top
 * (`position: relative`). Desktop/tablet only (`hidden lg:block`) — on
 * mobile, the text column and 1-column checklist occupy the section's
 * full width with no clear "right-side field" left for a background
 * image to occupy, and FINWIWO's own mobile layout has no equivalent
 * inline-background role either (its columns simply stack). No parallax
 * or motion was added to this layer — the same `getAnimations()` sweep
 * that found the module's paragraph/checklist static also found no
 * transform/scroll-driven animation on `#cyber`'s own background
 * mechanism (its one real animation is the image's initial load fade-in,
 * a one-time page-load effect, not a scroll effect — not reproduced,
 * since NEOSURA's own image isn't lazy-loaded behind a placeholder). */
export function BusinessCyberContent({ id, heading, paragraph, checklist, ctaLabel, ctaHref, backgroundPhoto }: BusinessCyberContentProps) {
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

  const mid = Math.ceil(checklist.length / 2);
  const columns = [checklist.slice(0, mid), checklist.slice(mid)];

  return (
    <section id={id} className={`relative overflow-hidden bg-white${id ? " scroll-mt-24" : ""}`}>
      {backgroundPhoto && (
        <>
          <div aria-hidden className="absolute inset-0 hidden lg:block">
            <Image
              src={backgroundPhoto.photo}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: backgroundPhoto.objectPosition }}
            />
          </div>
          <div
            aria-hidden
            className="absolute inset-0 hidden lg:block"
            style={{
              background: "linear-gradient(90deg, #fff 0%, #fff 42%, rgba(255,255,255,0.88) 68%, rgba(255,255,255,0.68) 100%)",
            }}
          />
        </>
      )}
      <Container className="relative py-12 lg:py-14">
        <div className="max-w-[640px]">
          <h2 className="text-[1.6875rem] font-normal leading-[1.2] tracking-normal text-ink lg:text-[1.875rem] lg:leading-[36px]">
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
                    strokeDashoffset: isDrawn ? 0 : 1,
                    opacity: isDrawn ? 1 : 0,
                    transition: reducedMotion ? "none" : "stroke-dashoffset 1.8s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.3s cubic-bezier(0.65, 0, 0.35, 1)",
                  }}
                />
              </svg>
            </em>
          </h2>

          <p className="mt-6 max-w-[60ch] text-[1rem] font-light leading-[24px] text-ink">{paragraph}</p>

          <div className="mt-7 grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
            {columns.map((col, i) => (
              <ul key={i} className="flex flex-col gap-3">
                {col.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[1rem] font-light leading-[24px] text-ink">
                    <svg viewBox="0 0 20 20" fill="none" aria-hidden className="mt-[3px] h-[18px] w-[18px] shrink-0 text-purple">
                      <path d="M4 10.5l3.5 3.5L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>

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
