import { source, getTranslator, type Locale } from "@/i18n/messages";
export const SITE_URL = new URL(process.env.NEXT_PUBLIC_SITE_URL?.startsWith("http")
    ? process.env.NEXT_PUBLIC_SITE_URL
    : `https://${process.env.NEXT_PUBLIC_SITE_URL || "www.estanza.dev"}`).origin;
export const WHATSAPP_NUMBER = "962790899175";
export const SETUP_HOURS = 72;
export const LAUNCH_PRICE = 130;
export const buildWhatsAppUrl = (message: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
export const WHATSAPP_URL = buildWhatsAppUrl(source("site.hi_estanza_i_run_an_automotive_centre"));
export const focusRing = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4";

export const localizedWhatsAppUrl = (locale: Locale) => buildWhatsAppUrl(getTranslator(locale)("site.hi_estanza_i_run_an_automotive_centre"));
