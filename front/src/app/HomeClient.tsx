"use client";

import { works, getServiceVariant } from "@/data/work";
import { articles as rawArticles } from "@/data/insights";
import VideoCard from "@/components/ui/VideoCard";
import SectionContainer from "@/components/ui/SectionContainer";
import CheckListItem from "@/components/ui/CheckListItem";
import Button from "@/components/ui/Button";
import PageHero from "@/components/ui/PageHero";
import { IconArrowRight, IconVideoCamera, IconFlask } from "@/components/ui/Icon";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/motion/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Link from "next/link";
import { useTranslation } from "@/i18n";

export default function HomeClient() {
  const { t } = useTranslation();
  const featuredWorks = works.slice(0, 6);
  const previewArticles = rawArticles.slice(0, 3);

  return (
    <>
      {/* ════════ SECTION 1: HERO — AI 기술 중심 가치 제안 ════════ */}
      <PageHero
        heading={<>{t.brand.name}</>}
        headingSub={t.brand.description}
        description={t.brand.slogan}
        videoBg="/video/hero-bg.webm"
        videoPoster="/images/thumbnails/hero-bg.webp"
        overlayClassName="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-brand-950/60 to-slate-900/65"
        align="center"
        syncButtonWidth
      >
        <a
          href="/contact/"
          className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-8 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-200"
        >
          {t.home.projectInquiry}
        </a>
        <a
          href="/work/"
          className="inline-flex h-12 items-center justify-center rounded-lg border-2 border-slate-500/40 px-8 text-sm font-semibold text-white transition-colors hover:border-slate-300 hover:bg-white/10"
        >
          {t.home.viewPortfolio}
        </a>
      </PageHero>

      {/* ════════ SECTION 2: AI TECHNOLOGY EDGE — 기술 차별화 (핵심) ════════ */}
      <SectionContainer className="bg-slate-50 py-24 dark:bg-slate-900">
          <SectionHeading
            title={t.home.techEdgeHeading}
            subtitle={t.home.techEdgeSub}
            align="center"
            subtitleMaxWidth="max-w-2xl"
          />

          <StaggerContainer stagger={0.1} className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.home.techEdgeItems.map((item) => (
              <StaggerItem key={item.title} className="h-full">
                <div className="group relative h-full rounded-2xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600">
                  <span className="text-4xl">{item.icon}</span>
                  <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="mt-1 text-sm font-semibold text-brand-600 dark:text-brand-400">{item.stat}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
      </SectionContainer>

      {/* ════════ SECTION 3: FEATURED WORK — AI 기술로 완성한 결과물 ════════ */}
      <SectionContainer className="bg-white py-24 dark:bg-slate-950">
          <SectionHeading
            title={t.home.section2Heading}
            subtitle={t.home.section2Sub}
            align="center"
          />

          <StaggerContainer stagger={0.1} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredWorks.map((work) => (
              <StaggerItem key={work.id}>
                <VideoCard
                  title={t.work.titles[work.slug] || work.title}
                  tags={[work.industry, work.style, work.purpose]}
                  duration={work.duration}
                  thumbnailUrl={work.thumbnailUrl}
                  videoUrl={work.videoUrl}
                  variant={getServiceVariant(work.style)}
                  href={`/work/${work.slug}`}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollReveal delay={0.3}>
            <div className="mt-10 text-center">
              <Link href="/work/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition-colors hover:text-white">
                {t.home.viewAllPortfolio}
                <IconArrowRight />
              </Link>
            </div>
          </ScrollReveal>
      </SectionContainer>

      {/* ════════ SECTION 4: BUSINESS BIFURCATION ════════ */}
      <SectionContainer className="bg-slate-50 py-24 dark:bg-slate-900">
          <SectionHeading
            title={t.home.section3Heading}
            subtitle={t.home.section3Sub}
            align="center"
          />

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
              <ScrollReveal key={card.href} direction={card.direction} delay={card.delay} className="h-full">
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600 lg:p-10">
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
              <Link href="/contact/" className="inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition-all hover:shadow-md">
                {t.home.contactUs}
                <IconArrowRight />
              </Link>
            </div>
          </ScrollReveal>
      </SectionContainer>

      {/* ════════ SECTION 5: INSIGHTS PREVIEW — AI 기술 리더십 ════════ */}
      <SectionContainer className="bg-white py-24 dark:bg-slate-950">
          <SectionHeading
            title={t.home.insightsPreviewHeading}
            subtitle={t.home.insightsPreviewSub}
            align="center"
          />

          <StaggerContainer stagger={0.12} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {previewArticles.map((article, idx) => (
              <StaggerItem key={article.id} className="h-full">
                <Link href={`/insights/${article.slug}/`} className="group block h-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">
                  <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-700" />
                  <div className="p-6">
                    <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-medium text-slate-300">
                      {t.insights.articles[idx]?.tag ?? article.tag}
                    </span>
                    <h3 className="mt-3 font-semibold text-slate-900 transition-colors dark:text-white dark:group-hover:text-brand-400">
                      {t.insights.articles[idx]?.title ?? article.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
                      {t.insights.articles[idx]?.summary ?? article.summary}
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollReveal delay={0.3}>
            <div className="mt-10 text-center">
              <Link href="/insights/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition-colors hover:text-white">
                {t.home.insightsPreviewCta}
                <IconArrowRight />
              </Link>
            </div>
          </ScrollReveal>
      </SectionContainer>

      {/* ════════ SECTION 6: CLOSING CTA — 최종 전환 ════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-600/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <SectionHeading
              title={t.home.closingCtaHeading}
              subtitle={t.home.closingCtaSub}
              align="center"
              size="lg"
              theme="inverted"
              subtitleMaxWidth="max-w-xl"
            >
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button as="a" href="/contact/" variant="white" size="lg">
                {t.home.closingCtaLabel}
              </Button>
              <Link href="/work/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition-colors hover:text-white">
                {t.home.viewAllPortfolio}
                <IconArrowRight />
              </Link>
            </div>
          </SectionHeading>
        </div>
      </section>
    </>
  );
}
