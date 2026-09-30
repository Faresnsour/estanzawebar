import Script from "next/script";
import type { Metadata } from "next";
import { Cairo, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

// خط عربي عريض ونقي مصمم للشاشات
const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "600", "700", "800"],
  display: "swap",
});

// خط لاتيني فاخر للأرقام وتفاصيل العلامة
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.estanza.dev";
const siteUrl = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "إستانزا | محرك حجز وأتمتة استوديوهات السيارات والعيادات",
    template: "%s | Estanza",
  },
  description:
    "منظومة حجز رقمية متقدمة لمراكز وتجهيز المركبات والعيادات في عمّان. أتمتة فورية للمواعيد وتأكيد تلقائي عبر واتساب بدون اشتراكات شهرية.",
  keywords: [
    "حجز نانو سيراميك عمان",
    "تركيب PPF الأردن",
    "تظليل وعازل حراري عمان",
    "حجز عيادات ومراكز تجميل عمان",
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
    url: siteUrl,
    title: "إستانزا | محرك حجز وأتمتة استوديوهات السيارات والعيادات",
    description:
      "حوّل استفسارات إنستغرام ليلاً إلى حجوزات فحص ومواعيد مؤكدة لمركزك تلقائياً.. تأكيد فوري ومباشر على واتساب.",
    siteName: "Estanza",
  },
  twitter: {
    card: "summary_large_image",
    title: "إستانزا | محرك حجز وأتمتة استوديوهات السيارات والعيادات",
    description:
      "حوّل استفسارات إنستغرام ليلاً إلى حجوزات فحص مؤكدة لمركزك تلقائياً.",
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
      className={`${cairo.variable} ${cormorant.variable} h-full antialiased`}
    >
      {/* تصحيح لون الخلفية ليتطابق مع ألوان هوية إستانزا الفاخرة #F8FAF9 و #05221C */}
      <body className="min-h-full flex flex-col font-sans bg-[#F8FAF9] text-[#05221C] selection:bg-[#008774] selection:text-white">
        {children}

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