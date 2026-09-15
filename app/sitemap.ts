import type { MetadataRoute } from "next";
import { siteMeta } from "@/content/de/site";
import { privateServices } from "@/content/de/private";
import { businessServices } from "@/content/de/business";

/** All real, indexable, publicly-reachable routes — no draft/unbuilt pages,
 * no API routes, no anchors. `siteMeta.url` is the single centralized
 * production URL source used everywhere else in the app (layout metadata,
 * lib/seo.ts, robots.ts). */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteMeta.url;
  const now = new Date();

  const staticRoutes = [
    "/",
    "/privatkunden",
    "/unternehmen",
    "/ueber-uns",
    "/kontakt",
    "/datenschutz",
    "/impressum",
    // Phase 7Z.A — /erstinformation is a real, live, honest page (it
    // discloses exactly which regulated fields are still pending rather
    // than fabricating them) — a prior phase excluded it from the
    // sitemap on the reasoning that incomplete regulated content
    // shouldn't be indexed, but the route is not broken or fake, so
    // there's no reason to hide it from discovery while its content is
    // completed. Re-included per this phase's own explicit instruction.
    "/erstinformation",
    "/ablauf",
    "/schadenfall",
    "/ratgeber",
    "/analyse",
    "/themen/familie",
    "/themen/neu-in-der-schweiz",
  ];

  const serviceRoutes = [
    ...privateServices.map((s) => `/privatkunden/${s.slug}`),
    ...businessServices.map((s) => `/unternehmen/${s.slug}`),
  ];

  return [...staticRoutes, ...serviceRoutes].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
  }));
}
