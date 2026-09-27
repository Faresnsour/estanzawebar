'use client';


import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  Calendar,
  Check,
  CheckCheck,
  ArrowLeft,
  MessageCircle,
  Smartphone,
  ShieldCheck,
  Zap,
  Wifi,
  Battery,
} from 'lucide-react';

interface ServiceItem {
  id: string;
  name: string;
  duration: string;
  price: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: 'ppf',
    name: 'حماية مقدمة كاملة (PPF)',
    duration: 'يومين عمل',
    price: '٨٥٠ د.أ',
  },
  {
    id: 'ceramic',
    name: 'نانو سيراميك معالجة 9H',
    duration: '٢٤ ساعة',
    price: '١٦٠ د.أ',
  },
  {
    id: 'tint',
    name: 'عازل حراري نانو كامل',
    duration: '٣ ساعات',
    price: '١١٠ د.أ',
  },
];

const AVAILABLE_DAYS = [
  { day: 'السبت', date: '٢٦ سبتمبر' },
  { day: 'الأحد', date: '٢٧ سبتمبر' },
  { day: 'الإثنين', date: '٢٨ سبتمبر' },
];

const TIME_SLOTS = ['٠٩:٣٠ ص', '١٢:٣٠ م', '٠٤:٠٠ م', '٠٦:٣٠ م'];

export default function Hero() {
  const [selectedService, setSelectedService] = useState<ServiceItem>(SERVICES[0]);
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[0]);
  const [clientName, setClientName] = useState('عمر التميمي (BMW G30)');
  const [phoneView, setPhoneView] = useState<'booking' | 'whatsapp'>('booking');

  const selectedDate = AVAILABLE_DAYS[selectedDayIdx];

  /* ------------------------------------------------------------ */
  /* Refs for GSAP orchestration                                  */
  /* ------------------------------------------------------------ */
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const ctaRowRef = useRef<HTMLDivElement>(null);
  const trustRowRef = useRef<HTMLDivElement>(null);
  const phoneWrapperRef = useRef<HTMLDivElement>(null);
  const phoneFrameRef = useRef<HTMLDivElement>(null);
  const idleTweenRef = useRef<gsap.core.Tween | null>(null);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneView('whatsapp');
  };

  /* ------------------------------------------------------------ */
  /* Entry timeline + idle float                                  */
  /* ------------------------------------------------------------ */
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [
            badgeRef.current,
            headlineRef.current,
            paragraphRef.current,
            ctaRowRef.current?.children ?? [],
            trustRowRef.current?.children ?? [],
            phoneWrapperRef.current,
          ],
          { opacity: 1, y: 0, scale: 1, clearProps: 'all' }
        );
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        badgeRef.current,
        { y: -15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55 }
      )
        .fromTo(
          headlineRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          '-=0.25'
        )
        .fromTo(
          paragraphRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.45'
        )
        .fromTo(
          ctaRowRef.current?.children ?? [],
          { scale: 0.96, y: 12, opacity: 0 },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.1,
            ease: 'back.out(1.6)',
          },
          '-=0.3'
        )
        .fromTo(
          trustRowRef.current?.children ?? [],
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, stagger: 0.08 },
          '-=0.25'
        )
        .fromTo(
          phoneWrapperRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
          '-=0.6'
        );

      tl.eventCallback('onComplete', () => {
        if (phoneFrameRef.current) {
          idleTweenRef.current = gsap.to(phoneFrameRef.current, {
            y: -8,
            duration: 2.6,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
          });
        }
      });
    }, sectionRef);

    return () => {
      idleTweenRef.current?.kill();
      ctx.revert();
    };
  }, []);

  /* ------------------------------------------------------------ */
  /* Micro-interaction helpers                                    */
  /* ------------------------------------------------------------ */
  const snapTween = (el: HTMLElement | null) => {
    if (!el) return;
    gsap.fromTo(
      el,
      { scale: 0.94 },
      { scale: 1, duration: 0.35, ease: 'back.out(2.4)' }
    );
  };

  const handleServiceSelect = (
    service: ServiceItem,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    setSelectedService(service);
    snapTween(e.currentTarget);
  };

  const handleDaySelect = (idx: number, e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedDayIdx(idx);
    snapTween(e.currentTarget);
  };

  const handleTimeSelect = (time: string, e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedTime(time);
    snapTween(e.currentTarget);
  };

  const handleViewSwitch = (
    view: 'booking' | 'whatsapp',
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    setPhoneView(view);
    snapTween(e.currentTarget);
  };

  return (
    <section ref={sectionRef} className="relative w-full py-12 lg:py-20 overflow-hidden">
      {/* Container restricted to max-w-6xl */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2-Column Desktop Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Text Column (col-span-7, RTL right-aligned) */}
          <div className="lg:col-span-7 flex flex-col text-right">
            
            {/* Micro-badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#008774] text-xs font-semibold mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#008774] animate-pulse" />
              <span>أنظمة حجز متطورة لاستوديوهات النخبة</span>
              <span className="text-emerald-300"> ·</span>
              <span className="text-[#05221C] font-medium">تأكيد فوري ومباشر على واتساب</span>
            </div>

            {/* Headline (H1) with tracking-tight on Arabic heading */}
            <h1
              ref={headlineRef}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#05221C] leading-[1.25] tracking-tight"
            >
              حوّل استفسارات إنستغرام ليلاً إلى حجوزات فحص مؤكدة.. تلقائياً.
            </h1>

            {/* Subtitle */}
            <p
              ref={paragraphRef}
              className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl"
            >
              زبونك الذي يطلب نانو سيراميك أو حماية PPF لا ينتظر لساعات لترد عليه. نوفر لمركزك صفحة حجز سريعة تليق بمستوى شغلك؛ يختار العميل سيارته، ويصلك إشعار الحجز فوراً على واتساب بدون تضييع وقت فريقك في الشات.
            </p>

            {/* CTA Button Pair */}
            <div
              ref={ctaRowRef}
              className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5"
            >
              <a
                href="/demo"
                className="bg-[#008774] text-white hover:bg-[#05221C] shadow-md shadow-emerald-900/10 px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base inline-flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-[0.98]"
              >
                <Calendar className="w-4 h-4 shrink-0" />
                <span>تجربة حجز تجريبي الآن</span>
              </a>
              <a
                href="https://wa.me/?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20Estanza%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%AA%D8%AC%D9%87%D9%8A%D8%B2%20%D9%86%D8%B8%D8%A7%D9%85%20%D8%AD%D8%AC%D9%88%D8%B2%D8%A7%D8%AA%20%D9%84%D9%85%D8%B1%D9%83%D8%B2%D9%86%D8%A7"
                target="_blank"
                rel="noreferrer"
                className="border border-slate-300 text-slate-700 hover:bg-slate-100 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base inline-flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4 text-[#008774] shrink-0" />
                <span>تواصل معنا عبر واتساب</span>
              </a>
            </div>

            {/* Trust and Key Points */}
            <div
              ref={trustRowRef}
              className="mt-8 pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-slate-500 font-medium"
            >
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#008774] shrink-0" />
                <span>تشغيل النظام خلال 72 ساعة</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#05221C] shrink-0" />
                <span>لا يتطلب تطبيقاً إضافياً للعميل</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#008774] shrink-0" />
                <span>دفع 50% فقط حتى تجربة التشغيل</span>
              </div>
            </div>
          </div>

          {/* Device Column (col-span-5) */}
          <div
            ref={phoneWrapperRef}
            className="lg:col-span-5 flex justify-center lg:justify-end relative"
            id="demo"
          >
            {/* Subtle backlight shadow behind device */}
            <div className="absolute -inset-4 bg-[#008774]/10 rounded-[3.5rem] blur-2xl -z-10" />

            {/* Realistic iPhone Bezel: max-w-[320px] rounded-[3rem] border-[6px] border-[#05221C] shadow-2xl */}
            <div
              ref={phoneFrameRef}
              className="w-full max-w-[320px] mx-auto rounded-[3rem] border-[6px] border-[#05221C] shadow-2xl overflow-hidden bg-white text-right relative"
            >
              {/* Dynamic Island / Notch */}
              <div className="bg-white pt-2 pb-1 px-5 flex items-center justify-between border-b border-slate-100">
                <span className="text-[11px] font-bold text-[#05221C] font-mono">9:41</span>
                <div className="w-20 h-3.5 bg-[#05221C] rounded-full mx-auto" />
                <div className="flex items-center gap-1.5 text-[#05221C]">
                  <Wifi className="w-3 h-3" />
                  <Battery className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* View Switcher Header inside Mockup */}
              <div className="bg-slate-50 p-2 border-b border-slate-200 flex items-center gap-1">
                <button
                  type="button"
                  onClick={(e) => handleViewSwitch('booking', e)}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all text-center ${
                    phoneView === 'booking'
                      ? 'bg-[#05221C] text-white shadow-xs'
                      : 'text-slate-600 hover:text-[#05221C] bg-white border border-slate-200'
                  }`}
                >
                  صفحة الحجز
                </button>
                <button
                  type="button"
                  onClick={(e) => handleViewSwitch('whatsapp', e)}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all text-center flex items-center justify-center gap-1 ${
                    phoneView === 'whatsapp'
                      ? 'bg-[#008774] text-white shadow-xs'
                      : 'text-slate-600 hover:text-[#05221C] bg-white border border-slate-200'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                  <span>إشعار واتساب</span>
                </button>
              </div>

              {/* Phone Content Screen */}
              <div className="h-[460px] overflow-y-auto custom-scrollbar p-3.5 pb-6 bg-[#F9FBFA] text-slate-800 text-xs">
                
                {phoneView === 'booking' ? (
                  <form suppressHydrationWarning onSubmit={handleBookingSubmit} className="space-y-3.5 pb-2">
                    
                    {/* Brand Banner Inside App */}
                    <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#05221C] text-white flex items-center justify-center font-bold text-xs shrink-0">
                        K
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-[11px] text-[#05221C] truncate">
                          مركز السريع للسيارات
                        </h4>
                        <p className="text-[10px] text-slate-500">
                          اختر نوع التجهيز وموعد المعاينة
                        </p>
                      </div>
                    </div>

                    {/* Step 1: Service Selection */}
                    <div>
                      <span className="text-[11px] font-bold text-[#05221C] block mb-1">
                        1. اختر نوع الخدمة:
                      </span>
                      <div className="space-y-1.5">
                        {SERVICES.map((s) => {
                          const isSelected = selectedService.id === s.id;
                          return (
                            <button
                              key={s.id}
                              type="button"
                              onClick={(e) => handleServiceSelect(s, e)}
                              className={`w-full text-right p-2 rounded-xl border transition-colors text-[11px] flex items-center justify-between ${
                                isSelected
                                  ? 'border-[#008774] bg-emerald-50/70 shadow-2xs'
                                  : 'border-slate-200 bg-white hover:border-[#008774]/40'
                              }`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <span
                                  className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                                    isSelected
                                      ? 'border-[#008774] bg-[#008774] text-white'
                                      : 'border-slate-300'
                                  }`}
                                >
                                  {isSelected && <Check className="w-2.5 h-2.5" />}
                                </span>
                                <div>
                                  <span className="font-semibold text-[#05221C] block truncate">
                                    {s.name}
                                  </span>
                                  <span className="text-[9px] text-slate-400 block">
                                    {s.duration}
                                  </span>
                                </div>
                              </div>
                              <span className="font-bold text-[#008774] font-mono shrink-0">
                                {s.price}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Step 2: Date & Time Selection */}
                    <div>
                      <span className="text-[11px] font-bold text-[#05221C] block mb-1">
                        2. حدد موعد الفحص:
                      </span>
                      <div className="grid grid-cols-3 gap-1 mb-1.5">
                        {AVAILABLE_DAYS.map((d, idx) => {
                          const isSelected = selectedDayIdx === idx;
                          return (
                            <button
                              key={d.day}
                              type="button"
                              onClick={(e) => handleDaySelect(idx, e)}
                              className={`py-1.5 px-1 rounded-lg border text-center transition-colors ${
                                isSelected
                                  ? 'bg-[#05221C] text-white border-[#05221C] font-bold'
                                  : 'bg-white text-slate-700 border-slate-200'
                              }`}
                            >
                              <span className="block text-[10px] leading-tight">{d.day}</span>
                              <span className={`block text-[8px] ${isSelected ? 'text-emerald-300' : 'text-slate-400'}`}>
                                {d.date}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      <div className="grid grid-cols-2 gap-1">
                        {TIME_SLOTS.map((t) => {
                          const isSelected = selectedTime === t;
                          return (
                            <button
                              key={t}
                              type="button"
                              onClick={(e) => handleTimeSelect(t, e)}
                              className={`py-1.5 px-2 rounded-lg text-center text-[10px] font-mono tabular-nums border transition-colors ${
                                isSelected
                                  ? 'bg-[#008774] text-white border-[#008774] font-bold'
                                  : 'bg-white text-slate-700 border-slate-200'
                              }`}
                            >
                              {t}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Step 3: Client & Car */}
                    <div>
                      <label htmlFor="client-mobile-name" className="text-[11px] font-bold text-[#05221C] block mb-1">
                        بيانات العميل والمركبة:
                      </label>
                      <input suppressHydrationWarning id="client-mobile-name"
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="الاسم ونوع السيارة"
                        className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-[#008774]"
                      />
                    </div>

                    {/* Action Button */}
                    <button
                      type="submit"
                      className="w-full py-2.5 px-3 rounded-xl bg-[#008774] hover:bg-[#00a890] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-[0.98]"
                    >
                      <span>تأكيد الموعد وإرسال لواتساب</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>

                  </form>
                ) : (
                  /* WhatsApp View */
                  <div className="space-y-3 pb-2">
                    
                    {/* WhatsApp Business Header */}
                    <div className="bg-[#05221C] text-white p-2 rounded-xl flex items-center justify-between shadow-xs">
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded bg-emerald-700 text-white flex items-center justify-center font-bold text-[10px]">
                          K
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            <span className="text-[11px] font-bold">Kinesis Studio</span>
                            <span className="text-[10px] text-[#008774]">✓</span>
                          </div>
                          <span className="text-[8px] text-emerald-300 block font-mono" dir="ltr">
                            WhatsApp Business API
                          </span>
                        </div>
                      </div>
                      <span className="text-[9px] bg-[#008774] px-1.5 py-0.5 rounded text-white font-medium">
                        متصل
                      </span>
                    </div>

                    {/* WhatsApp Speech Bubble */}
                    <div className="bg-white rounded-xl p-3 border border-slate-200/90 shadow-2xs space-y-2 text-right">
                      
                      <div className="flex items-center justify-between border-b border-slate-100 pb-1">
                        <div className="flex items-center gap-1 text-[10px] font-bold text-[#008774]">
                          <CheckCheck className="w-3 h-3 text-[#008774]" />
                          <span>حجز فحص مؤكد</span>
                        </div>
                        <span className="text-[9px] font-mono text-slate-400">#BK-9204</span>
                      </div>

                      <p className="text-[11px] font-medium text-slate-900 leading-snug">
                        مرحباً <span className="font-bold text-[#05221C]">{clientName}</span>، تم تسجيل موعد فحص وتجهيز المركبة!
                      </p>

                      <div className="bg-[#F9FBFA] rounded-lg p-2 border border-slate-200/80 text-[10px] space-y-1 text-slate-700">
                        <div className="flex justify-between">
                          <span className="text-slate-500">الخدمة المطلوبة:</span>
                          <span className="font-bold text-[#05221C]">{selectedService.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">موعد الاستقبال:</span>
                          <span className="font-bold text-[#05221C]">
                            {selectedDate.day}، {selectedDate.date} ({selectedTime})
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">التكلفة التقديرية:</span>
                          <span className="font-bold text-[#008774] font-mono">{selectedService.price}</span>
                        </div>
                      </div>

                      <div className="pt-1.5 border-t border-slate-100 space-y-1">
                        <div className="w-full py-1 bg-emerald-50 text-[#008774] rounded text-center font-semibold text-[9px]">
                          📍 رابط خريطة موقع الاستوديو — عمّان
                        </div>
                        <div className="w-full py-1 bg-slate-100 text-slate-700 rounded text-center font-semibold text-[9px]">
                          📅 إضافة الموعد إلى Google Calendar
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-1 pt-0.5 text-[8px] text-slate-400 font-mono">
                        <span>16:02</span>
                        <CheckCheck className="w-3 h-3 text-[#008774]" />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        setPhoneView('booking');
                        snapTween(e.currentTarget);
                      }}
                      className="w-full py-1.5 bg-slate-200 hover:bg-slate-300 text-[#05221C] font-bold text-[10px] rounded-lg transition-colors text-center"
                    >
                      تعديل الحجز واختيار وقت آخر
                    </button>
                  </div>
                )}

              </div>

              {/* Bottom Home Indicator */}
              <div className="py-2 bg-white flex justify-center border-t border-slate-100">
                <div className="w-24 h-1 bg-slate-300 rounded-full" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
