"use client";

import InputField from "@/components/ui/InputField";
import { IconUpload } from "@/components/ui/Icon";

/* ── 공유 스타일 상수 ── */
export const TEXTAREA_CLASS =
  "mt-1 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white";

/* ── 타입 ── */
export type ContactTab = "production" | "studio";

interface ContactFormFieldsProps {
  tab: ContactTab;
  labels: {
    company: string;
    name: string;
    email: string;
    phone: string;
    goal: string;
    deadline: string;
    deadlinePh: string;
    budget: string;
    budgetPh: string;
    reference: string;
    referencePh: string;
    teamSize: string;
    teamSizePh: string;
    monthly: string;
    monthlyPh: string;
    usePurpose: string;
    usePurposePh: string;
    features: string;
    featuresPh: string;
    message: string;
    messagePh: string;
    fileLabel: string;
    fileOptional: string;
    fileHint: string;
    fileAction: string;
  };
  /** textarea 행 수 (기본: 3) */
  rows?: number;
}

/**
 * ContactFormFields — Contact 페이지와 ContactModal에서 공유하는 폼 필드 블록.
 * 공통 필드 + 탭별 조건 필드 + 메시지 + 파일 업로드를 렌더링합니다.
 */
export default function ContactFormFields({ tab, labels, rows = 3 }: ContactFormFieldsProps) {
  return (
    <>
      {/* 공통 필드 (2열 그리드) */}
      <div className="grid gap-5 sm:grid-cols-2">
        <InputField label={labels.company} name="company" required />
        <InputField label={labels.name} name="name" required />
        <InputField label={labels.email} name="email" type="email" required />
        <InputField label={labels.phone} name="phone" type="tel" />
      </div>

      {/* 제작 의뢰 추가 필드 */}
      {tab === "production" && (
        <div className="space-y-5 border-t border-slate-200 pt-5 dark:border-slate-800">
          <InputField label={labels.goal} name="goal" />
          <div className="grid gap-5 sm:grid-cols-2">
            <InputField label={labels.deadline} name="deadline" placeholder={labels.deadlinePh} />
            <InputField label={labels.budget} name="budget" placeholder={labels.budgetPh} />
          </div>
          <InputField label={labels.reference} name="reference" placeholder={labels.referencePh} />
        </div>
      )}

      {/* 스튜디오 도입 추가 필드 */}
      {tab === "studio" && (
        <div className="space-y-5 border-t border-slate-200 pt-5 dark:border-slate-800">
          <div className="grid gap-5 sm:grid-cols-2">
            <InputField label={labels.teamSize} name="teamSize" placeholder={labels.teamSizePh} />
            <InputField label={labels.monthly} name="monthly" placeholder={labels.monthlyPh} />
          </div>
          <InputField label={labels.usePurpose} name="usePurpose" placeholder={labels.usePurposePh} />
          <InputField label={labels.features} name="features" placeholder={labels.featuresPh} />
        </div>
      )}

      {/* 문의 내용 (공통) */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {labels.message}
        </label>
        <textarea
          name="message"
          rows={rows}
          className={TEXTAREA_CLASS}
          placeholder={labels.messagePh}
        />
      </div>

      {/* 파일 업로드 (공통, 선택) */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {labels.fileLabel} <span className="font-normal text-slate-400">{labels.fileOptional}</span>
        </label>
        <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
          {labels.fileHint}
        </p>
        <label className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 px-4 py-4 text-sm text-slate-500 transition-colors hover:border-slate-500 hover:text-slate-300 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-500 dark:hover:text-slate-300">
          <IconUpload className="h-5 w-5" />
          <span>{labels.fileAction}</span>
          <input type="file" name="attachment" className="hidden" accept=".pdf,.doc,.docx,.ppt,.pptx,.png,.jpg,.jpeg,.zip" />
        </label>
      </div>
    </>
  );
}
