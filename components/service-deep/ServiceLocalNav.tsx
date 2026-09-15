"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { useScrolled } from "@/lib/hooks/useScrolled";
import { cn } from "@/lib/cn";

interface ServiceLocalNavItem {
  label: string;
  href: string;
}

/** Sticky in-page chapter nav for a deep service page — lets a visitor jump
 * directly to a chapter instead of scrolling past all of them. Re-anchors
 * to the header's own compact/rest height (91px / 59px desktop) so it stays
 * glued with no gap, same as FINWIWO's measured panel-follows-header
 * behavior. The active chapter is tracked via IntersectionObserver — a
 * chapter counts as "current" once its heading has crossed a band just
 * below the sticky bar, not merely once any part of it is visible.
 * Horizontally scrollable on narrow viewports rather than wrapping, so it
 * stays a single compact row at every size. */
export function ServiceLocalNav({ items }: { items: ServiceLocalNavItem[] }) {
  const compact = useScrolled(32);
  const [activeHref, setActiveHref] = useState(items[0]?.href ?? "");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const targets = items
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((el): el is HTMLElement => !!el);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        // Topmost visible chapter wins when several qualify at once.
        const top = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b));
        setActiveHref(`#${top.target.id}`);
      },
      // Active band sits just under the sticky local nav; the tall bottom
      // margin means a chapter only "arrives" once its heading has cleared
      // roughly the top third of the viewport, not the instant it appears.
      { rootMargin: "-140px 0px -65% 0px", threshold: 0 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav
      ref={navRef}
      aria-label="Kapitel dieser Seite"
      className={cn(
        "sticky z-20 border-b border-line bg-white/95 backdrop-blur-sm transition-[top] duration-300 ease-[var(--ease-motion-small)]",
        compact ? "top-[50px] lg:top-[59px]" : "top-[50px] lg:top-[91px]"
      )}
    >
      <Container>
        <ul className="flex gap-7 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item) => (
            <li key={item.href} className="shrink-0">
              <a
                href={item.href}
                className={cn(
                  "block whitespace-nowrap text-[0.85rem] transition-colors",
                  activeHref === item.href ? "text-purple" : "text-ink-soft hover:text-purple"
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}
