"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import ContactModal, { type ContactTab } from "@/components/ui/ContactModal";
import { useTranslation } from "@/i18n";
import { IconVideoCamera, IconFlask } from "@/components/ui/Icon";
import { isActivePath } from "@/lib/utils";

export default function FloatingCTA() {
  const pathname = usePathname();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<ContactTab>("service");
  const { t } = useTranslation();

  // Contact 페이지 및 케이스 상세 페이지에서는 숨김
  if (isActivePath(pathname, "/contact")) return null;
  if (pathname.startsWith("/work/") && pathname !== "/work" && pathname !== "/work/") return null;

  const openModal = (tab: ContactTab) => {
    setModalTab(tab);
    setModalOpen(true);
  };

  // 현재 페이지에 따른 active 표시
  const isServiceActive = isActivePath(pathname, "/service");
  const isSolutionActive = isActivePath(pathname, "/solution");

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
          <IconVideoCamera className="h-4 w-4" strokeWidth={2} />
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
          <IconFlask className="h-4 w-4" strokeWidth={2} />
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
