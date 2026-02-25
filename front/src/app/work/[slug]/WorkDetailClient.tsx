"use client";

import { works } from "@/data/work";
import { useTranslation } from "@/i18n";
import { motion } from "framer-motion";
import { IconArrowLeft } from "@/components/ui/Icon";
import { NotFound, DetailCTA } from "@/components/ui/DetailShared";

interface Props {
  slug: string;
}

/** 케이스 상세 페이지 — 직접 접속(SSG) 및 새로고침 시 표시 */
export default function WorkDetailClient({ slug }: Props) {
  const { t } = useTranslation();
  const work = works.find((w) => w.slug === slug);

  if (!work) {
    return <NotFound message={t.work.noResults} backLabel={t.work.detailBackToList} backHref="/work/" />;
  }

  const title = t.work.titles[work.slug] || work.title;
  const ctaType = work.style === "AI 아바타" ? "studio" : "production";
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
        <a href="/work/" className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-slate-400 hover:text-white">
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
            <span key={tag} className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
              {tag}
            </span>
          ))}
          <span className="ml-auto text-sm text-slate-400">{work.duration}</span>
        </div>

        {/* ── 케이스 상세 (Challenge → Approach → Result) ── */}
        {caseDetail && (
          <div className="mt-12 space-y-10">
            {[
              { badgeCls: "bg-red-100 text-red-600 dark:bg-red-950/50 dark:text-red-400", number: "1", label: t.work.detailChallenge, content: caseDetail.challenge, delay: 0.1 },
              { badgeCls: "bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400", number: "2", label: t.work.detailApproach, content: caseDetail.approach, delay: 0.2 },
              { badgeCls: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400", number: "3", label: t.work.detailResult, content: caseDetail.result, delay: 0.3 },
            ].map((item) => (
              <motion.section
                key={item.number}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: item.delay }}
              >
                <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${item.badgeCls}`}>
                    {item.number}
                  </span>
                  {item.label}
                </h2>
                <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{item.content}</p>
              </motion.section>
            ))}
          </div>
        )}

        {/* ── CTA ── */}
        <DetailCTA
          heading={t.work.detailCta}
          href={`/contact/?type=${ctaType}&ref=${work.slug}`}
          label={ctaType === "studio" ? t.videoModal.ctaStudio : t.videoModal.ctaProduction}
          variant={ctaType === "studio" ? "secondary" : "brand"}
        />
      </div>
    </article>
  );
}
