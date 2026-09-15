"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface FranchiseRow {
  amount: string;
  type: string;
}

interface KrankenkasseFranchiseProps {
  headingRest: string;
  headingAccent: string;
  intro: string;
  caption: string;
  sourceNote: string;
  rows: FranchiseRow[];
  ctaLabel: string;
  ctaHref: string;
}

/** Phase 7F.4 — live-remeasured against https://finwiwo.ch/krankenkasse/'s
 * "Die richtige Franchise wählen" module.
 *
 * MEASURED GEOMETRY: white 50px-radius card (`tl/tr/bl/br_br_50px`),
 * static `scale(0.95)` at every breakpoint and at three independently
 * re-sampled scroll offsets (-200/0/+200px) — reconfirmed static, not a
 * new finding. Reproduced here the same way the sibling
 * `KrankenkasseDeadlines` module already reproduces this "scale-as-box"
 * pattern: an inset white rounded card, no actual CSS transform (a real
 * `scale()` would blur text for no visual benefit at this project's
 * fidelity level). H2 confirmed carrying the same one-time swash draw as
 * every other module on this page — reused verbatim, not a new mechanic.
 * FINWIWO's own markup shows the swash wraps only "Franchise wählen",
 * not the full 4-word heading ("Die richtige" sits outside the em,
 * confirmed via the live outerHTML) — reproduced with the same
 * headingRest/headingAccent split already used by the sibling
 * KrankenkasseExplainer component, not a whole-heading wrap.
 *
 * CRITICAL FINDING (reconfirmed independently this phase, not assumed
 * from Phase 7F.3): zero `<input>`, `<select>`, or range-slider elements
 * anywhere in FINWIWO's own module. It is a static reference table, not
 * a calculator — no calculation, comparison, or recommendation logic of
 * any kind exists here or was built here.
 *
 * FINWIWO's own markup (a hand-authored raw-HTML block, not a semantic
 * `<table>`) has THREE columns: "Franchise" / "Prämieneffekt" / "Ideal
 * für", six rows (CHF 300/500/1'000/1'500/2'000/2'500), a highlighted row
 * with a "Beliebt" badge, a "Familie" badge on CHF 500, and a "Tipp" box
 * below the table stating an unsourced rule of thumb ("Unter CHF 1'500
 * Arztkosten/Jahr lohnt sich meist eine hohe Franchise") with a
 * "Berechnung anfordern" button linking to `#formular`.
 *
 * TRUTHFUL CONTENT REDUCTION FROM 3 → 2 COLUMNS: "Prämieneffekt" is
 * FINWIWO's own relative, unsourced premium ranking; "Ideal für" is
 * unsupported customer-profile advice ("Für Familien mit Kindern", "Für
 * sehr gesunde Erwachsene", etc.) — no such profiling has been produced
 * or verified for NEOSURA. Neither column is reproduced. In their place,
 * this table uses a single, officially-verifiable classification column
 * ("Typ-Einordnung": ordentliche Franchise vs. Wahlfranchise) instead of
 * an advisory one. The "Beliebt"/"Familie" badges (unverified popularity/
 * suitability claims) and the entire "Tipp" box, including its Faustregel
 * claim, are NOT reproduced — no rule-of-thumb of any kind is stated
 * anywhere in this component.
 *
 * OFFICIAL SOURCE VERIFICATION (required before rendering any numeric
 * amount, per this phase's own brief): confirmed via priminfo.admin.ch
 * (the federal, BAG-affiliated health-insurance premium comparison
 * portal) — not solely FINWIWO, not prior NEOSURA data — that the
 * ordinary franchise for adults is CHF 300/year and the optional
 * (Wahlfranchise) levels are CHF 500/1'000/1'500/2'000/2'500/year. These
 * exactly match FINWIWO's own six row amounts, so no row was added,
 * removed, or renumbered — only the advisory columns were dropped. Full
 * source/date-checked record: docs/finwiwo-architecture/deep-krankenkasse.md.
 *
 * Rendered as a real semantic `<table>` (accessibility: two data columns
 * only comfortably fit every measured breakpoint down to 360px without
 * needing a stacked/scrolling fallback — independently confirmed, FINWIWO's
 * own 3-column table collapses to a single stacked column below 1024px,
 * which this 2-column table does not need to do). No row is clickable, no
 * hover state (FINWIWO's own rows are static — reconfirmed, not assumed).
 *
 * The CTA text is not "Berechnung anfordern" (a calculation is not being
 * offered) and does not link to `#formular` (a dead anchor on this route,
 * per the phase's own CTA-audit rule) — it reads "Beratung anfragen" and
 * maps to `/analyse`, matching the identical established pattern already
 * used by the sibling `KrankenkasseGrundversicherung` module.
 *
 * No bear here — the only visual element is the table itself, no
 * secondary decorative image slot exists on this module (deferred again,
 * see the running bear-status note in the architecture doc). Built as a
 * dedicated component — no existing NEOSURA component has this
 * heading+intro+table+CTA architecture inside a scale-as-box card. */
export function KrankenkasseFranchise({
  headingRest,
  headingAccent,
  intro,
  caption,
  sourceNote,
  rows,
  ctaLabel,
  ctaHref,
}: KrankenkasseFranchiseProps) {
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
    <div className="bg-paper-2 pt-[20px]">
      <Container>
        <div className="overflow-hidden rounded-[36px] bg-white px-6 py-12 sm:px-8 lg:rounded-[50px] lg:px-14 lg:py-[72px]">
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

          <p className="mx-auto mt-4 max-w-[665px] text-center text-[1rem] font-light leading-[24px] text-ink-soft">{intro}</p>

          {/* Phase 8D — reference table: 840px, white, 12px radius, 1px
              #e5e7eb frame; muted 16/500 header; rows on the same hairline with
              20px inset; amounts 16/600. The caption and CTA sit in the
              reference's own "Faustregel" box (teal 8% fill, 12px radius,
              teal 20% border, 16/20 padding) with a small 8px-radius button.
              No row is highlighted: the reference emphasises one franchise,
              which would read as a recommendation NEOSURA's copy doesn't make. */}
          <div className="mx-auto mt-8 max-w-[840px] overflow-x-auto rounded-[12px] border border-[#e5e7eb] bg-white">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-[#e5e7eb]">
                  <th scope="col" className="py-[15px] pl-5 pr-4 text-[1rem] font-medium text-muted">
                    Franchise
                  </th>
                  <th scope="col" className="py-[15px] pr-5 text-[1rem] font-medium text-muted">
                    Typ-Einordnung
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.amount} className="border-b border-[#e5e7eb] last:border-b-0">
                    <td className="py-[15px] pl-5 pr-4 text-[1rem] font-semibold text-ink">{row.amount}</td>
                    <td className="py-[15px] pr-5 text-[1rem] font-light text-ink-soft">{row.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mx-auto mt-3 max-w-[840px] text-[0.8rem] text-ink-soft/80">{sourceNote}</p>

          <div className="mx-auto mt-6 flex max-w-[840px] flex-col items-start gap-3 rounded-[12px] border border-purple/20 bg-purple/[0.08] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[1rem] font-light leading-[24px] text-ink">{caption}</p>
            <Link
              href={ctaHref}
              className="inline-flex h-[42px] shrink-0 items-center rounded-[8px] bg-purple px-5 text-[1rem] font-medium tracking-[-0.1px] text-white btn-motion hover:bg-purple-600"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
