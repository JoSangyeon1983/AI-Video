"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TabSelector from "@/components/ui/TabSelector";
import ContactFormFields, { type ContactTab } from "@/components/ui/ContactFormFields";
import { IconCheck, IconClose, IconSpinner } from "@/components/ui/Icon";
import { useTranslation } from "@/i18n";
import { useBodyScrollLock, useEscapeKey } from "@/hooks";

/* ── 타입 ── */
export type { ContactTab };

interface ContactModalProps {
  isOpen: boolean;
  defaultTab?: ContactTab;
  onClose: () => void;
}

type SubmitState = "idle" | "submitting" | "success" | "error";

/* ════════════════════════════════════════════
   ContactModal — Floating CTA 전용 문의 모달
   ════════════════════════════════════════════ */
export default function ContactModal({
  isOpen,
  defaultTab = "production",
  onClose,
}: ContactModalProps) {
  const [tab, setTab] = useState<ContactTab>(defaultTab);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const { t } = useTranslation();

  /* defaultTab이 바뀔 때(Floating 버튼이 다를 때) 탭 동기화 */
  useEffect(() => {
    if (isOpen) {
      setTab(defaultTab);
      setSubmitState("idle");
      setErrorMsg("");
      formRef.current?.reset();
    }
  }, [isOpen, defaultTab]);

  /* ESC 닫기 + 스크롤 잠금 */
  useEscapeKey(onClose, isOpen);
  useBodyScrollLock(isOpen);

  /* 폼 제출 */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitState("submitting");
    setErrorMsg("");

    try {
      // TODO: 실제 API 연동 시 fetch/axios 호출로 교체
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setSubmitState("success");
    } catch {
      setSubmitState("error");
      setErrorMsg(t.contactModal.errorDefault);
    }
  };

  if (!isOpen) return null;

  /* ── 성공 화면 ── */
  if (submitState === "success") {
    return (
      <AnimatePresence>
      <Overlay onClose={onClose} ariaLabel={t.contactModal.ariaLabel}>
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
            <IconCheck className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">
            {t.contactModal.successHeading}
          </h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400">
            {t.contactModal.successSub}
          </p>
          <button
            onClick={onClose}
            className="mt-8 rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-200"
          >
            {t.contactModal.close}
          </button>
        </div>
      </Overlay>
      </AnimatePresence>
    );
  }

  /* ── 폼 화면 ── */
  return (
    <AnimatePresence>
    <Overlay onClose={onClose} ariaLabel={t.contactModal.ariaLabel}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-700">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          {t.contactModal.heading}
        </h2>
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
          aria-label={t.contactModal.close}
        >
          <IconClose />
        </button>
      </div>

      {/* Scrollable Body */}
      <div className="max-h-[calc(90vh-140px)] overflow-y-auto px-6 py-5">
        {/* Tab Selector */}
        <TabSelector
          options={[
            { value: "production" as ContactTab, label: t.contactModal.tabProduction },
            { value: "studio" as ContactTab, label: t.contactModal.tabStudio },
          ]}
          selected={tab}
          onChange={(v) => setTab(v as ContactTab)}
        />

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} id="contact-modal-form" className="mt-6 space-y-5">
          <ContactFormFields
            tab={tab}
            labels={{
              company: t.contactModal.company,
              name: t.contactModal.name,
              email: t.contactModal.email,
              phone: t.contactModal.phone,
              goal: t.contactModal.goal,
              deadline: t.contactModal.deadline,
              deadlinePh: t.contactModal.deadlinePlaceholder,
              budget: t.contactModal.budget,
              budgetPh: t.contactModal.budgetPlaceholder,
              reference: t.contactModal.reference,
              referencePh: t.contactModal.referencePlaceholder,
              teamSize: t.contactModal.teamSize,
              teamSizePh: t.contactModal.teamSizePlaceholder,
              monthly: t.contactModal.monthly,
              monthlyPh: t.contactModal.monthlyPlaceholder,
              usePurpose: t.contactModal.usePurpose,
              usePurposePh: t.contactModal.usePurposePlaceholder,
              features: t.contactModal.features,
              featuresPh: t.contactModal.featuresPlaceholder,
              message: t.contactModal.message,
              messagePh: t.contactModal.messagePlaceholder,
              fileLabel: t.contactModal.fileLabel,
              fileOptional: t.contactModal.fileOptional,
              fileHint: t.contactModal.fileHint,
              fileAction: t.contactModal.fileDrop,
            }}
          />

          {/* 에러 메시지 */}
          {submitState === "error" && (
            <div className="rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-600 dark:bg-rose-950/30 dark:text-rose-400">
              {errorMsg}
            </div>
          )}
        </form>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 px-6 py-4 dark:border-slate-700">
        <button
          type="submit"
          form="contact-modal-form"
          disabled={submitState === "submitting"}
          className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-white px-8 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {submitState === "submitting" ? (
            <>
              <IconSpinner className="mr-2 h-4 w-4 animate-spin" />
              {t.contactModal.submitting}
            </>
          ) : (
            t.contactModal.submit
          )}
        </button>
      </div>
    </Overlay>
    </AnimatePresence>
  );
}

/* ── Overlay 래퍼 ── */
function Overlay({
  children,
  onClose,
  ariaLabel,
}: {
  children: React.ReactNode;
  onClose: () => void;
  ariaLabel?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-4 w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
