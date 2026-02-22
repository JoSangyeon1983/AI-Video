import type { Metadata } from "next";
import { BRAND_NAME } from "@/data/brand";
import InsightsClient from "./InsightsClient";

export const metadata: Metadata = {
  title: "Insights",
  description: `${BRAND_NAME} 인사이트 블로그. AI 영상 트렌드, 활용 팁, 업계 분석 아티클.`,
  alternates: { canonical: "https://loomix.ai/insights/" },
  openGraph: {
    title: `Insights | ${BRAND_NAME}`,
    description: "AI 영상 인사이트 & 트렌드",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: `${BRAND_NAME} Insights`,
  description: "AI 영상 트렌드 및 인사이트 블로그",
  publisher: { "@type": "Organization", name: BRAND_NAME, url: "https://loomix.ai" },
};

export default function InsightsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <InsightsClient />
    </>
  );
}
