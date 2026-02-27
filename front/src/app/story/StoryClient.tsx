"use client";

import SectionContainer from "@/components/ui/SectionContainer";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/motion/ScrollReveal";
import { useTranslation } from "@/i18n";

export default function StoryClient() {
  const { t } = useTranslation();
  return (
    <>
      {/* ════════ SECTION 1: BRAND MANIFESTO ════════ */}
      <PageHero
        heading={t.story.heading(t.brand.name)}
        headingSub={t.story.headingSub}
        description={<>{t.story.desc1}<br />{t.story.desc2}</>}
      />

      {/* ════════ SECTION 2: TIMELINE ════════ */}
      <SectionContainer className="bg-slate-50 py-24 dark:bg-slate-900">
          <ScrollReveal>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t.story.timelineHeading}
            </h2>
          </ScrollReveal>

          <div className="relative mt-12">
            <div className="absolute left-4 top-0 h-full w-0.5 bg-slate-700 sm:left-1/2 sm:-translate-x-px" />

            <div className="space-y-8">
              {t.story.timeline.map((item, i) => (
                <ScrollReveal
                  key={i}
                  direction={i % 2 === 0 ? "left" : "right"}
                  delay={i * 0.1}
                  distance={30}
                >
                <div
                  className={`relative flex items-start gap-6 sm:gap-0 ${
                    i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  <div className="absolute left-4 top-2 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-slate-400 bg-white dark:bg-slate-900 sm:left-1/2" />

                  <div className={`ml-10 sm:ml-0 sm:w-1/2 ${i % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:pl-12"}`}>
                    <span className="text-sm font-bold text-slate-300">{item.year}</span>
                    <h3 className="mt-1 font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
                  </div>
                </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
      </SectionContainer>

      {/* ════════ SECTION 3: TECH CAPABILITIES ════════ */}
      <SectionContainer className="bg-white py-24 dark:bg-slate-950">
          <ScrollReveal>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t.story.techCapHeading}
            </h2>
          </ScrollReveal>

          {/* Stats */}
          <StaggerContainer stagger={0.08} className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {t.story.techCapStats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center dark:border-slate-800 dark:bg-slate-900">
                  <span className="text-3xl font-bold text-brand-600 dark:text-brand-400 sm:text-4xl">{stat.value}</span>
                  <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Tech Items */}
          <StaggerContainer stagger={0.1} className="mt-10 grid gap-5 sm:grid-cols-2">
            {t.story.techCapItems.map((item) => (
              <StaggerItem key={item.title}>
                <div className="flex gap-4 rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-lg dark:bg-brand-950/40">{item.icon}</span>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
      </SectionContainer>

      {/* ════════ SECTION 4: TEAM & PARTNERS ════════ */}
      <SectionContainer className="bg-white py-24 dark:bg-slate-950">
          <ScrollReveal>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t.story.teamHeading}
            </h2>
          </ScrollReveal>

          <StaggerContainer stagger={0.1} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.story.team.map((member) => (
              <StaggerItem key={member.name}>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-800">
                  <span className="text-xl font-bold text-slate-300">{member.name[0]}</span>
                </div>
                <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">{member.name}</h3>
                <p className="text-sm font-medium text-slate-400">{member.role}</p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{member.desc}</p>
              </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollReveal delay={0.2}>
          <div className="mt-20">
            <h3 className="text-center text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {t.story.partnersHeading}
            </h3>
            <StaggerContainer stagger={0.06} className="mt-8 flex flex-wrap items-center justify-center gap-8">
              {t.story.partners.map((p) => (
                <StaggerItem key={p.name} direction="none">
                <div className="flex h-16 w-36 flex-col items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                  <span className="text-sm font-medium text-slate-400 dark:text-slate-500">{p.name}</span>
                  <span className="mt-0.5 text-xs text-slate-300 dark:text-slate-600">{p.type}</span>
                </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
          </ScrollReveal>
      </SectionContainer>

      {/* ════════ SECTION 5: CLOSING CTA ════════ */}
      <SectionContainer className="bg-slate-50 py-20 dark:bg-slate-900">
        <ScrollReveal>
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t.story.closingCtaHeading}</h3>
            <Button as="a" href="/contact/" variant="white" className="mt-4">
              {t.story.closingCtaLabel}
            </Button>
          </div>
        </ScrollReveal>
      </SectionContainer>
    </>
  );
}
