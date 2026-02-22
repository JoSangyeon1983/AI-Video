import type { MetadataRoute } from "next";
import { works } from "@/data/work";
import { articles } from "@/data/insights";

export const dynamic = "force-static";

const BASE_URL = "https://loomix.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  /* ── 정적 페이지 ── */
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/work/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/service/`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/solution/`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/insights/`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/story/`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/terms/`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/privacy/`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  /* ── Work 상세 페이지 ── */
  const workPages: MetadataRoute.Sitemap = works.map((w) => ({
    url: `${BASE_URL}/work/${w.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  /* ── Insights 상세 페이지 ── */
  const insightPages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE_URL}/insights/${a.slug}/`,
    lastModified: a.date.replace(/\./g, "-"),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...workPages, ...insightPages];
}
