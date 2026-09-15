import Link from "next/link";
import { cn } from "@/lib/cn";

export type LifeSituationIcon = "health" | "home" | "income" | "child" | "savings";

const ICONS: Record<LifeSituationIcon, React.ReactNode> = {
  health: (
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  ),
  home: (
    <path
      d="M4 11.5 12 5l8 6.5M6.5 10v8.5a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  income: (
    <path
      d="M4 9h16v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9zM8 9V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  child: (
    <path
      d="M12 4a4 4 0 0 1 4 4v1h1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-1v1a4 4 0 0 1-8 0v-1H7a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h1V8a4 4 0 0 1 4-4zM10 20v-2M14 20v-2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  savings: (
    <path
      d="M4 19V9M9 19v-6M14 19v-9M19 19V6M4 9l6-4 4 2 5-3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
};

interface LifeSituationCardProps {
  icon: LifeSituationIcon;
  heading: string;
  body: string;
  href: string;
  linkLabel: string;
  /** Row-position classes (the divider), set by `LifeSituationGrid`. */
  className?: string;
}

/** Phase 7Q — routing block for the life-situation page family; the
 * client guide's §4.15 requires each block to link to its NEOSURA topic
 * page, so every block stays a whole-row `next/link`.
 *
 * Phase 8G — re-measured against the live "Ihre Situation – unsere Lösung"
 * module on both `finanzen-fuer-familien/` and `expats-hallo-schweiz/`
 * (same template). The reference item is NOT a card: no background, no
 * radius, no shadow, no side borders — an open row, 28px/24px padding,
 * divided from the next by a single 1px hairline (`#eef1f5`, NEOSURA's
 * `line-soft`). Its 44px icon box (12px radius, teal at 8%, 20px glyph)
 * sits to the LEFT of the text, which starts 60px in (44 + 16 gap); the
 * H3 is 23/500/29/-0.23 (21/27 on phones), top-aligned with the icon, and
 * the body 16/300/24 eight pixels below. The previous pass rendered a
 * bordered 20px-radius white card with the icon stacked on top, a 16.8px
 * heading and 14.7px body.
 *
 * Motion: none. Hovering a live item changes nothing (background,
 * transform, shadow, colour all sampled identical before/after), so the
 * earlier background/border tint and the sliding arrow are removed. The
 * destination label keeps the sitewide text-link look (teal, underlined,
 * no arrow) as a static affordance; keyboard focus keeps a visible ring. */
export function LifeSituationCard({ icon, heading, body, href, linkLabel, className }: LifeSituationCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex gap-4 border-line-soft px-6 py-7 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-purple",
        className
      )}
    >
      <span aria-hidden className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[12px] bg-purple/[0.08] text-purple">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          {ICONS[icon]}
        </svg>
      </span>

      <span className="block min-w-0 max-w-[640px]">
        <h3 className="text-[1.3125rem] font-medium leading-[27px] tracking-[-0.21px] text-ink lg:text-[1.4375rem] lg:leading-[29px] lg:tracking-[-0.23px]">
          {heading}
        </h3>
        <span className="mt-2 block text-[1rem] font-light leading-[24px] text-ink">{body}</span>
        <span className="mt-3 inline-block text-[0.9rem] font-medium text-purple underline underline-offset-4">{linkLabel}</span>
      </span>
    </Link>
  );
}
