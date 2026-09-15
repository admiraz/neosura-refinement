import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { siteMeta } from "@/content/de/site";
import { pageMetadata } from "@/lib/seo";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";

/** Repo sub-path of the GitHub Pages review build (next.config.ts); empty in
 * every other build. */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  metadataBase: new URL(siteMeta.url),
  ...pageMetadata({ path: "", title: siteMeta.title, description: siteMeta.description }),
  // Prefixed for the GitHub Pages review build, which serves from a repo
  // sub-path; the variable is empty in every other build.
  icons: {
    icon: [
      { url: `${basePath}/favicon/favicon-96x96.png`, sizes: "96x96", type: "image/png" },
      { url: `${basePath}/favicon/favicon.svg`, type: "image/svg+xml" },
    ],
    shortcut: `${basePath}/favicon/favicon.ico`,
    apple: `${basePath}/favicon/apple-touch-icon.png`,
  },
  manifest: `${basePath}/favicon/site.webmanifest`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de-CH" className="h-full antialiased" data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col">
        <OrganizationJsonLd />
        <Header />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
