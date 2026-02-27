"use client";

import { type ReactNode } from "react";
import ScrollReveal from "@/components/motion/ScrollReveal";

/* ============================================
   SectionHeading — 섹션 제목 + 부제목 공용 컴포넌트
   ScrollReveal 내장. align / size / theme 옵션으로 모든 변형 커버.
   ============================================ */

interface SectionHeadingProps {
  /** 주 제목 텍스트 */
  title: ReactNode;
  /** 부제목 (생략 가능) */
  subtitle?: ReactNode;
  /** 정렬 (기본 "left") */
  align?: "left" | "center";
  /** 제목 HTML 태그 (기본 "h2") */
  as?: "h1" | "h2" | "h3";
  /** 부제목 HTML 태그 (기본 "p") */
  subtitleAs?: "p" | "h3";
  /** 크기 프리셋
   *  - "sm"  → text-xl
   *  - "md"  → text-3xl + tracking-tight (기본)
   *  - "lg"  → text-3xl sm:text-4xl + tracking-tight
   */
  size?: "sm" | "md" | "lg";
  /** 색상 테마
   *  - "default"  → slate-900/dark:white 제목, slate-500/dark:slate-400 부제목
   *  - "inverted" → white 제목, slate-300 부제목 (어두운 CTA 배경용)
   */
  theme?: "default" | "inverted";
  /** 부제목 최대 폭 (예: "max-w-2xl") — center 시 mx-auto 자동 추가 */
  subtitleMaxWidth?: string;
  /** 제목·부제목 아래 추가 렌더링 (예: CTA 버튼) */
  children?: ReactNode;
  /** ScrollReveal 래퍼에 전달할 className */
  className?: string;
}

const HEADING_SIZE = {
  sm: "text-xl font-bold",
  md: "text-3xl font-bold tracking-tight",
  lg: "text-3xl font-bold tracking-tight sm:text-4xl",
} as const;

const HEADING_COLOR = {
  default: "text-slate-900 dark:text-white",
  inverted: "text-white",
} as const;

const SUBTITLE_COLOR = {
  default: "text-slate-500 dark:text-slate-400",
  inverted: "text-slate-300",
} as const;

export default function SectionHeading({
  title,
  subtitle,
  align = "left",
  as: Tag = "h2",
  subtitleAs: SubTag = "p",
  size = "md",
  theme = "default",
  subtitleMaxWidth,
  children,
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  const headingCls = `${HEADING_SIZE[size]} ${HEADING_COLOR[theme]}`;

  const subtitleParts = [
    "mt-3 text-lg",
    SUBTITLE_COLOR[theme],
    centered && subtitleMaxWidth ? `mx-auto ${subtitleMaxWidth}` : subtitleMaxWidth ?? "",
  ].filter(Boolean).join(" ");

  const inner = (
    <>
      <Tag className={headingCls}>{title}</Tag>
      {subtitle && <SubTag className={subtitleParts}>{subtitle}</SubTag>}
      {children}
    </>
  );

  return (
    <ScrollReveal className={className}>
      {centered ? <div className="text-center">{inner}</div> : inner}
    </ScrollReveal>
  );
}
