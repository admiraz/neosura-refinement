import { kontaktContent } from "@/content/de/kontakt";

/** Phase 7W — simplified to H1/intro only. Its own former address/e-mail/
 * telefon block is superseded by the new two-column layout's
 * `ContactInfoPanel` (which also adds the map, the honest phone-
 * unverified annotation, and the booking-blocker note this phase
 * requires) — keeping the same contact details in two different
 * components on one page would be a real duplication, not a deliberate
 * layout choice. */
/* Phase 8I — the reference /kontakt/ H1 is 48/900 (30/900/34 on phones);
 * NEOSURA keeps its sentence case and left alignment, as on the approved
 * life-situation heroes, with 50px leading for a wrapped line. The lead
 * follows the same approved intro (16/300/24 in a 600px measure). The
 * previous pass set the H1 at 48/400 and the lead at 18.2/400. */
export function ContactHero() {
  return (
    <div>
      <h1 className="text-[1.875rem] font-black leading-[34px] tracking-normal text-ink lg:text-[3rem] lg:leading-[50px]">
        {kontaktContent.heading}
      </h1>
      <p className="mt-5 max-w-[600px] text-[1rem] font-light leading-[24px] text-ink">{kontaktContent.lead}</p>
    </div>
  );
}
