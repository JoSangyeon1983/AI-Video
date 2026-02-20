import type { FeaturedWork, TrustNumber } from "@/types";

/* ── Hero 신뢰 수치 ── */
export const trustNumbers: TrustNumber[] = [
  { value: "500+", label: "프로젝트 완료" },
  { value: "98%", label: "클라이언트 만족도" },
  { value: "3x", label: "제작 속도 향상" },
];

/* ── Featured Work ── */
export const featuredWorks: FeaturedWork[] = [
  { id: 1, title: "글로벌 뷰티 브랜드 캠페인", tags: ["뷰티", "실사", "퍼포먼스"], duration: "0:30" },
  { id: 2, title: "AI 아바타 제품 소개 영상", tags: ["IT", "AI 아바타", "제품소개"], duration: "1:00" },
  { id: 3, title: "럭셔리 패션 브랜드 필름", tags: ["패션", "3D", "브랜드"], duration: "0:45" },
  { id: 4, title: "핀테크 서비스 모션그래픽", tags: ["금융", "모션그래픽", "제품소개"], duration: "0:40" },
  { id: 5, title: "식음료 브랜드 숏폼 시리즈", tags: ["커머스", "실사", "퍼포먼스"], duration: "0:15" },
  { id: 6, title: "제조업 스마트팩토리 홍보", tags: ["제조", "3D", "브랜드"], duration: "1:20" },
];
