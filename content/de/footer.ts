/** Verbatim from neosura.ch footer. */
export const footerContent = {
  brandBody: "Massgeschneiderte Lösungen für Privatpersonen und Unternehmen",
};

export const footerLinks = [
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Unser Ansatz", href: "/#ansatz" },
  { label: "Dokumente", href: "/#dokumente" },
  { label: "Kontakt", href: "/kontakt" },
];

/** Phase 7Y — "Erstinformation" added: the client guide requires this
 * link in the Footer alongside Datenschutz/Impressum; it was missing.
 * No FINMA-register external link is added here — NEOSURA's own real
 * FINMA-register entry/URL is not yet known (see
 * docs/legal-launch-blockers.md), and inventing one would violate the
 * project's own "no fake FINMA URL" rule. */
export const legalLinks = [
  { label: "Datenschutz", href: "/datenschutz" },
  { label: "Impressum", href: "/impressum" },
  { label: "Erstinformation", href: "/erstinformation" },
];
