import Script from "next/script";
import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { SITE_URL } from "@/components/lib/site";
import ConversionTracking from "@/components/ConversionTracking";
import "./globals.css";

// خط عربي عريض ونقي مصمم للشاشات
const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Estanza | نظام حجز لمراكز السيارات في الأردن",
    template: "%s | Estanza",
  },
  description:
    "نظام حجز بهوية مركزك يعرض الخدمات والأسعار ويجمع تفاصيل العميل والسيارة عبر واتساب. لمراكز واستوديوهات السيارات في الأردن.",
  keywords: [
    "حجز نانو سيراميك عمان",
    "تركيب PPF الأردن",
    "تظليل وعازل حراري عمان",
    "أتمتة حجوزات السيارات",
    "استوديو سيارات عمان",
    "Estanza",
    "إستانزا",
  ],
  authors: [{ name: "Estanza Team" }],
  creator: "Estanza",
  publisher: "Estanza",
  formatDetection: {
    telephone: true,
    email: false,
    address: false,
  },
  openGraph: {
    type: "website",
    locale: "ar_JO",
    url: SITE_URL,
    title: "Estanza | نظام حجز لمراكز السيارات في الأردن",
    description:
      "خلّي عميلك يختار الخدمة والموعد، واستلم التفاصيل مرتبة على واتساب.",
    siteName: "Estanza",
  },
  twitter: {
    card: "summary_large_image",
    title: "Estanza | نظام حجز لمراكز السيارات في الأردن",
    description:
      "صفحة حجز بهوية مركزك، بدون تطبيق أو حساب للعميل.",
  },
  icons: {
      icon: "/icon.svg?v=3",
      apple: "/icon.svg?v=3",
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
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={`${cairo.variable} h-full antialiased`}
    >
      {/* تصحيح لون الخلفية ليتطابق مع ألوان هوية إستانزا الفاخرة #F8FAF9 و #05221C */}
      <body className="min-h-full flex flex-col font-sans bg-[#F8FAF9] text-[#05221C] selection:bg-[#008774] selection:text-white">
        {children}
        <ConversionTracking />

        {/* Google Analytics (GA4) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KQ37ND6FP7"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag("js", new Date());
            gtag("config", "G-KQ37ND6FP7");
          `}
        </Script>
      </body>
    </html>
  );
}