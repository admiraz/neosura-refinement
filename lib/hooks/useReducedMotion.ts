"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot(): boolean {
  return false;
}

/** Phase 7E.5 — rewritten on `useSyncExternalStore` to fix a real
 * hydration-mismatch bug: the previous `useState(readPreference)`
 * initializer read `window.matchMedia` synchronously during the client's
 * hydration render, which never matches the server's `false` render and
 * — per React's "won't be patched up" hydration-mismatch behavior — left
 * the DOM stuck on the server's stale value, so reduced-motion users
 * never actually got the reduced-motion styling (e.g.
 * `CategoryAdvantages`'/`CategoryCyberAdvantages`' swash stayed undrawn
 * instead of showing its final state). `useSyncExternalStore`'s
 * `getServerSnapshot` is the standard-library-correct way to give an SSR
 * render a safe default while the client subscribes to the real value —
 * steady-state behavior for every consumer is unchanged after mount. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
