import React from 'react';
import { Eye, CheckSquare, MessageCircle, Sparkles } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      icon: Eye,
      title: 'اختيار الخدمة والاطلاع على الأسعار',
      description: 'يفتح العميل رابط مركزك ليجد باقات الـ PPF والنانو وتفاصيل العمل بوضوح وشفافية.',
      detail: 'واجهة رقمية فائقة السرعة تعمل فوراً على متصفح الهاتف.',
    },
    {
      num: '02',
      icon: CheckSquare,
      title: 'تحديد موعد الفحص والاستقبال',
      description: 'يختار اليوم والساعة المتاحة ويدخل اسمه ونوع مركبته في ثوانٍ معدودة.',
      detail: 'تأكيد مباشر دون الحاجة لإنشاء حسابات أو تنزيل تطبيقات.',
    },
    {
      num: '03',
      icon: MessageCircle,
      title: 'إشعار واتساب تلقائي لك وللعميل',
      description: 'يصلك إشعار بالاسم ورقم الهاتف وتفاصيل المركبة، ويستلم العميل تأكيداً بموقعه وموعده.',
      detail: 'توليد ملف التقويم وتوجيه مسار خرائط Google إلى باب مشغلك.',
    },
  ];

  return (
    <section id="how-it-works" className="w-full py-16 lg:py-20 border-t border-emerald-950/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="w-full max-w-2xl mx-auto px-4 mb-14 text-right">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#008774] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#008774]" />
            <span>تجربة سلسة في 3 خطوات</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#05221C] tracking-tight leading-tight">
            كيف يعمل النظام؟
          </h2>
          <p className="mt-3 text-slate-600 text-base leading-relaxed">
            تمت هندسة دورة الحجز لتكون الأسهل والأسرع لعميلك، دون أي تعقيد أو خطوات زائدة.
          </p>
        </div>

        {/* Sequential Step Cards with Dynamic Step Connectors */}
        <div className="relative">
          
          {/* Desktop Connecting Line between cards */}
          <div className="hidden lg:block absolute top-1/2 -translate-y-8 right-16 left-16 h-0.5 bg-gradient-to-l from-emerald-100 via-emerald-300/40 to-emerald-100 -z-0" />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-emerald-700/30 transition-all shadow-sm flex flex-col justify-between text-right group relative"
                >
                  <div>
                    {/* Top Row: Emerald Micro-Tag & Functional Icon */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="inline-flex items-center justify-center font-mono font-extrabold text-sm px-3 py-1 rounded-full bg-emerald-50 text-[#008774] border border-emerald-200/80 shadow-2xs group-hover:bg-[#008774] group-hover:text-white transition-colors duration-200">
                        {step.num}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-[#05221C] group-hover:border-[#008774]/40 transition-colors">
                        <Icon className="w-5 h-5 text-[#008774]" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-[#05221C] mb-2.5 tracking-tight group-hover:text-[#008774] transition-colors">
                      {step.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 font-medium">
                    {step.detail}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
