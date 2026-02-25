"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import InfoItem from "@/components/ui/InfoItem";
import TabSelector from "@/components/ui/TabSelector";
import Button from "@/components/ui/Button";
import { IconCheck, IconChevronRight } from "@/components/ui/Icon";
import ContactFormFields, { type ContactTab } from "@/components/ui/ContactFormFields";
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
  const [purpose, setPurpose] = useState<ContactTab>("production");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const type = searchParams.get("type");
    if (type === "studio" || type === "production") {
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
            <IconCheck className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
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
                  { value: "production" as const, label: t.contact.tabProduction },
                  { value: "studio" as const, label: t.contact.tabStudio },
                ]}
                selected={purpose}
                onChange={setPurpose}
                className="mt-8"
              />

              {/* 폼 */}
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <ContactFormFields
                  tab={purpose}
                  labels={{
                    company: t.contact.company,
                    name: t.contact.managerName,
                    email: t.contact.email,
                    phone: t.contact.phone,
                    goal: t.contact.goal,
                    deadline: t.contact.deadline,
                    deadlinePh: t.contact.deadlinePh,
                    budget: t.contact.budget,
                    budgetPh: t.contact.budgetPh,
                    reference: t.contact.reference,
                    referencePh: t.contact.referencePh,
                    teamSize: t.contact.teamSize,
                    teamSizePh: t.contact.teamSizePh,
                    monthly: t.contact.monthly,
                    monthlyPh: t.contact.monthlyPh,
                    usePurpose: t.contact.usePurpose,
                    usePurposePh: t.contact.usePurposePh,
                    features: t.contact.features,
                    featuresPh: t.contact.featuresPh,
                    message: t.contact.message,
                    messagePh: t.contact.messagePh,
                    fileLabel: t.contact.fileAttach,
                    fileOptional: t.contact.fileOptional,
                    fileHint: t.contact.fileHelp,
                    fileAction: t.contact.fileAction,
                  }}
                  rows={4}
                />

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
                <IconChevronRight className="h-5 w-5 shrink-0 text-slate-400 dark:text-slate-500" />
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
