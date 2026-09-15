"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";

interface HeroEditorialCtaProps {
  href: string;
  label: string;
  tone: "light" | "dark";
  className?: string;
}

/** Text + arrow + underline that expands on hover — an editorial link,
 * not a filled SaaS pill button. */
export function HeroEditorialCta({ href, label, tone, className }: HeroEditorialCtaProps) {
  const isLight = tone === "light";
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2.5 text-[0.92rem] font-medium uppercase tracking-[0.04em]",
        isLight ? "text-white" : "text-ink",
        className
      )}
    >
      <span className="relative pb-0.5">
        {label}
        <span
          aria-hidden
          className={cn(
            "absolute bottom-0 left-0 h-px w-full origin-left scale-x-[0.4] transition-transform duration-[220ms] ease-out group-hover:scale-x-100",
            isLight ? "bg-white/70" : "bg-purple"
          )}
        />
      </span>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden
        className="h-4 w-4 shrink-0 transition-transform duration-[220ms] ease-out group-hover:translate-x-2"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </Link>
  );
}
