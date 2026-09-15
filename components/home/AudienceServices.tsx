"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { privateServices } from "@/content/de/private";
import { businessServices } from "@/content/de/business";
import { clientGuideHome } from "@/content/de/clientGuide";
import { privateServiceVisuals, businessServiceVisuals } from "@/content/de/serviceVisuals";
import { privateServiceExtras, businessServiceExtras } from "@/content/de/serviceExtras";
import type { Audience } from "@/content/de/types";
import { Container } from "@/components/ui/Container";
import { ServiceHighlightRow } from "./ServiceHighlightRow";
import { Reveal } from "@/components/ui/Reveal";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

const TABS: {
  id: Audience;
  label: string;
  photo: string;
  objectPosition: string;
  ctaLabel: string;
  href: string;
}[] = [
  {
    id: "privat",
    // Phase 7M.1 — label/ctaLabel are the client guide §4.1 teaser title
    // and button copy verbatim.
    label: "Für Privatpersonen",
    photo: "/images/services/private-health.webp",
    objectPosition: "center 35%",
    ctaLabel: "Zu den Privatkunden-Lösungen",
    href: "/privatkunden",
  },
  {
    id: "unternehmen",
    label: "Für Unternehmen",
    photo: "/images/services/business-liability.webp",
    objectPosition: "center 35%",
    ctaLabel: "Zu den Unternehmens-Lösungen",
    href: "/unternehmen",
  },
];

/** "Zwei Perspektiven" — FINWIWO's life-stage section translated into
 * NEOSURA's only two real audiences. FINWIWO's own version (measured live,
 * Phase 7C.4) is structurally a 4-tile Flickity carousel that never
 * initializes (`nectar-flickity not-initialized`) — it renders as a static
 * row in practice, so this doesn't build carousel mechanics for NEOSURA's
 * 2 items either; two large photographic panels is the closest truthful
 * adaptation (see docs/finwiwo-architecture/interactions.md). Panel
 * geometry (10px radius, tight gap, hover lift) matches the measured
 * tiles, scaled up since 2 real items can each be larger than FINWIWO's
 * 4-in-a-row tiles. Only the active audience's five service rows are
 * rendered, so a screen reader never sees duplicate hidden content. Each
 * panel is a select-target (button, switches the dataset below) plus a
 * separate explicit CTA link (navigates to the hub) — not the same
 * action, per the brief's select-vs-navigate distinction. */
export function AudienceServices() {
  const [audience, setAudience] = useState<Audience>("privat");
  const reducedMotion = useReducedMotion();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const isPrivat = audience === "privat";
  const services = isPrivat ? privateServices : businessServices;
  const visuals = isPrivat ? privateServiceVisuals : businessServiceVisuals;
  const extras = isPrivat ? privateServiceExtras : businessServiceExtras;
  const basePath = isPrivat ? "/privatkunden" : "/unternehmen";

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

  return (
    <section className="bg-white">
      {/* Phase 9A — cleaner selection: the purple-to-teal gradient rule, the
          "01/02" counters and the 8px hover lift are gone; hovering a panel
          now only eases its photo to 1.02. Heading and panels enter as one
          group. The service rows below sit on the same white instead of a
          separate tinted band, with the spacer before them reduced to match. */}
      <Reveal>
      <Container className="pt-16 lg:pt-[88px]">
        <h2 className="max-w-[26ch] text-[1.6rem] font-normal leading-[1.3] tracking-normal text-ink lg:text-[1.875rem] lg:leading-[1.4]">
          Zwei Perspektiven.
          <br />
          Eine klare Struktur.
        </h2>
      </Container>

      <Container className="mt-9 lg:mt-12">
        <div
          role="tablist"
          aria-label="Zielgruppe wählen"
          onKeyDown={onKeyDown}
          className="grid grid-cols-1 gap-2.5 sm:grid-cols-2"
        >
          {TABS.map((tab, i) => {
            const active = tab.id === audience;
            // Phase 7M.1 — client guide §4.1 teaser body copy verbatim.
            const description =
              tab.id === "privat" ? clientGuideHome.teaserPrivat.body : clientGuideHome.teaserUnternehmen.body;
            return (
              <div key={tab.id} className="relative">
                <button
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`audience-tab-${tab.id}`}
                  aria-selected={active}
                  aria-controls={`audience-panel-${tab.id}`}
                  tabIndex={active ? 0 : -1}
                  onClick={() => setAudience(tab.id)}
                  className={cn(
                    "img-zoom-trigger group relative block h-[390px] w-full overflow-hidden rounded-[10px] text-left transition-opacity duration-300 ease-[var(--ease-motion-small)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple sm:h-[440px] lg:h-[480px]",
                    !active && "opacity-[0.88]"
                  )}
                >
                  <Image
                    src={tab.photo}
                    alt=""
                    fill
                    loading="lazy"
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="img-zoom img-zoom-strong object-cover"
                    style={{ objectPosition: tab.objectPosition }}
                  />
                  {/* Phase 8A — the reference's equivalent cards carry a
                      dark mass behind the whole label block, so their white
                      type is fully legible; NEOSURA's stopped at `dark/15`
                      through the band its own body copy sits in, leaving that
                      copy floating over bright photography. Same shape, real
                      contrast under the text, still clearing the top half of
                      the image. */}
                  <div
                    aria-hidden
                    className="overlay-shift absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(0deg, rgba(20,8,31,0.88) 0%, rgba(20,8,31,0.78) 32%, rgba(20,8,31,0.42) 58%, rgba(20,8,31,0.12) 78%, rgba(20,8,31,0) 100%)",
                    }}
                  />
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-0 bottom-0 h-[4px] bg-purple transition-opacity",
                      active ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 pb-[72px] sm:p-7 sm:pb-20 lg:p-8 lg:pb-20">
                    <span className="block text-[1.9rem] font-medium tracking-[-0.01em] text-white lg:text-[2.2rem]">
                      {tab.label}
                    </span>
                    <span className="mt-2 block max-w-[36ch] text-[0.92rem] leading-relaxed text-white/85">
                      {description}
                    </span>
                  </div>
                </button>

                <Link
                  href={tab.href}
                  className="arrow-trigger absolute bottom-6 left-6 z-10 inline-flex items-center gap-2 text-[0.85rem] font-medium text-white transition-colors hover:text-white/80 sm:bottom-7 sm:left-7 lg:bottom-8 lg:left-8"
                >
                  <span className="link-line pb-[3px]">{tab.ctaLabel}</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden
                    className="arrow-shift h-3.5 w-3.5"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            );
          })}
        </div>
      </Container>
      </Reveal>

      <div className="h-[40px] lg:h-[56px]" aria-hidden />

      <div
        key={audience}
        role="tabpanel"
        id={`audience-panel-${audience}`}
        aria-labelledby={`audience-tab-${audience}`}
        className={cn("bg-white", !reducedMotion && "animate-[audience-fade_300ms_ease-out]")}
      >
        {services.map((service, i) =>
          i === 0 ? (
            /* Visual polish pass — this first row used to be the only one on
               the strip left on the default `corner` mask with a full-bleed
               mobile photo, which exposed the accent colour as a flat ~44px
               bar down the outer edge instead of the crescent every other row
               shows. Same geometry as its siblings now; content unchanged. */
            <ServiceHighlightRow
              key={service.slug}
              service={service}
              visual={visuals[i]}
              extra={extras[i]}
              basePath={basePath}
              imageSide="right"
              maskStyle="stadium"
              mobileBleed={false}
              accent="purple"
            />
          ) : i === 1 ? (
            <ServiceHighlightRow
              key={service.slug}
              service={service}
              visual={visuals[i]}
              extra={extras[i]}
              basePath={basePath}
              imageSide="left"
              maskStyle="stadium"
              mobileBleed={false}
              accent="teal"
            />
          ) : i === 2 ? (
            <ServiceHighlightRow
              key={service.slug}
              service={service}
              visual={visuals[i]}
              extra={extras[i]}
              basePath={basePath}
              imageSide="right"
              maskStyle="stadium"
              mobileBleed={false}
              accent="purple"
            />
          ) : i === 3 ? (
            <ServiceHighlightRow
              key={service.slug}
              service={service}
              visual={visuals[i]}
              extra={extras[i]}
              basePath={basePath}
              imageSide="left"
              maskStyle="stadium"
              mobileBleed={false}
              accent="teal"
            />
          ) : (
            <ServiceHighlightRow
              key={service.slug}
              service={service}
              visual={visuals[i]}
              extra={extras[i]}
              basePath={basePath}
              imageSide="right"
              maskStyle="stadium"
              mobileBleed={false}
              accent="purple"
            />
          )
        )}
      </div>
    </section>
  );
}
