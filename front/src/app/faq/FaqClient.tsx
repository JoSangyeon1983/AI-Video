"use client";

import { useState } from "react";
import SectionContainer from "@/components/ui/SectionContainer";
import JsonLd from "@/components/JsonLd";
import { IconChevronDown } from "@/components/ui/Icon";
import { useTranslation } from "@/i18n";

export default function FaqClient() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  /* FAQ Schema JSON-LD */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <>
      {/* JSON-LD */}
      <JsonLd data={faqSchema} />

      <SectionContainer className="bg-white pt-24 pb-20 dark:bg-slate-950">
        <div className="mx-auto max-w-3xl">
          {/* 타이틀 */}
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            {t.faq.heading}
          </h1>
          <p className="mt-3 text-base text-slate-500 dark:text-slate-400">
            {t.faq.description}
          </p>

          {/* 아코디언 리스트 */}
          <div className="mt-10 divide-y divide-slate-200 rounded-xl border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
            {t.faq.faqs.map((faq, i) => (
              <div key={faq.q}>
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-900"
                  aria-expanded={openIndex === i}
                >
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    {faq.q}
                  </span>
                  <IconChevronDown
                    className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openIndex === i && (
                  <div className="px-5 pb-4">
                    <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact 유도 */}
          <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            {t.faq.contactPrompt}{" "}
            <a
              href="/contact/"
              className="font-medium text-brand-600 hover:underline dark:text-brand-400"
            >
              {t.faq.contactLink(t.brand.name)}
            </a>
          </p>
        </div>
      </SectionContainer>
    </>
  );
}
