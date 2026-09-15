"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ServiceVisual } from "@/content/de/serviceVisuals";
import { Container } from "@/components/ui/Container";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface KrankenkasseGrundversicherungProps {
  heading: string;
  paragraph: string;
  checklist: string[];
  ctaLabel: string;
  ctaHref: string;
  photo: ServiceVisual;
}

/** Phase 7F.3 — live-remeasured against https://finwiwo.ch/krankenkasse/,
 * the module starting at FINWIWO's own `#grundversicherung` anchor role
 * and ending exactly where "Die richtige Franchise wählen" begins.
 *
 * Measured architecture: `full-width-content` row, transparent
 * background, no row-level radius, 7% left/right padding, 86.4px top/
 * bottom padding — image LEFT (545×364, ≈3:2, 20px radius) / text RIGHT
 * (467px column at 1440) on desktop; image-first on mobile (confirmed
 * independently, not assumed). H2 "Die obligatorische Grundversicherung"
 * (30px/36px/400) carries the same one-time `nectar-scribble` swash
 * already reused elsewhere (dashoffset sampled progressing 1→0.25 across
 * scroll entry — same mechanic, no new one). The content image itself
 * has **no parallax** (`transform: none` at two different scroll
 * offsets, confirmed independently — the Hero's own parallax was not
 * assumed to apply here). The CTA ("Jetzt anfragen & Grundversicherung
 * vergleichen" → `#formular`) has no hover transform either — static.
 *
 * FINWIWO's own two paragraphs are not reused — the second one states
 * "mehrere hundert Franken pro Jahr zu sparen", an unverified savings
 * claim. Its own 3-item checklist includes "Prämienunterschiede bis zu
 * 50% möglich" — also an unverified numeric claim, not reproduced. The
 * other two checklist items ("Gesetzlich garantierte Leistungen bei
 * allen Kassen" / "Keine Gesundheitsprüfung bei Wechsel") are neutral,
 * independently-verifiable statements about Swiss OKP regulation — the
 * same kind of fact already used in `gesundheitDeep.grundversicherung
 * .checklist`, which is reused here directly rather than rewritten, for
 * consistency with the already-approved wording for this exact role.
 * Heading stays the plain client-guide-safe "Grundversicherung" (no
 * exact longer heading is supplied by the guide for this role) — no
 * marketing wording invented. CTA maps to `/analyse` (advisory
 * destination), not FINWIWO's own `#formular` or a not-yet-built local
 * anchor.
 *
 * No bear here: the only image slot is the single 3:2 content photo,
 * already carrying the section's real subject — there is no secondary
 * decorative slot on this module. Deferred again (see
 * docs/finwiwo-architecture/deep-krankenkasse.md for the running bear
 * status across this whole page). Built as a dedicated component — not
 * a revival of `ServiceContentChapter`/`CategoryAdvantages`, neither of
 * which was independently confirmed to match this measured geometry. */
/* Phase 8D — reference rows: photo 545x364 (20px radius) beside a
 * 467/493px text column, set as an inset ~1113px block; H2 30/36 (Grund)
 * and 28.8/34.56 (Zusatz) at normal tracking; body 16/300/24; checklist
 * 16/300 on a 31px step. */
export function KrankenkasseGrundversicherung({
  heading,
  paragraph,
  checklist,
  ctaLabel,
  ctaHref,
  photo,
}: KrankenkasseGrundversicherungProps) {
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
    <section id="grundversicherung" className="scroll-mt-24 bg-transparent">
      <Container className="py-[60px] lg:grid lg:max-w-[1233px] lg:grid-cols-[545px_minmax(0,1fr)] lg:items-center lg:gap-x-[80px] lg:py-[86px]">
        <div className="relative h-[224px] w-full overflow-hidden rounded-[20px] sm:h-[300px] lg:order-1 lg:h-[364px]">
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

        <div className="mt-8 lg:order-2 lg:mt-0">
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
                    transition: reducedMotion ? "none" : "stroke-dashoffset 1.8s ease-out, opacity 0.3s ease-out",
                  }}
                />
              </svg>
            </em>
          </h2>

          <p className="mt-6 max-w-[467px] text-[1rem] font-light leading-[1.5] text-ink">{paragraph}</p>

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
