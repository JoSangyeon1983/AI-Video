import type { Metadata } from "next";
import { BRAND_NAME, BASE_URL } from "@/data/brand";
import JsonLd from "@/components/JsonLd";
import ProductionClient from "./ProductionClient";

export const metadata: Metadata = {
  title: "Production",
  description: `${BRAND_NAME} 하이엔드 AI 영상 제작 에이전시 서비스. 크리에이티브 디렉터 기반 맞춤 영상 제작.`,
  alternates: { canonical: `${BASE_URL}/production/` },
  openGraph: {
    title: `Production | ${BRAND_NAME}`,
    description: "하이엔드 AI 영상 제작 에이전시 서비스",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: `${BRAND_NAME} Production`,
  description: "AI 기반 하이엔드 영상 제작 에이전시 서비스",
  provider: { "@type": "Organization", name: BRAND_NAME, url: BASE_URL },
};

export default function ProductionPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <ProductionClient />
    </>
  );
}
