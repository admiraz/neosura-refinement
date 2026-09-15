import { Container } from "@/components/ui/Container";

interface ComparisonRow {
  label: string;
  left: string;
  right: string;
}

interface CategoryComparisonProps {
  introHeading: string;
  introBody: string;
  leftHeading: string;
  rightHeading: string;
  rows: ComparisonRow[];
  accent: "purple" | "teal";
}

/** Phase 7D.7 — rebuilt from FINWIWO's live `/versicherungen/` module
 * immediately after the 4-step process (measured 1440/1024/390): a
 * static, non-scaled `wpb_row` (`scaleInfo: null`, `transform: none` at
 * every sampled scroll position — confirmed genuinely static, unlike
 * the showcase/process rows) sitting directly on the ambient paper-2
 * backdrop, ~20px below the process (same rhythm as every other section
 * boundary in this rebuild). Three equal 15px-radius columns
 * (456.7px each on a 1440 viewport, no enclosing card of their own):
 * a teal gradient intro card, then two feature-comparison columns, each
 * built from 7 live rows of "label\nvalue" pairs with a 1px divider
 * between rows and the value color-coded (teal for the affirmative
 * side, default ink for the negative side) — confirmed by DOM: no
 * check/cross icon anywhere in the module, just colored text. Stays
 * 3-across at the 1024px tablet checkpoint (confirmed live) and stacks
 * to one column only at 390px mobile. No links/CTA inside the module
 * and no hover state on anything (confirmed live).
 *
 * CONTENT MISMATCH (documented, not reproduced): the module's actual
 * live opening line is "Steuerabzüge in der Schweiz: So senken Sie Ihre
 * Steuerlast gezielt" — the SAME class of stale tax-template bleed
 * already documented on the process module's subheading (7D.6), here
 * attached as this module's own kicker, complete with its own swash
 * (`hasSvg: true` on that text, `false` on the real "Der Unterschied…"
 * heading below it). Only the comparison ARCHITECTURE is reused; this
 * NEOSURA rebuild has no kicker/swash at all, because the swash
 * belonged exclusively to the wording being dropped.
 *
 * FINWIWO's actual comparison content makes direct unfavorable claims
 * about unnamed "online platforms" (a flat "Nein" against every row).
 * That specific one-sided claim isn't reproduced — the LAYOUT grammar
 * (intro card + two labelled columns + row-by-row comparison) is kept,
 * but the framing is neutral: two honest ways of organizing your own
 * insurance (self-directed vs. with guidance), not a competitor
 * takedown. Row topics and their right-column values are limited to
 * concepts already approved elsewhere in the project (`principles`,
 * `CategoryProcess`, `CategoryExplainer`) — no negotiation/pricing
 * claims that aren't already backed by existing content. */
export function CategoryComparison({
  introHeading,
  introBody,
  leftHeading,
  rightHeading,
  rows,
  accent,
}: CategoryComparisonProps) {
  /* Phase 9B — analytical, not a pricing table: the solid purple intro slab
   * (the page's largest purple mass) is now a plain text column, and the
   * two comparison columns lose their borders — hairline rows on white,
   * with purple reserved for the recommended column's heading and values. */
  const rightAccentText = accent === "teal" ? "text-purple" : "text-purple";

  return (
    <div className="bg-paper-2 pt-[20px]">
      <Container>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-x-6">
          <div className="lg:pr-4 lg:pt-7">
            <h2 className="text-[1.6875rem] font-normal leading-[1.2] tracking-normal text-ink lg:text-[1.8rem]">{introHeading}</h2>
            <p className="mt-4 text-[1rem] font-light leading-[24px] text-ink-soft">{introBody}</p>
          </div>

          <div className="rounded-[10px] bg-white p-6 sm:p-7">
            <h3 className="text-center text-[1.4375rem] font-medium leading-[29px] tracking-[-0.23px] text-ink">{leftHeading}</h3>
            <dl className="mt-6 flex flex-col">
              {rows.map((row, i) => (
                <div
                  key={row.label}
                  className={`py-4 ${i < rows.length - 1 ? "border-b border-line-soft" : ""}`}
                >
                  <dt className="text-[0.9rem] text-ink-soft">{row.label}</dt>
                  <dd className="mt-1 text-[0.95rem] font-medium text-ink">{row.left}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-[10px] bg-white p-6 sm:p-7">
            <h3 className={`text-center text-[1.4375rem] font-medium leading-[29px] tracking-[-0.23px] ${rightAccentText}`}>{rightHeading}</h3>
            <dl className="mt-6 flex flex-col">
              {rows.map((row, i) => (
                <div
                  key={row.label}
                  className={`py-4 ${i < rows.length - 1 ? "border-b border-line-soft" : ""}`}
                >
                  <dt className="text-[0.9rem] text-ink-soft">{row.label}</dt>
                  <dd className={`mt-1 text-[0.95rem] font-medium ${rightAccentText}`}>{row.right}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </div>
  );
}
