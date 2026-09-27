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

export const MOCK_STUDIO_SERVICES: ServiceItem[] = [
  {
    id: 'ppf_full',
    name: 'درع الحماية الكلي',
    desc: 'Full Body PPF · 10mil — فيلم حماية ذاتي الالتئام تغطية كاملة للهيكل',
    duration: '٣ أيام عمل',
    price: 1200,
    priceFormatted: '١,٢٠٠ د.أ',
    badge: 'الأكثر طلباً للنخبة'
  },
  {
    id: 'graphene',
    name: 'باقة نانو جرافين ألترا',
    desc: 'Graphene Matrix Coating — طبقة سيراميك جرافين 9H صلابة وعمق لوني',
    duration: '٢٤ ساعة',
    price: 240,
    priceFormatted: '٢٤٠ د.أ'
  },
  {
    id: 'paint_correction',
    name: 'المعالجة التصحيحية والترميمية للطلاء',
    desc: 'Multi-Stage Paint Correction — إزالة الخدوش والهالات وتلميع متعدد المراحل',
    duration: '٨ ساعات',
    price: 110,
    priceFormatted: '١١٠ د.أ'
  },
  {
    id: 'interior',
    name: 'العناية الداخلية العميقة والتطهير الحراري',
    desc: 'Interior Restoration — تعقيم بخاري ومعالجة الجلد والأقمشة الفنية',
    duration: '٤ ساعات',
    price: 45,
    priceFormatted: '٤٥ د.أ'
  }
];

export const MOCK_STUDIO_DAYS: DayOption[] = [
  { id: 'today', label: 'اليوم', dateLabel: '٢٦ سبتمبر', slotsLeft: 2 },
  { id: 'tomorrow', label: 'غداً', dateLabel: '٢٧ سبتمبر', slotsLeft: 4 },
  { id: 'after', label: 'بعد غد', dateLabel: '٢٨ سبتمبر', slotsLeft: 1 }
];

export const MOCK_STUDIO_SLOTS: TimeSlot[] = [
  { id: 't1', label: '١٠:٠٠ ص' },
  { id: 't2', label: '٠١:٣٠ م' },
  { id: 't3', label: '٠٥:٠٠ م' }
];
