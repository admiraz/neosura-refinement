import { contact } from "@/content/de/site";

/** Phase 7W — the right-column contact-details panel. Address/e-mail are
 * verified, real data (`content/de/site.ts`). Phone is displayed but
 * explicitly flagged unverified: `content/de/legal.ts`'s own Impressum
 * still carries `[TELEFONNUMMER VERIFIZIERT]` as an unresolved
 * placeholder, so the same number shown here cannot be silently treated
 * as confirmed — per this phase's own explicit instruction. (`Footer`
 * and `ContactHero` elsewhere in the project still display this number
 * without that annotation; reconciling that sitewide is a broader change
 * out of this phase's own `/kontakt`-only scope, flagged in this page's
 * own documentation instead of silently fixed everywhere.)
 *
 * Map: a plain Google Maps embed of the real registered address — no
 * account, API key, or fabricated business profile involved, just the
 * public embed URL parametrized with the real address.
 *
 * Booking: no real appointment-booking account/link exists yet. Per this
 * phase's own explicit rule, NO fake Calendly/booking widget is embedded
 * — a plainly-labeled "not yet available" note stands in its place.
 * LAUNCH BLOCKER — APPOINTMENT BOOKING ACCOUNT/LINK REQUIRED.
 *
 * Socials/hours: neither is supplied anywhere in the project's content
 * sources. Per this phase's own "do not invent" rule, both are omitted
 * entirely rather than shown with invented values or dead placeholder
 * icons. */
export function ContactInfoPanel() {
  const mapQuery = encodeURIComponent(`${contact.address.street}, ${contact.address.zipCity} ${contact.address.country}`);

  return (
    <div className="flex flex-col gap-7">
      <div className="border-t border-line-soft pt-5">
        <span className="text-[0.78rem] tracking-[0.14em] text-muted">Adresse</span>
        <p className="mt-2 text-[1rem] leading-[24px] text-ink">
          {contact.address.company}
          <br />
          {contact.address.street}
          <br />
          {contact.address.zipCity}, {contact.address.country}
        </p>
      </div>

      <div className="overflow-hidden rounded-[10px] border border-line-soft">
        <iframe
          title={`Standort ${contact.address.company}, ${contact.address.street}, ${contact.address.zipCity}`}
          src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
          className="h-[240px] w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className="border-t border-line-soft pt-5">
        <span className="text-[0.78rem] tracking-[0.14em] text-muted">E-Mail</span>
        <p className="mt-2">
          <a href={`mailto:${contact.email}`} className="text-[1rem] leading-[24px] text-ink transition-colors hover:text-purple">
            {contact.email}
          </a>
        </p>
      </div>

      <div className="border-t border-line-soft pt-5">
        <span className="text-[0.78rem] tracking-[0.14em] text-muted">Telefon</span>
        <p className="mt-2">
          <a href={`tel:${contact.phoneHref}`} className="text-[1rem] leading-[24px] text-ink transition-colors hover:text-purple">
            {contact.phone}
          </a>
          <span className="ml-2 text-[0.78rem] text-muted">(Nummer noch nicht verifiziert)</span>
        </p>
      </div>

      <div className="border-t border-line-soft pt-5">
        <span className="text-[0.78rem] tracking-[0.14em] text-muted">Termin buchen</span>
        <p className="mt-2 text-[1rem] font-light leading-[24px] text-ink-soft">
          Die Online-Terminbuchung ist noch nicht verfügbar. Schreiben Sie uns über das Formular, um einen Termin vor
          Ort, per Video oder Telefon zu vereinbaren.
        </p>
      </div>
    </div>
  );
}
