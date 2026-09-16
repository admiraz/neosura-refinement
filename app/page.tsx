import type { Metadata } from "next";
import { siteMeta } from "@/content/de/site";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/hero/Hero";
import { HashScrollFix } from "@/components/home/HashScrollFix";
import { ProblemStatement } from "@/components/home/ProblemStatement";
import { Manifesto } from "@/components/home/Manifesto";
import { PartnerProof } from "@/components/home/PartnerProof";
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
      {/* Change Request 1 §6 — partner logos + Google review badge directly
          below the hero area, as placeholders until the chapter 8
          deliverables arrive. */}
      <PartnerProof />
      <ProblemStatement />
      <Manifesto />
      <AudienceServices />
      <PostServiceProof />

      {/* Change Request 1 §6 — testimonial section kept commented out for
          the client's later video testimonials. NEOSURA has no genuine
          testimonial, quote or rating yet, so nothing is rendered: restore
          this block once real video material and consent exist.
      <Testimonials /> */}

      <AdvisoryConversion variant="home" />
    </main>
  );
}
