import type { Metadata } from "next";
import { BRAND_NAME, BASE_URL } from "@/data/brand";
import LegalPageClient from "@/components/LegalPageClient";

export const metadata: Metadata = {
  title: `이용약관`,
  description: `${BRAND_NAME} 서비스 이용약관 안내 페이지입니다.`,
  alternates: { canonical: `${BASE_URL}/terms/` },
};

export default function TermsPage() {
  return <LegalPageClient pageKey="terms" />;
}
