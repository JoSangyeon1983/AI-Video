"use client";

/* ============================================
   공용 페이지 히어로 컴포넌트
   ─ 각 페이지의 상단 제목 + 부제목 + 설명 + CTA 영역
   ============================================ */

import { type ReactNode } from "react";
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
}

export default function PageHero({
  heading,
  headingSub,
  description,
  children,
  className = "bg-white pt-24 pb-20 dark:bg-slate-950",
}: PageHeroProps) {
  return (
    <SectionContainer className={`relative overflow-hidden ${className}`}>
      <div className="max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white"
        >
          {heading}
          {headingSub && (
            <span className="mt-2 block text-xl font-normal text-slate-500 sm:text-2xl dark:text-slate-400">
              {headingSub}
            </span>
          )}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE_OUT }}
            className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-300"
          >
            {description}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: EASE_OUT }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}
      </div>
    </SectionContainer>
  );
}
