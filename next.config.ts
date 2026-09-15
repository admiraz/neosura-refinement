import type { NextConfig } from "next";

/** Phase 7M.0 — client-guide IA migration. Old V2 service slugs are
 * permanently redirected (308) to their canonical replacements rather
 * than deleted outright, so any external link/bookmark/search-index
 * entry pointing at a V2 URL still resolves. See
 * docs/CLIENT_GUIDE_MERGE.md for the full old→new route table. */
const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: "/privatkunden/gesundheit", destination: "/privatkunden/krankenkasse", permanent: true },
      { source: "/privatkunden/vorsorge-vermoegen", destination: "/privatkunden/vorsorge", permanent: true },
      { source: "/privatkunden/recht-cyber", destination: "/privatkunden/rechtsschutz-cyber", permanent: true },
      { source: "/unternehmen/inventar-immobilien", destination: "/unternehmen/sachversicherung", permanent: true },
      { source: "/unternehmen/gesundheit-unfall", destination: "/unternehmen/personal", permanent: true },
      { source: "/unternehmen/flottenversicherung", destination: "/unternehmen/flotten", permanent: true },
    ];
  },
};

export default nextConfig;
