import { Container } from "@/components/ui/Container";
import { ScrollFadeWords } from "@/components/ui/ScrollFadeWords";

interface CategoryProblemStatementProps {
  statement: string;
  response: string;
}

/** FINWIWO's large rhetorical-statement beat, translated per audience —
 * a long typographic first beat, then a short, strong second beat. No
 * image, no mascot, no cards, matching the homepage ProblemStatement's own
 * restraint but with page-specific wording.
 *
 * Visual polish pass — now shares the homepage statement's measured
 * mechanics: the reference's per-word mask sweep (`ScrollFadeWords`) and
 * its measured type scale, with the soft grey first beat the reference
 * uses. The decorative rule and asymmetric right-alignment of the second
 * beat are dropped: the reference stacks both beats centred, and the rule
 * was an extra visual object with no counterpart. */
export function CategoryProblemStatement({ statement, response }: CategoryProblemStatementProps) {
  const scale = "text-[7vw] leading-[1.4] min-[691px]:text-[4vw] min-[1001px]:text-[2.5vw]";

  return (
    <section className="bg-paper">
      <Container className="py-[62px] text-center lg:py-[92px]">
        <ScrollFadeWords
          text={statement}
          className={`mx-auto max-w-[330px] font-normal text-muted sm:max-w-[560px] lg:max-w-[750px] ${scale}`}
        />
        <ScrollFadeWords
          text={response}
          className={`mx-auto mt-6 max-w-[330px] font-bold text-purple sm:max-w-[560px] lg:max-w-[750px] ${scale}`}
        />
      </Container>
    </section>
  );
}
