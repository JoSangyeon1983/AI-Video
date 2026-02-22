"use client";

import { useState, useEffect, useRef } from "react";
import InputField from "@/components/ui/InputField";
import { useTranslation } from "@/i18n";
import { useBodyScrollLock, useEscapeKey } from "@/hooks";

/* ── 타입 ── */
export type ContactTab = "service" | "solution";

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
  defaultTab = "service",
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
      <Overlay onClose={onClose} ariaLabel={t.contactModal.ariaLabel}>
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
            <svg
              className="h-8 w-8 text-emerald-600 dark:text-emerald-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">
            {t.contactModal.successHeading}
          </h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400">
            {t.contactModal.successSub}
          </p>
          <button
            onClick={onClose}
            className="mt-8 rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600"
          >
            {t.contactModal.close}
          </button>
        </div>
      </Overlay>
    );
  }

  /* ── 폼 화면 ── */
  return (
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
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Scrollable Body */}
      <div className="max-h-[calc(90vh-140px)] overflow-y-auto px-6 py-5">
        {/* Tab Selector */}
        <div className="flex rounded-lg border border-slate-200 p-1 dark:border-slate-700">
          {([
            { value: "service", label: t.contactModal.tabService },
            { value: "solution", label: t.contactModal.tabSolution },
          ] as const).map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setTab(opt.value as ContactTab)}
              className={`flex-1 rounded-md px-4 py-2.5 text-sm font-medium transition-colors ${
                tab === opt.value
                  ? "bg-brand-600 text-white dark:bg-brand-500 dark:text-white"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} id="contact-modal-form" className="mt-6 space-y-5">
          {/* 공통 필드 (2열 그리드) */}
          <div className="grid gap-5 sm:grid-cols-2">
            <InputField label={t.contactModal.company} name="company" required />
            <InputField label={t.contactModal.name} name="name" required />
            <InputField label={t.contactModal.email} name="email" type="email" required />
            <InputField label={t.contactModal.phone} name="phone" type="tel" />
          </div>

          {/* 제작 의뢰 탭 추가 필드 */}
          {tab === "service" && (
            <div className="space-y-5 border-t border-slate-200 pt-5 dark:border-slate-800">
              <InputField label={t.contactModal.goal} name="goal" />
              <div className="grid gap-5 sm:grid-cols-2">
                <InputField label={t.contactModal.deadline} name="deadline" placeholder={t.contactModal.deadlinePlaceholder} />
                <InputField label={t.contactModal.budget} name="budget" placeholder={t.contactModal.budgetPlaceholder} />
              </div>
              <InputField label={t.contactModal.reference} name="reference" placeholder={t.contactModal.referencePlaceholder} />
            </div>
          )}

          {/* 솔루션 도입 탭 추가 필드 */}
          {tab === "solution" && (
            <div className="space-y-5 border-t border-slate-200 pt-5 dark:border-slate-800">
              <div className="grid gap-5 sm:grid-cols-2">
                <InputField label={t.contactModal.teamSize} name="teamSize" placeholder={t.contactModal.teamSizePlaceholder} />
                <InputField label={t.contactModal.monthly} name="monthly" placeholder={t.contactModal.monthlyPlaceholder} />
              </div>
              <InputField label={t.contactModal.usePurpose} name="usePurpose" placeholder={t.contactModal.usePurposePlaceholder} />
              <InputField label={t.contactModal.features} name="features" placeholder={t.contactModal.featuresPlaceholder} />
            </div>
          )}

          {/* 문의 내용 (공통) */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              {t.contactModal.message}
            </label>
            <textarea
              name="message"
              rows={3}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              placeholder={t.contactModal.messagePlaceholder}
            />
          </div>

          {/* 파일 업로드 (공통, 선택) */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              {t.contactModal.fileLabel} <span className="font-normal text-slate-400">{t.contactModal.fileOptional}</span>
            </label>
            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
              {t.contactModal.fileHint}
            </p>
            <label className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 px-4 py-4 text-sm text-slate-500 transition-colors hover:border-brand-400 hover:text-brand-600 dark:border-slate-700 dark:text-slate-400 dark:hover:border-brand-500 dark:hover:text-brand-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
              </svg>
              <span>{t.contactModal.fileDrop}</span>
              <input type="file" name="attachment" className="hidden" accept=".pdf,.doc,.docx,.ppt,.pptx,.png,.jpg,.jpeg,.zip" />
            </label>
          </div>

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
          className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-brand-600 px-8 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-brand-500 dark:text-white dark:hover:bg-brand-600 sm:w-auto"
        >
          {submitState === "submitting" ? (
            <>
              <svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              {t.contactModal.submitting}
            </>
          ) : (
            t.contactModal.submit
          )}
        </button>
      </div>
    </Overlay>
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
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
    >
      <div
        className="relative mx-4 w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
