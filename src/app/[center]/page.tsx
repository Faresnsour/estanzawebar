"use client";

import { createContext, use, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { IBM_Plex_Sans_Arabic, Noto_Kufi_Arabic } from "next/font/google";
import { AnimatePresence, MotionConfig, motion, useInView, type Variants } from "framer-motion";
import { BadgeCheck, Check, ChevronDown, Clock, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { clientsData, type ClientData, type DayOption, type ServiceItem, type TimeSlot } from "@/data/mockStudio";

const MapComponent = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-[#d5dade]" />,
});

const body = IBM_Plex_Sans_Arabic({ subsets: ["arabic", "latin"], weight: ["400", "500", "600"], display: "swap" });
const head = Noto_Kufi_Arabic({ subsets: ["arabic"], weight: ["600", "800"], display: "swap" });

/* ------------------------------------------------------------------ */
/*  Tokens: neutral cool-grey structure, the client's colour is the     */
/*  only hue on the page (like a paint chip).                           */
/* ------------------------------------------------------------------ */

const T = {
  bg: "#e9ecee",
  paper: "#f7f8f9",
  ink: "#101418",
  muted: "#59626b",
  line: "#cdd3d8",
};
const FOCUS = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#101418]";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const H = head.className;

/* ------------------------------------------------------------------ */
/*  Content engine: everything is derived from ClientData.              */
/*  Optional per-client tuning goes in OVERRIDES (key = client id) or   */
/*  as optional `address` / `category` fields in the client's data.     */
/* ------------------------------------------------------------------ */

interface Faq { id: string; question: string; answer: string }
interface Kind { key: string; match: RegExp; features: string[]; steps: string[]; faq?: Faq }
interface Content {
  category: string;
  address: string;
  timeZone: string;
  hours: { open: number; close: number };
  extraFaqs: Faq[];
  details: Record<string, { features?: string[]; steps?: string[]; warranty?: string }>;
}

// First match wins, so graphene sits before ceramic.
const KINDS: Kind[] = [
  {
    key: "graphene",
    match: /graphene|غرافين/i,
    features: ["طبقة غرافين فوق قاعدة سيراميك", "لمعان عميق وطرد عالٍ للماء", "مقاومة للأملاح والمواد الكيميائية"],
    steps: ["غسيل وإزالة الملوثات", "تلميع لتصحيح السطح", "مسح الزيوت قبل التطبيق", "تطبيق الطبقات", "فحص نهائي تحت الإضاءة"],
    faq: {
      id: "nano-vs-graphene",
      question: "ما الفرق بين النانو سيراميك والغرافين؟",
      answer:
        "كلاهما طبقة سائلة تتصلب كيميائياً على الطلاء. الغرافين يضيف بنية الغرافين فوق قاعدة السيراميك، وميزته مقاومة أفضل لبقع الماء وتوزيع أفضل للحرارة، بينما يقدّم السيراميك التقليدي لمعاناً وحماية ممتازين بتكلفة أقل.",
    },
  },
  {
    key: "ceramic",
    match: /ceramic|nano|سيراميك|نانو/i,
    features: ["حماية كيميائية للطلاء", "لمعان وطرد للماء", "تنظيف أسهل للسيارة"],
    steps: ["غسيل وإزالة الملوثات", "تلميع لتصحيح السطح", "مسح الزيوت قبل التطبيق", "تطبيق الطبقة", "فحص نهائي تحت الإضاءة"],
  },
  {
    key: "ppf",
    match: /ppf|paint protection|حماية الطلاء|فيلم/i,
    features: ["فيلم شفاف يلتئم من الخدوش الدقيقة", "حماية من الحصى والخدوش", "يحافظ على لون الطلاء الأصلي"],
    steps: ["فحص الطلاء وتجهيز السطح", "قص الفيلم حسب موديل السيارة", "التركيب", "إنهاء الحواف والتفاصيل", "فحص نهائي وتسليم"],
    faq: {
      id: "ppf-self-healing",
      question: "كيف يلتئم فيلم الـ PPF ذاتياً؟",
      answer:
        "الطبقة العلوية بوليمر مرن يعود إلى شكله عند التسخين من حرارة الشمس أو الماء الدافئ، فتختفي الخدوش الدقيقة وخطوط الغسيل تدريجياً. الجروح العميقة التي تخترق الفيلم لا تلتئم.",
    },
  },
  {
    key: "interior",
    match: /dry|interior|cabin|داخلي|مقصورة|تنظيف عميق|تعقيم/i,
    features: ["تنظيف عميق للمقصورة", "تعقيم", "إزالة الروائح"],
    steps: ["تنظيف الجلد والقماش والسجاد", "تنظيف السقف والأبواب", "تعقيم المقصورة", "تنظيف الزجاج من الداخل"],
  },
  {
    key: "polish",
    match: /polish|correction|تلميع|تصحيح/i,
    features: ["إزالة الخدوش الدقيقة وهالات الدوران", "استعادة عمق اللون"],
    steps: ["غسيل وإزالة الملوثات", "تلميع على مراحل", "فحص تحت الإضاءة"],
  },
  {
    key: "tint",
    match: /tint|تظليل|عازل/i,
    features: ["تقليل الحرارة والوهج", "خصوصية أعلى داخل السيارة"],
    steps: ["تنظيف الزجاج", "قص الفيلم وتشكيله", "التركيب", "فحص وتسليم"],
  },
  {
    key: "wash",
    match: /wash|غسيل/i,
    features: ["غسيل يدوي آمن للطلاء", "تنظيف الجنوط والإطارات"],
    steps: ["غسيل تمهيدي", "غسيل يدوي", "تجفيف", "لمسات أخيرة"],
  },
];

const COMBO_FAQ: Faq = {
  id: "coating-vs-ppf",
  question: "هل يغني السيراميك أو الغرافين عن الـ PPF؟",
  answer:
    "لا. الطبقات الخزفية تعطي لمعاناً ومقاومة كيميائية وتنظيفاً أسهل، لكنها رقيقة ولا تمتص ضربات الحصى. الـ PPF هو الذي يحمي من الرقائق والخدوش، ويمكن الجمع بينهما.",
};

const DEFAULTS: Content = {
  category: "استوديو العناية بالسيارات وحمايتها",
  address: "عمّان، الأردن",
  timeZone: "Asia/Amman",
  hours: { open: 9 * 60, close: 19 * 60 },
  extraFaqs: [],
  details: {},
};

const OVERRIDES: Record<string, Partial<Content>> = {};

const resolveContent = (c: ClientData): Content => {
  const x = c as ClientData & { address?: string; category?: string };
  return {
    ...DEFAULTS,
    ...(x.address ? { address: x.address } : {}),
    ...(x.category ? { category: x.category } : {}),
    ...(OVERRIDES[c.id] ?? {}),
  };
};

const textOf = (s: ServiceItem) => `${s.id} ${s.name} ${s.desc ?? ""} ${s.badge ?? ""}`;
const kindOf = (s: ServiceItem) => KINDS.find((k) => k.match.test(textOf(s)));

const detailsOf = (s: ServiceItem, content: Content) => {
  const k = kindOf(s);
  return {
    features: k?.features ?? [],
    steps: k?.steps ?? [],
    // Warranty only appears when the client's own text mentions one.
    warranty: /ضمان[^.،\n]*/.exec(textOf(s))?.[0]?.trim(),
    ...(content.details[s.id] ?? {}),
  };
};

const buildFaqs = (c: ClientData, content: Content): Faq[] => {
  const kinds = new Set(c.services.map((s) => kindOf(s)?.key));
  const list: Faq[] = KINDS.flatMap((k) => (k.faq && kinds.has(k.key) ? [k.faq] : []));
  if (kinds.has("ppf") && (kinds.has("ceramic") || kinds.has("graphene"))) list.push(COMBO_FAQ);
  list.push({
    id: "prices",
    question: "كم تكلفة كل خدمة وكم تستغرق؟",
    answer: c.services.map((s) => `${s.name} بسعر ${s.priceFormatted} وتستغرق ${s.duration}`).join("؛ ") + ".",
  });
  list.push({
    id: "booking",
    question: "كيف يتم تأكيد الحجز؟",
    answer: "تختار الخدمة واليوم والوقت، ثم تضغط تأكيد الحجز فتفتح رسالة جاهزة على واتساب. يراجع الفريق التوفر ويؤكد الموعد معك.",
  });
  return [...list, ...content.extraFaqs].slice(0, 7);
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

const ar = (v: number | string) => String(v).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)]);
const clock = (m: number) => {
  const h = Math.floor(m / 60);
  return `${ar(h % 12 || 12)}:${ar(String(m % 60).padStart(2, "0"))} ${h >= 12 ? "م" : "ص"}`;
};
const minutesNow = (tz: string) => {
  const p = new Intl.DateTimeFormat("en-GB", { timeZone: tz, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
  const g = (t: string) => Number(p.find((x) => x.type === t)?.value ?? 0);
  return g("hour") * 60 + g("minute");
};
const slotsText = (n: number) =>
  n <= 0 ? "مكتمل" : n === 1 ? "متبقي موعد واحد" : n === 2 ? "متبقي موعدان" : `متبقي ${ar(n)} مواعيد`;

const readableOn = (hex: string) => {
  const c = hex.replace("#", "");
  const n = parseInt(c.length === 3 ? c.replace(/./g, (x) => x + x) : c, 16);
  const lum = (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return lum > 0.6 ? T.ink : "#ffffff";
};

const isIda = (c: ClientData) => /\bIDA\b/.test(c.heroMessage) || c.services.some((s) => /\bIDA\b/.test(s.badge ?? ""));
const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

interface Selection { service: ServiceItem; day?: DayOption; slot?: TimeSlot }

const whatsappUrl = (c: ClientData, s: Selection) => {
  const parts = [`مرحباً ${c.name}، أريد تأكيد حجزي لخدمة: ${s.service.name}`];
  if (s.day) parts.push(`بتاريخ ${s.day.label} (${s.day.dateLabel})`);
  if (s.slot) parts.push(`الساعة ${s.slot.label}`);
  return `https://wa.me/${c.whatsappNumber}?text=${encodeURIComponent(parts.join(" "))}`;
};

const ThemeCtx = createContext({ color: T.ink, on: "#fff" });
const useTheme = () => useContext(ThemeCtx);

/* ------------------------------------------------------------------ */
/*  Shared UI                                                           */
/* ------------------------------------------------------------------ */

const Section = ({ id, title, note, children }: { id?: string; title: string; note?: string; children: ReactNode }) => (
  <section id={id} className="scroll-mt-20">
    <div className="mb-8 flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
      <h2 className={`${H} text-3xl font-extrabold sm:text-4xl`}>{title}</h2>
      {note && <p className="max-w-sm text-sm leading-relaxed" style={{ color: T.muted }}>{note}</p>}
    </div>
    {children}
  </section>
);

const Btn = ({ children, onClick, tone = "ink", className = "" }: { children: ReactNode; onClick: () => void; tone?: "ink" | "accent" | "ghost"; className?: string }) => {
  const t = useTheme();
  const s =
    tone === "accent" ? { background: t.color, color: t.on, borderColor: t.color }
    : tone === "ink" ? { background: T.ink, color: T.paper, borderColor: T.ink }
    : { background: "transparent", color: "inherit", borderColor: "currentColor" };
  return (
    <button type="button" onClick={onClick} style={s} className={`inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3.5 text-sm font-semibold transition active:scale-[0.97] ${FOCUS} ${className}`}>
      {children}
    </button>
  );
};

const Choice = ({ active, disabled, onSelect, children }: { active: boolean; disabled?: boolean; onSelect: () => void; children: ReactNode }) => (
  <button
    type="button" role="radio" aria-checked={active} disabled={disabled} onClick={onSelect}
    className={`w-full rounded-xl border text-start transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${FOCUS}`}
    style={active ? { background: T.ink, color: T.paper, borderColor: T.ink } : { background: T.paper, borderColor: T.line }}
  >
    {children}
  </button>
);

const List = ({ title, items }: { title: string; items: string[] }) =>
  items.length === 0 ? null : (
    <div>
      <h4 className="mb-3 text-sm font-semibold" style={{ color: T.muted }}>{title}</h4>
      <ul className="flex flex-col gap-2">
        {items.map((i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed">
            <Check size={15} className="mt-1 shrink-0" aria-hidden />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );

/* ------------------------------------------------------------------ */
/*  Top bar                                                             */
/* ------------------------------------------------------------------ */

const useOpenStatus = ({ timeZone, hours }: Content) => {
  const [s, setS] = useState<{ open: boolean; text: string } | null>(null);
  useEffect(() => {
    const tick = () => {
      const n = minutesNow(timeZone);
      const open = n >= hours.open && n < hours.close;
      setS({ open, text: open ? `مفتوح حتى ${clock(hours.close)}` : `مغلق، يفتح ${n < hours.open ? "" : "غداً "}${clock(hours.open)}` });
    };
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, [timeZone, hours.open, hours.close]);
  return s;
};

const TopBar = ({ client, content }: { client: ClientData; content: Content }) => {
  const status = useOpenStatus(content);
  return (
    <header className="sticky top-0 z-40 border-b backdrop-blur" style={{ borderColor: T.line, background: `${T.bg}ee` }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <span dir="auto" className={`${H} truncate text-sm font-extrabold`}>{client.name}</span>
        <div className="flex items-center gap-4">
          {status && (
            <span className="hidden items-center gap-2 text-xs sm:flex" style={{ color: T.muted }}>
              <span className={`h-2 w-2 rounded-full ${status.open ? "bg-emerald-600" : "bg-neutral-400"}`} aria-hidden />
              {status.text}
            </span>
          )}
          <a href={`tel:+${client.whatsappNumber}`} className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${FOCUS}`} style={{ borderColor: T.ink }}>
            <Phone size={15} aria-hidden />
            اتصال
          </a>
        </div>
      </div>
    </header>
  );
};

/* ------------------------------------------------------------------ */
/*  Hero: a full-bleed panel in the client's own colour, like a paint   */
/*  swatch, with the availability board attached underneath.            */
/* ------------------------------------------------------------------ */

const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const rise: Variants = { hidden: { y: "105%" }, visible: { y: "0%", transition: { duration: 0.85, ease: EASE } } };

const Hero = ({ client, content, dayId, onDay }: { client: ClientData; content: Content; dayId: string; onDay: (id: string) => void }) => {
  const t = useTheme();
  const max = Math.max(1, ...client.days.map((d) => d.slotsLeft));
  return (
    <section>
      <div style={{ background: t.color, color: t.on }}>
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-16 pt-16 lg:pb-24 lg:pt-28">
          <motion.h1 dir="auto" aria-label={client.name} variants={stagger} initial="hidden" animate="visible" className={`${H} flex flex-wrap gap-x-5 text-5xl font-extrabold leading-[1.25] sm:text-7xl lg:text-8xl`}>
            {client.name.split(" ").map((w, i) => (
              <span key={`${w}-${i}`} className="inline-block overflow-hidden py-1">
                <motion.span variants={rise} aria-hidden className="inline-block">{w}</motion.span>
              </span>
            ))}
          </motion.h1>
          <p className="max-w-xl text-lg leading-loose opacity-90">{client.heroMessage}</p>
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" onClick={() => go("booking")} style={{ background: t.on, color: t.color }} className={`inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold ${FOCUS}`}>
              <MessageCircle size={17} aria-hidden />
              احجز موعدك
            </button>
            <Btn tone="ghost" onClick={() => go("services")}>الخدمات والأسعار</Btn>
            {isIda(client) && (
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold">
                <BadgeCheck size={17} aria-hidden />
                معتمد من IDA
              </span>
            )}
          </div>
          <p className="text-sm opacity-75">{content.category}</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <div role="radiogroup" aria-label="اختر اليوم" className="-mt-10 grid gap-2 rounded-2xl border p-2 sm:grid-cols-[repeat(auto-fit,minmax(11rem,1fr))]" style={{ background: T.paper, borderColor: T.line }}>
          {client.days.map((d) => (
            <Choice key={d.id} active={d.id === dayId} disabled={d.slotsLeft === 0} onSelect={() => onDay(d.id)}>
              <span className="flex flex-col gap-2 px-4 py-3.5">
                <span className="flex items-baseline justify-between gap-3">
                  <span className="text-sm font-bold">{d.label}</span>
                  <span className="text-xs opacity-70">{d.dateLabel}</span>
                </span>
                <span className="flex gap-1" aria-hidden>
                  {Array.from({ length: max }, (_, i) => (
                    <span key={i} className="h-1.5 flex-1 rounded-full" style={{ background: i < d.slotsLeft ? t.color : "#c9ced3" }} />
                  ))}
                </span>
                <span className="text-xs opacity-80">{slotsText(d.slotsLeft)}</span>
              </span>
            </Choice>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  Services: a spec sheet. Rows expand to features and process steps.  */
/* ------------------------------------------------------------------ */

const ServiceRow = ({ service, content, selected, open, onToggle, onChoose }: { service: ServiceItem; content: Content; selected: boolean; open: boolean; onToggle: () => void; onChoose: () => void }) => {
  const t = useTheme();
  const d = detailsOf(service, content);
  const expandable = d.features.length + d.steps.length > 0;
  const panel = `service-${service.id}`;
  return (
    <li className="relative border-b" style={{ borderColor: T.line }}>
      <span aria-hidden className="absolute inset-y-0 start-0 w-1 rounded-full transition-opacity" style={{ background: t.color, opacity: selected ? 1 : 0 }} />
      <button type="button" onClick={onToggle} aria-expanded={open} aria-controls={panel} disabled={!expandable} className={`flex w-full flex-wrap items-center gap-x-8 gap-y-3 py-7 ps-6 pe-2 text-start ${FOCUS}`}>
        <span className="flex min-w-[14rem] flex-1 flex-col gap-2">
          <span className="flex flex-wrap items-center gap-3">
            <span className={`${H} text-xl font-extrabold`}>{service.name}</span>
            {service.badge && <span className="rounded-full px-3 py-0.5 text-xs font-semibold" style={{ background: t.color, color: t.on }}>{service.badge}</span>}
          </span>
          {service.desc && <span className="max-w-xl text-sm leading-relaxed" style={{ color: T.muted }}>{service.desc}</span>}
        </span>
        <span className="flex items-center gap-1.5 text-sm" style={{ color: T.muted }}><Clock size={14} aria-hidden />{service.duration}</span>
        <span className={`${H} min-w-[5rem] text-2xl font-extrabold`}>{service.priceFormatted}</span>
        {expandable && (
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}><ChevronDown size={18} aria-hidden /></motion.span>
        )}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div id={panel} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: EASE }} className="overflow-hidden">
            <div className="grid gap-8 pb-8 ps-6 pe-2 sm:grid-cols-2">
              <List title="المزايا" items={d.features} />
              <List title="مراحل التنفيذ" items={d.steps} />
              <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                <Btn onClick={() => { onChoose(); go("booking"); }}>احجز هذه الخدمة</Btn>
                {d.warranty && <span className="inline-flex items-center gap-1.5 text-sm font-semibold"><BadgeCheck size={16} aria-hidden />{d.warranty}</span>}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

const Services = ({ client, content, selectedId, onChoose }: { client: ClientData; content: Content; selectedId: string; onChoose: (id: string) => void }) => {
  const [openId, setOpenId] = useState<string | null>(null);
  return (
    <Section id="services" title="الخدمات والأسعار" note="اضغط على أي خدمة لترى مزاياها ومراحل تنفيذها قبل الحجز.">
      <ul className="border-t" style={{ borderColor: T.line }}>
        {client.services.map((s) => (
          <ServiceRow key={s.id} service={s} content={content} selected={s.id === selectedId} open={openId === s.id}
            onToggle={() => { setOpenId((c) => (c === s.id ? null : s.id)); onChoose(s.id); }}
            onChoose={() => onChoose(s.id)} />
        ))}
      </ul>
    </Section>
  );
};

/* ------------------------------------------------------------------ */
/*  Booking: three real steps, with a live summary that follows you.    */
/* ------------------------------------------------------------------ */

const Step = ({ n, title }: { n: number; title: string }) => (
  <h3 className={`${H} mb-4 flex items-center gap-3 text-base font-extrabold`}>
    <span className="flex h-7 w-7 items-center justify-center rounded-full text-xs" style={{ background: T.ink, color: T.paper }}>{ar(n)}</span>
    {title}
  </h3>
);

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-start justify-between gap-4 py-2.5 text-sm">
    <dt style={{ color: T.muted }}>{label}</dt>
    <dd className="text-end font-semibold">{value}</dd>
  </div>
);

const Summary = ({ sel, onBook, innerRef }: { sel: Selection; onBook: () => void; innerRef: React.RefObject<HTMLDivElement | null> }) => {
  const t = useTheme();
  return (
    <div ref={innerRef} className="overflow-hidden rounded-2xl border" style={{ background: T.paper, borderColor: T.line }}>
      <div className="h-2" style={{ background: t.color }} aria-hidden />
      <div className="p-6">
        <h3 className={`${H} text-lg font-extrabold`}>ملخص الحجز</h3>
        <dl className="mt-3 divide-y" style={{ borderColor: T.line }}>
          <Row label="الخدمة" value={sel.service.name} />
          <Row label="اليوم" value={sel.day ? `${sel.day.label} (${sel.day.dateLabel})` : "لم يُحدد"} />
          <Row label="الوقت" value={sel.slot?.label ?? "لم يُحدد"} />
          <Row label="المدة" value={sel.service.duration} />
        </dl>
        <div className="mt-4 flex items-end justify-between border-t border-dashed pt-4" style={{ borderColor: T.line }}>
          <span className="text-sm" style={{ color: T.muted }}>الإجمالي</span>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span key={sel.service.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }} className={`${H} text-3xl font-extrabold`}>
              {sel.service.priceFormatted}
            </motion.span>
          </AnimatePresence>
        </div>
        <Btn tone="accent" onClick={onBook} className="mt-5 w-full">
          <MessageCircle size={17} aria-hidden />
          تأكيد الحجز عبر واتساب
        </Btn>
        <p className="mt-3 text-center text-xs leading-relaxed" style={{ color: T.muted }}>يراجع الفريق التوفر ويؤكد الموعد معك على واتساب.</p>
      </div>
    </div>
  );
};

const Booking = (p: {
  client: ClientData; sel: Selection; ids: { service: string; day: string; slot: string };
  onService: (id: string) => void; onDay: (id: string) => void; onSlot: (id: string) => void;
  onBook: () => void; ticketRef: React.RefObject<HTMLDivElement | null>;
}) => (
  <Section id="booking" title="احجز موعدك" note="اختر الخدمة واليوم والوقت، ثم أكّد الحجز مباشرة على واتساب.">
    <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
      <div className="flex flex-col gap-10">
        <div>
          <Step n={1} title="الخدمة" />
          <div role="radiogroup" aria-label="الخدمة" className="flex flex-col gap-2">
            {p.client.services.map((s) => (
              <Choice key={s.id} active={s.id === p.ids.service} onSelect={() => p.onService(s.id)}>
                <span className="flex items-center justify-between gap-4 px-4 py-3.5">
                  <span className="flex flex-col leading-tight"><span className="text-sm font-bold">{s.name}</span><span className="text-xs opacity-70">{s.duration}</span></span>
                  <span className="text-sm font-bold">{s.priceFormatted}</span>
                </span>
              </Choice>
            ))}
          </div>
        </div>
        <div>
          <Step n={2} title="اليوم" />
          <div role="radiogroup" aria-label="اليوم" className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {p.client.days.map((d) => (
              <Choice key={d.id} active={d.id === p.ids.day} disabled={d.slotsLeft === 0} onSelect={() => p.onDay(d.id)}>
                <span className="flex flex-col gap-0.5 px-3.5 py-3">
                  <span className="text-sm font-bold">{d.label}</span>
                  <span className="text-xs opacity-70">{d.dateLabel}</span>
                  <span className="mt-1 text-xs">{slotsText(d.slotsLeft)}</span>
                </span>
              </Choice>
            ))}
          </div>
        </div>
        <div>
          <Step n={3} title="الوقت" />
          <div role="radiogroup" aria-label="الوقت" className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {p.client.slots.map((s) => (
              <Choice key={s.id} active={s.id === p.ids.slot} onSelect={() => p.onSlot(s.id)}>
                <span className="block px-3 py-3 text-center text-sm font-bold">{s.label}</span>
              </Choice>
            ))}
          </div>
        </div>
      </div>
      <div className="lg:sticky lg:top-20 lg:self-start"><Summary sel={p.sel} onBook={p.onBook} innerRef={p.ticketRef} /></div>
    </div>
  </Section>
);

/* ------------------------------------------------------------------ */
/*  FAQ + location                                                      */
/* ------------------------------------------------------------------ */

const Faqs = ({ faqs }: { faqs: Faq[] }) => (
  <Section title="أسئلة شائعة" note="إجابات مبنية على الخدمات المعروضة في هذه الصفحة.">
    <div className="border-t" style={{ borderColor: T.line }}>
      {faqs.map((f, i) => (
        <details key={f.id} name="faq" open={i === 0} className="group border-b" style={{ borderColor: T.line }}>
          <summary className={`flex cursor-pointer list-none items-center justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden ${FOCUS}`}>
            <span className="text-base font-semibold leading-relaxed">{f.question}</span>
            <ChevronDown size={18} className="shrink-0 transition-transform group-open:rotate-180" aria-hidden />
          </summary>
          <p className="max-w-3xl pb-6 leading-loose" style={{ color: T.muted }}>{f.answer}</p>
        </details>
      ))}
    </div>
  </Section>
);

const Ext = ({ href, icon, label }: { href: string; icon: ReactNode; label: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full border px-4 py-3 text-sm font-semibold ${FOCUS}`} style={{ borderColor: T.ink }}>
    {icon}{label}
  </a>
);

const Location = ({ client, content }: { client: ClientData; content: Content }) => {
  const [lat, lng] = client.mapCoordinates;
  return (
    <Section title="موقع الاستوديو">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="h-[22rem] overflow-hidden rounded-2xl border lg:col-span-2 lg:h-[28rem]" style={{ borderColor: T.line }}>
          <MapComponent coordinates={client.mapCoordinates} name={client.name} />
        </div>
        <div className="flex flex-col justify-between gap-8 rounded-2xl border p-6" style={{ background: T.paper, borderColor: T.line }}>
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="mt-1" aria-hidden />
              <div className="flex flex-col gap-1">
                <span className="text-sm" style={{ color: T.muted }}>العنوان</span>
                <span className="font-semibold">{content.address}</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={18} className="mt-1" aria-hidden />
              <div className="flex flex-col gap-1">
                <span className="text-sm" style={{ color: T.muted }}>ساعات العمل</span>
                <span className="font-semibold">يومياً من {clock(content.hours.open)} إلى {clock(content.hours.close)}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Ext href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`} icon={<Navigation size={16} aria-hidden />} label="خرائط جوجل" />
            <Ext href={`https://waze.com/ul?ll=${lat},${lng}&navigate=yes`} icon={<MapPin size={16} aria-hidden />} label="Waze" />
          </div>
        </div>
      </div>
    </Section>
  );
};

/* ------------------------------------------------------------------ */
/*  Mobile dock                                                         */
/* ------------------------------------------------------------------ */

const Dock = ({ visible, sel, onBook }: { visible: boolean; sel: Selection; onBook: () => void }) => {
  const t = useTheme();
  const sub = [sel.day?.label, sel.slot?.label].filter(Boolean).join("، ");
  return (
    <AnimatePresence>
      {visible && (
        <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} transition={{ duration: 0.3, ease: EASE }} className="fixed inset-x-0 bottom-0 z-50 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 lg:hidden" style={{ background: T.ink, color: T.paper }}>
          <div className="flex items-center gap-3">
            <div className="flex min-w-0 flex-1 flex-col leading-tight">
              <span className="truncate text-sm font-semibold">{sel.service.name}</span>
              <span className="truncate text-xs opacity-70">{sub || sel.service.duration}</span>
            </div>
            <span className="text-lg font-bold">{sel.service.priceFormatted}</span>
            <button type="button" onClick={onBook} style={{ background: t.color, color: t.on }} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold ${FOCUS}`}>
              <MessageCircle size={17} aria-hidden />
              احجز
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ------------------------------------------------------------------ */
/*  Portal: owns all booking state                                      */
/* ------------------------------------------------------------------ */

const Portal = ({ client }: { client: ClientData }) => {
  const theme = useMemo(() => ({ color: client.themeColor, on: readableOn(client.themeColor) }), [client.themeColor]);
  const content = useMemo(() => resolveContent(client), [client]);
  const faqs = useMemo(() => buildFaqs(client, content), [client, content]);

  const [serviceId, setServiceId] = useState(client.services[0]?.id ?? "");
  const [dayId, setDayId] = useState((client.days.find((d) => d.slotsLeft > 0) ?? client.days[0])?.id ?? "");
  const [slotId, setSlotId] = useState(client.slots[0]?.id ?? "");
  const ticketRef = useRef<HTMLDivElement | null>(null);
  const ticketInView = useInView(ticketRef, { amount: 0.4 });

  const service = client.services.find((s) => s.id === serviceId) ?? client.services[0];
  if (!service) return null;

  const sel: Selection = { service, day: client.days.find((d) => d.id === dayId), slot: client.slots.find((s) => s.id === slotId) };
  const book = () => window.open(whatsappUrl(client, sel), "_blank", "noopener,noreferrer");

  return (
    <ThemeCtx.Provider value={theme}>
      <MotionConfig reducedMotion="user">
        <div dir="rtl" className={`${body.className} min-h-screen`} style={{ background: T.bg, color: T.ink }}>
          <TopBar client={client} content={content} />
          <Hero client={client} content={content} dayId={dayId} onDay={setDayId} />
          <main className="mx-auto flex max-w-6xl flex-col gap-24 px-4 pb-40 pt-24 lg:pb-24">
            <Services client={client} content={content} selectedId={service.id} onChoose={setServiceId} />
            <Booking client={client} sel={sel} ids={{ service: service.id, day: dayId, slot: slotId }} onService={setServiceId} onDay={setDayId} onSlot={setSlotId} onBook={book} ticketRef={ticketRef} />
            <Faqs faqs={faqs} />
            <Location client={client} content={content} />
          </main>
          <footer className="border-t py-8 text-center text-xs" style={{ borderColor: T.line, color: T.muted }}>Powered by Estanza</footer>
          <Dock visible={!ticketInView} sel={sel} onBook={book} />
        </div>
      </MotionConfig>
    </ThemeCtx.Provider>
  );
};

export default function CenterPage({ params }: { params: Promise<{ center: string }> }) {
  const { center } = use(params);
  const client: ClientData | undefined = clientsData[center.toLowerCase()];
  if (!client || client.services.length === 0) return notFound();
  return <Portal client={client} />;
}