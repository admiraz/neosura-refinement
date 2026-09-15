"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Optional stagger for a following group, in ms. */
  delay?: number;
}

/** Phase 9A — the homepage's one editorial reveal (see `globals.css`).
 *
 * The group renders fully visible on the server and without JS. After
 * mount it is armed (hidden, 16px lower) only if it is still below the fold
 * and motion is allowed; it then settles in once when a meaningful part of
 * it enters the viewport. Content already on screen at load is never
 * hidden, so there is no flash. State lives on a data attribute, not React
 * state, so revealing never re-renders the section. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    el.dataset.reveal = "armed";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.reveal = "in";
          observer.disconnect();
        }
      },
      // The root extends far above the viewport, so a group the page jumps
      // straight past (anchor link, End key, instant scroll) counts as
      // intersecting the moment it is above the fold and settles — nothing
      // above the viewport can stay hidden. Below the fold it still waits
      // until it genuinely enters (bottom margin -6%).
      { threshold: 0.12, rootMargin: "100000px 0px -6% 0px" }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      delete el.dataset.reveal;
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
