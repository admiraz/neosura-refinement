"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface ScrollFadeWordsProps {
  text: string;
  className?: string;
  /** Which reference module's reveal to reproduce. Defaults to "mask" (the
   * homepage block, `.nectar-text-inline-images--animation_scroll_fade`) so
   * every existing caller is unchanged. "opacity" is the `/versicherungen/`
   * statement's own reveal (`nectar-split-heading`) — see `OpacityWords`. */
  mode?: "mask" | "opacity";
  /** Opacity mode only: per-module scroll timing, as fractions of the
   * viewport height — `start` (block centre where word 0 begins),
   * `stagger` (offset between words) and `ramp` (distance each word takes
   * to reach full opacity). Different reference modules run the same
   * mechanism at different speeds, so each caller passes the values
   * measured on its own module. Defaults to the `/versicherungen/`
   * statement's timing. */
  timing?: { start: number; stagger: number; ramp: number };
}

/** Per-word mask sweep, matching the live FINWIWO reference exactly.
 *
 * MECHANISM (measured, not assumed). The reference block is
 * `.nectar-text-inline-images--animation_scroll_fade` on
 * `https://finwiwo.ch/`. Its faded state is NOT opacity — sampling
 * `getComputedStyle(word).opacity` across 20+ scroll positions returned
 * `1` in every state, which is what sent this audit to the theme's own
 * inlined CSS. The real rule is a horizontal mask sweep:
 *
 *   .word          { transition: all .85s ease;
 *                    mask-image: linear-gradient(90deg,#fff 33.3%,rgba(255,255,255,.1) 66.6%);
 *                    mask-position: 100% 100%; mask-size: 300% 100%; }
 *   .word.visible  { mask-position: 0 100%; }
 *
 * So each word rests at ~10% alpha and wipes in left-to-right over
 * 0.85s ease when it gains `.visible`. Reproduced verbatim here
 * (with the `-webkit-` pair for Safari).
 *
 * SCROLL DRIVER (exact, from the theme's own
 * `nectar-text-inline-images.js` `onScroll`, then verified against live
 * samples). Progress is scroll-position driven and continuously
 * recomputed — words also un-reveal when scrolling back up, so it is not
 * a one-shot IntersectionObserver stagger:
 *
 *   progress = clamp( (0.8 * viewportH - elementTop) / (0.1 * viewportH + elementHeight), 0, 1 )
 *   word i (0-indexed) is visible  ⟺  progress >= (i + 1) / wordCount
 *
 * Verified at 1440×1000 against the live section (23 words, height
 * 251.95px) — predicted vs. measured visible-word counts matched on all
 * six sampled scroll positions: top=1000→0/0, 875→0/0, 737→4/4,
 * 599→13/13, 457→22/22, 316→23/23.
 *
 * The reference runs this inside a `requestAnimationFrame` loop that an
 * IntersectionObserver (`rootMargin: "400px 0px 400px 0px"`, threshold 0)
 * starts and stops — reproduced identically, so no scroll listener runs
 * while the section is far off-screen.
 *
 * Words keep their layout position (no translate, no fade-up, no
 * section-level reveal) and are plain inline-block spans separated by
 * real spaces, so line wrapping stays natural at every breakpoint.
 *
 * REDUCED MOTION: every word renders fully visible with no mask and no
 * rAF loop. The mask is also only applied after mount, so a no-JS or
 * pre-hydration render shows the full text rather than a permanently
 * faded paragraph. */
/* The reference rests its unrevealed words at ~10% alpha. NEOSURA's own
 * statement sits on a light surface at a larger size, where that read as
 * missing text rather than quiet text, so the rest state is 28% here; the
 * sweep, timing and scroll formula are unchanged. */
const MASK_IMAGE = "linear-gradient(90deg,#fff 33.3%,rgba(255,255,255,.28) 66.6%)";

function MaskWords({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  /** `armed` only flips inside the rAF callback below, never in the effect
   * body — so the pre-hydration/no-JS render stays fully visible, and
   * enabling reduced motion at runtime is handled by deriving the rendered
   * values below rather than by writing state from an effect. */
  const [state, setState] = useState({ armed: false, visible: words.length });

  const armed = state.armed && !reducedMotion;
  const visibleCount = reducedMotion ? words.length : state.visible;

  useEffect(() => {
    if (reducedMotion) return;

    const el = ref.current;
    if (!el) return;

    let rafId: number | null = null;

    function tick() {
      const node = ref.current;
      if (node) {
        const rect = node.getBoundingClientRect();
        const viewportH = window.innerHeight || document.documentElement.clientHeight;
        // Exact reference formula — see this component's own docstring.
        const progress = Math.min(
          Math.max((0.8 * viewportH - rect.top) / (0.1 * viewportH + rect.height), 0),
          1
        );
        const nextVisible = Math.floor(progress * words.length + 1e-9);
        setState((cur) =>
          cur.armed && cur.visible === nextVisible ? cur : { armed: true, visible: nextVisible }
        );
      }
      rafId = requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (rafId === null) rafId = requestAnimationFrame(tick);
        } else if (rafId !== null) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      },
      { threshold: 0, rootMargin: "400px 0px 400px 0px" }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [reducedMotion, words.length]);

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const visible = !armed || i < visibleCount;
        return (
          <span key={`${word}-${i}`}>
            {i > 0 ? " " : null}
            <span
              className="inline-block"
              style={
                armed
                  ? {
                      maskImage: MASK_IMAGE,
                      WebkitMaskImage: MASK_IMAGE,
                      maskSize: "300% 100%",
                      WebkitMaskSize: "300% 100%",
                      maskPosition: visible ? "0 100%" : "100% 100%",
                      WebkitMaskPosition: visible ? "0 100%" : "100% 100%",
                      transition: "mask-position 0.85s ease, -webkit-mask-position 0.85s ease",
                    }
                  : undefined
              }
            >
              {word}
            </span>
          </span>
        );
      })}
    </p>
  );
}

/** Per-word OPACITY reveal, measured on the live `/versicherungen/`
 * statement (`nectar-split-heading`) — a different module from the homepage
 * block above, and a different mechanism. Each word is its own element that
 * rests at opacity 0.2 and is scrubbed to 1 directly from the scroll
 * position every frame: there is no CSS transition (`transition: none` on
 * every word), so scrolling back up dims the words again.
 *
 * Sampled at 1440x1000 in 60px scroll steps (word opacities, 8-word line):
 *   top 820 → .23 .20 …            top 700 → 1 .78 .52 .25 .20 …
 *   top 760 → .64 .38 .20 …        top 580 → 1 1 1 1 .80 .53 .27 .20
 *   top 640 → 1 1 .92 .66 .39 …    top 460 → … 1 1 .81      top 400 → all 1
 * which fits, to within ~0.05 on every sample (including the 3-word label
 * line above it), a linear ramp keyed to the block's vertical centre:
 *   t(i) = (0.885·vh − centreY − i·0.039·vh) / (0.12·vh)
 *   opacity(i) = 0.2 + 0.8·clamp(t, 0, 1)
 * i.e. each word takes ~12% of the viewport to brighten and the next one
 * starts ~3.9% of the viewport later — a soft left-to-right wave rather than
 * a word-by-word switch.
 *
 * Same driver as the mask variant (rAF loop started/stopped by an
 * IntersectionObserver), but opacities are written straight to the word
 * nodes so React does not re-render on every frame. No inline opacity is
 * written before the first frame, so the no-JS/pre-hydration render and the
 * reduced-motion render are both fully visible. */
const OPACITY_REST = 0.2;
const OPACITY_START = 0.885;
const OPACITY_STAGGER = 0.039;
const OPACITY_RAMP = 0.12;

function OpacityWords({
  text,
  className,
  timing,
}: {
  text: string;
  className?: string;
  timing?: { start: number; stagger: number; ramp: number };
}) {
  const start = timing?.start ?? OPACITY_START;
  const stagger = timing?.stagger ?? OPACITY_STAGGER;
  const ramp = timing?.ramp ?? OPACITY_RAMP;
  const words = text.split(" ");
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const nodes = wordRefs.current;

    let rafId: number | null = null;
    let lastCentre = Number.NaN;
    let lastVh = Number.NaN;

    function tick() {
      const node = ref.current;
      if (node) {
        const rect = node.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        const centre = rect.top + rect.height / 2;
        if (centre !== lastCentre || vh !== lastVh) {
          lastCentre = centre;
          lastVh = vh;
          nodes.forEach((w, i) => {
            if (!w) return;
            const t = (start * vh - centre - i * stagger * vh) / (ramp * vh);
            const op = OPACITY_REST + (1 - OPACITY_REST) * Math.min(Math.max(t, 0), 1);
            w.style.opacity = op.toFixed(3);
          });
        }
      }
      rafId = requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (rafId === null) {
            lastCentre = Number.NaN;
            rafId = requestAnimationFrame(tick);
          }
        } else if (rafId !== null) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      },
      { threshold: 0, rootMargin: "400px 0px 400px 0px" }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
      // Hand the words back fully visible (e.g. reduced motion switched on).
      nodes.forEach((w) => {
        if (w) w.style.opacity = "";
      });
    };
  }, [reducedMotion, words.length, start, stagger, ramp]);

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          {i > 0 ? " " : null}
          <span
            ref={(n) => {
              wordRefs.current[i] = n;
            }}
            className="inline-block"
          >
            {word}
          </span>
        </span>
      ))}
    </p>
  );
}

export function ScrollFadeWords({ text, className, mode = "mask", timing }: ScrollFadeWordsProps) {
  return mode === "opacity" ? (
    <OpacityWords text={text} className={className} timing={timing} />
  ) : (
    <MaskWords text={text} className={className} />
  );
}
