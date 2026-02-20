"use client";

import Link from "next/link";
import SectionContainer from "@/components/ui/SectionContainer";
import VideoCard from "@/components/ui/VideoCard";
import { works } from "@/data/work";
import { useTranslation } from "@/i18n";
import ScrollReveal, { StaggerContainer, StaggerItem, ScaleReveal } from "@/components/motion/ScrollReveal";
import { motion } from "framer-motion";

export default function SolutionPage() {
  const { t } = useTranslation();

  // AI 아바타/솔루션 작업만 필터링
  const useCaseWorks = works.filter((w) => w.style === "AI 아바타").slice(0, 6);

  return (
    <>
      {/* ════════ SECTION 1: PRODUCT HERO ════════ */}
      <SectionContainer className="bg-white pt-24 pb-20 dark:bg-slate-950">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white"
            >
              {t.solution.heading}
              <span className="mt-2 block text-xl font-normal text-slate-500 sm:text-2xl dark:text-slate-400">
                {t.solution.headingSub}
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-300"
            >
              {t.solution.desc1}
              {" "}{t.solution.desc2}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href="/contact?type=solution"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-violet-600 px-8 text-sm font-semibold text-white transition-colors hover:bg-violet-700"
              >
                {t.solution.cta}
              </Link>
            </motion.div>
          </div>

          {/* 제품 UI 스크린샷 */}
          <ScaleReveal delay={0.3}>
          <div className="mt-16 overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-violet-50 to-slate-100 shadow-lg dark:border-slate-800 dark:from-violet-950/30 dark:to-slate-900">
            <div className="relative">
              {/* 브라우저 창 헤더 */}
              <div className="flex h-10 items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 dark:border-slate-700 dark:bg-slate-800">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <div className="ml-4 flex-1 rounded bg-white px-3 py-1 text-xs text-slate-400 dark:bg-slate-900">app.loomix.ai</div>
              </div>
              {/* 스크린샷 플레이스홀더 */}
              <div className="flex h-80 items-center justify-center bg-gradient-to-br from-violet-100/50 to-slate-50 dark:from-violet-950/20 dark:to-slate-900">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 dark:bg-violet-900/50">
                    <svg className="h-8 w-8 text-violet-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                  </div>
                  <span className="text-sm text-slate-400 dark:text-slate-500">{t.solution.placeholder}</span>
                </div>
              </div>
            </div>
          </div>
          </ScaleReveal>
      </SectionContainer>

      {/* ════════ SECTION 2: CORE FEATURES ════════ */}
      <SectionContainer className="bg-slate-50 py-24 dark:bg-slate-900">
          <ScrollReveal>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t.solution.featuresHeading}
            </h2>
          </ScrollReveal>

          <StaggerContainer stagger={0.08} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.solution.features.map((f) => (
              <StaggerItem key={f.title}>
              <div className="group rounded-xl border border-slate-200 bg-white p-6 transition-all hover:shadow-lg dark:border-slate-700 dark:bg-slate-800">
                <span className="text-3xl">{f.icon}</span>
                <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{f.desc}</p>
              </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
      </SectionContainer>

      {/* ════════ SECTION 2.5: USE CASES ════════ */}
      <SectionContainer className="bg-white py-24 dark:bg-slate-950">
          <ScrollReveal>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t.solution.useCasesHeading}
            </h2>
          </ScrollReveal>

          <StaggerContainer stagger={0.1} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {useCaseWorks.map((work) => (
              <StaggerItem key={work.id}>
              <VideoCard
                title={t.work.titles[work.slug] || work.title}
                tags={[work.industry, work.style, work.purpose]}
                duration={work.duration}
                thumbnailUrl={work.thumbnailUrl}
                videoUrl={work.videoUrl}
                variant="solution"
                href={`/work/${work.slug}`}
              />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollReveal delay={0.2}>
          <div className="mt-10 text-center">
            <Link href="/work?style=ai-avatar" className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 transition-colors hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300">
              {t.solution.useCasesCta}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
          </ScrollReveal>
      </SectionContainer>

      {/* ════════ SECTION 3: BUSINESS IMPACT ════════ */}
      <SectionContainer className="bg-white py-24 dark:bg-slate-950">
          <ScrollReveal>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t.solution.impactHeading}
            </h2>
          </ScrollReveal>

          <StaggerContainer stagger={0.12} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.solution.impacts.map((item) => (
              <StaggerItem key={item.label}>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center dark:border-slate-800 dark:bg-slate-900">
                <p className="text-4xl font-bold text-violet-600 dark:text-violet-400">{item.value}</p>
                <h3 className="mt-2 font-semibold text-slate-900 dark:text-white">{item.label}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
              </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollReveal delay={0.3}>
          <div className="mt-12 text-center">
            <Link
              href="/contact?type=solution"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-violet-600 px-8 text-sm font-semibold text-white transition-colors hover:bg-violet-700"
            >
              {t.solution.impactCta}
            </Link>
          </div>
          </ScrollReveal>
      </SectionContainer>

    </>
  );
}
