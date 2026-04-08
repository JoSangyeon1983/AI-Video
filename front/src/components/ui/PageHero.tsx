"use client";

/* ============================================
   공용 페이지 히어로 컴포넌트
   ─ 각 페이지의 상단 제목 + 부제목 + 설명 + CTA 영역
   ============================================ */

import { type ReactNode, useRef, useEffect, Children, isValidElement, cloneElement } from "react";
import { motion } from "framer-motion";
import SectionContainer from "@/components/ui/SectionContainer";
import { EASE_OUT } from "@/lib/motion";

interface PageHeroProps {
  /** 메인 제목 */
  heading: ReactNode;
  /** 부제목(옵션) — heading 아래에 작은 글씨로 표시 */
  headingSub?: string;
  /** 설명 텍스트 */
  description?: ReactNode;
  /** CTA 버튼 등 추가 콘텐츠 */
  children?: ReactNode;
  /** 섹션 배경 className (기본: bg-white) */
  className?: string;
  /** 배경 영상 URL */
  videoBg?: string;
  /** 배경 영상 포스터 이미지 URL */
  videoPoster?: string;
  /** 콘텐츠 정렬 (기본: left) */
  align?: "left" | "center" | "right";
  /** children 내 버튼 너비를 동기화할지 여부 */
  syncButtonWidth?: boolean;
  /** 배경 오버레이 className (기본 제공, 커스텀 가능) */
  overlayClassName?: string;
}

const alignMap = {
  left: { text: "text-left", content: "max-w-3xl", cta: "justify-start" },
  center: { text: "text-center", content: "max-w-3xl mx-auto", cta: "justify-center" },
  right: { text: "text-right", content: "max-w-3xl ml-auto", cta: "justify-end" },
} as const;

export default function PageHero({
  heading,
  headingSub,
  description,
  children,
  className = "bg-white pt-24 pb-20 dark:bg-slate-950",
  videoBg,
  videoPoster,
  align = "left",
  syncButtonWidth = false,
  overlayClassName,
}: PageHeroProps) {
  const hasVideo = !!videoBg;
  const al = alignMap[align];

  /* ── CTA 버튼 너비 동기화 ── */
  const ctaRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!syncButtonWidth || !ctaRef.current) return;
    const buttons = ctaRef.current.querySelectorAll<HTMLElement>("a, button");
    if (buttons.length < 2) return;
    buttons.forEach((btn) => { btn.style.minWidth = "0"; });
    let maxW = 0;
    buttons.forEach((btn) => { maxW = Math.max(maxW, btn.offsetWidth); });
    buttons.forEach((btn) => { btn.style.minWidth = `${maxW}px`; });
  });

  return (
    <SectionContainer className={`relative overflow-hidden ${hasVideo ? "min-h-screen flex items-center bg-slate-950" : className}`}>
      {hasVideo && (
        <>
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={videoPoster}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={videoBg} type="video/webm" />
          </video>
          <div className={overlayClassName ?? "absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/60 to-slate-950/30"} />
        </>
      )}
      <div className={`${al.content} ${al.text} ${hasVideo ? "relative" : ""}`}>
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className={`text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl ${hasVideo ? "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]" : "text-slate-900 dark:text-white"}`}
        >
          {heading}
          {headingSub && (
            <span className={`mt-2 block text-xl font-normal sm:text-2xl ${hasVideo ? "text-slate-200" : "text-slate-500 dark:text-slate-400"}`}>
              {headingSub}
            </span>
          )}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE_OUT }}
            className={`mt-6 text-lg leading-relaxed ${hasVideo ? "text-slate-200 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]" : "text-slate-600 dark:text-slate-300"}`}
          >
            {description}
          </motion.p>
        )}

        {children && (
          <motion.div
            ref={ctaRef}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: EASE_OUT }}
            className={`mt-8 flex flex-col gap-4 sm:flex-row ${al.cta}`}
          >
            {children}
          </motion.div>
        )}
      </div>
    </SectionContainer>
  );
}
