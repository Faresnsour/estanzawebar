"use client";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { source, getTranslator, type Locale } from "@/i18n/messages";
import { useI18n } from "@/i18n/LocaleProvider";
import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { IBM_Plex_Sans_Arabic, Noto_Kufi_Arabic } from "next/font/google";
import { AnimatePresence, MotionConfig, motion, useInView, type Variants } from "framer-motion";
import { BadgeCheck, Check, ChevronDown, Clock, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { type ClientData, type DayOption, type ServiceItem, type TimeSlot } from "@/data/mockStudio";
import { futurePreferredSlots } from "@/lib/booking";
const MapComponent = dynamic(() => import("@/components/Map"), {
    ssr: false,
    loading: () => <div className="h-full w-full animate-pulse bg-[#d5dade]"/>,
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
const EASE: [
    number,
    number,
    number,
    number
] = [0.22, 1, 0.36, 1];
const H = head.className;
/* ------------------------------------------------------------------ */
/*  Content engine: everything is derived from ClientData.              */
/*  Optional per-client tuning goes in OVERRIDES (key = client id) or   */
/*  as optional `address` / `category` fields in the client's data.     */
/* ------------------------------------------------------------------ */
interface Faq {
    id: string;
    question: string;
    answer: string;
}
interface Kind {
    key: string;
    match: RegExp;
    features: string[];
    steps: string[];
    faq?: Faq;
}
interface Content {
    category: string;
    address: string;
    timeZone: string;
    hours: {
        open: number;
        close: number;
    };
    extraFaqs: Faq[];
    details: Record<string, {
        features?: string[];
        steps?: string[];
        warranty?: string;
    }>;
}
// First match wins, so graphene sits before ceramic.
const KINDS: Kind[] = [
    {
        key: "graphene",
        match: /graphene|غرافين/i,
        features: [source("centre.graphene_protection_over_a_ceramic_base"), source("centre.deep_gloss_and_excellent_water_beading"), source("centre.resistance_to_road_salts_and_chemicals")],
        steps: [source("centre.wash_and_decontaminate"), source("centre.polish_and_correct_the_surface"), source("centre.remove_oils_before_application"), source("centre.apply_the_protective_layers"), source("centre.final_inspection_under_studio_lighting")],
        faq: {
            id: "nano-vs-graphene",
            question: source("centre.how_do_ceramic_and_graphene_coatings_differ"),
            answer: source("centre.both_form_a_protective_coating_on_your"),
        },
    },
    {
        key: "ceramic",
        match: /ceramic|nano|سيراميك|نانو/i,
        features: [source("centre.chemical_protection_for_your_paint"), source("centre.gloss_and_water_repellency"), source("centre.easier_maintenance_washes")],
        steps: [source("centre.wash_and_decontaminate"), source("centre.polish_and_correct_the_surface"), source("centre.remove_oils_before_application"), source("centre.apply_the_coating"), source("centre.final_inspection_under_studio_lighting")],
    },
    {
        key: "ppf",
        match: /ppf|paint protection|حماية الطلاء|فيلم/i,
        features: [source("centre.clear_film_that_heals_fine_surface_scratches"), source("centre.protection_against_stone_chips_and_scratches"), source("centre.preserves_the_original_paint_colour")],
        steps: [source("centre.inspect_and_prepare_the_paint"), source("centre.cut_the_film_to_fit_your_vehicle"), source("centre.install_the_film"), source("centre.finish_the_edges_and_details"), source("centre.final_inspection_and_handover")],
        faq: {
            id: "ppf-self-healing",
            question: source("centre.how_does_self_healing_ppf_work"),
            answer: source("centre.the_film_s_flexible_top_layer_returns"),
        },
    },
    {
        key: "interior",
        match: /dry|interior|cabin|داخلي|مقصورة|تنظيف عميق|تعقيم/i,
        features: [source("centre.deep_interior_cleaning"), source("centre.sanitisation"), source("centre.odour_removal")],
        steps: [source("centre.clean_leather_fabric_and_carpets"), source("centre.clean_the_headlining_and_door_panels"), source("centre.sanitise_the_cabin"), source("centre.clean_the_inside_of_the_windows")],
    },
    {
        key: "polish",
        match: /polish|correction|تلميع|تصحيح/i,
        features: [source("centre.remove_fine_scratches_and_swirl_marks"), source("centre.restore_colour_depth")],
        steps: [source("centre.wash_and_decontaminate"), source("centre.multi_stage_polishing"), source("centre.inspect_under_studio_lighting")],
    },
    {
        key: "tint",
        match: /tint|تظليل|عازل/i,
        features: [source("centre.reduce_heat_and_glare"), source("centre.greater_privacy_inside_your_vehicle")],
        steps: [source("centre.clean_the_glass"), source("centre.cut_and_shape_the_film"), source("centre.install_the_film"), source("centre.inspect_and_hand_over")],
    },
    {
        key: "wash",
        match: /wash|غسيل/i,
        features: [source("centre.paint_safe_hand_washing"), source("centre.clean_wheels_and_tyres")],
        steps: [source("centre.pre_wash"), source("centre.hand_wash"), source("centre.dry_the_vehicle"), source("centre.finishing_touches")],
    },
];
const COMBO_FAQ: Faq = {
    id: "coating-vs-ppf",
    question: source("centre.can_ceramic_or_graphene_replace_ppf"),
    answer: source("centre.no_coatings_add_gloss_chemical_resistance_and"),
};
const DEFAULTS: Content = {
    category: source("centre.vehicle_detailing_and_protection_studio"),
    address: source("centre.amman_jordan"),
    timeZone: "Asia/Amman",
    hours: { open: 9 * 60, close: 19 * 60 },
    extraFaqs: [],
    details: {},
};
const OVERRIDES: Record<string, Partial<Content>> = {};
const resolveContent = (c: ClientData): Content => {
    const x = c as ClientData & {
        address?: string;
        category?: string;
    };
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
const buildFaqs = (c: ClientData, content: Content, locale: Locale): Faq[] => {
    const tr = getTranslator(locale);
    const kinds = new Set(c.services.map((s) => kindOf(s)?.key));
    const list: Faq[] = KINDS.flatMap((k) => (k.faq && kinds.has(k.key) ? [k.faq] : []));
    if (kinds.has("ppf") && (kinds.has("ceramic") || kinds.has("graphene")))
        list.push(COMBO_FAQ);
    list.push({
        id: "prices",
        question: source("centre.how_much_do_services_cost_and_how"),
        answer: c.services.map((s) => tr("centre.value_value_taking_value", [s.name, s.priceFormatted, s.duration])).join(locale === "en" ? "; " : source("centre.separator")) + ".",
    });
    list.push({
        id: "booking",
        question: source("centre.how_is_my_appointment_confirmed"),
        answer: source("centre.choose_a_service_day_and_time_then"),
    });
    return [...list, ...content.extraFaqs].slice(0, 7);
};
/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */
const ar = (v: number | string) => String(v).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)]);
const clock = (m: number) => {
    const h = Math.floor(m / 60);
    return `${ar(h % 12 || 12)}:${ar(String(m % 60).padStart(2, "0"))} ${h >= 12 ? source("centre.pm") : source("centre.am")}`;
};
const minutesNow = (tz: string) => {
    const p = new Intl.DateTimeFormat("en-GB", { timeZone: tz, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
    const g = (t: string) => Number(p.find((x) => x.type === t)?.value ?? 0);
    return g("hour") * 60 + g("minute");
};
const readableOn = (hex: string) => {
    const c = hex.replace("#", "");
    const n = parseInt(c.length === 3 ? c.replace(/./g, (x) => x + x) : c, 16);
    const linear = (value: number) => {
        const channel = value / 255;
        return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
    };
    const lum = 0.2126 * linear((n >> 16) & 255) + 0.7152 * linear((n >> 8) & 255) + 0.0722 * linear(n & 255);
    return 1.05 / (lum + 0.05) >= 4.5 ? "#ffffff" : "#000000";
};
const isIda = (c: ClientData) => /\bIDA\b/.test(c.heroMessage) || c.services.some((s) => /\bIDA\b/.test(s.badge ?? ""));
const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
interface Selection {
    service: ServiceItem;
    day?: DayOption;
    slot?: TimeSlot;
}
const whatsappUrl = (c: ClientData, s: Selection, locale: Locale) => {
    const tr = getTranslator(locale);
    const parts = [tr("centre.hi_value_i_d_like_to_request", [c.name, s.service.name])];
    if (s.day)
        parts.push(tr("centre.preferred_date_value_value", [s.day.label, s.day.dateLabel]));
    if (s.slot)
        parts.push(tr("centre.preferred_time_value", [s.slot.label]));
    return `https://wa.me/${c.whatsappNumber}?text=${encodeURIComponent(parts.join(" "))}`;
};
const ThemeCtx = createContext({ color: T.ink, on: "#fff" });
const useTheme = () => useContext(ThemeCtx);
/* ------------------------------------------------------------------ */
/*  Shared UI                                                           */
/* ------------------------------------------------------------------ */
const Section = ({ id, title, note, children }: {
    id?: string;
    title: string;
    note?: string;
    children: ReactNode;
}) => {
    const { t: tr } = useI18n();
    return (<section id={id} className="scroll-mt-20">
    <div className="mb-8 flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
      <h2 className={`${H} text-3xl font-extrabold sm:text-4xl`}>{tr(title)}</h2>
      {tr(note && <p className="max-w-sm text-sm leading-relaxed" style={{ color: T.muted }}>{tr(note)}</p>)}
    </div>
    {children}
  </section>);
};
const Btn = ({ children, onClick, disabled = false, tone = "ink", className = "" }: {
    children: ReactNode;
    onClick: () => void;
    disabled?: boolean;
    tone?: "ink" | "accent" | "ghost";
    className?: string;
}) => {
    const t = useTheme();
    const s = tone === "accent" ? { background: t.color, color: t.on, borderColor: t.color }
        : tone === "ink" ? { background: T.ink, color: T.paper, borderColor: T.ink }
            : { background: "transparent", color: "inherit", borderColor: "currentColor" };
    return (<button type="button" onClick={onClick} disabled={disabled} style={s} className={`inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3.5 text-sm font-semibold transition active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 ${FOCUS} ${className}`}>
      {children}
    </button>);
};
const Choice = ({ active, disabled, onSelect, children }: {
    active: boolean;
    disabled?: boolean;
    onSelect: () => void;
    children: ReactNode;
}) => {
    return (<button type="button" role="radio" aria-checked={active} disabled={disabled} onClick={onSelect} className={`w-full rounded-xl border text-start transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${FOCUS}`} style={active ? { background: T.ink, color: T.paper, borderColor: T.ink } : { background: T.paper, borderColor: T.line }}>
    {children}
  </button>);
};
const List = ({ title, items }: {
    title: string;
    items: string[];
}) => {
    const { t: tr } = useI18n();
    return items.length === 0 ? null : (<div>
      <h4 className="mb-3 text-sm font-semibold" style={{ color: T.muted }}>{tr(title)}</h4>
      <ul className="flex flex-col gap-2">
        {items.map((i) => (<li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed">
            <Check size={15} className="mt-1 shrink-0" aria-hidden/>
            {tr(i)}
          </li>))}
      </ul>
    </div>);
};
/* ------------------------------------------------------------------ */
/*  Top bar                                                             */
/* ------------------------------------------------------------------ */
const useOpenStatus = ({ timeZone, hours }: Content) => {
    const [s, setS] = useState<{
        open: boolean;
        text: string;
    } | null>(null);
    useEffect(() => {
        const tick = () => {
            const n = minutesNow(timeZone);
            const open = n >= hours.open && n < hours.close;
            setS({ open, text: open ? source("centre.open_until_value", [clock(hours.close)]) : source("centre.closed_opens_valuevalue", [n < hours.open ? "" : source("centre.tomorrow"), clock(hours.open)]) });
        };
        tick();
        const id = window.setInterval(tick, 60000);
        return () => window.clearInterval(id);
    }, [timeZone, hours.open, hours.close]);
    return s;
};
const TopBar = ({ client, content }: {
    client: ClientData;
    content: Content;
}) => {
    const { t: tr } = useI18n();
    const status = useOpenStatus(content);
    return (<header className="sticky top-0 z-40 border-b backdrop-blur" style={{ borderColor: T.line, background: `${T.bg}ee` }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <span dir="auto" className={`${H} truncate text-sm font-extrabold`}>{tr(client.name)}</span>
        <div className="flex items-center gap-3"><LanguageSwitcher />
          {tr(status && (<span className="hidden items-center gap-2 text-xs sm:flex" style={{ color: T.muted }}>
              <span className={`h-2 w-2 rounded-full ${status.open ? "bg-emerald-600" : "bg-neutral-400"}`} aria-hidden/>
              {tr(status.text)}
            </span>))}
          {tr(/^[1-9]\d{7,14}$/.test(client.whatsappNumber) && <a href={`tel:+${client.whatsappNumber}`} className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${FOCUS}`} style={{ borderColor: T.ink }}>
            <Phone size={15} aria-hidden/>{tr("centre.call")}</a>)}
        </div>
      </div>
    </header>);
};
/* ------------------------------------------------------------------ */
/*  Hero: a full-bleed panel in the client's own colour, like a paint   */
/*  swatch, with the availability board attached underneath.            */
/* ------------------------------------------------------------------ */
const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const rise: Variants = { hidden: { y: "105%" }, visible: { y: "0%", transition: { duration: 0.85, ease: EASE } } };
const Hero = ({ client, content, dayId, onDay }: {
    client: ClientData;
    content: Content;
    dayId: string;
    onDay: (id: string) => void;
}) => {
    const { t: tr } = useI18n();
    const t = useTheme();
    return (<section>
      <div style={{ background: t.color, color: t.on }}>
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-16 pt-16 lg:pb-24 lg:pt-28">
          {tr(client.logoUrl && (<div className="w-fit">
              <Image src={client.logoUrl} width={80} height={80} alt={tr(client.name)} className="h-20 w-20 rounded-2xl object-cover shadow-xl border-2 border-white/20 bg-white"/>
            </div>))}
          <motion.h1 dir="auto" aria-label={tr(client.name)} variants={stagger} initial="hidden" animate="visible" className={`${H} flex flex-wrap gap-x-5 text-5xl font-extrabold leading-[1.25] sm:text-7xl lg:text-8xl`}>
            {client.name.split(" ").map((w, i) => (<span key={`${w}-${i}`} className="inline-block overflow-hidden py-1">
                <motion.span variants={rise} aria-hidden className="inline-block">{tr(w)}</motion.span>
              </span>))}
          </motion.h1>
          <p className="max-w-xl text-lg leading-loose opacity-90">{tr(client.heroMessage)}</p>
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" onClick={() => go("booking")} style={{ background: t.on, color: t.color }} className={`inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold ${FOCUS}`}>
              <MessageCircle size={17} aria-hidden/>{tr("centre.request_an_appointment")}</button>
            <Btn tone="ghost" onClick={() => go("services")}>{tr("centre.services_prices")}</Btn>
            {tr(isIda(client) && (<span className="inline-flex items-center gap-1.5 text-sm font-semibold">
                <BadgeCheck size={17} aria-hidden/>{tr("centre.ida_certified")}</span>))}
          </div>
          <p className="text-sm opacity-75">{tr(content.category)}</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <div role="radiogroup" aria-label={tr("centre.choose_a_day")} className="-mt-10 grid gap-2 rounded-2xl border p-2 sm:grid-cols-[repeat(auto-fit,minmax(11rem,1fr))]" style={{ background: T.paper, borderColor: T.line }}>
          {client.days.map((d) => (<Choice key={d.id} active={d.id === dayId} disabled={d.slotsLeft === 0} onSelect={() => onDay(d.id)}>
              <span className="flex flex-col gap-2 px-4 py-3.5">
                <span className="flex items-baseline justify-between gap-3">
                  <span className="text-sm font-bold">{tr(d.label)}</span>
                  <span className="text-xs opacity-70">{tr(d.dateLabel)}</span>
                </span>
                <span className="text-xs opacity-80">{tr("centre.availability_confirmed_by_the_team")}</span>
              </span>
            </Choice>))}
        </div>
      </div>
    </section>);
};
/* ------------------------------------------------------------------ */
/*  Services: a spec sheet. Rows expand to features and process steps.  */
/* ------------------------------------------------------------------ */
const ServiceRow = ({ service, content, selected, open, onToggle, onChoose }: {
    service: ServiceItem;
    content: Content;
    selected: boolean;
    open: boolean;
    onToggle: () => void;
    onChoose: () => void;
}) => {
    const { t: tr } = useI18n();
    const t = useTheme();
    const d = detailsOf(service, content);
    const expandable = d.features.length + d.steps.length > 0;
    const panel = `service-${service.id}`;
    return (<li className="relative border-b" style={{ borderColor: T.line }}>
      <span aria-hidden className="absolute inset-y-0 start-0 w-1 rounded-full transition-opacity" style={{ background: t.color, opacity: selected ? 1 : 0 }}/>
      <button type="button" onClick={onToggle} aria-expanded={open} aria-controls={panel} disabled={!expandable} className={`flex w-full flex-wrap items-center gap-x-8 gap-y-3 py-7 ps-6 pe-2 text-start ${FOCUS}`}>
        <span className="flex min-w-[14rem] flex-1 flex-col gap-2">
          <span className="flex flex-wrap items-center gap-3">
            <span className={`${H} text-xl font-extrabold`}>{tr(service.name)}</span>
            {tr(service.badge && <span className="rounded-full px-3 py-0.5 text-xs font-semibold" style={{ background: t.color, color: t.on }}>{tr(service.badge)}</span>)}
          </span>
          {tr(service.desc && <span className="max-w-xl text-sm leading-relaxed" style={{ color: T.muted }}>{tr(service.desc)}</span>)}
        </span>
        <span className="flex items-center gap-1.5 text-sm" style={{ color: T.muted }}><Clock size={14} aria-hidden/>{tr(service.duration)}</span>
        <span className={`${H} min-w-[5rem] text-2xl font-extrabold`}>{tr(service.priceFormatted)}</span>
        {tr(expandable && (<motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}><ChevronDown size={18} aria-hidden/></motion.span>))}
      </button>
      <AnimatePresence initial={false}>
        {tr(open && (<motion.div id={panel} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: EASE }} className="overflow-hidden">
            <div className="grid gap-8 pb-8 ps-6 pe-2 sm:grid-cols-2">
              <List title={tr("centre.benefits")} items={d.features}/>
              <List title={tr("centre.our_process")} items={d.steps}/>
              <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                <Btn onClick={() => { onChoose(); go("booking"); }}>{tr("centre.choose_this_service")}</Btn>
                {tr(d.warranty && <span className="inline-flex items-center gap-1.5 text-sm font-semibold"><BadgeCheck size={16} aria-hidden/>{tr(d.warranty)}</span>)}
              </div>
            </div>
          </motion.div>))}
      </AnimatePresence>
    </li>);
};
const Services = ({ client, content, selectedId, onChoose }: {
    client: ClientData;
    content: Content;
    selectedId: string;
    onChoose: (id: string) => void;
}) => {
    const { t: tr } = useI18n();
    const [openId, setOpenId] = useState<string | null>(null);
    return (<Section id="services" title={tr("centre.services_prices")} note={tr("centre.select_a_service_to_explore_its_benefits")}>
      <ul className="border-t" style={{ borderColor: T.line }}>
        {client.services.map((s) => (<ServiceRow key={s.id} service={s} content={content} selected={s.id === selectedId} open={openId === s.id} onToggle={() => { setOpenId((c) => (c === s.id ? null : s.id)); onChoose(s.id); }} onChoose={() => onChoose(s.id)}/>))}
      </ul>
    </Section>);
};
/* ------------------------------------------------------------------ */
/*  Booking: three real steps, with a live summary that follows you.    */
/* ------------------------------------------------------------------ */
const Step = ({ n, title }: {
    n: number;
    title: string;
}) => {
    const { t: tr } = useI18n();
    return (<h3 className={`${H} mb-4 flex items-center gap-3 text-base font-extrabold`}>
    <span className="flex h-7 w-7 items-center justify-center rounded-full text-xs" style={{ background: T.ink, color: T.paper }}>{tr(ar(n))}</span>
    {tr(title)}
  </h3>);
};
const Row = ({ label, value }: {
    label: string;
    value: string;
}) => {
    const { t: tr } = useI18n();
    return (<div className="flex items-start justify-between gap-4 py-2.5 text-sm">
    <dt style={{ color: T.muted }}>{tr(label)}</dt>
    <dd className="text-end font-semibold">{tr(value)}</dd>
  </div>);
};
const Summary = ({ sel, onBook, canBook, innerRef }: {
    sel: Selection;
    onBook: () => void;
    canBook: boolean;
    innerRef: React.RefObject<HTMLDivElement | null>;
}) => {
    const { t: tr } = useI18n();
    const t = useTheme();
    return (<div ref={innerRef} className="overflow-hidden rounded-2xl border" style={{ background: T.paper, borderColor: T.line }}>
      <div className="h-2" style={{ background: t.color }} aria-hidden/>
      <div className="p-6">
        <h3 className={`${H} text-lg font-extrabold`}>{tr("centre.request_summary")}</h3>
        <dl className="mt-3 divide-y" style={{ borderColor: T.line }}>
          <Row label={tr("centre.service")} value={sel.service.name}/>
          <Row label={tr("centre.day")} value={sel.day ? `${sel.day.label} (${sel.day.dateLabel})` : tr("centre.not_selected")}/>
          <Row label={tr("centre.time")} value={sel.slot?.label ?? tr("centre.not_selected")}/>
          <Row label={tr("centre.duration")} value={sel.service.duration}/>
        </dl>
        <div className="mt-4 flex items-end justify-between border-t border-dashed pt-4" style={{ borderColor: T.line }}>
          <span className="text-sm" style={{ color: T.muted }}>{tr("centre.total")}</span>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span key={sel.service.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }} className={`${H} text-3xl font-extrabold`}>
              {tr(sel.service.priceFormatted)}
            </motion.span>
          </AnimatePresence>
        </div>
        <Btn tone="accent" onClick={onBook} disabled={!canBook} className="mt-5 w-full">
          <MessageCircle size={17} aria-hidden/>{tr("centre.send_request_on_whatsapp")}</Btn>
        <p className="mt-3 text-center text-xs leading-relaxed" style={{ color: T.muted }}>{tr("centre.the_team_will_check_availability_and_confirm")}</p>
      </div>
    </div>);
};
const Booking = (p: {
    client: ClientData;
    sel: Selection;
    slots: TimeSlot[];
    canBook: boolean;
    ids: {
        service: string;
        day: string;
        slot: string;
    };
    onService: (id: string) => void;
    onDay: (id: string) => void;
    onSlot: (id: string) => void;
    onBook: () => void;
    ticketRef: React.RefObject<HTMLDivElement | null>;
}) => {
    const { t: tr } = useI18n();
    return (<Section id="booking" title={tr("centre.request_an_appointment")} note={tr("centre.choose_your_service_day_and_time_then")}>
    <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
      <div className="flex flex-col gap-10">
        <div>
          <Step n={1} title={tr("centre.service")}/>
          <div role="radiogroup" aria-label={tr("centre.service")} className="flex flex-col gap-2">
            {p.client.services.map((s) => (<Choice key={s.id} active={s.id === p.ids.service} onSelect={() => p.onService(s.id)}>
                <span className="flex items-center justify-between gap-4 px-4 py-3.5">
                  <span className="flex flex-col leading-tight"><span className="text-sm font-bold">{tr(s.name)}</span><span className="text-xs opacity-70">{tr(s.duration)}</span></span>
                  <span className="text-sm font-bold">{tr(s.priceFormatted)}</span>
                </span>
              </Choice>))}
          </div>
        </div>
        <div>
          <Step n={2} title={tr("centre.day")}/>
          <div role="radiogroup" aria-label={tr("centre.day")} className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {p.client.days.map((d) => (<Choice key={d.id} active={d.id === p.ids.day} disabled={d.slotsLeft === 0} onSelect={() => p.onDay(d.id)}>
                <span className="flex flex-col gap-0.5 px-3.5 py-3">
                  <span className="text-sm font-bold">{tr(d.label)}</span>
                  <span className="text-xs opacity-70">{tr(d.dateLabel)}</span>
                  <span className="mt-1 text-xs">{tr("centre.availability_confirmed_by_the_team")}</span>
                </span>
              </Choice>))}
          </div>
        </div>
        <div>
          <Step n={3} title={tr("centre.time")}/>
          <div role="radiogroup" aria-label={tr("centre.time")} className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {p.slots.map((s) => (<Choice key={s.id} active={s.id === p.ids.slot} onSelect={() => p.onSlot(s.id)}>
                <span className="block px-3 py-3 text-center text-sm font-bold">{tr(s.label)}</span>
              </Choice>))}
          </div>
          {tr(p.slots.length === 0 && <p className="mt-3 text-sm" style={{ color: T.muted }} role="status">{tr("centre.no_times_remain_for_this_day_please")}</p>)}
        </div>
      </div>
      <div className="lg:sticky lg:top-20 lg:self-start"><Summary sel={p.sel} onBook={p.onBook} canBook={p.canBook} innerRef={p.ticketRef}/></div>
    </div>
  </Section>);
};
/* ------------------------------------------------------------------ */
/*  FAQ + location                                                      */
/* ------------------------------------------------------------------ */
const Faqs = ({ faqs }: {
    faqs: Faq[];
}) => {
    const { t: tr } = useI18n();
    return (<Section title={tr("centre.frequently_asked_questions")} note={tr("centre.answers_about_the_services_available_on_this")}>
    <div className="border-t" style={{ borderColor: T.line }}>
      {faqs.map((f, i) => (<details key={f.id} name="faq" open={i === 0} className="group border-b" style={{ borderColor: T.line }}>
          <summary className={`flex cursor-pointer list-none items-center justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden ${FOCUS}`}>
            <span className="text-base font-semibold leading-relaxed">{tr(f.question)}</span>
            <ChevronDown size={18} className="shrink-0 transition-transform group-open:rotate-180" aria-hidden/>
          </summary>
          <p className="max-w-3xl pb-6 leading-loose" style={{ color: T.muted }}>{tr(f.answer)}</p>
        </details>))}
    </div>
  </Section>);
};
const Ext = ({ href, icon, label }: {
    href: string;
    icon: ReactNode;
    label: string;
}) => {
    const { t: tr } = useI18n();
    return (<a href={href} target="_blank" rel="noopener noreferrer" className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full border px-4 py-3 text-sm font-semibold ${FOCUS}`} style={{ borderColor: T.ink }}>
    {icon}{tr(label)}
  </a>);
};
const Location = ({ client, content }: {
    client: ClientData;
    content: Content;
}) => {
    const { t: tr } = useI18n();
    const [lat, lng] = client.mapCoordinates;
    return (<Section title={tr("centre.visit_the_studio")}>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="h-[22rem] overflow-hidden rounded-2xl border lg:col-span-2 lg:h-[28rem]" style={{ borderColor: T.line }}>
          <MapComponent coordinates={client.mapCoordinates} name={client.name}/>
        </div>
        <div className="flex flex-col justify-between gap-8 rounded-2xl border p-6" style={{ background: T.paper, borderColor: T.line }}>
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="mt-1" aria-hidden/>
              <div className="flex flex-col gap-1">
                <span className="text-sm" style={{ color: T.muted }}>{tr("centre.address")}</span>
                <span className="font-semibold">{tr(content.address)}</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={18} className="mt-1" aria-hidden/>
              <div className="flex flex-col gap-1">
                <span className="text-sm" style={{ color: T.muted }}>{tr("centre.opening_hours")}</span>
                <span className="font-semibold">{tr("centre.daily_from")}{" "}{tr(clock(content.hours.open))}{" "}{tr("centre.to")}{" "}{tr(clock(content.hours.close))}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Ext href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`} icon={<Navigation size={16} aria-hidden/>} label={tr("centre.google_maps")}/>
            <Ext href={`https://waze.com/ul?ll=${lat},${lng}&navigate=yes`} icon={<MapPin size={16} aria-hidden/>} label="Waze"/>
          </div>
        </div>
      </div>
    </Section>);
};
/* ------------------------------------------------------------------ */
/*  Mobile dock                                                         */
/* ------------------------------------------------------------------ */
const Dock = ({ visible, sel, onBook }: {
    visible: boolean;
    sel: Selection;
    onBook: () => void;
}) => {
    const { t: tr } = useI18n();
    const t = useTheme();
    const sub = [sel.day?.label, sel.slot?.label].filter(Boolean).map((value) => tr(value)).join(tr("centre.separator_94"));
    return (<AnimatePresence>
      {tr(visible && (<motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} transition={{ duration: 0.3, ease: EASE }} className="fixed inset-x-0 bottom-0 z-50 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 lg:hidden" style={{ background: T.ink, color: T.paper }}>
          <div className="flex items-center gap-3">
            <div className="flex min-w-0 flex-1 flex-col leading-tight">
              <span className="truncate text-sm font-semibold">{tr(sel.service.name)}</span>
              <span className="truncate text-xs opacity-70">{tr(sub || sel.service.duration)}</span>
            </div>
            <span className="text-lg font-bold">{tr(sel.service.priceFormatted)}</span>
            <button type="button" onClick={onBook} style={{ background: t.color, color: t.on }} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold ${FOCUS}`}>
              <MessageCircle size={17} aria-hidden/>{tr("centre.book")}</button>
          </div>
        </motion.div>))}
    </AnimatePresence>);
};
/* ------------------------------------------------------------------ */
/*  Portal: owns all booking state                                      */
/* ------------------------------------------------------------------ */
const Portal = ({ client }: {
    client: ClientData;
}) => {
    const { t: tr, direction, locale } = useI18n();
    const theme = useMemo(() => ({ color: client.themeColor, on: readableOn(client.themeColor) }), [client.themeColor]);
    const content = useMemo(() => resolveContent(client), [client]);
    const faqs = useMemo(() => buildFaqs(client, content, locale), [client, content, locale]);
    const [serviceId, setServiceId] = useState(client.services[0]?.id ?? "");
    const [dayId, setDayId] = useState((client.days.find((d) => d.slotsLeft > 0) ?? client.days[0])?.id ?? "");
    const [slotId, setSlotId] = useState(client.slots[0]?.id ?? "");
    const [now, setNow] = useState<Date | null>(null);
    const ticketRef = useRef<HTMLDivElement | null>(null);
    const ticketInView = useInView(ticketRef, { amount: 0.4 });
    useEffect(() => {
        const frame = requestAnimationFrame(() => setNow(new Date()));
        const interval = window.setInterval(() => setNow(new Date()), 60000);
        return () => { cancelAnimationFrame(frame); clearInterval(interval); };
    }, []);
    const service = client.services.find((s) => s.id === serviceId) ?? client.services[0];
    if (!service)
        return null;
    const slots = now ? futurePreferredSlots(client.slots, dayId, now, content.timeZone) : [];
    const selectedSlot = slots.find((s) => s.id === slotId) ?? slots[0];
    const sel: Selection = { service, day: client.days.find((d) => d.id === dayId), slot: selectedSlot };
    const whatsappReady = /^[1-9]\d{7,14}$/.test(client.whatsappNumber);
    const canBook = whatsappReady && Boolean(sel.day && selectedSlot);
    const book = () => {
        const freshSlots = futurePreferredSlots(client.slots, dayId, new Date(), content.timeZone);
        if (canBook && freshSlots.some((s) => s.id === selectedSlot?.id)) {
            window.open(whatsappUrl(client, sel, locale), "_blank", "noopener,noreferrer");
        }
        else {
            setNow(new Date());
        }
    };
    return (<ThemeCtx.Provider value={theme}>
      <MotionConfig reducedMotion="user">
        <div dir={direction} className={`${body.className} min-h-screen`} style={{ background: T.bg, color: T.ink }}>
          <TopBar client={client} content={content}/>
          <Hero client={client} content={content} dayId={dayId} onDay={setDayId}/>
          <main id="main-content" className="mx-auto flex max-w-6xl flex-col gap-16 px-4 pb-40 pt-24 lg:pb-24">
            <Services client={client} content={content} selectedId={service.id} onChoose={setServiceId}/>
            {tr(!whatsappReady && <p className="text-sm" role="status">{tr("centre.this_is_a_preview_contacting_the_centre")}</p>)}
            <Booking client={client} sel={sel} slots={slots} canBook={canBook} ids={{ service: service.id, day: dayId, slot: selectedSlot?.id ?? "" }} onService={setServiceId} onDay={setDayId} onSlot={setSlotId} onBook={book} ticketRef={ticketRef}/>
            <Faqs faqs={faqs}/>
            <Location client={client} content={content}/>
          </main>
          <footer className="border-t py-8 text-center text-xs" style={{ borderColor: T.line, color: T.muted }}>Powered by Estanza</footer>
          <Dock visible={canBook && !ticketInView} sel={sel} onBook={book}/>
        </div>
      </MotionConfig>
    </ThemeCtx.Provider>);
};
export default function CenterPortal({ client }: {
    client: ClientData;
}) {
    return <Portal client={client}/>;
}
