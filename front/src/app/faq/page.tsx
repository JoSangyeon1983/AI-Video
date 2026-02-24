import type { Metadata } from "next";
import { BRAND_NAME } from "@/data/brand";
import FaqClient from "./FaqClient";

export const metadata: Metadata = {
  title: "FAQ",
  description: `${BRAND_NAME}에 대해 자주 묻는 질문과 답변을 확인하세요.`,
  alternates: { canonical: "https://loomix.ai/faq/" },
};

export default function FaqPage() {
  return <FaqClient />;
}
