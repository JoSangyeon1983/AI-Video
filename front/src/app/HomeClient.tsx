"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { works } from "@/data/work";
import { articles as rawArticles } from "@/data/insights";
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
  const previewArticles = rawArticles.slice(0, 3);

  const trustItems = [
    { value: "500+", label: t.home.trustProjectsDone },
    { value: "98%", label: t.home.trustSatisfaction },
    { value: "3x", label: t.home.trustSpeedUp },
  ];

  /* ── CTA 버튼 너비 동기화 ── */
  const btnARef = useRef<HTMLAnchorElement>(null);
  const btnBRef = useRef<HTMLAnchorElement>(null);
  const label1 = t.home.projectInquiry;
  const label2 = t.home.viewPortfolio;

  useEffect(() => {
    const a = btnARef.current;
    const b = btnBRef.current;
    if (!a || !b) return;
    a.style.width = "auto";
    b.style.width = "auto";
    a.style.minWidth = "0";
    b.style.minWidth = "0";
    const maxW = Math.max(a.offsetWidth, b.offsetWidth);
    a.style.minWidth = `${maxW}px`;
    b.style.minWidth = `${maxW}px`;
  }, [label1, label2]);

  return (
    <>
      {/* ════════ SECTION 1: HERO — AI 기술 중심 가치 제안 ════════ */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-slate-950">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/thumbnails/hero-bg.webp"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/video/hero-bg.webm" type="video/webm" />
        </video>
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
              <span className="mt-2 block text-slate-200">
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
                href="/contact/"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-8 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-200"
              >
                {t.home.projectInquiry}
              </a>
              <a
                ref={btnBRef}
                href="/work/"
                className="inline-flex h-12 items-center justify-center rounded-lg border-2 border-slate-500/40 px-8 text-sm font-semibold text-white transition-colors hover:border-slate-300 hover:bg-white/10"
              >
                {t.home.viewPortfolio}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-16 grid grid-cols-3 gap-6 sm:gap-10"
            >
              {trustItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + i * 0.15 }}
                >
                  <p className="text-3xl font-bold text-white">{item.value}</p>
                  <p className="mt-1 text-sm text-slate-400">{item.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════ SECTION 2: AI TECHNOLOGY EDGE — 기술 차별화 (핵심) ════════ */}
      <SectionContainer className="bg-slate-50 py-24 dark:bg-slate-900">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                {t.home.techEdgeHeading}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500 dark:text-slate-400">
                {t.home.techEdgeSub}
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer stagger={0.1} className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.home.techEdgeItems.map((item) => (
              <StaggerItem key={item.title}>
                <div className="group relative rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:shadow-xl dark:border-slate-700 dark:bg-slate-800">
                  <span className="text-4xl">{item.icon}</span>
                  <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="mt-1 text-sm font-semibold text-brand-600 dark:text-brand-400">{item.stat}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
      </SectionContainer>

      {/* ════════ SECTION 3: FEATURED WORK — AI 기술 결과물 쇼케이스 ════════ */}
      <SectionContainer className="bg-white py-24 dark:bg-slate-950">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                {t.home.section2Heading}
              </h2>
              <p className="mt-3 text-lg text-slate-500 dark:text-slate-400">
                {t.home.section2Sub}
              </p>
            </div>
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
                  variant={work.style === "AI 아바타" ? "studio" : "production"}
                  href={`/work/${work.slug}`}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollReveal delay={0.3}>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a href="/work/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition-colors hover:text-white">
                {t.home.viewAllPortfolio}
                <IconArrowRight />
              </a>
              <span className="hidden text-slate-600 sm:inline">|</span>
              <a href="/contact/" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-400 transition-colors hover:text-brand-300">
                {t.home.projectInquiry}
                <IconArrowRight />
              </a>
            </div>
          </ScrollReveal>
      </SectionContainer>

      {/* ════════ SECTION 4: BUSINESS BIFURCATION ════════ */}
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
            {([
              {
                icon: <IconVideoCamera className="h-6 w-6" />,
                iconBg: "bg-brand-600 dark:bg-brand-500 dark:text-white",
                title: t.home.cardProductionTitle,
                desc: t.home.cardProductionDesc,
                checks: [t.home.cardProductionCheck1, t.home.cardProductionCheck2, t.home.cardProductionCheck3],
                checkColor: "green" as const,
                cta: t.home.cardProductionCta,
                href: "/production/",
                variant: "brand" as const,
                direction: "left" as const,
                delay: 0.1,
              },
              {
                icon: <IconFlask className="h-6 w-6" />,
                iconBg: "bg-secondary-600",
                title: t.home.cardStudioTitle,
                desc: t.home.cardStudioDesc,
                checks: [t.home.cardStudioCheck1, t.home.cardStudioCheck2, t.home.cardStudioCheck3],
                checkColor: "violet" as const,
                cta: t.home.cardStudioCta,
                href: "/studio/",
                variant: "secondary" as const,
                direction: "right" as const,
                delay: 0.2,
              },
            ]).map((card) => (
              <ScrollReveal key={card.href} direction={card.direction} delay={card.delay}>
                <div className="rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:shadow-xl dark:border-slate-700 dark:bg-slate-800 lg:p-10">
                  <div className={`mb-6 inline-flex rounded-xl p-3 text-white ${card.iconBg}`}>
                    {card.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{card.title}</h3>
                  <p className="mt-2 text-slate-500 dark:text-slate-400">{card.desc}</p>
                  <ul className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    {card.checks.map((txt) => (
                      <CheckListItem key={txt} text={txt} color={card.checkColor} />
                    ))}
                  </ul>
                  <Button as="a" href={card.href} variant={card.variant} size="md" className="mt-8">
                    {card.cta}
                  </Button>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="mt-10 flex items-center justify-center gap-3 rounded-xl border border-slate-700 bg-slate-800/50 px-6 py-4">
              <span className="text-sm text-slate-300">{t.home.notSure}</span>
              <a href="/contact/" className="inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition-all hover:shadow-md">
                {t.home.contactUs}
                <IconArrowRight />
              </a>
            </div>
          </ScrollReveal>
      </SectionContainer>

      {/* ════════ SECTION 5: INSIGHTS PREVIEW — AI 기술 리더십 ════════ */}
      <SectionContainer className="bg-white py-24 dark:bg-slate-950">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                {t.home.insightsPreviewHeading}
              </h2>
              <p className="mt-3 text-lg text-slate-500 dark:text-slate-400">
                {t.home.insightsPreviewSub}
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer stagger={0.12} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {previewArticles.map((article, idx) => (
              <StaggerItem key={article.id}>
                <a href={`/insights/${article.slug}/`} className="group block overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                  <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-700" />
                  <div className="p-6">
                    <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-medium text-slate-300">
                      {t.insights.articles[idx]?.tag ?? article.tag}
                    </span>
                    <h3 className="mt-3 font-semibold text-slate-900 group-hover:text-white dark:text-white">
                      {t.insights.articles[idx]?.title ?? article.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
                      {t.insights.articles[idx]?.summary ?? article.summary}
                    </p>
                  </div>
                </a>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollReveal delay={0.3}>
            <div className="mt-10 text-center">
              <a href="/insights/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition-colors hover:text-white">
                {t.home.insightsPreviewCta}
                <IconArrowRight />
              </a>
            </div>
          </ScrollReveal>
      </SectionContainer>

      {/* ════════ SECTION 6: CLOSING CTA — 최종 전환 ════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-600/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t.home.closingCtaHeading}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">
              {t.home.closingCtaSub}
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button as="a" href="/contact/" variant="white" size="lg">
                {t.home.closingCtaLabel}
              </Button>
              <a href="/work/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition-colors hover:text-white">
                {t.home.viewAllPortfolio}
                <IconArrowRight />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
