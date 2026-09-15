"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ServiceVisual } from "@/content/de/serviceVisuals";
import { Container } from "@/components/ui/Container";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { Reveal } from "@/components/ui/Reveal";

interface ProcessStep {
  number: string;
  title: string;
  body: string;
  photo: ServiceVisual;
}

interface CategoryProcessProps {
  headingRest: string;
  headingAccent: string;
  subheading: string;
  steps: ProcessStep[];
  accent: "purple" | "teal";
}

/** Phase 7D.6 — rebuilt from FINWIWO's live `/versicherungen/` module
 * immediately after the two editorial rows (measured 1440/1024/390):
 * "So einfach funktioniert's", a white `wpb_row` (50px radius, ~20px
 * gap from the editorial pair — same rhythm already established),
 * carrying a static `scale_desktop_0-95` transform (confirmed active at
 * every sampled scroll position and reload timestamp — permanent
 * cosmetic inset, not a reveal, same class of finding as the showcase's
 * own 0.93 scale) reproduced here as a correctly-sized box instead of
 * the transform hack, per the project's standing rule.
 *
 * CONTENT MISMATCH (documented, not reproduced): FINWIWO's live H3
 * subheading literally reads "In nur 4 Schritten zu Ihrer fertigen
 * Steuererklärung" — tax-return wording bled into the insurance page
 * from a shared template, confirmed by re-fetching the live DOM. Only
 * the ARCHITECTURE (H2 swash, centered H3, 4-column step grid, image +
 * circular icon-badge + numbered title + body) is reused; the wording
 * is genuine NEOSURA copy. The 4 step titles themselves ("Formular
 * ausfüllen"/"Erstgespräch"/"Analyse & Beratung"/"Abschluss") were
 * insurance-neutral and their body copy already correctly referenced
 * "Versicherungssituation" — only the one subheading line was wrong.
 *
 * H2 uses the same swash mechanic already built for 7D.3/7D.5
 * (confirmed live: `hasSvg: true` on the H2, `false` on the H3 — the
 * swash decorates the H2 only). Each step: image (3px radius, ~7:4
 * ratio, confirmed 275×157 desktop / 318×182 mobile — same ratio both
 * breakpoints), a circular accent-color icon badge (68px, confirmed via
 * live DOM `im-icon-wrap`, 150px/full-round) straddling the image's
 * bottom edge, then a two-tone "01. Title" heading (`<span
 * style="color:#40ae91">01.</span> Title` in the live DOM — number
 * tinted, title plain), then body text. FINWIWO reuses the identical
 * pencil icon for all 4 steps (confirmed live, not a NEOSURA
 * simplification) — reproduced the same way rather than inventing 4
 * distinct meaningful icons FINWIWO doesn't have.
 *
 * Confirmed NOT interactive (`cursor: auto`, no link ancestor on any
 * step heading) and confirmed static on scroll (transform/opacity
 * constant across before→after samples) — no stepper, no tabs, no
 * click-to-change-image. The four steps are simply always all visible,
 * side by side on desktop AND at the 1024px tablet checkpoint (FINWIWO
 * stays 4-across there too — confirmed live) and stacked vertically
 * only at 390px mobile. Image opacity briefly read 0 in an early,
 * flawed reload sample; re-verified with a proper gradual scroll
 * warmup it resolves to 1 — an ordinary lazy-load artifact, not a
 * designed entrance reveal, so no fade-in was built here. */
export function CategoryProcess({ headingRest, headingAccent, subheading, steps, accent }: CategoryProcessProps) {
  const [drawn, setDrawn] = useState(false);
  const emRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const stroke = accent === "teal" ? "var(--color-purple)" : "var(--color-purple)";
  const numberColor = accent === "teal" ? "text-purple" : "text-purple";

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
    <div className="bg-white">
      <Container>
        <div className="py-14 lg:py-[92px]">
          <h2 className="text-center text-[1.6875rem] font-normal leading-[1.2] tracking-normal text-ink lg:text-[1.8rem]">
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

          <p className="mx-auto mt-4 max-w-[52ch] text-center text-[1.2rem] font-medium leading-[27.6px] tracking-[-0.23px] text-ink lg:mt-5 lg:text-[1.4375rem]">
            {subheading}
          </p>

          {/* Phase 9B — open steps: the bordered card around each step and
              the four identical pencil badges are gone; photo, number,
              title, body. The four steps enter as one group (the reference
              staggers them 0/200/400ms — deliberately not reproduced). */}
          <Reveal className="mt-10 grid grid-cols-1 gap-y-10 lg:mt-14 lg:grid-cols-4 lg:gap-x-[50px] lg:gap-y-0">
            {steps.map((step) => (
              <div key={step.number}>
                <div className="relative aspect-[7/4] overflow-hidden rounded-[3px]">
                  <Image
                    src={step.photo.photo}
                    alt={step.photo.alt}
                    fill
                    loading="lazy"
                    sizes="(min-width: 1024px) 22vw, 90vw"
                    className="object-cover"
                    style={{ objectPosition: step.photo.objectPosition }}
                  />
                </div>

                <h3 className="mt-5 text-[1.4375rem] font-medium leading-[29px] tracking-[-0.23px] text-ink">
                  <span className={numberColor}>{step.number}.</span> {step.title}
                </h3>
                <p className="mt-2 text-[1rem] font-light leading-[24px] text-ink-soft">{step.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </Container>
    </div>
  );
}
