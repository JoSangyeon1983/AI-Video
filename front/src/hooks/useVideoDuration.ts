import { useState, useEffect } from "react";

/* ============================================
   useVideoDuration — 영상 메타데이터에서 실제 재생 시간 추출
   ─ preload="metadata"로 헤더만 로드하여 경량 처리
   ============================================ */

/** 초 단위 duration을 "M:SS" 형태로 포맷 */
function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/**
 * 영상 URL로부터 실제 재생 시간을 가져옵니다.
 * @param videoUrl - 영상 파일 경로
 * @param fallback - 메타데이터 로드 전 또는 실패 시 표시할 기본값
 * @returns 포맷된 재생 시간 문자열 (예: "0:30", "1:05")
 */
export function useVideoDuration(videoUrl?: string, fallback?: string): string {
  const [duration, setDuration] = useState<string>(fallback ?? "");

  useEffect(() => {
    if (!videoUrl) return;

    const video = document.createElement("video");
    video.preload = "metadata";
    video.src = videoUrl;

    const handleMetadata = () => {
      if (video.duration && isFinite(video.duration)) {
        setDuration(formatDuration(video.duration));
      }
      cleanup();
    };

    const handleError = () => {
      cleanup();
    };

    const cleanup = () => {
      video.removeEventListener("loadedmetadata", handleMetadata);
      video.removeEventListener("error", handleError);
      video.removeAttribute("src");
      video.load();
    };

    video.addEventListener("loadedmetadata", handleMetadata);
    video.addEventListener("error", handleError);

    return cleanup;
  }, [videoUrl]);

  return duration;
}
