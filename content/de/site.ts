export const siteMeta = {
  name: "neosura",
  // Change Request 1 §3 — home page meta taken verbatim from the client
  // guide's §5.1 table (replaces the informal "Dein digitaler
  // Versicherungsbroker", which also broke the site-wide formal "Sie").
  title: "neosura | Unabhängiger Versicherungsbroker Schweiz",
  description:
    "Versicherungen vergleichen für Privatpersonen und Unternehmen. Unabhängig, digital, kostenlos. FINMA-registrierter Broker mit Sitz in Cham.",
  url: "https://neosura.ch",
  locale: "de-CH",
};

export const contact = {
  email: "info@neosura.ch",
  // Change Request 1 §1 — client-confirmed number, replacing the
  // +41 44 500 12 34 placeholder site-wide (header, footer, contact page,
  // structured data, Impressum).
  phone: "+41 71 772 02 11",
  phoneHref: "+41717720211",
  address: {
    company: "neosura",
    street: "Gewerbestrasse 10",
    zipCity: "6330 Cham",
    country: "Schweiz",
  },
};

/** Change Request 1 §5 — the footer address links to Google Maps. Same
 * query format as the map already embedded on /kontakt. */
export const mapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  `${contact.address.company}, ${contact.address.street}, ${contact.address.zipCity}, ${contact.address.country}`
)}`;

// Phase 7M.0 — client guide §3.1 specifies this exact button verbatim:
// "button on the right: «Kostenlose Analyse» (links to /analyse/)".
export const primaryCta = { label: "Kostenlose Analyse", href: "/analyse" };
