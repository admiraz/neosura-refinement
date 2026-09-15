"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { ServiceVisual } from "@/content/de/serviceVisuals";
import { Container } from "@/components/ui/Container";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface ServiceHeroSplitItem {
  title: string;
  body: string;
}

interface ServiceHeroSplitProps {
  h1: string;
  intro: string;
  items: ServiceHeroSplitItem[];
  ctaLabel: string;
  ctaHref: string;
  photo: ServiceVisual;
  cardBadge: string;
  cardTitle: string;
  cardBody: string;
  /** Phase 7O — both optional (default: no button rendered). Every page
   * through Sachversicherung (7K-7N) passed both, reproducing FINWIWO's
   * own real lead-form CTA as a second `/analyse` button — genuinely
   * redundant with the left column's own `ctaLabel`/`ctaHref`, since both
   * pointed at the exact same destination with the exact same intent.
   * Phase 7O's own hard rule ("no two Hero buttons with the same
   * destination and same intent") fixes this at the prop level rather
   * than per-route, since the redundancy was structural to every route
   * using this component, not specific to one page. Making both optional
   * is additive and backward-compatible — every existing caller still
   * passes both and renders byte-identical (regression-confirmed on
   * Betriebshaftpflicht/Flotten/Berufliche Vorsorge/Sachversicherung);
   * a new page (like Krankentaggeld & Unfall) can now render the card as
   * a pure informational summary with no button at all. */
  cardCtaLabel?: string;
  cardCtaHref?: string;
}

/** Phase 7K — the first Unternehmen deep-page hero, deliberately NOT a
 * reuse of `ServiceHeroFullbleed` (the private-customer deep-page hero)
 * or `CategoryHero` (the hub-page hero, whose fullbleed variant hardcodes
 * the whole-business 6-checkbox `CategoryHeroBusinessForm`).
 *
 * Live-measured this phase against
 * `https://finwiwo.ch/versicherungen/unternehmen` (the "Betriebshaftpflicht"
 * mega-menu item's own real destination — `href="#betrieb"` on this exact
 * page). An initial DOM-chain climb from the `<h1>` found
 * `background-image: none` at every ancestor and concluded the hero had
 * lost its full-bleed photo since Phase 7E — that conclusion was WRONG
 * and corrected after comparing a raw screenshot against the DOM: the
 * theme (Nectar/Salient) renders the parallax background as a SIBLING
 * wrapper (`.row-bg-wrap > .row-bg`), not a computed style on any h1
 * ancestor, so the climb missed it entirely. The real, current
 * architecture is: a full-bleed background photo
 * (`background-image: url(...AdobeStock_6195081691.jpg)`, a different
 * crop swapped in for phone) inside `.row-bg`, a white gradient overlay
 * (`linear-gradient(180deg, rgba(255,255,255,.85) 10%, …,
 * rgba(255,255,255,.686) 91%)` — effectively the same ~70-85% white wash
 * already used by `ServiceHeroFullbleed`), genuine JS-driven parallax
 * (`data-parallax-speed="fast"`, a live `translate3d` transform — not a
 * dead class name), and bottom-only 90px corner radius
 * (`bl_br_90px br_br_90px`, same shared radius family used everywhere
 * else in this project). On top of that photo: two equal-width columns
 * (measured x=77/w=643 and x=720/w=643 at 1440 — genuinely ~50/50, not
 * the private hub's own 58/42 `CategoryHero` ratio), H1 40px/normal
 * weight, a 3-item checkmark list and one pill CTA on the left; the
 * right column is a substantial white multi-select lead-form card
 * (~643×680px).
 *
 * That form asks which of 9 business insurance types the visitor wants a
 * quote for — reproducing it verbatim would be architecturally wrong on
 * a page scoped to ONE topic (Betriebshaftpflicht only), even though
 * NEOSURA has a genuine working equivalent (`CategoryHeroBusinessForm`)
 * for the business HUB's own multi-service intake. Per this phase's
 * explicit "no fake functionality, preserve spatial architecture where
 * reasonable" rule, the right column keeps the same white-card mass and
 * position but holds a short, truthful, topic-scoped message and a real
 * `/analyse` CTA instead of a 9-option checkbox grid — no new fields, no
 * fake submission. The `photo` prop fills the full-bleed background
 * layer (not a second boxed image) — this is intentionally the ONE
 * dominant image on the page, matching `ServiceHeroFullbleed`'s own
 * fullbleed treatment rather than adding a second cropped photo card
 * next to the text card.
 *
 * Phase 7SYS — a full re-measurement of this component against live
 * FINWIWO found it was already closely calibrated: rendered Hero height
 * 527px vs. FINWIWO's own measured 810px (NEOSURA is shorter, not
 * heavier), card width 632px vs. FINWIWO's real form panel 617-630px,
 * card padding 32px vs. ~31px measured, overlay 78% vs. FINWIWO's own
 * ~78%-average white gradient — all already accurate, no change made.
 * The one genuine, measured discrepancy: both CTA buttons rendered
 * `font-weight: 400`, but every sampled FINWIWO button (home,
 * Krankenkasse, Wohnen, Fahrzeuge, Vorsorge, Unternehmen) computes to
 * `font-weight: 500` — corrected to `font-medium` here.
 *
 * Phase 7SYS.B — direct screenshot review (not isolated CSS-value
 * comparison) found the flat 78% overlay reads as genuinely washed out
 * on this SPLIT hero specifically, more so than the private fullbleed
 * family's own 72%/48% treatment — the split hero's photo occupies the
 * ENTIRE row behind both columns (including the white info card, which
 * itself further reduces visible photo area), so the same nominal
 * opacity reads heavier here than on a fullbleed hero with no
 * competing white panel. Reduced to 58%. H1 weight bumped
 * `font-normal` → `font-bold`: sentence-case alone reads markedly
 * weaker than FINWIWO's own uppercase/900-weight H1 (a deliberate,
 * documented non-match — see `finwiwo-visual-system.md` §5); a bolder
 * weight restores visual authority without adopting the uppercase
 * treatment.
 *
 * Parallax is reproduced with the exact same capped,
 * `requestAnimationFrame`-throttled mechanism already used by
 * `ServiceHeroFullbleed` (genuinely reference-supported here, now that
 * the background layer has actually been found), fully disabled under
 * `prefers-reduced-motion`.
 *
 * Phase 7SYS.C — CTA hover transition duration/easing corrected to the
 * same freshly-measured `450ms cubic-bezier(0.25, 1, 0.33, 1)` curve
 * documented in `ServiceHeroFullbleed`'s own docstring (measured on
 * FINWIWO's Hero button family generally, not re-measured a second time
 * page-specifically since it's the same site-wide button mechanism).
 *
 * Phase 7SYS.B — multiplier corrected `0.15`→`0.2` after a fresh
 * real-scroll re-measurement on `/versicherungen/unternehmen` itself
 * (this component's own live reference): a 384px `page.mouse.wheel()`
 * scroll produced a 76.83px `.row-bg` translateY, i.e. ratio 0.2000 —
 * see `ServiceHeroFullbleed`'s own docstring for the paired Krankenkasse
 * measurement (0.1999), confirming this is a consistent sitewide ratio,
 * not a one-page coincidence.
 *
 * Palette follows this phase's own restraint rule: turquoise for the
 * checklist ticks (matching `WohnenEditorialRow`'s established
 * checkmark language), violet for the CTA buttons — the same split
 * already used by `CategoryHero`, not a private-page teal CTA pasted in
 * unchanged. */
export function ServiceHeroSplit({
  h1,
  intro,
  items,
  ctaLabel,
  ctaHref,
  photo,
  cardBadge,
  cardTitle,
  cardBody,
  cardCtaLabel,
  cardCtaHref,
}: ServiceHeroSplitProps) {
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
      <div aria-hidden className="hero-wash absolute inset-0" />

      {/* Phase 8F — business deep-page hero, aligned to the approved business
          hero (the `/unternehmen` hub): H1 40/900/45/normal, lead 23/500/29
          (21/27 on phones), checklist ring 35px with 20/300 titles and 16/300
          bodies, card chip the measured deep-page pill (29px, 14.4/300, teal
          gradient), card heading 23/500/29 centred as on the reference lead
          panel; row padding 58 / 72. Used only by the six business pages. */}
      <Container className="relative grid gap-10 py-12 lg:grid-cols-2 lg:items-center lg:gap-14 lg:pb-[72px] lg:pt-[58px]">
        <div>
          <h1 className="max-w-[18ch] text-[1.9rem] font-black leading-[1.15] tracking-normal text-ink lg:max-w-[605px] lg:text-[2.5rem] lg:leading-[1.125]">{h1}</h1>
          <p className="mt-5 max-w-[605px] text-[1.3125rem] font-medium leading-[27px] tracking-[-0.23px] text-ink lg:text-[1.4375rem] lg:leading-[29px]">{intro}</p>

          <ul className="mt-7 flex flex-col gap-[22px]">
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
            className="mt-8 inline-flex h-[50px] items-center rounded-full bg-purple px-[35px] text-[0.875rem] font-medium tracking-[0.5px] text-white btn-motion hover:bg-purple-600"
          >
            {ctaLabel}
          </Link>
        </div>

        <div className="w-full rounded-[20px] bg-white p-6 shadow-lg sm:p-8">
          <div className="text-center">
            <span className="inline-flex h-[29px] items-center rounded-full bg-gradient-to-r from-purple/80 to-purple px-[14.4px] text-[0.9rem] font-light leading-none tracking-[-0.1px] text-white">{cardBadge}</span>
            <h2 className="mt-4 text-[1.3125rem] font-medium leading-[27px] tracking-[-0.23px] text-ink lg:text-[1.4375rem] lg:leading-[29px]">{cardTitle}</h2>
            <p className="mt-2 text-[1rem] font-light leading-[24px] text-ink-soft">{cardBody}</p>
          </div>
          {cardCtaLabel && cardCtaHref && (
            <Link
              href={cardCtaHref}
              className="mt-6 inline-flex h-[50px] w-full items-center justify-center rounded-full bg-purple px-[35px] text-[0.875rem] font-medium tracking-[0.5px] text-white btn-motion hover:bg-purple-600"
            >
              {cardCtaLabel}
            </Link>
          )}
        </div>
      </Container>
    </section>
  );
}
