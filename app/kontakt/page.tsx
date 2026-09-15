import type { Metadata } from "next";
import Image from "next/image";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfoPanel } from "@/components/contact/ContactInfoPanel";

export const metadata: Metadata = pageMetadata({
  path: "/kontakt",
  title: `Kontakt | neosura`,
  description: "Termin buchen oder Nachricht senden: vor Ort in Cham, per Video oder Telefon. Antwort innert eines Arbeitstages.",
});

/** Phase 7W — full rebuild of `/kontakt` onto the client's required
 * two-column structure: LEFT a real contact form, RIGHT address/map/
 * e-mail/phone/booking status. Replaces the prior build, which reused
 * the document-upload `DocumentsSection` (audience tabs, file upload) —
 * genuinely the wrong tool here; this page needs a simple message form,
 * not the Analyse intake flow.
 *
 * H1/INTRO — `kontaktContent`, exact §4.20 copy, VERBATIM, including the
 * full sentence (its middle clause about booking a Termin was previously
 * dropped when no booking mechanism existed — see that content file's
 * own docstring for why restoring it verbatim is correct now that the
 * booking gap is handled honestly below, not silently implied).
 *
 * FORM — `ContactForm`: Vorname/Nachname/E-Mail/Telefon(optional)/
 * Nachricht, mandatory privacy consent, real submission via the existing
 * `/api/documents` endpoint (`form_type: "privat"`) — the same proven
 * infrastructure `ServiceInquiry` already reuses for a compact, upload-
 * free contact form; no new backend needed since this page's field shape
 * genuinely matches that endpoint's existing contract.
 *
 * CONTACT DATA TRUTH — `ContactInfoPanel` (see its own docstring):
 * verified address/e-mail; phone shown WITH an explicit "not yet
 * verified" annotation (matching `/impressum`'s own still-unresolved
 * `[TELEFONNUMMER VERIFIZIERT]` placeholder — the same number cannot be
 * silently treated as confirmed here); a real Google Maps embed of the
 * actual registered address; an honest "not yet available" note instead
 * of a fake booking widget (LAUNCH BLOCKER — APPOINTMENT BOOKING
 * ACCOUNT/LINK REQUIRED); no invented social links; no invented
 * availability hours (neither is supplied anywhere in the project).
 *
 * NO DUPLICATE CTA — per this phase's own "don't duplicate the form with
 * an unnecessary final CTA" caution, no `CategoryTopicCta`/`FinalCta`
 * was added after the two-column section — a second "get in touch"
 * action right below a contact form would be genuinely repetitive.
 *
 * BEAR — one small, restrained instance near the intro. */
export default function KontaktPage() {
  return (
    <main className="flex-1 pt-12 sm:pt-[63px] lg:pt-[91px]">
      {/* Phase 8I — the two columns used to be `1fr auto` with the form
          capped at 720px, leaving a ~260px dead gap before a 340px details
          column at 1440. The form now fills its column beside a fixed
          380px details column (the reference also splits form and details
          across the full container). Order stays form-left / details-right
          per the client guide. Top spacing matches /analyse. */}
      <Container className="pb-16 pt-10 lg:pb-[100px] lg:pt-[72px]">
        <div className="flex items-start gap-5">
          <span
            aria-hidden
            className="hidden h-[52px] w-[52px] shrink-0 items-center justify-center overflow-hidden rounded-full border border-line bg-paper-2 sm:flex"
          >
            <Image src="/images/bear-trust.webp" alt="" width={104} height={104} className="h-full w-full scale-[2.3] object-cover object-[52%_40%]" />
          </span>
          <ContactHero />
        </div>

        <div className="mt-12 lg:grid lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start lg:gap-[96px]">
          <ContactForm />
          <div className="mt-12 lg:mt-0">
            <ContactInfoPanel />
          </div>
        </div>
      </Container>
    </main>
  );
}
