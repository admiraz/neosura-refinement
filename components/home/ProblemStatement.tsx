import { problemStatement } from "@/content/de/problem";
import { Container } from "@/components/ui/Container";
import { ScrollFadeWords } from "@/components/ui/ScrollFadeWords";

/** FINWIWO's exact two-beat rhetorical grammar (measured live,
 * docs/finwiwo-architecture — see Phase 7C.2): one centered, softly-toned
 * statement in a narrow ~52%-width column (natural wrap, no manual line
 * breaks), then a short, bold, accent-colored response sitting only ~24px
 * below it. Both breakpoints center the text — FINWIWO does not offset or
 * right-align here. No card, no photo, no CTA. NEOSURA keeps its own
 * wording, font family, and purple/teal palette — only the composition is
 * matched.
 *
 * SCROLL-FADE PASS — re-audited against the live reference block
 * (`.nectar-text-inline-images--animation_scroll_fade` on
 * `https://finwiwo.ch/`), which is the same rhetorical section. Both
 * beats now use the reference's own per-word mask sweep — see
 * `ScrollFadeWords` for the measured mechanism, the exact scroll formula
 * lifted from the theme source, and its verification against live
 * samples.
 *
 * TYPOGRAPHY — measured on the live block at six viewports rather than
 * inferred from its class names (the class reads `font_size_desktop_2vw`
 * but the rule it maps to is actually `font-size: 2.5vw`):
 *   >1000px  → 2.5vw  (36px @1440, 32px @1280, 25.6px @1024)
 *   691-1000 → 4vw    (30.72px @768)
 *   <=690px  → 7vw main / 8vw accent (27.3/31.2px @390, 25.2/28.8px @360)
 * line-height 1.4, main weight 400.
 *
 * Phase 8A — re-measured beat for beat at 1440. The section already matched
 * to the pixel (528px vs the reference's 529, column x345/w750 vs x346/w749,
 * 36px/50.4px). Three deltas were corrected:
 *  - second beat is weight 900 + uppercase on the reference, not 700 + mixed
 *    case, and carries `letter-spacing: -0.1px` where the first beat is
 *    `normal`;
 *  - the reference stacks the two beats with NO gap (margin 0 both sides —
 *    line-height alone separates them); NEOSURA had a 24px `mt-6`;
 *  - the site-wide `-0.006em` body tracking made the first beat tighter than
 *    the reference's `normal`, so it is explicitly reset here. That global
 *    rule is correct almost everywhere but reduces fidelity in this one
 *    module, so it is overridden rather than followed.
 *
 * Two deliberate non-matches, both documented rather than silently
 * diverging:
 *  - FONT FAMILY: the reference renders in "Futura Std Book". NEOSURA's
 *    locked brand face is Arial Nova (`--font-sans`) and this project
 *    licenses no Futura, so the family stays NEOSURA's while every other
 *    measurable property (size/weight/line-height/tracking/colour) is
 *    matched.
 *  - COLOUR: the reference greys are `#555555` / `#42B496`. This uses
 *    NEOSURA's own existing tokens — `text-muted` (#6f6579), the closest
 *    brand-system soft grey, replacing the previous near-black
 *    `text-ink-soft` (#3d3547), and `text-purple` for the accent beat
 *    rather than FINWIWO's own teal. */
export function ProblemStatement() {
  return (
    <section className="bg-paper">
      <Container className="py-[93px] text-center lg:py-[101px]">
        <ScrollFadeWords
          text={problemStatement.lines.join(" ")}
          className="mx-auto max-w-[330px] text-[7vw] font-normal leading-[1.4] tracking-normal text-ink-soft min-[691px]:text-[4vw] sm:max-w-[560px] min-[1001px]:text-[2.5vw] lg:max-w-[750px]"
        />

        <ScrollFadeWords
          text={problemStatement.response}
          className="mx-auto max-w-[330px] text-[8vw] font-black uppercase leading-[1.4] tracking-[-0.1px] text-purple min-[691px]:text-[4vw] sm:max-w-[560px] min-[1001px]:text-[2.5vw] lg:max-w-[750px]"
        />
      </Container>
    </section>
  );
}
