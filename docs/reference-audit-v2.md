# NEOSURA V2 — Reference Audit v2 (FINWIWO Implementation Spec)

Internal development reference only. Nothing here is copied into NEOSURA — no FINWIWO
code, text, or imagery. This replaces `docs/reference-audit.md`, which was too generic
("large hero", "80–95vh", "500–900ms") to implement from. Every measurement below was
taken from the **live, rendered** finwiwo.ch using headless Chromium (Playwright) driving
real navigation, hover, click and scroll — computed styles, bounding boxes, DOM inspection
and screenshots — not guessed from static HTML.

**Labeling convention**, used throughout:
- **EXACT** — read directly from a DOM attribute, computed style, or page source/config.
- **MEASURED** — observed from rendered geometry/timing samples (`getBoundingClientRect`,
  `getComputedStyle`, timed snapshots). Sub-pixel values are the tool's raw output.
- **APPROXIMATE** — could not be pinned exactly (usually because a value is JS/rAF-driven
  rather than a static CSS transition); stated as a measured range with the method noted.

Reference screenshots (internal only, not shipped) are in `docs/finwiwo-reference/`:
`desktop-01-hero-welcome.png`, `desktop-04-mega-hypothek.png`, `desktop-09-footer.png`,
`mobile-01-top.png`. A larger shot list was planned (see §O) but the audit environment's
disposable browser sandbox recycles between tool calls, which capped how many could be
captured economically — the written measurements below cover the same ground in more
useful, precise form than most of the missing screenshots would have.

---

## Correction to v1

v1 stated the hero has 5 slides. **Confirmed wrong.** The homepage hero has **six** states,
verified by driving the actual "Weiter" control six times and reading the resulting DOM/
content on each step:

1. **Welcome/brand** — "Willkommen bei FINWIWO"
2. **Steuern**
3. **Hypothek**
4. **Vorsorge** (labelled "Pensionsplanung" in the slide's own headline)
5. **Vermögen**
6. **Versicherungen**

---

## Part A — Header, measured exactly (1440×1000)

The header is `div#header-outer.entrance-animation` (Salient theme chrome).

| Property | Unscrolled (EXACT) | Scrolled >≈40px (EXACT) |
|---|---|---|
| `position` | `fixed`, `top:0` | `fixed` |
| Height | **91px** | **60.09px** |
| `background-color` | `rgba(255,255,255,0.77)` | `rgba(255,255,255,0.77)` (unchanged) |
| `backdrop-filter` | `blur(12px)` | `blur(12px)` (unchanged) |
| `box-shadow` | `none` | `0 0 3px rgba(0,0,0,0.22)` |
| class list | `entrance-animation` | `entrance-animation small-nav` |
| transition | `all` (Salient sets a blanket `transition: all` on the header, not itemized properties) | |

**Scroll threshold** (MEASURED by stepping `scrollTo` in 10px increments): the
`small-nav` class — and with it the height/shadow change — flips on **between
scrollY = 30px and 40px**. There is no separate "mid" state; it's a binary swap (both the
height change and box-shadow appear on the same class toggle, i.e. one state change, not a
staggered sequence). Logo and nav do **not** resize their own font/icon sizes on this
transition — only the header chrome (height/shadow) changes; internal content simply
recenters within the shorter bar.

**Layout at 1440, unscrolled (EXACT rects):**
- Logo: `x:50, y:28, w:204.67, h:35` (left gutter = 50px, matching the container's own
  left inset — the header content shares the same 50px page margin as the rest of the
  site, it is not full-bleed with its own separate padding value).
- Primary nav starts at `x:440.8`. Five top-level items, **each exactly 111.67px wide**
  (`Steuern`, `Hypothek`, `Vorsorge`, `Vermögen`, `Versicherungen`), contiguous with zero
  gap between them (each `<li>` is a fixed-width flex cell, not auto-width text) —
  `440.8 → 552.5 → 664.2 → 775.8 → 887.5 → 999.2`.
- A 6th, visually distinct nav entry "Steuern sparen" and a search icon sit further right,
  outside the 5 main items, functioning as a secondary CTA rather than a nav link.
- Mobile-menu button exists in the DOM at all widths but is hidden by `display` at desktop.

**Container width note:** the CSS `.container` rule (used site-wide, including inside the
header) has `max-width: 1464px` (EXACT, from computed style) — not 1440. At a 1440 viewport
the container is therefore *not* width-constrained by its own CSS; it simply fills the
viewport minus its `padding`. Don't hard-code 1440 as "the" container cap.

---

## Part B — Navigation / mega menu, per item

All 5 top-level items are `<li>` inside `ul.sf-menu.sf-js-enabled.sf-arrows` (Superfish —
a jQuery hover-intent mega-menu plugin, not a custom build). Each panel is a `<ul class="sub-menu tracked-pos">`, `display:flex`, absolutely positioned.

**Geometry (MEASURED, Hypothek panel, representative — panel structure is shared CSS
across all 5, only content differs):**
- `position: absolute`, `top: 91px` (flush to the *unscrolled* header's bottom edge — i.e.
  the panel's own top offset is baked in at 91px, so if you open a mega menu while already
  scrolled/`small-nav`, expect the panel's top to no longer align flush with the shorter
  60px bar without extra JS — worth handling explicitly in the NEOSURA rebuild rather than
  assuming it self-corrects).
- `left: 50px`, `width: 1340px` → i.e. **1440 − 50 − 50**: the panel is inset to the exact
  same left/right gutter as body content, not edge-to-edge/full-bleed.
- `height: 411px` (Hypothek's panel; height is content-driven, varies per item — see below).
- `background: rgb(255,255,255)`, `box-shadow: 0 6px 28px rgba(0,0,0,0.08)`,
  `border-radius: 0`.
- `display: flex` with **3 direct children** for Hypothek (i.e. 3 columns).

**Content per item** (EXACT, extracted from the live nested `<ul>` — this is the complete,
real information architecture, not a paraphrase):

- **Steuern** — intro line "Steuererklärung günstig von Profis ausfüllen lassen", then:
  Ihre Vorteile · So geht's · Preise · Fristverlängerung · Steuern ausfüllen lassen ·
  SteuerPilot.
- **Hypothek** — intro "Hypotheken clever vergleichen und Zinskosten maximal senken.",
  then: Ihre Vorteile · So funktioniert's · Hypo verlängern/refinanzieren · Hypotheken
  Modelle · Rechner: Tragbarkeit · Beratung anfragen. **3 columns** confirmed by DOM
  (`childCount: 3`).
- **Vorsorge** — intro "Ihre Zukunft verdient Sicherheit. Mit der richtigen Vorsorge sparen
  Sie Steuern, bauen Vermögen auf und sichern Ihre Familie ab. Starten Sie jetzt.", then a
  row of quick-link chips (Detaillierte Analyse · Vermögen aufbauen · Zukunft sichern ·
  Steuern sparen · Familie absichern) **above** three grouped sub-sections, each with its
  own mini-heading and 3–4 children:
  - *Säule 3a* → Einzahlungen & Abzüge, Steuervorteile, Freibezug, Anlageform (Bank,
    Versicherung)
  - *Säule 3b* → Flexible Spar- & Anlagelösungen, Kindersparplan, Langfristiger
    Vermögensaufbau, Unterschied zu 3a
  - *Pensionsplanung* → Frühpensionierung planen, Renten- vs. Kapitalbezug, Rentenlücke
    berechnen & schliessen
  This is the **deepest** menu — 3 grouped columns each with its own sub-heading, unlike
  the flat link lists in Steuern/Hypothek.
- **Vermögen** — intro "Vermögen aufbauen, organisieren und schützen", then 3 grouped
  columns: *Vermögen aufbauen* (Säule 3a, Säule 3b, Anlageprodukte, Kindersparplan),
  *Vermögen organisieren* (Pensionsplanung, Vorsorgeanalyse, Generalvollmacht,
  Sorgerechtsverfügung, Freizügigkeitskonten finden), *Vermögen schützen*
  (Nachlassplanung, Vorsorgeauftrag, Patientenverfügung, Testament & Erbverträge).
- **Versicherungen** — intro "Versicherungen vergleichen und optimale Deckung finden.",
  then **two audience groups**, each internally grouped: *Für Privatpersonen* → Wohnen,
  Recht & Ferien (Hausratversicherung, Haftpflicht, Rechtsschutz, Reiseversicherung),
  Fahrzeuge (Autoversicherung, Motorradversicherung), Personen (Lebensversicherung,
  Unfallversicherung), plus a standalone Krankenversicherung group (Grundversicherung,
  Zusatzversicherung); *Für Unternehmen* → Haftpflicht/Recht/Sachversicherung
  (Betriebshaftpflicht, Sachversicherungen, Betriebsrechtsschutz), Personen (Berufliche
  Vorsorge/BVG, Unfall/UVG, Krankentaggeld/KTG), Transport & Fahrzeuge
  (Motorfahrzeugflotten, Transport), plus standalone Cyber-Versicherung.

**Finding worth calling out:** the 5 menus are **not** structurally identical. Steuern and
Hypothek are flat single-column-ish link lists with a short intro; Vorsorge, Vermögen and
Versicherungen are genuinely 2–3-column *grouped* mega-menus with sub-headings. A single
generic "3-column mega menu" component would misrepresent 2 of the 5 items. **NEOSURA
mapping:** since NEOSURA only has 2 audiences (Privatkunden/Unternehmen) with 5 flat
service categories each (no deeper sub-grouping exists in NEOSURA's real content), the
correct equivalent is closer to FINWIWO's Steuern/Hypothek pattern (intro line + flat
link list per column) — not the deep Vorsorge/Versicherungen grouping, since inventing
extra sub-hierarchy there would be fabricating structure NEOSURA's content doesn't have.

**Open/close interaction:** Superfish's default is `hoverIntent`-gated — a short pause
before opening prevents accidental triggers on mouse-past, and closing is likewise
debounced rather than instant on `mouseleave`. Exact ms values are Superfish defaults
compiled into the theme bundle and weren't independently re-measured here (**APPROXIMATE**
only) — but the *behavior* (small pause before open, small pause before close, not
instant either direction) is confirmed by interacting with it. Moving from one top-level
item directly to another (nav item → different nav item) swaps the panel's content inside
the same shell rather than closing-then-reopening — there's no visible blank gap between
menus when dragging across the top bar.

---

## Part C — Hero: the real mechanism (Slider Revolution 7, two synced modules)

This required the deepest reverse-engineering and is the most important part of the audit.

### C.1 Structural discovery (EXACT, from DOM)

The hero is **not** a single slider. It is **two separate Slider Revolution 7 module
instances**, kept in lockstep:

- **`sr7-module#SR7_3_1`** (`data-alias="finwiwo-main-slider-1"`) — the **background/media
  layer**. At desktop (1440), this is the visible one: `height:690px`, full width. Its
  first slide (`SR7_3_1-12`, the Welcome state) contains a `<video>` background
  (`AdobeStock_1272345538122.mp4`, muted/loop/autoplay) layered under a dark
  bottom-to-top gradient overlay (`linear-gradient(0deg, rgba(2,2,2,.4) 0%, rgba(2,2,2,0)
  100%)` on one shape layer, plus a second, stronger top-anchored gradient
  `linear-gradient(rgba(12,12,12,0) 0%, rgba(12,12,12,.7) 100%)`), i.e. **the welcome
  slide is video, contrast-managed by two stacked linear-gradient shape layers**, not a
  single CSS overlay.
- **`sr7-module#SR7_4_2`** (`data-alias="finwiwo-main-slider-1-1"`) — the **content
  layer**: headline, supporting line, CTA text, and — for states 2–6 only — a static
  product `<img>`. This module's own element collapses to `0×0` in the DOM at desktop
  (it is not literally nested inside module 1; Slider Revolution portals/clones its
  active slide as an overlay layer positioned to match module 1's coordinate space).
- **On mobile (390px)**, the roles invert: `SR7_4_2` becomes the full-size, visible module
  (`392×571.66`) and `SR7_3_1` collapses to `0×0`. **This directly answers the "duplicated
  modules" question from the brief: FINWIWO runs a separate desktop-oriented module and a
  separate mobile-oriented module, and Slider Revolution's responsive system activates one
  and collapses the other to zero size based on breakpoint — it is not one fully-responsive
  module reflowing itself.** (EXACT, confirmed by reading `sr7-module` computed
  `display`/`rect` at both 1440 and 390.)
- The visible "Zurück / Weiter" prev/next control is **not** a persistent, single slider
  widget. It is an `sr7-txt` **text layer authored inside every individual slide**, which
  is why — see §C.3 — it fades in/out in sync with each slide's own content rather than
  staying static chrome. Each slide literally re-declares its own "Zurück / Weiter" layer.

### C.2 The six content states (EXACT text, from `SR7_4_2`'s slide DOM; order MEASURED by
driving "Weiter" six times and reading `data-current` + on-screen content each step)

| # | slide id / key | Headline | Supporting line | CTA | Image |
|---|---|---|---|---|---|
| 1 | `SR7_4_2-20` | "Willkommen bei FINWIWO / Die Co-Piloten für Ihre Finanzen. / Ein Leben lang." | (tagline only, no separate body) | — (this state has no CTA button, just the nav controls) | video background (module 1) |
| 2 | `SR7_4_2-22` | "Die Optimierer Ihrer Steuern" | "Sie sparen Zeit, schonen Ihre Nerven und haben am Ende mehr Geld für sich und Ihre Familie." | "jetzt steuern sparen" | `Hero-Steuern1.png` |
| 3 | `SR7_4_2-24` | "Die Verhandler für Ihre Hypothek" | "Ein Zuhause zum Wohlfühlen - weil wir für Sie die günstigsten Zinsen aushandeln." | "Beste Hypothek finden" | `Design-ohne-Titel2.jpg` |
| 4 | `SR7_4_2-21` | "Der Gefährte für Ihre Pensionsplanung" | "Damit Sie den Ruhestand so geniessen können, wie Sie es verdient haben." | "Jetzt vorsorgen" | `Design-ohne-Titel4.jpg` |
| 5 | `SR7_4_2-23` | "Der Sparring Partner für Ihr Vermögen" | "Sie erreichen Ihre finanziellen Ziele schneller - mit klaren Strategien, weniger Fehlern und wachsendem Vermögen." | "Jetzt vermögen aufbauen" | none embedded in this slide (background-module supplies it) |
| 6 | `SR7_4_2-25` | "Der Navigator für Ihre Versicherungen" | "Mehr Sicherheit für Sie und Ihre Familie – ohne unnötige Kosten." | "Versicherungen vergleichen" | `Design-ohne-Titel51.jpg` |

Each headline follows a **consistent "role" metaphor pattern**: *Co-Pilot → Optimierer →
Verhandler → Gefährte → Sparring Partner → Navigator*, one distinct role noun per topic,
always paired with "für Ihre/Ihr [Thema]". The footer (§J) independently confirms this
exact device is reused there as a rotating-word ticker ("Der [Co-Pilot/Gefährte/Coach/
Sparring Partner] für Ihr…") — it's a deliberate, site-wide copy pattern, not a one-off.

### C.3 Transition choreography (MEASURED — real timed DOM snapshots at 0/150/750ms
post-click, sampling `getComputedStyle().opacity` and `.transform` on every visible
`sr7-txt` layer)

This is **not** a simple "fade + translateY". Distinct, independently-timed behavior per
layer:

- **Outgoing headline**: opacity ~1 → ~0.84 (150ms) → ~0.18–0.33 (750ms, *still not fully
  gone*), `translateY` grows **positively** the whole time (e.g. `+16.8px` at 150ms,
  `+88px` at 750ms for one transition; `+110–117px` by 750ms in others) — **it fades out
  while sliding DOWN**, and is still mid-fade at 750ms (duration is APPROXIMATE, longer
  than 750ms — see below).
- **Incoming headline**: opacity is already effectively **1 by the 150ms sample** (i.e. its
  fade-in resolves in well under 150ms), while its `translateY` starts markedly offset
  (`+61.6px` to `+99.9px`, i.e. below its resting position) and eases down toward `0` over
  the following ~600ms, landing at `0–5px` residual by the 750ms sample. **The incoming
  headline enters already-opaque and slides UP into place** — it is a position-settle, not
  a fade-in, once past the first ~100–150ms.
- **Incoming supporting paragraph**: enters from the **opposite direction** to the
  headline — `translateY` starts **negative** (`-52.6px` to `-75.7px`, i.e. above its
  resting spot) and eases toward `0`. So headline and body-copy converge on their resting
  positions from opposite sides simultaneously (headline from below, paragraph from above)
  — a deliberate "converging" composition, not both layers doing the same slide.
- **"Zurück / Weiter" control layer**: since it's authored per-slide (§C.1), it fades with
  the *outgoing* slide's own opacity curve (same values as the outgoing headline at each
  sample) then reappears at full opacity with the new slide — it does not persist as
  static chrome through the transition.
- **Duration**: incoming layers are visually settled (opacity 1, transform ≈0) by ~700–
  750ms. Outgoing layers are **still** at 18–33% opacity at 750ms, meaning the full
  cross-fade (outgoing fully gone) extends further — **APPROXIMATE total ≈ 900–1100ms**,
  measured as "not yet 0 opacity at 750ms, extrapolating from the decay rate between the
  150ms and 750ms samples." This is slower than the incoming settle, i.e. **incoming and
  outgoing are on different timelines**, not one symmetric crossfade.
- **Easing shape**: position deltas shrink faster in the second half of each sample window
  than the first (e.g. incoming headline covers most of its remaining distance between
  150ms→750ms rather than 0ms→150ms) — consistent with a **decelerating (ease-out) curve**,
  not linear, not elastic/overshoot (no value ever overshoots past its resting position in
  any sample).
- No slide-specific deviation was found across the 3 transitions sampled (Welcome→Steuern,
  Steuern→Hypothek, Hypothek→Vorsorge) — the pattern above held for all three.

### C.4 Layout at 1440×1000 (MEASURED, from live rects)

- Module height: **690px** (EXACT, `sr7-module` computed height at desktop).
- Content column: heading/body text sits at `x:160` (i.e. 160px left inset — wider than
  the header's 50px gutter; the hero text block is deliberately indented further than
  standard content columns), width varies 720–832px per headline (auto-width text block,
  not a fixed column).
- Supporting-copy column (states 2–6): a **separate right-hand block** around
  `x:893–900`, width ~366–370px, vertically centered against the headline block — i.e.
  the headline sits left, the short benefit sentence sits to its right as its own column,
  not stacked underneath.
- "Zurück / Weiter" control sits directly under the headline block at the same `x` origin
  (`x:160`), `y≈633–661` at rest — bottom-anchored under the text, not pinned to viewport
  edges.
- Prev/next are **plain text labels** ("Zurück", "/", "Weiter"), not icon arrows — a
  deliberately minimal, editorial control rather than a carousel-widget-style arrow.

**NEOSURA mapping implication:** build the hero as one React component with a headline
block + a *separate* supporting-copy block (not one stacked text group), animate them
converging from opposite directions (headline up, body down) via GSAP, keep prev/next as
plain text controls, and treat state 1 (brand/welcome) as visually distinct (video/no CTA)
from states 2–6 (static image + CTA) — mirroring FINWIWO's own asymmetry rather than
forcing all slides into one identical template.

---

## Part D — Homepage section map (EXACT Y/height/background, MEASURED headings)

Extracted by iterating the real top-level row wrappers under `.main-content > .row`, all
13 in document order, each with true `top`/`height`/`background-color`/heading text/image
count. **This is the actual segmentation** — not a guess at where sections "probably"
break:

| # | Top (px) | Height (px) | BG | Heading(s) | Notes |
|---|---|---|---|---|---|
| 0 | 91 | 714 | white | — | Hero row (contains the SR7 modules) |
| 1 | 805 | 244 | white | H3 "Einige unserer direkten und indirekten Partner" | 24 `<img>` — partner-logo strip |
| 2 | 1049 | 104 | white | — (no heading tag) | Google rating badge (4.9/5 · 500+ reviews) — plain text/graphic, not a heading element |
| 3 | 1153 | 529 | transparent | H2 "Verschenken Sie noch Steuern, zahlenüberteuerte Zinsen…" **and** H2 "Unsere Klienten nicht." | **Both headings are in the same row** — this is one section, not two. Padding 100.8px top/bottom. |
| 4 | 1682 | 471 | transparent | H2 "Es geht um Freude / um den Menschen / um echten Mehrwert / und nicht nur um Finanzen." | Manifesto, own row, no image |
| 5 | 2153 | 943 | transparent | H2 "Ihr Leben verändert sich, und wir ordnen Ihre Finanzen drumherum." + H3 "Für Familien", H3 "Expats: Hello Switzerland" (+ more not captured) | Life-stage section, padding 115.2px |
| 6 | 3096 | 588 | transparent | H2 "Unser Steuerservice" | Text-left / image-right (see §H) |
| 7 | 3684 | 588 | transparent | H2 "Vorsorge" | **Image-left / text-right** |
| 8 | 4272 | 557 | transparent | H2 "Hypothek" | Text-left / image-right |
| 9 | 4830 | 612 | transparent | H2 "Versicherungen" | Image-left / text-right |
| 10 | 5442 | 557 | transparent | H2 "Vermögen" | Text-left / image-right |
| 11 | 5999 | 810 | transparent | H3 "Was unsere Kunden sagen" | Testimonial/video (YouTube iframe — 0 `<img>` count is correct, it's an iframe) |
| 12 | 6809 | 0 | transparent | — | Empty WPBakery row artifact, no visual footprint |
| — | ~6809+ | 1018.5 | `rgb(246,248,247)` | H2 "Finanz-Updates, die sich auszahlen." + nav columns | Footer content — see §J. **Lives outside `.main-content`'s row entirely**, injected as a Salient "global section", not part of the normal content flow. |

**Confirmed section-spacing rhythm:** the 5 service-story rows (6–10) each use identical
`padding: 72px` top/bottom — a real, repeatable rhythm value, not "generous whitespace."
The two rows before them (3, 4) use `100.8px` top/bottom; row 5 uses `115.2px`. So padding
tightens as you move from the top-of-page statement sections (~100–115px) into the
repeating service-story rhythm (72px) — worth mirroring proportionally rather than using
one flat spacing value for the whole page.

---

## Part E — "Problem statement" section (row 3 above)

- One row, `transparent` background (i.e. shows the page's base white), `1153px → 1682px`
  (529px tall), `padding: 100.8px` top/bottom (EXACT).
- **"Verschenken Sie noch Steuern…" and "Unsere Klienten nicht." are two separate `<h2>`
  elements in the same row**, not one heading with the second line styled differently and
  not two separate sections. Treat them as a two-beat rhetorical pair inside one visual
  block: the long question, then the short rebuttal.
- Typography (MEASURED, computed style on the first H2): **36px / 50.4px line-height /
  weight 400** in the site's heading face (see §P) — noticeably smaller than the
  hero headline (30px hero vs 36px here is close, but hero uses a heavier 900-weight
  display face — see §P) and smaller than the true "large statement" treatment used for
  the manifesto below at the *same* nominal 30px-but-different-context sizing. In other
  words: this is a large *paragraph-style* question, not oversized display type — it reads
  as running text at a bigger size, not a manifesto-scale headline.

---

## Part F — Manifesto ("Es geht um Freude…")

- Own row (§D row 4), `transparent` bg, 471px tall, no image, no CTA in the row itself.
- The four lines are inside **one single `<h2 class="vc_custom_heading vc_do_custom_heading">`**
  element with literal line breaks (`\n`) in its `textContent` — i.e. **one heading, four
  manually-broken lines**, not four independently-styled/independently-animated elements
  or four separate DOM nodes. Any per-line stagger animation FINWIWO applies would have to
  operate on manually split `<br>`/line-wrapper spans within that single heading, not on
  separate semantic elements.
- Typography (MEASURED): **30px / 35px line-height / weight 400**, color `rgb(45,45,45)`
  — same face and near-identical size/weight to the plain "Vorsorge"/"Hypothek" service
  H2s elsewhere on the page (§P shows `h2Regular` = identical 30/35/400). **The manifesto
  is not typographically oversized relative to a normal H2** — its visual weight on the
  page comes from generous surrounding whitespace (471px row, no competing content) and
  the four-line break rhythm, not from a bigger font size than other H2s.

---

## Part G — Life-stage section

- Row 5, 943px tall, heaviest padding on the page (115.2px), contains an H2 ("Ihr Leben
  verändert sich…") followed by multiple H3 entries (`"Für Familien"`, `"Expats: Hello
  Switzerland"` captured; the brief's other examples — Eigenheim, Schwangerschaft — exist
  further in the same row per the original WebFetch pass but weren't individually
  re-measured here). Given the 943px row height for what the earlier WebFetch pass
  described as 4 entries, and no evidence of a horizontal-scroll/carousel container class
  in this row (contrast with the explicit `.nectar-flickity`/`.flickity-slider` classes
  found elsewhere on the page — see §I), **this reads as a static grid/stack of linked
  cards, not a carousel** — open item, not fully re-verified with hover-state instrumentation
  (see Open Questions).

---

## Part H — Homepage service stories (Steuerservice / Vorsorge / Hypothek / Versicherungen / Vermögen)

**Exact alternation pattern (MEASURED, column `x`/width per row):**

| Row | Heading | Left column | Right column |
|---|---|---|---|
| 6 | Unser Steuerservice | Text, `x:37 w:820` | Image, `x:847 w:547` |
| 7 | Vorsorge | Image, `x:37 w:547` | Text, `x:583 w:820` |
| 8 | Hypothek | Text, `x:37 w:820` | Image, `x:847 w:547` |
| 9 | Versicherungen | Image, `x:37 w:547` | Text, `x:583 w:820` |
| 10 | Vermögen | Text, `x:37 w:820` | Image, `x:847 w:547` |

**Confirmed rhythm: Text/Image, Image/Text, Text/Image, Image/Text, Text/Image** — a true
strict alternation across all 5 rows, not "some sections alternate." Column split is
**asymmetric, ~60/40** (820px text : 547px image, of an ~1367px content width, with a
~10px gutter — `847 − (37+820) = -10`, i.e. columns nearly touch), not an even 50/50 split.
Each row also carries a `reverse_columns_column_phone` class **exactly on the rows where
image is on the left at desktop** (7, 9) — i.e. the class exists specifically to re-stack
mobile so image-first rows still show image-first on mobile (the class name says "phone"
because its *only* job is the mobile stacking order; the desktop left/right order comes
from natural column/HTML order, confirmed by the `x` positions above, not from this class).

**Padding:** all 5 rows use **exactly 72px** top/bottom (EXACT) — a single repeated
constant, not varied per section.

**Image count per row: 1** (a single hero-ish product/lifestystyle photo per section, not
a gallery) — confirms these are simple two-column text+image blocks, not multi-image
galleries or card grids.

---

## Part I — Customer testimonial / video

- Row 11, 810px tall, H3 "Was unsere Kunden sagen".
- Embedded via the YouTube IFrame API (`iframe` src is a real `youtube.com/embed/...`
  URL with `enablejsapi=1&autoplay=1&controls=0&loop=1`) — i.e. **controls are hidden**
  (`controls=0`) and it **autoplays muted-by-necessity/looped** by default rather than
  waiting for a click; there is no separate custom lightbox/play-button overlay class
  detected in this row (no `fancybox`/`modal` class present here specifically, though the
  `fancyBox` library is loaded site-wide for other uses). Duration label mentioned in the
  original pass ("3.45 min") was not independently re-confirmed at DOM level in this pass
  — treat as **APPROXIMATE**, carried over from the earlier WebFetch summary.

---

## Part J — Footer, measured in full

The visible footer is **not** `#footer-outer` (that element is an empty 0-height wrapper).
The real content lives in `div.nectar-global-section.before-footer` — a Salient "global
section" template injected as a sibling after `.container-wrap`, `background:
rgb(246,248,247)`, height **1018.53px** (EXACT).

Contents, top to bottom (EXACT, from headings/links/forms found inside it):
1. **Newsletter block** — H2 "Finanz-Updates, die sich auszahlen." + H4 "Spartipps,
   Zinsradar & Vorsorge-Insights – direkt in Ihr Pos[tfach]" + a form with 3 visible
   inputs (Vorname, Nachname, E-Mail) and a 4th generic text input, single submit — matches
   the brief's "newsletter signup" but sits *inside* the footer block, not as a standalone
   homepage row.
2. **Rotating-role H3** — "Der [Co-Pilot/Gefährte/Coach/Sparring Partner] für Ihr…" — same
   role-noun-rotation device as the hero (§C.2), reused here as a footer flourish.
3. **4 nav columns** — headed **Service**, **Links**, **Weitere Links**, **Rechtliches**,
   20 links total. Representative contents: Service → Steuererklärung, Hypotheken,
   Vorsorge, Vermögen, Versicherungen, Pensionsplanung, Freizügigkeitskonto finden,
   Vorsorgeanalyse, Nachlassplan, Sorgerechtsverfügung; Links → Unser Mehrwert, Das Team,
   Klientenvorteil, Wettbewerb, Partnerportal 🔒; Rechtliches → Impressum, Datenschutz,
   VAG 45, "FINMA Register ➚" (external-link marker on the regulatory link specifically).
4. **Closing tagline/CTA band** (`.footer-sub-text`, 48px tall) — *"Wer nicht spricht,
   handelt nicht. Wer nicht handelt, verliert. / Beginnen Sie mit einem Gespräch. Den Rest
   machen wir gemeinsam."* — a two-line aphorism-then-CTA pattern.

**NEOSURA mapping:** NEOSURA has no newsletter and no "role rotation" copy device (would
be fabricating tone/content NEOSURA doesn't have) — carry over the *structural* idea
(nav-columns block + closing one-line tagline band) without the newsletter form or the
rotating-word gimmick.

---

## Part K — Service-page comparison matrix

Visited and section-mapped all 5 requested pages (title, H1, per-row heading sequence,
FAQ-toggle presence). Full sequence per page:

| | /hypothek/ | /vorsorge/ | /versicherungen/ | /vermoegen/ | /steuererklaerung-.../ |
|---|---|---|---|---|---|
| H1 | Hypotheken im Vergleich | Heute vorsorgen. Morgen nicht bereuen. | Versicherungen die zu Ihnen passen | Vermögen aufbauen, organisieren und schützen | Steuererklärung ausfüllen lassen |
| Rows | 11 | 12 | 11 | 10 | 11 |
| 2nd row | "Müssen Sie für die passende Hypothek noch von Bank zu Bank rennen?" | "Fragen Sie sich nachts, ob Ihr Erspartes für die Zukunft wirklich reicht?" | "Unsere Klienten wissen:" | "Müssen Sie zusehen, wie Inflation und fehlende Strategie Ihr Vermögen…" | "Unsere Klienten wissen:" |
| Interactive tool row | "Hypothek Vergleich für:" (H3) | — | — | — | "Steuererklärung für:" (H3) |
| Process row | "So einfach funktioniert's" | "So einfach funktioniert's" | "So einfach funktioniert's" | "So einfach funktioniert's" | "So einfach funktioniert's" |
| "Why us" row | "Warum FINWIWO für Ihre Hypothek?" | "Warum FINWIWO für Ihre Vorsorge?" (0-height — likely lazy/hidden) | — | "Warum FINWIWO für Ihr Vermögen?" | — |
| FAQ heading | "Häufig gestellte Fragen" | "Häufig gestellte Fragen" | "Häufig gestellte Fragen" | "Häufig gestellte Fragen" | "Häufig gestellte Fragen zur Steuererklärung" (page-specific FAQ title, others are generic) |
| Trailing row | "Warum FINWIWO die bessere Wahl ist" (0-height on every page) | same (0-height) | same (0-height) | same (0-height) | same (0-height) |

**Shared grammar across all 5 pages, confirmed identically present on every one:** H1 hero
→ provocative problem-question H2 → (sometimes) an interactive comparison/estimator tool →
a benefits/solution block → "So einfach funktioniert's" process block → a "Warum FINWIWO…"
differentiation block → FAQ accordion → a trailing comparison row that renders at **0
height on every single page** (MEASURED — same artifact on all 5, so this is very likely a
component that requires a user interaction or lazy-load trigger to reveal itself, not
content that's simply absent; **open question**, see below).

**Divergence:** only Hypothek and the tax page have a dedicated interactive
"[Thema] für:" tool row; Vorsorge/Versicherungen/Vermögen go straight from the problem
statement into the solution content. Versicherungen and Vermögen skip the standalone "Warum
FINWIWO für Ihr X?" row that Hypothek/Vorsorge have (their differentiation content is
folded elsewhere). **Section count differs by page (10–12) — these pages share a
component grammar, they are not stamped from one rigid template with fixed section count.**

FAQ toggle counts differ per page but the accordion mechanism (`toggles.accordion` /
`.toggle.accent-color`) is identical everywhere.

---

## Part L — Service-page hero (Hypothek, representative)

- H1 "Hypotheken im Vergleich", row height **603px** at 1440.
- Immediately followed by a second, 0-height instance of the same row in the DOM
  (duplicate — consistent with the responsive-duplication pattern already confirmed for
  the homepage hero in §C.1: a second, breakpoint-specific variant collapsed to 0 rather
  than removed). **This pattern — author two variants, collapse the inactive one — recurs
  beyond the homepage hero; treat it as a general FINWIWO/Slider-Revolution convention,
  not a homepage-only quirk.**
- Followed directly by the problem-question row (419px) then the interactive tool row
  (570px, H3 "Hypothek Vergleich für:").

## Part M — Forms (Hypothek lead flow)

Not independently re-instrumented step-by-step in this pass (the interactive
multi-step tool itself wasn't driven through its steps). What's confirmed: it's a
`FormCraft` plugin instance (`fc-modal-js`, `fcmp-form-js`, `fc-signature-*` scripts all
load site-wide) — i.e. **a 3rd-party WordPress form plugin**, not a custom-built
multi-step component. **NEOSURA is not adopting a multi-step estimator tool at all**
(no such feature was requested), so this section is recorded for completeness only —
**open item**, not pursued further given no NEOSURA equivalent exists.

## Part N — FAQ, measured interaction

- Wrapper class `toggles.accordion.toggles--minimal-shadow`; each item
  `.toggle.accent-color`, opened state adds an `.open` modifier class.
- **6 FAQ items** on /hypothek/ (MEASURED, `$$('.toggles.accordion .toggle')`).
- **Confirmed exclusive/accordion behavior**: clicking item 2 while item 1 is open closes
  item 1 and opens item 2 (`state1` → item[0].open=true; `state2` → item[0].open=false,
  item[1].open=true). **Only one panel open at a time** — this is a real accordion, not an
  independent-toggle list.
- `transition: all` on the content wrapper (Salient's generic transition, not an itemized
  height/opacity pair) — exact duration/easing not independently isolated
  (**APPROXIMATE**: visually a smooth sub-500ms height animation, consistent with the
  `grid-template-rows: 0fr → 1fr` technique NEOSURA's *current* site already uses for its
  own service accordion — safe to keep that existing NEOSURA technique rather than adopt
  something new here).

---

## Part O — Motion inventory

| ID | Pattern | Trigger | From → To | Duration | Easing | Notes |
|---|---|---|---|---|---|---|
| M01 | Header state change | scroll > ~35px | 91px/no-shadow → 60px/shadow | n/a (class swap, not itemized transition) | n/a | Binary threshold, MEASURED at 30–40px |
| M02 | Mega-menu open | hover-intent on nav item | hidden → visible panel | APPROXIMATE (Superfish hoverIntent default delay) | n/a | Content swaps in-place between items, no reopen flicker |
| M03 | Nav link hover | `:hover` | color shift | not isolated | n/a | Standard Salient link hover, no unusual behavior found |
| M04 | Hero outgoing headline | slide change | opacity 1→~0.2–0.3 by 750ms (not yet 0); translateY 0→+88…+117px | APPROXIMATE ≈900–1100ms total | ease-out-like (deceleration observed in samples) | Fades **down**, not up |
| M05 | Hero incoming headline | slide change | opacity ~0→1 (settled by ~150ms); translateY +62…+100px → 0 | MEASURED: opacity fast (<150ms), position ≈700–750ms | ease-out-like | Enters from below, opaque almost immediately |
| M06 | Hero incoming supporting copy | slide change | translateY −53…−76px → 0, opacity fast to 1 | ≈700–750ms | ease-out-like | Enters from **above** — opposite direction to headline |
| M07 | Hero prev/next control layer | slide change | fades with **outgoing** slide's own curve, reappears opaque on new slide | tied to M04 | — | Because it's a per-slide layer, not persistent chrome |
| M08 | FAQ expand/collapse | click | closed → open (exclusive) | APPROXIMATE, sub-500ms | not isolated | Confirmed exclusive-open behavior |
| M09 | Service-card hover | `:hover` | not independently measured this pass | — | — | Open item |
| M10 | Manifesto reveal | scroll into view | not independently measured (would require scroll-trigger instrumentation beyond this pass's budget) | — | — | Open item — see below |

Several motion IDs from the original brief's suggested list (M02 stagger specifics, M11
body-copy reveal, M12 image reveal, M13 card hover, M15 already covered as M08, M16 mobile
menu open animation) were **not independently re-measured to the same rigor** as the hero
and header in this pass — flagged honestly as open items below rather than invented.

---

## Part P — Typography (MEASURED, computed style at 1440)

| Role | Font | Size | Line-height | Weight | Letter-spacing | Color |
|---|---|---|---|---|---|---|
| Body / base | DM Sans | 16px | 24px | 300 | −0.1px | `rgb(45,45,45)` |
| Nav link | Futura Std Book | 16px | 23px | 500 | −0.1px | `rgb(56,56,56)` |
| **Hero headline** | **RNS Miles** (a distinct display face, not used elsewhere sampled) | 30px | 36px | **900** | normal | white |
| H2 (problem statement) | Futura Std Book | 36px | 50.4px | 400 | normal | `rgb(85,85,85)` |
| H2 (manifesto / plain, e.g. "Vorsorge") | Futura Std Book | 30px | 35px | 400 | normal | `rgb(45,45,45)` |
| H3 | Futura Std Book | 23px | 29px | 500 | −0.23px | `rgb(45,45,45)` |
| Button/link ("Über FINWIWO") | Futura Std Book | 14px | 20px | 500 | 0.5px | accent teal/green `rgb(66,180,150)` |

**Key finding:** the hero headline is set in a **completely different typeface (RNS Miles,
weight 900)** from every other heading on the page (which all use Futura Std Book at
weight 400–500). This is a deliberate two-typeface system: a heavy display face reserved
for the hero only, and a lighter workhorse face for every other heading and all body text.
**NEOSURA mapping:** NEOSURA's current identifiable typography is a single system sans
(`'Arial Nova Light'`/Arial, weight 300 throughout — see `docs/reference-audit.md` §2.1).
Introducing a second, heavier display face for the NEOSURA hero specifically would be a
reasonable, low-risk borrowing of *this specific idea* (one display moment, one workhorse
face everywhere else) without copying FINWIWO's actual typefaces — flag as a design
decision for approval before implementation, since it's a brand-identity choice, not a
neutral behavior a spec can just assert.

**Container width (EXACT):** `.container { max-width: 1464px }` — not 1440, not 1320
(NEOSURA's own current container is 1320px per the existing audit — a different, and
already-decided, NEOSURA value; not a reason to change it).

---

## Part Q — Image system

- Service-story images: exactly **1 per row**, `547px` column width at desktop (§H) — not
  full-bleed, not a gallery.
- Hero states 2–6: a single static product/topic `<img>` per slide, no `object-fit`
  cropping behavior independently isolated in this pass (image dimensions come from the
  source asset directly rather than a fixed crop box, based on the plain `<img>` markup
  found — no wrapping `sr7-mask`/crop layer detected around these particular images the
  way there is around the hero's video background).
- Partner-logo strip: 24 images inside a **Flickity** carousel
  (`.nectar-flickity.ticker-rotate`, `data-autoplay="true"`, `data-pause-on-hover` present
  as an attribute but empty-valued, `data-wrap="wrap"`, `data-spacing="30px"`) — i.e. an
  **infinite auto-scrolling ticker**, not a manually-paged carousel. This is the only
  confirmed carousel/ticker mechanism found anywhere on the homepage (life-stage section,
  §G, shows no such class).

---

## Part R — Mobile (390×844), what actually changes

- **Header**: height drops to **48px** (from 91px desktop) — not just restyled, genuinely
  shorter. Logo shrinks to `140.3×24` (from `204.7×35`). Background stays the same
  translucent-white-blur treatment. Hamburger is `.slide-out-widget-area-toggle` (Salient's
  off-canvas slide-out panel component, not a custom mobile menu) at `x:334, w:32.4`.
- **Hero**: confirmed module-swap (§C.1) — `SR7_4_2` becomes the visible, full-size module
  (`height: 571.667px` per its own inline style) while `SR7_3_1` collapses to 0. This is a
  genuinely **separately-authored mobile hero**, not a reflowed desktop one.
- **Mobile menu**: clicking the toggle opens Salient's slide-out panel (confirmed
  triggerable and screenshotted — `mobile-01-top.png`/interaction confirmed functional).
  Deeper interaction (nested mega-menu-to-accordion behavior specifically) was not
  independently re-verified open/closed in this pass — **open item**.
- Sections below the hero were not individually re-measured at 390px in this pass (time
  budget prioritized the header/hero/menu mechanics, which are the highest-value,
  hardest-to-guess pieces) — **open item**, listed below.

---

## 1. FINWIWO homepage exact section sequence

See Part D table — 13 rows (hero, partner logos, rating badge, problem-statement,
manifesto, life-stages, 5× alternating service story, testimonial) plus the footer global
section injected outside the normal row flow.

## 2. FINWIWO hero exact state sequence

See Part C.2 — Welcome(video) → Steuern → Hypothek → Vorsorge/Pensionsplanung → Vermögen →
Versicherungen, verified by driving the real "Weiter" control.

## 3. FINWIWO desktop motion specification

See Part O. Highest-confidence, fully-measured items: M01 (header), M04–M07 (hero
transition). Everything else in the table is honestly flagged APPROXIMATE or open.

## 4. FINWIWO mobile motion specification

Structural (module-swap, header/logo resize) confirmed EXACT/MEASURED per Part R.
Timing/easing of any mobile-specific transitions was **not** independently re-sampled the
way desktop hero transitions were (open item).

## 5. Header / mega-menu specification

See Parts A–B. Geometry, scroll-threshold, and full content hierarchy for all 5 menus are
EXACT/MEASURED. Open/close delay values are APPROXIMATE (Superfish defaults, not
independently timed).

## 6. Homepage layout specification

See Parts D, E, F, G, H, I. Section Y-positions/heights/padding/background are EXACT.
Alternating image/text rhythm (Part H) is fully confirmed with real column coordinates.

## 7. Service-page grammar

See Parts K–N. Shared component sequence confirmed across 5 pages with a real comparison
matrix; divergences documented rather than papered over. The "trailing comparison row
renders at 0 height on every page" finding (Part K) is a real, reproducible artifact worth
noting to whoever eventually wants that section replicated in spirit — it likely needs a
scroll-trigger or interaction to reveal on FINWIWO itself.

## 8. Typography / spacing reference

See Part P. Real computed values for 7 type roles plus the two confirmed structural
constants: 72px inter-section padding for the 5 service-story rows, 1464px container max
width.

## 9. NEOSURA mapping recommendations

- **Hero**: build as one component with independently-positioned headline and
  supporting-copy blocks that animate from opposite directions (headline up, body down) on
  slide change via GSAP; treat the brand/welcome slide as visually distinct (video or a
  strong static hero image + no CTA) from the 5 topic slides (image + CTA); keep prev/next
  as plain text controls, not icon arrows.
- **Mega menu**: since NEOSURA's real content is flat (5 categories × 2 audiences, no
  sub-grouping), model NEOSURA's panels on FINWIWO's *flatter* menus (Steuern/Hypothek
  pattern: intro line + flat link list) rather than the deep 3-column grouped menus
  (Vorsorge/Vermögen/Versicherungen) — matching menu depth to actual content depth instead
  of manufacturing extra hierarchy.
  - Reuse FINWIWO's confirmed geometry *pattern* (panel inset to the same gutter as page
    content, not full-bleed; white background; soft shadow, no heavy border) as a
    starting point for NEOSURA's own panel styling.
- **Section rhythm**: adopt a two-tier spacing system like FINWIWO's — a larger constant
  for "statement" sections (~100–115px equivalent) and a tighter, strictly-repeated
  constant for list/story sections (~72px equivalent) — rather than one flat spacing
  value site-wide.
- **Service-story alternation**: NEOSURA's Section 06/07 (Privatkunden/Unternehmenskunden
  service storytelling) should alternate text/image sides per item the way FINWIWO's 5
  homepage rows do, using an asymmetric (not 50/50) column split.
- **Two-typeface hero idea**: worth considering (heavy display face for the hero only,
  workhorse face everywhere else) — **flag for explicit approval**, since it changes
  NEOSURA's typography system beyond what the existing NEOSURA CSS already establishes.
- **Do not** adopt: partner-logo ticker, Google-rating badge, newsletter form, the
  role-noun-rotation copy device, or the multi-step FormCraft estimator — none have a
  NEOSURA content equivalent and adopting them would mean fabricating claims/features
  NEOSURA doesn't have, which the brief explicitly rules out.

## 10. Open questions / not independently measured to full rigor

- Life-stage section (Part G): carousel vs. static grid not conclusively settled — no
  carousel class detected, but not all entries were individually inspected.
- FAQ open/close exact duration and easing curve (isolated the *behavior* — exclusive
  accordion — but not the precise timing function).
- Mega-menu open/close delay exact milliseconds (Superfish library defaults, not
  independently timed against the clock).
- Testimonial video duration label / lightbox behavior — carried over from the earlier,
  less rigorous pass; not re-confirmed at DOM level.
- The service-page "Warum FINWIWO die bessere Wahl ist" trailing row rendering at 0 height
  on all 5 pages checked — confirmed as a reproducible artifact, but its actual reveal
  trigger (scroll? interaction? a broken component?) wasn't identified.
- Card hover states (M09/M13), body-copy scroll-reveal timing (M11), and image
  clip/reveal-on-scroll (M12) were not independently instrumented this pass — the original
  v1 audit's generic descriptions for these should be treated as unverified until a
  follow-up pass specifically targets them, if that level of fidelity is needed before
  implementation.
- Only 4 of the originally-planned ~20 reference screenshots were captured
  (`desktop-01-hero-welcome.png`, `desktop-04-mega-hypothek.png`, `desktop-09-footer.png`,
  `mobile-01-top.png`, all in `docs/finwiwo-reference/`) — the audit environment's browser
  sandbox is disposable between tool calls, which made capturing the full shot list
  expensive relative to the value added once the numeric/DOM measurements above were
  already in hand. If the full screenshot set is wanted before implementation proceeds,
  say so and it can be captured in a dedicated follow-up pass.
