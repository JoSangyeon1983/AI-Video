/* ============================================
   공유 애니메이션 상수 & 유틸리티
   ============================================ */
import type { Variants, Transition } from "framer-motion";

/** 전역 easeOut 커브 — 모든 페이지 전환·등장 애니메이션에서 공용 */
export const EASE_OUT: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

/* ── 공통 트랜지션 프리셋 ── */
export const fadeUp = (delay = 0, duration = 0.6): Transition => ({
  duration,
  delay,
  ease: EASE_OUT,
});

export const fadeIn = (delay = 0, duration = 0.8): Transition => ({
  duration,
  delay,
  ease: EASE_OUT,
});

/* ── 공통 initial / animate 프리셋 ── */
export const FADE_UP_INITIAL = { opacity: 0, y: 20 } as const;
export const FADE_UP_ANIMATE = { opacity: 1, y: 0 } as const;

export const FADE_IN_INITIAL = { opacity: 0 } as const;
export const FADE_IN_ANIMATE = { opacity: 1 } as const;

/* ── 공통 Variants ── */
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

export const staggerContainerVariants = (stagger = 0.1): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger } },
});
