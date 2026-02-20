import type { PurposeOption, FaqItem, InfoItemData } from "@/types";

/* ── 문의 목적 옵션 ── */
export const purposeOptions: PurposeOption[] = [
  { value: "service", label: "제작 의뢰 (에이전시)" },
  { value: "solution", label: "솔루션 도입 (SaaS)" },
];

/* ── 사무실 정보 ── */
export const officeInfo: InfoItemData[] = [
  { icon: "📍", label: "주소", value: "서울특별시 강남구 테헤란로 123, AI빌딩 5층" },
  { icon: "🕐", label: "운영시간", value: "평일 09:00 - 18:00" },
  { icon: "📧", label: "이메일", value: "contact@aivideo.kr" },
  { icon: "📞", label: "대표번호", value: "02-1234-5678" },
];

/* ── FAQ ── */
export const faqs: FaqItem[] = [
  { q: "문의 후 회신까지 얼마나 걸리나요?", a: "1영업일 내 담당자가 연락드립니다." },
  { q: "제작 의뢰와 솔루션 도입의 차이는?", a: "제작 의뢰는 전문가 전담 서비스, 솔루션 도입은 팀이 직접 사용하는 SaaS 도구입니다." },
  { q: "예산이 정해지지 않았어도 문의 가능한가요?", a: "네, 프로젝트 규모에 맞는 견적을 안내해드립니다." },
];
