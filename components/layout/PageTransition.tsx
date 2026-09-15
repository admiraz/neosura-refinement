/// <reference types="react/canary" />
"use client";

import { usePathname } from "next/navigation";
import { ViewTransition, type ReactNode } from "react";

/** Page-to-page motion. Route navigations run as React transitions, so a
 * `<ViewTransition>` keyed by pathname turns every route change into an
 * exit/enter pair: the old page fades out quickly, the new one fades in with
 * a small rise (classes `page-exit` / `page-enter`, styled in globals.css).
 *
 * Keyed here in the root layout rather than via `template.tsx`, which only
 * remounts when its own segment changes (sibling routes such as
 * /privatkunden/krankenkasse → /privatkunden/vorsorge would not animate).
 * Hash links on the same page keep the pathname, so they never animate, and
 * the first page load is not a transition, so it renders immediately. */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <ViewTransition key={pathname} enter="page-enter" exit="page-exit" default="none">
      {children}
    </ViewTransition>
  );
}
