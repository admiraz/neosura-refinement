"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { navItems } from "@/content/de/nav";
import { primaryCta } from "@/content/de/site";
import { contact } from "@/content/de/site";
import { cn } from "@/lib/cn";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

/** Phase 8A.1 — rebuilt as a light right-hand drawer, measured on the live
 * reference's own off-canvas panel at 390 and 768 rather than inferred:
 *
 *  - slides in from the RIGHT (`slide-out-from-right`) on
 *    `transform 0.8s cubic-bezier(0.15, 0.2, 0.1, 1)` — NEOSURA already
 *    carries those exact values as `--duration-motion-big` /
 *    `--ease-motion-big`, so the tokens are reused rather than re-typed.
 *  - panel ~335px of a 390 viewport, leaving a ~55px strip of the page
 *    visible at the left edge; `body` overflow locked while open.
 *  - light tinted surface (reference: rgb(235,246,244)); NEOSURA uses its
 *    own off-white `paper` so the drawer stays on brand rather than
 *    borrowing the reference's mint.
 *  - inner padding 44px (reference content starts at x=99 with the panel
 *    edge at 55).
 *  - top-level rows: 20px / weight 500 / line-height 30px / +0.2px, dark
 *    ink, on a 42px step (30px line + 12px gap).
 *  - child rows: 16px / 500 / line-height 22px / +0.2px, indented 20px per
 *    level, 32px step.
 *  - compact round close button at the top right.
 *
 * The reference draws no dividers at all; this keeps a single hairline
 * between top-level rows, which is the "restrained separator" the brief
 * asks for. Purple appears only on the CTA and as the active/hover accent.
 * Routes, labels and the contact block are NEOSURA's own and unchanged. */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [prevOpen, setPrevOpen] = useState(open);
  const panelRef = useRef<HTMLDivElement>(null);

  // Render-time reset (React's documented pattern) instead of setState-in-effect:
  // collapse the accordion once the panel has fully closed.
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (!open) {
      setExpanded(null);
      setExpandedService(null);
    }
  }

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;
    // Phase 8K — remember what opened the drawer (the header's menu button)
    // so focus returns there when it closes, instead of dropping to <body>.
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusable = panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
    focusable[0]?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Tab" || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    panel.addEventListener("keydown", onKeyDown);
    return () => {
      panel.removeEventListener("keydown", onKeyDown);
      opener?.focus();
    };
  }, [open]);

  const rowLink =
    "block text-[1.25rem] font-medium leading-[30px] tracking-[0.2px] text-ink transition-colors hover:text-purple";

  return (
    <>
      {/* The reference shifts the page rather than dimming it, so this scrim
          stays deliberately faint — the page still reads through it. */}
      <div
        aria-hidden
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-[55] bg-dark/15 transition-opacity duration-[var(--duration-motion-big)] ease-[var(--ease-motion-big)] min-[1180px]:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Hauptnavigation"
        className={cn(
          "fixed inset-y-0 right-0 z-[60] flex w-[86%] max-w-[360px] flex-col border-l border-line-soft bg-paper",
          "transition-transform duration-[var(--duration-motion-big)] ease-[var(--ease-motion-big)] min-[1180px]:hidden",
          open ? "translate-x-0" : "pointer-events-none translate-x-full"
        )}
      >
        <div className="flex items-center justify-end px-6 pb-2 pt-6">
          <button
            type="button"
            aria-label="Menü schliessen"
            onClick={onClose}
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-ink/[0.07] transition-colors hover:bg-ink/[0.13]"
          >
            <span className="absolute h-[1.5px] w-[15px] rotate-45 bg-ink-soft" />
            <span className="absolute h-[1.5px] w-[15px] -rotate-45 bg-ink-soft" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col overflow-y-auto px-11 pb-10 pt-4">
          <ul className="flex flex-col divide-y divide-line-soft">
            {navItems.map((item) => (
              <li key={item.label}>
                {item.megaMenu ? (
                  <>
                    <button
                      type="button"
                      aria-expanded={expanded === item.label}
                      onClick={() => setExpanded((cur) => (cur === item.label ? null : item.label))}
                      className="flex w-full items-center justify-between gap-3 py-[6px] text-left"
                    >
                      <span className={rowLink}>{item.label}</span>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        aria-hidden
                        className={cn(
                          "h-4 w-4 shrink-0 text-muted transition-transform duration-300",
                          expanded === item.label && "rotate-180 text-purple"
                        )}
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                    <div
                      className={cn(
                        "grid overflow-hidden transition-[grid-template-rows] duration-[350ms] ease-[var(--ease-out-refined)]",
                        expanded === item.label ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      )}
                    >
                      <div className="min-h-0">
                        <ul className="flex flex-col pb-2">
                          {item.megaMenu.columns[0].children.map((child) => (
                            <li key={child.href}>
                              <div className="flex items-center">
                                <Link
                                  href={child.href}
                                  onClick={onClose}
                                  className="block flex-1 py-[5px] pl-5 text-[1rem] font-medium leading-[22px] tracking-[0.2px] text-ink-soft transition-colors hover:text-purple"
                                >
                                  {child.label}
                                </Link>
                                {child.subtopics && child.subtopics.length > 0 && (
                                  <button
                                    type="button"
                                    aria-label={`${child.label} — Kapitel anzeigen`}
                                    aria-expanded={expandedService === child.href}
                                    onClick={() =>
                                      setExpandedService((cur) => (cur === child.href ? null : child.href))
                                    }
                                    className="flex h-8 w-8 shrink-0 items-center justify-center"
                                  >
                                    <svg
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="1.6"
                                      aria-hidden
                                      className={cn(
                                        "h-3 w-3 text-muted transition-transform duration-300",
                                        expandedService === child.href && "rotate-180 text-purple"
                                      )}
                                    >
                                      <path d="M6 9l6 6 6-6" />
                                    </svg>
                                  </button>
                                )}
                              </div>
                              {child.subtopics && child.subtopics.length > 0 && (
                                <div
                                  className={cn(
                                    "grid overflow-hidden transition-[grid-template-rows] duration-300 ease-[var(--ease-out-refined)]",
                                    expandedService === child.href ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                  )}
                                >
                                  <ul className="flex min-h-0 flex-col pb-1">
                                    {child.subtopics.map((s) => (
                                      <li key={s.anchor}>
                                        <Link
                                          href={`${child.href}#${s.anchor}`}
                                          onClick={onClose}
                                          className="block py-[5px] pl-10 text-[0.9rem] leading-[20px] tracking-[0.2px] text-muted transition-colors hover:text-purple"
                                        >
                                          {s.label}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </li>
                          ))}
                        </ul>
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className="mb-3 inline-flex items-center gap-2 pl-5 text-[0.85rem] text-purple transition-colors hover:text-purple-600"
                        >
                          {item.label === "Privatkunden" ? "Alle Privatkunden-Lösungen" : "Alle Unternehmenslösungen"}
                          <span aria-hidden>→</span>
                        </Link>
                      </div>
                    </div>
                  </>
                ) : (
                  <Link href={item.href} onClick={onClose} className={cn(rowLink, "py-[6px]")}>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <Link
            href={primaryCta.href}
            onClick={onClose}
            className="mt-8 inline-flex h-[50px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-purple px-6 text-[0.84rem] font-medium tracking-[0.5px] text-white btn-motion hover:bg-purple-600 sm:px-[35px] sm:text-[0.875rem]"
          >
            {primaryCta.label}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden className="h-4 w-4">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

          <div className="mt-auto flex flex-col gap-1 pt-10 text-[0.78rem] uppercase tracking-[0.14em] text-muted">
            <a href={`mailto:${contact.email}`} className="transition-colors hover:text-ink">
              {contact.email}
            </a>
            <a href={`tel:${contact.phoneHref}`} className="transition-colors hover:text-ink">
              {contact.phone}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
