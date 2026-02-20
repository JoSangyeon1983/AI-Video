"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { navItems } from "@/data/navigation";
import { BRAND_NAME } from "@/data/brand";
import { useTranslation } from "@/i18n";

const familySites = [
  { name: "CELLBIG", url: "https://cellbig.com/" },
  { name: "DAMUM", url: "https://damum.kr/" },
];

export default function Footer() {
  const { t } = useTranslation();
  const [familyOpen, setFamilyOpen] = useState(false);
  const familyRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (familyRef.current && !familyRef.current.contains(e.target as Node)) {
        setFamilyOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLabelMap: Record<string, string> = {
    "/work": t.nav.work,
    "/service": t.nav.service,
    "/solution": t.nav.solution,
    "/insights": t.nav.insights,
    "/story": t.nav.story,
  };

  const footerGroups = [
    {
      title: t.footer.groupService,
      links: [
        { label: navLabelMap["/work"], href: "/work" },
        { label: navLabelMap["/service"], href: "/service" },
        { label: navLabelMap["/solution"], href: "/solution" },
      ],
    },
    {
      title: t.footer.groupCompany,
      links: [
        { label: navLabelMap["/story"], href: "/story" },
        { label: navLabelMap["/insights"], href: "/insights" },
        { label: t.footer.linkContact, href: "/contact" },
      ],
    },
    {
      title: t.footer.groupPolicy,
      links: [
        { label: t.footer.linkTerms, href: "/terms" },
        { label: t.footer.linkPrivacy, href: "/privacy" },
      ],
    },
  ];

  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* 회사 정보 */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-xl font-bold text-slate-900 dark:text-white">
              {BRAND_NAME}
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              {t.footer.desc1}
              <br />{t.footer.desc2}
            </p>
            <address className="mt-4 space-y-1 text-xs not-italic text-slate-400 dark:text-slate-500">
              <p>{t.footer.address}</p>
              <p>{t.footer.bizNumber}</p>
              <p>{t.footer.ceo}</p>
            </address>
          </div>

          {/* 링크 그룹 */}
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                {group.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 하단 */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 dark:border-slate-800 sm:flex-row">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            &copy; {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {/* Family Site 드롭다운 */}
            <div ref={familyRef} className="relative">
              <button
                onClick={() => setFamilyOpen(!familyOpen)}
                className="flex items-center gap-1 text-xs text-slate-400 transition-colors hover:text-blue-600 dark:text-slate-500 dark:hover:text-blue-400"
              >
                Family Site
                <svg
                  className={`h-3 w-3 transition-transform ${familyOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {familyOpen && (
                <div className="absolute bottom-full right-0 mb-2 w-36 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-900">
                  {familySites.map((site) => (
                    <a
                      key={site.name}
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                      onClick={() => setFamilyOpen(false)}
                    >
                      {site.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
            {/* SNS 링크 플레이스홀더 */}
            {["YouTube", "Instagram", "LinkedIn"].map((sns) => (
              <a
                key={sns}
                href="#"
                className="text-xs text-slate-400 transition-colors hover:text-blue-600 dark:text-slate-500 dark:hover:text-blue-400"
                aria-label={sns}
              >
                {sns}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
