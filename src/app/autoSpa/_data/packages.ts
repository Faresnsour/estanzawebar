import { source, getTranslator, type Locale } from "@/i18n/messages";
export type Vehicle = "sedan" | "suv";
export type PackageId = "basic" | "gold" | "royal";
export type Goal = "shine" | "correction" | "protection";
export type BookingDraft = {
    vehicle: Vehicle | null;
    goal: Goal | null;
    packageId: PackageId | null;
    date: string;
    time: string;
    name: string;
    phone: string;
    carModel: string;
};
export type StepProps = {
    draft: BookingDraft;
    onChange: (patch: Partial<BookingDraft>) => void;
    onNext: () => void;
    onBack: () => void;
};
export const brand = {
    name: "DOPAMINE",
    tagline: "FEEL THE SHINE.",
    address: source("autoSpa.al_mabela_industrial_area_8_muscat_oman"),
    instagramUrl: "https://www.instagram.com/dopamine.auto.spa/",
    // ضع رقم المركز الدولي هنا، أرقام فقط دون + أو مسافات.
    // مثال الصيغة: 968XXXXXXXX
    // يبقى إرسال الطلب معطلاً ما دام الرقم فارغاً.
    whatsappNumber: "96877474057",
    // يمكن إضافة رابط الموقع الدقيق بعد الحصول عليه من المركز.
    mapsUrl: "https://maps.app.goo.gl/LiWbBSfH8pRPcUk98",
    // اتركه true إلى أن يعتمد المركز الأسعار والبنود.
    demoPricing: true,
    // اختياري: ضع الصورة داخل public/auto-spa/
    // ثم غيّر null إلى "/auto-spa/hero.jpg"
    heroImage: "/auto-spa/hero.jpg" as string | null,
    // اختياري: "/auto-spa/logo.png"
    logoImage: "/auto-spa/logo.png" as string | null,
};
export const vehicles: {
    id: Vehicle;
    title: string;
    english: string;
    description: string;
}[] = [
    {
        id: "sedan",
        title: source("autoSpa.sedan_207"),
        english: "SEDAN",
        description: source("autoSpa.sedans_and_compact_cars"),
    },
    {
        id: "suv",
        title: source("autoSpa.suv"),
        english: "SUV / 4×4",
        description: source("autoSpa.larger_vehicles_and_suvs"),
    },
];
export const prices: Record<Vehicle, Record<PackageId, number>> = {
    sedan: {
        basic: 25,
        gold: 40,
        royal: 60,
    },
    suv: {
        basic: 35,
        gold: 55,
        royal: 80,
    },
};
export const packageOptions: {
    id: PackageId;
    english: string;
    title: string;
    description: string;
    services: string[];
}[] = [
    {
        id: "basic",
        english: "ESSENTIAL",
        title: source("autoSpa.essential_care"),
        description: source("autoSpa.a_fresh_start_for_everyday_car_care"),
        services: [
            source("autoSpa.exterior_wash"),
            source("autoSpa.interior_cleaning"),
            source("centre.clean_the_glass"),
            source("autoSpa.wheel_and_tyre_cleaning"),
        ],
    },
    {
        id: "gold",
        english: "GOLD",
        title: source("autoSpa.gold_care"),
        description: source("autoSpa.more_attention_to_your_paint_s_finish"),
        services: [
            source("autoSpa.all_essential_care_services"),
            source("autoSpa.paint_condition_assessment"),
            source("autoSpa.surface_scratch_polishing_subject_to_paint_condition"),
            source("autoSpa.deeper_interior_cleaning"),
            source("autoSpa.exterior_detail_care"),
        ],
    },
    {
        id: "royal",
        english: "ROYAL",
        title: source("autoSpa.royal_care"),
        description: source("autoSpa.a_more_comprehensive_care_plan_agreed_with"),
        services: [
            source("autoSpa.all_gold_care_services"),
            source("autoSpa.detailed_interior_care"),
            source("autoSpa.targeted_paint_correction_subject_to_paint_condition"),
            source("autoSpa.assessment_of_suitable_paint_protection_options"),
        ],
    },
];
export const goals: {
    id: Goal;
    title: string;
    description: string;
    english: string;
    packageId: PackageId;
}[] = [
    {
        id: "shine",
        title: source("autoSpa.everyday_care_and_a_fresh_finish"),
        description: source("autoSpa.essential_care_for_your_exterior_and_interior"),
        english: "REFRESH",
        packageId: "basic",
    },
    {
        id: "correction",
        title: source("autoSpa.restore_signs_of_wear"),
        description: source("autoSpa.start_with_an_assessment_of_your_paint"),
        english: "RESTORE",
        packageId: "gold",
    },
    {
        id: "protection",
        title: source("autoSpa.more_complete_care_and_protection"),
        description: source("autoSpa.discuss_your_car_s_condition_and_suitable"),
        english: "PRESERVE",
        packageId: "royal",
    },
];
// أضف صوراً حقيقية فقط.
// الصور توضع داخل public/auto-spa/
// لا تضف نتيجة أو اسم خدمة لم ينفذه المركز فعلاً.
export const resultShots: {
    src: string;
    alt: string;
    title: string;
    caption: string;
}[] = [
    {
        src: "/auto-spa/result-01.jpg",
        alt: source("autoSpa.a_vehicle_inside_the_dopamine_workshop"),
        title: source("autoSpa.inside_the_workshop"),
        caption: source("autoSpa.the_details_of_car_care"),
    },
    {
        src: "/auto-spa/result-02.jpg",
        alt: source("autoSpa.vehicle_details_from_dopamine_s_work"),
        title: source("autoSpa.attention_to_detail"),
        caption: source("autoSpa.from_our_workshop"),
    },
];
export const serviceStories = [
    {
        number: "01",
        english: "PAINT CORRECTION",
        title: source("autoSpa.bring_back_the_depth"),
        description: source("autoSpa.we_assess_your_paint_and_address_surface"),
        detail: source("autoSpa.professional_polishing"),
    },
    {
        number: "02",
        english: "INTERIOR DETAILING",
        title: source("autoSpa.care_starts_inside"),
        description: source("autoSpa.care_for_the_cabin_surfaces_and_details"),
        detail: source("autoSpa.interior_detailing"),
    },
    {
        number: "03",
        english: "NANO CERAMIC",
        title: source("autoSpa.protection_that_fits"),
        description: source("autoSpa.explore_ceramic_coating_and_paint_preparation_with"),
        detail: source("autoSpa.ceramic_coating"),
    },
];
export const initialDraft: BookingDraft = {
    vehicle: null,
    goal: null,
    packageId: null,
    date: "",
    time: "",
    name: "",
    phone: "",
    carModel: "",
};
// هذه أوقات مقترحة لطلب الموعد، وليست مخزون مواعيد مباشر.
// عدّلها بحسب ساعات عمل المركز.
export const requestTimes = [
    "09:00",
    "10:30",
    "12:00",
    "13:30",
    "15:00",
    "16:30",
    "18:00",
];
export function getPackage(id: PackageId | null) {
    return packageOptions.find((item) => item.id === id);
}
export function getVehicle(id: Vehicle | null) {
    return vehicles.find((item) => item.id === id);
}
export function getRecommendedPackage(goal: Goal | null) {
    return goals.find((item) => item.id === goal)?.packageId ?? null;
}
export function getPrice(draft: BookingDraft): number | null {
    if (!draft.vehicle || !draft.packageId)
        return null;
    return prices[draft.vehicle][draft.packageId];
}
// نعتمد توقيت المركز في عُمان، لا توقيت جهاز العميل.
export function getMuscatNow(now = new Date()) {
    const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Muscat",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
    }).formatToParts(now);
    const read = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? "";
    return {
        date: `${read("year")}-${read("month")}-${read("day")}`,
        time: `${read("hour")}:${read("minute")}`,
    };
}
export function getRequestDays(now = new Date(), locale: Locale = "ar") {
    const today = getMuscatNow(now).date;
    const base = new Date(`${today}T12:00:00Z`);
    return Array.from({ length: 14 }, (_, index) => {
        const date = new Date(base);
        date.setUTCDate(base.getUTCDate() + index);
        return {
            value: date.toISOString().slice(0, 10),
            day: new Intl.DateTimeFormat(locale === "en" ? "en-OM" : "ar-OM", {
                timeZone: "Asia/Muscat",
                weekday: "short",
            }).format(date),
            number: new Intl.DateTimeFormat("en", {
                timeZone: "Asia/Muscat",
                day: "2-digit",
            }).format(date),
            month: new Intl.DateTimeFormat(locale === "en" ? "en-OM" : "ar-OM", {
                timeZone: "Asia/Muscat",
                month: "short",
            }).format(date),
        };
    });
}
export function isRequestTimeValid(date: string, time: string, now = new Date()) {
    if (!getRequestDays(now).some((day) => day.value === date))
        return false;
    if (!requestTimes.includes(time))
        return false;
    const current = getMuscatNow(now);
    return (date > current.date ||
        (date === current.date && time > current.time));
}
export function formatDate(date: string, locale: Locale = "ar") {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date))
        return getTranslator(locale)("centre.not_selected");
    return new Intl.DateTimeFormat(locale === "en" ? "en-OM" : "ar-OM", {
        timeZone: "Asia/Muscat",
        weekday: "long",
        day: "numeric",
        month: "long",
    }).format(new Date(`${date}T12:00:00Z`));
}
export function formatTime(time: string, locale: Locale = "ar") {
    if (!/^\d{2}:\d{2}$/.test(time))
        return getTranslator(locale)("centre.not_selected");
    const [hours, minutes] = time.split(":").map(Number);
    return `${hours % 12 || 12}:${String(minutes).padStart(2, "0")} ${hours >= 12 ? getTranslator(locale)("autoSpa.pm") : getTranslator(locale)("autoSpa.am")}`;
}
export function normalizePhone(value: string) {
    const digits = value
        .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)))
        .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
        .trim()
        .replace(/[\s()-]/g, "");
    if (/^[79]\d{7}$/.test(digits))
        return `+968${digits}`;
    if (/^968[79]\d{7}$/.test(digits))
        return `+${digits}`;
    const international = digits.startsWith("00")
        ? `+${digits.slice(2)}`
        : digits;
    return /^\+[1-9]\d{7,14}$/.test(international)
        ? international
        : "";
}
