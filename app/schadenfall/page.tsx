import type { Metadata } from "next";
import Image from "next/image";
import { siteMeta } from "@/content/de/site";
import { pageMetadata } from "@/lib/seo";
import { clientGuideSchadenfall } from "@/content/de/clientGuide";
import { Container } from "@/components/ui/Container";
import { ClaimsSection } from "@/components/schadenfall/ClaimsSection";

export const metadata: Metadata = pageMetadata({
  path: "/schadenfall",
  title: `Schadenfall melden | ${siteMeta.name}`,
  description: "Schaden online melden: Wir übernehmen die Abwicklung mit der Versicherung und prüfen die Abrechnung für Sie.",
});

/** Phase 7T — full rebuild of `/schadenfall` as a real, functional claims-
 * reporting page, replacing the Phase 7M.0/7M.1 scaffold (a static
 * numbered list + generic `FinalCta`). Client-required structure:
 * calming Hero → real online claims form → "So geht es weiter" 3-step
 * block → emergency information box → Footer. NO standard final CTA —
 * the client explicitly excludes one on this page (the form itself is
 * the page's own action).
 *
 * REFERENCE — audited FINWIWO's own claims/contact/upload families and
 * this project's existing `DocumentsSection`/`app/api/documents/route.ts`.
 * No new design language was invented: `ClaimsSection` reuses the exact
 * same visual grammar (light surface, thin borders, drag-drop upload,
 * honest loading/success/error states) already established there — see
 * that component's own docstring.
 *
 * BACKEND — a genuinely new, dedicated endpoint
 * (`app/api/schadenfall/route.ts`), not a repurposed `/api/documents`
 * call: the claims field set (betroffene Versicherung/Police,
 * Schadendatum, Beschreibung) is materially different from the existing
 * Analyse intake fields, so a distinct route is more honest than
 * overloading one endpoint with two unrelated shapes. Uses the exact
 * same security posture as the proven `/api/documents` route: double
 * MIME+extension file validation, 10MB/file and 20MB-total caps, no
 * permanent file storage (memory-only for the request), header-
 * injection-safe field sanitization, and `ok: true` returned ONLY once
 * Resend confirms delivery — never a fake/optimistic success. A
 * server-enforced honeypot field (`webseite`) provides genuine spam
 * mitigation (documented in the route's own comments), not a decorative
 * client-only check.
 *
 * EXACT COPY — H1, intro, 3 "So geht es weiter" steps, and the
 * Notfallbox are all `clientGuideSchadenfall` (§4.17), verbatim,
 * unchanged since Phase 7M.1.
 *
 * BEAR — one small, restrained illustration next to the Hero intro (a
 * calming presence for an action/emergency-adjacent page) — explicitly
 * NOT placed inside the emergency box, per this phase's own instruction
 * not to trivialise an emergency/claims experience.
 *
 * NO CTA — `CategoryTopicCta` and the generic `FinalCta` band are both
 * absent from this page; it ends with the emergency box, then the
 * Footer. */
export default function SchadenfallPage() {
  return (
    <main className="flex-1 pt-12 sm:pt-[63px] lg:pt-[91px]">
      <section className="bg-paper-2">
        <Container className="py-14 lg:py-16">
          {/* Visual polish pass — hero, follow-up steps and the emergency box
              now share the one centred column the claims form already used,
              instead of three different alignment axes on the same page. */}
          <div className="mx-auto flex max-w-[820px] items-start gap-5">
            <span
              aria-hidden
              className="hidden h-[56px] w-[56px] shrink-0 items-center justify-center overflow-hidden rounded-full border border-line bg-white sm:flex"
            >
              <Image src="/images/bear-trust.webp" alt="" width={112} height={112} className="h-full w-full scale-[2.3] object-cover object-[52%_40%]" />
            </span>
            <div>
              <h1 className="max-w-[24ch] text-[1.9rem] font-black leading-[1.15] tracking-normal text-ink lg:text-[2.5rem] lg:leading-[1.125]">
                {clientGuideSchadenfall.h1}
              </h1>
              <p className="mt-5 max-w-[62ch] text-[1.05rem] leading-[1.55] text-ink-soft">{clientGuideSchadenfall.intro}</p>
            </div>
          </div>
        </Container>
      </section>

      <ClaimsSection />

      {/* Phase 8H — steps and emergency notice now share one white surface
          (the notice had its own lavender band, a third band in a row); step
          numbers use the reference "01." title scale, sentences 16/300/24. */}
      <section className="bg-white">
        <Container className="pb-8 pt-14 lg:pb-10 lg:pt-16">
          <div className="mx-auto max-w-[820px]">
          <h2 className="text-[1.6875rem] font-normal leading-[1.2] tracking-normal text-ink lg:text-[1.8rem] lg:leading-[34.56px]">So geht es weiter</h2>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
            {clientGuideSchadenfall.steps.map((step, i) => (
              <div key={step} className="border-t-2 border-purple pt-4">
                <span className="text-[1.3125rem] font-medium leading-[27px] tracking-[-0.23px] text-purple lg:text-[1.4375rem] lg:leading-[29px]">{String(i + 1).padStart(2, "0")}.</span>
                <p className="mt-2 text-[1rem] font-light leading-[24px] text-ink">{step}</p>
              </div>
            ))}
          </div>
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="pb-14 lg:pb-16">
          <div className="mx-auto max-w-[820px] rounded-[10px] border border-purple/20 bg-white px-6 py-6 sm:px-8">
            <p className="text-[0.78rem] font-medium uppercase tracking-[0.14em] text-purple">Im Notfall</p>
            <p className="mt-3 text-[1.02rem] leading-[1.6] text-ink">
              Bei Personenschäden zuerst{" "}
              <a href="tel:144" className="font-bold text-purple underline underline-offset-2">
                144
              </a>{" "}
              anrufen. Bei Einbruch die Polizei (
              <a href="tel:117" className="font-bold text-purple underline underline-offset-2">
                117
              </a>
              ) und erst danach den Schaden melden.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
