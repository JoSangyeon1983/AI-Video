import { useEffect } from "react";

/**
 * isLocked가 true일 때 document.body 스크롤을 잠급니다.
 */
export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    document.body.style.overflow = isLocked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLocked]);
}
