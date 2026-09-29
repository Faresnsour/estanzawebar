'use client';

import React, { useState } from 'react';
import { Check, MessageCircle, Star, ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "كيف يتم التسليم؟",
    answer: "التسليم خلال 72 ساعة من التواصل، رابط جاهز بهوية مركزك، بدون أي إعداد تقني من طرفك."
  },
  {
    question: "هل يحتاج الزبون تطبيق؟",
    answer: "لا، الحجز عبر رابط متصفح مباشر، والتأكيد عبر واتساب العادي بدون تنزيل أي شيء."
  },
  {
    question: "بنقدر نعدل الخدمات والأسعار لاحقاً؟",
    answer: "نعم، أي تعديل يتم بنفس اليوم بمجرد إرسال التحديث عبر واتساب."
  },
  {
    question: "آلية السداد؟",
    answer: "دفعة 50% مقدم (CliQ أو كاش) عند البدء، والـ 50% المتبقية بعد معاينة وتجربة النظام جاهزاً على هاتفك."
  }
];

export default function PricingSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const msgLaunch = encodeURIComponent("يعطيك العافية، بدي اركب نظام حجز المواعيد ومنع تعارض الروافع لمشغلنا بعرض (130 دينار تدشين شامل).");
  const msgPro = encodeURIComponent("مرحبا معلم، مهتم بالمنظومة الشاملة المخصصة مع ربط التقويم وسابقة الأعمال، احكيلي التفاصيل لو سمحت.");

  return (
    <section id="pricing" className="py-20 bg-[#F8FAF9] text-slate-800 overflow-x-hidden w-full border-t border-slate-200/60">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center w-full max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs sm:text-sm font-bold tracking-wider text-[#008774] bg-[#008774]/10 border border-[#008774]/20 px-4 py-1.5 rounded-full mb-4">
            باقات تدشين شفافة ومباشرة
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#05221C] tracking-tight leading-tight">
            استثمار لمرة واحدة · بدون عمولات أو اشتراكات
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-4 leading-relaxed">
            تكلفة النظام بالكامل تُسترد من قيمة أول سيارة نانو سيراميك تنقذ موعدها من الذهاب للمنافس ليلاً.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto mb-24">
          
          {/* Card 1: Launch Plan */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-slate-200 shadow-xl shadow-slate-200/50 text-right relative">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-2xl font-bold text-[#05221C]">باقة الانطلاق المباشر</h3>
                  <p className="text-xs sm:text-sm font-semibold text-[#008774] mt-1">نظام الحجز وتثبيت المواعيد</p>
                </div>
                <span className="text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200 px-3 py-1 rounded-full">
                  تدشين شامل
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-500 mt-3 leading-relaxed">
                حل فوري لتثبيت المواعيد ومنع تداخل الحجوزات نهائياً على الروافع.
              </p>

              {/* Price */}
              <div className="my-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-extrabold text-[#05221C] font-mono tracking-tight">130</span>
                  <span className="text-sm text-slate-500 font-medium">دينار أردني / تدشين شامل</span>
                </div>
                <p className="text-xs font-semibold text-[#008774] mt-1">
                  دفعة لمرة واحدة فقط · استضافة ودعم وتجهيز شامل بدون أي اشتراك شهري
                </p>
              </div>

              {/* Features List */}
              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700 pt-4 border-t border-slate-100">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 text-[#008774] flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span>صفحة هبوط سريعة وخفيفة جداً عالتلفون بهوية وشعار وألوان مركزك.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 text-[#008774] flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span className="font-semibold text-[#05221C]">منع تعارض المواعيد تلقائياً (النظام يرفض أي حجز متزامن على نفس الرافعة).</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 text-[#008774] flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span>تحويل بيانات الحجز فوراً لواتساب إدارة المشغل لمنع أي ضياع للمواعيد.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 text-[#008774] flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span className="font-semibold text-[#05221C]">جدول Google Sheets سحابي خاص بالمركز لحفظ وأرشفة المواعيد وبيانات العملاء تلقائياً.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 text-[#008774] flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span>جاهز للعمل في مشغلك خلال 72 ساعة وتسليم مفتاح.</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4">
              <a
                href={`https://wa.me/962790899175?text=${msgLaunch}`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl border-2 border-[#05221C] text-[#05221C] hover:bg-[#05221C] hover:text-white font-bold text-sm sm:text-base transition-all duration-200 active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4 text-[#008774]" />
                <span>طلب تركيب النظام لمشغلك (130 د.أ)</span>
              </a>
            </div>
          </div>

          {/* Card 2: Pro Suite (Hero Dark) */}
          <div className="bg-[#05221C] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl border-2 border-[#008774]/50 text-right relative mt-6 lg:mt-0">
            <div className="absolute -top-3.5 right-6 sm:right-8 bg-[#008774] text-white text-xs font-bold px-3.5 py-1 rounded-full uppercase shadow-md flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>الخيار المتكامل للمشاغل الكبرى</span>
            </div>

            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h3 className="text-2xl font-bold text-white">منظومة الاستوديو الشاملة</h3>
                  <p className="text-xs sm:text-sm font-semibold text-emerald-300 mt-1">أتمتة وإدارة كاملة</p>
                </div>
                <span className="text-xs font-bold bg-[#008774]/30 text-emerald-200 border border-[#008774]/50 px-3 py-1 rounded-full">
                  شامل المفتاح
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                نظام متكامل يربط تقويم المشغل تلقائياً مع معرض صور وفيديوهات سابقة الأعمال.
              </p>

              {/* Price */}
              <div className="my-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">استثمار مخصص</span>
                </div>
                <p className="text-xs font-semibold text-emerald-300 mt-1">
                  حسب عدد الروافع والخدمات وسعة المشغل
                </p>
              </div>

              {/* Features List */}
              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-200 pt-4 border-t border-white/10">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#008774] stroke-[2.5]" />
                  </div>
                  <span className="font-semibold text-white">ربط ومزامنة تلقائية ومباشرة مع Google Calendar لمنع أي تداخل.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#008774] stroke-[2.5]" />
                  </div>
                  <span>معرض سابقة أعمال مدمج لعرض نتائج النانو والـ PPF قبل وبعد لإقناع الزبون.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#008774] stroke-[2.5]" />
                  </div>
                  <span>نظام تذكير دوري بمواعيد تجديد النانو وإعادة استهداف عملاء الـ VIP.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#008774] stroke-[2.5]" />
                  </div>
                  <span>متابعة شخصية ودعم فني مخصص وتعديلات مستمرة لضمان أعلى أداء.</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4">
              <a
                href={`https://wa.me/962790899175?text=${msgPro}`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#008774] hover:bg-[#008774]/90 text-white font-bold text-sm sm:text-base transition-all duration-200 active:scale-[0.98] shadow-lg shadow-[#008774]/20"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>اطلب تفاصيل المنظومة الشاملة عواتساب</span>
              </a>
            </div>
          </div>

        </div>

        {/* FAQs Section */}
        <div className="max-w-3xl mx-auto pt-10 border-t border-slate-200/80">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#05221C]">الأسئلة الشائعة</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">إليك إجابات وافية عن أهم استفسارات أصحاب المشاغل</p>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200 shadow-sm"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 text-right flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:bg-slate-50 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-[#008774] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.answer}
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
