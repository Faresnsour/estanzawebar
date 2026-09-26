'use client';
import React, { useState } from 'react';
import { Check, MessageCircle, Star, Sparkles } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_LIST: FaqItem[] = [
  {
    question: 'كيف يتم تسليم النظام والبدء في استخدامه لمشغلنا؟',
    answer: 'بعد استلام شعارك، قائمة خدماتك (PPF، نانو، تظليل)، وأسعارك المعتمدة، نبرمج الصفحة ونربطها برقم واتساب مشغلك ونختبر إرسال الحجوزات الحية خلال 72 ساعة.',
  },
  {
    question: 'هل يحتاج زبائن المركز لتحميل أي تطبيق لإتمام الحجز؟',
    answer: 'نهائياً؛ يفتح العميل رابط مركزك مباشرة من إنستغرام أو المتصفح، ويتم تأكيد موعد فحص السيارة في أقل من 30 ثانية دون أي تعقيد أو تسجيل حساب.',
  },
  {
    question: 'هل يمكننا تعديل الخدمات، الأسعار، وأوقات العمل لاحقاً؟',
    answer: 'نعم بالتأكيد؛ نوفر لك آلية سريعة وسلسة لتعديل الأسعار والمواعيد المتاحة على الروافع متى ما شئت، مع مرافقة الدعم الفني لأي تحديث.',
  },
  {
    question: 'ما هي آلية سداد التكلفة المتبعة؟',
    answer: 'نبدأ العمل بدفعة أولى 50% كعربون جدية، والـ 50% المتبقية لا يتم سدادها إلا بعد رفع النظام وتشغيله بالكامل وتجربة إرسال رسائل الحجز إلى هاتفك بنجاح.',
  },
];

export default function PricingSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section id="pricing" className="w-full py-16 lg:py-24 border-t border-emerald-950/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#008774] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#008774]" />
            <span>باقات تدشين شفافة ومباشرة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#05221C] tracking-tight leading-tight">
            استثمار لمرة واحدة · بدون عمولات أو اشتراكات
          </h2>
          <p className="mt-3 text-slate-600 text-base leading-relaxed">
            تكلفة النظام بالكامل تُسترد من قيمة أول سيارة نانو سيراميك تنقذ موعدها من الذهاب للمنافس ليلاً.
          </p>
        </div>

        {/* Tiered Bento Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch mb-20">
          
          {/* Starter Card (210 JOD): Light Surface */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-8 relative flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 text-right">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-2xl font-bold text-[#05221C] tracking-tight">
                    باقة الانطلاق المباشر
                  </h3>
                  <p className="text-sm font-semibold text-[#008774] mt-0.5">
                    نظام الحجز السريع
                  </p>
                </div>
                <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                  تدشين شامل
                </span>
              </div>

              <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                حل فوري لتثبيت المواعيد ومنع تداخل الحجوزات على الروافع.
              </p>

              {/* Price */}
              <div className="my-6 flex items-baseline gap-2">
                <span className="text-5xl font-extrabold text-[#05221C] font-mono tracking-tight">
                  ٢١٠
                </span>
                <span className="text-sm text-slate-500 font-medium">
                  دينار أردني / تدشين شامل
                </span>
              </div>

              {/* Features List */}
              <ul className="space-y-3.5 text-sm text-slate-700 pt-2 border-t border-slate-100">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 text-[#008774] flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200/60">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span>صفحة هبوط سريعة ومخصصة للهواتف بهوية وشعار وألوان مركزك.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 text-[#008774] flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200/60">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span>محرك حجز تفاعلي لاختيار نوع الخدمة، يوم المعاينة، والساعة المتاحة.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 text-[#008774] flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200/60">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span>إشعار واتساب فوري لك وللعميل عند كل حجز جديد بتفاصيل المركبة.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 text-[#008774] flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200/60">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span className="font-semibold text-[#05221C]">جاهز للعمل في مشغلك خلال 72 ساعة.</span>
                </li>
              </ul>
            </div>

            {/* Secondary outline CTA button */}
            <div className="mt-8 pt-4">
              <a
                href="https://wa.me/962790000000?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20Estanza%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%B7%D9%84%D8%A8%20%D8%A8%D8%A7%D9%82%D8%A9%20%D8%A7%D9%84%D8%A7%D9%86%D8%B7%D9%84%D8%A7%D9%82%20%D8%A7%D9%84%D8%B3%D8%B1%D9%8A%D8%B9%20(210%20%D8%AF%D9%8A%D9%86%D8%A7%D8%B1)"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl border-2 border-[#05221C] text-[#05221C] hover:bg-[#05221C] hover:text-white font-bold text-sm sm:text-base transition-all duration-200 active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4 text-[#008774]" />
                <span>طلب باقة الانطلاق عبر واتساب</span>
              </a>
            </div>
          </div>

          {/* Pro Card (350 JOD - Visual Hero) */}
          <div className="bg-[#05221C] text-white rounded-3xl p-8 pt-10 relative flex flex-col justify-between shadow-2xl border-2 border-[#008774]/40 text-right">
            
            {/* Absolute positioned badge */}
            <div className="absolute -top-3.5 right-8 bg-[#008774] text-white text-xs font-bold px-3.5 py-1 rounded-full uppercase shadow-md flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>الأكثر طلباً وتوفيراً للمشاغل</span>
            </div>

            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    منظومة الاستوديو الشاملة
                  </h3>
                  <p className="text-sm font-semibold text-emerald-300 mt-0.5">
                    النظام المتكامل
                  </p>
                </div>
                <span className="text-xs font-bold bg-[#008774]/30 text-emerald-200 border border-[#008774]/50 px-3 py-1 rounded-full">
                  الحل المتكامل
                </span>
              </div>

              <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                أتمتة شاملة للمشغل مع مزامنة التقويم ومعرض صور مدمج.
              </p>

              {/* Price */}
              <div className="my-6 flex items-baseline gap-2">
                <span className="text-5xl font-extrabold text-white font-mono tracking-tight">
                  ٣٥٠
                </span>
                <span className="text-sm text-emerald-200/80 font-medium">
                  دينار أردني / تدشين شامل
                </span>
              </div>

              {/* Features List */}
              <ul className="space-y-3.5 text-sm text-slate-200 pt-2 border-t border-white/10">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#008774] stroke-[2.5]" />
                  </div>
                  <span className="font-semibold text-white">معرض سابقة أعمال مدمج لعرض نتائج النانو والـ PPF قبل وبعد.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#008774] stroke-[2.5]" />
                  </div>
                  <span>ربط ومزامنة تلقائية مع تقويم المشغل (Google Calendar) لمنع أي تداخل بين الحجوزات.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#008774] stroke-[2.5]" />
                  </div>
                  <span>تصدير وحفظ تلقائي لبيانات وأرقام العملاء لاستخدامها في عروض المواسم.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#008774] stroke-[2.5]" />
                  </div>
                  <span className="font-semibold text-white">دعم فني وتعديلات تشغيلية مرافقة لمدة شهر كامل بعد التسليم.</span>
                </li>
              </ul>
            </div>

            {/* Solid button */}
            <div className="mt-8 pt-4">
              <a
                href="https://wa.me/962790000000?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20Estanza%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%B7%D9%84%D8%A8%20%D9%85%D9%86%D8%B8%D9%88%D9%85%D8%A9%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%D9%8A%D9%88%20%D8%A7%D9%84%D8%B4%D8%A7%D9%85%D9%84%D8%A9%20(350%20%D8%AF%D9%8A%D9%86%D8%A7%D8%B1)"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#008774] hover:bg-[#00a890] text-white font-bold text-sm sm:text-base transition-all duration-200 active:scale-[0.98] shadow-lg shadow-emerald-950/40"
              >
                <MessageCircle className="w-4 h-4 text-emerald-200" />
                <span>طلب منظومة الاستوديو عبر واتساب</span>
              </a>
            </div>

          </div>

        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto text-right">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#05221C] tracking-tight">
              الأسئلة الشائعة
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              إليك إجابات وافية عن أهم الاستفسارات قبل بدء التنفيذ:
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_LIST.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="border border-slate-200/90 rounded-2xl overflow-hidden bg-white shadow-2xs transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full py-4 px-6 text-right flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#05221C] hover:bg-slate-50 transition-colors"
                  >
                    <span>{item.question}</span>
                    <span className={`w-7 h-7 rounded-full bg-emerald-50 text-[#008774] flex items-center justify-center font-bold text-lg transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-45 bg-[#008774] text-white' : ''}`}>
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-2 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-[#F9FBFA]">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
