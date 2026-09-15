import Image from "next/image";
import Link from "next/link";
import type { ServiceItem } from "@/content/de/types";
import type { ServiceVisual } from "@/content/de/serviceVisuals";
import type { ServiceExtra } from "@/content/de/serviceExtras";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

interface CategoryServiceRowProps {
  index: number;
  service: ServiceItem;
  visual: ServiceVisual;
  extra: ServiceExtra;
  basePath: string;
  reverse: boolean;
}

/** Category-page interpretation of the FINWIWO service-overview grammar —
 * a fresh component (not the homepage's ServiceStoryRow), each service
 * getting its own soft paper/white "chapter" surface (alternating per
 * row) at a more substantial scale: capsule, H2, body, checklist, filled
 * CTA into the real detail page, and a large asymmetric-radius photo. */
export function CategoryServiceRow({ index, service, visual, extra, basePath, reverse }: CategoryServiceRowProps) {
  const num = String(index + 1).padStart(2, "0");

  /* Phase 8C — this row family has no counterpart on the reference
   * `/unternehmen/` page; its module is the reference homepage service row
   * (the same one `ServiceHighlightRow` follows), re-measured live: chip
   * 32px, 10px radius, 8/16 padding, 16/300/-0.1px, 24px to the heading;
   * heading 30/400/35/normal with 10px below; body 16/300/24 in a 509px
   * measure; checklist 16/300 on a 10px gap; row padding 72; image 433px.
   * The old global pill chip and the 35px heading / 18px body / 88px
   * padding made six stacked rows the heaviest part of the page.
   *
   * The six rows also alternated paper/white bands with a divider each, so
   * they read as six separate sections repeating one idea. They now share
   * the continuous `paper-2` surface the editorial rows above already use,
   * separated by rhythm alone (as the reference rows are), and the mobile
   * stack is tighter (image 240px, 40px row padding). */
  return (
    <Reveal className="bg-paper-2 py-10 lg:py-[72px]">
      <Container>
        <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:gap-[70px]">
          <div className={cn("lg:w-[42%]", reverse ? "lg:order-1" : "lg:order-2")}>
            <div className="relative h-[240px] w-full overflow-hidden sm:h-[340px] lg:h-[433px]">
              {/* Phase 9C — the accent crescent behind each photo is gone (the
                  reference shows only the masked photograph); the image now
                  fills its mask. */}
              <div
                className={cn(
                  "absolute inset-0 overflow-hidden",
                  reverse
                    ? "rounded-tl-[64px] rounded-bl-[64px] rounded-tr-[2px] rounded-br-[2px] lg:rounded-tl-[190px] lg:rounded-bl-[190px]"
                    : "rounded-tr-[64px] rounded-br-[64px] rounded-tl-[2px] rounded-bl-[2px] lg:rounded-tr-[190px] lg:rounded-br-[190px]"
                )}
              >
                <Image
                  src={visual.photo}
                  alt={visual.alt}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: visual.objectPosition }}
                />
              </div>
            </div>
          </div>

          <div className={cn("lg:w-[58%]", reverse ? "lg:order-2" : "lg:order-1")}>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-[32px] items-center rounded-[10px] bg-purple/[0.08] px-4 text-[1rem] font-light tracking-[-0.1px] text-purple">
                {extra.capsule}
              </span>
              <span className="text-[0.78rem] tracking-[0.14em] text-muted">{num}</span>
            </div>

            <h2 className="mb-[10px] mt-6 text-[1.75rem] font-normal leading-[1.17] tracking-normal text-ink lg:text-[1.875rem]">
              {service.title}
            </h2>
            <p className="max-w-[509px] text-[1rem] font-light leading-[1.5] text-ink-soft">
              {service.body}
            </p>

            {extra.checklist.length > 0 && (
              <ul className="mt-6 flex flex-col gap-[10px]">
                {extra.checklist.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[1rem] font-light leading-[1.3] text-ink">
                    <span aria-hidden className="mt-[0.1em] text-purple">
                      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" className="h-[1em] w-[1em]"><path d="M4 10.5l4 4 8-9" /></svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            <Link
              href={`${basePath}/${service.slug}`}
              className="mt-8 inline-flex h-[50px] items-center rounded-full bg-purple px-[35px] text-[0.875rem] font-medium tracking-[0.5px] text-white btn-motion hover:bg-purple-600"
            >
              Mehr erfahren
            </Link>
          </div>
        </div>
      </Container>
    </Reveal>
  );
}
