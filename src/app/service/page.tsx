"use client";

import Link from "next/link";
import SectionContainer from "@/components/ui/SectionContainer";
import VideoCard from "@/components/ui/VideoCard";
import { works } from "@/data/work";
import { useTranslation } from "@/i18n";
import ScrollReveal, { StaggerContainer, StaggerItem, ScaleReveal } from "@/components/motion/ScrollReveal";
import { motion } from "framer-motion";

export default function ServicePage() {
  const { t } = useTranslation();

  // 에이전시/하이엔드 작업만 필터링 (AI 아바타 제외)
  const featuredWorks = works.filter((w) => w.style !== "AI 아바타").slice(0, 6);

  return (
    <>
      {/* ════════ SECTION 1: VALUE PROPOSITION ════════ */}
      <SectionContainer className="relative overflow-hidden bg-white pt-24 pb-20 dark:bg-slate-950">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white"
            >
              {t.service.heading}
              <span className="mt-2 block text-xl font-normal text-slate-500 sm:text-2xl dark:text-slate-400">
                {t.service.headingSub}
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-300"
            >
              {t.service.desc1}
              {" "}{t.service.desc2}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-8"
            >
              <Link
                href="/contact?type=service"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-blue-600 px-8 text-sm font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                {t.service.projectInquiry}
              </Link>
            </motion.div>
          </div>
      </SectionContainer>

      {/* ════════ SECTION 2: PARADIGM SHIFT (비교) ════════ */}
      <SectionContainer className="bg-slate-50 py-24 dark:bg-slate-900">
          <ScrollReveal>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t.service.whyChooseHeading(t.brand.name)}
            </h2>
            <h3 className="mt-2 text-lg text-slate-500 dark:text-slate-400">
              {t.service.whyChooseSub}
            </h3>
          </ScrollReveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {/* 기존 제작 */}
            <ScrollReveal direction="left" delay={0.1}>
            <div className="rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-700 dark:bg-slate-800">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">{t.service.legacyLabel}</h4>
              <ul className="mt-6 space-y-4">
                {t.service.compare.map((item) => (
                  <li key={item.label} className="flex justify-between border-b border-slate-100 pb-3 dark:border-slate-700">
                    <span className="text-sm text-slate-600 dark:text-slate-300">{item.label}</span>
                    <span className="text-sm font-medium text-slate-400">{item.before}</span>
                  </li>
                ))}
              </ul>
            </div>
            </ScrollReveal>
            {/* AI Video 제작 */}
            <ScrollReveal direction="right" delay={0.2}>
            <div className="rounded-2xl border-2 border-blue-600 bg-white p-8 dark:border-blue-400 dark:bg-slate-800">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">{t.service.brandLabel(t.brand.name)}</h4>
              <ul className="mt-6 space-y-4">
                {t.service.compare.map((item) => (
                  <li key={item.label} className="flex justify-between border-b border-slate-100 pb-3 dark:border-slate-700">
                    <span className="text-sm text-slate-600 dark:text-slate-300">{item.label}</span>
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{item.after}</span>
                  </li>
                ))}
              </ul>
            </div>
            </ScrollReveal>
          </div>
      </SectionContainer>

      {/* ════════ SECTION 2.5: FEATURED WORKS ════════ */}
      <SectionContainer className="bg-white py-24 dark:bg-slate-950">
          <ScrollReveal>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t.service.featuredWorksHeading}
            </h2>
          </ScrollReveal>

          <StaggerContainer stagger={0.1} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredWorks.map((work) => (
              <StaggerItem key={work.id}>
              <VideoCard
                title={t.work.titles[work.slug] || work.title}
                tags={[work.industry, work.style, work.purpose]}
                duration={work.duration}
                thumbnailUrl={work.thumbnailUrl}
                videoUrl={work.videoUrl}
                variant="service"
                href={`/work/${work.slug}`}
              />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollReveal delay={0.2}>
          <div className="mt-10 text-center">
            <Link href="/work?style=agency" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
              {t.service.featuredWorksCta}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
          </ScrollReveal>
      </SectionContainer>

      {/* ════════ SECTION 3: PROCESS & EXPERTS ════════ */}
      <SectionContainer className="bg-white py-24 dark:bg-slate-950">
          <ScrollReveal>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t.service.processHeading}
            </h2>
          </ScrollReveal>

          {/* Process Stepper */}
          <StaggerContainer stagger={0.1} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {t.service.steps.map((s) => (
              <StaggerItem key={s.step}>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
                <span className="text-2xl font-bold text-blue-300 dark:text-blue-600">{s.step}</span>
                <h3 className="mt-2 font-semibold text-slate-900 dark:text-white">{s.title}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{s.desc}</p>
              </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Experts */}
          <div className="mt-20">
            <ScrollReveal>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t.service.expertHeading}</h3>
            </ScrollReveal>
            <StaggerContainer stagger={0.08} className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {t.service.experts.map((e) => (
                <StaggerItem key={e.role}>
                <div className="rounded-xl border border-slate-200 bg-white p-6 text-center dark:border-slate-800 dark:bg-slate-900">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950">
                    <span className="text-lg font-bold text-blue-500 dark:text-blue-400">{e.role[0]}</span>
                  </div>
                  <h4 className="mt-3 font-semibold text-slate-900 dark:text-white">{e.role}</h4>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{e.desc}</p>
                </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
      </SectionContainer>

    </>
  );
}
