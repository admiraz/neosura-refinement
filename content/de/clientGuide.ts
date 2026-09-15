/** Phase 7M.0 — final German copy transcribed verbatim from the client
 * guide ("neosura.ch Website Restructuring — Implementation guide and
 * copy templates for the web design team", v1.0, 3 September 2026,
 * chapter 4). Held here pending the dedicated content-compliance pass
 * that wires it into the locked `/privatkunden` and `/unternehmen` hero
 * rendering and builds the still-scaffolded new pages (see
 * docs/CLIENT_GUIDE_MERGE.md §6-8). Per the merge rule, this copy WINS
 * over the current live NEOSURA copy once each page's pass happens.
 * Nothing in this file is paraphrased, translated, or reworded — it is
 * transcribed exactly as the guide instructs ("paste 1:1, do not
 * translate, do not reword"). Where the guide itself uses a bracketed
 * placeholder (e.g. a yearly-updated figure), that placeholder is kept
 * literally rather than filled in. */

export const clientGuideHome = {
  heroHeadline: "Ihr digitaler Versicherungsbroker.",
  heroSubline:
    "Wir vergleichen den Schweizer Versicherungsmarkt für Sie, unabhängig und kostenlos. Für Privatpersonen und Unternehmen. Einfach. Klar. Persönlich.",
  heroButtons: [
    { label: "Kostenlose Analyse starten", href: "/analyse/" },
    { label: "So funktioniert's", href: "/ablauf/" },
  ],
  values: [
    {
      title: "digital",
      body: "Ihre Versicherungsberatung ist nur einen Klick entfernt. Unterlagen hochladen, Analyse erhalten, entscheiden. Ohne Papierkram, ohne Wartezimmer.",
    },
    {
      title: "unabhängig",
      body: "Wir sind an keine Versicherungsgesellschaft gebunden. Wir vergleichen den Markt und empfehlen, was zu Ihnen passt, nicht was einem Anbieter passt.",
    },
    {
      title: "persönlich",
      body: "Ein fester Ansprechpartner kennt Ihre Situation und begleitet Sie langfristig. Auch dann, wenn es darauf ankommt: im Schadenfall.",
    },
  ],
  teaserPrivat: {
    title: "Für Privatpersonen",
    body: "Krankenkasse, Wohnen, Fahrzeug, Vorsorge, Rechtsschutz. Wir bringen Ordnung in Ihre Policen und holen mehr Leistung für weniger Prämie heraus.",
    button: "Zu den Privatkunden-Lösungen",
  },
  teaserUnternehmen: {
    title: "Für Unternehmen",
    body: "Von der Betriebshaftpflicht über Krankentaggeld bis zur beruflichen Vorsorge. Wir strukturieren den Versicherungsschutz Ihres Betriebs und entlasten Sie im Alltag.",
    button: "Zu den Unternehmens-Lösungen",
  },
  newsletter: {
    title: "Versicherungswissen, das sich auszahlt.",
    body: "Prämien-Updates, Wechselfristen und Spartipps, direkt in Ihr Postfach. Kein Spam, jederzeit abmeldbar.",
  },
} as const;

export const clientGuidePrivateHub = {
  h1: "Versicherungen für Ihr Leben. Nicht für den Ordner.",
  subline:
    "Die meisten Haushalte zahlen für Deckungen, die sie nicht brauchen, und sind dort unterversichert, wo es weh tut. Wir analysieren Ihre Policen, schliessen Lücken und streichen Doppeltes.",
  tiles: [
    {
      slug: "krankenkasse",
      body: "Grund- und Zusatzversicherung optimal kombiniert. Jedes Jahr prüfen lohnt sich, wir übernehmen das für Sie.",
    },
    {
      slug: "wohnen-eigentum",
      body: "Hausrat, Privathaftpflicht und Gebäude. Verlässlicher Schutz für alles, was Ihnen gehört.",
    },
    {
      slug: "fahrzeug-reisen",
      body: "Auto, Motorrad, Ferien. Passender Schutz unterwegs, ohne überflüssige Zusätze.",
    },
    {
      slug: "vorsorge",
      body: "Säule 3a, Säule 3b und Lebensversicherung. Steuern sparen und die Familie absichern.",
    },
    {
      slug: "rechtsschutz-cyber",
      body: "Professionelle Hilfe bei rechtlichen Konflikten und digitalen Risiken.",
    },
  ],
} as const;

export const clientGuideBusinessHub = {
  h1: "Ihr Betrieb hat Wichtigeres zu tun als Versicherungen zu verwalten.",
  subline:
    "Als unabhängiger Broker bündeln wir sämtliche Policen Ihres Unternehmens bei einem Ansprechpartner: Wir vergleichen den Markt, verhandeln die Konditionen, prüfen jedes Jahr nach und begleiten Sie im Schadenfall.",
  tiles: [
    { slug: "betriebshaftpflicht", body: "Schutz vor Personen-, Sach- und Vermögensschäden gegenüber Dritten." },
    { slug: "sachversicherung", body: "Inventar, Waren, Maschinen, Immobilien und Betriebsunterbruch." },
    { slug: "personal", body: "Lohnfortzahlung absichern, Mitarbeitende schützen (KTG/UVG)." },
    { slug: "berufliche-vorsorge", body: "BVG-Lösungen mit fairen Konditionen für Betrieb und Belegschaft." },
    { slug: "flotten", body: "Firmenfahrzeuge effizient und einheitlich versichert." },
    { slug: "cyber-rechtsschutz", body: "Digitale Risiken und rechtliche Konflikte des Betriebs abgedeckt." },
  ],
} as const;

/** Guide §4.16 — the client's 5-step advisory journey. See
 * docs/CLIENT_GUIDE_MERGE.md §16 for why this is NOT yet wired into the
 * FINWIWO 4-step `CategoryProcess` visual grammar. */
export const clientGuideAblauf = {
  steps: [
    {
      num: "01",
      title: "Analyse",
      body: "Sie laden Ihre Unterlagen über unser Portal hoch oder wir erfassen sie gemeinsam im Erstgespräch. So entsteht das vollständige Bild Ihrer heutigen Situation.",
    },
    {
      num: "02",
      title: "Auswertung",
      body: "Wir prüfen jede Police auf Deckung, Prämie und Überschneidungen und vergleichen sie mit dem Markt.",
    },
    {
      num: "03",
      title: "Lösungsvorschlag",
      body: "Sie erhalten eine klar strukturierte Empfehlung: Was behalten, was anpassen, was ersetzen, und was es kostet beziehungsweise spart.",
    },
    {
      num: "04",
      title: "Umsetzung",
      body: "Sie entscheiden, wir erledigen den Rest: Kündigungen, Anträge, Fristen, Übergänge ohne Deckungslücke.",
    },
    {
      num: "05",
      title: "Begleitung",
      body: "Wir bleiben Ihr Ansprechpartner: jährliche Überprüfung, Anpassung bei Lebensereignissen und volle Unterstützung im Schadenfall.",
    },
  ],
  kostenblock:
    "Unsere Beratung ist für Sie kostenlos. Wir werden von den Versicherungsgesellschaften mit marktüblichen Vermittlungsentschädigungen vergütet. Was das konkret heisst, legen wir in unserer Erstinformation nach Art. 45 VAG offen.",
} as const;

/** Guide §4.17. */
export const clientGuideSchadenfall = {
  h1: "Schaden passiert? Wir kümmern uns.",
  intro:
    "Melden Sie uns den Schaden über das Formular. Wir prüfen die Deckung, melden den Fall der Gesellschaft, behalten Fristen im Blick und setzen uns dafür ein, dass Sie erhalten, was Ihnen zusteht.",
  steps: [
    "Sie melden uns den Schaden mit Fotos und Belegen.",
    "Wir melden den Fall der Versicherung und koordinieren Rückfragen, Expertisen und Reparaturfreigaben.",
    "Wir prüfen die Abrechnung der Gesellschaft, bevor Sie sie akzeptieren.",
  ],
  notfallbox: "Bei Personenschäden zuerst 144 anrufen. Bei Einbruch die Polizei (117) und erst danach den Schaden melden.",
} as const;

/** Guide §4.15 — these hub pages route to services, they don't sell
 * anything of their own. */
export const clientGuideThemen = {
  familie: {
    h1: "Familie gegründet? Zeit für den Versicherungs-Check.",
    intro:
      "Mit Kindern ändert sich alles: das Budget, die Verantwortung, die Risiken. Wir prüfen Krankenkasse (inklusive vorgeburtlicher Anmeldung des Kindes), Hausrat- und Haftpflichtsummen, die Absicherung des Haupteinkommens und den Start der Vorsorge für die Kinder.",
  },
  neuInDerSchweiz: {
    h1: "Willkommen in der Schweiz. Wir erklären Ihnen das Versicherungssystem.",
    intro:
      "Krankenversicherungspflicht innert drei Monaten nach Zuzug, Franchise, Selbstbehalt, obligatorisch und freiwillig: Das Schweizer System ist für Zuzügerinnen und Zuzüger unübersichtlich. Wir richten Ihren Versicherungsschutz von Grund auf ein, auf Wunsch auf Englisch.",
  },
} as const;

/** Guide §4.19 — exact required note under the /analyse/ upload form. */
export const clientGuideAnalyseNote =
  "Mit dem Absenden bestätigen Sie, dass Sie unsere Datenschutzerklärung gelesen haben. Ihre Dokumente werden ausschliesslich für die Analyse verwendet und nicht an Dritte weitergegeben, ausser Sie beauftragen uns damit.";

/** Guide §4.20. */
export const clientGuideKontakt = {
  h1: "Reden wir über Ihre Versicherungen.",
  intro: "Schreiben Sie uns oder buchen Sie direkt einen Termin, vor Ort in Cham, per Video oder Telefon. Wir melden uns innert eines Arbeitstages.",
} as const;

/** Guide §4.18. */
export const clientGuideUeberUns = {
  h1: "Ein Broker, der auf Ihrer Seite sitzt.",
  intro:
    "neosura ist ein unabhängiger, im FINMA-Vermittlerregister eingetragener Versicherungsbroker mit Sitz in Cham. Wir vertreten keine Gesellschaft, sondern unsere Kundinnen und Kunden: Privatpersonen und Unternehmen in der ganzen Deutschschweiz, beraten vor Ort oder vollständig digital.",
} as const;

/** Guide §4.13 — data prep only for the future third `/unternehmen`
 * business-editorial row (Phase 7E.4). Not wired into any page yet; see
 * docs/CLIENT_GUIDE_MERGE.md. Deliberately does NOT invent "Transport" as
 * a NEOSURA offering — the guide's own row is fleet-only. */
export const clientGuideFleet = {
  headline: "Viele Fahrzeuge. Eine Police. Weniger Aufwand.",
  intro:
    "Ab etwa fünf Fahrzeugen lohnt sich der Wechsel von Einzelpolicen auf eine Flottenlösung: einheitliche Deckung, ein Verfall, eine Rechnung, ein Ansprechpartner.",
  vorteile:
    "Neue Fahrzeuge werden unkompliziert in den Vertrag aufgenommen, ausscheidende abgemeldet. Die Prämie richtet sich nach dem Schadenverlauf der ganzen Flotte, mit Verhandlungsspielraum, den wir für Sie nutzen.",
  schadenmanagement:
    "Wir übernehmen die Schadenabwicklung mit der Gesellschaft, damit Ihre Fahrzeuge schnell wieder auf der Strasse sind und Ihr Team nicht mit Formularen beschäftigt ist.",
} as const;

/** Guide §4.14 — full copy for Cyber & Rechtsschutz, NEOSURA's genuine
 * sixth business service. Used both for the `/unternehmen` editorial row
 * (Phase 7E.5) and available for the canonical deep page
 * (`/unternehmen/cyber-rechtsschutz`) to draw on. Not FINWIWO's own
 * "Cyber-Risk" wording — the client guide is authoritative for content
 * per the project's source hierarchy. */
export const clientGuideCyber = {
  headline: "Die neuen Betriebsrisiken sind digital und juristisch.",
  intro:
    "Ein verschlüsseltes System legt den Betrieb lahm, ein Datenleck betrifft Kundendaten, ein Lieferant zahlt nicht: Zwei Deckungen fangen diese Risiken auf.",
  cyber:
    "Die Cyberversicherung deckt Ertragsausfall und Wiederherstellungskosten nach Angriffen, organisiert IT-Forensik und Krisenkommunikation und übernimmt Haftpflichtansprüche nach Datenschutzverletzungen. Für KMU mit digitalen Prozessen längst keine Nische mehr.",
  betriebsrechtsschutz:
    "Streitigkeiten mit Mitarbeitenden, Kunden, Lieferanten oder Behörden: Der Betriebsrechtsschutz übernimmt Anwalts- und Verfahrenskosten und verschafft Ihnen juristische Beratung, bevor aus einem Konflikt ein Prozess wird.",
} as const;

/** Guide §7 — the reusable end-of-page CTA block every topic page needs.
 * This is a DIFFERENT component from the existing `FinalCta` (which has
 * its own established homepage-era copy/design) — building this exact
 * component is deferred, not done in this phase. See
 * docs/CLIENT_GUIDE_MERGE.md §6. */
export const clientGuideTopicCta = {
  title: "Bereit für den Überblick?",
  body: "Laden Sie Ihre Unterlagen hoch, wir melden uns innert zwei Arbeitstagen mit einer strukturierten Einschätzung.",
  button: "Kostenlose Analyse starten",
  href: "/analyse/",
} as const;
