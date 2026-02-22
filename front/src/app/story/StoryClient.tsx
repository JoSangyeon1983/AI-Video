"use client";

import SectionContainer from "@/components/ui/SectionContainer";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/motion/ScrollReveal";
import { motion } from "framer-motion";
import { useTranslation } from "@/i18n";

export default function StoryClient() {
  const { t } = useTranslation();
  return (
    <>
      {/* ════════ SECTION 1: BRAND MANIFESTO ════════ */}
      <SectionContainer className="bg-white pt-24 pb-20 dark:bg-slate-950">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white"
            >
              {t.story.heading(t.brand.name)}
              <span className="mt-2 block text-xl font-normal text-slate-500 sm:text-2xl dark:text-slate-400">
                {t.story.headingSub}
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-300"
            >
              {t.story.desc1}
              <br />
              {t.story.desc2}
            </motion.p>
          </div>
      </SectionContainer>

      {/* ════════ SECTION 2: TIMELINE ════════ */}
      <SectionContainer className="bg-slate-50 py-24 dark:bg-slate-900">
          <ScrollReveal>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t.story.timelineHeading}
            </h2>
          </ScrollReveal>

          <div className="relative mt-12">
            <div className="absolute left-4 top-0 h-full w-0.5 bg-brand-200 dark:bg-brand-800 sm:left-1/2 sm:-translate-x-px" />

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
                  <div className="absolute left-4 top-2 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-brand-600 bg-white dark:border-brand-400 dark:bg-slate-900 sm:left-1/2" />

                  <div className={`ml-10 sm:ml-0 sm:w-1/2 ${i % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:pl-12"}`}>
                    <span className="text-sm font-bold text-brand-600 dark:text-brand-400">{item.year}</span>
                    <h3 className="mt-1 font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
                  </div>
                </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
      </SectionContainer>

      {/* ════════ SECTION 3: TEAM & PARTNERS ════════ */}
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
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 dark:bg-brand-950">
                  <span className="text-xl font-bold text-brand-500 dark:text-brand-400">{member.name[0]}</span>
                </div>
                <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">{member.name}</h3>
                <p className="text-sm font-medium text-brand-600 dark:text-brand-400">{member.role}</p>
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
                <StaggerItem key={p} direction="none">
                <div className="flex h-12 w-32 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                  <span className="text-sm font-medium text-slate-400 dark:text-slate-500">{p}</span>
                </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
          </ScrollReveal>
      </SectionContainer>
    </>
  );
}
