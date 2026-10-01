import { Check, MessageCircle } from "lucide-react";
import { buildWhatsAppUrl, LAUNCH_PRICE } from "./lib/site";

const launchFeatures = [
  "شعار مركزك وألوانه",
  "الخدمات والأسعار ومدة الخدمة",
  "الموعد وبيانات العميل والسيارة",
  "رسالة واتساب بتفاصيل طلب الحجز",
  "معاينة الصفحة على الهاتف قبل التسليم",
];
const proFeatures = [
  "أكثر من موظف أو رافعة",
  "معرض لأعمال المركز",
  "تخصيص خطوات الحجز",
  "ربط Google Sheets أو Calendar",
];

export default function PricingSection() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div data-reveal className="mb-8">
          <p className="mb-3 text-sm font-bold text-[#006f60]">الباقات</p>
          <h2 id="pricing-title" className="text-3xl font-extrabold leading-snug text-[#05221C] sm:text-4xl">ابدأ بما يحتاجه مركزك.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:gap-7">
          <article data-reveal className="flex flex-col rounded-3xl border border-[#008774]/25 bg-white p-6 shadow-sm sm:p-8">
            <h3 className="text-2xl font-bold text-[#05221C]">باقة الانطلاق</h3>
            <p className="mb-2 mt-5 flex items-baseline gap-2 text-[#05221C]"><span className="text-5xl font-extrabold tabular-nums">{LAUNCH_PRICE}</span><span className="text-base font-semibold">د.أ</span></p>
            <p className="text-sm font-semibold text-[#006f60]">دفع مرة واحدة · بدون اشتراك شهري</p>
            <ul className="mb-6 mt-5 flex-1 space-y-2.5 border-t border-slate-200 pt-5 text-sm leading-6 text-slate-700">
              {launchFeatures.map((feature) => <li key={feature} className="flex items-start gap-2.5"><Check className="mt-1 h-4 w-4 shrink-0 text-[#006f60]" aria-hidden="true" /><span>{feature}</span></li>)}
            </ul>
            <a href={buildWhatsAppUrl("مرحبًا، بدي أعرف تفاصيل باقة الانطلاق بـ130 دينار لمركزنا.")} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-source="pricing-launch" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#006f60] px-5 py-3 font-bold text-white transition-[background-color,transform] duration-200 hover:bg-[#05221C] motion-safe:active:scale-[0.98]"><MessageCircle className="h-4 w-4" aria-hidden="true" />اسأل عن باقة الانطلاق</a>
          </article>
          <article data-reveal className="flex flex-col rounded-3xl border border-[#05221C] bg-[#05221C] p-6 text-white sm:p-8">
            <h3 className="text-2xl font-bold">باقة المحترف</h3>
            <p className="mb-2 mt-5 text-2xl font-bold leading-snug sm:text-3xl">حسب احتياج المركز</p>
            <p className="text-sm text-emerald-200">كل ما في الانطلاق، مع خيارات مثل:</p>
            <ul className="mb-6 mt-5 flex-1 space-y-2.5 border-t border-white/15 pt-5 text-sm leading-6 text-slate-200">
              {proFeatures.map((feature) => <li key={feature} className="flex items-start gap-2.5"><Check className="mt-1 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" /><span>{feature}</span></li>)}
            </ul>
            <a href={buildWhatsAppUrl("مرحبًا، عندنا احتياجات إضافية في جدولة مركزنا وبدي أناقش معكم باقة المحترف.")} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-source="pricing-pro" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/40 px-5 py-3 font-bold text-white transition-[background-color,color,transform] duration-200 hover:bg-white hover:text-[#05221C] motion-safe:active:scale-[0.98]"><MessageCircle className="h-4 w-4" aria-hidden="true" />ناقش احتياجات مركزك</a>
          </article>
        </div>
        <p className="mt-5 text-center text-xs leading-6 text-slate-600 sm:text-sm">50% عند البدء و50% بعد المعاينة.</p>
      </div>
    </section>
  );
}
