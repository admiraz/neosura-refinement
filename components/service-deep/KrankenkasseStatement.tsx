import { Container } from "@/components/ui/Container";
import { ScrollFadeWords } from "@/components/ui/ScrollFadeWords";

interface KrankenkasseStatementProps {
  statement: string;
  response: string;
}

/** Phase 7F.2 — live-remeasured against https://finwiwo.ch/krankenkasse/.
 * FINWIWO's own module here: a centered rhetorical H3 ("Zahlen Sie auch
 * jeden Monat zu viel für Ihre Krankenkasse, ohne zu wissen welche
 * Leistungen Sie überhaupt haben?", 35.2px/42.24px/weight 500, centered,
 * transparent background, no radius) directly followed by a short,
 * small-caps response line ("UNSERE KLIENTEN NÄMLICH NICHT"). The
 * `nectar-split-heading-merged` wrapper markup wraps every word in a
 * nested span (presumably for an optional reveal capability), but a
 * live scroll test found every word already at `opacity: 1` at every
 * sampled position — genuinely static, not a word-by-word reveal, so
 * none is built here.
 *
 * FINWIWO's own statement implies an unverified "you're overpaying"
 * claim and its response is FINWIWO's own brand line — neither is
 * reused. This is a **UI STATEMENT DERIVED FROM CLIENT COPY**: rather
 * than invent a new rhetorical question, this reuses
 * `gesundheitDeep.problem` — already-approved NEOSURA copy (not
 * FINWIWO's wording, not fabricated) that occupies the exact same
 * 2-beat "question → short confident response" role the guide itself
 * never explicitly wrote a line for. Built as a dedicated component
 * rather than reusing `CategoryProblemStatement`/`ProblemStatement`
 * per this phase's explicit instruction not to reach for a similar-
 * looking Phase-6 component as a shortcut. */
/** Phase 8D — re-measured against the reference `/krankenkasse/` statement
 * (`nectar-split-heading`). Its reveal is per-word OPACITY 0.2 -> 1, scrubbed
 * straight from scroll (no transition, no transform) — not the homepage's
 * mask sweep — and at this module's own speed: sampled across 18 words, each
 * word brightens over ~7.8% of the viewport with ~2.6% between words, keyed
 * to the block centre starting at 1.115 vh (fit within ~0.02 on every
 * sample). The second beat is not a separate animation: its words carry on
 * the same wave exactly where the statement's sequence would continue, so
 * its start is the statement's start minus its word count times the stagger,
 * plus the gap between the two blocks' centres.
 *
 * Type: statement 35.2/500/42.24/-0.01em in a 656px measure (28.8/34.56 on
 * phones); second beat 35.2px heavy uppercase in the accent colour, 24px
 * below; row padding ~101px. The previous pass rendered the statement at
 * 36/400/1.4 in 750px with the reply as a 13.6px caption. */
const STATEMENT_TIMING = { start: 1.115, stagger: 0.0262, ramp: 0.0777 };

export function KrankenkasseStatement({ statement, response }: KrankenkasseStatementProps) {
  const statementWords = statement.split(" ").length;
  const beatTiming = {
    ...STATEMENT_TIMING,
    start: STATEMENT_TIMING.start - statementWords * STATEMENT_TIMING.stagger + 0.13,
  };
  const scale = "text-[1.8rem] leading-[1.2] min-[1001px]:text-[2.2rem]";

  return (
    <section className="bg-transparent">
      <Container className="py-[56px] text-center lg:py-[101px]">
        <ScrollFadeWords
          mode="opacity"
          timing={STATEMENT_TIMING}
          text={statement}
          className={`mx-auto max-w-[656px] font-medium tracking-[-0.01em] text-ink ${scale}`}
        />
        <ScrollFadeWords
          mode="opacity"
          timing={beatTiming}
          text={response}
          className={`mx-auto mt-6 max-w-[656px] font-black uppercase tracking-normal text-purple ${scale}`}
        />
      </Container>
    </section>
  );
}
