import { getTranslator, type Locale } from "@/i18n/messages";
import { coverageOptions, formatDate, formatTime, getSubtotal, getTint, isRequestTimeValid, normalizePhone, speedCar, type BookingDraft, } from "../_data/services";
export function createWhatsAppUrl(draft: BookingDraft, now = new Date(), locale: Locale = "ar"): string | null {
    const tint = getTint(draft.tint);
    const price = getSubtotal(draft);
    const phone = normalizePhone(draft.phone);
    if (price === null ||
        !isRequestTimeValid(draft.date, draft.time, now) ||
        !phone ||
        draft.name.trim().length < 2 ||
        draft.name.trim().length > 80 ||
        draft.carModel.trim().length < 2 ||
        draft.carModel.trim().length > 80)
        return null;
    const tr = getTranslator(locale);
    const lines = [
        tr("speedCar.hi_speed_car_jo_i_d_like"),
        "",
        tr("speedCar.service_value", [tint.name]),
        tr("speedCar.coverage_value", [coverageOptions
                .filter((item) => draft.coverage.includes(item.id))
                .map((item) => tr(item.name))
                .join(" + ")]),
        tr("speedCar.base_coverage_price_value_jod", [price]),
        ...(tint.darkness ? [tr("speedCar.tint_level_value", [tint.darkness])] : []),
        tr("speedCar.glass_size_value", [draft.glassSize === "oversize" ? tr("speedCar.may_exceed_50_cm") : draft.glassSize === "standard" ? tr("speedCar.up_to_50_cm_by_my_estimate") : tr("speedCar.centre_measurement_needed")]),
        tr("speedCar.vehicle_value", [draft.carModel.trim()]),
        tr("speedCar.preferred_day_value_value", [formatDate(draft.date, locale), draft.date]),
        tr("speedCar.preferred_time_value_amman_time", [formatTime(draft.time, locale)]),
        "",
        tr("demo.name_value", [draft.name.trim()]),
        tr("speedCar.contact_number_value", [phone]),
        "",
        tr(speedCar.surchargeNote),
        tr("speedCar.please_confirm_availability_final_pricing_and_warranty"),
    ];
    return `https://wa.me/${speedCar.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
}
