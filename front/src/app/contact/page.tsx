import type { Metadata } from "next";
import { BRAND_NAME } from "@/data/brand";
import JsonLd from "@/components/JsonLd";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description: `${BRAND_NAME}에 프로젝트를 문의하세요. AI 영상 제작 의뢰 및 솔루션 도입 상담.`,
  alternates: { canonical: "https://loomix.ai/contact/" },
  openGraph: {
    title: `Contact | ${BRAND_NAME}`,
    description: "프로젝트 문의 및 상담",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `${BRAND_NAME} Contact`,
  description: "AI 영상 제작 문의 및 솔루션 도입 상담",
  provider: { "@type": "Organization", name: BRAND_NAME, url: "https://loomix.ai" },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <ContactClient />
    </>
  );
}
