import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

interface ServiceComparisonProps {
  id?: string;
  heading: string;
  intro?: string;
  columnHeaders: string[];
  rows: { label: string; cells: string[] }[];
  surface?: "paper" | "white";
}

/** A genuinely useful comparison table — conceptual differences between
 * coverage types, not manufactured numbers. Horizontally scrollable on
 * narrow viewports rather than squeezed or truncated. Used only on
 * services where a real, source-supported comparison exists. */
export function ServiceComparison({ id, heading, intro, columnHeaders, rows, surface = "paper" }: ServiceComparisonProps) {
  return (
    <section id={id} className={cn("scroll-mt-20", surface === "paper" ? "bg-paper" : "bg-white")}>
      <Container className="border-t border-line-soft py-14 lg:py-20">
        <h2 className="max-w-[720px] text-[1.9rem] font-normal leading-[1.15] text-ink lg:text-[2.2rem]">
          {heading}
        </h2>
        {intro && <p className="mt-4 max-w-[70ch] text-[1.04rem] leading-[1.55] text-ink-soft lg:text-[1.1rem]">{intro}</p>}

        <div className="mt-8 overflow-x-auto lg:mt-10">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className="border-b border-line">
                <th className="py-3 pr-6 text-[0.8rem] uppercase tracking-[0.1em] text-muted">&nbsp;</th>
                {columnHeaders.map((h) => (
                  <th key={h} className="py-3 pr-6 text-[0.95rem] font-normal text-ink">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-line-soft">
                  <th scope="row" className="py-4 pr-6 text-[0.95rem] font-normal text-ink">
                    {row.label}
                  </th>
                  {row.cells.map((cell, i) => (
                    <td key={i} className="py-4 pr-6 text-[0.95rem] leading-[1.5] text-ink-soft">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}
