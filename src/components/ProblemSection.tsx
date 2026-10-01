import { Clock, MessageCircle, CalendarX2 } from "lucide-react";

const problems = [
  { icon: Clock, badge: "الحجز خارج أوقات العمل", title: "عميلك يحاول يحجز والمركز مغلق", description: "العميل يشوف شغلك بالليل، والموعد ينتظر رد الفريق.", impact: "صفحة حجز متاحة في أي وقت." },
  { icon: MessageCircle, badge: "محادثات متكررة", title: "نفس أسئلة الحجز تتكرر كل يوم", description: "كم السعر؟ كم بتاخذ وقت؟ شو المواعيد؟", impact: "اجمع بيانات الحجز من البداية." },
  { icon: CalendarX2, badge: "تعارض المواعيد", title: "موعدان لنفس الوقت", description: "المواعيد موزعة بين المحادثات.", impact: "مواعيد منظمة حسب إعدادات المركز." },
];

export default function ProblemSection() {
  return (
    <section id="features" aria-labelledby="problems-title" className="border-y border-slate-200/70 bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div data-reveal className="mb-8 max-w-2xl">
          <p className="mb-3 text-sm font-bold text-[#006f60]">مشاكل الحجز اليومية</p>
          <h2 id="problems-title" className="text-3xl font-extrabold leading-snug text-[#05221C] sm:text-4xl">كم محادثة تحتاج لتثبّت موعدًا واحدًا؟</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3 lg:gap-6">
          {problems.map((item) => (
            <article key={item.badge} data-reveal className="group flex flex-col rounded-2xl border border-slate-200 bg-[#F8FAF9] p-5 shadow-sm transition-[transform,border-color,box-shadow] duration-200 hover:border-[#008774]/30 motion-safe:hover:-translate-y-0.5 sm:p-6">
              <div className="mb-4 flex items-center gap-3">
                <item.icon className="h-5 w-5 shrink-0 text-[#006f60]" aria-hidden="true" />
                <span className="text-xs font-semibold text-slate-600">{item.badge}</span>
              </div>
              <h3 className="text-xl font-bold leading-snug text-[#05221C]">{item.title}</h3>
              <p className="mb-4 mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
              <p className="mt-auto border-t border-[#008774]/15 pt-3 text-sm font-semibold leading-6 text-[#006f60]">{item.impact}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
