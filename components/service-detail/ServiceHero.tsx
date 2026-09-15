import Image from "next/image";
import Link from "next/link";
import type { ServiceItem } from "@/content/de/types";
import type { ServiceVisual } from "@/content/de/serviceVisuals";
import type { ServiceExtra } from "@/content/de/serviceExtras";
import { Container } from "@/components/ui/Container";

interface ServiceHeroProps {
  service: ServiceItem;
  visual: ServiceVisual;
  extra: ServiceExtra;
  ctaLabel: string;
  ctaHref: string;
}

/** Page-top translation of the FINWIWO service hero: large editorial photo
 * proportioned against a text column, real checklist, one filled CTA — no
 * floating stat badges or review widgets (those are FINWIWO claims, not
 * ours). Mobile stacks headline copy, then photo, then checklist + CTA,
 * matching FINWIWO's mobile hero rhythm rather than the mid-page
 * ServiceStoryRow's photo-first mobile order. Reuses the same asymmetric
 * mask + color-slab photo treatment as ServiceStoryRow, sized up. */
export function ServiceHero({ service, visual, extra, ctaLabel, ctaHref }: ServiceHeroProps) {
  return (
    <section className="bg-paper">
      <Container className="flex flex-col gap-8 py-12 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-16 lg:gap-y-14 lg:py-20">
        <div className="lg:col-start-1 lg:row-start-1">
          <span className="inline-flex h-[30px] items-center rounded-full px-4 text-[0.82rem] font-medium tracking-[0.01em] bg-purple text-white">
            {extra.capsule}
          </span>
          <h1 className="mt-6 text-[2.4rem] font-normal leading-[1.08] tracking-[-0.01em] text-ink lg:mt-7 lg:text-[3.1rem]">
            {service.title}
          </h1>
          <p className="mt-5 max-w-[540px] text-[1.1rem] leading-[1.5] text-ink-soft lg:text-[1.18rem]">
            {service.body}
          </p>
        </div>

        <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-center">
          <div className="relative h-[300px] w-full overflow-hidden sm:h-[380px] lg:h-[520px]">
            <div aria-hidden className="absolute inset-0 rounded-tr-[64px] rounded-br-[64px] rounded-tl-[2px] rounded-bl-[2px] bg-teal lg:rounded-tr-[180px] lg:rounded-br-[180px]" />
            <div className="absolute inset-y-0 left-0 w-[90%] overflow-hidden rounded-tr-[64px] rounded-br-[64px] rounded-tl-[2px] rounded-bl-[2px] lg:rounded-tr-[180px] lg:rounded-br-[180px]">
              <Image
                src={visual.photo}
                alt={visual.alt}
                fill
                priority
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
                style={{ objectPosition: visual.objectPosition }}
              />
            </div>
          </div>
        </div>

        <div className="lg:col-start-1 lg:row-start-2 lg:self-start">
          {extra.checklist.length > 0 && (
            <ul className="flex flex-col gap-3">
              {extra.checklist.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[1rem] text-ink lg:text-[1.05rem]">
                  <span aria-hidden className="mt-[0.1em] text-purple">
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" className="h-[1em] w-[1em]"><path d="M4 10.5l4 4 8-9" /></svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}

          <Link
            href={ctaHref}
            prefetch={false}
            className="mt-8 inline-flex h-[50px] items-center rounded-full bg-purple px-[35px] text-[0.875rem] font-medium tracking-[0.5px] text-white btn-motion hover:bg-purple-600"
          >
            {ctaLabel}
          </Link>
        </div>
      </Container>
    </section>
  );
}
