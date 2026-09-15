import { Container } from "@/components/ui/Container";

interface ServiceFaqProps {
  id?: string;
  heading: string;
  items: { question: string; answer: string }[];
}

/** Native <details>/<summary> accordion — fully keyboard-operable (Tab to
 * focus, Enter/Space to toggle) and screen-reader friendly without any
 * custom JS or ARIA wiring to get wrong. No scroll animation. */
export function ServiceFaq({ id, heading, items }: ServiceFaqProps) {
  return (
    <section id={id} className="scroll-mt-20 bg-paper">
      <Container className="border-t border-line-soft py-14 lg:py-20">
        <h2 className="text-[1.9rem] font-normal leading-[1.15] text-ink lg:text-[2.2rem]">{heading}</h2>

        <div className="mt-8 flex max-w-[840px] flex-col lg:mt-10">
          {items.map((item) => (
            <details key={item.question} className="group border-b border-line-soft py-5 first:border-t">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[1.05rem] text-ink marker:content-none lg:text-[1.12rem]">
                {item.question}
                <span
                  aria-hidden
                  className="shrink-0 text-[1.3rem] font-light text-purple transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-[70ch] text-[0.98rem] leading-[1.6] text-ink-soft lg:text-[1.02rem]">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
