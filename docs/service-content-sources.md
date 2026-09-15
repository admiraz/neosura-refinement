# Service Content Sources — Phase 6A.2

Internal sourcing record for factual statements added to the 10 deep
service-detail pages. Only claims about legal obligation, thresholds, or
regulatory structure are logged here — general educational description of
what a coverage type is for (not tied to a specific figure or legal
requirement) is not treated as a claim needing citation.

Rule applied throughout: if a fact could not be directly confirmed on an
official Swiss source, it was either omitted or stated without the specific
number/threshold that couldn't be verified. No FINWIWO figures were used as
a substitute.

## Confirmed and used

### Grundversicherung is mandatory for Swiss residents
- **Source:** Bundesamt für Gesundheit (BAG) —
  https://www.bag.admin.ch/de/krankenversicherung-versicherungspflicht-fuer-in-der-schweiz-wohnhafte-versicherte
- **Fact used:** Everyone residing in Switzerland must take out basic health
  insurance within three months of establishing residence; every family
  member (adults and children) must be individually insured.
- **Used on:** `/privatkunden/gesundheit`

### 3-Säulen-System structure
- **Source:** Bundesamt für Sozialversicherungen (BSV) —
  https://www.bsv.admin.ch/de/bvg-3-saeule
- **Fact used:** The three-pillar structure (1. AHV/IV, 2. berufliche
  Vorsorge/BVG, 3. private Vorsorge 3a/3b) and BVG's capital-funding
  principle (Kapitaldeckungsverfahren — each generation builds its own
  assets, unlike AHV's pay-as-you-go model).
- **Explicitly NOT used:** the BVG entry threshold (Eintrittsschwelle)
  figure. Third-party sites converged on a specific CHF amount, but the
  official BSV page itself did not state one when fetched directly, so no
  number is quoted anywhere on the site — described only as "ab einem
  gesetzlich definierten Mindesteinkommen."
- **Used on:** `/privatkunden/vorsorge-vermoegen`, `/unternehmen/berufliche-vorsorge`

### UVG (accident insurance) — mandatory scope and NBU threshold
- **Source:** SUVA —
  https://www.suva.ch/de-ch/versicherung/unfallversicherung/unfallversicherung-uvg
- **Facts used:** All employees in Switzerland are mandatorily insured
  against occupational accidents and occupational diseases via their
  employer. Employees working at least 8 hours per week at the same
  employer are additionally covered against non-occupational accidents
  (NBU).
- **Used on:** `/unternehmen/gesundheit-unfall`

### Krankentaggeld (KTG) is not a federal legal obligation
- **Basis:** General, well-established Swiss employment-law knowledge (KTG
  has no federal mandatory-insurance statute equivalent to UVG; obligation
  can arise from a GAV or employment contract, not from federal law by
  default). No single official page was found stating this as a negative
  ("is not required"), so it is phrased carefully as commonly arranged by
  employers rather than as a blanket legal requirement.
- **Used on:** `/unternehmen/gesundheit-unfall`

### Motorfahrzeug-Haftpflichtversicherung is mandatory
- **Basis:** Swiss Strassenverkehrsgesetz (SVG), the statutory basis for
  mandatory motor vehicle liability insurance in Switzerland (strict
  liability / Kausalhaftung principle). The full statute text could not be
  fetched directly (fedlex.admin.ch requires JavaScript), but the
  mandatory-insurance status itself is uncontroversial, well-established
  Swiss law confirmed by convergent independent sources including a Swiss
  parliamentary Curia Vista record referencing the obligation
  (parlament.ch, Geschäft 20171070). No specific coverage limits, premium
  figures, or percentages are stated anywhere on the site for this topic.
- **Used on:** `/privatkunden/fahrzeug-reisen`

## Deliberately not sourced / not stated as regulated facts

These service areas are described only in general, conceptual terms (what
the coverage is for, not a specific legal threshold or figure), because no
directly-fetchable official confirmation was obtained for a specific claim:

- **Betriebshaftpflicht** — general liability-insurance concept only; no
  statutory obligation is claimed (there generally isn't one at federal
  level for most business liability).
- **Rechtsschutz** (legal protection insurance) — general concept only.
- **Cyber-Risiken** — general concept only; no statistics, incident counts,
  or cost figures are used anywhere.
- **Hausrat / Gebäudeversicherung** — building insurance is cantonally
  regulated (some cantons have monopoly Gebäudeversicherungen), which
  varies by canton; no single canton's rule is generalized to "Switzerland"
  anywhere on the site.
- **Inventar & Immobilien (business)** — general concept only.

## Explicit exclusions (per brief)

No page anywhere in this phase states: testimonials, client quotes,
response-time promises, savings percentages, statistics, awards, partner
counts, or ratings. None of FINWIWO's own stated figures (client counts,
review scores, franchise CHF amounts, tax-saving estimates) were used as a
source or reference point for any NEOSURA figure.
