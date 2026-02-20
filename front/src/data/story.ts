import type { TimelineItem, TeamMember } from "@/types";

/* ── 연혁 타임라인 ── */
export const timeline: TimelineItem[] = [
  { year: "2023", title: "회사 설립", desc: "AI 영상 전문 에이전시로 출발" },
  { year: "2023", title: "첫 100건 프로젝트 달성", desc: "설립 6개월 만에 다양한 업종의 영상 제작 완료" },
  { year: "2024", title: "AI 파이프라인 자체 개발", desc: "자체 AI 영상 생성 파이프라인 구축 및 특허 출원" },
  { year: "2024", title: "팀 30명 규모 확장", desc: "크리에이티브·기술·운영 전문가 영입" },
  { year: "2025", title: "SaaS 솔루션 베타 출시", desc: "기업용 AI 영상 생성 솔루션 베타 서비스 개시" },
  { year: "2025", title: "글로벌 파트너십 체결", desc: "해외 AI 기술 기업과 전략적 파트너십 구축" },
  { year: "2026", title: "솔루션 정식 출시", desc: "SaaS 정식 서비스 런칭 및 엔터프라이즈 고객 확보" },
];

/* ── 팀 멤버 ── */
export const team: TeamMember[] = [
  { name: "김대표", role: "CEO / Founder", desc: "영상 제작 15년, AI 사업 전환 리더" },
  { name: "이디렉터", role: "Creative Director", desc: "글로벌 브랜드 영상 연출 경력 10년" },
  { name: "박엔지니어", role: "CTO", desc: "AI/ML 엔지니어링, 대규모 시스템 설계" },
  { name: "최프로듀서", role: "Head of Production", desc: "프로젝트 관리 및 클라이언트 소통 전문" },
  { name: "정아티스트", role: "Lead AI Artist", desc: "생성형 AI 활용 비주얼 크리에이션" },
  { name: "한에디터", role: "Lead Editor", desc: "하이엔드 영상 편집 및 후반 작업" },
];

/* ── 파트너사 ── */
export const partners = ["Partner A", "Partner B", "Partner C", "Partner D", "Partner E", "Partner F"];
