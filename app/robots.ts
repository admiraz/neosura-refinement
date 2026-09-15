import type { MetadataRoute } from "next";
import { siteMeta } from "@/content/de/site";

// Built once at build time; required for the static GitHub Pages export.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${siteMeta.url}/sitemap.xml`,
  };
}
