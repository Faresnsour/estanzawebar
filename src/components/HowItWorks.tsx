import { Eye, CalendarDays, MessageCircle } from "lucide-react";

const steps = [
  { icon: Eye, title: "يشوف الخدمة وسعرها", description: "الخدمات والأسعار ومدة العمل، قبل ما يسأل الفريق." },
  { icon: CalendarDays, title: "يختار الموعد ويدخل بياناته", description: "اليوم والوقت، واسمه وبيانات سيارته." },
  { icon: MessageCircle, title: "يوصلك الطلب على واتساب", description: "رسالة واحدة. فريقك يراجع الموعد ويؤكد الحجز." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="bg-emerald-50/50 py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div data-reveal className="mb-7">
          <p className="mb-3 text-sm font-bold text-[#006f60]">كيف يعمل</p>
          <h2 id="how-title" className="text-3xl font-extrabold leading-snug text-[#05221C] sm:text-4xl">ثلاث خطوات لعميلك.</h2>
        </div>
        <ol className="grid md:grid-cols-3 md:gap-8">
          {steps.map((step, index) => (
            <li key={step.title} data-reveal className="flex gap-4 border-b border-[#008774]/15 py-5 last:border-0 md:flex-col md:border-b-0 md:border-e md:py-2 md:pe-6">
              <span className="w-12 shrink-0 text-[40px] font-extrabold leading-none tabular-nums text-[#008774] md:w-auto md:text-5xl" aria-hidden="true">0{index + 1}</span>
              <div>
                <h3 className="flex items-start gap-2 text-lg font-bold leading-snug text-[#05221C]"><step.icon className="mt-1 hidden h-4 w-4 shrink-0 text-[#006f60] md:block" aria-hidden="true" />{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
