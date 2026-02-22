"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import ContactModal, { type ContactTab } from "@/components/ui/ContactModal";
import { useTranslation } from "@/i18n";

export default function FloatingCTA() {
  const pathname = usePathname();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<ContactTab>("service");
  const { t } = useTranslation();

  // Contact 페이지 및 케이스 상세 페이지에서는 숨김
  if (pathname === "/contact" || pathname === "/contact/") return null;
  if (pathname.startsWith("/work/") && pathname !== "/work" && pathname !== "/work/") return null;

  const openModal = (tab: ContactTab) => {
    setModalTab(tab);
    setModalOpen(true);
  };

  // 현재 페이지에 따른 active 표시
  const isServiceActive = pathname === "/service" || pathname === "/service/";
  const isSolutionActive = pathname === "/solution" || pathname === "/solution/";

  return (
    <>
      {/* btn-shine 애니메이션은 globals.css에 전역 정의됨 */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <button
          onClick={() => openModal("service")}
          className={`btn-shine group flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-xl ${
            isServiceActive
              ? "bg-brand-500 text-white"
              : "bg-brand-600 text-white hover:bg-brand-700 dark:bg-brand-500 dark:text-white dark:hover:bg-brand-600"
          }`}
          aria-label={t.floatingCta.serviceAria}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
          <span className="hidden sm:inline">{t.floatingCta.serviceLabel}</span>
        </button>
        <button
          onClick={() => openModal("solution")}
          className={`btn-shine group flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-xl ${
            isSolutionActive
              ? "bg-secondary-500 text-white"
              : "bg-secondary-600 text-white hover:bg-secondary-700 dark:bg-secondary-500 dark:text-white dark:hover:bg-secondary-600"
          }`}
          aria-label={t.floatingCta.solutionAria}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
          </svg>
          <span className="hidden sm:inline">{t.floatingCta.solutionLabel}</span>
        </button>
      </div>

      {/* 문의 모달 */}
      <ContactModal
        isOpen={modalOpen}
        defaultTab={modalTab}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
