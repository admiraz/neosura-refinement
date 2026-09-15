import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

interface ServiceContentChapterProps {
  id?: string;
  eyebrow?: string;
  heading: string;
  paragraphs: string[];
  checklist?: string[];
  /** Alternates paper/white background per chapter for rhythm, matching the
   * category-page "chapter surface" convention. */
  surface?: "paper" | "white";
}

/** A substantial, photo-free explanatory chapter — large heading, real
 * paragraphs, an optional checklist. Deliberately not a small card: full
 * container width, generous measure. Used for subtopics that are best
 * explained in text alone (e.g. a regulatory/structural explainer). */
export function ServiceContentChapter({
  id,
  eyebrow,
  heading,
  paragraphs,
  checklist,
  surface = "white",
}: ServiceContentChapterProps) {
  return (
    <section id={id} className={cn("scroll-mt-20", surface === "paper" ? "bg-paper" : "bg-white")}>
      <Container className="border-t border-line-soft py-14 lg:py-20">
        {eyebrow && (
          <span className="block text-[0.78rem] uppercase tracking-[0.16em] text-muted">{eyebrow}</span>
        )}
        <h2 className={`${eyebrow ? "mt-3" : ""} max-w-[720px] text-[1.9rem] font-normal leading-[1.15] text-ink lg:text-[2.4rem]`}>
          {heading}
        </h2>

        <div className="mt-6 flex flex-col gap-4 lg:mt-8">
          {paragraphs.map((p) => (
            <p key={p} className="max-w-[70ch] text-[1.06rem] leading-[1.6] text-ink-soft lg:text-[1.14rem]">
              {p}
            </p>
          ))}
        </div>

        {checklist && checklist.length > 0 && (
          <ul className="mt-7 grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2 lg:mt-8">
            {checklist.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[1.02rem] text-ink lg:text-[1.05rem]">
                <span aria-hidden className="mt-[0.1em] text-purple">
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" className="h-[1em] w-[1em]"><path d="M4 10.5l4 4 8-9" /></svg>
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
