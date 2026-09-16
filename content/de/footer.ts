/** Verbatim from neosura.ch footer. */
export const footerContent = {
  brandBody: "Massgeschneiderte Lösungen für Privatpersonen und Unternehmen",
};

/** Change Request 1 §4 — «Unser Ansatz» and «Dokumente» pointed at the
 * homepage anchors /#ansatz and /#dokumente, which the rebuild retired
 * (guide §5.2). They now point at the real pages carrying that content. */
export const footerLinks = [
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Unser Ansatz", href: "/ablauf" },
  { label: "Dokumente", href: "/analyse" },
  { label: "Kontakt", href: "/kontakt" },
];

/** Phase 7Y — "Erstinformation" added: the client guide requires this
 * link in the Footer alongside Datenschutz/Impressum; it was missing.
 *
 * Change Request 1 §5 — the FINMA entry links to the public intermediary
 * register SEARCH page, not to a NEOSURA entry: the company's own register
 * number ([FINMA-REGISTERNUMMER] in content/de/legal.ts) is still
 * outstanding. Once it arrives, point this at the neosura entry directly. */
export const legalLinks: { label: string; href: string; external?: boolean }[] = [
  { label: "Datenschutz", href: "/datenschutz" },
  { label: "Impressum", href: "/impressum" },
  { label: "Erstinformation", href: "/erstinformation" },
  {
    label: "FINMA-Register",
    href: "https://www.finma.ch/de/bewilligung/versicherungsvermittlung/registersuche/",
    external: true,
  },
];

/** Change Request 1 §5 — social icons as placeholders. The profile URLs
 * arrive with the chapter 8 deliverables, so none is invented here: these
 * render as inert placeholders until a real URL exists. */
export const socialPlaceholders = [
  { label: "Instagram" },
  { label: "LinkedIn" },
  { label: "TikTok" },
  { label: "Facebook" },
] as const;
