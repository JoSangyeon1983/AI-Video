"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import InputField from "@/components/ui/InputField";
import InfoItem from "@/components/ui/InfoItem";
import { useTranslation } from "@/i18n";

export default function ContactPage() {
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
              <div className="mt-8 flex rounded-lg border border-slate-200 p-1 dark:border-slate-700">
                {[
                  { value: "service", label: t.contact.tabService },
                  { value: "solution", label: t.contact.tabSolution },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setPurpose(opt.value)}
                    className={`flex-1 rounded-md px-4 py-2.5 text-sm font-medium transition-colors ${
                      purpose === opt.value
                        ? "bg-blue-600 text-white dark:bg-blue-500 dark:text-white"
                        : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

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
                    className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
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
                  <label className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 px-4 py-4 text-sm text-slate-500 transition-colors hover:border-blue-400 hover:text-blue-600 dark:border-slate-700 dark:text-slate-400 dark:hover:border-blue-500 dark:hover:text-blue-400">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                    <span>{t.contact.fileAction}</span>
                    <input type="file" name="attachment" className="hidden" accept=".pdf,.doc,.docx,.ppt,.pptx,.png,.jpg,.jpeg,.zip" />
                  </label>
                </div>

                <button
                  type="submit"
                  className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-blue-600 px-8 text-sm font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:text-white dark:hover:bg-blue-600 sm:w-auto"
                >
                  {t.contact.submit}
                </button>
              </form>
            </div>

            {/* 오른쪽: 오프라인 정보 */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {t.contact.ctaHeading(t.brand.name)}
              </h2>

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

              {/* FAQ */}
              <div className="mt-10">
                <h3 className="font-semibold text-slate-900 dark:text-white">{t.contact.faqHeading}</h3>
                <div className="mt-4 space-y-4">
                  {t.contact.faqs.map((faq) => (
                    <div key={faq.q} className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{faq.q}</p>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
