import {
  brand,
  formatDate,
  formatTime,
  getPackage,
  getPrice,
  getVehicle,
  isRequestTimeValid,
  normalizePhone,
  type BookingDraft,
} from "../_data/packages";

export function hasWhatsAppNumber() {
  return /^[1-9]\d{7,14}$/.test(brand.whatsappNumber);
}

export function createWhatsAppUrl(draft: BookingDraft): string | null {
  const selectedPackage = getPackage(draft.packageId);
  const selectedVehicle = getVehicle(draft.vehicle);
  const price = getPrice(draft);
  const phone = normalizePhone(draft.phone);

  if (
    !hasWhatsAppNumber() ||
    !selectedPackage ||
    !selectedVehicle ||
    price === null ||
    draft.name.trim().length < 2 ||
    draft.name.trim().length > 80 ||
    !phone ||
    !isRequestTimeValid(draft.date, draft.time)
  ) {
    return null;
  }

  const message = [
    "مرحبًا DOPAMINE، أود طلب موعد للعناية بسيارتي.",
    "",
    `الاسم: ${draft.name.trim()}`,
    `رقم التواصل: ${phone}`,
    `نوع السيارة: ${selectedVehicle.title}`,
    ...(draft.carModel.trim()
      ? [`الموديل: ${draft.carModel.trim()}`]
      : []),
    `الباقة: ${selectedPackage.title}`,
    `السعر${brand.demoPricing ? " التجريبي" : ""}: ${price} ريال عُماني`,
    `اليوم المطلوب: ${formatDate(draft.date)} (${draft.date})`,
    `الوقت المطلوب: ${formatTime(draft.time)}`,
    "",
    ...(brand.demoPricing
      ? ["الأسعار والبنود المعروضة تجريبية؛ يرجى تأكيد السعر والخدمة."]
      : []),
    "يرجى تأكيد توفر الموعد وتفاصيل الخدمة. شكرًا.",
  ].join("\n");

  return `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(
    message,
  )}`;
}