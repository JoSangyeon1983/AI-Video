import type { ProcessStep, CompareItem, Expert } from "@/types";

/* ── 제작 프로세스 ── */
export const processSteps: ProcessStep[] = [
  { step: "01", title: "브리프 접수", desc: "프로젝트 목표·일정·예산 파악" },
  { step: "02", title: "기획 / 콘티", desc: "스토리보드 및 연출 방향 확정" },
  { step: "03", title: "룩 디자인", desc: "시각적 스타일 레퍼런스 수립" },
  { step: "04", title: "제작 / AI 생성", desc: "AI 파이프라인 기반 영상 제작" },
  { step: "05", title: "편집 / 후반", desc: "색보정·사운드·모션 그래픽 완성" },
  { step: "06", title: "납품", desc: "최종 검수 후 전달 및 피드백 반영" },
];

/* ── 기존 vs AI Video 비교 ── */
export const compareItems: CompareItem[] = [
  { label: "제작 리드타임", before: "4~8주", after: "1~2주" },
  { label: "제작 비용", before: "높음", after: "최대 60% 절감" },
  { label: "수정 리드타임", before: "5~7일", after: "1~2일" },
  { label: "투입 리소스", before: "대규모 팀 필요", after: "소규모 전문 팀" },
];

/* ── 전문가 팀 ── */
export const experts: Expert[] = [
  { role: "Producer", desc: "프로젝트 총괄 및 클라이언트 소통" },
  { role: "Director", desc: "연출 및 크리에이티브 방향 수립" },
  { role: "AI Artist", desc: "AI 도구 활용 영상 소스 생성" },
  { role: "Editor", desc: "편집·색보정·사운드 디자인" },
  { role: "Engineer", desc: "커스텀 AI 파이프라인 개발" },
];
