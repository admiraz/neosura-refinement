import { Container } from "@/components/ui/Container";

interface ServiceProcessStep {
  num: string;
  title: string;
  body: string;
}

interface ServiceProcessProps {
  id?: string;
  heading: string;
  steps: ServiceProcessStep[];
}

/** "Wie wir vorgehen" for this specific service — same approved 3-step
 * architecture (Analyse / Struktur / Begleitung) as everywhere else on the
 * site, but with step descriptions written for this service rather than
 * the generic sitewide copy. No mascot, no cards, no motion. */
export function ServiceProcess({ id, heading, steps }: ServiceProcessProps) {
  return (
    <section id={id} className="scroll-mt-20 bg-white">
      <Container className="border-t border-line-soft py-14 lg:py-20">
        <h2 className="text-[1.9rem] font-normal leading-[1.15] text-ink lg:text-[2.2rem]">{heading}</h2>

        <div className="relative mt-10 grid grid-cols-1 gap-9 lg:mt-14 lg:grid-cols-3 lg:gap-12">
          <div className="absolute left-0 right-0 top-[46px] hidden h-px bg-purple/15 lg:block" aria-hidden />
          {steps.map((step) => (
            <div key={step.num} className="relative">
              <span
                aria-hidden
                className="block select-none text-[3.4rem] font-light leading-none text-purple/[0.12] lg:text-[4.2rem]"
              >
                {step.num}
              </span>
              <h3 className="-mt-4 text-[1.35rem] font-normal text-ink">{step.title}</h3>
              <p className="mt-3 max-w-[36ch] text-[1rem] leading-relaxed text-ink-soft">{step.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
