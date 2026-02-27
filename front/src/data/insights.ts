import type { Article } from "@/types";

/*
 * ── Insights 정적 데이터 ──
 * 현재는 하드코딩이지만, 향후 CMS(Headless CMS 등) 도입 시
 * tags / articles(slug, title, summary, tag, date, featured, ctaType 등)를
 * API 또는 빌드 타임 fetch로 대체할 예정.
 * ctaType("production" | "studio")은 CMS에서 아티클 등록 시 에디터가 직접 선택.
 */

/* ── 태그 목록 (CMS 전환 시 동적 관리) ── */
export const tags = ["전체", "AI 영상 트렌드", "마케팅 전략", "기술 가이드", "업종별 활용", "케이스 스터디"] as const;

/* ── 아티클 데이터 (CMS 전환 시 API/빌드 타임 fetch로 대체) ── */
export const articles: Article[] = [
  { id: 1, slug: "ai-video-trends-2026", title: "LX Engine 파인튜닝으로 브랜드 일관성 96% 달성하는 법", summary: "LoRA 기반 자체 파인튜닝 기술로 브랜드 맞춤 영상 일관성을 극대화한 실전 방법론을 공개합니다.", tag: "AI 영상 트렌드", date: "2026.02.15", featured: true, ctaType: "production", techBadge: "LX Engine 기술" },
  { id: 2, slug: "ai-video-marketing-performance", title: "Sora vs Runway vs LX Engine — 브랜드 영상 품질 비교 테스트", summary: "주요 AI 영상 생성 모델의 브랜드 일관성, 품질, 속도를 실제 프로젝트 기준으로 비교 분석합니다.", tag: "마케팅 전략", date: "2026.02.10", featured: true, ctaType: "production", techBadge: "LX Engine 벤치마크" },
  { id: 3, slug: "ai-avatar-technology", title: "AI 아바타 기술의 현재와 미래", summary: "딥러닝 기반 AI 아바타 기술이 어디까지 왔고, 비즈니스에서 어떻게 활용 가능한지 살펴봅니다.", tag: "기술 가이드", date: "2026.02.05", featured: false, ctaType: "studio", techBadge: "기술 딥다이브" },
  { id: 4, slug: "ecommerce-ai-video-guide", title: "이커머스 업종의 AI 영상 활용 가이드", summary: "이커머스 브랜드가 AI 영상을 통해 제품 소개와 광고 소재를 효율적으로 제작하는 방법.", tag: "업종별 활용", date: "2026.01.28", featured: false, ctaType: "production" },
  { id: 5, slug: "finance-ai-video-marketing", title: "금융 서비스에서의 AI 영상 마케팅 전략", summary: "규제가 엄격한 금융 업종에서 AI 영상을 안전하고 효과적으로 활용하는 전략.", tag: "업종별 활용", date: "2026.01.20", featured: false, ctaType: "production" },
  { id: 6, slug: "ai-solution-adoption-case", title: "AI 영상 생성 솔루션 도입 성공 사례", summary: "중견기업 마케팅 팀이 AI 솔루션 도입 후 반복 콘텐츠 생산성을 10배 향상시킨 실제 사례.", tag: "케이스 스터디", date: "2026.01.15", featured: false, ctaType: "studio", techBadge: "LX Engine 도입 사례" },
];
