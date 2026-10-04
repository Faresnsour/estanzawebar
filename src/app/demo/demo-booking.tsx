'use client';
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { source } from "@/i18n/messages";
import { useI18n } from "@/i18n/LocaleProvider";
import { MOCK_STUDIO_SLOTS } from "@/data/mockStudio";
import { WHATSAPP_NUMBER, localizedWhatsAppUrl } from "@/components/lib/site";
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
        nameAr: source("demo.full_body_paint_protection"),
        nameEn: 'Full Body PPF · 10mil',
        price: 1200,
        duration: source("demo.3_working_days"),
        spec: source("demo.self_healing_paint_protection_film_full_body"),
    },
    {
        id: 'graphene',
        nameAr: source("demo.ultra_graphene_coating"),
        nameEn: 'Graphene Matrix Coating',
        price: 240,
        duration: source("demo.24_hours"),
        spec: source("demo.9h_graphene_ceramic_coating_hardness_and_colour"),
    },
    {
        id: 'correction',
        nameAr: source("demo.multi_stage_paint_correction"),
        nameEn: 'Multi-Stage Paint Correction',
        price: 110,
        duration: source("demo.8_hours"),
        spec: source("demo.remove_scratches_and_swirl_marks_with_multi"),
    },
    {
        id: 'interior',
        nameAr: source("demo.deep_interior_detailing_and_sanitisation"),
        nameEn: 'Interior Restoration',
        price: 45,
        duration: source("demo.4_hours"),
        spec: source("demo.steam_sanitisation_with_specialist_leather_and_fabric"),
    },
];
const SLOTS = MOCK_STUDIO_SLOTS;
/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */
export default function DemoBooking({ days: DAYS }: {
    days: DayOption[];
}) {
    const { t: tr, direction, locale } = useI18n();
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
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
            return;
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
            tl.fromTo(headerRef.current, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.6 })
                .fromTo(heroRef.current?.querySelectorAll('[data-reveal]') ?? [], { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 }, '-=0.25')
                .fromTo(terminalRef.current, { opacity: 0, y: 32, scale: 0.99 }, { opacity: 1, y: 0, scale: 1, duration: 0.7 }, '-=0.4')
                .fromTo(cardsRef.current?.children ?? [], { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 }, '-=0.35');
        }, containerRef);
        return () => ctx.revert();
    }, []);
    const handleServiceSelect = (id: string, el: HTMLButtonElement) => {
        setSelectedService(id);
        gsap.fromTo(el, { boxShadow: '0 0 0 0 rgba(255,255,255,0)' }, {
            boxShadow: '0 0 0 1px rgba(255,255,255,0.3)',
            duration: 0.35,
            ease: 'power2.out',
        });
    };
    const activeService = SERVICES.find((s) => s.id === selectedService)!;
    const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
    const activePrice = usd.format(activeService.price);
    const activeDay = DAYS.find((d) => d.id === selectedDay)!;
    const activeSlot = SLOTS.find((s) => s.id === selectedSlot)!;
    const isDispatchReady = form.vehicle.trim() !== '' && form.name.trim() !== '' && form.phone.trim() !== '';
    const handleDispatch = () => {
        if (!isDispatchReady)
            return;
        const message = [
            tr("demo.estanza_booking_demo_sample_details"),
            '—',
            tr("demo.service_value_value", [activeService.nameAr, activeService.nameEn]),
            tr("demo.estimated_price_value_usd", [activePrice]),
            tr("demo.estimated_duration_value", [activeService.duration]),
            '—',
            tr("demo.appointment_value_value_value", [activeDay.label, activeDay.dateLabel, activeSlot.label]),
            '—',
            tr("demo.vehicle_value", [form.vehicle]),
            tr("demo.name_value", [form.name]),
            tr("demo.phone_value", [form.phone]),
            '—',
            tr("demo.this_is_a_demo_not_a_real"),
        ].join('\n');
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };
    return (<div ref={containerRef} dir={direction} className="min-h-screen bg-[#090A0B] text-[#F3F4F6] antialiased">
        {/* ---------------------------------------------------------- */}
        {/* Header                                                      */}
        {/* ---------------------------------------------------------- */}
        <header ref={headerRef} className="sticky top-0 z-30 border-b border-[#23272E] bg-[#090A0B]/85 backdrop-blur-md">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5">
            <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center border border-[#23272E] text-[13px] font-semibold tracking-tight">
                K
                </div>
                <div className="leading-tight">
                <p className="text-[13.5px] font-medium tracking-tight">{tr("demo.al_saree_centre")}</p>
                <p className="text-[11px] text-[#9CA3AF]">{tr("demo.automotive_centre_booking_demo")}</p>
                </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4"><LanguageSwitcher />
                <div className="hidden items-center gap-2 sm:flex">
                <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#F3F4F6]/40"/>
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#F3F4F6]"/>
                </span>
                <span className="text-[11.5px] text-[#9CA3AF]">{tr("demo.demo")}{" "}<span className="text-[#F3F4F6]">{tr("demo.illustrative_prices_and_appointments")}</span>
                </span>
                </div>
                <Link href="/" className="inline-flex items-center gap-1.5 border border-[#23272E] bg-transparent px-3 py-1.5 text-[11px] font-medium text-[#9CA3AF] transition-all hover:border-[#4B525D] hover:bg-[#16191E] hover:text-[#F3F4F6] active:scale-95">
            <span>{tr("demo.back_to_home")}</span>
          </Link>
            </div>
            </div>
        </header>
    <div className="w-full bg-[#008774]/15 border-b border-[#008774]/30 py-2 px-4 text-center text-xs text-[#00a890] font-medium">
        <span>{tr("demo.booking_demo_whatsapp_messages_go_to_the")}</span>
      </div>


        {/* ---------------------------------------------------------- */}
        {/* Hero                                                        */}
        {/* ---------------------------------------------------------- */}
        <main id="main-content">
        <section ref={heroRef} className="mx-auto max-w-5xl px-5 pt-14 pb-10">
            <p data-reveal className="mb-3 text-[12px] text-[#9CA3AF]">{tr("demo.a_booking_page_for_an_automotive_centre")}</p>
            <h1 data-reveal className="max-w-2xl text-[34px] font-medium leading-[1.18] tracking-tight text-[#F3F4F6] sm:text-[44px]">{tr("demo.try_the_booking_journey_start_to_finish")}</h1>
            <p data-reveal className="mt-4 max-w-lg text-[14.5px] leading-relaxed text-[#9CA3AF]">{tr("demo.choose_a_service_and_appointment_then_enter")}</p>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* Booking Terminal                                            */}
        {/* ---------------------------------------------------------- */}
        <section className="mx-auto max-w-5xl px-5 pb-20">
            <div ref={terminalRef} className="border border-[#23272E] bg-[#0F1113]">
            {/* Terminal header */}
            <div className="flex items-center justify-between border-b border-[#23272E] px-5 py-3">
                <p className="text-[12.5px] font-medium tracking-tight text-[#F3F4F6]">{tr("demo.interactive_booking")}</p>
                <p className="text-[11px] text-[#9CA3AF]">{tr("demo.01_04_steps")}</p>
            </div>

            <div className="grid gap-px bg-[#23272E] lg:grid-cols-[1.3fr_1fr]">
                {/* -------------------------------------------------- */}
                {/* Left column: Service + Schedule                      */}
                {/* -------------------------------------------------- */}
                <div className="bg-[#0F1113] p-5">
                {/* Step A — Service Matrix */}
                <div className="mb-6">
                    <p className="mb-3 text-[11.5px] text-[#9CA3AF]">{tr("demo.choose_your_service")}</p>
                    <div ref={cardsRef} className="grid gap-2 sm:grid-cols-2">
                    {SERVICES.map((service) => {
            const isActive = selectedService === service.id;
            return (<button key={service.id} type="button" onClick={(e) => handleServiceSelect(service.id, e.currentTarget)} className={`group flex flex-col items-start gap-2 border px-3.5 py-3 text-start transition-colors ${isActive
                    ? 'border-white/30 bg-[#16191D]'
                    : 'border-[#23272E] bg-[#0F1113] hover:border-[#4B525D]'}`}>
                            <div className="flex w-full items-center justify-between">
                            <span className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border ${isActive ? 'border-white' : 'border-[#4B525D]'}`}>
                                {tr(isActive && <span className="h-1.5 w-1.5 rounded-full bg-white"/>)}
                            </span>
                            <span className="text-[12px] text-[#9CA3AF]">{tr(service.duration)}</span>
                            </div>
                            <div>
                            <p className="text-[13px] font-medium leading-snug text-[#F3F4F6]">
                                {tr(service.nameAr)}
                            </p>
                            <p className="mt-0.5 text-[11px] text-[#9CA3AF]">{tr(service.nameEn)}</p>
                            </div>
                            <p className="text-[11.5px] leading-snug text-[#9CA3AF]">{tr(service.spec)}</p>
                            <p className="mt-1 text-[13.5px] font-medium text-[#F3F4F6]">
                            <bdi dir="ltr">{usd.format(service.price)}</bdi></p>
                        </button>);
        })}
                    </div>
                </div>

                {/* Step B — Date & Slot */}
                <div>
                    <p className="mb-3 text-[11.5px] text-[#9CA3AF]">{tr("demo.choose_a_day")}</p>

                    <div className="mb-3 flex gap-2">
                    {DAYS.map((day) => {
            const isActive = selectedDay === day.id;
            return (<button key={day.id} type="button" onClick={() => setSelectedDay(day.id)} className={`flex flex-1 flex-col items-center gap-0.5 border px-2 py-2.5 transition-colors ${isActive
                    ? 'border-white/30 bg-[#16191D]'
                    : 'border-[#23272E] hover:border-[#4B525D]'}`}>
                            <span className="text-[12.5px] font-medium text-[#F3F4F6]">{tr(day.label)}</span>
                            <span className="text-[10.5px] text-[#9CA3AF]">{tr(day.dateLabel)}</span>
                            <span className="text-[10px] text-[#9CA3AF]">{tr("demo.preferred_time_for_the_demo")}</span>
                        </button>);
        })}
                    </div>

                    <div className="flex flex-wrap gap-2">
                    {SLOTS.map((slot) => {
            const isActive = selectedSlot === slot.id;
            return (<button key={slot.id} type="button" onClick={() => setSelectedSlot(slot.id)} className={`rounded-full border px-3.5 py-1.5 text-[12px] transition-colors ${isActive
                    ? 'border-white/30 bg-[#16191D] text-[#F3F4F6]'
                    : 'border-[#23272E] text-[#9CA3AF] hover:border-[#4B525D]'}`}>
                            {tr(slot.label)}
                        </button>);
        })}
                    </div>
                </div>
                </div>

                {/* -------------------------------------------------- */}
                {/* Right column: Vehicle DNA + Dispatch                 */}
                {/* -------------------------------------------------- */}
                <div className="flex flex-col justify-between bg-[#0F1113] p-5">
                <div>
                    <p className="mb-3 text-[11.5px] text-[#9CA3AF]">{tr("demo.vehicle_customer_details")}</p>
                    <div className="flex flex-col gap-2.5">
                    <input type="text" aria-label={tr("demo.car_model_and_year")} value={form.vehicle} onChange={(e) => setForm((f) => ({ ...f, vehicle: e.target.value }))} placeholder={tr("demo.car_model_and_year_e_g_porsche")} className="border border-[#23272E] bg-[#090A0B] px-3.5 py-2.5 text-base sm:text-sm text-[#F3F4F6] placeholder:text-[#9CA3AF] outline-none transition-colors focus:border-[#4B525D]"/>
                    <input type="text" aria-label={tr("demo.customer_name")} autoComplete="name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder={tr("demo.your_full_name")} className="border border-[#23272E] bg-[#090A0B] px-3.5 py-2.5 text-base sm:text-sm text-[#F3F4F6] placeholder:text-[#9CA3AF] outline-none transition-colors focus:border-[#4B525D]"/>
                    <input type="tel" aria-label={tr("demo.phone_number")} autoComplete="tel" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} placeholder={tr("demo.contact_number")} dir="ltr" className="border border-[#23272E] bg-[#090A0B] px-3.5 py-2.5 text-start text-base sm:text-sm text-[#F3F4F6] placeholder:text-[#9CA3AF] outline-none transition-colors focus:border-[#4B525D]"/>
                    </div>

                    {/* Summary */}
                    <div className="mt-5 border-t border-[#23272E] pt-4 text-[11.5px] text-[#9CA3AF]">
                    <div className="flex justify-between py-1">
                        <span>{tr("centre.service")}</span>
                        <span className="text-[#9CA3AF]">{tr(activeService.nameAr)}</span>
                    </div>
                    <div className="flex justify-between py-1">
                        <span>{tr("autoSpa.appointment")}</span>
                        <span className="text-[#9CA3AF]">
                        {tr(activeDay.label)} — {tr(activeSlot.label)}
                        </span>
                    </div>
                    <div className="flex justify-between py-1">
                        <span>{tr("demo.estimated_price")}</span>
                        <span className="text-[#F3F4F6]">
                        <bdi dir="ltr">{activePrice}</bdi></span>
                    </div>
                    </div>
                </div>

                <button type="button" onClick={handleDispatch} disabled={!isDispatchReady} className={`mt-5 w-full border px-4 py-3 text-[13px] font-medium tracking-tight transition-colors ${isDispatchReady
            ? 'border-white bg-white text-[#090A0B] hover:bg-[#F3F4F6]'
            : 'cursor-not-allowed border-[#23272E] bg-[#16191D] text-[#4B525D]'}`}>{tr("demo.preview_your_request_on_whatsapp")}</button>
                </div>
            </div>
            </div>
        </section>

        <div className="mx-auto max-w-5xl px-5 pb-10"><p className="text-base font-bold">{tr("demo.want_a_booking_page_like_this")}</p><a href={localizedWhatsAppUrl(locale)} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-source="demo" className="mt-3 inline-block rounded-xl bg-[#006f60] px-5 py-3 text-sm font-bold text-white">{tr("demo.tell_us_about_your_centre")}</a></div>
        </main>
        <footer className="border-t border-[#23272E] px-5 py-6">
            <div className="mx-auto flex max-w-5xl items-center justify-between text-[11px] text-[#4B525D]">
            <span>{tr("demo.al_saree_premium_vehicle_protection_centre")}</span>
            <span>{tr("centre.amman_jordan")}</span>
            </div>
        </footer>
        </div>);
}
