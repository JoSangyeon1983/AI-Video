"use client";

import { useState, useRef } from "react";
import { useTranslation } from "@/i18n";
import type { Locale } from "@/i18n";
import { useClickOutside } from "@/hooks";
import { IconGlobe, IconChevronDown } from "@/components/ui/Icon";

const localeLabels: Record<Locale, string> = {
  ko: "한국어",
  en: "English",
  ja: "日本語",
};

const localeList: Locale[] = ["ko", "en", "ja"];

export default function LanguageSelector() {
  const { locale, setLocale } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 닫기
  useClickOutside(ref, () => setOpen(false));

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Language"
      >
        {/* Globe icon */}
        <IconGlobe />
        <span className="hidden sm:inline">{localeLabels[locale]}</span>
        <IconChevronDown className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-50 mt-1 w-32 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-900"
        >
          {localeList.map((l) => (
            <li key={l}>
              <button
                role="option"
                aria-selected={locale === l}
                onClick={() => { setLocale(l); setOpen(false); }}
                className={`flex w-full items-center px-4 py-2 text-sm transition-colors ${
                  locale === l
                    ? "bg-white/10 font-semibold text-white"
                    : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                {localeLabels[l]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
