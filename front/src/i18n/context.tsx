"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import type { Locale, Translation } from "./types";
import { ko } from "./translations/ko";

/* ── 번역 맵 (lazy import) ── */
const translationMap: Record<Locale, () => Promise<Translation>> = {
  ko: () => Promise.resolve(ko),
  en: () => import("./translations/en").then((m) => m.en),
  ja: () => import("./translations/ja").then((m) => m.ja),
};

/* ── Context ── */
interface I18nContextValue {
  locale: Locale;
  t: Translation;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

/* ── Provider ── */
const STORAGE_KEY = "loomix-locale";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ko");
  const [translations, setTranslations] = useState<Translation>(ko);

  // localStorage에서 저장된 언어 복원
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved && saved !== "ko" && translationMap[saved]) {
      setLocaleState(saved);
      translationMap[saved]().then(setTranslations);
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(STORAGE_KEY, newLocale);
    document.documentElement.lang = newLocale;
    translationMap[newLocale]().then(setTranslations);
  }, []);

  // html lang 초기 동기화
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, t: translations, setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

/* ── Hook ── */
export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useTranslation must be used within I18nProvider");
  return ctx;
}
