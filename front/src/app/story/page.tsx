import type { Metadata } from "next";
import { BRAND_NAME } from "@/data/brand";
import StoryClient from "./StoryClient";

export const metadata: Metadata = {
  title: "Story",
  description: `${BRAND_NAME} 스토리: 영상 제작의 새로운 패러다임을 열다. 팀과 비전, 파트너를 소개합니다.`,
  alternates: { canonical: "https://loomix.ai/story/" },
  openGraph: {
    title: `Story | ${BRAND_NAME}`,
    description: `${BRAND_NAME}의 비전, 타임라인, 팀, 파트너를 소개합니다.`,
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: `${BRAND_NAME} Story`,
  description: `${BRAND_NAME}의 비전과 팀을 소개합니다.`,
  publisher: { "@type": "Organization", name: BRAND_NAME },
};

export default function StoryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StoryClient />
    </>
  );
}
