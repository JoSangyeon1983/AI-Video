"use client";

import SectionContainer from "@/components/ui/SectionContainer";
import { useTranslation } from "@/i18n";

export default function TermsPage() {
  const { t } = useTranslation();

  return (
    <SectionContainer className="bg-white pt-24 pb-20 dark:bg-slate-950">
      <div className="mx-auto max-w-3xl">
        {/* 제목 */}
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          {t.terms.heading}
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {t.terms.lastUpdated}
        </p>

        {/* 본문 */}
        <div className="mt-10 space-y-10">
          {t.terms.sections.map((section, i) => (
            <article key={i}>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                {section.title}
              </h2>
              <p className="mt-3 whitespace-pre-line text-base leading-relaxed text-slate-600 dark:text-slate-300">
                {section.content}
              </p>
            </article>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
