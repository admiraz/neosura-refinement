import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { ServiceVisual } from "@/content/de/serviceVisuals";

interface CategoryManifestoProps {
  photo: ServiceVisual;
  heading: ReactNode;
  body: string;
  ctaLabel: string;
  ctaHref: string;
}

/** FINWIWO's "photograph as architecture" manifesto grammar, adapted per
 * category: ~48-50vw photo flush to the viewport edge, editorial text in
 * the remaining column. The photograph itself is never tinted — only the
 * text carries the purple/teal emphasis (via `heading`'s own markup). */
export function CategoryManifesto({ photo, heading, body, ctaLabel, ctaHref }: CategoryManifestoProps) {
  return (
    <section className="overflow-hidden bg-white">
      <div className="lg:flex lg:items-stretch">
        <div className="relative h-[300px] w-full sm:h-[420px] lg:h-[560px] lg:w-[48vw]">
          <Image
            src={photo.photo}
            alt={photo.alt}
            fill
            loading="lazy"
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="rounded-[2px] object-cover"
            style={{ objectPosition: photo.objectPosition }}
          />
        </div>

        <div className="px-6 py-12 sm:px-8 lg:flex lg:w-[52vw] lg:items-center lg:px-16 lg:py-0">
          <div className="lg:max-w-[580px]">
            <p className="text-[1.9rem] font-normal leading-[1.28] tracking-[-0.01em] text-ink lg:text-[2.35rem]">
              {heading}
            </p>
            <p className="mt-6 text-[1.05rem] leading-[1.5] text-ink-soft lg:text-[1.1rem]">{body}</p>
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
