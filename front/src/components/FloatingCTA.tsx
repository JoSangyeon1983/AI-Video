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
  const [modalTab, setModalTab] = useState<ContactTab>("production");
  const { t } = useTranslation();

  // Contact 페이지 및 케이스 상세 페이지에서는 숨김
  if (isActivePath(pathname, "/contact")) return null;
  if (pathname.startsWith("/work/") && pathname !== "/work" && pathname !== "/work/") return null;

  const openModal = (tab: ContactTab) => {
    setModalTab(tab);
    setModalOpen(true);
  };

  // 현재 페이지에 따른 active 표시
  const isProductionActive = isActivePath(pathname, "/production");
  const isStudioActive = isActivePath(pathname, "/studio");

  return (
    <>
      {/* btn-shine 애니메이션은 globals.css에 전역 정의됨 */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <button
          onClick={() => openModal("production")}
          className={`btn-shine group flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-xl ${
            isProductionActive
              ? "bg-brand-500 text-white"
              : "bg-brand-600 text-white hover:bg-brand-700 dark:bg-brand-500 dark:text-white dark:hover:bg-brand-600"
          }`}
          aria-label={t.floatingCta.productionAria}
        >
          <IconVideoCamera className="h-5 w-5 shrink-0" strokeWidth={2} />
          <span className="text-xs sm:text-sm">{t.floatingCta.productionLabel}</span>
        </button>
        <button
          onClick={() => openModal("studio")}
          className={`btn-shine group flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-xl ${
            isStudioActive
              ? "bg-secondary-500 text-white"
              : "bg-secondary-600 text-white hover:bg-secondary-700 dark:bg-secondary-500 dark:text-white dark:hover:bg-secondary-600"
          }`}
          aria-label={t.floatingCta.studioAria}
        >
          <IconFlask className="h-5 w-5 shrink-0" strokeWidth={2} />
          <span className="text-xs sm:text-sm">{t.floatingCta.studioLabel}</span>
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
