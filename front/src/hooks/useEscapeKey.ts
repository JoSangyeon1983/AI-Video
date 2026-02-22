import { useEffect, useCallback } from "react";

/**
 * enabled가 true일 때 ESC 키 누르면 콜백을 실행합니다.
 */
export function useEscapeKey(callback: () => void, enabled = true) {
  const handler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") callback();
    },
    [callback],
  );

  useEffect(() => {
    if (!enabled) return;
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [enabled, handler]);
}
