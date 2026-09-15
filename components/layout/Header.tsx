"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { navItems } from "@/content/de/nav";
import { primaryCta } from "@/content/de/site";
import type { NavItem } from "@/content/de/types";
import { useScrolled } from "@/lib/hooks/useScrolled";
import { cn } from "@/lib/cn";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";

// Hover intent. A short dwell before opening so a pointer sweeping across the
// nav never opens a panel it only passed over; a short close grace so the
// travel from parent to panel (covered by the hover bridge) never drops it.
// Both timers are cancelled on the opposite event, so no state can outlive
// the pointer.
const OPEN_DELAY = 150;
const CLOSE_DELAY = 200;

const navLinkClass =
  "nav-link flex items-center gap-1.5 whitespace-nowrap px-2 py-2 text-[0.86rem] font-medium min-[1300px]:px-3 min-[1300px]:text-[0.92rem] min-[1400px]:px-4 min-[1400px]:text-[1rem]";

function isCurrentSection(item: NavItem, pathname: string) {
  const matches = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  if (matches(item.href)) return true;
  return !!item.megaMenu?.columns.some((col) => col.children.some((child) => matches(child.href)));
}

/** Frosted-translucent at every scroll position (never fully opaque, never
 * hides), matching the measured FINWIWO header: ~91px rest / ~60px
 * scrolled, threshold ~32px, shadow gained only once scrolled. Values from
 * docs/finwiwo-architecture/navigation.md §1/§6.
 *
 * Desktop nav states are deliberately separate (styles in globals.css):
 *  - default: ink-soft
 *  - hover (fine pointers only): ink + ink underline drawing in from the left
 *  - dropdown open (`data-open`): same as hover, only while the panel is open
 *  - current section (`data-active`): ink + static purple underline
 *  - keyboard focus: `:focus-visible` outline only */
export function Header() {
  const compact = useScrolled(32);
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState<NavItem | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Any navigation (including from a link inside the panel, where the pointer
  // is still over it) closes the dropdown.
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setActiveItem(null);
  }

  const clearTimers = useCallback(() => {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    openTimer.current = null;
    closeTimer.current = null;
  }, []);

  const openItem = useCallback(
    (item: NavItem, immediate: boolean) => {
      clearTimers();
      if (immediate) {
        setActiveItem(item);
        return;
      }
      openTimer.current = setTimeout(() => setActiveItem(item), OPEN_DELAY);
    },
    [clearTimers]
  );

  const scheduleClose = useCallback(() => {
    clearTimers();
    closeTimer.current = setTimeout(() => setActiveItem(null), CLOSE_DELAY);
  }, [clearTimers]);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }, []);

  const closeNow = useCallback(() => {
    clearTimers();
    setActiveItem(null);
  }, [clearTimers]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeNow();
        setMobileOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeNow]);

  useEffect(() => clearTimers, [clearTimers]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 bg-white/[0.77] backdrop-blur-md transition-[box-shadow,padding] duration-300 ease-[var(--ease-motion-small)]",
          compact ? "shadow-[0_0_3px_rgba(26,20,32,0.22)]" : "shadow-none"
        )}
        // Anchors the header during page transitions (see globals.css):
        // only the page content moves, never the navigation.
        style={{ viewTransitionName: "site-header" }}
      >
        <div
          className={cn(
            "mx-auto flex w-full max-w-[1440px] items-center justify-between gap-6 px-6 py-[11px] transition-[padding] duration-300 ease-[var(--ease-motion-small)] sm:px-8 lg:px-[60px]",
            compact ? "lg:py-[9px]" : "lg:py-[25px]"
          )}
        >
          <Link
            href="/"
            className={cn(
              "relative block w-[126px] shrink-0 transition-[height,width] duration-300 ease-[var(--ease-motion-small)] lg:w-[168px]",
              compact ? "h-[23px] lg:h-[29px]" : "h-[26px] lg:h-[35px]"
            )}
            aria-label="neosura Startseite"
          >
            <Image
              src="/images/logo.png"
              alt="neosura"
              width={168}
              height={35}
              priority
              className="h-full w-full object-contain object-left"
            />
          </Link>

          <nav aria-label="Hauptnavigation" className="hidden items-center min-[1180px]:flex">
            {navItems.map((item) => {
              const isOpen = activeItem?.label === item.label;
              const isActive = isCurrentSection(item, pathname);
              const ariaCurrent = pathname === item.href ? "page" : undefined;

              return item.megaMenu ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => openItem(item, activeItem !== null)}
                  onMouseLeave={scheduleClose}
                >
                  <Link
                    href={item.href}
                    aria-expanded={isOpen}
                    aria-controls="mega-menu-panel"
                    aria-current={ariaCurrent}
                    data-open={isOpen || undefined}
                    data-active={isActive || undefined}
                    // Keyboard focus opens the panel; a mouse click's focus
                    // must not (it re-opened the panel after navigation).
                    onFocus={(e) => {
                      if (e.currentTarget.matches(":focus-visible")) openItem(item, true);
                    }}
                    onClick={closeNow}
                    className={navLinkClass}
                  >
                    <span className="nav-link__label">{item.label}</span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      aria-hidden
                      className={cn(
                        "h-3 w-3 transition-transform duration-300 ease-[var(--ease-ui)] motion-reduce:transition-none",
                        isOpen && "rotate-180"
                      )}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </Link>
                  {/* Hover bridge: spans the header padding between the parent
                      and the panel so crossing it never counts as leaving. */}
                  {isOpen && <span aria-hidden className="absolute inset-x-0 top-full h-8" />}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={ariaCurrent}
                  data-active={isActive || undefined}
                  className={navLinkClass}
                  onFocus={scheduleClose}
                >
                  <span className="nav-link__label">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={primaryCta.href}
              onFocus={scheduleClose}
              className="group hidden h-[41px] items-center gap-2 rounded-full bg-purple px-5 text-[0.86rem] font-medium tracking-[0.01em] text-white transition-[background-color,translate,box-shadow] duration-300 ease-[var(--ease-ui)] hover:-translate-y-0.5 hover:bg-purple-600 hover:shadow-[0_8px_20px_rgba(85,43,128,0.22)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple motion-reduce:hover:translate-y-0 sm:inline-flex min-[1400px]:px-[22px] min-[1400px]:text-[0.95rem]"
            >
              {primaryCta.label}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden
                className="h-3.5 w-3.5 transition-transform duration-300 ease-[var(--ease-ui)] group-hover:translate-x-[5px] motion-reduce:group-hover:translate-x-0"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>

            <button
              type="button"
              aria-label={mobileOpen ? "Menü schliessen" : "Menü öffnen"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="relative flex h-6 w-6 shrink-0 flex-col items-center justify-center gap-[4.5px] min-[1180px]:hidden"
            >
              <span
                className={cn(
                  "h-[1.5px] w-[19px] bg-ink transition-all duration-300",
                  mobileOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "h-[1.5px] w-[19px] bg-ink transition-all duration-300",
                  mobileOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "h-[1.5px] w-[19px] bg-ink transition-all duration-300",
                  mobileOpen && "opacity-0"
                )}
              />
            </button>
          </div>
        </div>

        <MegaMenu
          id="mega-menu-panel"
          item={activeItem}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        />
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
