import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import JsonLd from "@/components/JsonLd";
import { BRAND_NAME, BRAND_DESCRIPTION, BASE_URL } from "@/data/brand";
import { I18nProvider } from "@/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${BRAND_NAME} | ${BRAND_DESCRIPTION}`,
    template: `%s | ${BRAND_NAME}`,
  },
  description:
    "AI를 이용한 하이엔드 영상 제작 에이전시 서비스와 기업용 AI 영상 생성 SaaS 솔루션을 제공합니다.",
  icons: {
    icon: "/images/favicon.ico",
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    siteName: BRAND_NAME,
    locale: "ko_KR",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: BRAND_NAME }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <head>
        {/* hreflang for i18n — 향후 URL 기반 로케일 라우팅 도입 시 href 동적 생성 필요 */}
        <link rel="alternate" hrefLang="ko" href={`${BASE_URL}/`} />
        <link rel="alternate" hrefLang="en" href={`${BASE_URL}/`} />
        <link rel="alternate" hrefLang="ja" href={`${BASE_URL}/`} />
        <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/`} />

        {/* Organization JSON-LD — SEO/AEO/GEO: AI 기술력 + 서비스 구조화 */}
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: BRAND_NAME,
            url: BASE_URL,
            logo: `${BASE_URL}/images/logo.png`,
            description:
              "자체 AI 엔진(LX Engine)을 기반으로 하이엔드 AI 영상 제작 에이전시 서비스와 기업용 AI 영상 생성 SaaS 솔루션을 제공합니다.",
            knowsAbout: [
              "AI Video Generation",
              "LX Engine",
              "LoRA Fine-Tuning",
              "AI 영상 제작",
              "Brand-Tuned AI Video",
              "Enterprise AI SaaS",
            ],
            makesOffer: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Loomix AI Production",
                  description:
                    "LX Engine 기반 하이엔드 AI 영상 제작 에이전시 서비스",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "SoftwareApplication",
                  name: "Loomix AI Studio",
                  applicationCategory: "BusinessApplication",
                  description:
                    "기업용 AI 영상 생성 SaaS — LoRA 브랜드 튜닝, 6분 내 30초 영상 생성",
                },
              },
            ],
            parentOrganization: {
              "@type": "Organization",
              name: "CELLBIG",
              url: "https://www.cellbig.com",
            },
            address: {
              "@type": "PostalAddress",
              addressLocality: "Seoul",
              addressCountry: "KR",
            },
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "sales",
              url: `${BASE_URL}/contact`,
              availableLanguage: ["Korean", "English", "Japanese"],
            },
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <I18nProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingCTA />
        </I18nProvider>
        {/* Google Analytics — non-blocking */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JH7DMB1GM7"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-JH7DMB1GM7');`}
        </Script>
      </body>
    </html>
  );
}
