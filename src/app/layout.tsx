import { getLocale, getServerTranslator } from "@/i18n/server";
import { LocaleProvider } from "@/i18n/LocaleProvider";
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
export async function generateMetadata(): Promise<Metadata> {
    const locale = await getLocale();
    const tr = await getServerTranslator();
    return {
        metadataBase: new URL(SITE_URL),
        title: {
            default: tr("site.estanza_booking_systems_for_automotive_centres_in"),
            template: "%s | Estanza",
        },
        description: tr("site.a_booking_page_with_your_centre_s"),
        keywords: [
            tr("site.ceramic_coating_appointments_in_amman"),
            tr("site.ppf_installation_in_jordan"),
            tr("site.window_tinting_and_heat_protection_in_amman"),
            tr("site.automotive_booking_automation"),
            tr("site.automotive_studios_in_amman"),
            "Estanza",
            tr("site.estanza"),
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
            locale: locale === "ar" ? "ar_JO" : "en_JO",
            url: SITE_URL,
            title: tr("site.estanza_booking_systems_for_automotive_centres_in"),
            description: tr("site.let_customers_choose_a_service_and_appointment"),
            siteName: "Estanza",
        },
        twitter: {
            card: "summary_large_image",
            title: tr("site.estanza_booking_systems_for_automotive_centres_in"),
            description: tr("site.a_booking_page_with_your_branding_no"),
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

        {/* Google Analytics (GA4) */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-KQ37ND6FP7" strategy="lazyOnload"/>
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag("js", new Date());
            gtag("config", "G-KQ37ND6FP7");
          `}
        </Script>
      </body>
    </html>);
}
