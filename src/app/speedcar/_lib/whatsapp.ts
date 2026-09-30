import {
  coverageOptions,
  formatDate,
  formatTime,
  getSubtotal,
  getTint,
  isRequestTimeValid,
  normalizePhone,
  speedCar,
  type BookingDraft,
} from "../_data/services";

export function createWhatsAppUrl(
  draft: BookingDraft,
  now = new Date(),
): string | null {
  const tint = getTint(draft.tint);
  const price = getSubtotal(draft);
  const phone = normalizePhone(draft.phone);
  if (
    price === null ||
    !isRequestTimeValid(draft.date, draft.time, now) ||
    !phone ||
    draft.name.trim().length < 2 ||
    draft.name.trim().length > 80 ||
    draft.carModel.trim().length < 2 ||
    draft.carModel.trim().length > 80
  )
    return null;
  const lines = [
    "مرحبًا Speed Car Jo، أود طلب موعد للتظليل.",
    "",
    `الخدمة: ${tint.name}`,
    `التغطية: ${coverageOptions
      .filter((item) => draft.coverage.includes(item.id))
      .map((item) => item.name)
      .join(" + ")}`,
    `السعر الأساسي للتغطية: ${price} دينار`,
    ...(tint.darkness ? [`الدرجة: ${tint.darkness}`] : []),
    `حجم الزجاج: ${draft.glassSize === "oversize" ? "قد يتجاوز 50 سم" : draft.glassSize === "standard" ? "حتى 50 سم بحسب تقديري" : "يحتاج قياس المركز"}`,
    `السيارة: ${draft.carModel.trim()}`,
    `اليوم المفضّل: ${formatDate(draft.date)} (${draft.date})`,
    `الوقت المفضّل: ${formatTime(draft.time)} — بتوقيت عمّان`,
    "",
    `الاسم: ${draft.name.trim()}`,
    `رقم التواصل: ${phone}`,
    "",
    speedCar.surchargeNote,
    "يرجى تأكيد توفر الموعد والسعر النهائي وشروط الكفالة. هذا طلب موعد وليس حجزًا مؤكدًا.",
  ];
  return `https://wa.me/${speedCar.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
}
