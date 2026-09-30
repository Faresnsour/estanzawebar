import React from 'react';
import { Clock, MessageCircle, CalendarX2, AlertCircle } from 'lucide-react';

export default function ProblemSection() {
  const problems = [
    {
      icon: Clock,
      badge: 'الحجز خارج أوقات العمل',
      title: 'العميل يريد الحجز قبل أن ترد عليه',
      description:
        'عندما يكون الحجز معتمدًا على الرد في واتساب، يبقى العميل منتظرًا حتى يعرف الخدمات والمواعيد المتاحة.',
      impact:
        'صفحة حجز متاحة للعميل في أي وقت.',
    },
    {
      icon: MessageCircle,
      badge: 'محادثات متكررة',
      title: 'نفس أسئلة الحجز تتكرر كل يوم',
      description:
        'نوع السيارة، الخدمة، اليوم والساعة. تفاصيل بسيطة، لكنها تتحول إلى سلسلة رسائل كلما أراد عميل جديد الحجز.',
      impact:
        'اجمع بيانات الحجز من البداية بدل تكرار الأسئلة.',
    },
    {
      icon: CalendarX2,
      badge: 'تعارض المواعيد',
      title: 'موعدان لنفس الوقت يربكان يوم الورشة',
      description:
        'عندما تُدار المواعيد يدويًا، يصبح من السهل فقدان رؤية الجدول الكامل أو حجز وقت مشغول مسبقًا.',
      impact:
        'جدول أوضح ومواعيد منظمة حسب إعدادات المركز.',
    },
  ];

  return (
    <section
      id="features"
      className="w-full py-16 lg:py-20 border-t border-emerald-950/5"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="w-full max-w-2xl mx-auto px-4 mb-12 text-right">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#008774] text-xs font-semibold mb-3">
            <AlertCircle className="w-3.5 h-3.5 text-[#008774]" />
            <span>مشاكل الحجز اليومية</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#05221C] tracking-tight leading-tight">
            الحجز اليدوي يأخذ من وقت فريقك أكثر مما ينبغي.
          </h2>

          <p className="mt-3 text-slate-600 text-base leading-relaxed">
            من أول سؤال على واتساب إلى تأكيد الموعد، تتكرر نفس التفاصيل كل يوم.
            Estanza يرتب هذه العملية في مكان واحد.
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
                    <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center transition-transform group-hover:scale-105 duration-200">
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