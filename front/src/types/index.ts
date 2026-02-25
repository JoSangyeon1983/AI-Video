/* ============================================
   공통 TypeScript 타입 정의
   ============================================ */

/* ── 네비게이션 ── */
export interface NavItem {
  label: string;
  href: string;
}

/* ── 포트폴리오 (Work) ── */
export interface WorkItem {
  id: number;
  slug: string;
  title: string;
  industry: string;
  style: string;
  purpose: string;
  duration: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  caseDetail?: {
    challenge: string;
    approach: string;
    result: string;
  };
}

/* ── 인사이트 (Insights) ── */
export interface Article {
  id: number;
  slug: string;
  title: string;
  summary: string;
  tag: string;
  date: string;
  featured: boolean;
  /** CTA 유형 — CMS에서 아티클 등록 시 결정 */
  ctaType: "production" | "studio";
}
