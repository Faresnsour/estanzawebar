import { Eye, CalendarDays, MessageCircle } from "lucide-react";

const steps = [
  { icon: Eye, title: "يشوف الخدمة وسعرها", description: "يفتح رابط مركزك ويعرف الخدمات والأسعار ومدة العمل، قبل ما يسأل الفريق." },
  { icon: CalendarDays, title: "يختار موعده ويدخل بياناته", description: "يحدد اليوم والوقت، ويكتب اسمه وبيانات سيارته. بدون تطبيق أو حساب." },
  { icon: MessageCircle, title: "يوصلك طلب واضح على واتساب", description: "يرسل التفاصيل برسالة واحدة. فريقك يراجع الموعد ويؤكد الحجز حسب إعدادات المركز." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="border-t border-slate-200/70 py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <p className="mb-3 text-sm font-bold text-[#006f60]">كيف يعمل</p>
          <h2 id="how-title" className="text-3xl font-extrabold leading-snug text-[#05221C] sm:text-4xl">ثلاث خطوات لعميلك.</h2>
          <p className="mt-3 text-base text-slate-600">والتفاصيل التي يحتاجها فريقك في مكان واحد.</p>
        </div>
        <ol className="grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="mb-5 flex items-center justify-between">
                <span className="text-sm font-bold tabular-nums text-[#006f60]" aria-hidden="true">0{index + 1}</span>
                <step.icon className="h-5 w-5 text-[#006f60]" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold leading-snug text-[#05221C]">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
