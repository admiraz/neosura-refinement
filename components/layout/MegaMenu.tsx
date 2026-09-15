"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { NavItem } from "@/content/de/types";
import { primaryCta } from "@/content/de/site";
import { cn } from "@/lib/cn";

const audienceVisual: Record<string, { src: string; alt: string; blurb: string }> = {
  Privatkunden: {
    src: "/images/bear-pointing.png",
    alt: "",
    blurb:
      "Private Versicherungslösungen für Gesundheit, Wohnen, Mobilität und Vorsorge — individuell abgestimmt auf Ihre Lebenssituation.",
  },
  Unternehmen: {
    src: "/images/bear-trust.webp",
    alt: "",
    blurb:
      "Versicherungslösungen für Unternehmen mit Fokus auf Stabilität, Resilienz und nachhaltige Absicherung.",
  },
};

interface MegaMenuProps {
  item: NavItem | null;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  id: string;
}

interface ServiceGroupProps {
  label: string;
  href: string;
  index: number;
  open: boolean;
  subtopics?: { label: string; anchor: string }[];
}

/** One service group — the numbered service link plus, where the service
 * genuinely has chapter content, a short list of real deep-links straight
 * into that page's own anchors (the same ids ServiceLocalNav uses).
 * Translates FINWIWO's "grouped link column" (bold heading + nested
 * sub-links) rather than the flat single-line list this menu had before. */
function ServiceGroup({ label, href, index, open, subtopics }: ServiceGroupProps) {
  return (
    <li>
      <Link
        href={href}
        tabIndex={open ? 0 : -1}
        className="group flex items-center gap-3 rounded-sm px-2 py-1.5 focus-visible:outline-2 focus-visible:outline-purple"
      >
        <span className="text-[0.7rem] tabular-nums text-muted">{String(index + 1).padStart(2, "0")}</span>
        <span className="text-[0.95rem] text-ink transition-colors duration-[250ms] group-hover:text-purple">
          {label}
        </span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          aria-hidden
          className="ml-auto h-3.5 w-3.5 shrink-0 text-muted transition-[translate,color] duration-[250ms] ease-[var(--ease-ui)] group-hover:translate-x-[5px] group-hover:text-purple motion-reduce:transition-none"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
      {subtopics && subtopics.length > 0 && (
        <ul className="ml-9 flex flex-col">
          {subtopics.map((s) => (
            <li key={s.anchor}>
              <Link
                href={`${href}#${s.anchor}`}
                tabIndex={open ? 0 : -1}
                className="block px-2 py-1 text-[0.8rem] text-muted transition-colors duration-150 hover:text-purple"
              >
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export function MegaMenu({ item, onMouseEnter, onMouseLeave, id }: MegaMenuProps) {
  const open = !!item;
  const [rendered, setRendered] = useState<NavItem | null>(item);
  const [contentVisible, setContentVisible] = useState(true);
  const [prevLabel, setPrevLabel] = useState<string | null>(item?.label ?? null);

  if (item && item.label !== prevLabel) {
    setPrevLabel(item.label);
    if (rendered && rendered.label !== item.label) {
      setContentVisible(false);
    } else {
      setRendered(item);
    }
  }

  useEffect(() => {
    if (!contentVisible && item) {
      const t = setTimeout(() => {
        setRendered(item);
        setContentVisible(true);
      }, 80);
      return () => clearTimeout(t);
    }
  }, [contentVisible, item]);

  const visual = rendered ? audienceVisual[rendered.label] : null;
  const children = rendered?.megaMenu?.columns[0].children ?? [];
  // Phase 7M.0 — was a hardcoded slice(0,3)/slice(3,5) that silently
  // dropped anything past a 5-item list (the client guide's six-service
  // Unternehmen taxonomy and the seven-item Privatkunden list with the
  // two Themen pages both exceed that). Split at the midpoint instead so
  // every genuine nav child always renders, in the same two-column
  // grammar, regardless of list length.
  const mid = Math.ceil(children.length / 2);
  const colB = children.slice(0, mid);
  const colC = children.slice(mid);

  return (
    <div
      id={id}
      role="region"
      aria-hidden={!open}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ width: "min(calc(100vw - 100px), 1340px)" }}
      className={cn(
        "absolute left-[50px] top-full z-40 origin-top overflow-hidden bg-white shadow-[0_6px_28px_rgba(0,0,0,0.08)]",
        // Understated: 4px settle + fade, no scale or spring.
        "transition-[opacity,translate] duration-200 ease-[var(--ease-ui)] motion-reduce:transition-none",
        open
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-1 opacity-0 motion-reduce:translate-y-0"
      )}
    >
      {visual && (
        <div
          className={cn(
            "grid grid-cols-[36%_32%_32%] transition-opacity duration-100",
            contentVisible ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="relative flex flex-col justify-between overflow-hidden bg-paper p-8">
            <div>
              <span className="text-[0.68rem] uppercase tracking-[0.24em] text-purple">{rendered!.label}</span>
              <h3 className="mt-3 max-w-[18ch] text-[1.4rem] font-normal leading-tight text-ink">
                {rendered!.megaMenu!.intro}
              </h3>
              <p className="mt-3 max-w-[32ch] text-[0.85rem] leading-relaxed text-ink-soft">{visual.blurb}</p>
            </div>
            <div aria-hidden className="pointer-events-none relative mt-8 h-[150px] w-[150px] self-end opacity-95">
              <Image src={visual.src} alt="" fill sizes="150px" className="object-contain object-bottom" />
            </div>
          </div>

          <nav aria-label={`${rendered!.label} — Übersicht`} className="border-l border-line p-7">
            <ul className="flex flex-col gap-2.5">
              {colB.map((child, i) => (
                <ServiceGroup
                  key={child.href}
                  label={child.label}
                  href={child.href}
                  index={i}
                  open={open}
                  subtopics={child.subtopics}
                />
              ))}
            </ul>
          </nav>

          <nav aria-label={`${rendered!.label} — Weitere`} className="flex flex-col justify-between border-l border-line bg-paper-2/50 p-7">
            <ul className="flex flex-col gap-2.5">
              {colC.map((child, i) => (
                <ServiceGroup
                  key={child.href}
                  label={child.label}
                  href={child.href}
                  index={i + mid}
                  open={open}
                  subtopics={child.subtopics}
                />
              ))}
            </ul>
            <Link
              href={primaryCta.href}
              tabIndex={open ? 0 : -1}
              className="group mt-6 inline-flex items-center gap-2 self-start text-[0.85rem] font-medium text-purple"
            >
              {primaryCta.label}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
