"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

interface VideoCardProps {
  title: string;
  tags: string[];
  duration: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  variant?: "service" | "solution";
  href?: string;
  onClick?: () => void;
}

/** 포트폴리오 비디오 카드 — Home/Work 공용 */
export default function VideoCard({ title, tags, duration, thumbnailUrl, videoUrl, variant = "service", href, onClick }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (!videoUrl) return;
    // 300ms 지연 후 로드 — 빠른 스크롤 시 불필요한 네트워크 방지
    hoverTimer.current = setTimeout(() => {
      setIsHovering(true);
    }, 300);
  }, [videoUrl]);

  // isHovering이 true가 되면 video.load()를 명시적으로 호출
  // (preload="none"이라 src만 바뀌면 브라우저가 자동 로딩하지 않음)
  useEffect(() => {
    if (isHovering && videoRef.current) {
      videoRef.current.load();
    }
  }, [isHovering]);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
    setIsHovering(false);
    setVideoReady(false);
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.removeAttribute("src");
      video.load();
    }
  }, []);

  const infoBgStyles =
    variant === "solution"
      ? "bg-secondary-100 dark:bg-secondary-950/40"
      : "bg-brand-100 dark:bg-brand-950/40";

  const cardContent = (
    <>
      {/* 썸네일 / 프리뷰 영역 */}
      <div className="relative aspect-video bg-gradient-to-br from-slate-200 to-brand-100 dark:from-slate-700 dark:to-brand-950">
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
            <svg
              className="h-12 w-12 text-slate-400 transition-transform group-hover:scale-110 dark:text-slate-500"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
              />
            </svg>
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
            onCanPlay={() => {
              setVideoReady(true);
              videoRef.current?.play().catch(() => {});
            }}
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 group-hover:scale-105 ${
              isHovering && videoReady ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* 호버 시 재생 아이콘 오버레이 — 프리뷰 비디오가 재생 중이면 숨김 */}
        {thumbnailUrl && !(isHovering && videoReady) && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:scale-105 group-hover:bg-black/30">
            <svg
              className="h-14 w-14 text-white opacity-0 transition-all group-hover:opacity-100 group-hover:scale-110"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
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
    const finalHref = href.endsWith("/") ? href : `${href}/`;
    return (
      <a
        href={finalHref}
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
