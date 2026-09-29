"use client";

import { useEffect, useState, MouseEvent } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { MessageCircle, Sparkles, Car, ChevronLeft, ArrowUpLeft } from "lucide-react";
import EstanzaLogo from "./EstanzaLogo";

const EASE = [0.16, 1, 0.3, 1] as const;
const WHATSAPP_URL =
  "https://wa.me/962790899175?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20Estanza%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%AA%D8%AC%D9%87%D9%8A%D8%B2%20%D9%86%D8%B8%D8%A7%D9%85%20%D8%A7%D9%84%D8%AD%D8%AC%D9%88%D8%B2%D8%A7%D8%AA";

type SectorItem = {
  title: string;
  desc: string;
  badge: string;
  href: string;
  icon: typeof Sparkles;
};

const SECTORS: SectorItem[] = [
  {
    title: "عيادات ومراكز التجميل",
    desc: "تنظيم مواعيد الفيلر، الليزر، جلسات العناية بالبشرة، والاستشارات.",
    badge: "عيادات & سبا",
    href: "#beauty-clinics",
    icon: Sparkles,
  },
  {
    title: "مراكز واستوديوهات السيارات",
    desc: "إدارة حجوزات النانو سيراميك، حماية PPF، التلميع والتظليل والغسيل المتنقل.",
    badge: "ديتيلينج & حماية",
    href: "#auto-centers",
    icon: Car,
  },
];

type NavLink = {
  label: string;
  href: string;
  isCta?: boolean;
};

const MAIN_LINKS: NavLink[] = [
  { label: "المميزات والخصائص", href: "#features" },
  { label: "آلية العمل السريعة", href: "#how-it-works" },
  { label: "الأسعار والتجهيز", href: "#pricing" },
  { label: "احجز نظامك خلال 24 ساعة", href: WHATSAPP_URL, isCta: true },
];

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400";

export default function Navbar() {
  const reduce = useReducedMotion();
  const t = (s: number) => (reduce ? 0 : s);

  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // إخفاء الـ Navbar بسلاسة عند النزول، وإظهاره فور الصعود
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 20);
    setHidden(!isOpen && y > prev && y > 150);
  });

  // الزر المغناطيسي السلس
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 14, mass: 0.1 });
  const sy = useSpring(my, { stiffness: 180, damping: 14, mass: 0.1 });

  const onMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  // قفل السكرول ودعم زر ESC
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const close = () => {
    setIsOpen(false);
    setActive(null);
  };

  return (
    <>
      <motion.header
        dir="rtl"
        animate={{ y: hidden ? "-115%" : "0%" }}
        transition={{ duration: t(0.45), ease: EASE }}
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 md:px-12 transition-[padding,background-color,border-color,backdrop-filter] duration-500 ${
          isOpen
            ? // القائمة مفتوحة: خلفية داكنة صلبة (بلا شفافية) عشان نص الروابط وهو يتمرّر
              // ما يطلع من تحت الهيدر الثابت ويتراكب مع الشعار وزر الإغلاق.
              "py-3.5 bg-[#031512] border-b border-emerald-500/10"
            : scrolled
            ? "py-3.5 bg-[#031512]/85 backdrop-blur-xl border-b border-emerald-500/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "py-6 md:py-8 bg-transparent"
        }`}
      >
        {/* الشعار */}
        <Link
          href="/"
          onClick={close}
          aria-label="الرئيسية - Estanza"
          className={`group flex items-center gap-3.5 ${focusRing} rounded-xl p-1`}
        >
          <motion.div
            initial={reduce ? false : { clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: 1.1, delay: 0.15, ease: EASE }}
            className="relative"
          >
            <div className="absolute -inset-1 rounded-full bg-emerald-500/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <EstanzaLogo className="relative h-9 w-9 text-emerald-400 transition-transform duration-500 ease-out group-hover:scale-105" />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-emerald-300">
              Estanza
            </span>
            <span className="text-[10px] font-medium tracking-wider text-emerald-400/70 -mt-1 hidden sm:block">
              نظام الحجز الذكي
            </span>
          </div>
        </Link>

        {/* الأزرار العلوية */}
        <div className="flex items-center gap-3 md:gap-5">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className={`hidden sm:inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 px-5 py-2.5 text-xs md:text-sm font-semibold text-emerald-300 backdrop-blur-md transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-500 hover:text-[#031512] hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] active:scale-95 ${focusRing}`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>طلب النظام</span>
          </a>

          {/* زر القائمة المغناطيسي */}
          <motion.button
            style={{ x: sx, y: sy }}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            onClick={() => setIsOpen((v) => !v)}
            aria-expanded={isOpen}
            aria-controls="site-menu"
            aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
            className={`group relative flex items-center gap-3 rounded-full border border-emerald-500/20 bg-[#06241f]/70 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-lg transition-all duration-300 hover:border-emerald-400/60 hover:bg-[#08312a] ${focusRing}`}
          >
            <span className="relative block h-5 w-12 overflow-hidden leading-5 text-center">
              <motion.span
                aria-hidden
                animate={{ y: isOpen ? "-100%" : "0%" }}
                transition={{ duration: t(0.4), ease: EASE }}
                className="absolute inset-0 block font-medium"
              >
                القائمة
              </motion.span>
              <motion.span
                aria-hidden
                initial={false}
                animate={{ y: isOpen ? "0%" : "100%" }}
                transition={{ duration: t(0.4), ease: EASE }}
                className="absolute inset-0 block text-emerald-400 font-semibold"
              >
                إغلاق
              </motion.span>
            </span>
            <span
              className={`h-2 w-2 rounded-full bg-emerald-400 transition-all duration-500 group-hover:shadow-[0_0_8px_#34d399] ${
                isOpen ? "scale-[2] bg-emerald-300" : ""
              }`}
            />
          </motion.button>
        </div>
      </motion.header>

      {/* قائمة الشاشة الكاملة */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="site-menu"
            dir="rtl"
            role="dialog"
            aria-modal="true"
            aria-label="قائمة الموقع الرئيسية"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: t(0.75), ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-gradient-to-b from-[#031512] via-[#041a17] to-[#020d0b] px-6 pb-10 pt-28 md:px-16 lg:px-24"
          >
            {/* الشبكة الداخلية */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16 my-auto pt-4">
              {/* قسم الروابط الرئيسية */}
              <nav aria-label="الروابط الأساسية" className="space-y-4">
                <span className="text-xs uppercase tracking-widest text-emerald-400/80 font-bold block mb-2">
                  التصفح
                </span>
                <ul className="space-y-1">
                  {MAIN_LINKS.map((item, i) => (
                    <li
                      key={item.label}
                      className="overflow-hidden border-b border-emerald-950/60 pb-1"
                    >
                      <motion.div
                        initial={{ y: "115%" }}
                        animate={{ y: 0 }}
                        transition={{
                          delay: t(0.2 + i * 0.05),
                          duration: t(0.75),
                          ease: EASE,
                        }}
                        onMouseEnter={() => setActive(i)}
                        onMouseLeave={() => setActive(null)}
                        className={`transition-opacity duration-300 ${
                          active !== null && active !== i ? "opacity-35" : "opacity-100"
                        }`}
                      >
                        <Link
                          href={item.href}
                          onClick={close}
                          className={`group flex items-center justify-between py-3 text-3xl sm:text-5xl font-light tracking-tight transition-all duration-300 ${
                            item.isCta
                              ? "text-emerald-400 font-normal hover:text-emerald-300"
                              : "text-slate-100 hover:text-white"
                          } ${active === i ? "-translate-x-3" : ""} ${focusRing}`}
                        >
                          <span>{item.label}</span>
                          <span
                            aria-hidden
                            className={`text-xl transition-transform duration-300 ${
                              active === i ? "-translate-x-2 text-emerald-400" : "opacity-40"
                            }`}
                          >
                            {item.isCta ? <ArrowUpLeft className="w-8 h-8" /> : <ChevronLeft className="w-6 h-6" />}
                          </span>
                        </Link>
                      </motion.div>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* قسم القطاعات المدعومة (بطاقات مصممة خصيصاً) */}
              <div className="space-y-5 lg:border-r lg:border-emerald-900/30 lg:pr-12">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-emerald-400/80 font-bold">
                    القطاعات المتخصصة
                  </span>
                  <span className="text-[11px] text-emerald-200/50 bg-emerald-950/60 border border-emerald-800/30 px-2.5 py-0.5 rounded-full">
                    مخصص ومجهز بالكامل
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                  {SECTORS.map((sector, idx) => {
                    const Icon = sector.icon;
                    return (
                      <motion.div
                        key={sector.title}
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: t(0.4 + idx * 0.1), duration: t(0.6) }}
                      >
                        <Link
                          href={sector.href}
                          onClick={close}
                          className={`group block p-5 rounded-2xl border border-emerald-900/40 bg-emerald-950/20 hover:bg-emerald-900/30 hover:border-emerald-500/40 transition-all duration-300 ${focusRing}`}
                        >
                          <div className="flex items-center justify-between mb-2.5">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-[#031512] transition-all duration-300">
                                <Icon className="w-5 h-5" />
                              </div>
                              <h3 className="font-bold text-lg text-white group-hover:text-emerald-300 transition-colors">
                                {sector.title}
                              </h3>
                            </div>
                            <span className="text-[11px] font-semibold text-emerald-300/80 bg-emerald-900/40 border border-emerald-700/30 px-2 py-0.5 rounded-md">
                              {sector.badge}
                            </span>
                          </div>
                          <p className="text-xs leading-relaxed text-emerald-100/60 group-hover:text-emerald-100/80 transition-colors">
                            {sector.desc}
                          </p>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* كرت الاستفسار السريع بأسفل العمود الجانبي */}
                <div className="pt-4 border-t border-emerald-950/60 flex items-center justify-between text-xs">
                  <span className="text-emerald-200/50">جاهز للتركيب خلال 24 ساعة</span>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-400 hover:text-white font-medium transition-colors flex items-center gap-1"
                  >
                    <span>تحدث مع الدعم الفني</span>
                    <ArrowUpLeft className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* الفوتر السفلي للقائمة */}
            <div className="mt-8 pt-6 border-t border-emerald-950/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/40">
              <span>© {new Date().getFullYear()} Estanza. جميع الحقوق محفوظة.</span>
              <span>نظام حجز فوري بدون اشتراكات شهرية</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}