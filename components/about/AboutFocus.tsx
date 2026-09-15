import { about } from "@/content/de/about";
import { Container } from "@/components/ui/Container";

const FOCUS = [
  { title: "Privatkunden", body: about.focusPrivate },
  { title: "Unternehmen", body: about.focusBusiness },
];

/** Two-column split of `about.paragraphs[1]`'s own two sentences
 * (verbatim, just separated rather than run together) — not a card grid.
 *
 * Phase 8J — set as the reference story text (`finwiwo.ch/ueber-finwiwo/`:
 * H2 30/400/35, body 16/300/24 in a ~432-480px measure) instead of the
 * previous 25.6px heading over 16.3px body with "01/02" counters. The
 * section now runs straight on from the hero and into the team/review
 * notes below on one white surface, so the page reads as one story. */
export function AboutFocus() {
  return (
    <section className="bg-white">
      <Container className="pt-14 lg:pt-[72px]">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-x-[96px]">
          {FOCUS.map((item) => (
            <div key={item.title} className="border-t border-line-soft pt-6">
              <h2 className="text-[1.6875rem] font-normal leading-[32px] tracking-normal text-ink lg:text-[1.875rem] lg:leading-[35px]">
                {item.title}
              </h2>
              <p className="mt-4 max-w-[480px] text-[1rem] font-light leading-[24px] text-ink">{item.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
