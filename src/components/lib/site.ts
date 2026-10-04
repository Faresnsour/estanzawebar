import { source, getTranslator, type Locale } from "@/i18n/messages";
export const SITE_URL = new URL(process.env.NEXT_PUBLIC_SITE_URL?.startsWith("http")
    ? process.env.NEXT_PUBLIC_SITE_URL
    : `https://${process.env.NEXT_PUBLIC_SITE_URL || "www.estanza.dev"}`).origin;
export const WHATSAPP_NUMBER = "962790899175";
export const SETUP_HOURS = 72;
export const CORE_PRICE = 290;
export const PRO_PRICE = 449;
export const buildWhatsAppUrl = (message: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
export const WHATSAPP_URL = buildWhatsAppUrl(source("clean.contact_message"));
export const focusRing = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4";

export const localizedWhatsAppUrl = (locale: Locale) => buildWhatsAppUrl(getTranslator(locale)("clean.contact_message"));
