import type { Metadata } from "next";
import { articles } from "@/data/insights";
import { BRAND_NAME } from "@/data/brand";
import JsonLd from "@/components/JsonLd";
import InsightDetailClient from "./InsightDetailClient";

/* ── SSG: 빌드 시 모든 slug에 대해 정적 페이지 생성 ── */
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

/* ── 페이지별 SEO 메타데이터 ── */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return { title: "Not Found" };

  return {
    title: `${article.title} | ${BRAND_NAME}`,
    description: article.summary.slice(0, 155),
    openGraph: {
      title: `${article.title} | ${BRAND_NAME}`,
      description: article.summary.slice(0, 155),
      type: "article",
    },
  };
}

/* ── 페이지 컴포넌트 (서버) ── */
export default async function InsightDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  /* Schema.org Article JSON-LD */
  const jsonLd = article
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.summary,
        datePublished: article.date.replace(/\./g, "-"),
        author: { "@type": "Organization", name: BRAND_NAME },
        publisher: { "@type": "Organization", name: BRAND_NAME },
      }
    : null;

  return (
    <>
      {jsonLd && <JsonLd data={jsonLd} />}
      <InsightDetailClient slug={slug} />
    </>
  );
}
