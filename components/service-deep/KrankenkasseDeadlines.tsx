import { Container } from "@/components/ui/Container";

interface DeadlineItem {
  date: string;
  body: string;
}

interface KrankenkasseDeadlinesProps {
  heading: string;
  subheading: string;
  items: DeadlineItem[];
}

/** Phase 7F.2 — live-remeasured against https://finwiwo.ch/krankenkasse/.
 * FINWIWO's own module: H2 "Wichtige Termine für den
 * Krankenkassenwechsel" + a short subheading, then 4 bordered list rows
 * (`.nectar-hor-list-item`: 1px solid rgba(0,0,0,.15) border, 10px
 * radius, transparent background, `fa-calendar` icon, ~708×89px at
 * 1440, single column, ~19px gap), inside a white 50px-radius card with
 * the same static `scale(0.93)`-as-box pattern already established
 * elsewhere in this project. Confirmed static (no hover transform on
 * the cards, measured live).
 *
 * All four dates (30. September / 30. November / 31. Dezember /
 * 31. März) are month+day only — genuinely evergreen Swiss health-
 * insurance switching deadlines, not tied to any year, so no staleness
 * risk exists in using them (per the phase's own current-date-safety
 * rule). Card bodies are reworded (not verbatim FINWIWO copy) and
 * cross-checked against the client guide's own §4.3 FAQ facts already
 * in `gesundheitDeep.faq[0]`: "Kündigung bis 30. November für einen
 * Wechsel per 1. Januar. Beim Standardmodell mit tiefster Franchise ist
 * zusätzlich ein Wechsel per 1. Juli möglich (Kündigung bis 31. März)."
 * FINWIWO's own 31. März card states the July-switch option applies
 * "bei Prämienerhöhung" (on premium increase) — this is a genuinely
 * DIFFERENT legal condition than the client guide's own "Standardmodell
 * mit tiefster Franchise" rule, so FINWIWO's condition is NOT reproduced;
 * the guide's own condition is used instead. The 30. September item
 * (new premiums announced) is not in the client guide's FAQ text — it is
 * an independently-verifiable, evergreen BAG-sourced fact already
 * consistent with this file's own sourcing convention (see
 * `content/de/deep/gesundheit.ts`'s header comment), not a FINWIWO
 * claim reproduced blindly. No "days remaining"/"jetzt wechseln"
 * urgency language anywhere, per the phase's own current-date-safety
 * rule. Built as a dedicated component — no existing NEOSURA deep-page
 * component has this bordered-list-of-facts architecture. */
export function KrankenkasseDeadlines({ heading, subheading, items }: KrankenkasseDeadlinesProps) {
  return (
    <div className="bg-paper-2 pt-[20px]">
      <Container>
        <div className="overflow-hidden rounded-[36px] bg-white px-6 py-12 sm:px-8 lg:rounded-[50px] lg:px-14 lg:py-[86px]">
          <h2 className="text-center text-[1.6875rem] font-normal leading-[1.2] tracking-normal text-ink lg:text-[1.875rem] lg:leading-[36px]">
            {heading}
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-center text-[1rem] font-light leading-[24px] text-ink-soft">
            {subheading}
          </p>

          <ul className="mx-auto mt-10 flex max-w-[708px] flex-col gap-5">
            {items.map((item) => (
              /* Phase 8D — reference deadline card: one horizontal row, 708px,
                 1px rgba(0,0,0,.15) border, 10px radius — calendar icon |
                 date 23/500/29 in a ~213px column | note 16/300/24. Stacks
                 below `sm` so the date doesn't wrap inside a narrow column. */
              <li
                key={item.date}
                className="flex items-start gap-4 rounded-[10px] border border-black/15 px-5 py-4 sm:items-center sm:py-[26px]"
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden className="mt-[3px] h-[24px] w-[24px] shrink-0 text-purple sm:mt-0">
                  <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <div className="flex flex-col gap-1 sm:grid sm:flex-1 sm:grid-cols-[213px_minmax(0,1fr)] sm:items-center sm:gap-x-4">
                  <span className="text-[1.3125rem] font-medium leading-[27px] tracking-[-0.23px] text-ink sm:text-[1.4375rem] sm:leading-[29px]">{item.date}</span>
                  <span className="text-[1rem] font-light leading-[24px] text-ink-soft">{item.body}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
}
