import type { Metadata } from "next";
import Link from "next/link";
import { primaryCta, siteMeta } from "@/content/de/site";
import { Container } from "@/components/ui/Container";

/** noindex, and deliberately no `alternates.canonical` — inheriting the
 * root layout's would wrongly point this 404 at the homepage. */
export const metadata: Metadata = {
  title: `Seite nicht gefunden | ${siteMeta.name}`,
  robots: { index: false, follow: true },
};

/** Minimal 404 using the existing visual system only — no new design
 * language, no Breadcrumb (there's no real parent trail for an unknown
 * route). */
export default function NotFound() {
  return (
    <main className="flex-1 pt-[68px] lg:pt-[88px]">
      <section className="bg-paper">
        <Container className="flex min-h-[60vh] flex-col items-start justify-center py-20">
          <span className="text-[1.1rem] font-normal text-muted">404</span>
          <h1 className="mt-4 text-[2.4rem] font-normal leading-[1.1] tracking-[-0.01em] text-ink lg:text-[3rem]">
            Diese Seite wurde nicht gefunden.
          </h1>
          <p className="mt-5 max-w-[52ch] text-[1.08rem] leading-[1.55] text-ink-soft lg:text-[1.14rem]">
            Die angeforderte Seite existiert nicht mehr oder wurde verschoben. Sie erreichen alle Bereiche der
            Website auch über die Navigation.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/"
              className="inline-flex h-[50px] items-center rounded-full bg-purple px-[35px] text-[0.875rem] font-medium tracking-[0.5px] text-white btn-motion hover:bg-purple-600"
            >
              Zur Startseite
            </Link>
            <Link
              href={primaryCta.href}
              className="inline-flex h-[50px] items-center rounded-full border-2 border-purple/75 px-[35px] text-[0.875rem] font-medium tracking-[0.5px] text-purple btn-motion hover:bg-purple hover:text-white"
            >
              {primaryCta.label}
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
