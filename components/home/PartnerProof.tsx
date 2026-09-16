import { Container } from "@/components/ui/Container";

/** Change Request 1 §6 — partner logo bar and Google review badge, built
 * now so the slots exist, filled when the chapter 8 deliverables arrive.
 *
 * Both are honest placeholders: no partner is named or implied (the tiles
 * are empty frames, not stand-in brands), and the review slot states no
 * rating, star count or review total, since none is verified yet. Each
 * placeholder says in plain German that the content follows, so nothing
 * here reads as a claim. */
const PARTNER_SLOTS = [1, 2, 3, 4, 5];

export function PartnerProof() {
  return (
    <section className="bg-paper" aria-labelledby="partner-heading">
      <Container className="py-12 lg:py-16">
        <div className="lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div className="lg:flex-1">
            <h2
              id="partner-heading"
              className="text-[0.78rem] uppercase tracking-[0.18em] text-muted"
            >
              Unsere Partner
            </h2>

            <ul className="mt-5 flex flex-wrap items-center gap-3 sm:gap-4">
              {PARTNER_SLOTS.map((slot) => (
                <li
                  key={slot}
                  className="flex h-[54px] w-[124px] items-center justify-center rounded-[6px] border border-dashed border-line bg-white text-[0.7rem] uppercase tracking-[0.12em] text-muted sm:w-[140px]"
                >
                  Logo folgt
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 lg:mt-0 lg:w-[290px] lg:shrink-0">
            <div className="flex h-full flex-col justify-center rounded-[10px] border border-dashed border-line bg-white px-6 py-5">
              <span className="text-[0.78rem] uppercase tracking-[0.18em] text-muted">
                Google Bewertungen
              </span>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">
                Das Bewertungs-Badge wird eingebunden, sobald das Google
                Business Profil verknüpft ist.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
