import type { Metadata } from "next";
import { BRAND_NAME, BASE_URL } from "@/data/brand";
import JsonLd from "@/components/JsonLd";
import WorkClient from "./WorkClient";

export const metadata: Metadata = {
  title: "Work",
  description: `${BRAND_NAME} 포트폴리오. AI 영상 제작 및 솔루션 활용 사례를 확인하세요.`,
  alternates: { canonical: `${BASE_URL}/work/` },
  openGraph: {
    title: `Work | ${BRAND_NAME}`,
    description: "AI 영상 포트폴리오",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `${BRAND_NAME} Work Portfolio`,
  description: "AI 영상 제작 포트폴리오 및 활용 사례",
  provider: { "@type": "Organization", name: BRAND_NAME, url: BASE_URL },
};

export default function WorkPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <WorkClient />
    </>
  );
}
