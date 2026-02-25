import type { Metadata } from "next";
import { BRAND_NAME } from "@/data/brand";
import JsonLd from "@/components/JsonLd";
import StudioClient from "./StudioClient";

export const metadata: Metadata = {
  title: "Studio",
  description: `${BRAND_NAME} AI 영상 생성 스튜디오. AI 아바타, 자동 자막, 다국어 더빙 등 올인원 영상 스튜디오.`,
  alternates: { canonical: "https://loomix.ai/studio/" },
  openGraph: {
    title: `Studio | ${BRAND_NAME}`,
    description: "AI 영상 생성 스튜디오",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: `${BRAND_NAME} Studio`,
  description: "AI 기반 영상 생성 스튜디오",
  applicationCategory: "MultimediaApplication",
  provider: { "@type": "Organization", name: BRAND_NAME, url: "https://loomix.ai" },
};

export default function StudioPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <StudioClient />
    </>
  );
}
