# Phase 2B/2C/2D — Service & Manifesto Photography Sources

## Phase 2D review — sourcing restored mid-session

The Magnific/Freepik stock API reconnected partway through Phase 2D (confirmed via
`ToolSearch`). Two replacements were completed; two were attempted and intentionally not
swapped (see below).

### Replaced

**`manifesto-advisor.webp`**
- **Title:** Financial advisor working on a computer while having a meeting with a couple in the office
- **Asset page:** https://www.magnific.com/free-photo/financial-advisor-working-computer-while-having-meeting-with-couple-office_26390623.htm
- **Creator:** Drazen Zigic
- **Tier:** Free · **AI-generated:** No · **Editorial only:** No
- **Crop notes:** `object-position: center 30%`
- Replaces the Phase 2B/2C photo (a standing presenter at a whiteboard, which read as an
  internal presentation rather than an advisor/client consultation). New photo: seated
  advisor + couple reviewing documents and a laptop together, candid, modern brick-wall
  office — matches the "advisor + client, natural conversation" brief directly.

**`business-property.webp`**
- **Title:** Beautiful architecture office business building with glass window shape
- **Asset page:** https://www.magnific.com/free-photo/beautiful-architecture-office-business-building-with-glass-window-shape_4097494.htm
- **Creator:** lifeforstock
- **Tier:** Free · **AI-generated:** No · **Editorial only:** No
- **Crop notes:** `object-position: center 50%` (unchanged from prior config)
- Replaces the Phase 2B flat facade with an upward architectural shot of twin glass office
  towers — more depth and character. Note: lacks the "human scale" the brief preferred;
  still a clear upgrade over the original.

### Not replaced (searched, no clear improvement found)

- **`private-home.webp`** — searched "bright modern European home daylight family exterior",
  "modern villa house garden daylight residential family", "modern house exterior bright
  daylight architecture Switzerland". Results were dominated by family-lifestyle photos or
  mountain/landscape scenes, not a clean bright residential exterior matching the desired
  "premium architecture, human presence" direction. Kept the current (dark exterior) image
  rather than swap sideways to something no better. Worth another attempt with different
  query terms in a future session.
- **`private-cyber.webp`** — searched "it professional monitor code office workstation
  modern", "person using laptop online privacy data protection home". Results were either
  the hacker/data-center imagery the brief explicitly says to avoid, or generic
  laptop-on-couch remote-work shots no different in kind from the current image. Kept as-is.

Manifesto's geometry also changed this pass independent of the photo swap (flush-left ~48vw
image, plain 2px-radius crop, full-bleed on mobile).

## Phase 2C review (was blocked; resolved above)

## Phase 2C review (blocked)

Phase 2C requested replacing `private-home`, `private-cyber`, `manifesto-advisor`, and
optionally `business-property` with stronger picks, sourced via a fresh Freepik search.

The stock-photo API used in Phase 2B (`mcp__claude_ai_Magnific__stock_*`, via the
Higgsfield/Magnific MCP integration) was disconnected for this session — confirmed
unavailable via `ToolSearch`. A direct unauthenticated fetch of `freepik.com` search
results was attempted as a fallback and returned `403 Forbidden` (Freepik requires an
authenticated session to browse, exactly the "unavailable login/subscription" case the
original sourcing brief anticipated).

Per that brief's own fallback instruction — do not circumvent, do not fabricate asset
picks — **no photo replacements were made this pass.** All four flagged images are kept
as their working, legitimately-licensed Phase 2B originals (see entries below). This is a
known gap to close in a future session once the stock-photo tool is reachable again;
re-run the same search queries noted in section 9/10 of the Phase 2B brief.

The one change that *was* made without new photography: Manifesto's existing photo now
carries a large asymmetric top-left/bottom-left corner mask (Phase 2C geometry request) —
image content unchanged, only the CSS mask.

---


All images were sourced through the Magnific/Freepik stock API integration available in
this environment (`stock_search` / `stock_get` / `stock_download`), which serves the same
Freepik catalog (same asset IDs, same photographer credits, same licensing tiers) via
`magnific.com` asset pages rather than `freepik.com` directly — this is the legitimate,
already-authenticated access available in this session, used instead of an unauthenticated
`freepik.com` browse that could not have downloaded anything. No login/paywall was
bypassed; only `license: free` items were selected and downloaded via the API's own signed
download URLs.

Every item below was filtered at search time with `ai_generated: excluded` and
`content_type: photo`. One initial pick (Flottenversicherung) turned out to be a 3D render
mislabeled as a photo by the catalog and was replaced — noted below.

All files converted to `.webp` (quality 80, max width 1400px) and saved to
`public/images/services/`.

---

## Privatkunden

### 01 · Gesundheit
- **Title:** Parents and their son standing against the kitchen counter with food on it under the sunlight
- **Asset page:** https://www.magnific.com/free-photo/parents-their-son-standing-against-kitchen-counter-with-food-it-sunlight_15695593.htm
- **Creator:** wirestock
- **Tier:** Free
- **AI-generated:** No
- **Editorial only:** No
- **Local file:** `/images/services/private-health.webp`
- **Crop notes:** `object-position: center 35%` — keep family group centered, crop excess counter/window at edges.

### 02 · Wohnen & Eigentum
- **Title:** Wide shot of the beautiful architecture of a modern house
- **Asset page:** https://www.magnific.com/free-photo/wide-shot-beautiful-architecture-modern-house_7926266.htm
- **Creator:** wirestock
- **Tier:** Free
- **AI-generated:** No
- **Editorial only:** No
- **Local file:** `/images/services/private-home.webp`
- **Crop notes:** `object-position: center 55%` — keep full facade, trim sky.

### 03 · Fahrzeug & Reisen
- **Title:** Relaxed people preparing to leave on adventure, putting travel bags and suitcase in automobile trunk
- **Asset page:** https://www.magnific.com/free-photo/relaxed-people-preparing-leave-adventure-putting-travel-bags-suitcase-automobile-trunk-big-family-with-parents-grandparents-small-child-travelling-summer-holiday-trip_30704436.htm
- **Creator:** DC Studio
- **Tier:** Free
- **AI-generated:** No
- **Editorial only:** No
- **Local file:** `/images/services/private-car.webp`
- **Crop notes:** `object-position: center 40%`.

### 04 · Vorsorge & Vermögen
- **Title:** Happy mature couple communicating while enjoying in their coffee time in the living room
- **Asset page:** https://www.magnific.com/free-photo/happy-mature-couple-communicating-while-enjoying-their-coffee-time-living-room-focus-is-man_25623796.htm
- **Creator:** Drazen Zigic
- **Tier:** Free
- **AI-generated:** No
- **Editorial only:** No
- **Local file:** `/images/services/private-pension.webp`
- **Crop notes:** `object-position: center 45%`.

### 05 · Recht & Cyber
- **Title:** Modern young businesswoman using laptop in the office
- **Asset page:** https://www.magnific.com/free-photo/modern-young-businesswoman-using-laptop-office_3317758.htm
- **Creator:** magnific
- **Tier:** Free
- **AI-generated:** No
- **Editorial only:** No
- **Local file:** `/images/services/private-cyber.webp`
- **Crop notes:** `object-position: center 30%`.

---

## Unternehmen

### 01 · Betriebshaftpflicht
- **Title:** Man executive instructing diverse employees in new modern company office room before business meeting
- **Asset page:** https://www.magnific.com/free-photo/man-executive-instructing-diverse-employees-new-modern-company-office-room-before-business-meeting-with-partners-analysing-reports-tablet_16096668.htm
- **Creator:** DC Studio
- **Tier:** Free
- **AI-generated:** No
- **Editorial only:** No
- **Local file:** `/images/services/business-liability.webp`
- **Crop notes:** `object-position: center 35%`.

### 02 · Flottenversicherung
- **Title:** Lorry standing outdoors near the warehouse
- **Asset page:** https://www.magnific.com/free-photo/lorry-standing-outdoors-near-warehouse_20879421.htm
- **Creator:** zinkevych
- **Tier:** Free
- **AI-generated:** No
- **Editorial only:** No
- **Local file:** `/images/services/business-fleet.webp`
- **Crop notes:** `object-position: center 55%`. **Replacement note:** the first pick
  ("Cargo Delivery Vehicle", id 34554351, author kjpargeter) was discovered on visual
  inspection to be a 3D render, not a photograph, despite `content_type: photo` and
  `aiGenerated: false` in the API response — swapped for this genuine photo.

### 03 · Berufliche Vorsorge
- **Title:** Senior people in consultation with financial expert to discuss retirement plans
- **Asset page:** https://www.magnific.com/free-photo/senior-people-consultation-with-financial-expert-discuss-retirement-plans_414766711.htm
- **Creator:** DC Studio
- **Tier:** Free
- **AI-generated:** No
- **Editorial only:** No
- **Local file:** `/images/services/business-pension.webp`
- **Crop notes:** `object-position: center 30%`.

### 04 · Inventar & Immobilien
- **Title:** Office buildings with modern architecture
- **Asset page:** https://www.magnific.com/free-photo/office-buildings-with-modern-architecture_10747679.htm
- **Creator:** wavebreakmedia_micro
- **Tier:** Free
- **AI-generated:** No
- **Editorial only:** No
- **Local file:** `/images/services/business-property.webp`
- **Crop notes:** `object-position: center 50%`.

### 05 · Gesundheit & Unfall
- **Title:** Inclusive workspace atmosphere at an office job
- **Asset page:** https://www.magnific.com/free-photo/inclusive-workspace-atmosphere-office-job_30125155.htm
- **Creator:** magnific
- **Tier:** Free
- **AI-generated:** No
- **Editorial only:** No
- **Local file:** `/images/services/business-health.webp`
- **Crop notes:** `object-position: center 30%`.

---

## Manifesto

- **Title:** Businesspeople meeting at office working together
- **Asset page:** https://www.magnific.com/free-photo/businesspeople-meeting-office-working-together_13296743.htm
- **Creator:** magnific
- **Tier:** Free
- **AI-generated:** No
- **Editorial only:** No
- **Local file:** `/images/services/manifesto-advisor.webp`
- **Crop notes:** `object-position: center 25%` — keep the standing figure's upper body in frame.

---

---

## Phase 4A.1 — Gesundheit detail-page photo-editorial section

### Gesundheit · editorial section (second photo)
- **Title:** View of a European family walking on a rocky path during their touristic journey
- **Asset page:** https://www.magnific.com/free-photo/view-european-family-walking-rocky-path-their-touristic-journey_28363460.htm
- **Creator:** wirestock (same photographer already used for `private-health.webp` and `private-home.webp`)
- **Tier:** Free · **AI-generated:** No · **Editorial only:** No
- **Local file:** `/images/services/private-health-editorial.webp`
- **Crop notes:** `object-position: center 40%` — keep the three walkers and alpine treeline in frame, crop excess foreground gravel path.
- Chosen for the Phase 4A.1 photo-led editorial section: a genuine alpine/European wellbeing
  scene, distinct from the hero's kitchen-table photo, without resorting to a clinical
  hospital/doctor's-office shot (searched "european doctor consultation" — results skewed
  institutional, not the brand's warm register). A same-query candidate,
  "Happy family couple and children hiking in countryside" (id 11298052), was rejected: its
  author handle `pch.vector` is a known illustration/vector-artist account, so despite the
  catalog labeling it `content_type: photo`, it was not genuine photography — the exact
  mislabeling gotcha documented from Phase 2B/2D sourcing.

### Phase 4A.2 re-verification — kept, not replaced

Re-searched per the Phase 4A.2 brief for a stronger "family health / doctor consultation /
wellbeing / healthcare-planning" photo, explicitly avoiding hospital cliché, fake-smiling
stock, medical graphics, and AI imagery. Queries tried: "family doctor home visit
consultation warm light pediatrician", "family health insurance advisor consultation home
living room", "family reviewing health insurance policy documents table home warm",
"grandparents grandchildren healthy living together garden warm light".

Results were dominated by exactly the clichés the brief says to avoid — pediatrician's-office
exam-table shots, pandemic-era video-call-with-doctor photos — or by generic front-facing
"happy family on the grass" stock unrelated to health/planning specifically. None was a clear
improvement over the current photo, which is genuine, candid (non-posed, back-view), premium,
and already from a verified real photographer. Kept `private-health-editorial.webp`
unchanged, per the brief's own fallback instruction.

---

## Phase 4B — editorial photos for the remaining 4 Privatkunden pages

One additional editorial photo sourced per service, distinct from that service's existing
homepage hero photo, for the `ServiceEditorial` photo-led section. All `content_type: photo`,
`ai_generated: excluded`, `license: free`; every author checked against known
illustration/vector-artist handles before download (see the recurring `pch.vector` gotcha
below).

### Wohnen & Eigentum
- **Title:** Happy family talking while relaxing on the floor at their new home
- **Asset page:** https://www.magnific.com/free-photo/happy-family-talking-while-relaxing-floor-their-new-home_26876047.htm
- **Creator:** Drazen Zigic (same photographer already used for `manifesto-advisor.webp`)
- **Tier:** Free · **AI-generated:** No · **Editorial only:** No
- **Local file:** `/images/services/private-home-editorial.webp`
- **Crop notes:** `object-position: center 45%`
- A candid, unposed moving-in moment (candles unlit box tower, guitar, a hand-lettered "our
  first home" sign as a prop within the scene) — chosen over an initial candidate, "Husband
  and wife buying new apartment and having house keys..." (id 31444993), which was a
  direct-to-camera staged selfie shot and read as generic/posed stock rather than premium
  editorial photography.

### Fahrzeug & Reisen
- **Title:** Young rural travellers driving through the country side
- **Asset page:** https://www.magnific.com/free-photo/young-rural-travellers-driving-through-country-side_16694645.htm
- **Creator:** magnific
- **Tier:** Free · **AI-generated:** No · **Editorial only:** No
- **Local file:** `/images/services/private-car-editorial.webp`
- **Crop notes:** `object-position: center 50%`
- A vintage 4x4 on a winding alpine mountain road, candid (subjects looking away from
  camera) — strong premium/editorial fit for "Mobilität und Reisen", distinct from the
  existing hero photo's family-packing-the-car scene.

### Vorsorge & Vermögen
- **Title:** Happy middle aged husband and wife sitting at table with laptop and paper bills calculating domestic incomes together at home
- **Asset page:** https://www.magnific.com/free-photo/happy-middle-aged-husband-wife-sitting-table-with-laptop-paper-bills-calculating-domestic-incomes-together-home_28871554.htm
- **Creator:** stefamerpik
- **Tier:** Free · **AI-generated:** No · **Editorial only:** No
- **Local file:** `/images/services/private-pension-editorial.webp`
- **Crop notes:** `object-position: center 20%`
- Candid long-term financial-planning scene at home (not a bank/advisor office), matching
  "Vorsorge, Vermögensaufbau und Absicherung" without a corporate-office feel.

### Recht & Cyber
- **Title:** Hand of businesswoman signing a contract in the meeting room. Close up image
- **Asset page:** https://www.magnific.com/free-photo/hand-businesswoman-signing-contract-meeting-room-close-up-image_19964502.htm
- **Creator:** DC Studio
- **Tier:** Free · **AI-generated:** No · **Editorial only:** No
- **Local file:** `/images/services/private-cyber-editorial.webp`
- **Crop notes:** `object-position: center 45%`
- A contract-signing consultation moment, leaning into the "Recht" (legal) half of this
  service rather than a tech/cyber visual — deliberately avoids any hacker/data-center
  cliché. Two other candidates for this slot, "Mature legal advisor reading document..."
  (id 11072733) and "Legal experts reviewing customer documents" (id 5890404), were both
  rejected: both are credited to `pch.vector`, the same illustration/vector-artist account
  flagged in Phase 2B/2D and again in Phase 4A.1 — despite the catalog labeling them
  `content_type: photo`, this recurring mislabeling makes that specific author an automatic
  reject regardless of search query.

---

## Phase 4C — editorial photos for the 5 Unternehmen pages

One additional editorial photo per service, distinct from that service's existing homepage
hero photo, keeping one coherent premium European/Swiss photographic register across all 5.
All `content_type: photo`, `ai_generated: excluded`, `license: free`.

### Betriebshaftpflicht
- **Title:** Group of smiling business people analyzing reports and communicating while working together in the office
- **Asset page:** https://www.magnific.com/free-photo/group-smiling-business-people-analyzing-reports-communicating-while-working-together-office-there-are-people-background_25485426.htm
- **Creator:** Drazen Zigic (same photographer already used for `manifesto-advisor.webp` and the Wohnen & Eigentum editorial photo)
- **Tier:** Free · **AI-generated:** No · **Editorial only:** No
- **Local file:** `/images/services/business-liability-editorial.webp`
- **Crop notes:** `object-position: center 25%`
- Candid peer-level report review, distinct from the hero photo's "executive instructing
  employees" framing.

### Flottenversicherung
- **Title:** Group of trucks parked in a row
- **Asset page:** https://www.magnific.com/free-photo/group-trucks-parked-row_11133894.htm
- **Creator:** aleksandarlittlewolf
- **Tier:** Free · **AI-generated:** No · **Editorial only:** No
- **Local file:** `/images/services/business-fleet-editorial.webp`
- **Crop notes:** `object-position: center 45%`
- A genuine multi-vehicle fleet (low, wide angle), distinct from the hero photo's single
  static lorry — directly matches "genuine commercial vehicle fleet" direction.

### Berufliche Vorsorge
- **Title:** Senior people discussing a pension financial strategy with broker
- **Asset page:** https://www.magnific.com/free-photo/senior-people-discussing-pension-financial-strategy-with-broker_357319310.htm
- **Creator:** DC Studio (same photographer already used for the Gesundheit/Wohnen hero photos and the Recht & Cyber editorial photo)
- **Tier:** Free · **AI-generated:** No · **Editorial only:** No
- **Local file:** `/images/services/business-pension-editorial.webp`
- **Crop notes:** `object-position: center 30%`
- Candid mid-conversation discussion in a premium office with a city skyline, distinct from
  the hero photo's own consultation scene. A first candidate, "Smiling senior leader at
  meeting with his team" (id 1022728), was rejected: all four subjects posed in a
  direct-to-camera lineup, reading as generic staged stock rather than premium editorial —
  the same "posed selfie" issue flagged for a rejected Wohnen & Eigentum candidate in
  Phase 4B.

### Inventar & Immobilien
- **Title:** Warehouse storage interior with shelves loaded with goods
- **Asset page:** https://www.magnific.com/free-photo/warehouse-storage-interior-with-shelves-loaded-with-goods_11451221.htm
- **Creator:** aleksandarlittlewolf
- **Tier:** Free · **AI-generated:** No · **Editorial only:** No
- **Local file:** `/images/services/business-property-editorial.webp`
- **Crop notes:** `object-position: center 45%`
- A large modern warehouse interior — distinct from the hero photo's exterior office-building
  architecture shot, directly matching the "premium commercial property / warehouse"
  direction.

### Gesundheit & Unfall
- **Title:** Woman at the office stretching during a work day
- **Asset page:** https://www.magnific.com/free-photo/woman-office-stretching-work-day_44132863.htm
- **Creator:** magnific
- **Tier:** Free · **AI-generated:** No · **Editorial only:** No
- **Local file:** `/images/services/business-health-editorial.webp`
- **Crop notes:** `object-position: center 30%`
- A candid occupational-wellbeing moment (desk stretch) in a bright modern office — matches
  "employee wellbeing / occupational health" without a clinical or pandemic-era feel; search
  results for this slot were otherwise dominated by dated mask/COVID-era office photography,
  which was avoided as not representative of the site's timeless, premium register.

## Licensing note

All images are Freepik **free-tier** assets under Freepik's standard free license
(attribution not required for this account tier's usage; no "editorial use only" assets
were selected — all are cleared for commercial use). If the hosting account's plan changes
license terms, re-verify before continued production use.
