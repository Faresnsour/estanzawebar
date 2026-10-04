import { getLocale, getServerTranslator } from "@/i18n/server";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import MarketingAnalytics from "@/components/MarketingAnalytics";
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
export async function generateMetadata(): Promise<Metadata> {
    const locale = await getLocale();
    const tr = await getServerTranslator();
    return {
        metadataBase: new URL(SITE_URL),
        title: {
            default: tr("clean.meta_home"),
            template: "%s | Estanza",
        },
        description: tr("clean.home_description"),
        keywords: ["Estanza", tr("clean.service_name"), tr("clean.requests"), tr("clean.quote_title")],
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
            locale: locale === "ar" ? "ar_JO" : "en_JO",
            url: SITE_URL,
            title: tr("clean.meta_home"),
            description: tr("clean.home_description"),
            siteName: "Estanza",
        },
        twitter: {
            card: "summary_large_image",
            title: tr("clean.meta_home"),
            description: tr("clean.home_description"),
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
}
export default async function RootLayout({ children, }: Readonly<{
    children: React.ReactNode;
}>) {
    const locale = await getLocale();
    return (<html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className={`${cairo.variable} h-full antialiased`}>
      {/* تصحيح لون الخلفية ليتطابق مع ألوان هوية إستانزا الفاخرة #F8FAF9 و #05221C */}
      <body className="min-h-full flex flex-col font-sans bg-[#F8FAF9] text-[#05221C] selection:bg-[#008774] selection:text-white">
        <LocaleProvider initialLocale={locale}>{children}</LocaleProvider>
        <ConversionTracking />

        <MarketingAnalytics />
      </body>
    </html>);
}
