import { source, getTranslator, type Locale } from "@/i18n/messages";
export type TintId = "ceramic" | "nano" | "platinum" | "original-3m";
export type CoverageId = "four-windows" | "front" | "rear";
export type GlassSize = "unknown" | "standard" | "oversize";
export type BookingDraft = {
    tint: TintId;
    coverage: CoverageId[];
    glassSize: GlassSize;
    carModel: string;
    date: string;
    time: string;
    name: string;
    phone: string;
};
export type TintService = {
    id: TintId;
    number: string;
    english: string;
    name: string;
    shortName: string;
    heat: number;
    uv: number | null;
    warrantyMonths: number;
    warranty: string;
    description: string;
    darkness: string | null;
    prices: Record<CoverageId, number | null>;
};
// بيانات الأسعار والضمان والعزل نقلت من رسائل المركز، وليست قياسات مستقلة.
// عدّل هذه الإعدادات فقط عند تحديث البيانات من العميل.
export const speedCar = {
    name: "SPEED CAR JO",
    phone: "0799804059",
    whatsappNumber: "962799804059",
    address: source("speedCar.al_yasmeen_near_al_irsal_bridge_554"),
    directions: source("speedCar.entrance_opposite_abdeen_home_amman"),
    hours: source("speedCar.1_00_pm_10_00_pm"),
    timeZone: "Asia/Amman",
    logo: "/speedcar/speed-car-logo.jpeg",
    heroImage: "/speedcar/hero.webp",
    // هذا رابط بحث إلى أن يرسل المركز رابط المكان الدقيق.
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(source("speedCar.speed_car_jo_al_yasmeen_al_irsal")),
    mapsLabel: source("speedCar.find_the_centre_on_the_map"),
    largeGlassThresholdCm: 50,
    largeGlassSurcharge: 10,
    // لا نضيف الزيادة تلقائيًا لأن المركز لم يحدد هل هي لكل قطعة أم للطلب.
    surchargeNote: source("speedCar.glass_over_50_cm_carries_a_10"),
};
export const tintServices: TintService[] = [
    {
        id: "ceramic",
        number: "01",
        english: "CERAMIC",
        name: source("speedCar.ceramic_window_film"),
        shortName: source("speedCar.ceramic"),
        heat: 40,
        uv: 99,
        warrantyMonths: 24,
        warranty: source("speedCar.24_months"),
        darkness: null,
        description: source("speedCar.an_accessible_starting_point_for_heat_protection"),
        prices: { "four-windows": 20, front: null, rear: null },
    },
    {
        id: "nano",
        number: "02",
        english: "NANO CERAMIC",
        name: source("speedCar.nano_ceramic_window_film"),
        shortName: source("autoSpa.ceramic_coating"),
        heat: 60,
        uv: 99,
        warrantyMonths: 36,
        warranty: source("speedCar.3_years"),
        darkness: null,
        description: source("speedCar.greater_heat_rejection_with_a_longer_warranty"),
        prices: { "four-windows": 30, front: 20, rear: 20 },
    },
    {
        id: "platinum",
        number: "03",
        english: "PLATINUM",
        name: source("speedCar.platinum_nano_ceramic"),
        shortName: source("speedCar.platinum"),
        heat: 80,
        uv: 99,
        warrantyMonths: 60,
        warranty: source("speedCar.5_years"),
        darkness: null,
        description: source("speedCar.higher_heat_rejection_and_a_longer_warranty"),
        prices: { "four-windows": 40, front: 30, rear: 30 },
    },
    {
        id: "original-3m",
        number: "04",
        english: "ORIGINAL 3M",
        name: source("speedCar.original_3m"),
        shortName: source("speedCar.original_3m"),
        heat: 90,
        uv: null,
        warrantyMonths: 120,
        warranty: source("speedCar.10_years"),
        darkness: source("speedCar.5_tint_level_according_to_the_centre"),
        description: source("speedCar.the_centre_s_original_3m_offer_with"),
        prices: { "four-windows": 70, front: 50, rear: 50 },
    },
];
export const coverageOptions: {
    id: CoverageId;
    name: string;
    detail: string;
}[] = [
    {
        id: "four-windows",
        name: source("speedCar.four_side_windows"),
        detail: source("speedCar.side_glass_set"),
    },
    { id: "front", name: source("speedCar.front_windscreen"), detail: source("speedCar.one_piece") },
    { id: "rear", name: source("speedCar.rear_window"), detail: source("speedCar.one_piece") },
];
export const preferredTimes = [
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
];
export const initialDraft: BookingDraft = {
    tint: "nano",
    coverage: ["four-windows"],
    glassSize: "unknown",
    carModel: "",
    date: "",
    time: "",
    name: "",
    phone: "",
};
export function getTint(id: TintId): TintService {
    return tintServices.find((item) => item.id === id) ?? tintServices[0];
}
export function getSubtotal(draft: BookingDraft): number | null {
    const tint = getTint(draft.tint);
    const unique = [...new Set(draft.coverage)];
    if (!unique.length)
        return null;
    let sum = 0;
    for (const id of unique) {
        const price = tint.prices[id];
        if (price === null || price === undefined)
            return null;
        sum += price;
    }
    return sum;
}
export function selectTint(draft: BookingDraft, tintId: TintId): BookingDraft {
    const tint = getTint(tintId);
    const coverage = draft.coverage.filter((id) => tint.prices[id] !== null);
    return {
        ...draft,
        tint: tintId,
        coverage: coverage.length ? coverage : ["four-windows"],
    };
}
export function getLocalNow(now = new Date()) {
    const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: speedCar.timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
    }).formatToParts(now);
    const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? "";
    return {
        date: `${get("year")}-${get("month")}-${get("day")}`,
        time: `${get("hour")}:${get("minute")}`,
    };
}
export function getRequestDays(now = new Date(), locale: Locale = "ar") {
    const base = new Date(`${getLocalNow(now).date}T12:00:00Z`);
    return Array.from({ length: 14 }, (_, index) => {
        const date = new Date(base);
        date.setUTCDate(base.getUTCDate() + index);
        return {
            value: date.toISOString().slice(0, 10),
            day: new Intl.DateTimeFormat(locale === "en" ? "en-JO" : "ar-JO", {
                weekday: "short",
                timeZone: speedCar.timeZone,
            }).format(date),
            number: new Intl.DateTimeFormat("en", {
                day: "2-digit",
                timeZone: speedCar.timeZone,
            }).format(date),
            month: new Intl.DateTimeFormat(locale === "en" ? "en-JO" : "ar-JO", {
                month: "short",
                timeZone: speedCar.timeZone,
            }).format(date),
        };
    });
}
export function isRequestTimeValid(date: string, time: string, now = new Date()) {
    if (!getRequestDays(now).some((item) => item.value === date) ||
        !preferredTimes.includes(time))
        return false;
    const current = getLocalNow(now);
    return date > current.date || (date === current.date && time > current.time);
}
export function formatDate(date: string, locale: Locale = "ar") {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date))
        return getTranslator(locale)("centre.not_selected");
    const value = new Date(`${date}T12:00:00Z`);
    if (Number.isNaN(value.getTime()))
        return getTranslator(locale)("centre.not_selected");
    return new Intl.DateTimeFormat(locale === "en" ? "en-JO" : "ar-JO", {
        weekday: "long",
        day: "numeric",
        month: "long",
        timeZone: speedCar.timeZone,
    }).format(value);
}
export function formatTime(time: string, locale: Locale = "ar") {
    const [hours, minutes] = time.split(":").map(Number);
    if (!Number.isFinite(hours) || !Number.isFinite(minutes))
        return getTranslator(locale)("centre.not_selected");
    return `${hours % 12 || 12}:${String(minutes).padStart(2, "0")} ${hours < 12 ? getTranslator(locale)("autoSpa.am") : getTranslator(locale)("autoSpa.pm")}`;
}
export function normalizePhone(value: string) {
    const clean = value
        .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)))
        .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
        .trim()
        .replace(/[\s()-]/g, "");
    if (/^07[789]\d{7}$/.test(clean))
        return `+962${clean.slice(1)}`;
    if (/^7[789]\d{7}$/.test(clean))
        return `+962${clean}`;
    if (/^9627[789]\d{7}$/.test(clean))
        return `+${clean}`;
    const international = clean.startsWith("00") ? `+${clean.slice(2)}` : clean;
    return /^\+[1-9]\d{7,14}$/.test(international) ? international : "";
}
