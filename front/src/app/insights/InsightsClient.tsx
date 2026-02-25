"use client";

import { useState, useMemo } from "react";
import { articles as rawArticles, tags as koTags } from "@/data/insights";
import Button from "@/components/ui/Button";
import { useTranslation } from "@/i18n";
import { motion, AnimatePresence } from "framer-motion";

export default function InsightsClient() {
  const { t } = useTranslation();
  const trTags = t.insights.tags;

  const [selectedTag, setSelectedTag] = useState<string>(koTags[0]);
  const [searchQuery, setSearchQuery] = useState("");

  // Tag mapping: translated → Korean
  const tagKoMap = useMemo(() => Object.fromEntries(trTags.map((tr, i) => [tr, koTags[i]])), [trTags]);
  const displayTag = trTags[(koTags as readonly string[]).indexOf(selectedTag)] ?? trTags[0];

  // Build translated articles
  const articles = rawArticles.map((a, i) => ({
    ...a,
    title: t.insights.articles[i]?.title ?? a.title,
    summary: t.insights.articles[i]?.summary ?? a.summary,
    displayTag: trTags[(koTags as readonly string[]).indexOf(a.tag)] ?? a.tag,
  }));

  const filtered = articles.filter((a) => {
    if (selectedTag !== koTags[0] && a.tag !== selectedTag) return false;
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
  const filterKey = `${selectedTag}-${searchQuery}`;

  return (
    <>
      {/* ════════ HERO & TAG NAV ════════ */}
      <section className="bg-white pt-24 pb-8 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white"
          >
            {t.insights.heading}
          </motion.h1>

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
              className="w-full max-w-md rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500"
            />
          </motion.div>

          {/* Tag Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {trTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tagKoMap[tag] ?? koTags[0])}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  displayTag === tag
                    ? "bg-white text-slate-900"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                }`}
              >
                {tag}
              </button>
            ))}
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
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className={`mt-8 grid gap-6 ${featured.length >= 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-1 max-w-3xl'}`}
            >
              {featured.map((article, idx) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
                >
                <a href={`/insights/${article.slug}/`} className="block group cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                  <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-700" />
                  <div className="p-6">
                    <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-medium text-slate-300">{article.displayTag}</span>
                    <h3 className="mt-3 text-xl font-bold text-slate-900 group-hover:text-white dark:text-white">{article.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{article.summary}</p>
                    <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">{article.date}</p>
                  </div>
                </a>
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
                  transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
                >
                <a href={`/insights/${article.slug}/`} className="block group flex cursor-pointer gap-6 rounded-xl border border-slate-200 bg-white p-6 transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                  <div className="hidden h-24 w-36 shrink-0 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 sm:block" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">{article.displayTag}</span>
                      <span className="text-xs text-slate-400 dark:text-slate-500">{article.date}</span>
                    </div>
                    <h3 className="mt-2 font-semibold text-slate-900 group-hover:text-white dark:text-white">{article.title}</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{article.summary}</p>
                  </div>
                </a>
                </motion.div>
              ))}
            </motion.div>
          )}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="mt-16 text-center">
              <p className="text-slate-500 dark:text-slate-400">{t.insights.noResults}</p>
              <button
                onClick={() => { setSelectedTag(koTags[0]); setSearchQuery(""); }}
                className="mt-4 text-sm font-semibold text-slate-400 underline underline-offset-4 hover:text-white"
              >
                {t.insights.resetFilter}
              </button>
            </div>
          )}

          {/* Closing CTA */}
          <div className="mt-16 rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t.insights.closingCtaHeading}</h3>
            <Button as="a" href="/contact/" variant="white" className="mt-4">
              {t.insights.closingCtaLabel}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
