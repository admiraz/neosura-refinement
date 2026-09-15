import type { Metadata } from "next";
import { siteMeta } from "@/content/de/site";

/** Shared OG/social image — the real, licensed hero photograph already in
 * production use (components/hero/*Scene.tsx), not a purpose-built social
 * card. Close to the ideal ~1.91:1 OG ratio at 2752×1536. No dedicated
 * 1200×630 OG asset exists yet — tracked as a non-blocking TODO in
 * docs/PRODUCTION_CHECKLIST.md rather than inventing one. */
const SOCIAL_IMAGE = { url: "/images/bg-hero.webp", width: 2752, height: 1536, alt: siteMeta.name };

/** Builds a complete, consistent Metadata object (canonical + Open Graph +
 * Twitter card) from just a path/title/description, so every route gets
 * the same siteName/locale/image without repeating it per page. */
export function pageMetadata({
  path,
  title,
  description,
}: {
  /** Route path starting with "/", or "" for the homepage. */
  path: string;
  title: string;
  description: string;
}): Metadata {
  const url = `${siteMeta.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteMeta.name,
      locale: "de_CH",
      type: "website",
      images: [SOCIAL_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SOCIAL_IMAGE.url],
    },
  };
}
