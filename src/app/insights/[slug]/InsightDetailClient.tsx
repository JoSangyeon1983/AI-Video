"use client";

import Link from "next/link";
import { articles } from "@/data/insights";
import { useTranslation } from "@/i18n";
import { motion } from "framer-motion";

interface Props {
  slug: string;
}

/** 인사이트 아티클 상세 페이지 */
export default function InsightDetailClient({ slug }: Props) {
  const { t } = useTranslation();
  const article = articles.find((a) => a.slug === slug);
  const detail = t.insights.articleDetails?.[slug];

  if (!article || !detail) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">404</h1>
          <p className="mt-2 text-slate-500">{t.insights.noResults}</p>
          <Link href="/insights" className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700">
            {t.insights.detailBackToList}
          </Link>
        </div>
      </div>
    );
  }

  // 동일 태그 관련 아티클 (자기 자신 제외, 최대 3개)
  const related = articles
    .filter((a) => a.tag === article.tag && a.slug !== slug)
    .slice(0, 3);

  // 태그 번역 매핑
  const tagIndex = articles.indexOf(article);
  const displayTag = t.insights.articles[tagIndex]?.tag ?? article.tag;
  const displayDate = t.insights.articles[tagIndex]?.date ?? article.date;

  return (
    <article className="bg-white dark:bg-slate-950">
      {/* ── 히어로 영역 ── */}
      <div className="bg-gradient-to-b from-blue-50 to-white pt-24 pb-12 dark:from-slate-900 dark:to-slate-950">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* 뒤로 가기 */}
          <Link href="/insights" className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            {t.insights.detailBackToList}
          </Link>

          {/* 태그 & 날짜 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3"
          >
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
              {displayTag}
            </span>
            <span className="text-sm text-slate-400 dark:text-slate-500">{displayDate}</span>
          </motion.div>

          {/* 제목 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white"
          >
            {detail.title}
          </motion.h1>

          {/* 요약 */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300"
          >
            {detail.summary}
          </motion.p>
        </div>
      </div>

      {/* ── 목차 + 본문 ── */}
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {/* 목차 */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mb-12 rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900"
        >
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {t.insights.detailToc}
          </h2>
          <ol className="space-y-2">
            {detail.sections.map((section, i) => (
              <li key={i}>
                <a
                  href={`#section-${i}`}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {section.heading}
                </a>
              </li>
            ))}
          </ol>
        </motion.nav>

        {/* 섹션 콘텐츠 */}
        <div className="space-y-12">
          {detail.sections.map((section, i) => (
            <motion.section
              key={i}
              id={`section-${i}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
            >
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">{section.heading}</h2>
              <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">{section.body}</p>
            </motion.section>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="mt-16 rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t.insights.detailCta}</h3>
          <Link
            href={`/contact?type=${article.ctaType}&ref=${slug}`}
            className={`mt-4 inline-flex h-12 items-center justify-center rounded-lg px-8 text-sm font-semibold text-white transition-colors ${
              article.ctaType === "solution"
                ? "bg-violet-600 hover:bg-violet-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {article.ctaType === "solution" ? t.videoModal.ctaSolution : t.videoModal.ctaService}
          </Link>
        </div>

        {/* ── 관련 아티클 ── */}
        {related.length > 0 && (
          <div className="mt-16">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t.insights.detailRelated}</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => {
                const rIdx = articles.indexOf(r);
                const rTitle = t.insights.articles[rIdx]?.title ?? r.title;
                const rTag = t.insights.articles[rIdx]?.tag ?? r.tag;
                return (
                  <Link
                    key={r.slug}
                    href={`/insights/${r.slug}`}
                    className="group rounded-xl border border-slate-200 bg-white p-5 transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                  >
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                      {rTag}
                    </span>
                    <h4 className="mt-3 font-semibold text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                      {rTitle}
                    </h4>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
