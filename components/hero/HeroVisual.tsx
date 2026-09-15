"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import gsap from "gsap";
import { cn } from "@/lib/cn";

interface HeroVisualProps {
  src: string;
  alt: string;
  phase: "in" | "out";
  reducedMotion: boolean;
  /** Must include a position utility (e.g. "absolute ...") — see note below. */
  className: string;
  /** Per-state box geometry (width/height/right/left/bottom). */
  style?: CSSProperties;
  sizes?: string;
  objectPosition?: "right bottom" | "center bottom" | "left bottom" | "center center";
}

const OBJECT_POSITION_CLASS: Record<string, string> = {
  "right bottom": "object-right-bottom",
  "center bottom": "object-bottom",
  "left bottom": "object-left-bottom",
  "center center": "object-center",
};

/** Mascot layer for one scene instance. Since each `HeroScene` mounts once
 * per slide, this only ever plays a single enter (mount) and, later, a single
 * exit (phase -> "out") — no more in-place src crossfading. */
export function HeroVisual({
  src,
  alt,
  phase,
  reducedMotion,
  className,
  style,
  sizes,
  objectPosition = "right bottom",
}: HeroVisualProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    if (reducedMotion) {
      gsap.set(el, { clearProps: "all" });
      return;
    }

    if (phase === "in") {
      gsap.set(el, { opacity: 0, x: 90, scale: 1.035, clipPath: "inset(0% 0% 0% 85%)" });
      // Opacity resolves fast — the mascot should read as a physical layer
      // arriving, not a slow fade — while position/clip keep settling longer.
      gsap.to(el, { opacity: 1, duration: 0.3, delay: 0.08, ease: "power1.out" });
      gsap.to(el, {
        x: 0,
        scale: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.92,
        delay: 0.08,
        ease: "power3.out",
      });
    } else {
      gsap.to(el, { opacity: 0, x: -55, scale: 0.98, duration: 0.75, delay: 0.05, ease: "power2.in" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  return (
    // `className` (supplied by the caller) is responsible for the position
    // utility (always "absolute" today) — Next/Image's `fill` needs *some*
    // positioned ancestor, but hardcoding "relative" here would collide with
    // the caller's "absolute" and silently win, turning this into a normal-flow
    // element that pushes everything after it down the page.
    <div ref={wrapRef} className={cn(className)} style={style}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "(min-width: 1024px) 45vw, 90vw"}
        className={cn("object-contain", OBJECT_POSITION_CLASS[objectPosition])}
        priority
      />
    </div>
  );
}
