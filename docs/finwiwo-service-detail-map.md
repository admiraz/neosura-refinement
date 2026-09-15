# FINWIWO Detail-Page Module Map

Audit of FINWIWO's live service-detail pages, done before building NEOSURA's
Phase 6A.2 deep service-detail system. Structural patterns only — no FINWIWO
text, statistics, ratings, or claims were copied; none appear below or in the
implementation.

Pages inspected live: `/krankenkasse/`, `/fahrzeuge/`, `/vorsorge/`,
`/vorsorge/pensionsplanung/`, `/vorsorge/vorsorgeanalyse/`,
`/versicherungsvergleich/`, `/unternehmen/`, and the Wohnen/Recht/Ferien page
(linked from the brief as `/impressum/`, which actually resolves to that
content, not a legal notice).

## Recurring modules (present on nearly every page)

1. **Hero** — headline, subheading, 3 benefit callouts with icons, primary
   CTA. Often carries social-proof stats (client counts, ratings) — **not
   reused**.
2. **Lead-capture form module** — multi-step inquiry form embedded directly
   below the hero. NEOSURA equivalent: the existing, real `/#dokumente`
   upload flow — no new form is built; every service CTA points there.
3. **Problem / pain-point section** — a rhetorical question, then a short,
   empathetic paragraph naming a common frustration. Medium density.
4. **Educational / regulatory explainer** — medium-to-long block clarifying
   how a system works (e.g. mandatory basic insurance, franchise levels,
   the 3-pillar system). This is where FINWIWO states facts; NEOSURA's
   version only states facts verified against official Swiss sources (see
   `docs/service-content-sources.md`).
5. **Deep-dive sub-topic sections** (2–4 per page) — each a substantial
   chapter: intro paragraph(s), bullet/checklist, sometimes its own photo
   and mini-CTA. This is the deepest, most page-specific content, and the
   part most under-built in NEOSURA's Phase 4 template.
6. **Comparison / table section** — used selectively, not universally:
   franchise-level table (health), coverage-type comparison (vehicle),
   generational/before-after comparison (pension planning), differentiation
   matrix (insurance overview, business). Only built for NEOSURA where a
   genuine, source-supported comparison exists.
7. **Process steps** — a 4-step visual workflow on FINWIWO
   (Formular → Beratung → Vergleich → Abschluss). NEOSURA's approved
   architecture stays 3-step (Analyse / Struktur / Begleitung); the step
   *descriptions* are adapted per service, per the brief.
8. **"Common mistakes" section** — appears on FINWIWO's Vorsorge pages
   specifically (a short list of planning errors). Not a universal module;
   used on NEOSURA only where genuine, non-fabricated content supports it.
9. **FAQ accordion** — 6–7 questions, concise answers, appears on every page
   inspected. Kept as a universal module.
10. **Newsletter signup** — appears on every page. **Not built** — NEOSURA
    has no newsletter capability; nothing invented to replace it.
11. **Brand/positioning statement + closing CTA** — short tagline immediately
    before the footer.
12. **Footer** — unchanged, out of scope for this phase.

## Business page (`/unternehmen/`) — additional structure

Chapters organized by risk category rather than generic benefit blocks:
Liability & Asset Protection (with three named sub-coverages), Employee
Protection (BVG/UVG/KTG explained together), Fleet & Transport, and a
standalone Cyber-Risk chapter — each medium-to-long density, each ending
implicitly in the shared process/FAQ/closing modules.

## What varies by service vs. what's shared

**Shared across all pages (the reusable grammar):** hero shape, 3-benefit
pattern, problem→answer rhythm, chapter layout (heading + paragraphs +
checklist + photo), process step count (4 on FINWIWO, 3 on NEOSURA), FAQ
accordion mechanics, closing CTA band.

**Varies per service (the unique content):** number and topic of deep-dive
chapters (2 on Fahrzeuge, 4 on Wohnen/Recht/Ferien, 4 on Unternehmen),
whether a comparison/table module is present at all, whether a "common
mistakes" module is present, chapter ordering, and obviously every word of
copy and every photo.

## NEOSURA equivalent module set implemented

`DeepServiceHero`, `ServiceValuePoints`, `ServiceProblem`,
`ServiceContentChapter`, `ServiceComparison` (optional per service),
`ServicePhotoChapter`, `ServiceAnalysis` ("Was wir analysieren" checklist),
`ServiceProcess` (3-step, adapted copy), `ServiceFaq`, `ServiceClosing`
(photographic, reusing the Phase 6A.1 grammar). Full component list and
per-service usage is in the Phase 6A.2 completion report.
