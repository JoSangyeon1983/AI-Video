"use client";

import { useEffect, useCallback } from "react";
import { useTranslation } from "@/i18n";

export interface VideoModalData {
  title: string;
  videoUrl?: string;
  tags?: string[];
  duration?: string;
  ctaType?: "service" | "solution"; // CTA 타입
}

interface VideoModalProps {
  data: VideoModalData | null;
  onClose: () => void;
  onCtaClick?: (type: "service" | "solution") => void; // CTA 클릭 콜백
}

/** 비디오 모달 플레이어 — Work/Home 공용 */
export default function VideoModal({ data, onClose, onCtaClick }: VideoModalProps) {
  const { t } = useTranslation();

  const handleCtaClick = () => {
    if (data?.ctaType && onCtaClick) {
      onClose(); // 모달 닫기
      // 약간의 딜레이 후 ContactModal 열기 (모달 전환 애니메이션)
      setTimeout(() => {
        onCtaClick(data.ctaType!);
      }, 100);
    }
  };

  // ESC 키로 닫기
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!data) return;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [data, handleKeyDown]);

  if (!data) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={data.title}
    >
      <div
        className="relative mx-4 w-full max-w-4xl overflow-hidden rounded-2xl bg-slate-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
          aria-label={t.videoModal.close}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* 비디오 영역 */}
        <div className="aspect-video w-full bg-black">
          {data.videoUrl ? (
            <video
              src={data.videoUrl}
              controls
              autoPlay
              className="h-full w-full object-contain"
            >
              {t.videoModal.videoNotSupported}
            </video>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-4">
              <svg
                className="h-16 w-16 text-slate-500"
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
              <p className="text-sm text-slate-400">{t.videoModal.videoNotReady}</p>
            </div>
          )}
        </div>

        {/* 하단 정보 */}
        <div className="px-6 py-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">{data.title}</h3>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {data.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-blue-950/50 px-2.5 py-0.5 text-xs font-medium text-blue-400"
                  >
                    {tag}
                  </span>
                ))}
                {data.duration && (
                  <span className="ml-auto text-sm text-slate-400">{data.duration}</span>
                )}
              </div>
            </div>
            {/* CTA 버튼 */}
            {data.ctaType && onCtaClick && (
              <button
                onClick={handleCtaClick}
                className={`shrink-0 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-colors ${
                  data.ctaType === "solution"
                    ? "bg-violet-600 hover:bg-violet-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {data.ctaType === "solution" ? t.videoModal.ctaSolution : t.videoModal.ctaService}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
