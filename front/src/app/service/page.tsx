import type { Metadata } from "next";
import { BRAND_NAME } from "@/data/brand";
import ServiceClient from "./ServiceClient";

export const metadata: Metadata = {
  title: "Service",
  description: `${BRAND_NAME} 하이엔드 AI 영상 제작 에이전시 서비스. 크리에이티브 디렉터 기반 맞춤 영상 제작.`,
  alternates: { canonical: "https://loomix.ai/service/" },
  openGraph: {
    title: `Service | ${BRAND_NAME}`,
    description: "하이엔드 AI 영상 제작 에이전시 서비스",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: `${BRAND_NAME} Service`,
  description: "AI 기반 하이엔드 영상 제작 에이전시 서비스",
  provider: { "@type": "Organization", name: BRAND_NAME, url: "https://loomix.ai" },
};

export default function ServicePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ServiceClient />
    </>
  );
}
