"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { ServiceVisual } from "@/content/de/serviceVisuals";
import { Container } from "@/components/ui/Container";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { Reveal } from "@/components/ui/Reveal";

interface AdvantageItem {
  title: string;
  body: string;
}

interface CategoryAdvantagesProps {
  headingAccent: string;
  headingRest: string;
  paragraph: string;
  items: AdvantageItem[];
  ctaLabel: string;
  ctaHref: string;
  photo: ServiceVisual;
  accent: "purple" | "teal";
  /** FINWIWO's second editorial row ("Versicherungen für Unternehmen")
   * mirrors the first with photo/text sides swapped — confirmed live
   * (image left ~175px vs. image right ~763px on a 1440 viewport, text
   * on the opposite side each time), not a generic reversal invented for
   * NEOSURA. Defaults to "left" so the already-approved first row's
   * markup/order is untouched. */
  imageSide?: "left" | "right";
  /** Phase 7E.3 — FINWIWO's `/unternehmen` instances of this same row
   * family show a genuine CTA hover lift (`translateY(-2.98px)`,
   * confirmed live on both the row1 and row2 CTAs there) that the
   * locked `/privatkunden` instances never had this measured on.
   * Defaults to `false` so private's exact CTA hover (color only, no
   * transform) is untouched; only `/unternehmen` opts in. */
  ctaHoverLift?: boolean;
  /** Phase 8C — `/unternehmen`'s own editorial rows were measured
   * independently: the photo is 545x364 (not a half-width column), the
   * text column 467-493px, and the pair sits as an inset ~1113px block with
   * a 30/36 H2. Opt-in so the locked `/privatkunden` rows are unchanged. */
  inset?: boolean;
  /** Phase 9B — `/privatkunden` only: the row enters as one group, where
   * the reference fades these rows in. Off by default, so `/unternehmen`
   * renders unchanged. */
  reveal?: boolean;
}

function MaybeReveal({ on, children }: { on: boolean; children: ReactNode }) {
  return on ? <Reveal>{children}</Reveal> : <>{children}</>;
}

/** Phase 7D.5 — rebuilt from FINWIWO's live `/versicherungen/` module
 * immediately after the Privatpersonen/Unternehmen card showcase
 * (measured 1440/390): the FIRST content encountered scrolling past the
 * showcase is genuinely NOT a service-detail chapter — it's a single
 * plain "why us" editorial row headed "Versicherungen für [Private]"
 * (transparent bg, 86.4px v-padding, no card/radius of its own),
 * followed immediately by a second, independent, always-rendered row
 * "Versicherungen für [Unternehmen]" with the same structure mirrored
 * (photo/text sides swapped). Both exist in the DOM regardless of the
 * showcase's toggle state — confirmed live, the toggle only ever
 * touches the card grid above it — so this NEOSURA rebuild is NOT
 * wired to the showcase's audience state; on `/privatkunden` only the
 * Private-equivalent row is built, per the brief's explicit "don't turn
 * the category page into a second audience switcher."
 *
 * Photo (545×364, ratio ~3:2, 20px radius all corners, confirmed — not
 * the showcase card's top-only radius) sits beside an H2 using the
 * *exact* type scale already locked on `CategoryExplainer`
 * (28.8/34.56 desktop, same 16/24 light-300 paragraph column) — FINWIWO
 * reuses its own explainer heading style here too, so this reuses the
 * same swash mechanic verbatim: `nectar-scribble` is confirmed live to
 * be the identical IntersectionObserver-gated, one-time
 * `stroke-dashoffset` draw (sampled mid-transition across a scroll
 * range, not a scroll-scrubbed effect) already built for 7D.3, not a
 * new animation invented for this phase. A 3-item checklist follows
 * (`icon-salient-check` glyph + bold title + description, live DOM),
 * then a plain, undecorated text CTA — not a pill button; hover sampled
 * before/after and stayed `text-decoration: none` both times, i.e.
 * genuinely static, reproduced with zero hover motion.
 *
 * Mobile (measured 390px): image renders first, full width inset in
 * the standard container gutter, same ~3:2 ratio (not cropped
 * differently), then heading → paragraph → checklist → CTA — a
 * top-to-bottom stack, not a side-by-side collapse.
 *
 * `principles` already carries NEOSURA's genuine 3 differentiators
 * (verbatim from neosura.ch, the same 3 already used as this page's own
 * Hero value points) — reused here rather than inventing new copy. */
export function CategoryAdvantages({
  headingAccent,
  headingRest,
  paragraph,
  items,
  ctaLabel,
  ctaHref,
  photo,
  accent,
  imageSide = "left",
  ctaHoverLift = false,
  inset = false,
  reveal = false,
}: CategoryAdvantagesProps) {
  const [drawn, setDrawn] = useState(false);
  const emRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const stroke = accent === "teal" ? "var(--color-purple)" : "var(--color-purple)";
  const checkColor = accent === "teal" ? "text-purple" : "text-purple";
  const imageOrder = imageSide === "left" ? "lg:order-1" : "lg:order-2";
  const textOrder = imageSide === "left" ? "lg:order-2" : "lg:order-1";

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
    <div className="bg-paper-2 py-14 lg:py-[86px]">
      <Container>
        <MaybeReveal on={reveal}>
        <div
          className={
            inset
              ? `lg:mx-auto lg:grid lg:max-w-[1113px] lg:items-center lg:gap-x-[80px] ${imageSide === "left" ? "lg:grid-cols-[545px_minmax(0,1fr)]" : "lg:grid-cols-[minmax(0,1fr)_545px]"}`
              : "lg:grid lg:grid-cols-2 lg:items-center lg:gap-x-[80px]"
          }
        >
          <div className={`relative h-[224px] w-full overflow-hidden rounded-[20px] sm:h-[300px] lg:h-[364px] ${imageOrder}`}>
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

          <div className={`mt-8 lg:mt-0 ${textOrder}`}>
            <h2
              className={`text-[1.6875rem] font-normal leading-[1.2] tracking-normal text-ink ${inset ? "lg:text-[1.875rem] lg:leading-[36px]" : "lg:text-[1.8rem]"}`}
            >
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
                    stroke={stroke}
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

            <p className="mt-6 max-w-[467px] text-[1rem] font-light leading-[1.5] text-ink">{paragraph}</p>

            <ul className="mt-7 flex flex-col gap-5">
              {items.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden
                    className={`mt-[3px] h-[18px] w-[18px] shrink-0 ${checkColor}`}
                  >
                    <path
                      d="M4 10.5l3.5 3.5L16 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-[1rem] leading-[1.3] text-ink">
                    <span className="font-semibold tracking-[-0.1px]">{item.title}</span>
                    <br />
                    <span className="text-ink-soft">{item.body}</span>
                  </p>
                </li>
              ))}
            </ul>

            <Link
              href={ctaHref}
              className={`mt-7 inline-block text-[0.9rem] font-medium underline underline-offset-4 transition-colors hover:text-ink ${checkColor} ${ctaHoverLift ? "btn-motion" : ""}`}
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
        </MaybeReveal>
      </Container>
    </div>
  );
}
