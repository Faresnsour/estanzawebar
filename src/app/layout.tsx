import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://estanza.net';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "إستانزا | Estanza — أنظمة حجز وأتمتة استوديوهات العناية بالمركبات",
    template: "%s | Estanza",
  },
  description: "منظومة حجز رقمية متقدمة لمراكز وتجهيز المركبات في عمّان (PPF، نانو سيراميك، عازل حراري). أتمتة فورية للمواعيد وتأكيد تلقائي عبر واتساب بدون اشتراكات شهرية.",
  keywords: [
    "حجز نانو سيراميك عمان",
    "تركيب PPF الأردن",
    "تظليل وعازل حراري عمان",
    "أتمتة حجوزات السيارات",
    "استوديو سيارات عمان",
    "Estanza",
    "إستانزا"
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
    title: "إستانزا | Estanza — أنظمة حجز وأتمتة استوديوهات النخبة للسيارات",
    description: "حوّل استفسارات إنستغرام ليلاً إلى حجوزات فحص مؤكدة لمركزك تلقائياً.. تأكيد فوري ومباشر على واتساب.",
    siteName: "Estanza",
  },
  twitter: {
    card: "summary_large_image",
    title: "إستانزا | Estanza — أنظمة حجز استوديوهات السيارات",
    description: "حوّل استفسارات إنستغرام ليلاً إلى حجوزات فحص مؤكدة لمركزك تلقائياً.",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
