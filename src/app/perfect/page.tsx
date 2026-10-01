"use client";

import { useCallback, useEffect, useState } from "react";
import type { MouseEvent, ReactNode } from "react";
import Image from "next/image";
import { serviceSlots } from "./schedule";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { IBM_Plex_Sans_Arabic } from "next/font/google";

const font = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const BASE = "/clients/perfect/";
const WA = "962788772188";
const PHONE = "0788772188";
const GEO = { lat: 31.9539, lng: 35.9106 };
const OPEN_H = 9;
const CLOSE_H = 20;

type Cat = "nano" | "polish";
type Filter = "all" | Cat;
type Shot = { src: string; title: string; cat: Cat };
type ServiceId = Cat | "interior";
type Service = {
  id: ServiceId;
  name: string;
  en: string;
  price: number;
  hours: number;
  note: string;
  desc: string;
};

type Clock = { y: number; m: number; d: number; h: number };

const SERVICES: Service[] = [
  {
    id: "nano",
    name: "نانو سيراميك فائق الصلابة",
    en: "Nano Ceramic Studio Shield",
    price: 130,
    hours: 11,
    note: "يوم عمل كامل",
    desc: "حماية كيميائية وطرد مائي فائق مع لمعان زجاجي يدوم طويلاً.",
  },
  {
    id: "polish",
    name: "بوليش وتصحيح طلاء احترافي",
    en: "Precision Paint Correction",
    price: 45,
    hours: 5,
    note: "٥ ساعات",
    desc: "إزالة الخدوش الدائرية وهالات الغسيل واستعادة عمق الطلاء الأصلي.",
  },
  {
    id: "interior",
    name: "دراي كلين ومعالجة مقصورة متقدمة",
    en: "Executive Interior Detailing",
    price: 35,
    hours: 4,
    note: "٤ ساعات",
    desc: "تعقيم كامل للمقصورة بالبخار ومعالجة الجلد الأصلي وحمايته من التشققات.",
  },
];

const GALLERY: Shot[] = [
  { src: `${BASE}Gclass1_1.jpg`, title: "مرسيدس G-Class — درع النانو سيراميك", cat: "nano" },
  { src: `${BASE}Gclass1_2.jpg`, title: "مرسيدس G-Class — انعكاس جانبي فائق", cat: "nano" },
  { src: `${BASE}Gclass1_3.jpg`, title: "مرسيدس G-Class — إضاءة الاستوديو", cat: "nano" },
  { src: `${BASE}blackRangrover1_1.jpg`, title: "رينج روفر Vogue — تصحيح طلاء عميق", cat: "polish" },
  { src: `${BASE}blackRangrover1_2.jpg`, title: "رينج روفر — استعادة بريق الأسود الملوكي", cat: "polish" },
  { src: `${BASE}blackRangrover1_3.jpg`, title: "رينج روفر — فحص تحت إضاءة المشغل", cat: "polish" },
  { src: `${BASE}blackRangrover1_4.jpg`, title: "رينج روفر — طبقة عزل وحماية نانو", cat: "nano" },
  { src: `${BASE}dodog1_1.jpg`, title: "دودج تشارجر — إبراز تفاصيل الهيكل", cat: "nano" },
  { src: `${BASE}dodog1_4.jpg`, title: "دودج تشارجر — لمعان زجاجي خلفي", cat: "polish" },
  { src: `${BASE}dodog1_5.jpg`, title: "دودج تشارجر — معالجة بهتان اللون", cat: "nano" },
  { src: `${BASE}bmw_blue1_1.jpg`, title: "بي إم دبليو الفئة الثالثة — حماية اللون الميتاليك", cat: "nano" },
  { src: `${BASE}bmw_blue1_2.jpg`, title: "بي إم دبليو — تصحيح طلاء متقدم", cat: "polish" },
  { src: `${BASE}blackBMW1_1.jpg`, title: "بي إم دبليو الفئة السابعة — نانو سيراميك فخم", cat: "nano" },
  { src: `${BASE}blackBMW1_2.jpg`, title: "بي إم دبليو الفئة السابعة — بوليش المرآة العاكسة", cat: "polish" },
  { src: `${BASE}golf1_1.jpg`, title: "غولف GTI — تجهيز ولمعان كامل", cat: "polish" },
  { src: `${BASE}marceds1_1.jpg`, title: "مرسيدس كلاسيك 190E — تجديد طلاء أسطوري", cat: "polish" },
];

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "الكل" },
  { id: "nano", label: "نانو سيراميك" },
  { id: "polish", label: "بوليش" },
];

const NAV = [
  ["المعرض", "gallery"],
  ["الباقات", "packages"],
  ["الحجز", "booking"],
  ["الموقع", "location"],
] as const;

const ar = (n: number) => n.toLocaleString("ar-EG", { useGrouping: false });
const hourLabel = (h: number) => `${ar(h > 12 ? h - 12 : h)}:٠٠ ${h >= 12 ? "م" : "ص"}`;
const dayFmt = new Intl.DateTimeFormat("ar-EG", {
  timeZone: "UTC",
  weekday: "long",
  day: "numeric",
  month: "long",
});

function ammanClock(): Clock {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Amman",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const g = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0);
  return { y: g("year"), m: g("month"), d: g("day"), h: g("hour") % 24 };
}

const line = "border border-white/[0.08]";
const fv = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
const cta = `inline-flex items-center justify-center rounded-full bg-[#DC2626] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#B91C1C] disabled:cursor-not-allowed disabled:opacity-40 ${fv}`;
const ghost = `${line} inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-white/90 transition hover:bg-white/[0.06] ${fv}`;
const wrap = "mx-auto max-w-6xl px-5";
const h2 = "text-3xl font-semibold leading-snug md:text-4xl";

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2.5">
      <dt className="text-sm text-white/50">{k}</dt>
      <dd className="text-end text-sm font-medium">{v || "—"}</dd>
    </div>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`rounded-lg px-4 py-2.5 text-sm transition ${fv} ${
        on
          ? "border border-[#DC2626] bg-[#DC2626]/10 text-white"
          : `${line} text-white/70 hover:bg-white/[0.05]`
      }`}
    >
      {children}
    </button>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <div className={`${line} rounded-xl bg-[#0E1116] p-5`}>
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#DC2626]/60 text-xs text-white/90">
          {ar(n)}
        </span>
        <h3 className="font-medium">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function PerfectPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<number | null>(null);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });

  const [svcId, setSvcId] = useState<ServiceId>("nano");
  const [dayIdx, setDayIdx] = useState<number>(0);
  const [slot, setSlot] = useState<number | null>(null);
  const [car, setCar] = useState("");
  const [clock, setClock] = useState<Clock | null>(null);

  const list = filter === "all" ? GALLERY : GALLERY.filter((s) => s.cat === filter);
  const total = list.length;
  const cur = active !== null ? list[active] : undefined;
  const isOpen = active !== null;

  useEffect(() => {
    const frame = requestAnimationFrame(() => setClock(ammanClock()));
    const t = setInterval(() => setClock(ammanClock()), 60000);
    return () => { cancelAnimationFrame(frame); clearInterval(t); };
  }, []);

  const go = useCallback(
    (d: number) => {
      setZoom(false);
      setActive((i) => (i === null ? i : (i + d + total) % total));
    },
    [total],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowLeft") go(1);
      if (e.key === "ArrowRight") go(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, go]);

  const svc = SERVICES.find((s) => s.id === svcId) ?? SERVICES[0];
  const days = clock
    ? Array.from({ length: 7 }, (_, i) =>
        dayFmt.format(new Date(Date.UTC(clock.y, clock.m - 1, clock.d + i, 12))),
      )
    : ["اليوم", "غداً", "بعد غد"];

  const slots = serviceSlots(svc.hours, OPEN_H, CLOSE_H, dayIdx === 0, clock?.h ?? null);

  const dayText = days[dayIdx] ?? days[0] ?? "";
  const currentSlot = slot !== null && slots.includes(slot) ? slot : slots[0];
  const slotText = currentSlot !== undefined ? `${hourLabel(currentSlot)} – ${hourLabel(currentSlot + svc.hours)}` : "";

  const waUrl = `https://wa.me/${WA}?text=${encodeURIComponent(
    [
      "مرحبًا مركز بيرفكت، أود طلب موعد لسيارتي:",
      `• الخدمة: ${svc?.name ?? ""}`,
      car.trim() ? `• نوع وموديل السيارة: ${car.trim()}` : "• نوع السيارة: سيتم التأكيد معكم",
      `• اليوم: ${dayText}`,
      `• الموعد المفضل: ${slotText}`,
      `• السعر التقديري: ${svc ? ar(svc.price) : ""} د.أ`,
    ].join("\n"),
  )}`;

  const open = clock ? clock.h >= OPEN_H && clock.h < CLOSE_H : true;
  const status = open ? "مفتوح الآن لاستقبال المركبات" : `مغلق الآن، يفتح ${clock && clock.h < OPEN_H ? "اليوم" : "غداً"} ${hourLabel(OPEN_H)}`;

  const pick = (id: ServiceId) => {
    setSvcId(id);
    setSlot(null);
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  const zoomAt = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div dir="rtl" lang="ar" className={`${font.className} min-h-screen bg-[#07080A] text-white antialiased`}>
        <style>{"@media (prefers-reduced-motion:no-preference){html{scroll-behavior:smooth}}"}</style>

        {/* 1. الهيدر */}
        <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-black/50 backdrop-blur-xl">
          <div className={`${wrap} flex h-16 items-center justify-between gap-4`}>
            <a href="#top" className={`flex min-w-0 items-center gap-3 ${fv}`}>
              <Image
                src={`${BASE}logo.jpg`}
                alt="شعار بيرفكت"
                width={38}
                height={38}
                className="h-9 w-9 rounded-full object-cover shrink-0 border border-white/20"
              />
              <span className="truncate text-sm font-semibold tracking-tight">Perfect Car Care Centre</span>
            </a>
            <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
              {NAV.map(([l, id]) => (
                <a key={id} href={`#${id}`} className={`transition hover:text-white ${fv}`}>{l}</a>
              ))}
            </nav>
            <a href="#booking" className={`${cta} shrink-0 px-5 py-2 text-xs md:text-sm`}>اطلب موعدك</a>
          </div>
        </header>

        <main id="main-content">
        {/* 2. الهيرو */}
        <section id="top" className="relative flex min-h-[90svh] items-end overflow-hidden pb-16 pt-32 md:items-center md:pb-0">
          <Image
            src={`${BASE}headimg.jpg`}
            alt="استوديو بيرفكت للعناية بالسيارات"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080A] via-[#07080A]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-l from-[#07080A]/90 via-[#07080A]/40 to-transparent" />
          <div className={`${wrap} relative w-full`}>
            <div className="max-w-xl">
              <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="text-4xl font-bold leading-tight md:text-6xl">
                نعيد للطلاء عمقه، ونحميه لسنوات
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }} className="mt-6 max-w-md text-base leading-loose text-white/70 md:text-lg">
                استوديو متكامل للنانو سيراميك وتصحيح الطلاء لسيارات G-Class، ورينج روفر، وBMW M في عمّان.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }} className="mt-9 flex flex-wrap gap-3">
                <a href="#booking" className={cta}>احجز عبر واتساب</a>
                <a href="#gallery" className={ghost}>شاهد أعمالنا</a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 3. المعرض الفاخر */}
        <section id="gallery" className="scroll-mt-20 bg-[#0E1116] py-20 md:py-28">
          <div className={wrap}>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className={h2}>أعمال خرجت من الاستوديو</h2>
                <p className="mt-3 text-white/60">اضغط على أي صورة لرؤية لمعان وانعكاسات الإضاءة عن قرب.</p>
              </div>
              <div className="flex gap-2" role="group" aria-label="تصفية الأعمال">
                {FILTERS.map((f) => (
                  <Chip key={f.id} on={filter === f.id} onClick={() => setFilter(f.id)}>{f.label}</Chip>
                ))}
              </div>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
              <AnimatePresence mode="popLayout">
                {list.map((s, i) => (
                  <motion.button
                    key={s.src}
                    layout
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.25 }}
                    type="button"
                    onClick={() => {
                      setZoom(false);
                      setActive(i);
                    }}
                    className={`group relative h-44 overflow-hidden rounded-xl ${line} text-start md:h-64 ${i % 5 === 0 ? "col-span-2" : ""} ${fv}`}
                  >
                    <Image
                      src={s.src}
                      alt={s.title}
                      fill
                      sizes="(min-width:768px) 33vw, 50vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 pt-8 text-xs md:text-sm font-medium">
                      {s.title}
                    </span>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* 4. الباقات */}
        <section id="packages" className="scroll-mt-20 py-20 md:py-28">
          <div className={wrap}>
            <h2 className={h2}>باقات العناية</h2>
            <p className="mt-3 text-white/60">أسعار واضحة ومدة معروفة لكل خدمة قبل البدء بالعمل.</p>
            <ul className={`mt-10 divide-y divide-white/[0.08] overflow-hidden rounded-2xl ${line} bg-[#0E1116]`}>
              {SERVICES.map((s) => (
                <li key={s.id} className={`flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8 ${s.id === "nano" ? "border-s-4 border-s-[#DC2626] bg-[#131720]" : ""}`}>
                  <div className="max-w-xl">
                    <h3 className="text-xl font-semibold">{s.name}</h3>
                    <p className="mt-1 text-sm text-white/40" dir="ltr">{s.en}</p>
                    <p className="mt-3 leading-relaxed text-white/70">{s.desc}</p>
                  </div>
                  <div className="flex items-center justify-between gap-6 md:justify-end">
                    <div>
                      <div className="text-3xl font-bold">{ar(s.price)} <span className="text-base font-medium text-white/60">د.أ</span></div>
                      <div className="mt-1 text-sm text-white/50">{s.note}</div>
                    </div>
                    <button type="button" onClick={() => pick(s.id)} className={s.id === "nano" ? cta : ghost}>
                      احجز هذه الخدمة
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5. محرك الحجز السلس */}
        <section id="booking" className="scroll-mt-20 bg-[#0E1116] py-20 md:py-28">
          <div className={wrap}>
            <h2 className={h2}>اطلب موعدك</h2>
            <p className="mt-3 text-white/60">اختر الخدمة والموعد، وسيتم فتح محادثة فورية لتأكيد وصول سيارتك.</p>
            <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
              <div className="space-y-4">
                <Step n={1} title="الخدمة">
                  <div className="flex flex-wrap gap-2">
                    {SERVICES.map((s) => (
                      <Chip key={s.id} on={svcId === s.id} onClick={() => setSvcId(s.id)}>
                        {s.name}
                      </Chip>
                    ))}
                  </div>
                </Step>

                <Step n={2} title="اليوم">
                  <div className="flex flex-wrap gap-2">
                    {days.map((d, i) => (
                      <Chip key={d} on={dayIdx === i} onClick={() => { setDayIdx(i); setSlot(null); }}>
                        {d}
                      </Chip>
                    ))}
                  </div>
                </Step>

                <Step n={3} title="الوقت المفضل">
                  <div className="flex flex-wrap gap-2">
                    {slots.map((h) => (
                      <Chip key={h} on={currentSlot === h} onClick={() => setSlot(h)}>
                        {hourLabel(h)}
                      </Chip>
                    ))}
                  </div>
                </Step>

                {slots.length === 0 && <p className="text-sm leading-relaxed text-white/70" role="status">لا توجد أوقات مناسبة لهذا اليوم. اختر يومًا آخر.</p>}

                <Step n={4} title="نوع السيارة (اختياري)">
                  <input
                    id="car"
                    aria-label="نوع السيارة وموديلها"
                    value={car}
                    onChange={(e) => setCar(e.target.value)}
                    maxLength={60}
                    autoComplete="off"
                    placeholder="مثال: رينج روفر Vogue أسود أو مرسيدس G-Class"
                    className={`${line} w-full rounded-lg bg-black/40 px-4 py-3 text-base placeholder:text-white/60 focus:border-[#DC2626] focus:outline-none`}
                  />
                </Step>
              </div>

              <aside className={`${line} rounded-2xl bg-[#131720] p-6 lg:sticky lg:top-24`} aria-live="polite">
                <h3 className="text-lg font-semibold">ملخص الحجز</h3>
                <dl className="mt-3 divide-y divide-white/[0.08]">
                  <Row k="المركز" v="Perfect Car Care" />
                  <Row k="الخدمة" v={svc?.name ?? ""} />
                  <Row k="اليوم" v={dayText} />
                  <Row k="الموعد" v={slotText || "اختر يومًا آخر"} />
                  <Row k="السيارة" v={car.trim() || "سيتم التأكيد هاتفياً"} />
                </dl>
                <div className="mt-4 flex items-baseline justify-between border-t border-white/[0.08] pt-4">
                  <span className="text-white/60">السعر التقديري</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={svcId}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.18 }}
                      className="text-2xl font-bold text-[#DC2626]"
                    >
                      {svc ? ar(svc.price) : ""} د.أ
                    </motion.span>
                  </AnimatePresence>
                </div>
                <div className="mt-6">
                  <motion.a
                    whileTap={{ scale: 0.98 }}
                    href={currentSlot === undefined ? undefined : waUrl}
                    aria-disabled={currentSlot === undefined}
                    onClick={(event) => {
                      const fresh = serviceSlots(svc.hours, OPEN_H, CLOSE_H, dayIdx === 0, ammanClock().h);
                      if (currentSlot === undefined || !fresh.includes(currentSlot)) {
                        event.preventDefault();
                        setClock(ammanClock());
                        setSlot(null);
                      }
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${cta} w-full text-center shadow-lg shadow-red-950/50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50`}
                  >
                    طلب الموعد عبر واتساب
                  </motion.a>
                  <p className="mt-3 text-center text-xs text-white/60">
                    يتم إرسال التفاصيل مباشرة إلى إدارة المشغل لتثبيت الحجز.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* 6. الموقع والمشغل */}
        <section id="location" className="scroll-mt-20 py-20 md:py-28">
          <div className={wrap}>
            <div className={`${line} grid overflow-hidden rounded-2xl bg-[#0E1116] md:grid-cols-2`}>
              <div className="p-8 md:p-12">
                <h2 className={h2}>موقع الاستوديو والمشغل</h2>
                <dl className="mt-8 space-y-5">
                  <div>
                    <dt className="text-sm text-white/50">العنوان والاستقبال</dt>
                    <dd className="mt-1 text-base font-medium text-white">عمّان، الأردن — مجهز بالكامل لاستقبال وتجهيز سيارات النخبة</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-white/50">ساعات العمل</dt>
                    <dd className="mt-1">يومياً {hourLabel(OPEN_H)} – {hourLabel(CLOSE_H)}</dd>
                  </div>
                  <div className="flex items-center gap-2 text-sm" aria-live="polite">
                    <span className={`h-2.5 w-2.5 rounded-full ${open ? "bg-emerald-400" : "bg-[#DC2626]"}`} />
                    <span className="text-white/80">{status}</span>
                  </div>
                </dl>
              </div>
              <div className="flex flex-col justify-center gap-3 border-t border-white/[0.08] bg-[#131720] p-8 md:border-s md:border-t-0 md:p-12">
                <a href={`tel:${PHONE}`} className={cta}>
                  اتصال فوري بالمركز <bdi className="ms-2">{PHONE}</bdi>
                </a>
                <a
                  href="https://maps.app.goo.gl/ujCXQe3FAs1w9Y9PA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={ghost}
                >
                  الاتجاهات عبر Google Maps
                </a>
                <a
                  href={`https://waze.com/ul?ll=${GEO.lat},${GEO.lng}&navigate=yes`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={ghost}
                >
                  الاتجاهات عبر Waze
                </a>
              </div>
            </div>
          </div>
        </section>

        </main>
        {/* 7. الفوتر */}
        <footer className="border-t border-white/[0.08] bg-[#07080A] py-12 text-sm text-white/50">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
              <div className="flex flex-col items-center gap-3 text-center md:items-start md:text-start">
                <div className="flex items-center gap-3">
                  <Image
                    width={40} height={40}
                    src="/clients/perfect/logo.jpg"
                    alt="Perfect Car Care"
                    className="h-10 w-10 rounded-xl border border-white/10 bg-white p-1 object-contain shadow-sm"
                  />
                  <div>
                    <span className="block text-base font-extrabold text-white">Perfect Car Care Centre</span>
                    <span className="block text-xs text-white/40">مركز بيرفكت للعناية الفائقة بالمركبات • عمّان</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-white/70">
                <a
                  href="https://www.facebook.com/perfectcarcarecentre/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-[#DC2626]"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  صفحة فيسبوك الرسمية
                </a>

                <a
                  href={`tel:${PHONE}`}
                  className="flex items-center gap-2 transition-colors hover:text-[#DC2626]"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {PHONE}
                </a>

                <a
                  href="mailto:sofeanalhasoon4@gmail.com"
                  className="flex items-center gap-2 opacity-60 transition-colors hover:opacity-100 hover:text-[#DC2626]"
                >
                  sofeanalhasoon4@gmail.com
                </a>
              </div>

              <div className="text-center text-xs text-white/30 md:text-end">
                جميع الحقوق محفوظة © {new Date().getFullYear()} Perfect Car Care
                <div className="mt-1">
                  البنية التقنية مطورة بواسطة <span className="font-semibold text-white/60">Estanza</span>
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* 8. نافذة العرض والتكبير (Lightbox) */}
        <AnimatePresence>
          {cur && (
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={cur.title}
              className="fixed inset-0 z-[60] flex flex-col bg-black/95 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex h-16 items-center justify-between px-5">
                <div>
                  <span className="font-medium text-sm md:text-base">{cur.title}</span>
                  <span className="ms-3 text-xs md:text-sm text-white/40">
                    {ar((active ?? 0) + 1)} / {ar(total)}
                  </span>
                </div>
                <button
                  type="button"
                  autoFocus
                  onClick={() => setActive(null)}
                  aria-label="إغلاق"
                  className={`${ghost} !px-4 !py-2 text-xs`}
                >
                  إغلاق
                </button>
              </div>
              <div className="relative flex-1">
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ cursor: zoom ? "zoom-out" : "zoom-in" }}
                  onClick={(e) => {
                    zoomAt(e);
                    setZoom((z) => !z);
                  }}
                  onMouseMove={(e) => zoom && zoomAt(e)}
                >
                  <motion.div
                    key={cur.src}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, scale: zoom ? 2 : 1 }}
                    transition={{
                      opacity: { duration: 0.25 },
                      scale: { type: "spring", stiffness: 140, damping: 22 },
                    }}
                    style={{ transformOrigin: `${origin.x}% ${origin.y}%` }}
                  >
                    <Image src={cur.src} alt={cur.title} fill sizes="100vw" className="object-contain" />
                  </motion.div>
                </div>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="السابق"
                  className={`absolute right-3 top-1/2 h-11 w-11 -translate-y-1/2 rounded-full bg-black/50 text-2xl backdrop-blur-xl ${line} ${fv}`}
                >
                  ›
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="التالي"
                  className={`absolute left-3 top-1/2 h-11 w-11 -translate-y-1/2 rounded-full bg-black/50 text-2xl backdrop-blur-xl ${line} ${fv}`}
                >
                  ‹
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
