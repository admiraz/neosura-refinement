"use client";

import { useEffect } from "react";

/** A cold/direct load of a URL like `/#dokumente` never lands on the target
 * — the browser's one-time native fragment-scroll fires before the
 * homepage's below-the-fold images finish loading and shift the layout, so
 * it scrolls to a position that no longer matches the target by the time
 * everything settles (verified: scrollY stays 0 even seconds after load).
 * Client-side navigation to the same hash — the nav link, footer link, and
 * every hero CTA that actually points here — is unaffected; this only
 * covers the cold-load case. */
export function HashScrollFix() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    function scrollToHash() {
      document.getElementById(hash)?.scrollIntoView({ behavior: "instant" as ScrollBehavior });
    }

    if (document.readyState === "complete") {
      scrollToHash();
    } else {
      window.addEventListener("load", scrollToHash, { once: true });
      return () => window.removeEventListener("load", scrollToHash);
    }
  }, []);

  return null;
}
