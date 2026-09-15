interface WohnenUnterversicherungProps {
  heading: string;
  body: string;
  /** Phase 8E — opt-in approved deep-page callout styling (see below);
   * `/unternehmen/personal` keeps its current card until its own pass. */
  callout?: boolean;
}

/** Phase 7G — client-required underinsurance info box. No matching card/
 * note/tip architecture exists anywhere on the live
 * https://finwiwo.ch/wohnen-recht-ferien/ reference (confirmed via a
 * broad selector sweep for `[class*="tip"]`/`[class*="note"]`/
 * `[class*="info"]`/`[class*="hint"]`/`[class*="alert"]`/
 * `[class*="callout"]` — zero matches). Per the brief's own fallback
 * instruction, this reuses this project's own already-established white-
 * card visual language (the same `bg-paper-2` wrapper + white rounded
 * card already used by `KrankenkasseDeadlines`), simplified to a single
 * icon + heading + paragraph — no list, since there is only one point to
 * make, not several.
 *
 * UI HEADING DERIVED FROM CLIENT CONTENT: "Unterversicherung" is a
 * neutral, factual noun naming the concept the guide's own Hausrat
 * sentence already describes — not FINWIWO wording, not invented framing.
 * Body is the guide's own exact underinsurance sentence, taken directly
 * from the Hausrat paragraph, not paraphrased into a new legal statement
 * and not given any invented numeric example. */
export function WohnenUnterversicherung({ heading, body, callout = false }: WohnenUnterversicherungProps) {
  return (
    <div className="bg-paper-2 pt-[20px]">
      {/* Phase 8E — no counterpart on the reference page; styled as the approved
          deep-page callout (the Krankenkasse "Faustregel" box: 840px, teal 8%
          fill, 12px radius, teal 20% border, 16/20 padding, 16px text) instead
          of a small white card with 15px copy. */}
      <div className={`mx-auto px-6 sm:px-8 ${callout ? "max-w-[888px]" : "max-w-[900px]"}`}>
        <div
          className={
            callout
              ? "flex items-start gap-4 rounded-[12px] border border-purple/20 bg-purple/[0.08] px-5 py-4"
              : "flex items-start gap-4 rounded-[20px] bg-white px-6 py-7 sm:gap-5 sm:px-8 sm:py-8"
          }
        >
          <span
            aria-hidden
            className={
              callout
                ? "flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full border border-purple/25 bg-white text-purple"
                : "flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full border border-line-soft text-purple"
            }
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path
                d="M12 9v4M12 16.5h.01M10.29 3.86l-8.18 14.18A1.5 1.5 0 0 0 3.5 20.5h17a1.5 1.5 0 0 0 1.39-2.46L13.71 3.86a1.5 1.5 0 0 0-2.82 0z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div>
            <h3 className={callout ? "text-[1rem] font-semibold leading-[24px] text-ink" : "text-[1.05rem] font-medium text-ink"}>{heading}</h3>
            <p className={callout ? "mt-1 text-[1rem] font-light leading-[24px] text-ink" : "mt-2 text-[0.95rem] leading-[1.55] text-ink-soft"}>{body}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
