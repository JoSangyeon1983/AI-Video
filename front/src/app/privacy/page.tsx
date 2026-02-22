import type { Metadata } from "next";
import { BRAND_NAME } from "@/data/brand";
import LegalPageClient from "@/components/LegalPageClient";

export const metadata: Metadata = {
  title: `개인정보처리방침`,
  description: `${BRAND_NAME} 개인정보처리방침 안내 페이지입니다.`,
  alternates: { canonical: "https://loomix.ai/privacy/" },
};

export default function PrivacyPage() {
  return <LegalPageClient pageKey="privacy" />;
}
