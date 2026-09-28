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
  }
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