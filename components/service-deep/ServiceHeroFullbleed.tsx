"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { ServiceVisual } from "@/content/de/serviceVisuals";
import { Container } from "@/components/ui/Container";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface ServiceHeroFullbleedItem {
  title: string;
  body: string;
}

interface ServiceHeroFullbleedProps {
  badge?: string;
  h1: string;
  intro: string;
  items: ServiceHeroFullbleedItem[];
  ctaLabel: string;
  ctaHref: string;
  photo: ServiceVisual;
  /** Phase 7I — Krankenkasse/Wohnen & Eigentum/Fahrzeug & Reisen all use
   * the original measured 72% white overlay (`bg-white/72`, matching
   * `/unternehmen`'s own fullbleed `CategoryHero`) — kept as the default
   * so those three locked pages render byte-for-byte unchanged. Phase
   * 7I's own explicit "hero visual cleanliness" correction (do not make
   * the hero appear more washed out than necessary — subject must stay
   * visible, restrained overlay, no milky-white wash) calls for a
   * lighter touch with a well-lit photo; `"light"` (`bg-white/48`) opts
   * into that without changing any other page's default. */
  overlay?: "default" | "light";
  /** Phase 7SYS.C — optional raw CSS `background` value, applied via
   * inline style, taking precedence over `overlay` when present. FINWIWO's
   * own real overlay is a 4-stop vertical gradient that varies per page
   * (measured fresh this phase, not a flat opacity) — e.g. Krankenkasse:
   * 72/73/72/94% at 10/43/68/91%; Wohnen: 58/64/72/94% at the same stops.
   * A single flat class can't represent this, so this prop accepts the
   * exact gradient string for pages where a fresh measurement is
   * available; `overlay` remains the flat fallback for pages that don't
   * set it, so no existing usage's rendering changes unless it opts in. */
  overlayGradient?: string;
}

/** Phase 7F.1 — dedicated deep-service-page hero, built after live-
 * auditing `https://finwiwo.ch/krankenkasse/` (a genuine dedicated
 * health-insurance topic page found via the "Versicherungen" mega menu
 * — NOT the generic `/versicherungen/` hub, and NOT assumed from any
 * earlier audit). NOT a reuse or modification of `CategoryHero` (the
 * locked hub-page hero, whose fullbleed variant hardcodes the business
 * lead form) or `ServiceHero` (the shared deep-page hero used by all 10
 * other deep pages) — a new, dedicated component so this page's
 * meaningfully different architecture doesn't risk either locked
 * surface.
 *
 * Measured architecture: full-bleed background photo (own row-level CSS
 * background, not an `<img>`, confirmed via computed `background-image`)
 * with a white-wash overlay (`linear-gradient(rgba(255,255,255,.72)…)`,
 * ~72% opacity — the same overlay treatment already used for
 * `/unternehmen`'s own fullbleed `CategoryHero`), bottom-only 90px
 * corner radius (`bl_br_90px br_br_90px` — top corners stay square,
 * unlike the all-corner radius used elsewhere), a small teal-gradient
 * badge pill top-right of the text column, H1 (40px/45px/weight 900 —
 * notably heavier than any other measured FINWIWO heading in this
 * project), an H2 sub-line, an intro paragraph, and three icon+title+
 * body items (FINWIWO: "Prämien optimieren" / "Beste Leistungen" /
 * "All-Inclusive Service", each with a small 35×35px decorative icon).
 * FINWIWO's own hero also embeds a large multi-field lead-calculator
 * form (9 fields including PLZ/Ort/Geburtsdatum) — NOT reproduced here:
 * that field set implies a premium-calculation capability NEOSURA's real
 * backend doesn't have (per the technical-truth rule), and this page's
 * `ServiceInquiry` module — already live, right after the hero — already
 * serves the genuine "early conversion" role with NEOSURA's real,
 * working field set. The hero's own CTA instead scrolls to that existing
 * module (`#beratung`, a new plain anchor id added to `ServiceInquiry`'s
 * root section — a zero-behavior-change addition safe for every other
 * deep page that also renders it).
 *
 * FINWIWO's first checklist item states "Durchschnittlich CHF 600+
 * Ersparnis pro Jahr" — an unverified savings claim, NOT reproduced.
 * Its own badge ("Prämien-Check 2026") is year-specific and would need
 * annual upkeep with no NEOSURA campaign behind it — replaced with an
 * evergreen equivalent grounded in the client guide's own recurring
 * "jährlich prüfen" concept. All three item bodies instead use the
 * client guide's exact §4.3 Grundversicherung/Zusatzversicherung
 * sentences (via `content/de/deep/gesundheit.ts`, already wired in
 * Phase 7M.1) rather than inventing new copy.
 *
 * Phase 7SYS.B — parallax ratio re-derived with real `page.mouse.wheel()`
 * scrolling (not `window.scrollTo`) and a direct `getComputedStyle`
 * transform read before/after: a 384px real scroll produced a 76.84px
 * `.row-bg` translateY on Krankenkasse and a 76.83px translateY on
 * Unternehmen — both resolving to ratio 0.1999-0.2001, i.e. a precise
 * 0.20×, not the previously-used 0.15×. Multiplier corrected
 * accordingly; the 400px cap (already independently reasonable) is
 * unchanged.
 *
 * A genuine background parallax was measured live (`translateY` scaling
 * ~0.2× scroll offset) — reproduced here as a small, capped,
 * `requestAnimationFrame`-throttled transform, fully disabled under
 * `prefers-reduced-motion` (verified via `useReducedMotion`), not a
 * generic scroll-reveal library. The CTA's own measured hover
 * (`translateY(-3px)`) is reproduced identically.
 *
 * Phase 7SYS.C — CTA hover transition re-derived from zero on FINWIWO's
 * own live Hero button (`/krankenkasse/`): `transition: ... transform
 * 0.45s cubic-bezier(0.25, 1, 0.33, 1) ...`, translateY(-2.98px) on
 * hover (confirming the previously-used -3px figure independently) —
 * duration/easing corrected from Tailwind's default ~150ms/ease to the
 * measured 450ms/custom curve. FINWIWO's own Hero button is actually an
 * OUTLINE style (transparent fill, 2px teal border) — NOT adopted, since
 * NEOSURA's own filled-pill button family is already consistent across
 * every approved page; only the transferable timing/easing was mapped,
 * per this phase's own "map only applicable families" instruction.
 *
 * Phase 7SYS — CTA button weight corrected from `font-normal` to
 * `font-medium` after a fresh live audit: every sampled FINWIWO CTA
 * button (home, Krankenkasse, Wohnen, Fahrzeuge, Vorsorge, Unternehmen)
 * renders at `font-weight: 500`, not 400. Height/padding/font-size/
 * hover-translate were all already correctly matched and are unchanged.
 *
 * No bear here: the only candidate decorative slots are the three
 * repeated 35×35px checklist icons — using a bear for one of three
 * parallel, otherwise-identical icon roles would read as arbitrary
 * rather than a deliberate brand moment, so it's deferred to a later
 * Krankenkasse module (see docs/finwiwo-architecture/deep-krankenkasse.md). */
export function ServiceHeroFullbleed({ badge, h1, intro, items, ctaLabel, ctaHref, photo, overlay = "default", overlayGradient }: ServiceHeroFullbleedProps) {
  const reducedMotion = useReducedMotion();
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const el = bgRef.current;
        if (el) {
          const rect = el.getBoundingClientRect();
          const offset = Math.min(Math.max(-rect.top, 0), 400) * 0.2;
          el.style.transform = `translateY(${offset}px)`;
        }
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion]);

  return (
    <section className="relative overflow-hidden rounded-b-[36px] lg:rounded-b-[90px]">
      <div ref={bgRef} className="absolute inset-0 -top-[60px] h-[calc(100%+120px)] will-change-transform">
        <Image src={photo.photo} alt={photo.alt} fill priority sizes="100vw" className="object-cover" style={{ objectPosition: photo.objectPosition }} />
      </div>
      <div
        aria-hidden
        className={overlayGradient ? "absolute inset-0" : overlay === "light" ? "absolute inset-0 bg-white/48" : "hero-wash absolute inset-0"}
        style={overlayGradient ? { background: overlayGradient } : undefined}
      />

      {/* Phase 8D — deep-page hero, measured on the reference `/krankenkasse/`
          hero: row padding 43 / 72; H1 40/900/45/normal in a 605px column;
          lead 23/500/29/-0.23 (21/27 on phones); checklist title 20/300/27 +
          body 16/300/24 beside a 35px ring on an 83px step; CTA a 2px outline
          pill. Shared by the remaining deep pages, which is intended — this
          page sets their system. */}
      <Container className="relative py-14 lg:pb-[72px] lg:pt-[43px]">
          {/* Phase 8D — deep-page chip, measured on the reference `nectar-badge`:
              a pill 29px tall, 7.2/14.4 padding, 14.4px / 300 / -0.1px, white on a
              left-to-right teal gradient. The earlier global pass had flattened it
              and set it at 13px/500; this restores the measured treatment in
              NEOSURA's own teal. */}
        {badge && (
          <span className="mb-5 inline-flex h-[29px] items-center rounded-full bg-gradient-to-r from-purple/80 to-purple px-[14.4px] text-[0.9rem] font-light leading-none tracking-[-0.1px] text-white lg:mb-6">
            {badge}
          </span>
        )}

        <div className="lg:max-w-[605px]">
          <h1 className="text-[1.9rem] font-black leading-[1.15] tracking-normal text-ink lg:text-[2.5rem] lg:leading-[1.125]">{h1}</h1>
          <p className="mt-5 text-[1.3125rem] font-medium leading-[27px] tracking-[-0.23px] text-ink lg:text-[1.4375rem] lg:leading-[29px]">{intro}</p>

          <ul className="mt-8 flex flex-col gap-[22px]">
            {items.map((item) => (
              <li key={item.title} className="flex items-start gap-5">
                <span
                  aria-hidden
                  className="flex h-[35px] w-[35px] shrink-0 items-center justify-center rounded-full border-2 border-purple text-[1.05rem] text-purple"
                >
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" className="h-[1em] w-[1em]"><path d="M4 10.5l4 4 8-9" /></svg>
                </span>
                <span>
                  <span className="block text-[1.125rem] font-light leading-[27px] tracking-[-0.2px] text-ink lg:text-[1.25rem]">{item.title}</span>
                  <span className="block text-[1rem] font-light leading-[24px] text-ink-soft">{item.body}</span>
                </span>
              </li>
            ))}
          </ul>

          <Link
            href={ctaHref}
            className="mt-8 inline-flex h-[50px] items-center rounded-full border-2 border-purple/75 px-[35px] text-[0.875rem] font-medium tracking-[0.5px] text-purple btn-motion hover:bg-purple hover:text-white"
          >
            {ctaLabel}
          </Link>
        </div>
      </Container>
    </section>
  );
}
