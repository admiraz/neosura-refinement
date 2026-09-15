import Image from "next/image";
import type { ServiceVisual } from "@/content/de/serviceVisuals";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

interface ServicePhotoChapterProps {
  id?: string;
  eyebrow?: string;
  heading: string;
  paragraphs: string[];
  checklist?: string[];
  photo: ServiceVisual;
  reverse?: boolean;
  surface?: "paper" | "white";
}

/** The alternating text/photo chapter grammar (same asymmetric-radius
 * masked photo as the category-page service rows), reused here for a
 * service's own subtopic chapters that benefit from imagery. */
export function ServicePhotoChapter({
  id,
  eyebrow,
  heading,
  paragraphs,
  checklist,
  photo,
  reverse = false,
  surface = "white",
}: ServicePhotoChapterProps) {
  const accent = reverse ? "bg-teal" : "bg-purple";

  return (
    <section id={id} className={cn("scroll-mt-20", surface === "paper" ? "bg-paper" : "bg-white")}>
      <Container className="border-t border-line-soft py-14 lg:py-20">
        <div className="flex flex-col gap-9 lg:flex-row lg:items-center lg:gap-[70px]">
          <div className={cn("lg:w-[45%]", reverse ? "lg:order-1" : "lg:order-2")}>
            <div className="relative h-[300px] w-full overflow-hidden sm:h-[380px] lg:h-[460px]">
              <div
                aria-hidden
                className={cn(
                  "absolute inset-0",
                  accent,
                  reverse
                    ? "rounded-tl-[64px] rounded-bl-[64px] rounded-tr-[2px] rounded-br-[2px] lg:rounded-tl-[190px] lg:rounded-bl-[190px]"
                    : "rounded-tr-[64px] rounded-br-[64px] rounded-tl-[2px] rounded-bl-[2px] lg:rounded-tr-[190px] lg:rounded-br-[190px]"
                )}
              />
              <div
                className={cn(
                  "absolute inset-y-0 w-[90%] overflow-hidden",
                  reverse
                    ? "right-0 rounded-tl-[64px] rounded-bl-[64px] rounded-tr-[2px] rounded-br-[2px] lg:rounded-tl-[190px] lg:rounded-bl-[190px]"
                    : "left-0 rounded-tr-[64px] rounded-br-[64px] rounded-tl-[2px] rounded-bl-[2px] lg:rounded-tr-[190px] lg:rounded-br-[190px]"
                )}
              >
                <Image
                  src={photo.photo}
                  alt={photo.alt}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: photo.objectPosition }}
                />
              </div>
            </div>
          </div>

          <div className={cn("lg:w-[55%]", reverse ? "lg:order-2" : "lg:order-1")}>
            {eyebrow && (
              <span className="block text-[0.78rem] uppercase tracking-[0.16em] text-muted">{eyebrow}</span>
            )}
            <h2 className={`${eyebrow ? "mt-3" : ""} text-[1.9rem] font-normal leading-[1.15] text-ink lg:text-[2.2rem]`}>
              {heading}
            </h2>
            <div className="mt-5 flex flex-col gap-4">
              {paragraphs.map((p) => (
                <p key={p} className="max-w-[60ch] text-[1.04rem] leading-[1.55] text-ink-soft lg:text-[1.1rem]">
                  {p}
                </p>
              ))}
            </div>
            {checklist && checklist.length > 0 && (
              <ul className="mt-6 flex flex-col gap-3">
                {checklist.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[1rem] text-ink lg:text-[1.05rem]">
                    <span aria-hidden className="mt-[0.1em] text-purple">
                      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" className="h-[1em] w-[1em]"><path d="M4 10.5l4 4 8-9" /></svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
