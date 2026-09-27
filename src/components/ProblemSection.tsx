import React from 'react';
import { Clock, MessageSquareX, CalendarX2, AlertCircle } from 'lucide-react';

export default function ProblemSection() {
  const problems = [
    {
      icon: Clock,
      badge: 'نزيف حجوزات المساء',
      title: 'زبون الليل يذهب للمنافس المستيقظ',
      description: 'أغلب أصحاب السيارات الفارهة يبحثون عن خدمات الحماية والعزل بعد العاشرة مساءً. غياب رابط الحجز الفوري يدفعهم للمنافس في صباح اليوم التالي.',
      impact: 'سيارة حماية نانو واحدة تضيع شهرياً تغطي تكلفة النظام بالكامل.',
    },
    {
      icon: MessageSquareX,
      badge: 'تشتيت طاقة المشغل',
      title: 'فريقك يستهلك وقته في "الشات"',
      description: 'تبادل ٨ إلى ١٠ رسائل لتأكيد نوع السيارة والساعة المناسبة يشتت تركيز الإدارة والفنيين، وغالباً ما ينتهي الاستفسار دون موعد فحص حقيقي.',
      impact: 'أكثر من ساعتين يومياً تضيع في تنسيق المواعيد عبر الدردشة اليدوية.',
    },
    {
      icon: CalendarX2,
      badge: 'فوضى مسارات الورشة',
      title: 'تكدس السيارات وإحراج مواعيد التسليم',
      description: 'الاعتماد على نوتة الهاتف أو الذاكرة يسبب تضارب دخول السيارات على الروافع، مما يربك جدول العمل ويهز ثقة العميل النخبوي بمركزك.',
      impact: 'تداخل المواعيد يربك الفنيين ويقلل عدد السيارات المنجزة أسبوعياً.',
    },
  ];

  return (
    <section id="features" className="w-full py-16 lg:py-20 border-t border-emerald-950/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="w-full max-w-2xl mx-auto px-4 mb-12 text-right">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#008774] text-xs font-semibold mb-3">
            <AlertCircle className="w-3.5 h-3.5 text-[#008774]" />
            <span>تشخيص كفاءة التشغيل الميداني</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#05221C] tracking-tight leading-tight">
            أين تضيع أرباح مركزك فعلياً؟
          </h2>
          <p className="mt-3 text-slate-600 text-base leading-relaxed">
            العميل اليوم يبحث عن الحجز والتأكيد الرقمي المباشر؛ أي بطء في الاستجابة يدفعه فوراً للذهاب إلى مركز بديل.
          </p>
        </div>

        {/* 3-Column Card Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-emerald-700/30 transition-all shadow-sm flex flex-col justify-between text-right group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    {/* Icon container in a rounded-xl soft tint container */}
                    <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center transition-transform group-hover:scale-105 duration-200 shadow-2xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-200/60">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#05221C] mb-2.5 tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 font-medium">
                  {item.impact}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
