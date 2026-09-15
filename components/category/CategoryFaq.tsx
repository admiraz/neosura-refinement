"use client";

import type { ReactNode } from "react";
import { useEffect, useId, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

interface FaqItem {
  question: string;
  answer: ReactNode;
}

interface CategoryFaqProps {
  headingRest: string;
  headingAccent: string;
  /** Phase 7F.7 — Krankenkasse's own live heading is "Häufig gestellte
   * [Fragen] zur Krankenkasse" — trailing text after the swashed accent
   * word, which neither existing usage (`/privatkunden`, `/unternehmen`)
   * needs (their accent word is the heading's last word). Optional and
   * `undefined` by default so both locked pages render byte-for-byte
   * unchanged. */
  headingSuffix?: string;
  subheading: string;
  items: FaqItem[];
  accent: "purple" | "teal";
  /** Phase 7E.8 — `/unternehmen`'s own FAQ module was independently
   * re-measured (not assumed identical to this component's original
   * `/privatkunden` audit) and its accordion column is genuinely wider:
   * ~1083px within a 1273px container (≈85%) vs. the fixed 820px this
   * component has always used. Defaults to `"820px"` so the locked
   * `/privatkunden` instance renders byte-for-byte unchanged; only
   * `/unternehmen` opts into the wider column. */
  maxWidth?: string;
  /** Phase 7F.7 — Krankenkasse's own live FAQ instance was independently
   * re-measured (not assumed identical to `/unternehmen`'s or
   * `/privatkunden`'s own FAQ) and its open row carries NO rounded
   * border/shadow highlight at all (`box-shadow: none`, `border-radius:
   * 0px` — confirmed live) — just a suppressed divider where the closed
   * rows show a subtle `1px solid rgba(0,0,0,.08)` line. `"boxed"`
   * (default) preserves the original rounded/border/shadow open-row
   * treatment already locked on `/privatkunden` and `/unternehmen`;
   * `"plain"` opts into Krankenkasse's own measured plain-divider
   * behavior instead. */
  openItemStyle?: "boxed" | "plain";
  /** Phase 8C — the reference FAQ sub-heading is 23/500/27.6/-0.23px.
   * Opt-in so the locked pages keep their current sub-heading. */
  largeSubheading?: boolean;
}

/** Phase 7D.8 — rebuilt from FINWIWO's live `/versicherungen/` FAQ
 * (measured 1440/1024/390): a white `wpb_row`, 50px radius, static
 * `scale_desktop_0-95` (confirmed active, same class of finding as
 * Process/Showcase — reproduced as a correctly-sized box, not the
 * transform). H2 (28.8/34.56, swash confirmed live via `hasSvg: true`)
 * + centered H3 subheading (23px/27.6, weight 500) — this one is
 * genuinely insurance-relevant on FINWIWO ("Finden Sie Antworten auf
 * die wichtigsten Fragen zur Versicherungsberatung"), unlike the
 * Process/Comparison modules' mismatched subheadings, so it's adapted
 * rather than dropped.
 *
 * Exactly 5 items (confirmed DOM count), one bordered container, plain
 * divider rows when closed, a plus/minus circle icon that SWAPS
 * (FINWIWO uses `fa-plus-circle`/`fa-minus-circle`, not a rotation),
 * and — confirmed by clicking every item — a single-open accordion:
 * opening one closes whichever was open, item 1 is open by default on
 * load, and the open row gets its own subtle rounded/bordered highlight
 * distinct from the plain divided list (confirmed via screenshot
 * comparison of the closed vs. open DOM state). Height transition is a
 * declared `max-height 0.5s` (live CSS, not inferred). No URL/hash
 * change, focus stays on the clicked header. Static otherwise: no
 * scroll-linked motion, no load stagger (matches every other module's
 * `transform: none`/constant-opacity finding this whole project).
 *
 * FINWIWO's own first answer states its advice is free because it's
 * commission-funded by insurers — a FINWIWO-specific business-model
 * claim, not verified NEOSURA fact, so it is NOT reproduced. All 5
 * NEOSURA questions/answers are instead grounded in content already
 * approved elsewhere in the project (`principles`, this page's own
 * `CategoryProcess`, the `gesundheit`/`recht-cyber` deep-page FAQ data,
 * and `privateServices`) — see `app/privatkunden/page.tsx` for the
 * exact sourcing per item. */
export function CategoryFaq({
  headingRest,
  headingAccent,
  headingSuffix,
  subheading,
  items,
  accent,
  maxWidth = "820px",
  openItemStyle = "boxed",
  largeSubheading = false,
}: CategoryFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [drawn, setDrawn] = useState(false);
  const emRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const baseId = useId();
  const iconColor = accent === "teal" ? "text-purple" : "text-purple";
  const stroke = accent === "teal" ? "var(--color-purple)" : "var(--color-purple)";
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
            {headingSuffix ? ` ${headingSuffix}` : null}
          </h2>
          <p
            className={cn(
              "mx-auto mt-4 max-w-[60ch] text-center text-[1.1rem] font-medium text-ink lg:mt-5",
              largeSubheading ? "leading-[27.6px] tracking-[-0.23px] lg:text-[1.4375rem]" : "leading-[1.35] lg:text-[1.2rem]"
            )}
          >
            {subheading}
          </p>

          <div className="mx-auto mt-10 lg:mt-12" style={{ maxWidth }}>
            {items.map((item, i) => {
              const isOpen = openIndex === i;
              const buttonId = `${baseId}-tab-${i}`;
              const panelId = `${baseId}-panel-${i}`;
              return (
                <div
                  key={item.question}
                  className={cn(
                    "border-line-soft transition-[border-color] duration-150",
                    isOpen
                      ? openItemStyle === "plain"
                        ? "border-b-0"
                        : "border-b"
                      : "border-b",
                    i === items.length - 1 && !isOpen && "border-b-0"
                  )}
                >
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple lg:py-6"
                    >
                      <span className="text-[1.05rem] font-medium leading-[29px] tracking-[-0.23px] text-ink lg:text-[1.4375rem]">{item.question}</span>
                      <span
                        aria-hidden
                        className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full border", isOpen ? iconColor : "text-ink-soft", isOpen ? "border-current" : "border-line-soft")}
                      >
                        <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
                          <path d="M4 10h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                          {!isOpen && <path d="M10 4v12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />}
                        </svg>
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="grid overflow-hidden transition-[grid-template-rows] ease-out"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      transitionDuration: reducedMotion ? "0ms" : "500ms",
                    }}
                  >
                    <div className="min-h-0">
                      <p className="px-1 pb-6 text-[1rem] font-light leading-[24px] text-ink-soft lg:pb-7">{item.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}
