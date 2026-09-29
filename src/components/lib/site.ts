/** ثوابت مشتركة بين Navbar و Hero — عدّلها من مكان واحد */

export const EASE = [0.16, 1, 0.3, 1] as const;

export const WHATSAPP_NUMBER = "962790899175";

export const buildWhatsAppUrl = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const WHATSAPP_URL = buildWhatsAppUrl(
  "مرحباً Estanza، أرغب في تجهيز نظام الحجوزات"
);

/** مدة التجهيز المعلنة في الموقع (كانت 24 في Navbar و72 في Hero) */
export const SETUP_HOURS = 24;

export const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400";