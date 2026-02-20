"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { navItems } from "@/data/navigation";
import { BRAND_NAME } from "@/data/brand";
import { useTranslation } from "@/i18n";
import LanguageSelector from "@/components/LanguageSelector";

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
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  // Map href → translated label
  const navLabelMap: Record<string, string> = {
    "/work": t.nav.work,
    "/service": t.nav.service,
    "/solution": t.nav.solution,
    "/insights": t.nav.insights,
    "/story": t.nav.story,
  };

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
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/logo.png"
            alt={BRAND_NAME}
            width={140}
            height={32}
            className="h-8 w-auto dark:brightness-0 dark:invert"
            priority
          />
        </Link>

        {/* 데스크톱 GNB */}
        <nav className="hidden lg:flex lg:items-center lg:gap-1" aria-label={t.nav.mainMenu}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "bg-blue-600 text-white dark:bg-blue-500 dark:text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              }`}
            >
              {navLabelMap[item.href] || item.label}
            </Link>
          ))}

          {/* 문의 텍스트 링크 */}
          <Link
            href="/contact"
            className={`ml-4 text-sm font-medium transition-colors ${
              pathname === "/contact"
                ? "text-blue-600 dark:text-blue-400"
                : "text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
            }`}
          >
            {t.nav.contact}
          </Link>

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
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* 모바일 풀스크린 메뉴 */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-white dark:bg-slate-950 lg:hidden">
          <nav className="flex flex-col gap-2 px-6 py-8" aria-label={t.nav.mobileMenu}>
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`rounded-lg px-4 py-3 text-lg font-medium transition-colors ${
                pathname === "/"
                  ? "bg-blue-600 text-white dark:bg-blue-500 dark:text-white"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              {t.nav.home}
            </Link>

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-lg px-4 py-3 text-lg font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-blue-600 text-white dark:bg-blue-500 dark:text-white"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                {navLabelMap[item.href] || item.label}
              </Link>
            ))}

            {/* 모바일 메뉴 하단 CTA */}
            <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 dark:border-slate-800">
              <Link
                href="/contact?type=service"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-12 items-center justify-center rounded-lg bg-blue-600 text-sm font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:text-white dark:hover:bg-blue-600"
              >
                {t.nav.serviceInquiry}
              </Link>
              <Link
                href="/contact?type=solution"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-12 items-center justify-center rounded-lg border-2 border-violet-600 text-sm font-semibold text-violet-600 transition-colors hover:bg-violet-50 dark:border-violet-400 dark:text-violet-400 dark:hover:bg-violet-950"
              >
                {t.nav.solutionInquiry}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
