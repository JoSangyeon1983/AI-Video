"use client";

import { works } from "@/data/work";
import { useTranslation } from "@/i18n";
import { motion } from "framer-motion";
import { IconArrowLeft } from "@/components/ui/Icon";
import Button from "@/components/ui/Button";

interface Props {
  slug: string;
}

/** 케이스 상세 페이지 — 직접 접속(SSG) 및 새로고침 시 표시 */
export default function WorkDetailClient({ slug }: Props) {
  const { t } = useTranslation();
  const work = works.find((w) => w.slug === slug);

  if (!work) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">404</h1>
          <p className="mt-2 text-slate-500">{t.work.noResults}</p>
          <a href="/work/" className="mt-4 inline-block text-sm font-semibold text-brand-600 hover:text-brand-700">
            {t.work.detailBackToList}
          </a>
        </div>
      </div>
    );
  }

  const title = t.work.titles[work.slug] || work.title;
  const ctaType = work.style === "AI 아바타" ? "solution" : "service";
  const caseDetail = t.work.caseDetails?.[work.slug] || work.caseDetail;

  return (
    <article className="bg-white dark:bg-slate-950">
      {/* ── 비디오 영역 ── */}
      <div className="mx-auto max-w-5xl pt-20">
        <div className="aspect-video w-full overflow-hidden bg-black">
          {work.videoUrl ? (
            <video
              src={work.videoUrl}
              controls
              autoPlay
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <p className="text-sm text-slate-400">{t.videoModal.videoNotReady}</p>
            </div>
          )}
        </div>
      </div>

      {/* ── 콘텐츠 ── */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* 뒤로 가기 */}
        <a href="/work/" className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400">
          <IconArrowLeft />
          {t.work.detailBackToList}
        </a>

        {/* 제목 & 태그 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl"
        >
          {title}
        </motion.h1>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {[work.industry, work.style, work.purpose].map((tag) => (
            <span key={tag} className="rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-700 dark:bg-brand-950/50 dark:text-brand-400">
              {tag}
            </span>
          ))}
          <span className="ml-auto text-sm text-slate-400">{work.duration}</span>
        </div>

        {/* ── 케이스 상세 (Challenge → Approach → Result) ── */}
        {caseDetail && (
          <div className="mt-12 space-y-10">
            {/* Challenge */}
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-600 dark:bg-red-950/50 dark:text-red-400">1</span>
                {t.work.detailChallenge}
              </h2>
              <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{caseDetail.challenge}</p>
            </motion.section>

            {/* Approach */}
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-600 dark:bg-brand-950/50 dark:text-brand-400">2</span>
                {t.work.detailApproach}
              </h2>
              <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{caseDetail.approach}</p>
            </motion.section>

            {/* Result */}
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-600 dark:bg-green-950/50 dark:text-green-400">3</span>
                {t.work.detailResult}
              </h2>
              <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{caseDetail.result}</p>
            </motion.section>
          </div>
        )}

        {/* ── CTA ── */}
        <div className="mt-14 rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t.work.detailCta}</h3>
          <Button
            as="a"
            href={`/contact/?type=${ctaType}&ref=${work.slug}`}
            variant={ctaType === "solution" ? "secondary" : "brand"}
            className="mt-4"
          >
            {ctaType === "solution" ? t.videoModal.ctaSolution : t.videoModal.ctaService}
          </Button>
        </div>
      </div>
    </article>
  );
}
