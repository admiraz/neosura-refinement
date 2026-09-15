"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { ServiceVisual } from "@/content/de/serviceVisuals";
import { Container } from "@/components/ui/Container";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface LifeSituationHeroProps {
  h1: string;
  intro: string;
  ctaLabel: string;
  ctaHref: string;
  photo: ServiceVisual;
  /** Phase 7R — optional short supporting line under the CTA (e.g. a
   * language-support note). Additive/backward-compatible: Familie
   * (Phase 7Q) omits it and renders unchanged. */
  note?: string;
}

/** Phase 7Q — NEW component family for NEOSURA's life-situation pages
 * (client guide §4.15: Hero → 3-4 routing blocks → CTA, "these pages
 * route visitors, they sell nothing of their own"). Deliberately NOT a
 * reuse of `ServiceHeroFullbleed` (the private insurance-deep-page hero)
 * even though both share a full-bleed-photo-plus-overlay mechanism —
 * live-measured against `https://finwiwo.ch/finanzen-fuer-familien/`'s
 * own dedicated Hero (`#freude-an-finanzen`) and found genuinely
 * different in a way that matters: FINWIWO's version has no checklist
 * items (a single centered H1 + one supporting line + one button over a
 * full-bleed photo with a dark navy wash, `background-color:#123C5A7D`
 * at 95% opacity, `nectar-parallax-enabled`), whereas every
 * `ServiceHeroFullbleed` usage carries a 2-3 item checklist as a core
 * part of its layout. Forcing an empty `items` array onto that component
 * would be an awkward reuse, not a genuine architecture match — a small
 * dedicated component is cleaner (per this phase's own "prefer a clean
 * reusable family, don't overload existing components" instruction).
 *
 * FINWIWO's own centered-text-on-dark-photo treatment is NOT reproduced:
 * NEOSURA's locked 7SYS.C system uses left-aligned Hero text and
 * restrained white-wash overlays project-wide (never a near-opaque dark
 * wash) — this is a deliberate, documented departure to keep the new
 * life-situation family recognizably NEOSURA, not a measurement gap.
 * What IS reused from the live measurement: the underlying full-bleed
 * background-photo mechanism and its real parallax — a realistic
 * `page.mouse.wheel(0, 384)` scroll on the live Hero produced a 73.76px
 * `.row-bg` translateY (369px actual scroll due to page bounds), i.e.
 * ratio 0.1999 — confirming this Hero's own real parallax is genuinely
 * the same locked 0.20× ratio already used sitewide, not a coincidence
 * or a different family requiring its own new ratio. Reused verbatim
 * (same rAF-throttled, 400px-capped, `prefers-reduced-motion`-safe
 * mechanism already in `ServiceHeroFullbleed`/`ServiceHeroSplit`).
 *
 * No fake family-finance form: FINWIWO's own single button anchors to
 * its own on-page multi-field intake form (`#anfragen`) — not
 * reproduced (Section 10 of this phase's own brief: no fake family
 * check/child-registration/savings form). The one button here routes
 * directly to the real `/analyse` upload flow instead — HERO_PRIMARY_
 * ACTION_COUNT = 1, matching the established hard rule. */
export function LifeSituationHero({ h1, intro, ctaLabel, ctaHref, photo, note }: LifeSituationHeroProps) {
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

      {/* Phase 8G — re-measured on both reference life pages (same template):
          a small "Themen" chip above the title, H1 48/900 (30/900/34 on
          phones), one 16/300/24 supporting line, one 162x50 pill button.
          The reference H1 is a three-word uppercase title on a single line
          (line-height 45px); NEOSURA's approved H1 is a full sentence that
          wraps, so it keeps sentence case and gets 50px leading so umlauts
          on stacked lines never touch. The title gets an 880px measure (the
          intro keeps 600px) so the longer "Neu in der Schweiz" sentence
          sets in three lines, not four, keeping both heroes near the
          reference's 527px. The previous pass set the H1 at 40/700 and the
          intro at 17.9/400/1.55. Left alignment and the white wash stay
          NEOSURA's (see the docstring above). */}
      <Container className="relative py-14 lg:py-[88px]">
        <div className="lg:max-w-[880px]">
          <span className="inline-flex h-[29px] items-center rounded-full bg-gradient-to-r from-purple/80 to-purple px-[14.4px] text-[0.9rem] font-light leading-none tracking-[-0.1px] text-white">
            Themen
          </span>
          {/* On phones the H1 is sized from the viewport so the longest
              unbreakable word always fits its column: "Versicherungssystem."
              measures ~12.2x the font size at 900, which at the reference's
              fixed 30px overran the column (and was clipped by the hero) at
              390 and below. 8vw - 4px keeps it inside down to 320px and
              reaches the reference 30px from ~425px up. */}
          <h1 className="mt-4 text-[clamp(1.35rem,calc(8vw-4px),1.875rem)] font-black leading-[1.13] tracking-normal text-ink lg:text-[3rem] lg:leading-[50px]">{h1}</h1>
          <p className="mt-5 max-w-[600px] text-[1rem] font-light leading-[24px] text-ink">{intro}</p>

          <Link
            href={ctaHref}
            className="mt-8 inline-flex h-[50px] items-center rounded-full bg-purple px-[35px] text-[0.875rem] font-medium tracking-[0.5px] text-white btn-motion"
          >
            {ctaLabel}
          </Link>
          {note && <p className="mt-4 text-[0.875rem] font-light text-ink-soft">{note}</p>}
        </div>
      </Container>
    </section>
  );
}
