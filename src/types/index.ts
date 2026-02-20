/* ============================================
   공통 TypeScript 타입 정의
   ============================================ */

/* ── 네비게이션 ── */
export interface NavItem {
  label: string;
  href: string;
}

export interface FooterLinkGroup {
  [group: string]: NavItem[];
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

export interface FeaturedWork {
  id: number;
  title: string;
  tags: string[];
  duration: string;
}

/* ── 서비스 (Service) ── */
export interface ProcessStep {
  step: string;
  title: string;
  desc: string;
}

export interface CompareItem {
  label: string;
  before: string;
  after: string;
}

export interface Expert {
  role: string;
  desc: string;
}

/* ── 솔루션 (Solution) ── */
export interface Feature {
  icon: string;
  title: string;
  desc: string;
}

export interface Impact {
  value: string;
  label: string;
  desc: string;
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
  ctaType: "service" | "solution";
}

/* ── 스토리 (Story) ── */
export interface TimelineItem {
  year: string;
  title: string;
  desc: string;
}

export interface TeamMember {
  name: string;
  role: string;
  desc: string;
}

/* ── 연락처 (Contact) ── */
export interface PurposeOption {
  value: string;
  label: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface InfoItemData {
  icon: string;
  label: string;
  value: string;
}

/* ── 홈 ── */
export interface TrustNumber {
  value: string;
  label: string;
}
