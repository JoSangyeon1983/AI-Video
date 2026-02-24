import { useState, useRef, useCallback, useEffect } from "react";

/* ============================================
   useVideoPreview — VideoCard용 호버 프리뷰 로직
   ─ VideoCard에서 추출하여 관심사 분리
   ============================================ */

interface UseVideoPreviewOptions {
  videoUrl?: string;
  /** 호버 → 프리뷰 시작까지 지연 시간 (ms, 기본: 300) */
  delay?: number;
}

export function useVideoPreview({ videoUrl, delay = 300 }: UseVideoPreviewOptions) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (!videoUrl) return;
    hoverTimer.current = setTimeout(() => {
      setIsHovering(true);
    }, delay);
  }, [videoUrl, delay]);

  // isHovering이 true가 되면 video.load()를 명시적으로 호출
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

  const handleCanPlay = useCallback(() => {
    setVideoReady(true);
    videoRef.current?.play().catch(() => {});
  }, []);

  return {
    videoRef,
    isHovering,
    videoReady,
    handleMouseEnter,
    handleMouseLeave,
    handleCanPlay,
  };
}
