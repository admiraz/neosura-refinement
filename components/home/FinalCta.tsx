import Link from "next/link";
import { primaryCta } from "@/content/de/site";
import { footerContent } from "@/content/de/footer";
import { about } from "@/content/de/about";
import { Container } from "@/components/ui/Container";

/** FINWIWO-style closing band: NEOSURA purple carrying the section, one
 * thin teal structural rule, content composed across ~70% of the width
 * rather than headline-far-left/button-isolated-far-right. No mascot, no
 * icons, no gradient. */
export function FinalCta() {
  return (
    <section className="bg-purple">
      <Container className="py-16 text-center lg:py-[76px] lg:text-left">
        <div className="lg:flex lg:items-center lg:gap-16">
          <div className="lg:w-[65%]">
            <span className="block text-[0.78rem] uppercase tracking-[0.18em] text-white/60">
              Persönlich. Unabhängig. Klar.
            </span>
            <span aria-hidden className="mx-auto mt-4 block h-px w-14 bg-teal lg:mx-0" />
            <h2 className="mt-6 text-[1.9rem] font-normal leading-[1.2] text-white lg:text-[2.6rem]">
              {footerContent.brandBody}
            </h2>
            <p className="mx-auto mt-5 max-w-[54ch] text-[1.02rem] leading-relaxed text-white/80 lg:mx-0">
              {about.shortBody}
            </p>
          </div>

          <div className="mt-10 lg:mt-0 lg:w-[35%] lg:shrink-0 lg:text-right">
            <Link
              href={primaryCta.href}
              className="inline-flex h-[52px] items-center rounded-full bg-white px-9 text-[0.98rem] font-normal text-purple transition-colors hover:bg-paper"
            >
              {primaryCta.label}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
