import type { Feature, Impact } from "@/types";

/* ── 핵심 기능 ── */
export const features: Feature[] = [
  { icon: "🎬", title: "AI 영상 자동 생성", desc: "텍스트 입력만으로 고품질 영상을 자동 생성합니다." },
  { icon: "🎨", title: "브랜드 템플릿", desc: "브랜드 가이드라인에 맞는 커스텀 템플릿을 제공합니다." },
  { icon: "🔄", title: "대량 생산 워크플로우", desc: "CSV 업로드로 수백 개 영상을 한 번에 생성합니다." },
  { icon: "👤", title: "AI 아바타/보이스", desc: "커스텀 AI 아바타와 음성으로 인물 영상을 제작합니다." },
  { icon: "✂️", title: "자동 편집", desc: "AI가 장면 전환·자막·BGM을 자동으로 편집합니다." },
  { icon: "📊", title: "성과 분석", desc: "생성된 영상의 퍼포먼스를 실시간으로 추적합니다." },
];

/* ── 비즈니스 임팩트 ── */
export const impacts: Impact[] = [
  { value: "80%", label: "제작 리드타임 단축", desc: "기존 대비 영상 제작 시간을 획기적으로 절감" },
  { value: "60%", label: "운영비 절감", desc: "외부 제작 의뢰 비용 대폭 절약" },
  { value: "10x", label: "캠페인 생산성", desc: "동일 리소스로 10배 이상 영상 콘텐츠 생산" },
  { value: "100%", label: "브랜드 일관성", desc: "템플릿 기반으로 브랜드 톤앤매너 자동 유지" },
];
