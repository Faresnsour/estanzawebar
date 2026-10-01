import { Check, MessageCircle } from "lucide-react";
import { buildWhatsAppUrl, LAUNCH_PRICE } from "./lib/site";

const launchFeatures = [
  "صفحة حجز بشعار مركزك وألوانه",
  "عرض الخدمات والأسعار ومدة كل خدمة",
  "اختيار اليوم والوقت وجمع بيانات العميل والسيارة",
  "رسالة واتساب مرتبة بتفاصيل طلب الحجز",
  "تجربة الصفحة على الهاتف قبل التسليم",
];
const proFeatures = [
  "أكثر من موظف أو رافعة أو مورد للحجز",
  "معرض لأعمال المركز ضمن الصفحة",
  "تخصيص خطوات الحجز حسب خدماتك",
  "ربط Google Sheets أو Calendar حسب الاحتياج",
];

export default function PricingSection() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="border-t border-slate-200/70 py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-9 max-w-2xl">
          <p className="mb-3 text-sm font-bold text-[#006f60]">الباقات</p>
          <h2 id="pricing-title" className="text-3xl font-extrabold leading-snug text-[#05221C] sm:text-4xl">ابدأ بما يحتاجه مركزك.</h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600">باقة واضحة للبداية، وتخصيص أوسع إذا كانت طريقة عملك تحتاج أكثر.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:gap-7">
          <article className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-[#05221C]">باقة الانطلاق</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">لمركز يريد عرض خدماته واستقبال طلبات الحجز بوضوح.</p>
              <p className="mb-1 mt-6 flex items-baseline gap-2 text-[#05221C]"><span className="text-5xl font-extrabold tabular-nums">{LAUNCH_PRICE}</span><span className="text-base font-semibold">د.أ</span></p>
              <p className="text-sm font-semibold text-[#006f60]">دفع مرة واحدة · بدون اشتراك شهري</p>
              <ul className="mt-6 space-y-3 border-t border-slate-200 pt-6 text-sm leading-relaxed text-slate-700">
                {launchFeatures.map((feature) => <li key={feature} className="flex items-start gap-3"><Check className="mt-1 h-4 w-4 shrink-0 text-[#006f60]" aria-hidden="true" /><span>{feature}</span></li>)}
              </ul>
            </div>
            <a href={buildWhatsAppUrl("مرحبًا، بدي أعرف تفاصيل باقة الانطلاق بـ130 دينار لمركزنا.")} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-source="pricing-launch" className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#006f60] px-5 py-3 font-bold text-white transition-colors hover:bg-[#05221C]"><MessageCircle className="h-4 w-4" aria-hidden="true" />اسأل عن باقة الانطلاق</a>
          </article>
          <article className="flex flex-col rounded-3xl border border-[#05221C] bg-[#05221C] p-6 text-white sm:p-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold">باقة المحترف</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-200">للمراكز التي تحتاج جدولة متعددة أو ربطًا مع أدوات الفريق.</p>
              <p className="mb-1 mt-6 text-3xl font-bold leading-[1.6]">حسب احتياج مركزك</p>
              <p className="text-sm text-emerald-200">عرض سعر واضح قبل البدء، حسب الوظائف المطلوبة.</p>
              <p className="mt-6 border-t border-white/15 pt-6 text-sm font-bold">كل ما في الانطلاق، مع خيارات مثل:</p>
              <ul className="mt-3 space-y-3 text-sm leading-relaxed text-slate-200">
                {proFeatures.map((feature) => <li key={feature} className="flex items-start gap-3"><Check className="mt-1 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" /><span>{feature}</span></li>)}
              </ul>
            </div>
            <a href={buildWhatsAppUrl("مرحبًا، عندنا احتياجات إضافية في جدولة مركزنا وبدي أناقش معكم باقة المحترف.")} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-source="pricing-pro" className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/40 px-5 py-3 font-bold text-white transition-colors hover:bg-white hover:text-[#05221C]"><MessageCircle className="h-4 w-4" aria-hidden="true" />ناقش احتياجات مركزك</a>
          </article>
        </div>
        <div className="mt-6 grid gap-4 rounded-2xl border border-slate-200 bg-white/60 p-5 text-sm leading-relaxed text-slate-600 sm:grid-cols-2 sm:p-6">
          <p><strong className="mb-1 block text-[#05221C]">شروط الدفع</strong>50% عند البدء، و50% بعد معاينة النظام وتجربته. الدفع عبر CliQ أو كاش.</p>
          <p><strong className="mb-1 block text-[#05221C]">قبل ما نبدأ</strong>نتفق على الربط المطلوب، وتنظيم المواعيد، والاستضافة والتعديلات والدعم. أي تكلفة إضافية نوضحها لك مسبقًا.</p>
        </div>
      </div>
    </section>
  );
}
