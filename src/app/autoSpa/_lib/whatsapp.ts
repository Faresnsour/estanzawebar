import { getTranslator, type Locale } from "@/i18n/messages";
import { brand, formatDate, formatTime, getPackage, getPrice, getVehicle, isRequestTimeValid, normalizePhone, type BookingDraft, } from "../_data/packages";
export function hasWhatsAppNumber() {
    return /^[1-9]\d{7,14}$/.test(brand.whatsappNumber);
}
export function createWhatsAppUrl(draft: BookingDraft, locale: Locale = "ar"): string | null {
    const selectedPackage = getPackage(draft.packageId);
    const selectedVehicle = getVehicle(draft.vehicle);
    const price = getPrice(draft);
    const phone = normalizePhone(draft.phone);
    if (!hasWhatsAppNumber() ||
        !selectedPackage ||
        !selectedVehicle ||
        price === null ||
        draft.name.trim().length < 2 ||
        draft.name.trim().length > 80 ||
        !phone ||
        !isRequestTimeValid(draft.date, draft.time)) {
        return null;
    }
    const modelInfo = draft.carModel.trim() ? ` (${draft.carModel.trim()})` : "";
    const tr = getTranslator(locale);
    const lines = [
        tr("autoSpa.hi_dopamine_i_d_like_to_request"),
        tr("autoSpa.name_value", [draft.name.trim()]),
        tr("autoSpa.contact_number_value", [phone]),
        tr("autoSpa.vehicle_valuevalue", [selectedVehicle.title, modelInfo]),
        tr("autoSpa.package_value_value_omr", [selectedPackage.title, price]),
        tr("autoSpa.appointment_value_value", [formatDate(draft.date, locale), formatTime(draft.time, locale)]),
    ];
    const text = lines.join("\n");
    return `https://api.whatsapp.com/send?phone=${brand.whatsappNumber}&text=${encodeURIComponent(text)}`;
}
