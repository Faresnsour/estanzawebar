export type Project = {
  id: string;
  name: string;
  location: string;
  title: string;
  description: string;
  features: string[];
  href: string;
  screenshot: string;
  note?: string;
  testimonial?: { quote: string; name: string; role: string };
};

export const projects: Project[] = [
  {
    id: "speedcar",
    name: "Speed Car Jo",
    location: "عمّان، الأردن",
    title: "طلب تظليل، حسب الزجاج الذي يختاره العميل.",
    description: "يقارن العميل التظليل والكفالة، يختار أجزاء الزجاج، ويشاهد السعر قبل تجهيز طلب الموعد.",
    features: ["مقارنة الخدمات والأسعار", "اختيار الزجاج وحساب السعر", "بيانات السيارة وطلب موعد عبر واتساب"],
    href: "/speedcar",
    screenshot: "/projects/speedcar.webp",
  },
  {
    id: "wash33",
    name: "WASH 33",
    location: "عمّان، الأردن",
    title: "حجز خدمة العناية والسيارة في مكانها.",
    description: "صفحة للخدمات المتنقلة تجمع الخدمة والموقع والموعد وبيانات العميل في طلب واحد.",
    features: ["عرض خدمات الغسيل والدراي كلين", "تحديد موقع السيارة", "رسالة واتساب بتفاصيل الطلب"],
    href: "/wash33",
    screenshot: "/projects/wash33.webp",
  },
  {
    id: "perfect",
    name: "Perfect Auto Care",
    location: "عمّان، الأردن",
    title: "أعمال المركز وباقات العناية في نفس الصفحة.",
    description: "معرض لأعمال المركز، وخدمات بأسعار ومدد واضحة، ثم اختيار موعد مفضّل للتواصل مع الفريق.",
    features: ["معرض صور قابل للفلترة", "أسعار ومدة كل خدمة", "ملخص طلب الحجز قبل واتساب"],
    href: "/perfect",
    screenshot: "/projects/perfect.webp",
  },
  {
    id: "dopamine",
    name: "DOPAMINE Auto Spa",
    location: "مسقط، سلطنة عُمان",
    title: "رحلة حجز تبدأ بنوع السيارة ومستوى العناية.",
    description: "خطوات متتابعة لاختيار السيارة والباقة والموعد، ومراجعة البيانات قبل إرسال الطلب للفريق.",
    features: ["باقات حسب فئة السيارة", "خطوات حجز مناسبة للهاتف", "مراجعة الطلب قبل إرساله"],
    href: "/autoSpa",
    screenshot: "/projects/dopamine.webp",
    note: "أسعار هذا النموذج تجريبية؛ يعتمدها المركز قبل التنفيذ.",
  },
  {
    id: "blitz",
    name: "Blitz Auto Detailing",
    location: "عمّان، الأردن",
    title: "خدمات الاستوديو، من التفاصيل إلى طلب الموعد.",
    description: "يعرف العميل الخدمة ومدتها وسعرها، ويختار الموعد المفضّل قبل التواصل مع المركز.",
    features: ["تفاصيل الخدمة ومراحلها", "أسئلة عن العناية بالسيارة", "طلب موعد إلى رقم المركز"],
    href: "/blitz",
    screenshot: "/projects/blitz.webp",
  },
];
