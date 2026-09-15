import type { Metadata } from "next";
import { siteMeta } from "@/content/de/site";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/hero/Hero";
import { HashScrollFix } from "@/components/home/HashScrollFix";
import { ProblemStatement } from "@/components/home/ProblemStatement";
import { Manifesto } from "@/components/home/Manifesto";
import { AudienceServices } from "@/components/home/AudienceServices";
import { PostServiceProof } from "@/components/home/PostServiceProof";
import { AdvisoryConversion } from "@/components/home/AdvisoryConversion";

export const metadata: Metadata = pageMetadata({
  path: "",
  title: siteMeta.title,
  description: siteMeta.description,
});

export default function Home() {
  return (
    <main className="home-motion flex-1">
      <HashScrollFix />
      <Hero />
      <ProblemStatement />
      <Manifesto />
      <AudienceServices />
      <PostServiceProof />
      <AdvisoryConversion variant="home" />
    </main>
  );
}
