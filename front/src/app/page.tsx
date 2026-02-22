import type { Metadata } from "next";
import { BRAND_NAME, BRAND_DESCRIPTION } from "@/data/brand";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: `${BRAND_NAME} | ${BRAND_DESCRIPTION}`,
  description: "AI를 이용한 하이엔드 영상 제작 에이전시 서비스와 기업용 AI 영상 생성 SaaS 솔루션을 제공합니다.",
  alternates: { canonical: "https://loomix.ai/" },
  openGraph: {
    title: `${BRAND_NAME} | ${BRAND_DESCRIPTION}`,
    description: "AI 하이엔드 영상 제작 에이전시 & 기업용 AI 영상 생성 솔루션",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BRAND_NAME,
  url: "https://loomix.ai",
  description: BRAND_DESCRIPTION,
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    email: "contact@loomix.ai",
    contactType: "sales",
    availableLanguage: ["Korean", "English", "Japanese"],
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient />
    </>
  );
}
