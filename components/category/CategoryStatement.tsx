import { ScrollFadeWords } from "@/components/ui/ScrollFadeWords";

interface CategoryStatementProps {
  label: string;
  statement: string;
  conclusion: string;
  accent: "purple" | "teal";
}

/** Phase 7D.2 — rebuilt from FINWIWO's live `/versicherungen/` post-hero
 * section (measured 1440/1280/1024/390/360): a single centered
 * `wpb_row` (`nectar-split-heading-merged` — word-split markup, but
 * confirmed via fresh-reload sampling at 0/100/200/350/500/800/1200/
 * 2000ms and full scroll-range sampling before→after that opacity stays
 * 1 and transform stays the identity matrix throughout — no observable
 * motion despite the word-split structure, so this stays static rather
 * than trusting the class name). Row starts exactly at the hero's own
 * bottom edge and ends exactly where FINWIWO's next section begins —
 * zero gap on both sides (707.28px hero-bottom = this row's top;
 * 1207.72px this row's bottom = next row's top, confirmed by direct
 * measurement). Large symmetric padding (115.2px desktop, 31.2px
 * mobile — same ratio, not a fixed value) is what gives the row its
 * height; there's no card, divider, or background change of its own —
 * same light surface as the hero's own surrounding backdrop.
 *
 * Three stacked centered text blocks, same font-size/line-height
 * (44.8px/53.76px desktop confirmed via computed style, ~21px/25.2px
 * mobile, ratio 1.2 both), only weight differs: label 400, statement
 * 500, then a bold accent-color all-caps concluding line (measured only
 * visually — precise computed-style reads kept colliding with the
 * hero's own "versichert" text — but clearly bold/teal/centered from
 * the screenshot). FINWIWO's own concluding line is a direct rhetorical
 * question aimed at the reader ("WER SICHERT IHRES AB?") — that
 * *grammar* (short punchy question, not a claim) is reproduced with
 * genuine NEOSURA wording, not FINWIWO's sentence. No "Unsere Klienten
 * wissen" framing (no genuine customer evidence exists), no stats,
 * no testimonial. */
/** Phase 8B.1 — this row's reference is the `/versicherungen/` statement
 * (`nectar-split-heading`), and its per-word reveal is OPACITY 0.2 → 1,
 * scroll-scrubbed, not the homepage's mask sweep — so it now uses
 * `ScrollFadeWords mode="opacity"`, which reproduces that measured ramp (see
 * `OpacityWords`). Live behaviour for this module wins over reusing the
 * homepage mechanism.
 *
 * CALM, NOT CAMPAIGN. The reference reads as editorial because its three
 * beats sit on four lines (label 1 · statement 2 · question 1, ~264px of
 * text). NEOSURA's copy is longer, and at the reference's 44.8px in a 656px
 * column the previous pass wrapped it to six lines, with the question
 * forced into uppercase on top — taller and louder than the source. So:
 *  - the question renders in its own mixed case (the reference's caps are in
 *    its copy, not in CSS) at the reference's quiet weight 300;
 *  - desktop size 40px (2.78vw) in a 720px measure, which returns the block
 *    to four lines, ~212px;
 *  - below 1001px the beats follow the reference's own mobile steps — the
 *    label larger than the statement (27px / 21px at 390, 24 / 19 at 768)
 *    rather than one large size for all three;
 *  - line-height stays at the reference's 1.2.
 *
 * Copy, structure and the `bg-paper-2` surface are unchanged. */
export function CategoryStatement({ label, statement, conclusion, accent }: CategoryStatementProps) {
  const accentText = accent === "teal" ? "text-purple" : "text-purple";
  const labelScale = "text-[7vw] leading-[1.2] min-[691px]:text-[3.1vw] min-[1001px]:text-[2.78vw]";
  const beatScale = "text-[5.4vw] leading-[1.2] min-[691px]:text-[2.5vw] min-[1001px]:text-[2.78vw]";

  return (
    <div className="bg-paper-2">
      <div className="mx-auto max-w-[784px] px-6 py-[56px] text-center sm:px-8 lg:py-[96px]">
        <ScrollFadeWords mode="opacity" text={label} className={`font-normal tracking-normal text-muted ${labelScale}`} />
        <ScrollFadeWords
          mode="opacity"
          text={statement}
          className={`mt-1 font-medium tracking-[-0.01em] text-ink ${beatScale}`}
        />
        <ScrollFadeWords
          mode="opacity"
          text={conclusion}
          className={`mt-4 font-light tracking-[-0.1px] lg:mt-5 ${beatScale} ${accentText}`}
        />
      </div>
    </div>
  );
}
