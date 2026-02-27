"use client";

import { useState } from "react";
import { articles as rawArticles, tags as koTags } from "@/data/insights";
import { DetailCTA } from "@/components/ui/DetailShared";
import Link from "next/link";
import { useTranslation } from "@/i18n";
import { useTranslatedFilter } from "@/hooks";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

export default function InsightsClient() {
  const { t } = useTranslation();

  const tag = useTranslatedFilter(koTags, t.insights.tags);
  const [searchQuery, setSearchQuery] = useState("");

  // Build translated articles
  const articles = rawArticles.map((a, i) => ({
    ...a,
    title: t.insights.articles[i]?.title ?? a.title,
    summary: t.insights.articles[i]?.summary ?? a.summary,
    displayTag: tag.translateTag(a.tag),
    techBadge: a.techBadge,
  }));

  const filtered = articles.filter((a) => {
    if (tag.selectedKo !== koTags[0] && a.tag !== tag.selectedKo) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = a.title.toLowerCase().includes(q);
      const matchSummary = a.summary.toLowerCase().includes(q);
      const matchTag = a.displayTag.toLowerCase().includes(q);
      if (!matchTitle && !matchSummary && !matchTag) return false;
    }
    return true;
  });

  // 필터 결과의 처음 최대 2개를 큰 카드(featured)로 표시
  const featured = filtered.slice(0, Math.min(2, filtered.length));
  const rest = filtered.slice(featured.length);

  // 필터 변경 시 즉시 animate 되도록 키 생성
  const filterKey = `${tag.selectedKo}-${searchQuery}`;

  return (
    <>
      {/* ════════ HERO & TAG NAV ════════ */}
      <section className="bg-white pt-24 pb-8 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white"
          >
            {t.insights.heading}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-3 text-lg text-slate-500 dark:text-slate-400"
          >
            {t.insights.sub}
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-6"
          >
            <input
              type="text"
              placeholder={t.insights.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-md rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500 dark:focus:border-brand-400 dark:focus:ring-brand-400"
            />
          </motion.div>

          {/* Tag Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {t.insights.tags.map((tagLabel) => (
              <button
                key={tagLabel}
                onClick={() => tag.setFromTranslated(tagLabel)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  tag.displayValue === tagLabel
                    ? "bg-white text-slate-900 shadow-sm dark:bg-white/15 dark:text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                }`}
              >
                {tagLabel}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════ TECH HIGHLIGHT STRIP ════════ */}
      <section className="bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {t.insights.techHighlightHeading}
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {t.insights.techHighlightItems.map((item) => (
                <div key={item.label} className="text-center">
                  <span className="text-2xl font-bold text-brand-600 dark:text-brand-400 sm:text-3xl">{item.value}</span>
                  <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════ ARTICLE FEED ════════ */}
      <section className="bg-white pb-24 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="sr-only">{t.insights.srHeading}</h2>

          {/* Featured Articles */}
          <AnimatePresence mode="wait">
          {featured.length > 0 && (
            <motion.div
              key={`featured-${filterKey}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
              className={`mt-8 grid gap-6 ${featured.length >= 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-1 max-w-3xl'}`}
            >
              {featured.map((article, idx) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.12, ease: EASE_OUT }}
                >
                <Link href={`/insights/${article.slug}/`} className="block group cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">
                  <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-700" />
                  <div className="p-6">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-medium text-slate-300">{article.displayTag}</span>
                      {article.techBadge && (
                        <span className="rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-semibold text-brand-700 dark:bg-brand-950/40 dark:text-brand-300">{article.techBadge}</span>
                      )}
                    </div>
                    <h3 className="mt-3 text-xl font-bold text-slate-900 transition-colors dark:text-white dark:group-hover:text-brand-400">{article.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{article.summary}</p>
                    <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">{article.date}</p>
                  </div>
                </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
          </AnimatePresence>

          {/* Article List */}
          <AnimatePresence mode="wait">
          {rest.length > 0 && (
            <motion.div
              key={`rest-${filterKey}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8 space-y-4"
            >
              {rest.map((article, idx) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.06, ease: EASE_OUT }}
                >
                <Link href={`/insights/${article.slug}/`} className="block group flex cursor-pointer gap-6 rounded-xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">
                  <div className="hidden h-24 w-36 shrink-0 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 sm:block" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">{article.displayTag}</span>
                      {article.techBadge && (
                        <span className="rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-semibold text-brand-700 dark:bg-brand-950/40 dark:text-brand-300">{article.techBadge}</span>
                      )}
                      <span className="text-xs text-slate-400 dark:text-slate-500">{article.date}</span>
                    </div>
                    <h3 className="mt-2 font-semibold text-slate-900 transition-colors dark:text-white dark:group-hover:text-brand-400">{article.title}</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{article.summary}</p>
                  </div>
                </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="mt-16 text-center">
              <p className="text-slate-500 dark:text-slate-400">{t.insights.noResults}</p>
              <button
                onClick={() => { tag.reset(); setSearchQuery(""); }}
                className="mt-4 text-sm font-semibold text-slate-400 underline underline-offset-4 hover:text-white"
              >
                {t.insights.resetFilter}
              </button>
            </div>
          )}

          {/* Closing CTA */}
          <DetailCTA
            heading={t.insights.closingCtaHeading}
            href="/contact/"
            label={t.insights.closingCtaLabel}
            variant="white"
            className="mt-16"
          />
        </div>
      </section>
    </>
  );
}
