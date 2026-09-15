"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ServiceVisual } from "@/content/de/serviceVisuals";
import { Container } from "@/components/ui/Container";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface WohnenEditorialRowProps {
  id?: string;
  heading: string;
  paragraph: string;
  checklist: string[];
  ctaLabel: string;
  ctaHref: string;
  photo: ServiceVisual;
  /** true = image on the right / text on the left (desktop only). */
  reverse?: boolean;
  /** Phase 7SYS.B — true reduces bottom padding to 28.8px (`pb-[29px]`)
   * instead of the row family's own symmetric 86px. Matches a genuine
   * FINWIWO measurement (`/wohnen-recht-ferien/`'s own Hausrat row and
   * `/versicherungen/unternehmen`'s own `#betrieb` row both use a
   * reduced bottom padding ONLY on the row immediately following their
   * page's Hero — every subsequent row uses full symmetric 86.4px).
   * Opt-in, defaults to `false` so every existing usage renders
   * byte-identical; intended for the first editorial row on a page only. */
  tightBottom?: boolean;
  /** Phase 8E — the approved private deep-page row (as on Krankenkasse):
   * photo 545x364 beside a 467/493px text column in an inset ~1113px block,
   * H2 30/400/36 at normal tracking, body 16/300/24, checklist 16/300 on a
   * 31px step. The reference `/wohnen-recht-ferien/` rows measure exactly
   * this. Opt-in so the `/unternehmen/*` deep pages keep their current rows
   * until their own pass. */
  inset?: boolean;
  /** Phase 8E — with `inset`: the reference `/vorsorge/` row geometry
   * ("Die Pensionsplanung"): photo 436x290 (20px radius), a wider 604px
   * text column 72px away, H2 28.8/400/34.56 — the same ~1112px block as
   * the standard row, balanced toward the text. */
  narrowImage?: boolean;
}

/** Phase 7G — live-remeasured against
 * https://finwiwo.ch/wohnen-recht-ferien/, the shared editorial-row
 * architecture used identically by FINWIWO's own Hausrat/Privathaftpflicht/
 * Rechtsschutz/Reiseversicherung modules (all four independently measured:
 * same `full-width-content` row, transparent background, 7% gutters, image
 * 544.9×363.3 at 1440 — genuinely the SAME size, within a pixel, as
 * `KrankenkasseGrundversicherung`'s own image slot on a completely
 * different FINWIWO page, confirming this is a shared FINWIWO row
 * template, not a coincidence). Image radius 20px, swash wraps the ENTIRE
 * (single-word/short) heading in every one of the four live instances
 * (confirmed via `outerHTML` on Hausrat/Privathaftpflicht/Rechtsschutz —
 * no partial-heading swash here, unlike Krankenkasse's Franchise/FAQ
 * headings). Desktop alternates image-left/image-right across the four
 * live rows (Hausrat left, Privathaftpflicht right, Rechtsschutz left,
 * Reise right — confirmed via direct x-position comparison, not class-name
 * guessing); on mobile all four converge to image-first regardless of
 * their desktop side (confirmed via direct y-position comparison), the
 * same convention already established on Krankenkasse. CTA is a plain
 * teal text link with a leading-icon left-padding, `#formular` on
 * FINWIWO (dead anchor, not reproduced — mapped to `/analyse`), no hover
 * transform. Confirmed fully static: image opacity/transform sampled
 * before/after a realistic incremental scroll through the module — no
 * change, no fade-in (unlike Krankenkasse's Zusatzversicherung, which DID
 * have a measured fade-in — not assumed identical here, independently
 * re-verified and found static instead, matching Grundversicherung's own
 * finding instead).
 *
 * Used three times on `/privatkunden/wohnen-eigentum`: Hausrat (`reverse`
 * false, matching FINWIWO's own image-left), Privathaftpflicht (`reverse`
 * true, matching FINWIWO's own image-right), and Gebäudeversicherung
 * (`reverse` false — ARCHITECTURE REUSED FROM LIVE FINWIWO
 * Rechtsschutzversicherung's row position/geometry; Rechtsschutz's own
 * content is not client-required on this page and is not reproduced —
 * CONTENT ROLE REPLACED BY CLIENT-REQUIRED GEBÄUDEVERSICHERUNG). FINWIWO's
 * own Rechtsschutz/Reise content, and the whole Rechtsschutz/Reise topic,
 * is intentionally excluded per this phase's explicit brief.
 *
 * Phase 7SYS.B — two corrections after screenshot review found real
 * issues 7SYS's isolated CSS-value measurements had missed:
 * (1) background changed from `bg-transparent` to `bg-white`. NEOSURA's
 * body/root background is `--color-paper` (`#f9f5ff`, a pale violet) —
 * every "transparent" row on every page was silently inheriting that
 * tint, producing a continuous lavender wash across the entire
 * editorial-row section on all 10 rebuilt routes. FINWIWO's own
 * equivalent rows sit on a plain white/photography canvas; explicit
 * `bg-white` now matches that and lets the warm-neutral `bg-paper-2`
 * modules (info boxes, Newsletter) read as genuine, deliberate section
 * breaks instead of blending into a continuous colored field.
 * (2) heading weight bumped `font-normal` → `font-medium`. FINWIWO's own
 * row H2 measures weight 400, so this is a deliberate, modest
 * divergence from that exact figure (not a re-measurement error) — full
 * reasoning in `docs/finwiwo-architecture/finwiwo-visual-system.md`
 * (the "H2 correction" section): against the flatter photography-free
 * canvas the change in (1) creates, a completely 400-weight heading
 * read as thin in direct screenshot comparison; 500 is the smallest
 * step that visibly restores presence without approaching FINWIWO's
 * own bold treatment or overriding measured evidence wholesale.
 *
 * Phase 7SYS.C — swash easing re-derived from zero (not retained from
 * an earlier phase's own note): live-triggered the actual
 * `nectarStrokeAnimation` CSS keyframe animation on
 * `/krankenkasse/`'s own Franchise heading and read its computed
 * `animationTimingFunction` mid-draw — the real curve is
 * `cubic-bezier(0.65, 0, 0.35, 1)`, not the generic `ease-out`
 * approximation previously used. Duration (1.8s), one-time trigger
 * (`animation-iteration-count: 1`), and forwards fill mode were all
 * independently reconfirmed identical to the existing implementation —
 * only the easing curve was corrected. */
export function WohnenEditorialRow({ id, heading, paragraph, checklist, ctaLabel, ctaHref, photo, reverse = false, tightBottom = false, inset = false, narrowImage = false }: WohnenEditorialRowProps) {
  const wide = inset && narrowImage;
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
    <section id={id} className={id ? "scroll-mt-24 bg-white" : "bg-white"}>
      <Container
        className={`py-[48px] lg:grid lg:items-center lg:gap-x-[80px] lg:pt-[86px] ${inset ? `lg:max-w-[1233px] ${wide ? (reverse ? "lg:grid-cols-[minmax(0,1fr)_436px] lg:gap-x-[72px]" : "lg:grid-cols-[436px_minmax(0,1fr)] lg:gap-x-[72px]") : reverse ? "lg:grid-cols-[minmax(0,1fr)_545px]" : "lg:grid-cols-[545px_minmax(0,1fr)]"}` : "lg:grid-cols-2"} ${tightBottom ? "lg:pb-[29px]" : "lg:pb-[86px]"}`}
      >
        <div
          className={`relative h-[224px] w-full overflow-hidden rounded-[20px] sm:h-[300px] ${wide ? "lg:h-[290px]" : "lg:h-[364px]"} ${reverse ? "lg:order-2" : "lg:order-1"}`}
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

        <div className={`mt-8 lg:mt-0 ${reverse ? "lg:order-1" : "lg:order-2"}`}>
          <h2
            className={`text-[1.6875rem] leading-[1.2] text-ink ${inset ? (wide ? "font-normal tracking-normal lg:text-[1.8rem] lg:leading-[34.56px]" : "font-normal tracking-normal lg:text-[1.875rem] lg:leading-[36px]") : "font-medium lg:text-[1.8rem]"}`}
          >
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

          <p className={`mt-6 text-[1rem] font-light leading-[1.5] text-ink ${inset ? (wide ? "max-w-[604px]" : reverse ? "max-w-[493px]" : "max-w-[467px]") : "max-w-[46ch]"}`}>{paragraph}</p>

          <ul className={inset ? "mt-6 flex flex-col gap-[10px]" : "mt-7 flex flex-col gap-3"}>
            {checklist.map((item) => (
              <li key={item} className={`flex items-start gap-3 text-ink ${inset ? "text-[1rem] font-light leading-[20.8px]" : "text-[0.98rem]"}`}>
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
