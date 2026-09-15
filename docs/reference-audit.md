# NEOSURA V2 — Reference Audit

> **Superseded for FINWIWO detail:** Section 1 below (FINWIWO structural/motion notes) was
> a first-pass, browser-less read of the FINWIWO homepage and was found to be too generic
> to implement from (e.g. "80–95vh", "500–900ms fade+translateY"). It has been replaced by
> **[`reference-audit-v2.md`](./reference-audit-v2.md)**, a much deeper audit driven against
> the live, rendered site (real computed styles, bounding boxes, timed transition sampling,
> full mega-menu content, homepage section map, service-page comparison matrix). Treat
> `reference-audit-v2.md` as authoritative for all FINWIWO structure/motion/interaction
> questions. **Section 2 below (NEOSURA content/tokens/assets) is still authoritative** —
> it was extracted directly from neosura.ch's own source and is not duplicated in v2.

Internal development reference only. No FINWIWO code, text, or imagery is copied — this
document reverse-engineers **design behavior** (layout, motion, rhythm) to rebuild it
cleanly with NEOSURA's own brand, content and assets.

Sources: live audit of `https://finwiwo.ch/` (desktop + a service subpage) and
`https://neosura.ch/` (full HTML + CSS were fetched directly, since the current NEOSURA
site is a static, unbuilt HTML/CSS/JS site — this let us extract exact copy, tokens and
asset filenames rather than guessing them).

---

## 1. FINWIWO — structural & motion reference

FINWIWO runs on WordPress (Salient theme + WPBakery + Slider Revolution + Flickity +
anime.js + jQuery waypoints). We are not reusing any of this — it only tells us which
*effects* to reproduce (waypoint-triggered reveals, a full-bleed rotating hero, hover-driven
mega menus) using our own GSAP/Tailwind implementation.

1. **Header behavior** — fixed header, logo left, primary nav center/left-of-CTA, search +
   CTA button right, hamburger on mobile. Transitions from a transparent hero-overlay state
   to a solid/blurred bar on scroll.
2. **Navigation layout** — 5 primary items (Steuern, Hypothek, Vorsorge, Vermögen,
   Versicherungen), each opening a mega menu on hover/focus.
3. **Mega-menu behavior** — multi-column panels (2–4 cols) grouping sub-links, short
   descriptive blurbs and sometimes a featured CTA card; opens on hover-intent with a short
   delay, closes fast on mouse-leave.
4. **Hero dimensions** — full-viewport-width, roughly 80–95vh, edge-to-edge background
   imagery/color per slide.
5. **Hero slider behavior** — Slider Revolution carousel, 5 rotating slides, each pairing a
   headline + short supporting copy + CTA; auto-rotates but is interruptible.
6. **Hero image transitions** — cross-fade/slide combined with subtle scale (Ken Burns-ish)
   on the background layer between slides.
7. **Text transitions** — headline/paragraph fade + upward translate on slide change,
   staggered word/line entrance.
8. **Button transitions** — simple color/background swap plus a small icon/arrow
   translate-on-hover; no large scale transforms.
9. **Previous/next controls** — minimal circular or text arrow controls at the hero edges,
   plus small numbered/label slide indicators.
10. **Section spacing** — generous vertical rhythm, roughly 96–160px between major sections
    on desktop, tightening on mobile.
11. **Maximum content widths** — content column caps around 1200–1300px, with hero and a
    few full-bleed image/carousel sections breaking out edge-to-edge.
12. **Typography scale** — large display headlines (~48–72px desktop), a mid-scale for
    section titles, small uppercase eyebrow/label text above headings.
13. **Image positioning** — photography is used generously in life-stage/testimonial
    sections, often bleeding to a container edge or cropped into a card.
14. **Full-bleed sections** — hero and the partner-logo strip run edge-to-edge; most
    content sections sit inside the max-width container.
15. **Card layouts** — consistent card pattern (icon/label, heading, short copy, link) reused
    for service and life-stage entries — enough repetition that NEOSURA should
    intentionally vary layout instead of reusing one card everywhere (see Section 06/07 of
    the build plan).
16. **Hover states** — cards lift very slightly with a soft shadow increase; links show an
    underline-slide or arrow-shift; no aggressive scale/rotate effects anywhere.
17. **Scroll-triggered animation** — waypoints.js fires opacity+translateY reveals as
    sections enter the viewport, staggered across siblings.
18. **Sticky behavior** — header is sticky; some longer content pages keep a summary/sidebar
    element sticky alongside scrolling copy.
19. **Section transitions** — flat color/background changes between sections, no heavy
    parallax or hijacked scrolling.
20. **Mobile navigation** — hamburger opens a full-screen/off-canvas menu; mega-menu
    collapses into accordion-style nested lists.
21. **Mobile hero** — carousel persists but copy is shortened, imagery re-cropped
    vertically, controls remain reachable via swipe.
22. **Responsive layout changes** — multi-column grids collapse to single column below
    ~960px; card grids reflow 4→2→1.
23. **Footer composition** — multi-column footer (service links, additional links, legal
    links) plus a closing tagline/CTA band.
24. **Service-page structure** (audited `/hypothek/`) — hero with value prop + trust badges
    → interactive form/comparison tool → problem/solution copy → structured
    product/offering cards → market-access comparison block → numbered process steps →
    comparison table vs. alternatives → FAQ accordion → newsletter → closing CTA band.
25. **FAQ behavior** — simple accordion, one open panel at a time, plus-to-cross icon
    rotation.
26. **Forms** — multi-step lead forms with clear field grouping; newsletter forms are
    single-line (first name / last name / email).
27. **Comparison sections** — tabular or 3-column comparison blocks contrasting
    "us vs. banks vs. platforms" style alternatives.
28. **Content reveal patterns** — consistent opacity+translateY on scroll, no scroll-jacking,
    no heavy parallax.
29. **Image masking/cropping behavior** — images are cropped into fixed-aspect containers
    (cards, hero panels) rather than shown at native ratios.
30. **Overall animation timing/easing** — short, snappy UI transitions (150–350ms, standard
    ease-out) for hover/menu states; slightly longer (500–900ms) eased entrances for
    scroll reveals and hero slide changes. Nothing overshoots or bounces.

**What we deliberately do NOT replicate:** WordPress/Salient/RevSlider internals, FINWIWO's
partner-logo wall, star-rating/review-count social proof, "20k+ subscribers" style stats,
comparison tables naming banks — NEOSURA has no equivalent substantiated claims, so none of
this is fabricated for the new site.

---

## 2. NEOSURA — content & brand source of truth

The current `neosura.ch` is a static single-page HTML/CSS/JS site (PHP host, PHP mail
handler at `/contact.php`). Full HTML and CSS were downloaded and read directly, so all
copy, section order, and design tokens below are taken verbatim/exact from source — nothing
guessed.

### 2.1 Design tokens (extracted from `style.css :root`)

```css
--purple:      #663399;   /* primary brand */
--purple-600:  #552b80;   /* primary hover/active */
--purple-100:  #efe8f6;
--teal:        #63DADE;   /* secondary/accent (Unternehmenskunden, trust) */
--teal-ink:    #1a8a8e;   /* accessible teal for text/icons */
--ink:         #1a1420;   /* near-black heading/body */
--ink-soft:    #3d3547;
--muted:       #8a8194;
--line:        #e8e2db;
--line-soft:   #efeae3;
--paper:       #f9f5ff;   /* app background */
--paper-2:     #f3efe8;
--white:       #ffffff;
--radius:      2px;
--radius-lg:   6px;
--shadow-card: 0 1px 0 rgba(26,20,32,.04), 0 24px 60px -24px rgba(26,20,32,.14);
```

Footer uses a dark purple gradient: `linear-gradient(135deg, #140D24 0%, #1D1235 100%)`.
Mobile full-screen menu background: `#14081f`.

Typeface: `'Arial Nova Light', 'Arial Nova', Arial, -apple-system, BlinkMacSystemFont,
sans-serif`, base weight 300. Footer headline uses italic Georgia/serif for one accent word
— NOT carried into V2 (system sans only, per "avoid generic" + keep it coherent).

These become the Tailwind theme tokens 1:1 (see `app/globals.css` / `tailwind.config`).

### 2.2 Asset inventory (downloaded to `.audit/images/` during audit, copied into
`public/images/` for the build)

- `logo.png`, `logo-white.png` — wordmark, color + white variants
- `bg-hero.webp` — hero background photograph
- `bear-sitting.webp` — Prinzipien section mascot (desktop, top-right)
- `bear-trust.webp` — Prinzipien section mascot (mobile, 4th card)
- `bear-pointing.png` — Leistungen/Services section mascot
- `service-mobile.webp`, `service-mobile2.webp` — mobile mascot crops for services columns
- `bear-approach-1/2/3.webp` — one mascot pose per Ansatz/Process step
- `dokumente.webp`, `dokumente-mobile.webp` — Dokumente/upload section mascot
- Favicons under `/favicon/` and `/favicon-white/` (light/dark scheme variants)
- `og-image.jpg` referenced in meta but not resolvable at audit time — regenerate for V2.
- `bear-footer.png` referenced in a commented-out `<img>` — asset not published live, so the
  footer bear stays commented-out/omitted in V2 as well (do not fabricate).

### 2.3 Existing IA (single page, anchor-link nav)

Header nav: Prinzipien · Über uns · Leistungen · Ansatz · Kontakt, CTA "Beratung anfragen".
Sections in order: Hero → Prinzipien (4 principles) → Über uns (About) → Leistungen (2-col
Privat/Unternehmen services with accordion items) → Ansatz (3-step process) → Dokumente
(2-tab upload form) → Footer (nav / Standort / Rechtliches columns + legal modals for
Datenschutz & Impressum).

### 2.4 Exact copy captured for reuse (see `content/de/*.ts` for the structured version)

- Hero: eyebrow "Versicherungsbroker in der Schweiz"; H1 "Dein digitaler
  Versicherungsbroker"; body "Massgeschneiderte Lösungen für Privatpersonen und
  Unternehmen" / "Einfach. Klar. Persönlich."; primary CTA "Kostenlose Analyse starten";
  secondary CTA "So funktioniert's".
- Principles heading "Vier Prinzipien, die Vertrauen schaffen." + 4 items (Unabhängig,
  Persönliche Beratung, Unterstützung im Schadenfall, Schweizer Marktverständnis) with full
  body copy, captured verbatim from HTML.
- About heading "Versicherungslösungen für Privat- und Unternehmenskunden" + full two-
  paragraph body copy.
- Services heading "Zwei Perspektiven. Eine klare Struktur." + Privatkunden (5 items:
  Gesundheit, Wohnen & Eigentum, Fahrzeug & Reisen, Vorsorge & Vermögen, Recht & Cyber) and
  Unternehmenskunden (5 items: Betriebshaftpflicht, Flottenversicherung, Berufliche
  Vorsorge, Inventar & Immobilien, Gesundheit & Unfall), each with lead paragraph + per-item
  body copy — all captured verbatim.
- Ansatz heading "So funktioniert's." + 3 steps (01 Analyse, 02 Struktur, 03 Begleitung)
  with full body copy.
- Dokumente heading "Ihre Unterlagen. Unsere strukturierte Analyse." + subtitle + trust
  line "SSL-verschlüsselt · Vertrauliche Behandlung Ihrer Daten" + two form variants
  (Privatkunden: Vorname/Nachname/E-Mail/Telefon/Dokumente/Nachricht; Unternehmenskunden:
  Firmenname/Ansprechpartner/E-Mail/Telefon/Dokumente/Nachricht). Upload accepts
  `.pdf,.jpg,.jpeg,.png`, stated max 10 MB. Submits via `POST` multipart to `contact.php`
  with a hidden `form_type` field (`privat` / `unternehmen`).
- Footer: brand headline "Massgeschneiderte Lösungen für Privatpersonen und Unternehmen",
  contact `info@neosura.ch` / `+41 44 500 12 34`, address "neosura, Gewerbestrasse 10, 6330
  Cham, Schweiz", nav column, legal column (Datenschutz/Impressum as modals — full legal
  text captured verbatim in `content/de/legal.ts`), copyright "© 2026 neosura. Alle Rechte
  vorbehalten."
- Impressum includes FINMA registration line: "Eingetragen im Handelsregister des Kantons
  Zürich · FINMA-Nr: CHE-330.617.129" and "Eidgenössische Finanzmarktaufsicht FINMA ·
  Registrierter Versicherungsbroker" — preserved verbatim, not editable content.
- JSON-LD `InsuranceAgency` structured data present on current site — carried into V2 SEO.

**No ratings, client counts, partner-institution counts, awards or performance stats exist
anywhere in the current NEOSURA source.** None are introduced in V2.

---

## 3. Implications for the V2 build

- Hero becomes a genuine multi-slide experience (current site has one static hero) built
  from the SAME verbatim copy blocks already present across the page (Hero copy itself,
  Privatkunden lead paragraph, Unternehmenskunden lead paragraph, "Unterstützung im
  Schadenfall" principle, "Vorsorge & Vermögen" service) — no new claims invented.
- Single-page anchor nav becomes real routed pages (`/privatkunden/...`,
  `/unternehmen/...`) per the requested IA, while the homepage keeps a condensed version of
  every section for continuity.
- Mega menu structure is generated from the same Privatkunden/Unternehmenskunden service
  lists already on the page — categories and sub-labels reuse exact existing wording
  (e.g. "Grund- und Zusatzversicherung", "Haushalt / Eigentum / Haftung" are drawn from the
  existing per-item body copy).
- Upload form fields, accept types and 10 MB limit are preserved exactly. Submission target
  is abstracted behind `lib/api/documents.ts` so the existing PHP endpoint can be kept
  (same field names/shape) if deployed alongside, without inventing a fake success state.
</content>
