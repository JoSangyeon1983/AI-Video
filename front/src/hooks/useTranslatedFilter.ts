import { useState, useMemo, useCallback } from "react";

/* ============================================
   i18n 필터 변환 훅
   ─ 한국어 원본 옵션 ↔ 번역된 표시 옵션 간 양방향 매핑을 관리합니다.
   WorkClient(업종/스타일/목적), InsightsClient(태그) 등에서 공용.
   ============================================ */

interface UseTranslatedFilterReturn {
  /** 현재 선택된 한국어 원본 값 */
  selectedKo: string;
  /** 현재 선택 값의 번역된 표시 문자열 */
  displayValue: string;
  /** 번역된 값을 받아 한국어 원본으로 변환 후 선택 */
  setFromTranslated: (translated: string) => void;
  /** 한국어 원본 값을 번역된 값으로 변환 */
  translateTag: (ko: string) => string;
  /** 첫 번째 옵션(전체)으로 리셋 */
  reset: () => void;
}

export function useTranslatedFilter(
  koOptions: readonly string[],
  translatedOptions: string[],
): UseTranslatedFilterReturn {
  const [selectedKo, setSelectedKo] = useState<string>(koOptions[0]);

  /** translated → ko 매핑 */
  const koMap = useMemo(
    () => Object.fromEntries(translatedOptions.map((tr, i) => [tr, koOptions[i]])),
    [translatedOptions, koOptions],
  );

  /** 현재 선택의 번역된 표시값 */
  const displayValue = useMemo(
    () =>
      translatedOptions[(koOptions as readonly string[]).indexOf(selectedKo)] ??
      translatedOptions[0],
    [selectedKo, koOptions, translatedOptions],
  );

  const setFromTranslated = useCallback(
    (v: string) => setSelectedKo(koMap[v] ?? koOptions[0]),
    [koMap, koOptions],
  );

  const translateTag = useCallback(
    (ko: string) =>
      translatedOptions[(koOptions as readonly string[]).indexOf(ko)] ?? ko,
    [koOptions, translatedOptions],
  );

  const reset = useCallback(() => setSelectedKo(koOptions[0]), [koOptions]);

  return { selectedKo, displayValue, setFromTranslated, translateTag, reset };
}
