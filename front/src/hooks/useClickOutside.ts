import { useEffect, useRef, type RefObject } from "react";

/**
 * 지정한 ref 영역 바깥 클릭 시 콜백을 실행합니다.
 */
export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  callback: () => void,
) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callbackRef.current();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [ref]);
}
