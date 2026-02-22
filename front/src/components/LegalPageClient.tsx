"use client";

import SectionContainer from "@/components/ui/SectionContainer";
import { useTranslation } from "@/i18n";

interface LegalPageProps {
  /** Translation key: "privacy" or "terms" */
  pageKey: "privacy" | "terms";
}

/** 개인정보처리방침 / 이용약관 공용 클라이언트 컴포넌트 */
export default function LegalPageClient({ pageKey }: LegalPageProps) {
  const { t } = useTranslation();
  const data = t[pageKey];

  return (
    <SectionContainer className="bg-white pt-24 pb-20 dark:bg-slate-950">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          {data.heading}
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {data.lastUpdated}
        </p>
        <div className="mt-10 space-y-10">
          {data.sections.map((section: { title: string; content: string }, i: number) => (
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
