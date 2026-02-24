"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { navItems, getNavLabelMap } from "@/data/navigation";
import { BRAND_NAME } from "@/data/brand";
import { useTranslation } from "@/i18n";
import { useBodyScrollLock } from "@/hooks";
import LanguageSelector from "@/components/LanguageSelector";
import { IconClose, IconMenu } from "@/components/ui/Icon";
import { ensureTrailingSlash, isActivePath } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 모바일 메뉴 열림 시 스크롤 방지
  useBodyScrollLock(mobileMenuOpen);

  // Map href → translated label
  const navLabelMap = getNavLabelMap(t);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200 bg-white/90 backdrop-blur-md shadow-sm dark:border-slate-800 dark:bg-slate-950/90"
          : "bg-white dark:bg-slate-950"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* 로고 */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/logo.png"
            alt={BRAND_NAME}
            width={140}
            height={32}
            className="h-8 w-auto dark:brightness-0 dark:invert"
            priority
          />
        </a>

        {/* 데스크톱 GNB */}
        <nav className="hidden lg:flex lg:items-center lg:gap-1" aria-label={t.nav.mainMenu}>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={ensureTrailingSlash(item.href)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                isActivePath(pathname, item.href)
                  ? "bg-brand-600 text-white dark:bg-brand-500 dark:text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              }`}
            >
              {navLabelMap[item.href] || item.label}
            </a>
          ))}

          {/* 문의 텍스트 링크 */}
          <a
            href="/contact/"
            className={`ml-4 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              isActivePath(pathname, "/contact")
                ? "bg-brand-600 text-white dark:bg-brand-500 dark:text-white"
                : "text-slate-500 hover:bg-slate-100 hover:text-brand-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-brand-400"
            }`}
          >
            {t.nav.contact}
          </a>

          {/* 언어 선택 */}
          <LanguageSelector />
        </nav>

        {/* 모바일 햄버거 버튼 */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 lg:hidden dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? t.nav.menuClose : t.nav.menuOpen}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <IconClose className="h-6 w-6" strokeWidth={1.5} />
          ) : (
            <IconMenu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* 모바일 풀스크린 메뉴 */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-white dark:bg-slate-950 lg:hidden">
          <nav className="flex flex-col gap-2 px-6 py-8" aria-label={t.nav.mobileMenu}>
            <a
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`rounded-lg px-4 py-3 text-lg font-medium transition-colors ${
                pathname === "/"
                  ? "bg-brand-600 text-white dark:bg-brand-500 dark:text-white"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              {t.nav.home}
            </a>

            {navItems.map((item) => (
              <a
                key={item.href}
                href={ensureTrailingSlash(item.href)}
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-lg px-4 py-3 text-lg font-medium transition-colors ${
                  isActivePath(pathname, item.href)
                    ? "bg-brand-600 text-white dark:bg-brand-500 dark:text-white"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                {navLabelMap[item.href] || item.label}
              </a>
            ))}

            {/* 모바일 메뉴 하단 CTA */}
            <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 dark:border-slate-800">
              <a
                href="/contact/?type=service"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-12 items-center justify-center rounded-lg bg-brand-600 text-sm font-semibold text-white transition-colors hover:bg-brand-700 dark:bg-brand-500 dark:text-white dark:hover:bg-brand-600"
              >
                {t.nav.serviceInquiry}
              </a>
              <a
                href="/contact/?type=solution"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-12 items-center justify-center rounded-lg border-2 border-secondary-600 text-sm font-semibold text-secondary-600 transition-colors hover:bg-secondary-50 dark:border-secondary-400 dark:text-secondary-400 dark:hover:bg-secondary-950"
              >
                {t.nav.solutionInquiry}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
