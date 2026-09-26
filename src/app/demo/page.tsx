'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
    import gsap from 'gsap';

    /* ------------------------------------------------------------------ */
    /* Types                                                               */
    /* ------------------------------------------------------------------ */

    interface ServiceOption {
    id: string;
    nameAr: string;
    nameEn: string;
    price: number;
    duration: string;
    spec: string;
    }

    interface DayOption {
    id: string;
    label: string;
    dateLabel: string;
    slotsLeft: number;
    }

    interface TimeSlot {
    id: string;
    label: string;
    }

    interface VehicleForm {
    vehicle: string;
    name: string;
    phone: string;
    }

    /* ------------------------------------------------------------------ */
    /* Static data                                                         */
    /* ------------------------------------------------------------------ */

    const SERVICES: ServiceOption[] = [
    {
        id: 'ppf-full',
        nameAr: 'درع الحماية الكلي',
        nameEn: 'Full Body PPF · 10mil',
        price: 1200,
        duration: '٣ أيام عمل',
        spec: 'فيلم حماية ذاتي الالتئام — تغطية كاملة للهيكل',
    },
    {
        id: 'graphene',
        nameAr: 'باقة نانو جرافين الترا',
        nameEn: 'Graphene Matrix Coating',
        price: 240,
        duration: '٢٤ ساعة',
        spec: 'طبقة سيراميك جرافين 9H — صلابة وعمق لوني',
    },
    {
        id: 'correction',
        nameAr: 'المعالجة التصحيحية والترميمية للطلاء',
        nameEn: 'Multi-Stage Paint Correction',
        price: 110,
        duration: '٨ ساعات',
        spec: 'إزالة الخدوش والهالات — تلميع متعدد المراحل',
    },
    {
        id: 'interior',
        nameAr: 'العناية الداخلية العميقة والتطهير الحراري',
        nameEn: 'Interior Restoration',
        price: 45,
        duration: '٤ ساعات',
        spec: 'تعقيم بخاري + معالجة الجلد والأقمشة الفنية',
    },
    ];

    const DAYS: DayOption[] = [
    { id: 'today', label: 'اليوم', dateLabel: '٢٦ سبتمبر', slotsLeft: 2 },
    { id: 'tomorrow', label: 'غداً', dateLabel: '٢٧ سبتمبر', slotsLeft: 4 },
    { id: 'after', label: 'بعد غد', dateLabel: '٢٨ سبتمبر', slotsLeft: 1 },
    ];

    const SLOTS: TimeSlot[] = [
    { id: 't1', label: '١٠:٠٠ ص' },
    { id: 't2', label: '٠١:٣٠ م' },
    { id: 't3', label: '٠٥:٠٠ م' },
    ];

    const WHATSAPP_NUMBER = '962790000000';

    /* ------------------------------------------------------------------ */
    /* Component                                                           */
    /* ------------------------------------------------------------------ */

    export default function DemoPage() {
    const [selectedService, setSelectedService] = useState<string>(SERVICES[0].id);
    const [selectedDay, setSelectedDay] = useState<string>(DAYS[0].id);
    const [selectedSlot, setSelectedSlot] = useState<string>(SLOTS[0].id);
    const [form, setForm] = useState<VehicleForm>({ vehicle: '', name: '', phone: '' });

    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const terminalRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(
            headerRef.current,
            { opacity: 0, y: -12 },
            { opacity: 1, y: 0, duration: 0.6 }
        )
            .fromTo(
            heroRef.current?.querySelectorAll('[data-reveal]') ?? [],
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 },
            '-=0.25'
            )
            .fromTo(
            terminalRef.current,
            { opacity: 0, y: 32, scale: 0.99 },
            { opacity: 1, y: 0, scale: 1, duration: 0.7 },
            '-=0.4'
            )
            .fromTo(
            cardsRef.current?.children ?? [],
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 },
            '-=0.35'
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleServiceSelect = (id: string, el: HTMLButtonElement) => {
        setSelectedService(id);
        gsap.fromTo(
        el,
        { boxShadow: '0 0 0 0 rgba(255,255,255,0)' },
        {
            boxShadow: '0 0 0 1px rgba(255,255,255,0.3)',
            duration: 0.35,
            ease: 'power2.out',
        }
        );
    };

    const activeService = SERVICES.find((s) => s.id === selectedService)!;
    const activeDay = DAYS.find((d) => d.id === selectedDay)!;
    const activeSlot = SLOTS.find((s) => s.id === selectedSlot)!;

    const isDispatchReady = form.vehicle.trim() !== '' && form.name.trim() !== '' && form.phone.trim() !== '';

    const handleDispatch = () => {
        if (!isDispatchReady) return;

        const message = [
        'طلب معاينة وحجز — استوديو كينيسيس',
        '—',
        `الخدمة: ${activeService.nameAr} (${activeService.nameEn})`,
        `القيمة التقديرية: ${activeService.price.toLocaleString('en-US')} د.أ`,
        `المدة المتوقعة: ${activeService.duration}`,
        '—',
        `الموعد: ${activeDay.label} (${activeDay.dateLabel}) — ${activeSlot.label}`,
        '—',
        `المركبة: ${form.vehicle}`,
        `الاسم: ${form.name}`,
        `رقم الاتصال: ${form.phone}`,
        '—',
        'الرجاء تأكيد الموعد والمعاينة الأولية.',
        ].join('\n');

        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div
        ref={containerRef}
        dir="rtl"
        className="min-h-screen bg-[#090A0B] text-[#F3F4F6] antialiased"
        style={{ fontFamily: "'IBM Plex Sans Arabic', 'Inter', system-ui, sans-serif" }}
        >
        {/* ---------------------------------------------------------- */}
        {/* Header                                                      */}
        {/* ---------------------------------------------------------- */}
        <header
            ref={headerRef}
            className="sticky top-0 z-30 border-b border-[#23272E] bg-[#090A0B]/85 backdrop-blur-md"
        >
            <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5">
            <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center border border-[#23272E] text-[13px] font-semibold tracking-tight">
                K
                </div>
                <div className="leading-tight">
                <p className="text-[13.5px] font-medium tracking-tight">استوديو كينيسيس</p>
                <p className="text-[11px] text-[#6B7280]">حماية وتلميع مركبات النخبة — عمّان</p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden items-center gap-2 sm:flex">
                <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F3F4F6]/40" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#F3F4F6]" />
                </span>
                <span className="text-[11.5px] text-[#9CA3AF]">
                    الحجوزات المتاحة لهذا الأسبوع: <span className="text-[#F3F4F6]">محدودة</span>
                </span>
                </div>
                <Link href="/" className="inline-flex items-center gap-1.5 border border-[#23272E] bg-transparent px-3 py-1.5 text-[11px] font-medium text-[#9CA3AF] transition-all hover:border-[#4B525D] hover:bg-[#16191E] hover:text-[#F3F4F6] active:scale-95">
            <span>← العودة للرئيسية</span>
          </Link>
            </div>
            </div>
        </header>

        {/* ---------------------------------------------------------- */}
        {/* Hero                                                        */}
        {/* ---------------------------------------------------------- */}
        <section ref={heroRef} className="mx-auto max-w-5xl px-5 pt-14 pb-10">
            <p data-reveal className="mb-3 text-[12px] text-[#6B7280]">
            كينيسيس — قسم الحماية المتقدمة
            </p>
            <h1
            data-reveal
            className="max-w-2xl text-[34px] font-medium leading-[1.18] tracking-tight text-[#F3F4F6] sm:text-[44px]"
            >
            حماية مطلقة. دقة متناهية لهيكل سيارتك.
            </h1>
            <p data-reveal className="mt-4 max-w-lg text-[14.5px] leading-relaxed text-[#9CA3AF]">
            استوديو متخصص في تقنيات أفلام الحماية الذاتية (PPF) ومعالجة الطلاء السيراميكي
            لسيارات النخبة، بمعايير تنفيذ تضاهي ورش الفورمولا الأوروبية.
            </p>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* Booking Terminal                                            */}
        {/* ---------------------------------------------------------- */}
        <section className="mx-auto max-w-5xl px-5 pb-20">
            <div
            ref={terminalRef}
            className="border border-[#23272E] bg-[#0F1113]"
            >
            {/* Terminal header */}
            <div className="flex items-center justify-between border-b border-[#23272E] px-5 py-3">
                <p className="text-[12.5px] font-medium tracking-tight text-[#F3F4F6]">
                محطة الحجز التفاعلية
                </p>
                <p className="text-[11px] text-[#6B7280]">٠١ / ٠٤ خطوات</p>
            </div>

            <div className="grid gap-px bg-[#23272E] lg:grid-cols-[1.3fr_1fr]">
                {/* -------------------------------------------------- */}
                {/* Left column: Service + Schedule                      */}
                {/* -------------------------------------------------- */}
                <div className="bg-[#0F1113] p-5">
                {/* Step A — Service Matrix */}
                <div className="mb-6">
                    <p className="mb-3 text-[11.5px] text-[#6B7280]">اختر نوع الخدمة</p>
                    <div ref={cardsRef} className="grid gap-2 sm:grid-cols-2">
                    {SERVICES.map((service) => {
                        const isActive = selectedService === service.id;
                        return (
                        <button
                            key={service.id}
                            type="button"
                            onClick={(e) => handleServiceSelect(service.id, e.currentTarget)}
                            className={`group flex flex-col items-start gap-2 border px-3.5 py-3 text-right transition-colors ${
                            isActive
                                ? 'border-white/30 bg-[#16191D]'
                                : 'border-[#23272E] bg-[#0F1113] hover:border-[#4B525D]'
                            }`}
                        >
                            <div className="flex w-full items-center justify-between">
                            <span
                                className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border ${
                                isActive ? 'border-white' : 'border-[#4B525D]'
                                }`}
                            >
                                {isActive && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                            </span>
                            <span className="text-[12px] text-[#6B7280]">{service.duration}</span>
                            </div>
                            <div>
                            <p className="text-[13px] font-medium leading-snug text-[#F3F4F6]">
                                {service.nameAr}
                            </p>
                            <p className="mt-0.5 text-[11px] text-[#6B7280]">{service.nameEn}</p>
                            </div>
                            <p className="text-[11.5px] leading-snug text-[#9CA3AF]">{service.spec}</p>
                            <p className="mt-1 text-[13.5px] font-medium text-[#F3F4F6]">
                            {service.price.toLocaleString('en-US')} د.أ
                            </p>
                        </button>
                        );
                    })}
                    </div>
                </div>

                {/* Step B — Date & Slot */}
                <div>
                    <p className="mb-3 text-[11.5px] text-[#6B7280]">حدد موعد التنفيذ</p>

                    <div className="mb-3 flex gap-2">
                    {DAYS.map((day) => {
                        const isActive = selectedDay === day.id;
                        return (
                        <button
                            key={day.id}
                            type="button"
                            onClick={() => setSelectedDay(day.id)}
                            className={`flex flex-1 flex-col items-center gap-0.5 border px-2 py-2.5 transition-colors ${
                            isActive
                                ? 'border-white/30 bg-[#16191D]'
                                : 'border-[#23272E] hover:border-[#4B525D]'
                            }`}
                        >
                            <span className="text-[12.5px] font-medium text-[#F3F4F6]">{day.label}</span>
                            <span className="text-[10.5px] text-[#6B7280]">{day.dateLabel}</span>
                            <span className="text-[10px] text-[#6B7280]">
                            {day.slotsLeft} مواعيد متبقية
                            </span>
                        </button>
                        );
                    })}
                    </div>

                    <div className="flex flex-wrap gap-2">
                    {SLOTS.map((slot) => {
                        const isActive = selectedSlot === slot.id;
                        return (
                        <button
                            key={slot.id}
                            type="button"
                            onClick={() => setSelectedSlot(slot.id)}
                            className={`rounded-full border px-3.5 py-1.5 text-[12px] transition-colors ${
                            isActive
                                ? 'border-white/30 bg-[#16191D] text-[#F3F4F6]'
                                : 'border-[#23272E] text-[#9CA3AF] hover:border-[#4B525D]'
                            }`}
                        >
                            {slot.label}
                        </button>
                        );
                    })}
                    </div>
                </div>
                </div>

                {/* -------------------------------------------------- */}
                {/* Right column: Vehicle DNA + Dispatch                 */}
                {/* -------------------------------------------------- */}
                <div className="flex flex-col justify-between bg-[#0F1113] p-5">
                <div>
                    <p className="mb-3 text-[11.5px] text-[#6B7280]">بيانات المركبة والمالك</p>
                    <div className="flex flex-col gap-2.5">
                    <input
                        type="text"
                        value={form.vehicle}
                        onChange={(e) => setForm((f) => ({ ...f, vehicle: e.target.value }))}
                        placeholder="نوع المركبة وسنة الصنع (مثال: Porsche 911 GT3)"
                        className="border border-[#23272E] bg-[#090A0B] px-3.5 py-2.5 text-[12.5px] text-[#F3F4F6] placeholder:text-[#4B525D] outline-none transition-colors focus:border-[#4B525D]"
                    />
                    <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        placeholder="الاسم الكريم"
                        className="border border-[#23272E] bg-[#090A0B] px-3.5 py-2.5 text-[12.5px] text-[#F3F4F6] placeholder:text-[#4B525D] outline-none transition-colors focus:border-[#4B525D]"
                    />
                    <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                        placeholder="رقم الاتصال"
                        dir="ltr"
                        className="border border-[#23272E] bg-[#090A0B] px-3.5 py-2.5 text-right text-[12.5px] text-[#F3F4F6] placeholder:text-[#4B525D] outline-none transition-colors focus:border-[#4B525D]"
                    />
                    </div>

                    {/* Summary */}
                    <div className="mt-5 border-t border-[#23272E] pt-4 text-[11.5px] text-[#6B7280]">
                    <div className="flex justify-between py-1">
                        <span>الخدمة</span>
                        <span className="text-[#9CA3AF]">{activeService.nameAr}</span>
                    </div>
                    <div className="flex justify-between py-1">
                        <span>الموعد</span>
                        <span className="text-[#9CA3AF]">
                        {activeDay.label} — {activeSlot.label}
                        </span>
                    </div>
                    <div className="flex justify-between py-1">
                        <span>القيمة التقديرية</span>
                        <span className="text-[#F3F4F6]">
                        {activeService.price.toLocaleString('en-US')} د.أ
                        </span>
                    </div>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleDispatch}
                    disabled={!isDispatchReady}
                    className={`mt-5 w-full border px-4 py-3 text-[13px] font-medium tracking-tight transition-colors ${
                    isDispatchReady
                        ? 'border-white bg-white text-[#090A0B] hover:bg-[#F3F4F6]'
                        : 'cursor-not-allowed border-[#23272E] bg-[#16191D] text-[#4B525D]'
                    }`}
                >
                    تأكيد طلب المعاينة والحجز فوراً عبر واتساب
                </button>
                </div>
            </div>
            </div>
        </section>

        <footer className="border-t border-[#23272E] px-5 py-6">
            <div className="mx-auto flex max-w-5xl items-center justify-between text-[11px] text-[#4B525D]">
            <span>© كينيسيس — استوديو حماية المركبات الفارهة</span>
            <span>عمّان، الأردن</span>
            </div>
        </footer>
        </div>
    );
    }