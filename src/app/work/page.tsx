"use client";

import { useState, useMemo } from "react";
import { works, industries as koIndustries, styles as koStyles, purposes as koPurposes } from "@/data/work";
import VideoCard from "@/components/ui/VideoCard";
import FilterGroup from "@/components/ui/FilterGroup";
import { useTranslation } from "@/i18n";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/motion/ScrollReveal";
import { motion } from "framer-motion";

type CategoryType = "all" | "service" | "solution";

export default function WorkPage() {
  const { t } = useTranslation();

  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");
  const [selectedIndustry, setSelectedIndustry] = useState<string>(koIndustries[0]);
  const [selectedStyle, setSelectedStyle] = useState<string>(koStyles[0]);
  const [selectedPurpose, setSelectedPurpose] = useState<string>(koPurposes[0]);

  // Korean → translated display mapping
  const trIndustries = t.work.industries;
  const trStyles = t.work.styles;
  const trPurposes = t.work.purposes;

  const industryKoMap = useMemo(() => Object.fromEntries(trIndustries.map((tr, i) => [tr, koIndustries[i]])), [trIndustries]);
  const styleKoMap = useMemo(() => Object.fromEntries(trStyles.map((tr, i) => [tr, koStyles[i]])), [trStyles]);
  const purposeKoMap = useMemo(() => Object.fromEntries(trPurposes.map((tr, i) => [tr, koPurposes[i]])), [trPurposes]);

  // Category translation for card tags
  const categoryMap = useMemo(() => {
    const m = new Map<string, string>();
    koIndustries.forEach((ko, i) => m.set(ko, trIndustries[i]));
    koStyles.forEach((ko, i) => m.set(ko, trStyles[i]));
    koPurposes.forEach((ko, i) => m.set(ko, trPurposes[i]));
    return m;
  }, [trIndustries, trStyles, trPurposes]);

  const translateTag = (tag: string) => categoryMap.get(tag) || tag;

  const displayIndustry = trIndustries[(koIndustries as readonly string[]).indexOf(selectedIndustry)] ?? trIndustries[0];
  const displayStyle = trStyles[(koStyles as readonly string[]).indexOf(selectedStyle)] ?? trStyles[0];
  const displayPurpose = trPurposes[(koPurposes as readonly string[]).indexOf(selectedPurpose)] ?? trPurposes[0];

  // Category filter options
  const categoryOptions: { key: CategoryType; label: string; desc: string }[] = [
    { key: "all", label: t.work.categoryAll, desc: "" },
    { key: "service", label: t.work.categoryService, desc: t.work.categoryServiceDesc },
    { key: "solution", label: t.work.categorySolution, desc: t.work.categorySolutionDesc },
  ];

  const filteredWorks = works.filter((w) => {
    // 1단계: 카테고리 필터 (Service = AI 아바타 제외, Solution = AI 아바타만)
    if (selectedCategory === "service" && w.style === "AI 아바타") return false;
    if (selectedCategory === "solution" && w.style !== "AI 아바타") return false;

    // 2단계: 기존 필터
    if (selectedIndustry !== koIndustries[0] && w.industry !== selectedIndustry) return false;
    if (selectedStyle !== koStyles[0] && w.style !== selectedStyle) return false;
    if (selectedPurpose !== koPurposes[0] && w.purpose !== selectedPurpose) return false;
    return true;
  });

  // 카테고리 변경 시 하위 필터 초기화
  const handleCategoryChange = (cat: CategoryType) => {
    setSelectedCategory(cat);
    setSelectedIndustry(koIndustries[0]);
    setSelectedStyle(koStyles[0]);
    setSelectedPurpose(koPurposes[0]);
  };

  return (
    <>
      {/* ════════ HERO ════════ */}
      <section className="bg-white pb-8 pt-24 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white"
          >
            {t.work.heading}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
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
                      ? "bg-blue-600 text-white shadow-md dark:bg-blue-500"
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
              <FilterGroup label={t.work.filterIndustry} options={trIndustries} selected={displayIndustry} onChange={(v) => setSelectedIndustry(industryKoMap[v] ?? koIndustries[0])} />
              <FilterGroup label={t.work.filterStyle} options={trStyles} selected={displayStyle} onChange={(v) => setSelectedStyle(styleKoMap[v] ?? koStyles[0])} />
              <FilterGroup label={t.work.filterPurpose} options={trPurposes} selected={displayPurpose} onChange={(v) => setSelectedPurpose(purposeKoMap[v] ?? koPurposes[0])} />
            </div>
          </div>

          {/* Video Grid */}
          {filteredWorks.length > 0 ? (
            <StaggerContainer stagger={0.08} className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredWorks.map((work) => (
                <StaggerItem key={work.id}>
                <VideoCard
                  title={t.work.titles[work.slug] || work.title}
                  tags={[translateTag(work.industry), translateTag(work.style), translateTag(work.purpose)]}
                  duration={work.duration}
                  thumbnailUrl={work.thumbnailUrl}
                  videoUrl={work.videoUrl}
                  variant={work.style === "AI 아바타" ? "solution" : "service"}
                  href={`/work/${work.slug}`}
                />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <div className="mt-16 text-center">
              <p className="text-slate-500 dark:text-slate-400">{t.work.noResults}</p>
              <button
                onClick={() => { setSelectedCategory("all"); setSelectedIndustry(koIndustries[0]); setSelectedStyle(koStyles[0]); setSelectedPurpose(koPurposes[0]); }}
                className="mt-4 text-sm font-semibold text-blue-600 underline underline-offset-4 dark:text-blue-400"
              >
                {t.work.resetFilter}
              </button>
            </div>
          )}
        </div>
      </section>

    </>
  );
}
