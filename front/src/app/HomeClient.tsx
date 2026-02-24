"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { works } from "@/data/work";
import VideoCard from "@/components/ui/VideoCard";
import SectionContainer from "@/components/ui/SectionContainer";
import CheckListItem from "@/components/ui/CheckListItem";
import Button from "@/components/ui/Button";
import { IconArrowRight, IconVideoCamera, IconFlask } from "@/components/ui/Icon";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/motion/ScrollReveal";
import { useTranslation } from "@/i18n";
import { EASE_OUT } from "@/lib/motion";

export default function HomeClient() {
  const { t } = useTranslation();
  const featuredWorks = works.slice(0, 6);

  const trustItems = [
    { value: "500+", label: t.home.trustProjectsDone },
    { value: "98%", label: t.home.trustSatisfaction },
    { value: "3x", label: t.home.trustSpeedUp },
  ];

  /* ── CTA 버튼 너비 동기화 ── */
  const btnARef = useRef<HTMLAnchorElement>(null);
  const btnBRef = useRef<HTMLAnchorElement>(null);
  const label1 = t.home.viewPortfolio;
  const label2 = t.home.projectInquiry;

  useEffect(() => {
    const a = btnARef.current;
    const b = btnBRef.current;
    if (!a || !b) return;
    // 1) 초기화 — 자연 너비로 되돌림
    a.style.width = "auto";
    b.style.width = "auto";
    a.style.minWidth = "0";
    b.style.minWidth = "0";
    // 2) 측정
    const maxW = Math.max(a.offsetWidth, b.offsetWidth);
    // 3) 적용
    a.style.minWidth = `${maxW}px`;
    b.style.minWidth = `${maxW}px`;
  }, [label1, label2]);

  return (
    <>
      {/* ════════ SECTION 1: HERO ════════ */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-slate-950">
        {/* 배경 비디오 루프 */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/thumbnails/hero-bg.webp"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/video/hero-bg.webm" type="video/webm" />
        </video>
        {/* 오버레이 (영상 위 어둡게) */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-brand-950/60 to-slate-900/65" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-600/15 via-secondary-900/10 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT }}
              className="text-4xl font-bold leading-tight tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] sm:text-5xl lg:text-6xl"
            >
              {t.brand.name}
              <span className="mt-2 block text-brand-100">
                {t.brand.description}
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-slate-200 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
            >
              {t.brand.slogan}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: EASE_OUT }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <a
                ref={btnARef}
                href="/work/"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-brand-600 px-8 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
              >
                {t.home.viewPortfolio}
              </a>
              <a
                ref={btnBRef}
                href="/contact/"
                className="inline-flex h-12 items-center justify-center rounded-lg border-2 border-brand-400/40 px-8 text-sm font-semibold text-white transition-colors hover:border-brand-300 hover:bg-brand-500/10"
              >
                {t.home.projectInquiry}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-16 flex gap-10"
            >
              {trustItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + i * 0.15 }}
                >
                  <p className="text-3xl font-bold text-white">{item.value}</p>
                  <p className="mt-1 text-sm text-brand-200/60">{item.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════ SECTION 2: FEATURED WORK ════════ */}
      <SectionContainer className="bg-white py-24 dark:bg-slate-950">
          <ScrollReveal>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t.home.section2Heading}
            </h2>
            <p className="mt-3 text-lg text-slate-500 dark:text-slate-400">
              {t.home.section2Sub}
            </p>
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
                  variant={work.style === "AI 아바타" ? "solution" : "service"}
                  href={`/work/${work.slug}`}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollReveal delay={0.3}>
            <div className="mt-10 text-center">
              <a href="/work/" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300">
                {t.home.viewAllPortfolio}
                <IconArrowRight />
              </a>
            </div>
          </ScrollReveal>
      </SectionContainer>

      {/* ════════ SECTION 3: BUSINESS BIFURCATION ════════ */}
      <SectionContainer className="bg-slate-50 py-24 dark:bg-slate-900">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                {t.home.section3Heading}
              </h2>
              <p className="mt-3 text-lg text-slate-500 dark:text-slate-400">
                {t.home.section3Sub}
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {/* Card A: Agency */}
            <ScrollReveal direction="left" delay={0.1}>
            <div className="rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:shadow-xl dark:border-slate-700 dark:bg-slate-800 lg:p-10">
              <div className="mb-6 inline-flex rounded-xl bg-brand-600 p-3 text-white dark:bg-brand-500 dark:text-white">
                <IconVideoCamera className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{t.home.cardServiceTitle}</h3>
              <p className="mt-2 text-slate-500 dark:text-slate-400">{t.home.cardServiceDesc}</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                {[t.home.cardServiceCheck1, t.home.cardServiceCheck2, t.home.cardServiceCheck3].map((txt) => (
                  <CheckListItem key={txt} text={txt} color="green" />
                ))}
              </ul>
              <Button as="a" href="/service/" variant="brand" size="md" className="mt-8">
                {t.home.cardServiceCta}
              </Button>
            </div>
            </ScrollReveal>

            {/* Card B: SaaS */}
            <ScrollReveal direction="right" delay={0.2}>
            <div className="rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:shadow-xl dark:border-slate-700 dark:bg-slate-800 lg:p-10">
              <div className="mb-6 inline-flex rounded-xl bg-secondary-600 p-3 text-white">
                <IconFlask className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{t.home.cardSolutionTitle}</h3>
              <p className="mt-2 text-slate-500 dark:text-slate-400">{t.home.cardSolutionDesc}</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                {[t.home.cardSolutionCheck1, t.home.cardSolutionCheck2, t.home.cardSolutionCheck3].map((txt) => (
                  <CheckListItem key={txt} text={txt} color="violet" />
                ))}
              </ul>
              <Button as="a" href="/solution/" variant="secondary" size="md" className="mt-8">
                {t.home.cardSolutionCta}
              </Button>
            </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.3}>
          <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            {t.home.notSure}{" "}
            <a href="/contact/" className="font-semibold text-brand-600 underline decoration-brand-300 underline-offset-4 hover:decoration-brand-600 dark:text-brand-400">
              {t.home.contactUs}
            </a>
          </p>
          </ScrollReveal>
      </SectionContainer>


    </>
  );
}
