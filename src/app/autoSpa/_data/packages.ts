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
  address: "المعبيلة الصناعية 8، مسقط، سلطنة عُمان",

  instagramUrl: "https://www.instagram.com/dopamine.auto.spa/",

  // ضع رقم المركز الدولي هنا، أرقام فقط دون + أو مسافات.
  // مثال الصيغة: 968XXXXXXXX
  // يبقى إرسال الطلب معطلاً ما دام الرقم فارغاً.
  whatsappNumber: "96877474057",

  // يمكن إضافة رابط الموقع الدقيق بعد الحصول عليه من المركز.
  mapsUrl:
    "https://maps.app.goo.gl/LiWbBSfH8pRPcUk98",

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
    title: "سيارة صالون",
    english: "SEDAN",
    description: "سيارات الصالون والسيارات الصغيرة",
  },
  {
    id: "suv",
    title: "دفع رباعي",
    english: "SUV / 4×4",
    description: "السيارات الكبيرة وسيارات الدفع الرباعي",
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
    title: "العناية الأساسية",
    description: "بداية مرتبة للعناية اليومية بسيارتك.",
    services: [
      "غسيل خارجي",
      "تنظيف المقصورة",
      "تنظيف الزجاج",
      "تنظيف الإطارات والجنوط",
    ],
  },
  {
    id: "gold",
    english: "GOLD",
    title: "العناية الذهبية",
    description: "اهتمام أعمق بلمعة الطلاء وتفاصيل المقصورة.",
    services: [
      "خدمات العناية الأساسية",
      "تقييم حالة الطلاء",
      "بوليش للخدوش السطحية بحسب حالة الطلاء",
      "تنظيف داخلي أعمق",
      "العناية بالتفاصيل الخارجية",
    ],
  },
  {
    id: "royal",
    english: "ROYAL",
    title: "العناية الملكية",
    description: "خطة عناية أوسع تُراجع مع الفريق قبل التنفيذ.",
    services: [
      "خدمات العناية الذهبية",
      "عناية تفصيلية بالمقصورة",
      "معالجة تفصيلية للطلاء بحسب حالته",
      "تقييم خيارات حماية الطلاء المناسبة",
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
    title: "أريد اهتمامًا يوميًا ولمعة مرتبة",
    description: "عناية أساسية بالمظهر الخارجي والمقصورة.",
    english: "REFRESH",
    packageId: "basic",
  },
  {
    id: "correction",
    title: "أريد معالجة آثار الاستخدام",
    description: "ابدأ بتقييم الطلاء والخدوش السطحية.",
    english: "RESTORE",
    packageId: "gold",
  },
  {
    id: "protection",
    title: "أريد عناية أشمل وحماية مناسبة",
    description: "ناقش حالة سيارتك وخيارات الحماية مع الفريق.",
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
    alt: "سيارة داخل ورشة DOPAMINE",
    title: "من داخل الورشة",
    caption: "تفاصيل العناية بالسيارة",
  },
  {
    src: "/auto-spa/result-02.jpg",
    alt: "تفاصيل سيارة من أعمال DOPAMINE",
    title: "اهتمام بالتفاصيل",
    caption: "من أعمال المركز",
  },
];
export const serviceStories = [
  {
    number: "01",
    english: "PAINT CORRECTION",
    title: "استعادة عمق اللون.",
    description:
      "تقييم الطلاء ومعالجة الخدوش السطحية وآثار الاستخدام بحسب حالته. يحدد الفريق النتيجة الممكنة بعد المعاينة.",
    detail: "بوليش احترافي",
  },
  {
    number: "02",
    english: "INTERIOR DETAILING",
    title: "الاهتمام يبدأ من الداخل.",
    description:
      "عناية بالمقصورة والأسطح والتفاصيل التي ترافقك في كل رحلة، مع اختيار طريقة التنظيف المناسبة للخامات.",
    detail: "عناية داخلية",
  },
  {
    number: "03",
    english: "NANO CERAMIC",
    title: "حماية تناسب سيارتك.",
    description:
      "ناقش خيارات النانو سيراميك وتجهيز الطلاء مع الفريق، وتعرّف على متطلبات الخدمة والعناية بعدها.",
    detail: "نانو سيراميك",
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
  if (!draft.vehicle || !draft.packageId) return null;
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

  const read = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return {
    date: `${read("year")}-${read("month")}-${read("day")}`,
    time: `${read("hour")}:${read("minute")}`,
  };
}

export function getRequestDays(now = new Date()) {
  const today = getMuscatNow(now).date;
  const base = new Date(`${today}T12:00:00Z`);

  return Array.from({ length: 14 }, (_, index) => {
    const date = new Date(base);
    date.setUTCDate(base.getUTCDate() + index);

    return {
      value: date.toISOString().slice(0, 10),
      day: new Intl.DateTimeFormat("ar-OM", {
        timeZone: "Asia/Muscat",
        weekday: "short",
      }).format(date),
      number: new Intl.DateTimeFormat("en", {
        timeZone: "Asia/Muscat",
        day: "2-digit",
      }).format(date),
      month: new Intl.DateTimeFormat("ar-OM", {
        timeZone: "Asia/Muscat",
        month: "short",
      }).format(date),
    };
  });
}

export function isRequestTimeValid(
  date: string,
  time: string,
  now = new Date(),
) {
  if (!getRequestDays(now).some((day) => day.value === date)) return false;
  if (!requestTimes.includes(time)) return false;

  const current = getMuscatNow(now);

  return (
    date > current.date ||
    (date === current.date && time > current.time)
  );
}

export function formatDate(date: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return "لم يُحدد";

  return new Intl.DateTimeFormat("ar-OM", {
    timeZone: "Asia/Muscat",
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(`${date}T12:00:00Z`));
}

export function formatTime(time: string) {
  if (!/^\d{2}:\d{2}$/.test(time)) return "لم يُحدد";

  const [hours, minutes] = time.split(":").map(Number);

  return `${hours % 12 || 12}:${String(minutes).padStart(2, "0")} ${
    hours >= 12 ? "مساءً" : "صباحًا"
  }`;
}

export function normalizePhone(value: string) {
  const digits = value
    .replace(/[٠-٩]/g, (digit) =>
      String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)),
    )
    .replace(/[۰-۹]/g, (digit) =>
      String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)),
    )
    .trim()
    .replace(/[\s()-]/g, "");

  if (/^[79]\d{7}$/.test(digits)) return `+968${digits}`;
  if (/^968[79]\d{7}$/.test(digits)) return `+${digits}`;

  const international = digits.startsWith("00")
    ? `+${digits.slice(2)}`
    : digits;

  return /^\+[1-9]\d{7,14}$/.test(international)
    ? international
    : "";
}