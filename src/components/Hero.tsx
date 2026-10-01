'use client';

import Link from "next/link";
import { SETUP_HOURS, WHATSAPP_URL } from "./lib/site";
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
    price: '850 د.أ',
  },
  {
    id: 'ceramic',
    name: 'نانو سيراميك معالجة 9H',
    duration: '٢٤ ساعة',
    price: '160 د.أ',
  },
  {
    id: 'tint',
    name: 'عازل حراري نانو كامل',
    duration: '٣ ساعات',
    price: '110 د.أ',
  },
];

const AVAILABLE_DAYS = [
  { day: 'اليوم الأول', date: 'للتجربة' },
  { day: 'اليوم الثاني', date: 'للتجربة' },
  { day: 'اليوم الثالث', date: 'للتجربة' },
];

const TIME_SLOTS = ['09:30 ص', '12:30 م', '04:00 م', '06:30 م'];

export default function Hero() {
  const [selectedService, setSelectedService] = useState<ServiceItem>(SERVICES[0]);
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[0]);
  const [clientName, setClientName] = useState('عمر التميمي (BMW G30)');
  const [phoneView, setPhoneView] = useState<'booking' | 'whatsapp' | 'sheets'>('booking');

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


  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneView('whatsapp');
  };

  /* ------------------------------------------------------------ */
  /* Entry timeline                                  */
  /* ------------------------------------------------------------ */
  useEffect(() => {
    const motionPreference = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );
    const prefersReducedMotion = motionPreference.matches;
    let idleTween: gsap.core.Tween | null = null;
    let inView = true;
    const pauseIdle = () => {
      if (motionPreference.matches) idleTween?.pause(0);
      else idleTween?.paused(!inView || document.hidden);
    };
    const observer = prefersReducedMotion ? null : new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      pauseIdle();
    });
    if (phoneWrapperRef.current) observer?.observe(phoneWrapperRef.current);
    document.addEventListener('visibilitychange', pauseIdle);
    motionPreference.addEventListener('change', pauseIdle);

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
        if (!phoneFrameRef.current) return;
        idleTween = gsap.to(phoneFrameRef.current, {
          y: -4, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1,
          paused: !inView || document.hidden || motionPreference.matches,
        });
      });
    }, sectionRef);

    return () => {
      observer?.disconnect();
      document.removeEventListener('visibilitychange', pauseIdle);
      motionPreference.removeEventListener('change', pauseIdle);
      idleTween?.kill();
      ctx.revert();
    };
  }, []);

  /* ------------------------------------------------------------ */
  /* Micro-interaction helpers                                    */
  /* ------------------------------------------------------------ */
  const snapTween = (el: HTMLElement | null) => {
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
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
    view: 'booking' | 'whatsapp' | 'sheets',
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    setPhoneView(view);
    snapTween(e.currentTarget);
  };

  return (
    <section id="hero" ref={sectionRef} aria-labelledby="hero-title" className="relative w-full py-12 lg:py-20 overflow-hidden">
      {/* Container restricted to max-w-6xl */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2-Column Desktop Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Text Column (col-span-7, RTL right-aligned) */}
          <div className="lg:col-span-7 flex flex-col text-right">
            
            {/* Micro-badge */}
            <div
              ref={badgeRef}
              className="mb-5 text-sm font-bold text-[#006f60]"
            >
              نظام حجز لمراكز واستوديوهات السيارات
            </div>

            {/* Headline (H1) with tracking-tight on Arabic heading */}
            <h1
              ref={headlineRef}
              id="hero-title"
              className="text-[32px] sm:text-[44px] lg:text-[46px] font-extrabold text-[#05221C] leading-[1.25] tracking-tight"
            >
              خلّي عميلك يحجز بنفسه،
              واستلم كل التفاصيل مرتبة على واتساب
            </h1>

            {/* Subtitle */}
            <p
              ref={paragraphRef}
              className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl"
            >
             صفحة حجز بهوية مركزك تعرض الخدمات والأسعار، وتجمع الموعد وبيانات العميل والسيارة.
            </p>

            {/* CTA Button Pair */}
            <div
              ref={ctaRowRef}
              className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5"
            >
              <Link
                href="/demo"
                data-cta="demo" data-source="hero"
                className="bg-[#006f60] text-white hover:bg-[#05221C] shadow-md shadow-emerald-900/10 px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base inline-flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-[0.98]"
              >
                <Calendar className="w-4 h-4 shrink-0" />
                <span>جرّب نموذج الحجز</span>
              </Link>
              <a
                href={WHATSAPP_URL}
                data-cta="whatsapp" data-source="hero"
                target="_blank"
                rel="noreferrer"
                className="border border-slate-300 text-slate-700 hover:bg-slate-100 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base inline-flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4 text-[#008774] shrink-0" />
                <span>اسألنا على واتساب</span>
              </a>
            </div>

            {/* Trust and Key Points */}
            <div
              ref={trustRowRef}
              className="mt-6 grid grid-cols-3 gap-3 text-center text-xs leading-5 text-slate-600 sm:flex sm:flex-wrap sm:gap-x-5 sm:text-start sm:text-sm"
            >
              <div className="flex flex-col items-center gap-1.5 sm:flex-row sm:gap-2">
                <Zap className="w-3.5 h-3.5 text-[#008774] shrink-0" />
                <span>جاهز خلال {SETUP_HOURS} ساعة</span>

              </div>
              <div className="flex flex-col items-center gap-1.5 sm:flex-row sm:gap-2">
                <Smartphone className="w-3.5 h-3.5 text-[#05221C] shrink-0" />
               <span>بدون تطبيق للعميل</span>

              </div>
              <div className="flex flex-col items-center gap-1.5 sm:flex-row sm:gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#008774] shrink-0" />
                <span>بدون اشتراك شهري</span>
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
            <div className="absolute -inset-4 bg-[#006f60]/10 rounded-[3.5rem] blur-2xl -z-10" />

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
              <div className="bg-slate-100/80 p-1.5 border-b border-slate-200 flex items-center gap-1">
                <button
                  type="button"
                  aria-pressed={phoneView === 'booking'}
                  onClick={(e) => handleViewSwitch('booking', e)}
                  className={`flex-1 py-1.5 px-1 rounded-lg text-[10px] font-bold transition-all text-center ${
                    phoneView === 'booking'
                      ? 'bg-[#05221C] text-white shadow-xs'
                      : 'text-slate-600 hover:text-[#05221C] bg-white border border-slate-200'
                  }`}
                >
                  صفحة الحجز
                </button>
                <button
                  type="button"
                  aria-pressed={phoneView === 'whatsapp'}
                  onClick={(e) => handleViewSwitch('whatsapp', e)}
                  className={`flex-1 py-1.5 px-1 rounded-lg text-[10px] font-bold transition-all text-center flex items-center justify-center gap-1 ${
                    phoneView === 'whatsapp'
                      ? 'bg-[#006f60] text-white shadow-xs'
                      : 'text-slate-600 hover:text-[#05221C] bg-white border border-slate-200'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                  <span>رسالة واتساب</span>
                </button>
                <button
                  type="button"
                  aria-pressed={phoneView === 'sheets'}
                  onClick={(e) => handleViewSwitch('sheets', e)}
                  className={`flex-1 py-1.5 px-1 rounded-lg text-[10px] font-bold transition-all text-center flex items-center justify-center gap-1 ${
                    phoneView === 'sheets'
                      ? 'bg-[#05221C] text-white shadow-xs'
                      : 'text-slate-600 hover:text-[#05221C] bg-white border border-slate-200'
                  }`}
                >
                  <span>مثال الجدول</span>
                </button>
              </div>

              {/* Phone Content Screen */}
              <div className="h-[480px] overflow-y-auto custom-scrollbar p-3.5 pb-6 bg-[#F9FBFA] text-slate-800 text-xs">
                
                {phoneView === 'booking' && (
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
                          اختر الخدمة وموعد المعاينة
                        </p>
                      </div>
                    </div>

                    {/* Step 1: Service Selection */}
                    <div>
                      <span className="text-[11px] font-bold text-[#05221C] block mb-1">
                        1. نوع التجهيز:
                      </span>
                      <div className="space-y-1.5">
                        {SERVICES.map((s) => {
                          const isSelected = selectedService.id === s.id;
                          return (
                            <button
                              key={s.id}
                              type="button"
                              onClick={(e) => handleServiceSelect(s, e)}
                              aria-pressed={isSelected}
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
                                      ? 'border-[#008774] bg-[#006f60] text-white'
                                      : 'border-slate-300'
                                  }`}
                                >
                                  {isSelected && <Check className="w-2.5 h-2.5" />}
                                </span>
                                <div>
                                  <span className="font-semibold text-[#05221C] block truncate">
                                    {s.name}
                                  </span>
                                  <span className="text-[9px] text-slate-600 block">
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
                        2. اليوم والوقت المناسب:
                      </span>
                      <div className="grid grid-cols-3 gap-1 mb-1.5">
                        {AVAILABLE_DAYS.map((d, idx) => {
                          const isSelected = selectedDayIdx === idx;
                          return (
                            <button
                              key={d.day}
                              type="button"
                              onClick={(e) => handleDaySelect(idx, e)}
                              aria-pressed={isSelected}
                              className={`py-1.5 px-1 rounded-lg border text-center transition-colors ${
                                isSelected
                                  ? 'bg-[#05221C] text-white border-[#05221C] font-bold'
                                  : 'bg-white text-slate-700 border-slate-200'
                              }`}
                            >
                              <span className="block text-[10px] leading-tight">{d.day}</span>
                              <span className={`block text-[8px] ${isSelected ? 'text-emerald-300' : 'text-slate-600'}`}>
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
                              aria-pressed={isSelected}
                              className={`py-1.5 px-2 rounded-lg text-center text-[10px] font-mono tabular-nums border transition-colors ${
                                isSelected
                                  ? 'bg-[#006f60] text-white border-[#008774] font-bold'
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
                        3. اسم العميل ونوع السيارة:
                      </label>
                      <input suppressHydrationWarning id="client-mobile-name"
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="مثال: عمر التميمي - BMW G30"
                        className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-[#008774]"
                      />
                    </div>

                    {/* Action Button */}
                    <button
                      type="submit"
                      className="w-full py-2.5 px-3 rounded-xl bg-[#006f60] hover:bg-[#05221C] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-[0.98]"
                    >
                      <span>شاهد رسالة طلب الحجز</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>

                  </form>
                )}

                {/* WhatsApp View (إشعار واتساب المركز) */}
                {phoneView === 'whatsapp' && (
                  <div className="space-y-3 pb-2">
                    
                    {/* Header */}
                    <div className="bg-[#05221C] text-white p-2.5 rounded-xl flex items-center justify-between shadow-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-[#006f60] text-white flex items-center justify-center font-bold text-xs">
                          💬
                        </div>
                        <div>
                          <span className="text-[11px] font-bold block">واتساب إدارة المركز</span>
                          <span className="text-[9px] text-emerald-300 block">رسالة مجهّزة من اختياراتك</span>
                        </div>
                      </div>
                      <span className="text-[9px] bg-[#006f60] px-2 py-0.5 rounded-full text-white font-medium">
                        تنبيه جديد
                      </span>
                    </div>

                    {/* WhatsApp Speech Bubble */}
                    <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-2xs space-y-2.5 text-right">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                        <div className="flex items-center gap-1 text-[11px] font-bold text-[#008774]">
                          <CheckCheck className="w-3.5 h-3.5 text-[#008774]" />
                          <span>طلب حجز من صفحة المركز</span>
                        </div>
                        <span className="text-[9px] text-slate-600 font-mono">16:02</span>
                      </div>

                      <div className="bg-[#F9FBFA] rounded-lg p-2.5 border border-slate-200/80 text-[11px] space-y-1.5 text-slate-700">
                        <div className="flex justify-between">
                          <span className="text-slate-500">العميل:</span>
                          <span className="font-bold text-[#05221C]">{clientName || 'عمر التميمي (BMW G30)'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">الخدمة:</span>
                          <span className="font-bold text-[#05221C]">{selectedService.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">الموعد:</span>
                          <span className="font-bold text-[#05221C]">
                            {selectedDate.day} ({selectedTime})
                          </span>
                        </div>
                        <div className="flex justify-between border-t border-slate-200/60 pt-1">
                          <span className="text-slate-500">القيمة التقديرية:</span>
                          <span className="font-bold text-[#008774] font-mono">{selectedService.price}</span>
                        </div>
                      </div>

                      <div className="p-1.5 bg-emerald-50 rounded-lg text-center text-[10px] text-[#008774] font-bold flex items-center justify-center gap-1">
                        <span>هذه معاينة للرسالة، ولا يتم إرسال حجز فعلي</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleViewSwitch('sheets', e)}
                      className="w-full py-2 bg-[#05221C] hover:bg-[#09352c] text-white font-bold text-[10px] rounded-xl transition-colors text-center flex items-center justify-center gap-1"
                    >
                      <span>شاهد نموذج جدول المواعيد</span>
                      <ArrowLeft className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {/* Sheets View (جدول المواعيد للمشغل) */}
                {phoneView === 'sheets' && (
                  <div className="space-y-3 pb-2">
                    
                    {/* Header */}
                    <div className="bg-[#05221C] text-white p-2.5 rounded-xl flex items-center justify-between shadow-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-[#006f60] text-white flex items-center justify-center font-bold text-xs">
                          📊
                        </div>
                        <div>
                          <span className="text-[11px] font-bold block">سجل مواعيد المركز</span>
                          <span className="text-[9px] text-emerald-300 block">نموذج توضيحي لتنظيم الطلبات</span>
                        </div>
                      </div>
                      <span className="text-[9px] bg-white/10 px-2 py-0.5 rounded-full text-slate-200">
                        Google Sheets
                      </span>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
                      <table className="w-full text-right border-collapse text-[10px]">
                        <thead>
                          <tr className="bg-slate-100 text-slate-700 border-b border-slate-200 font-bold">
                            <th className="p-2">العميل والمركبة</th>
                            <th className="p-2">الخدمة</th>
                            <th className="p-2">الوقت</th>
                            <th className="p-2">الحالة</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          <tr className="bg-emerald-50/70 font-semibold text-[#05221C]">
                            <td className="p-2">{clientName || 'عمر (BMW G30)'}</td>
                            <td className="p-2 text-[#008774]">{selectedService.name}</td>
                            <td className="p-2 font-mono">{selectedTime}</td>
                            <td className="p-2">
                              <span className="bg-[#006f60] text-white px-1.5 py-0.5 rounded text-[8px]">
                                جديد
                              </span>
                            </td>
                          </tr>
                          <tr className="text-slate-600">
                            <td className="p-2">طارق (Porsche)</td>
                            <td className="p-2">نانو سيراميك</td>
                            <td className="p-2 font-mono">11:00 ص</td>
                            <td className="p-2">
                              <span className="bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded text-[8px]">
                                تم الاستلام
                              </span>
                            </td>
                          </tr>
                          <tr className="text-slate-500">
                            <td className="p-2">خالد (Land Cruiser)</td>
                            <td className="p-2">عازل حراري</td>
                            <td className="p-2 font-mono">03:30 م</td>
                            <td className="p-2">
                              <span className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded text-[8px]">
                                موعد قادم
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Feature Highlight */}
                    <div className="p-2.5 bg-white border border-slate-200 rounded-xl text-[10px] text-slate-700">
                      <p className="font-bold text-[#05221C] mb-0.5">💡 بدون دفاتر ورقية أو نسيان:</p>
                      <p className="text-[9px] text-slate-500 leading-relaxed">
                        طريقة حفظ الطلبات وربطها بجدول المركز تُحدد حسب الباقة وإعدادات الربط.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleViewSwitch('booking', e)}
                      className="w-full py-2 bg-slate-200 hover:bg-slate-300 text-[#05221C] font-bold text-[10px] rounded-xl transition-colors text-center"
                    >
                      تجربة حجز موعد جديد
                    </button>
                  </div>
                )}

              </div>

              <p className="border-t border-slate-200 bg-white px-3 py-2 text-center text-[11px] text-slate-600">محاكاة تفاعلية · لا ترسل حجزًا فعليًا</p>
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
