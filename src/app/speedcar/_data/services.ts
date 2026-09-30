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
  address: "الياسمين — قرب جسر الإرسال",
  directions: "الدخلة المقابلة لعابدين هوم، عمّان",
  hours: "1:00 ظهرًا — 10:00 مساءً",
  timeZone: "Asia/Amman",
  logo: "/speedcar/speed-car-logo.jpeg",
  heroImage: "/speedcar/hero.webp",
  // هذا رابط بحث إلى أن يرسل المركز رابط المكان الدقيق.
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Speed Car Jo الياسمين جسر الإرسال عمان"),
  mapsLabel: "ابحث عن المركز على الخريطة",
  largeGlassThresholdCm: 50,
  largeGlassSurcharge: 10,
  // لا نضيف الزيادة تلقائيًا لأن المركز لم يحدد هل هي لكل قطعة أم للطلب.
  surchargeNote:
    "للزجاج الذي يتجاوز 50 سم زيادة 10 دنانير؛ يؤكد الفريق القياس وطريقة تطبيق الزيادة قبل التنفيذ.",
};

export const tintServices: TintService[] = [
  {
    id: "ceramic",
    number: "01",
    english: "CERAMIC",
    name: "تظليل سيراميك",
    shortName: "سيراميك",
    heat: 40,
    uv: 99,
    warrantyMonths: 24,
    warranty: "24 شهرًا",
    darkness: null,
    description: "خيار بداية للعزل الحراري والعناية براحة المقصورة.",
    prices: { "four-windows": 20, front: null, rear: null },
  },
  {
    id: "nano",
    number: "02",
    english: "NANO CERAMIC",
    name: "تظليل نانو سيراميك",
    shortName: "نانو سيراميك",
    heat: 60,
    uv: 99,
    warrantyMonths: 36,
    warranty: "3 سنوات",
    darkness: null,
    description: "مستوى أعلى من العزل الحراري مع كفالة ممتدة.",
    prices: { "four-windows": 30, front: 20, rear: 20 },
  },
  {
    id: "platinum",
    number: "03",
    english: "PLATINUM",
    name: "نانو سيراميك بلاتينوم",
    shortName: "بلاتينوم",
    heat: 80,
    uv: 99,
    warrantyMonths: 60,
    warranty: "5 سنوات",
    darkness: null,
    description: "عزل حراري أعلى وكفالة أطول ضمن خيارات السيراميك.",
    prices: { "four-windows": 40, front: 30, rear: 30 },
  },
  {
    id: "original-3m",
    number: "04",
    english: "ORIGINAL 3M",
    name: "3M الأصلي",
    shortName: "3M الأصلي",
    heat: 90,
    uv: null,
    warrantyMonths: 120,
    warranty: "10 سنوات",
    darkness: "درجة 5% بحسب عرض المركز",
    description: "عرض المركز على 3M الأصلي، بعزل حراري معلن يصل إلى 90%.",
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
    name: "الأربع شبابيك",
    detail: "مجموعة الزجاج الجانبي",
  },
  { id: "front", name: "الزجاج الأمامي", detail: "قطعة واحدة" },
  { id: "rear", name: "الزجاج الخلفي", detail: "قطعة واحدة" },
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
  if (!unique.length) return null;
  let sum = 0;
  for (const id of unique) {
    const price = tint.prices[id];
    if (price === null || price === undefined) return null;
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
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";
  return {
    date: `${get("year")}-${get("month")}-${get("day")}`,
    time: `${get("hour")}:${get("minute")}`,
  };
}

export function getRequestDays(now = new Date()) {
  const base = new Date(`${getLocalNow(now).date}T12:00:00Z`);
  return Array.from({ length: 14 }, (_, index) => {
    const date = new Date(base);
    date.setUTCDate(base.getUTCDate() + index);
    return {
      value: date.toISOString().slice(0, 10),
      day: new Intl.DateTimeFormat("ar-JO", {
        weekday: "short",
        timeZone: speedCar.timeZone,
      }).format(date),
      number: new Intl.DateTimeFormat("en", {
        day: "2-digit",
        timeZone: speedCar.timeZone,
      }).format(date),
      month: new Intl.DateTimeFormat("ar-JO", {
        month: "short",
        timeZone: speedCar.timeZone,
      }).format(date),
    };
  });
}

export function isRequestTimeValid(
  date: string,
  time: string,
  now = new Date(),
) {
  if (
    !getRequestDays(now).some((item) => item.value === date) ||
    !preferredTimes.includes(time)
  )
    return false;
  const current = getLocalNow(now);
  return date > current.date || (date === current.date && time > current.time);
}

export function formatDate(date: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return "لم يُحدد";
  const value = new Date(`${date}T12:00:00Z`);
  if (Number.isNaN(value.getTime())) return "لم يُحدد";
  return new Intl.DateTimeFormat("ar-JO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: speedCar.timeZone,
  }).format(value);
}

export function formatTime(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return "لم يُحدد";
  return `${hours % 12 || 12}:${String(minutes).padStart(2, "0")} ${hours < 12 ? "صباحًا" : "مساءً"}`;
}

export function normalizePhone(value: string) {
  const clean = value
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)))
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .trim()
    .replace(/[\s()-]/g, "");
  if (/^07[789]\d{7}$/.test(clean)) return `+962${clean.slice(1)}`;
  if (/^7[789]\d{7}$/.test(clean)) return `+962${clean}`;
  if (/^9627[789]\d{7}$/.test(clean)) return `+${clean}`;
  const international = clean.startsWith("00") ? `+${clean.slice(2)}` : clean;
  return /^\+[1-9]\d{7,14}$/.test(international) ? international : "";
}
