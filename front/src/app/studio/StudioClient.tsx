"use client";

import SectionContainer from "@/components/ui/SectionContainer";
import VideoCard from "@/components/ui/VideoCard";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import { IconArrowRight, IconImage } from "@/components/ui/Icon";
import { DetailCTA } from "@/components/ui/DetailShared";
import { works } from "@/data/work";
import { useTranslation } from "@/i18n";
import ScrollReveal, { StaggerContainer, StaggerItem, ScaleReveal } from "@/components/motion/ScrollReveal";

export default function StudioClient() {
  const { t } = useTranslation();

  // AI 아바타/솔루션 작업만 필터링
  const useCaseWorks = works.filter((w) => w.style === "AI 아바타").slice(0, 6);

  return (
    <>
      {/* ════════ SECTION 1: PRODUCT HERO ════════ */}
      <PageHero
        heading={t.studio.heading}
        headingSub={t.studio.headingSub}
        description={<>{t.studio.desc1} {t.studio.desc2}</>}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button as="a" href="/contact/?type=studio" variant="secondary">
            {t.studio.cta}
          </Button>
        </div>
      </PageHero>

      {/* 제품 UI 스크린샷 */}
      <SectionContainer className="bg-white pb-20 dark:bg-slate-950">
          <ScaleReveal delay={0.3}>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-secondary-50 to-slate-100 shadow-lg dark:border-slate-800 dark:from-secondary-950/30 dark:to-slate-900">
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
              <div className="flex h-80 items-center justify-center bg-gradient-to-br from-secondary-100/50 to-slate-50 dark:from-secondary-950/20 dark:to-slate-900">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary-100 dark:bg-secondary-900/50">
                    <IconImage className="h-8 w-8 text-secondary-500" />
                  </div>
                  <span className="text-sm text-slate-400 dark:text-slate-500">{t.studio.placeholder}</span>
                </div>
              </div>
            </div>
          </div>
          </ScaleReveal>
      </SectionContainer>

      {/* ════════ SECTION 2: ENGINE ADVANTAGE ════════ */}
      <SectionContainer className="bg-slate-50 py-24 dark:bg-slate-900">
          <ScrollReveal>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t.studio.engineHeading}
            </h2>
            <p className="mt-2 text-lg text-slate-500 dark:text-slate-400">
              {t.studio.engineSub}
            </p>
          </ScrollReveal>

          <StaggerContainer stagger={0.1} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.studio.engineItems.map((item) => (
              <StaggerItem key={item.title}>
                <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
                  <span className="text-3xl">{item.icon}</span>
                  <h3 className="mt-3 font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
      </SectionContainer>

      {/* ════════ SECTION 3: CORE FEATURES ════════ */}
      <SectionContainer className="bg-white py-24 dark:bg-slate-950">
          <ScrollReveal>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t.studio.featuresHeading}
            </h2>
          </ScrollReveal>

          <StaggerContainer stagger={0.08} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.studio.features.map((f) => (
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

      {/* ════════ SECTION 4: BUSINESS IMPACT ════════ */}
      <SectionContainer className="bg-slate-50 py-24 dark:bg-slate-900">
          <ScrollReveal>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t.studio.impactHeading}
            </h2>
          </ScrollReveal>

          <StaggerContainer stagger={0.12} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.studio.impacts.map((item) => (
              <StaggerItem key={item.label}>
              <div className="rounded-xl border border-slate-200 bg-white p-6 text-center dark:border-slate-800 dark:bg-slate-900">
                <p className="text-4xl font-bold text-secondary-600 dark:text-secondary-400">{item.value}</p>
                <h3 className="mt-2 font-semibold text-slate-900 dark:text-white">{item.label}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
              </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
      </SectionContainer>

      {/* ════════ SECTION 5: USE CASES ════════ */}
      <SectionContainer className="bg-slate-50 py-24 dark:bg-slate-900">
          <ScrollReveal>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t.studio.useCasesHeading}
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
                variant="studio"
                href={`/work/${work.slug}`}
              />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollReveal delay={0.2}>
          <div className="mt-10 text-center">
            <a href="/work/?style=ai-avatar" className="inline-flex items-center gap-2 text-sm font-semibold text-secondary-600 transition-colors hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-300">
              {t.studio.useCasesCta}
              <IconArrowRight />
            </a>
          </div>
          </ScrollReveal>
      </SectionContainer>

      {/* ════════ SECTION 6: CLOSING CTA ════════ */}
      <SectionContainer className="bg-white py-16 dark:bg-slate-950">
        <DetailCTA
          heading={t.studio.closingCtaHeading}
          href="/contact/?type=studio"
          label={t.studio.closingCtaLabel}
          variant="secondary"
        />
      </SectionContainer>

    </>
  );
}
