import { principlesHeading, principles } from "@/content/de/principles";
import { Container } from "@/components/ui/Container";

/** Honest trust reinforcement using neosura's own Prinzipien copy
 * verbatim. Used only on `/ueber-uns`.
 *
 * Phase 8J — rebuilt from the values module on `finwiwo.ch/ueber-finwiwo/`
 * ("Wahrer Mehrwert ist unsere einzige KPI."): a centred 28.8/600 heading
 * (27/32 on phones) over OPEN bordered cards — transparent, 1px hairline
 * (`#e9edf1`, NEOSURA's `line`), 5px radius, no shadow — each a 23/500/29
 * title (21/27 on phones) and a 16/300/24 body. The reference sets three
 * across; NEOSURA's four principles sit four across at desktop, two on
 * tablets and one on phones. Static, as on the reference. The previous
 * pass was a 22.4px left heading over two columns of counter-numbered
 * divider rows at 16.8/15.2px. */
export function ServicePrinciples() {
  return (
    <section className="bg-white">
      <Container className="py-14 lg:py-[72px]">
        <h2 className="mx-auto max-w-[32ch] text-center text-[1.6875rem] font-semibold leading-[32px] tracking-normal text-ink lg:text-[1.8rem] lg:leading-[31.68px]">
          {principlesHeading}
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4 lg:gap-[18px]">
          {principles.map((principle) => (
            <div key={principle.title} className="rounded-[5px] border border-line px-6 py-7">
              <h3 className="text-[1.3125rem] font-medium leading-[27px] tracking-[-0.21px] text-ink lg:text-[1.4375rem] lg:leading-[29px] lg:tracking-[-0.23px]">
                {principle.title}
              </h3>
              <p className="mt-3 text-[1rem] font-light leading-[24px] text-ink">{principle.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
