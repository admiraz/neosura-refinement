"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface KrankenkasseWechselserviceProps {
  heading: string;
  intro: string;
  checklist: string[];
}

/** Phase 7F.6 — live-remeasured against https://finwiwo.ch/krankenkasse/'s
 * "Unser Wechselservice: damit Sie sich um nichts kümmern müssen" module.
 *
 * PROCESS RECONCILIATION (Sections 4-6 of this phase's brief): the
 * module immediately before this one on the live page, "So einfach
 * funktioniert's" (a generic 4-step brokerage journey: Formular
 * ausfüllen → Persönliche Beratung → Angebote vergleichen → Wechsel
 * durchführen), was independently re-audited at all 6 breakpoints and
 * then run through the required semantic-conflict test — and
 * INTENTIONALLY OMITTED, not rebuilt:
 *
 * - Step 1 ("Formular ausfüllen") describes filling out FINWIWO's own
 *   multi-field lead/quote form — functionality NEOSURA does not have
 *   (established in Phases 7F.1 and 7F.4: no Krankenkasse lead-calculator
 *   exists) — a pure lead-conversion (C) step with no NEOSURA equivalent.
 * - Step 2 ("Persönliche Beratung") and step 3 ("Angebote vergleichen")
 *   are generic broker-advisory framing (B) that duplicates the
 *   project's existing canonical global 5-step process (Analyse →
 *   Auswertung → Lösungsvorschlag → Umsetzung → Begleitung), just
 *   reworded for this page.
 * - Step 4 ("Wechsel durchführen") is the one genuinely Krankenkasse-
 *   specific, non-duplicative step (A) — but it is already fully and
 *   more precisely expressed by the client guide's own exact sentence,
 *   which is what THIS module renders.
 *
 * Net classification: **B — generic broker advisory journey**, not a
 * distinct Krankenkasse-specific operational journey. Per this phase's
 * own Section 6 ("omission is allowed... do not fill it with generic
 * marketing copy just to preserve section count"):
 *
 * **FINWIWO 4-STEP PROCESS OMITTED: GENERIC BROKERAGE JOURNEY CONFLICTS
 * WITH CLIENT'S CANONICAL 5-STEP ADVISORY PROCESS.**
 *
 * (Outcome A of Section 18: Zusatzversicherung → Wechselservice → FAQ.)
 *
 * WECHSELSERVICE MEASURED ARCHITECTURE: unlike every module since
 * Deadlines, this row is **not** part of the white-card
 * `scale_desktop_0-95` family — its own outer row is transparent, no
 * radius, `transform: none` (static, confirmed at every breakpoint).
 * FINWIWO's own structure is: H2 "Unser <em>Wechselservice</em>:" (swash
 * on the middle word only) + H3 "damit Sie sich um nichts kümmern
 * müssen" + H4 intro sentence, followed by a bordered white 15px-radius
 * card containing a 2-column comparison: 4 "pain point" items ("Das
 * kennen Sie vielleicht": Aufwändig / Zeitraubend / Fehlende Expertise /
 * Unbewusste Hindernisse) on the left, 4 "solution" items ("So machen
 * wir es Ihnen einfach": Komplette Übernahme / Fristgerecht / Lückenlos
 * / Transparent) on the right. Confirmed **zero `<img>` elements**
 * anywhere in the row, and confirmed static (no scroll-linked opacity/
 * transform change on any heading or item, independently sampled before/
 * after scrolling through the module — only the swash draws once).
 *
 * TRUTHFUL CONTENT REDUCTION — 2-column 4+4 pain/solution comparison →
 * one verbatim sentence + 3-item checklist: the client guide does not
 * support four distinct "pain point" claims (FINWIWO's own psychological-
 * hook copy, e.g. "Sie sind unsicher, ob ein Wechsel Nachteile bringt" —
 * not client-guide-sourced, not reproduced) nor its fourth solution item,
 * "Transparent: Sie sehen genau, wie viel Sie sparen" — an unquantified
 * savings claim of exactly the kind this project has consistently
 * declined to reproduce elsewhere (Grundversicherung's "mehrere hundert
 * Franken sparen", Franchise's "Faustregel"). The client guide's own
 * exact sentence — "Den Wechsel erledigen wir für Sie: Kündigung
 * fristgerecht, Anmeldung nahtlos, ohne Deckungslücke." — is used
 * verbatim as the intro, and its own three clauses become the three
 * checklist items, per this phase's own Section 11 guidance. This exact
 * sentence already appears as the second sentence of
 * `gesundheitDeep.grundversicherung.paragraphs[0]` earlier on this same
 * page; the repetition is deliberate (Section 8 explicitly requires the
 * verbatim sentence "where the module allows", not paraphrase) and
 * plays a different structural role here (the whole module's focus,
 * broken into a checklist) than there (one sentence inside a broader
 * Grundversicherung paragraph).
 *
 * HEADING: FINWIWO's own longer heading/subheading
 * ("...damit Sie sich um nichts kümmern müssen") is not reused, per this
 * phase's explicit instruction to avoid it unless client-authorized.
 * NEOSURA uses the bare noun "Wechselservice" — the same single-word,
 * fully-swashed heading pattern already used by
 * `KrankenkasseGrundversicherung`/`KrankenkasseZusatzversicherung`.
 *
 * CTA: FINWIWO's own module has **no CTA/link of any kind** (confirmed:
 * zero `<a>` elements in the row). Phase 7F.6 initially added a "Beratung
 * anfragen" → `/analyse` link here anyway, by analogy with every other
 * content module on this route — Phase 7F.6A corrected this: the client
 * guide places the standard CTA after the FAQ, not inside this module,
 * and FINWIWO's own fidelity is unambiguous (no CTA at all). The link
 * was removed; this module now renders zero interactive elements,
 * matching the live reference exactly.
 *
 * ANCHOR: FINWIWO's own row id (`fws_...`) is an auto-generated
 * WPBakery id, not a genuine human-readable anchor (unlike
 * `#grundversicherung`/`#zusatzversicherung`, which are real). Per this
 * phase's Section 13, no anchor is invented here — this module has none.
 *
 * BEAR: no natural slot. Confirmed via full HTML inspection (not just
 * absence of `<img>`) that the module's only SVG usage is the shared
 * swash mechanic plus the same repeated per-row checkmark-style icon
 * already used identically by every other checklist in this project
 * (not a distinct decorative slot) — inserting a bear into a repeated
 * per-row icon position isn't "one restrained illustration," and there
 * is no single secondary decorative image slot to place one in instead.
 * Deferred to the final CTA, per this phase's own explicit fallback
 * instruction. Still zero bears on this route.
 *
 * Built as a dedicated component — a much simpler single centered column
 * (heading + paragraph + checklist, no image, no CTA), modeled
 * structurally on the already-approved `KrankenkasseExplainer` centered
 * layout rather than reviving `ServiceContentChapter`/`CategoryAdvantages`. */
export function KrankenkasseWechselservice({ heading, intro, checklist }: KrankenkasseWechselserviceProps) {
  const [drawn, setDrawn] = useState(false);
  const emRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const isDrawn = drawn || reducedMotion;

  useEffect(() => {
    if (reducedMotion) return;
    const el = emRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <section className="bg-transparent">
      <Container className="py-[60px] lg:py-[76px]">
        <h2 className="mx-auto max-w-[26ch] text-center text-[1.6875rem] font-normal leading-[1.2] tracking-normal text-ink lg:text-[1.8rem]">
          <em ref={emRef} className="relative inline-block not-italic">
            {heading}
            <svg
              viewBox="0 0 300 30"
              preserveAspectRatio="none"
              aria-hidden
              className="pointer-events-none absolute inset-x-0 -bottom-[0.12em] h-[0.35em] w-full"
            >
              <path
                d="M5 15c25-10 60-16 135-17c25 0 90-1 155 8"
                stroke="var(--color-purple)"
                strokeWidth="6"
                fill="none"
                pathLength={1}
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: isDrawn ? 0 : 1,
                  opacity: isDrawn ? 1 : 0,
                  transition: reducedMotion ? "none" : "stroke-dashoffset 1.8s ease-out, opacity 0.3s ease-out",
                }}
              />
            </svg>
          </em>
        </h2>

        {/* Phase 8D — reference sub-line: 20/300/27/-0.2 in an 800px measure. */}
        <p className="mx-auto mt-6 max-w-[800px] text-center text-[1.1rem] font-light leading-[27px] tracking-[-0.2px] text-ink-soft lg:text-[1.25rem]">{intro}</p>

        <ul className="mx-auto mt-8 flex max-w-[420px] flex-col gap-3">
          {checklist.map((item) => (
            <li key={item} className="flex items-start gap-3 text-[1rem] font-light leading-[24px] text-ink">
              <svg viewBox="0 0 20 20" fill="none" aria-hidden className="mt-[3px] h-[18px] w-[18px] shrink-0 text-purple">
                <path d="M4 10.5l3.5 3.5L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
