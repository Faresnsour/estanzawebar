import type { Metadata } from "next";
import { SITE_URL } from "@/components/lib/site";
import { getLocale } from "@/i18n/server";
import { translate } from "@/i18n/messages";
export async function pageMetadata(title: string, description: string, path: string, index = true): Promise<Metadata> {
    const locale = await getLocale();
    title = translate(locale, title);
    description = translate(locale, description);
    return {
        title,
        description,
        alternates: { canonical: `${SITE_URL}${path}` },
        openGraph: { title, description, url: `${SITE_URL}${path}`, locale: locale === "ar" ? "ar_JO" : "en_JO", type: "website" },
        twitter: { card: "summary_large_image", title, description },
        robots: { index, follow: true },
    };
}
