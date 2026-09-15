import Link from "next/link";
import { Container } from "@/components/ui/Container";

interface ServiceAnalysisProps {
  heading: string;
  items: string[];
  ctaLabel: string;
  ctaHref: string;
}

/** The mid-page consultation moment: a concrete "what we look at together"
 * checklist, immediately followed by a real CTA into the working
 * Documents/upload flow — matching FINWIWO's early-and-repeated conversion
 * rhythm without a second fake form. */
export function ServiceAnalysis({ heading, items, ctaLabel, ctaHref }: ServiceAnalysisProps) {
  return (
    <section className="bg-purple">
      <Container className="py-14 lg:py-20">
        <div className="lg:flex lg:items-start lg:justify-between lg:gap-16">
          <h2 className="max-w-[480px] text-[1.9rem] font-normal leading-[1.2] text-white lg:text-[2.3rem]">
            {heading}
          </h2>

          <div className="mt-8 lg:mt-0 lg:w-[52%] lg:shrink-0">
            <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[1rem] text-white/95 lg:text-[1.05rem]">
                  <span aria-hidden className="mt-[0.1em] text-teal">
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" className="h-[1em] w-[1em]"><path d="M4 10.5l4 4 8-9" /></svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href={ctaHref}
              className="mt-8 inline-flex h-[50px] items-center rounded-full bg-white px-8 text-[0.95rem] font-normal text-purple transition-colors hover:bg-paper"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
