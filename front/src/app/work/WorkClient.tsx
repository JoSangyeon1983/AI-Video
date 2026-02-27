"use client";

import { useState, useMemo } from "react";
import { works, industries as koIndustries, styles as koStyles, purposes as koPurposes, STUDIO_STYLE, getServiceVariant } from "@/data/work";
import VideoCard from "@/components/ui/VideoCard";
import FilterGroup from "@/components/ui/FilterGroup";
import { DetailCTA } from "@/components/ui/DetailShared";
import { useTranslation } from "@/i18n";
import { useTranslatedFilter } from "@/hooks";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

type CategoryType = "all" | "production" | "studio";

export default function WorkClient() {
  const { t } = useTranslation();

  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");

  // i18n 필터 매핑 (useTranslatedFilter 훅으로 통합)
  const industry = useTranslatedFilter(koIndustries, t.work.industries);
  const style = useTranslatedFilter(koStyles, t.work.styles);
  const purpose = useTranslatedFilter(koPurposes, t.work.purposes);

  // Category translation for card tags
  const translateTag = useMemo(() => {
    const m = new Map<string, string>();
    koIndustries.forEach((ko, i) => m.set(ko, t.work.industries[i]));
    koStyles.forEach((ko, i) => m.set(ko, t.work.styles[i]));
    koPurposes.forEach((ko, i) => m.set(ko, t.work.purposes[i]));
    return (tag: string) => m.get(tag) || tag;
  }, [t.work.industries, t.work.styles, t.work.purposes]);

  // Category filter options
  const categoryOptions: { key: CategoryType; label: string; desc: string }[] = [
    { key: "all", label: t.work.categoryAll, desc: "" },
    { key: "production", label: t.work.categoryProduction, desc: t.work.categoryProductionDesc },
    { key: "studio", label: t.work.categoryStudio, desc: t.work.categoryStudioDesc },
  ];

  const filteredWorks = works.filter((w) => {
    // 1단계: 카테고리 필터 (Service = AI 아바타 제외, Solution = AI 아바타만)
    if (selectedCategory === "production" && w.style === STUDIO_STYLE) return false;
    if (selectedCategory === "studio" && w.style !== STUDIO_STYLE) return false;

    // 2단계: 기존 필터
    if (industry.selectedKo !== koIndustries[0] && w.industry !== industry.selectedKo) return false;
    if (style.selectedKo !== koStyles[0] && w.style !== style.selectedKo) return false;
    if (purpose.selectedKo !== koPurposes[0] && w.purpose !== purpose.selectedKo) return false;
    return true;
  });

  // 카테고리 변경 시 하위 필터 초기화
  const handleCategoryChange = (cat: CategoryType) => {
    setSelectedCategory(cat);
    industry.reset();
    style.reset();
    purpose.reset();
  };

  return (
    <>
      {/* ════════ HERO ════════ */}
      <section className="bg-white pb-8 pt-24 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white"
          >
            {t.work.heading}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE_OUT }}
            className="mt-3 text-lg text-slate-500 dark:text-slate-400"
          >
            {t.work.sub}
          </motion.p>
        </div>
      </section>

      {/* ════════ FILTER & GRID ════════ */}
      <section className="bg-white pb-24 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="sr-only">{t.work.srHeading}</h2>

          {/* Filter Bar */}
          <div className="sticky top-16 z-30 -mx-4 bg-white/90 px-4 py-4 backdrop-blur-md dark:bg-slate-950/90 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            {/* 1단계: 카테고리 탭 (All / Service / Solution) */}
            <div className="flex gap-2 border-b border-slate-200 pb-4 dark:border-slate-700">
              {categoryOptions.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => handleCategoryChange(cat.key)}
                  className={`group relative w-28 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all ${
                    selectedCategory === cat.key
                      ? cat.key === "studio"
                        ? "bg-secondary-500/15 text-secondary-300 ring-1 ring-secondary-500/30"
                        : cat.key === "production"
                        ? "bg-brand-500/15 text-brand-300 ring-1 ring-brand-500/30"
                        : "bg-white/15 text-white ring-1 ring-white/30 shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                  }`}
                  title={cat.desc}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* 2단계: 세부 필터 (업종 / 스타일 / 목적) */}
            <div className="mt-4 flex flex-wrap gap-6">
              <FilterGroup label={t.work.filterIndustry} options={t.work.industries} selected={industry.displayValue} onChange={industry.setFromTranslated} />
              <FilterGroup label={t.work.filterStyle} options={t.work.styles} selected={style.displayValue} onChange={style.setFromTranslated} />
              <FilterGroup label={t.work.filterPurpose} options={t.work.purposes} selected={purpose.displayValue} onChange={purpose.setFromTranslated} />
            </div>
          </div>

          {/* Video Grid */}
          {filteredWorks.length > 0 ? (
            <AnimatePresence mode="wait">
            <motion.div
              key={`grid-${selectedCategory}-${industry.selectedKo}-${style.selectedKo}-${purpose.selectedKo}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
              className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {filteredWorks.map((work, idx) => (
                <motion.div
                  key={work.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.06, ease: EASE_OUT }}
                >
                <VideoCard
                  title={t.work.titles[work.slug] || work.title}
                  tags={[translateTag(work.industry), translateTag(work.style), translateTag(work.purpose)]}
                  techTags={work.techTags}
                  duration={work.duration}
                  thumbnailUrl={work.thumbnailUrl}
                  videoUrl={work.videoUrl}
                  variant={getServiceVariant(work.style)}
                  href={`/work/${work.slug}`}
                />
                </motion.div>
              ))}
            </motion.div>
            </AnimatePresence>
          ) : (
            <div className="mt-16 text-center">
              <p className="text-slate-500 dark:text-slate-400">{t.work.noResults}</p>
              <button
                onClick={() => { setSelectedCategory("all"); industry.reset(); style.reset(); purpose.reset(); }}
                className="mt-4 text-sm font-semibold text-slate-400 underline underline-offset-4 hover:text-white"
              >
                {t.work.resetFilter}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ════════ CLOSING CTA ════════ */}
      <section className="bg-white py-16 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <DetailCTA
            heading={t.work.closingCtaHeading}
            href="/contact/"
            label={t.work.closingCtaLabel}
            variant="white"
            className="mt-0"
          />
        </div>
      </section>
    </>
  );
}
