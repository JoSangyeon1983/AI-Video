import type { Metadata } from "next";
import { BRAND_NAME } from "@/data/brand";
import SolutionClient from "./SolutionClient";

export const metadata: Metadata = {
  title: "Solution",
  description: `${BRAND_NAME} AI 영상 생성 솔루션. AI 아바타, 자동 자막, 다국어 더빙 등 올인원 영상 플랫폼.`,
  alternates: { canonical: "https://loomix.ai/solution/" },
  openGraph: {
    title: `Solution | ${BRAND_NAME}`,
    description: "AI 영상 생성 솔루션",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: `${BRAND_NAME} Solution`,
  description: "AI 기반 영상 생성 솔루션 플랫폼",
  applicationCategory: "MultimediaApplication",
  provider: { "@type": "Organization", name: BRAND_NAME, url: "https://loomix.ai" },
};

export default function SolutionPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SolutionClient />
    </>
  );
}
