"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface ParallaxMediaProps {
  children: ReactNode;
  className?: string;
  /** Maximum travel in px across the whole pass through the viewport. */
  distance?: number;
}

/** Phase 9A.2 — the dark editorial section's one motion idea: a very small
 * scroll-linked drift of its photograph, the same mechanism the reference
 * uses for its own full-row background media (a transform driven straight
 * from scroll position inside a rAF loop that an IntersectionObserver starts
 * and stops, so nothing runs while the section is off screen).
 *
 * Deliberately small (±18px by default, no scale, no fade): the section is an
 * atmospheric pause, not an effect. Only `transform` is animated, so it never
 * triggers layout. Disabled entirely under `prefers-reduced-motion`, where the
 * photo simply sits still. */
export function ParallaxMedia({ children, className, distance = 18 }: ParallaxMediaProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId: number | null = null;

    function tick() {
      const node = ref.current;
      if (node) {
        const rect = node.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        // 0 while entering from below, 1 once it has fully passed upward.
        const progress = Math.min(Math.max((vh - rect.top) / (vh + rect.height), 0), 1);
        node.style.transform = `translate3d(0, ${((progress - 0.5) * -2 * distance).toFixed(2)}px, 0)`;
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
      { threshold: 0, rootMargin: "200px 0px 200px 0px" }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
      el.style.transform = "";
    };
  }, [distance]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
