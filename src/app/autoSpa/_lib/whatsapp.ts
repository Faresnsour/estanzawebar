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

  const modelInfo = draft.carModel.trim() ? ` (${draft.carModel.trim()})` : "";
  const lines = [
    "مرحبًا DOPAMINE، طلب حجز موعد جديد:",
    `• الاسم: ${draft.name.trim()}`,
    `• رقم التواصل: ${phone}`,
    `• السيارة: ${selectedVehicle.title}${modelInfo}`,
    `• الباقة: ${selectedPackage.title} (${price} ر.ع)`,
    `• الموعد: ${formatDate(draft.date)} - ${formatTime(draft.time)}`,
  ];

  const text = lines.join("\n");

  return `https://api.whatsapp.com/send?phone=${brand.whatsappNumber}&text=${encodeURIComponent(text)}`;
}
