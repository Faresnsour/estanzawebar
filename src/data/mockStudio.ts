export interface ServiceItem {
  id: string;
  name: string;
  duration: string;
  price: number;
  priceFormatted: string;
  desc?: string;
  badge?: string;
}

export interface DayOption {
  id: string;
  label: string;
  dateLabel: string;
  slotsLeft: number;
}

export interface TimeSlot {
  id: string;
  label: string;
}

export interface ClientData {
  id: string;
  name: string;
  themeColor: string;
  whatsappNumber: string;
  mapCoordinates: [number, number];
  heroMessage: string;
  logoUrl?: string;
  services: ServiceItem[];
  days: DayOption[];
  slots: TimeSlot[];
}

const DEFAULT_DAYS: DayOption[] = [
  { id: 'today', label: 'اليوم', dateLabel: '٢٦ سبتمبر', slotsLeft: 2 },
  { id: 'tomorrow', label: 'غداً', dateLabel: '٢٧ سبتمبر', slotsLeft: 4 },
  { id: 'after', label: 'بعد غد', dateLabel: '٢٨ سبتمبر', slotsLeft: 1 }
];

const DEFAULT_SLOTS: TimeSlot[] = [
  { id: 't1', label: '١٠:٠٠ ص' },
  { id: 't2', label: '٠١:٣٠ م' },
  { id: 't3', label: '٠٥:٠٠ م' }
];

export const clientsData: Record<string, ClientData> = {
  blitz: {
    id: 'blitz',
    name: 'Blitz Auto Detailing',
    themeColor: '#E53935', 
    whatsappNumber: '962781609666',
    mapCoordinates: [31.9539, 35.9106],
    heroMessage: 'احجز موعدك الآن مع المركز المعتمد دولياً (IDA)',
    days: DEFAULT_DAYS,
    slots: DEFAULT_SLOTS,
    services: [
      {
        id: 'graphene_blitz',
        name: 'حماية نانو سيراميك و غرافين',
        desc: 'طبقة حماية متطورة بتقنية الغرافين لصلابة ولمعان يدوم طويلاً',
        duration: 'يومين عمل',
        price: 150,
        priceFormatted: '١٥٠ د.أ',
        badge: 'معتمد من IDA'
      },
      {
        id: 'dry_clean_blitz',
        name: 'دراي كلين وديتيلنج احترافي',
        desc: 'تنظيف عميق للمقصورة الداخلية مع تعقيم كامل',
        duration: '٥ ساعات',
        price: 45,
        priceFormatted: '٤٥ د.أ'
      }
    ]
  },
  eglow: {
    id: 'eglow',
    name: 'E-Glow Studio',
    themeColor: '#00E5FF', 
    whatsappNumber: '96279XXXXXXX',
    mapCoordinates: [31.9639, 35.9206],
    heroMessage: 'درع الحماية الكلي لسيارتك يبدأ من هنا',
    days: DEFAULT_DAYS,
    slots: DEFAULT_SLOTS,
    services: [
      {
        id: 'ppf_full',
        name: 'درع الحماية الكلي (PPF)',
        desc: 'Full Body PPF · 10mil — فيلم حماية ذاتي الالتئام',
        duration: '٣ أيام عمل',
        price: 1200,
        priceFormatted: '١,٢٠٠ د.أ',
        badge: 'الأكثر طلباً للنخبة'
      }
    ]
  },
    top_level: {

    id: 'top_level',

    name: 'Top Level Car Care Center',

    themeColor: '#E53935',

    whatsappNumber: '962798001072',

    mapCoordinates: [31.9539, 35.9106],

    heroMessage: 'احجز موعدك الآن مع Top Level Car Care Center',

    days: DEFAULT_DAYS,

    slots: DEFAULT_SLOTS,

    services: [

      {

        id: 'top_level_detailing',

        name: 'ديتيلنج وعناية متكاملة بالسيارة',

        desc: 'خدمات احترافية للعناية بالسيارة وتنظيفها وتجهيزها',

        duration: 'يحدد عند الحجز',

        price: 0,

        priceFormatted: 'السعر عند الطلب'

      },

      {

        id: 'top_level_car_care',

        name: 'خدمات العناية بالسيارات',

        desc: 'خدمات متخصصة للعناية بالمظهر الداخلي والخارجي للسيارة',

        duration: 'يحدد عند الحجز',

        price: 0,

        priceFormatted: 'السعر عند الطلب'

      }

    ]

  },
  perfectCar: {
    id: 'perfect',
    name: 'Perfect Car Care Centre',
    themeColor: '#DC2626', // أحمر بيرفكت المطابق لشعارهم وجدار المشغل
    whatsappNumber: '962788772188',
    mapCoordinates: [31.9539, 35.9106],
    heroMessage: 'احجز موعد العناية بسيارتك الآن مع مركز بيرفكت',
    days: DEFAULT_DAYS,
    slots: DEFAULT_SLOTS,
    services: [
      {
        id: 'nano_ceramic_perfect',
        name: 'نانو سيراميك ومعالجة الطلاء',
        desc: 'حماية متقدمة بطبقات نانو سيراميك لمعان فائق ومقاومة للخدوش والعوامل الجوية',
        duration: 'يوم عمل',
        price: 130,
        priceFormatted: '١٣٠ د.أ',
        badge: 'الأكثر طلباً'
      },
      {
        id: 'car_polish_perfect',
        name: 'بوليش وتلميع احترافي (Car Polish)',
        desc: 'إزالة الخدوش الدائرية والبهتان واستعادة اللمعان الحقيقي لطلاء السيارة',
        duration: '٥ ساعات',
        price: 45,
        priceFormatted: '٤٥ د.أ'
      },
      {
        id: 'dry_clean_perfect',
        name: 'دراي كلين ومعالجة الفرش (Dry Clean)',
        desc: 'تنظيف عميق وتعقيم كامل للمقصورة والفرش الداخلي بأحدث المواد',
        duration: '٤ ساعات',
        price: 35,
        priceFormatted: '٣٥ د.أ'
      }
    ]
  },
  
};

export const MOCK_STUDIO_DAYS = [
  { id: 'today', label: 'اليوم', dateLabel: '٢٨ سبتمبر', slotsLeft: 2 },
  { id: 'tomorrow', label: 'غداً', dateLabel: '٢٩ سبتمبر', slotsLeft: 4 },
];

export const MOCK_STUDIO_SLOTS = [
  { id: 't1', label: '١٠:٠٠ ص' },
  { id: 't2', label: '٠٥:٠٠ م' },
];

export const MOCK_STUDIO_SERVICES = clientsData.blitz.services;