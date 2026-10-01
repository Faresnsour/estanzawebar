import { SETUP_HOURS } from "./lib/site";

const steps = [
  { title: "نبدأ بخدمات مركزك", text: "ترسل الشعار والخدمات والأسعار وأوقات العمل، ونراجع كيف ترتّب مواعيدك اليوم." },
  { title: "نجهّز الصفحة ونراجعها معك", text: `التجهيز عادة خلال ${SETUP_HOURS} ساعة بعد استلام البيانات. تجرّب الصفحة على هاتفك وترسل ملاحظاتك.` },
  { title: "تستلم رابطك وتبدأ مشاركته", text: "نجرّب طلب حجز كاملًا، ونوضح لك طريقة الاستخدام والتعديلات والدعم المتفق عليه." },
];

export default function SetupSection() {
  return (
    <section aria-labelledby="setup-title" className="border-t border-slate-200/70 py-14 sm:py-16">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <p className="mb-3 text-sm font-bold text-[#006f60]">من أول محادثة إلى التسليم</p>
          <h2 id="setup-title" className="max-w-md text-3xl font-extrabold leading-snug text-[#05221C] sm:text-4xl">رابط لمركزك، على طريقة شغلك.</h2>
          <p className="mt-4 max-w-md text-base leading-7 text-slate-600">غسيل متنقل، تظليل، نانو أو ديتيلنج. نبدأ بالخدمات التي تقدمها، ونحدد طريقة استقبال الطلبات وتنظيمها قبل التنفيذ.</p>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">تحتاج منع تعارض على رافعة، أو ربطًا بجدول فريقك؟ نراجع الموارد ومدة الخدمات ونوضح لك الربط المناسب ضمن عرض السعر.</p>
        </div>
        <ol className="divide-y divide-slate-200 border-y border-slate-200">
          {steps.map((step, index) => <li key={step.title} className="flex gap-4 py-6"><span className="pt-1 text-sm font-bold tabular-nums text-[#006f60]" aria-hidden="true">0{index + 1}</span><div><h3 className="text-lg font-bold text-[#05221C]">{step.title}</h3><p className="mt-2 text-sm leading-7 text-slate-600">{step.text}</p></div></li>)}
        </ol>
      </div>
    </section>
  );
}
