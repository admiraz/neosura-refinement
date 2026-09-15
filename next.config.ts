import type { NextConfig } from "next";

/** GitHub Pages review build. Enabled only with `GITHUB_PAGES=true`: a static
 * export served from a repo sub-path (PAGES_BASE_PATH, e.g. `/neosura-review`),
 * with trailing slashes so Pages can serve each route's `index.html`, and a
 * custom image loader that prefixes the sub-path onto root-relative image
 * sources. Static hosting has no server, so the Pages build omits the redirects
 * below and the form route handlers (removed by the build script); the forms
 * then show their honest network-error message. Every other build — `next dev`,
 * `next build`, Vercel — uses the regular config unchanged. */
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = isPages ? (process.env.PAGES_BASE_PATH ?? "") : "";

/** Phase 7M.0 — client-guide IA migration. Old V2 service slugs are
 * permanently redirected (308) to their canonical replacements rather
 * than deleted outright, so any external link/bookmark/search-index
 * entry pointing at a V2 URL still resolves. See
 * docs/CLIENT_GUIDE_MERGE.md for the full old→new route table. */
const redirects: NextConfig["redirects"] = async () => [
  { source: "/privatkunden/gesundheit", destination: "/privatkunden/krankenkasse", permanent: true },
  { source: "/privatkunden/vorsorge-vermoegen", destination: "/privatkunden/vorsorge", permanent: true },
  { source: "/privatkunden/recht-cyber", destination: "/privatkunden/rechtsschutz-cyber", permanent: true },
  { source: "/unternehmen/inventar-immobilien", destination: "/unternehmen/sachversicherung", permanent: true },
  { source: "/unternehmen/gesundheit-unfall", destination: "/unternehmen/personal", permanent: true },
  { source: "/unternehmen/flottenversicherung", destination: "/unternehmen/flotten", permanent: true },
];

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  ...(isPages
    ? {
        output: "export",
        basePath,
        trailingSlash: true,
        env: { NEXT_PUBLIC_BASE_PATH: basePath },
        images: { loader: "custom", loaderFile: "./lib/pagesImageLoader.ts" },
      }
    : {
        images: { unoptimized: true },
        redirects,
      }),
};

export default nextConfig;
