import Image from "next/image";
import Link from "next/link";
import type { ServiceVisual } from "@/content/de/serviceVisuals";
import { cn } from "@/lib/cn";

interface CategoryClosingProps {
  photo: ServiceVisual;
  heading: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  /** true = text left / photo right (Unternehmen); false = photo left /
   * text right (Privatkunden) — the one deliberate geometry difference
   * between the two otherwise-identical category-page templates. */
  reverse: boolean;
}

/** The category page's real close: a large photographic consultation
 * section replacing both the process recap and the reused homepage
 * FinalCta, so FINWIWO's photo-led late-page weight carries all the way
 * to the Footer instead of falling back into the homepage's own purple
 * CTA band. No mascot, no stats, no testimonial — just a strong licensed
 * photograph, a real editorial statement, and one CTA. Mobile is always
 * photo-first regardless of `reverse` (only the desktop side flips). */
export function CategoryClosing({ photo, heading, body, ctaLabel, ctaHref, reverse }: CategoryClosingProps) {
  return (
    <section className="overflow-hidden bg-white">
      <div className={cn("lg:flex lg:items-stretch", reverse && "lg:flex-row-reverse")}>
        <div className="relative h-[320px] w-full sm:h-[440px] lg:h-[580px] lg:w-[50vw]">
          <Image
            src={photo.photo}
            alt={photo.alt}
            fill
            loading="lazy"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={cn(
              "rounded-[2px] object-cover",
              reverse
                ? "lg:rounded-tl-[180px] lg:rounded-bl-[180px] lg:rounded-tr-[2px] lg:rounded-br-[2px]"
                : "lg:rounded-tr-[180px] lg:rounded-br-[180px] lg:rounded-tl-[2px] lg:rounded-bl-[2px]"
            )}
            style={{ objectPosition: photo.objectPosition }}
          />
        </div>

        <div className="px-6 py-14 sm:px-8 lg:flex lg:w-[50vw] lg:items-center lg:px-16 lg:py-0">
          <div className="lg:max-w-[560px]">
            <h2 className="text-[2.1rem] font-normal leading-[1.2] tracking-[-0.01em] text-ink lg:text-[2.6rem]">
              {heading}
            </h2>
            <p className="mt-5 max-w-[54ch] text-[1.06rem] leading-[1.55] text-ink-soft lg:text-[1.18rem]">
              {body}
            </p>
            <Link
              href={ctaHref}
              className="mt-8 inline-flex h-[50px] items-center rounded-full bg-purple px-[35px] text-[0.875rem] font-medium tracking-[0.5px] text-white btn-motion hover:bg-purple-600 lg:mt-9"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
