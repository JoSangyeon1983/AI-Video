"use client";

import Image from "next/image";
import { useVideoPreview } from "@/hooks";
import { IconPlay, IconPlayOutline } from "@/components/ui/Icon";
import { ensureTrailingSlash } from "@/lib/utils";

interface VideoCardProps {
  title: string;
  tags: string[];
  duration: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  variant?: "production" | "studio";
  href?: string;
  onClick?: () => void;
}

/** 포트폴리오 비디오 카드 — Home/Work 공용 */
export default function VideoCard({ title, tags, duration, thumbnailUrl, videoUrl, variant = "production", href, onClick }: VideoCardProps) {
  const {
    videoRef,
    isHovering,
    videoReady,
    handleMouseEnter,
    handleMouseLeave,
    handleCanPlay,
  } = useVideoPreview({ videoUrl });

  const infoBgStyles =
    variant === "studio"
      ? "bg-secondary-100 dark:bg-secondary-950/40"
      : "bg-brand-100 dark:bg-brand-950/40";

  const cardContent = (
    <>
      {/* 썸네일 / 프리뷰 영역 */}
      <div className="relative aspect-video bg-gradient-to-br from-slate-700 to-slate-800">
        {/* 항상 썸네일 렌더 — 프리뷰 비디오 아래에 배치 */}
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <IconPlayOutline className="h-12 w-12 text-slate-400 transition-transform group-hover:scale-110 dark:text-slate-500" />
          </div>
        )}

        {/* 호버 프리뷰 비디오 — preload="none"으로 호버 시에만 로드 */}
        {videoUrl && (
          <video
            ref={videoRef}
            src={isHovering ? videoUrl : undefined}
            muted
            loop
            playsInline
            preload="none"
            onCanPlay={handleCanPlay}
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 group-hover:scale-105 ${
              isHovering && videoReady ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* 호버 시 재생 아이콘 오버레이 — 프리뷰 비디오가 재생 중이면 숨김 */}
        {thumbnailUrl && !(isHovering && videoReady) && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:scale-105 group-hover:bg-black/30">
            <IconPlay className="h-14 w-14 text-white opacity-0 transition-all group-hover:opacity-100 group-hover:scale-110" />
          </div>
        )}
        <span className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-0.5 text-xs font-medium text-white">
          {duration}
        </span>
      </div>

      {/* 정보 영역 */}
      <div className={`p-4 ${infoBgStyles}`}>
        <h3 className="font-semibold text-slate-900 dark:text-white">{title}</h3>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-200/80 px-2.5 py-0.5 text-xs font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </>
  );

  const sharedClassName = "group cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-900";

  if (href) {
    return (
      <a
        href={ensureTrailingSlash(href)}
        className={`block ${sharedClassName}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <div
      className={sharedClassName}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === "Enter" || e.key === " ") onClick(); } : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {cardContent}
    </div>
  );
}
