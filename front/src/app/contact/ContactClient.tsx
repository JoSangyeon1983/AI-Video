"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import InputField from "@/components/ui/InputField";
import InfoItem from "@/components/ui/InfoItem";
import TabSelector from "@/components/ui/TabSelector";
import Button from "@/components/ui/Button";
import { IconCheck, IconUpload, IconChevronRight } from "@/components/ui/Icon";
import { useTranslation } from "@/i18n";

export default function ContactClient() {
  return (
    <Suspense fallback={<div className="flex min-h-[70vh] items-center justify-center"><span className="text-slate-400">...</span></div>}>
      <ContactContent />
    </Suspense>
  );
}

function ContactContent() {
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const [purpose, setPurpose] = useState("service");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const type = searchParams.get("type");
    if (type === "solution" || type === "service") {
      setPurpose(type);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-white dark:bg-slate-950">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
            <svg className="h-8 w-8 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">{t.contact.successHeading}</h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400">
            {t.contact.successSub}
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* ════════ SECTION 1: FORM ════════ */}
      <section className="bg-white pt-24 pb-24 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* 왼쪽: 폼 */}
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                {t.contact.formTitle}
              </h1>

              {/* 목적 선택 (탭) */}
              <TabSelector
                options={[
                  { value: "service" as const, label: t.contact.tabService },
                  { value: "solution" as const, label: t.contact.tabSolution },
                ]}
                selected={purpose}
                onChange={setPurpose}
                className="mt-8"
              />

              {/* 폼 */}
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                {/* 공통 필드 */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <InputField label={t.contact.company} name="company" required />
                  <InputField label={t.contact.managerName} name="name" required />
                  <InputField label={t.contact.email} name="email" type="email" required />
                  <InputField label={t.contact.phone} name="phone" type="tel" />
                </div>

                {/* 제작 의뢰 추가 필드 */}
                {purpose === "service" && (
                  <div className="space-y-5 border-t border-slate-200 pt-5 dark:border-slate-800">
                    <InputField label={t.contact.goal} name="goal" />
                    <div className="grid gap-5 sm:grid-cols-2">
                      <InputField label={t.contact.deadline} name="deadline" placeholder={t.contact.deadlinePh} />
                      <InputField label={t.contact.budget} name="budget" placeholder={t.contact.budgetPh} />
                    </div>
                    <InputField label={t.contact.reference} name="reference" placeholder={t.contact.referencePh} />
                  </div>
                )}

                {/* 솔루션 도입 추가 필드 */}
                {purpose === "solution" && (
                  <div className="space-y-5 border-t border-slate-200 pt-5 dark:border-slate-800">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <InputField label={t.contact.teamSize} name="teamSize" placeholder={t.contact.teamSizePh} />
                      <InputField label={t.contact.monthly} name="monthly" placeholder={t.contact.monthlyPh} />
                    </div>
                    <InputField label={t.contact.usePurpose} name="usePurpose" placeholder={t.contact.usePurposePh} />
                    <InputField label={t.contact.features} name="features" placeholder={t.contact.featuresPh} />
                  </div>
                )}

                {/* 문의 내용 */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t.contact.message}</label>
                  <textarea
                    name="message"
                    rows={4}
                    className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    placeholder={t.contact.messagePh}
                  />
                </div>

                {/* 파일 첨부 (공통, 선택) */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    {t.contact.fileAttach} <span className="font-normal text-slate-400">{t.contact.fileOptional}</span>
                  </label>
                  <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                    {t.contact.fileHelp}
                  </p>
                  <label className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 px-4 py-4 text-sm text-slate-500 transition-colors hover:border-brand-400 hover:text-brand-600 dark:border-slate-700 dark:text-slate-400 dark:hover:border-brand-500 dark:hover:text-brand-400">
                    <IconUpload className="h-5 w-5" />
                    <span>{t.contact.fileAction}</span>
                    <input type="file" name="attachment" className="hidden" accept=".pdf,.doc,.docx,.ppt,.pptx,.png,.jpg,.jpeg,.zip" />
                  </label>
                </div>

                <Button type="submit" variant="brand" fullWidth className="sm:w-auto">
                  {t.contact.submit}
                </Button>
              </form>
            </div>

            {/* 오른쪽: 오프라인 정보 */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {t.contact.ctaHeading(t.brand.name)}
              </h2>

              {/* FAQ */}
              <a
                href="/faq/"
                className="mt-6 flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 transition-colors hover:border-brand-300 hover:bg-brand-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-700 dark:hover:bg-slate-800"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-lg dark:bg-brand-900/40">
                    💬
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{t.contact.faqHeading}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t.contact.faqSub}</p>
                  </div>
                </div>
                <svg className="h-5 w-5 shrink-0 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </a>

              <div className="mt-8 space-y-6">
                {[
                  { icon: "📍", label: t.contact.officeAddress, value: t.contact.officeAddressValue },
                  { icon: "🕐", label: t.contact.officeHours, value: t.contact.officeHoursValue },
                  { icon: "📧", label: t.contact.officeEmail, value: t.contact.officeEmailValue },
                  { icon: "📞", label: t.contact.officePhone, value: t.contact.officePhoneValue },
                ].map((item) => (
                  <InfoItem key={item.label} icon={item.icon} label={item.label} value={item.value} />
                ))}
              </div>

              {/* Google Maps */}
              <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3166.57115051424!2d126.88123777629332!3d37.47084622960864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca499f33965d5%3A0xc01caac237a23874!2zKOyjvCnshYDruYU!5e0!3m2!1sko!2skr!4v1771581026134!5m2!1sko!2skr"
                  width="100%"
                  height="240"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={t.contact.officeAddressValue}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
