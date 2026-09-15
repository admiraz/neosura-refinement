"use client";

import { useEffect, useState } from "react";

/** True once the page has scrolled past `threshold` px. Passive + rAF-throttled. */
export function useScrolled(threshold = 35): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const read = () => {
      setScrolled(window.scrollY > threshold);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(read);
        ticking = true;
      }
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
