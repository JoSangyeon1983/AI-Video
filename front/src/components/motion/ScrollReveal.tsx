"use client";

import { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

/* ─────────────────────────────────────────────
   ScrollReveal — 뷰포트 진입 시 요소를 애니메이션
   ───────────────────────────────────────────── */

type Direction = "up" | "down" | "left" | "right" | "none";

interface ScrollRevealProps {
  children: ReactNode;
  /** 등장 방향 (기본: up) */
  direction?: Direction;
  /** 지연 시간 (초, 기본: 0) */
  delay?: number;
  /** 애니메이션 길이 (초, 기본: 0.6) */
  duration?: number;
  /** 이동 거리 (px, 기본: 40) */
  distance?: number;
  /** 뷰포트 진입 기준 (0~1, 기본: 0.15) */
  threshold?: number;
  /** 한 번만 실행? (기본: true) */
  once?: boolean;
  /** 추가 className */
  className?: string;
  /** 래퍼 태그 (기본: div) */
  as?: "div" | "section" | "article" | "li" | "span";
}

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
  none: { x: 0, y: 0 },
};

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  distance = 40,
  threshold = 0.15,
  once = true,
  className = "",
  as = "div",
}: ScrollRevealProps) {
  const offset = offsets[direction];

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: offset.x * distance,
      y: offset.y * distance,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: EASE_OUT,
      },
    },
  };

  const Component = motion.create(as as "div");

  return (
    <Component
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      className={className}
    >
      {children}
    </Component>
  );
}

/* ─────────────────────────────────────────────
   StaggerContainer — 자식 요소를 순차 등장
   ───────────────────────────────────────────── */

interface StaggerContainerProps {
  children: ReactNode;
  /** 자식 간 지연 (초, 기본: 0.1) */
  stagger?: number;
  /** 뷰포트 진입 기준 (0~1, 기본: 0.1) */
  threshold?: number;
  /** 한 번만 실행? (기본: true) */
  once?: boolean;
  className?: string;
}

const containerVariants = (stagger: number): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
    },
  },
});

export function StaggerContainer({
  children,
  stagger = 0.1,
  threshold = 0.1,
  once = true,
  className = "",
}: StaggerContainerProps) {
  return (
    <motion.div
      variants={containerVariants(stagger)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* StaggerItem — StaggerContainer 안에서 사용 */
interface StaggerItemProps {
  children: ReactNode;
  direction?: Direction;
  distance?: number;
  duration?: number;
  className?: string;
}

export function StaggerItem({
  children,
  direction = "up",
  distance = 30,
  duration = 0.5,
  className = "",
}: StaggerItemProps) {
  const offset = offsets[direction];

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: offset.x * distance,
      y: offset.y * distance,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        ease: EASE_OUT,
      },
    },
  };

  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   ScaleReveal — 스케일 인 효과
   ───────────────────────────────────────────── */

interface ScaleRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function ScaleReveal({
  children,
  delay = 0,
  duration = 0.6,
  className = "",
}: ScaleRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration, delay, ease: EASE_OUT }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
