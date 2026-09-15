import { Container } from "@/components/ui/Container";

interface CategoryCoverageTrustProps {
  serviceNames: string[];
  trustConcepts: string[];
}

/** Compact, static post-Hero proof rhythm — FINWIWO's partner-row density
 * translated honestly: real service names at large scale (numbered, thin
 * separators, no cards/pills, no ticker motion) plus the real trust
 * concepts below. No reviews, logos, or fabricated numbers. */
export function CategoryCoverageTrust({ serviceNames, trustConcepts }: CategoryCoverageTrustProps) {
  return (
    <section className="border-y border-line bg-white">
      <Container className="py-7 lg:py-8">
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-3 lg:justify-between">
          {serviceNames.map((name, i) => (
            <span key={name} className="flex items-baseline gap-4 whitespace-nowrap">
              <span className="flex items-baseline gap-2.5">
                <span className="text-[0.68rem] tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[1.05rem] font-normal tracking-[-0.01em] text-ink lg:text-[1.2rem]">{name}</span>
              </span>
              {i < serviceNames.length - 1 && <span aria-hidden className="hidden h-4 w-px bg-line lg:block" />}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line-soft pt-5 text-[0.85rem] text-ink-soft lg:mt-6 lg:pt-6">
          {trustConcepts.map((concept, i) => (
            <span key={concept} className="flex items-center gap-3 whitespace-nowrap">
              <span>{concept}</span>
              {i < trustConcepts.length - 1 && <span aria-hidden className="h-3 w-px bg-line" />}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
