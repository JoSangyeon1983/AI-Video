import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { BRAND_NAME, BRAND_DESCRIPTION } from "@/data/brand";
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
  metadataBase: new URL("https://loomix.ai"),
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
    canonical: "https://loomix.ai",
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
    <html lang="ko">
      <head>
        {/* hreflang for i18n — 향후 URL 기반 로케일 라우팅 도입 시 href 동적 생성 필요 */}
        <link rel="alternate" hrefLang="ko" href="https://loomix.ai/" />
        <link rel="alternate" hrefLang="en" href="https://loomix.ai/" />
        <link rel="alternate" hrefLang="ja" href="https://loomix.ai/" />
        <link rel="alternate" hrefLang="x-default" href="https://loomix.ai/" />
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
