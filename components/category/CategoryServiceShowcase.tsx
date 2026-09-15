"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { privateServices } from "@/content/de/private";
import { businessServices } from "@/content/de/business";
import { privateServiceVisuals, businessServiceVisuals } from "@/content/de/serviceVisuals";
import type { Audience } from "@/content/de/types";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

const TABS: { id: Audience; label: string }[] = [
  { id: "privat", label: "Privatkunden" },
  { id: "unternehmen", label: "Unternehmen" },
];

/** Phase 7D.4 — rebuilt from FINWIWO's live `/versicherungen/` module
 * right after the explainer (measured 1440/390): a white `wpb_row`,
 * rounded on all four corners (50px, unchanged on mobile — confirmed
 * live, not a responsive reduction), floating on the same `paper-2`
 * backdrop the Hero/Statement/Explainer trio already shares, ~22px gap
 * below the explainer (Phase 7D.3's own measurement). The row carries a
 * static `scale_desktop_0-93` transform confirmed active at every
 * sampled scroll position (before/20/40/60/80/after — always
 * `matrix(0.93,0,0,0.93,0,0)`, never interpolating) and unchanged across
 * 6 reload timestamps — i.e. a permanent, non-scroll-linked cosmetic
 * inset, not a reveal effect. Reproduced here as a plain, correctly
 * sized box (no transform hack) rather than copying the class, per the
 * project's "measure the rendered box, don't copy the class name" rule.
 *
 * FINWIWO's "toggle" is not a checkbox — DOM inspection
 * (`document.elementFromPoint`) found a genuine jQuery UI Tabs widget
 * (`wpb_tabs_nav ui-tabs-nav`, two `<li role look-alike>` tabs) styled
 * with CSS to *look* like an iOS switch. Reproduced as an accessible
 * 2-tab segmented control (`role="tablist"`/`role="tab"`, sliding pill
 * behind whichever label is active) — same interaction grammar as the
 * homepage's own audience tabs, and more accessible than FINWIWO's own
 * pattern of two bystander text labels flanking a decorative switch
 * (Section 16: don't emulate FINWIWO's a11y defects). Switching audience
 * does not resize the section on FINWIWO (580px row height measured
 * identical before/after switching) and cards show no hover transform,
 * scale, or shadow at all (`transform: none`, `boxShadow: none` sampled
 * before/after `:hover`) — reproduced with zero hover motion.
 *
 * Card count is exactly 4 per audience on FINWIWO, never more (DOM,
 * visible, and business-tab counts all agree) — a product-type grid
 * ("Krankenkasse"/"Wohnen, Recht & Ferien"/"Fahrzeuge"/"Personen"), not
 * NEOSURA's 5-service taxonomy. Per the brief's preferred option 1,
 * NEOSURA's 5th service simply wraps into a natural second grid row —
 * same card size, same gap, no invented carousel/pagination to hide it.
 * Each photo is rounded on its top corners only, sitting on a light
 * label band (dash + title) rounded on the bottom corners — one visual
 * card unit, confirmed via the live radius split ("5px 5px 0 0" on the
 * image). FINWIWO's own `<img>` tiles carry no `href` in the DOM; NEOSURA
 * makes every card a genuine link to its service (Section 16 requires
 * real links with descriptive names, not decorative images). */
export function CategoryServiceShowcase() {
  const [audience, setAudience] = useState<Audience>("privat");
  const reducedMotion = useReducedMotion();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const isPrivat = audience === "privat";
  const services = isPrivat ? privateServices : businessServices;
  const visuals = isPrivat ? privateServiceVisuals : businessServiceVisuals;
  const basePath = isPrivat ? "/privatkunden" : "/unternehmen";
  const activeAccent = isPrivat ? "bg-purple" : "bg-purple";

  function selectByOffset(offset: 1 | -1) {
    const i = TABS.findIndex((t) => t.id === audience);
    const next = TABS[(i + offset + TABS.length) % TABS.length];
    setAudience(next.id);
    tabRefs.current[TABS.findIndex((t) => t.id === next.id)]?.focus();
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      selectByOffset(1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      selectByOffset(-1);
    }
  }

  /* Phase 8B.1 — the reference shows four cards at 290x225 with a 28px gap.
   * Forcing NEOSURA's five into one row shrank them to 226x174, well below
   * the reference's density; a 4-column grid orphaned the fifth. The cards
   * now keep the reference's exact 290px width and 13/10 image, and wrap as a
   * centred 3 + 2 at desktop — a balanced pair of rows at the reference's
   * proportions rather than an undersized strip. Mobile still stacks one-up,
   * as the reference does. */
  /* Phase 9B — editorial tiles: the lavender label band under each photo
   * is gone (photo fully rounded, title set open beneath it), and hovering a
   * card eases its photo to 1.02 — pointer devices only, no lift, no shadow. */
  return (
    <div className="bg-white">
      <div>
        <Container>
          <div className="py-14 lg:py-[92px]">
            <div
              role="tablist"
              aria-label="Zielgruppe wählen"
              onKeyDown={onKeyDown}
              className="flex items-center justify-center gap-3 sm:gap-4"
            >
              {TABS.map((tab, i) => {
                const active = tab.id === audience;
                return (
                  <button
                    key={tab.id}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`showcase-tab-${tab.id}`}
                    aria-selected={active}
                    aria-controls={`showcase-panel-${tab.id}`}
                    tabIndex={active ? 0 : -1}
                    onClick={() => setAudience(tab.id)}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-[0.95rem] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple sm:px-5 sm:text-[1.05rem]",
                      active ? "font-medium text-ink" : "font-light text-ink-soft/70 hover:text-ink-soft"
                    )}
                  >
                    {active && (
                      <span
                        aria-hidden
                        className={cn("absolute inset-0 -z-10 rounded-full", isPrivat ? "bg-purple/10" : "bg-teal/15")}
                      />
                    )}
                    {tab.label}
                  </button>
                );
              })}
              <span aria-hidden className="mx-1 h-[26px] w-[46px] shrink-0 rounded-full bg-paper-2 p-[3px] sm:mx-2">
                <span
                  className={cn("block h-full w-1/2 rounded-full transition-transform duration-300", activeAccent)}
                  style={{ transform: isPrivat ? "translateX(0)" : "translateX(100%)" }}
                />
              </span>
            </div>

            <div
              key={audience}
              role="tabpanel"
              id={`showcase-panel-${audience}`}
              aria-labelledby={`showcase-tab-${audience}`}
              className={cn(
                "mt-9 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 lg:mt-12 lg:flex lg:flex-wrap lg:justify-center lg:gap-x-7 lg:gap-y-8",
                !reducedMotion && "animate-[audience-fade_300ms_ease-out]"
              )}
            >
              {services.map((service, i) => (
                <Link
                  key={service.slug}
                  href={`${basePath}/${service.slug}`}
                  className="img-zoom-trigger arrow-trigger group rounded-[10px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple lg:w-[290px]"
                >
                  <div className="relative aspect-[13/10] overflow-hidden rounded-[10px]">
                    <Image
                      src={visuals[i].photo}
                      alt={visuals[i].alt}
                      fill
                      loading="lazy"
                      sizes="(min-width: 1024px) 290px, (min-width: 640px) 45vw, 90vw"
                      className="img-zoom object-cover"
                      style={{ objectPosition: visuals[i].objectPosition }}
                    />
                  </div>
                  <div className="flex items-center gap-2.5 px-1 pt-3.5 sm:pt-4">
                    <span aria-hidden className="text-ink-soft/70">
                      —
                    </span>
                    {/* Phase 9B — the card had no link affordance at all beyond
                        its photo; the title now carries the page's standard
                        underline reveal (hover and keyboard focus). */}
                    <span className="link-line pb-[2px] text-[0.9rem] leading-[1.3] text-ink sm:text-[0.95rem]">
                      {service.title}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
