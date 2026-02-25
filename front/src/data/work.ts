import type { WorkItem } from "@/types";

/* ── 필터 옵션 ── */
export const industries = ["전체", "커머스", "뷰티", "IT", "제조", "금융", "패션", "식음료"] as const;
export const styles = ["전체", "실사", "3D", "모션그래픽", "AI 아바타"] as const;
export const purposes = ["전체", "퍼포먼스", "브랜드", "제품소개", "리크루팅"] as const;

/* ══════════════════════════════════════════════════════════════════════════════
   ⚠️ TODO: CMS 연동 필요
   ──────────────────────────────────────────────────────────────────────────────
   현재 포트폴리오 데이터는 하드코딩되어 있습니다.
   콘텐츠 양이 증가하면 아래 옵션 중 하나로 마이그레이션을 권장합니다:
   
   1. Headless CMS (Contentful, Sanity, Strapi 등)
   2. 내부 Admin 페이지 + DB 연동
   3. JSON 파일 분리 후 API Route로 제공
   
   마이그레이션 시 WorkItem 타입(@/types)과 동기화 필요
   ══════════════════════════════════════════════════════════════════════════════ */

/* ── 포트폴리오 데이터 ── */
export const works: WorkItem[] = [
  // 서비스 (에이전시 하이엔드) - 3개
  { id: 1, slug: "beauty-campaign", title: "글로벌 뷰티 브랜드 캠페인", industry: "뷰티", style: "실사", purpose: "퍼포먼스", duration: "0:30", videoUrl: "/video/beauty-campaign.mp4", thumbnailUrl: "/images/thumbnails/beauty-campaign.webp", caseDetail: { challenge: "글로벌 뷰티 브랜드의 신제품 런칭을 앞두고, 단기간 내 다국가 시장에 동시 공개할 수 있는 고퀄리티 퍼포먼스 영상이 필요했습니다.", approach: "AI 기반 실사 영상 생성 파이프라인을 활용하여 촬영 일정을 70% 단축하면서도 프리미엄 빌딩 결과물을 확보했습니다. 다국어 자막 및 지역별 크리에이티브 변형도 자동화했습니다.", result: "기존 대비 제작 비용 45% 절감, 납기 2주 단축. 캠페인 런칭 후 글로벌 CTR 34% 상승을 달성했습니다." } },
  { id: 2, slug: "luxury-fashion-film", title: "럭셔리 패션 브랜드 필름", industry: "패션", style: "3D", purpose: "브랜드", duration: "0:45", videoUrl: "/video/luxury-fashion-film.mp4", thumbnailUrl: "/images/thumbnails/luxury-fashion-film.webp", caseDetail: { challenge: "하이엔드 패션 브랜드의 시즌 캠페인을 위해 실제 촬영만으로는 불가능한 초현실적 3D 비주얼이 요구되었습니다.", approach: "AI 생성 3D 모델링과 물리 시뮬레이션을 결합하여 포토리얼 수준의 패션 필름을 제작했습니다. 크리에이티브 디렉터와의 긴밀한 협업으로 브랜드 아이덴티티를 정확히 반영했습니다.", result: "브랜드 공식 채널 조회수 120만 회 달성, 업계 어워드 수상. 클라이언트 재계약률 100%를 기록했습니다." } },
  { id: 3, slug: "fintech-motion", title: "핀테크 서비스 모션그래픽", industry: "금융", style: "모션그래픽", purpose: "제품소개", duration: "0:40", videoUrl: "/video/fintech-motion.mp4", thumbnailUrl: "/images/thumbnails/fintech-motion.webp", caseDetail: { challenge: "복잡한 금융 서비스 프로세스를 비전문가도 직관적으로 이해할 수 있는 설명 영상이 필요했습니다.", approach: "정보 설계(IA)를 기반으로 핵심 기능을 3단계로 구조화하고, AI 보조 모션그래픽으로 시각적 비유를 극대화했습니다.", result: "서비스 가입 전환율 28% 상승, 고객 문의 응답 시간 40% 단축. 유튜브 광고 영상으로 활용 시 VTR 45% 달성." } },
  // 솔루션 (AI 아바타 / 대량생산) - 3개
  { id: 4, slug: "ai-avatar-product", title: "AI 아바타 제품 소개 영상", industry: "IT", style: "AI 아바타", purpose: "제품소개", duration: "1:00", videoUrl: "/video/ai-avatar-product.mp4", thumbnailUrl: "/images/thumbnails/ai-avatar-product.webp", caseDetail: { challenge: "IT 기업이 매달 업데이트되는 제품 기능을 빠르게 영상화하여 고객에게 전달해야 했습니다.", approach: "AI 아바타 솔루션을 도입하여 스크립트 입력만으로 자연스러운 프레젠터 영상을 자동 생성하는 워크플로우를 구축했습니다.", result: "월 평균 영상 제작량 8배 증가, 건당 제작 비용 90% 절감. 팀 내재화로 외주 의존도 완전 해소." } },
  { id: 5, slug: "ai-avatar-commerce", title: "커머스 AI 아바타 대량 생성", industry: "커머스", style: "AI 아바타", purpose: "퍼포먼스", duration: "0:25", videoUrl: "/video/ai-avatar-commerce.mp4", thumbnailUrl: "/images/thumbnails/ai-avatar-commerce.webp", caseDetail: { challenge: "이커머스 플랫폼에서 수백 개 상품의 숏폼 광고를 빠르게 양산해야 하는 상황이었습니다.", approach: "상품 데이터 피드와 AI 아바타 솔루션을 연동하여 상품별 맞춤 스크립트를 자동 생성하고, 아바타 영상까지 일괄 제작하는 파이프라인을 설계했습니다.", result: "월 300건 이상의 숏폼 영상 양산 성공, ROAS 2.4배 개선. 크리에이티브 테스트 사이클을 주 단위로 단축." } },
  { id: 6, slug: "ai-avatar-finance", title: "금융 상품 AI 설명 영상", industry: "금융", style: "AI 아바타", purpose: "제품소개", duration: "0:45", videoUrl: "/video/ai-avatar-finance.mp4", thumbnailUrl: "/images/thumbnails/ai-avatar-finance.webp", caseDetail: { challenge: "금융 상품 설명 영상을 규제 변경에 맞춰 신속히 업데이트해야 했으나, 매번 촬영 및 편집에 과도한 시간과 비용이 소요되었습니다.", approach: "AI 아바타 프레젠터를 활용하여 스크립트 수정만으로 영상을 즉시 재생성할 수 있는 시스템을 구축했습니다. 컴플라이언스 팀과의 승인 프로세스도 자동화했습니다.", result: "규제 변경 대응 시간 85% 단축, 연간 영상 제작비 60% 절감. 고객 이해도 설문 점수 22% 향상." } },
];
