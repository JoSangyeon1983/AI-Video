"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { articles as rawArticles, tags as koTags } from "@/data/insights";
import { useTranslation } from "@/i18n";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/motion/ScrollReveal";
import { motion } from "framer-motion";

export default function InsightsPage() {
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
    if (searchQuery && !a.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const featured = filtered.filter((a) => a.featured);
  const rest = filtered.filter((a) => !a.featured);

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
              className="w-full max-w-md rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500"
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
                    ? "bg-blue-600 text-white dark:bg-blue-500 dark:text-white"
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
          {featured.length > 0 && (
            <StaggerContainer stagger={0.15} className="mt-8 grid gap-6 lg:grid-cols-2">
              {featured.map((article) => (
                <StaggerItem key={article.id}>
                <Link href={`/insights/${article.slug}`}>
                <article className="group cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-violet-100 dark:from-blue-950/30 dark:to-violet-950/20" />
                  <div className="p-6">
                    <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">{article.displayTag}</span>
                    <h3 className="mt-3 text-xl font-bold text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">{article.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{article.summary}</p>
                    <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">{article.date}</p>
                  </div>
                </article>
                </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}

          {/* Article List */}
          {rest.length > 0 && (
            <StaggerContainer stagger={0.08} className="mt-8 space-y-4">
              {rest.map((article) => (
                <StaggerItem key={article.id} direction="left" distance={20}>
                <Link href={`/insights/${article.slug}`}>
                <article className="group flex cursor-pointer gap-6 rounded-xl border border-slate-200 bg-white p-6 transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                  <div className="hidden h-24 w-36 shrink-0 rounded-lg bg-gradient-to-br from-slate-200 to-blue-100 sm:block dark:from-slate-700 dark:to-blue-950" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">{article.displayTag}</span>
                      <span className="text-xs text-slate-400 dark:text-slate-500">{article.date}</span>
                    </div>
                    <h3 className="mt-2 font-semibold text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">{article.title}</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{article.summary}</p>
                  </div>
                </article>
                </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}

          {filtered.length === 0 && (
            <div className="mt-16 text-center">
              <p className="text-slate-500 dark:text-slate-400">{t.insights.noResults}</p>
              <button
                onClick={() => { setSelectedTag(koTags[0]); setSearchQuery(""); }}
                className="mt-4 text-sm font-semibold text-blue-600 underline underline-offset-4 dark:text-blue-400"
              >
                {t.insights.resetFilter}
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
