import { siteMeta, contact } from "@/content/de/site";

/** One canonical Organization schema, rendered site-wide from the root
 * layout only — never repeated per page. Every field is a fact already
 * verbatim in content/de/site.ts (the same data the footer and legal pages
 * use); nothing here is invented. Deliberately omits ratings, reviews,
 * awards, employee counts, founding dates, and social profiles — none of
 * those exist as genuine, verified NEOSURA data. */
export function OrganizationJsonLd() {
  const [postalCode, ...cityParts] = contact.address.zipCity.split(" ");
  const addressLocality = cityParts.join(" ");

  const data = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    name: siteMeta.name,
    url: siteMeta.url,
    email: contact.email,
    telephone: contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.street,
      postalCode,
      addressLocality,
      addressCountry: "CH",
    },
  };

  // Defensive escape of "<" so a future data value could never prematurely
  // close the script tag — all current fields are static config, but this
  // costs nothing and removes the class of bug entirely.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
