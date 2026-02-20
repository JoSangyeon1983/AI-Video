import type { Metadata } from "next";
import { works } from "@/data/work";
import { BRAND_NAME } from "@/data/brand";
import WorkDetailClient from "./WorkDetailClient";

/* ── SSG: 빌드 시 모든 slug에 대해 정적 페이지 생성 ── */
export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

/* ── 페이지별 SEO 메타데이터 ── */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  if (!work) return { title: "Not Found" };

  const description = work.caseDetail?.challenge?.slice(0, 155) ?? `${work.title} — ${work.industry} ${work.style} ${work.purpose}`;

  return {
    title: `${work.title} | ${BRAND_NAME}`,
    description,
    openGraph: {
      title: `${work.title} | ${BRAND_NAME}`,
      description,
      type: "video.other",
      ...(work.videoUrl && { videos: [{ url: work.videoUrl }] }),
      ...(work.thumbnailUrl && { images: [{ url: work.thumbnailUrl }] }),
    },
  };
}

/* ── 페이지 컴포넌트 (서버) ── */
export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);

  /* Schema.org VideoObject JSON-LD */
  const jsonLd = work
    ? {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: work.title,
        description: work.caseDetail?.challenge ?? work.title,
        thumbnailUrl: work.thumbnailUrl ? `https://loomix.ai${work.thumbnailUrl}` : undefined,
        contentUrl: work.videoUrl ? `https://loomix.ai${work.videoUrl}` : undefined,
        duration: `PT${work.duration.replace(":", "M")}S`,
        uploadDate: "2026-01-15",
        publisher: { "@type": "Organization", name: BRAND_NAME },
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <WorkDetailClient slug={slug} />
    </>
  );
}
