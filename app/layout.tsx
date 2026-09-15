import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { siteMeta } from "@/content/de/site";
import { pageMetadata } from "@/lib/seo";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";

export const metadata: Metadata = {
  metadataBase: new URL(siteMeta.url),
  ...pageMetadata({ path: "", title: siteMeta.title, description: siteMeta.description }),
  icons: {
    icon: [
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
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
