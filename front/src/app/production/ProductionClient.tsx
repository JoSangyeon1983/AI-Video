"use client";

import SectionContainer from "@/components/ui/SectionContainer";
import VideoCard from "@/components/ui/VideoCard";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import { IconArrowRight } from "@/components/ui/Icon";
import { DetailCTA } from "@/components/ui/DetailShared";
import { works } from "@/data/work";
import { useTranslation } from "@/i18n";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/motion/ScrollReveal";

export default function ProductionClient() {
  const { t } = useTranslation();

  // 에이전시/하이엔드 작업만 필터링 (AI 아바타 제외)
  const featuredWorks = works.filter((w) => w.style !== "AI 아바타").slice(0, 6);

  return (
    <>
      {/* ════════ SECTION 1: VALUE PROPOSITION ════════ */}
      <PageHero
        heading={t.production.heading}
        headingSub={t.production.headingSub}
        description={<>{t.production.desc1} {t.production.desc2}</>}
      >
        <Button as="a" href="/contact/?type=production">
          {t.production.projectInquiry}
        </Button>
      </PageHero>

      {/* ════════ SECTION 2: AI TECH APPLIED ════════ */}
      <SectionContainer className="bg-white py-24 dark:bg-slate-950">
          <ScrollReveal>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t.production.aiTechHeading}
            </h2>
            <p className="mt-2 text-lg text-slate-500 dark:text-slate-400">
              {t.production.aiTechSub}
            </p>
          </ScrollReveal>

          <StaggerContainer stagger={0.1} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.production.aiTechItems.map((item) => (
              <StaggerItem key={item.title}>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-900">
                  <span className="text-3xl">{item.icon}</span>
                  <h3 className="mt-3 font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                  <span className="mt-1 inline-block rounded-full bg-brand-50 px-3 py-0.5 text-xs font-bold text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                    {item.stat}
                  </span>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
      </SectionContainer>

      {/* ════════ SECTION 3: PARADIGM SHIFT (비교) ════════ */}
      <SectionContainer className="bg-slate-50 py-24 dark:bg-slate-900">
          <ScrollReveal>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t.production.whyChooseHeading(t.brand.name)}
            </h2>
            <h3 className="mt-2 text-lg text-slate-500 dark:text-slate-400">
              {t.production.whyChooseSub}
            </h3>
          </ScrollReveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {/* 기존 제작 */}
            <ScrollReveal direction="left" delay={0.1}>
            <div className="rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-700 dark:bg-slate-800">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">{t.production.legacyLabel}</h4>
              <ul className="mt-6 space-y-4">
                {t.production.compare.map((item) => (
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
            <div className="rounded-2xl border-2 border-brand-600 bg-white p-8 dark:border-brand-400 dark:bg-slate-800">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">{t.production.brandLabel(t.brand.name)}</h4>
              <ul className="mt-6 space-y-4">
                {t.production.compare.map((item) => (
                  <li key={item.label} className="flex justify-between border-b border-slate-100 pb-3 dark:border-slate-700">
                    <span className="text-sm text-slate-600 dark:text-slate-300">{item.label}</span>
                    <span className="text-sm font-bold text-brand-600 dark:text-brand-400">{item.after}</span>
                  </li>
                ))}
              </ul>
            </div>
            </ScrollReveal>
          </div>
      </SectionContainer>

      {/* ════ SECTION 4: FEATURED WORKS ════ */}
      <SectionContainer className="bg-white py-24 dark:bg-slate-950">
          <ScrollReveal>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t.production.featuredWorksHeading}
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
                variant="production"
                href={`/work/${work.slug}`}
              />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollReveal delay={0.2}>
          <div className="mt-10 text-center">
            <a href="/work/?style=agency" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300">
              {t.production.featuredWorksCta}
              <IconArrowRight />
            </a>
          </div>
          </ScrollReveal>
      </SectionContainer>

      {/* ════ SECTION 5: PROCESS ════ */}
      <SectionContainer className="bg-slate-50 py-24 dark:bg-slate-900">
          <ScrollReveal>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t.production.processHeading}
            </h2>
          </ScrollReveal>

          {/* Process Stepper */}
          <StaggerContainer stagger={0.1} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {t.production.steps.map((s) => (
              <StaggerItem key={s.step}>
              <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                <span className="text-2xl font-bold text-brand-300 dark:text-brand-600">{s.step}</span>
                <h3 className="mt-2 font-semibold text-slate-900 dark:text-white">{s.title}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{s.desc}</p>
              </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
      </SectionContainer>

      {/* ════ SECTION 6: EXPERTS ════ */}
      <SectionContainer className="bg-white py-24 dark:bg-slate-950">
          <ScrollReveal>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t.production.expertHeading}</h2>
          </ScrollReveal>
          <StaggerContainer stagger={0.08} className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {t.production.experts.map((e) => (
              <StaggerItem key={e.role}>
              <div className="rounded-xl border border-slate-200 bg-white p-6 text-center dark:border-slate-800 dark:bg-slate-900">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 dark:bg-brand-950">
                  <span className="text-lg font-bold text-brand-500 dark:text-brand-400">{e.role[0]}</span>
                </div>
                <h4 className="mt-3 font-semibold text-slate-900 dark:text-white">{e.role}</h4>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{e.desc}</p>
              </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
      </SectionContainer>

      {/* ════ SECTION 7: CLOSING CTA ════ */}
      <SectionContainer className="bg-white py-16 dark:bg-slate-950">
        <DetailCTA
          heading={t.production.closingCtaHeading}
          href="/contact/?type=production"
          label={t.production.closingCtaLabel}
          variant="brand"
        />
      </SectionContainer>
    </>
  );
}
