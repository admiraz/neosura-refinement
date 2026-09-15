import type { Metadata } from "next";
import { datenschutz } from "@/content/de/legal";
import { siteMeta } from "@/content/de/site";
import { pageMetadata } from "@/lib/seo";
import { LegalContent } from "@/components/legal/LegalContent";

export const metadata: Metadata = pageMetadata({
  path: "/datenschutz",
  title: `${datenschutz.title} | ${siteMeta.name}`,
  description: "Datenschutzerklärung von neosura: wie wir personenbezogene Daten erheben, verwenden und schützen.",
});

export default function DatenschutzPage() {
  return (
    <main className="flex-1 pt-12 sm:pt-[63px] lg:pt-[91px]">
      <LegalContent title={datenschutz.title} sections={datenschutz.sections} />
    </main>
  );
}
