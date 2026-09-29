"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Navigation, Loader2 } from "lucide-react";

interface ServiceItem {
  id: string;
  category: "wash" | "dryclean";
  num: string;
  title: string;
  price: number;
  duration: string;
  desc: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: "wash-1",
    category: "wash",
    num: "01",
    title: "غسيل لمرة واحدة (داخلي وخارجي)",
    price: 10,
    duration: "45–60 دقيقة",
    desc: "غسيل خارجي يدوي برغوة متعادلة لحماية النانو والطلاء، مع تنظيف وتكييس المقصورة."
  },
  {
    id: "wash-5",
    category: "wash",
    num: "02",
    title: "اشتراك شهري (5 غسلات)",
    price: 33,
    duration: "مواعيد مرنة طوال الشهر",
    desc: "5 زيارات شاملة لباب منزلك مع أولوية مطلقة في حجز المواعيد وتوفير 17 دينار."
  },
  {
    id: "wash-10",
    category: "wash",
    num: "03",
    title: "اشتراك شهري (10 غسلات)",
    price: 60,
    duration: "رعاية دورية مستمرة",
    desc: "10 غسلات متكاملة للمحافظة الدائمة على نظافة السيارة، وتوفير 40 دينار بالكامل."
  },
  {
    id: "dry-sedan",
    category: "dryclean",
    num: "04",
    title: "دراي كلين — سيدان وصالون",
    price: 30,
    duration: "3 ساعات عمل",
    desc: "فك المقاعد، تعقيم الأنسجة والأرضيات بالبخار الحار 140°C، ومعالجة التابلوه والجلد."
  },
  {
    id: "dry-suv",
    category: "dryclean",
    num: "05",
    title: "دراي كلين — جيب و SUV",
    price: 40,
    duration: "4 ساعات عمل",
    desc: "عناية متكاملة لسيارات الدفع الرباعي، تطهير فتحات التكييف وسجاد الصندوق الخلفي."
  },
  {
    id: "dry-7seats",
    category: "dryclean",
    num: "06",
    title: "دراي كلين — 7 مقاعد وعائلي",
    price: 45,
    duration: "5 ساعات عمل",
    desc: "تعقيم فائق لجميع المقاعد الـ 7 وبطانة السقف والأرضيات بزيوت ومواد آمنة."
  }
];

export default function Wash33Page() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "wash" | "dryclean">("all");
  const [selectedServiceId, setSelectedServiceId] = useState("wash-5");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const selectedService = SERVICES_DATA.find((s) => s.id === selectedServiceId) || SERVICES_DATA[1];

  const filteredServices = activeTab === "all" 
    ? SERVICES_DATA 
    : SERVICES_DATA.filter((s) => s.category === activeTab);

  const handleGeoLocation = () => {
    if (typeof window === "undefined" || !navigator.geolocation) return;
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation(`https://maps.google.com/?q=${pos.coords.latitude},${pos.coords.longitude}`);
        setIsLocating(false);
      },
      () => setIsLocating(false),
      { timeout: 8000 }
    );
  };
const handleBookingSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (isSubmitting) return;
  setIsSubmitting(true);

  const text = `طلب حجز موعد من موقع WASH 33:
• الاسم: ${name || "غير محدد"}
• الهاتف: ${phone || "غير محدد"}
• الموقع: ${location || "عمّان"}
• الموعد: ${date || "أقرب وقت"} ${time ? `(${time})` : ""}
• الخدمة المطلوبة: ${selectedService.title}
• القيمة: ${selectedService.price} دينار أردني`;

  const encoded = encodeURIComponent(text);
  const whatsappUrl = `https://wa.me/962788722256?text=${encoded}`;

  setTimeout(() => {
    window.location.href = whatsappUrl;
    setIsSubmitting(false);
  }, 400);
};

  return (
    <div dir="rtl" className="min-h-screen overflow-x-hidden bg-[#09090B] text-[#F3EFEA] font-sans antialiased selection:bg-[#C9A96E] selection:text-black pb-20 sm:pb-0">
      
      <header className="sticky top-0 z-50 bg-[#09090B]/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image 
              src="/wash33-mark.png" 
              alt="WASH 33" 
              width={34} 
              height={34} 
              className="object-contain" 
              priority 
            />
            <div className="flex flex-col">
              <span className="font-serif tracking-widest text-base font-bold text-white uppercase leading-none">
                WASH 33
              </span>
              <span className="text-[10px] tracking-widest text-[#A6936E] uppercase font-mono mt-1">
                AMMAN • CAR CARE
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <a 
              href="tel:0788722256" 
              className="hidden sm:inline-block text-xs font-mono text-[#8C867B] hover:text-[#C9A96E] transition-colors" 
              dir="ltr"
            >
              0788722256
            </a>
            <a
              href="#booking"
              className="px-4 sm:px-5 py-2 text-xs font-semibold tracking-wider border border-[#C9A96E]/50 text-[#DFCA9F] hover:bg-[#C9A96E] hover:text-black transition-all duration-300 active:scale-[0.97]"
            >
              احجز موعدك
            </a>
          </div>
        </div>
      </header>

      <section className="relative min-h-[78vh] flex items-center border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center filter brightness-[0.75] contrast-[1.1]"
            style={{ backgroundImage: `url('/hero-car.jpg')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/60 to-transparent" />
        </div>

        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-20 relative z-10 w-full text-right space-y-5">
          <span
            className="hero-rise inline-block text-[11px] font-mono tracking-widest text-[#C9A96E] uppercase border border-[#C9A96E]/30 bg-black/40 px-3 py-1"
            style={{ animationDelay: "0ms" }}
          >
            MOBILE CAR CARE • AMMAN
          </span>

          <h1
            className="hero-rise text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-white leading-tight"
            style={{ animationDelay: "90ms" }}
          >
            غسيل وعناية بالسيارة، <br />
            <span className="text-[#E8D7B8]">في مكانك.</span>
          </h1>

          <p
            className="hero-rise max-w-lg text-sm sm:text-base text-[#C5BFB5] leading-relaxed font-light"
            style={{ animationDelay: "180ms" }}
          >
            فريق متنقل ومستقل بالكامل يصلك أمام البيت أو العمل في عمّان، بدون الحاجة لتوفير ماء أو كهرباء من طرفك.
          </p>

          <div className="hero-rise pt-3 flex flex-wrap items-center gap-3.5" style={{ animationDelay: "270ms" }}>
            <a
              href="#booking"
              className="btn-shine px-7 py-3.5 bg-[#C9A96E] hover:bg-[#DBC18D] text-black text-xs font-bold tracking-wider uppercase transition-all duration-300 active:scale-[0.97]"
            >
              احجز موعدك الآن
            </a>
            <a
              href="#services"
              className="px-7 py-3.5 border border-white/20 hover:border-white text-white text-xs font-mono tracking-wider transition-all duration-300 active:scale-[0.97]"
            >
              الخدمات والأسعار
            </a>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 max-w-5xl mx-auto px-5 sm:px-8 border-b border-white/5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-white/5 gap-4">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#C9A96E] uppercase block mb-1">
              SERVICES & PRICING
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
              قائمة الخدمات والأسعار
            </h2>
          </div>

          <div className="flex border border-white/10 bg-[#121216] p-1 font-mono text-xs w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("all")}
              className={`flex-1 sm:flex-initial px-4 py-2 transition-all duration-300 ${
                activeTab === "all" ? "bg-[#C9A96E] text-black font-bold" : "text-[#8C867B] hover:text-white"
              }`}
            >
              الكل
            </button>
            <button
              onClick={() => setActiveTab("wash")}
              className={`flex-1 sm:flex-initial px-4 py-2 transition-all duration-300 ${
                activeTab === "wash" ? "bg-[#C9A96E] text-black font-bold" : "text-[#8C867B] hover:text-white"
              }`}
            >
              غسيل واشتراكات
            </button>
            <button
              onClick={() => setActiveTab("dryclean")}
              className={`flex-1 sm:flex-initial px-4 py-2 transition-all duration-300 ${
                activeTab === "dryclean" ? "bg-[#C9A96E] text-black font-bold" : "text-[#8C867B] hover:text-white"
              }`}
            >
              دراي كلين
            </button>
          </div>
        </div>

        <div className="space-y-3.5">
          {filteredServices.map((srv) => {
            const isSelected = selectedServiceId === srv.id;
            return (
              <div
                key={srv.id}
                onClick={() => {
                  setSelectedServiceId(srv.id);
                  const el = document.getElementById("booking");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className={`p-5 sm:p-6 border transition-all duration-300 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isSelected 
                    ? "selected-glow bg-[#141318] border-[#C9A96E] ring-1 ring-[#C9A96E]" 
                    : "bg-[#0E0D12] border-white/5 hover:border-white/20 hover:bg-white/[0.02]"
                }`}
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#C9A96E] font-bold">{srv.num}</span>
                    <h3 className="font-serif font-bold text-base sm:text-lg text-white">
                      {srv.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#9E988D] font-light leading-relaxed pr-6">
                    {srv.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/5">
                  <div className="text-right sm:text-left">
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif text-2xl sm:text-3xl font-bold text-[#E8D7B8]">
                        {srv.price}
                      </span>
                      <span className="text-xs text-[#8C867B]">د.أ</span>
                    </div>
                    <span className="text-[10px] text-[#6E6A63] font-mono block">{srv.duration}</span>
                  </div>

                  <span className={`px-3 py-1.5 text-xs font-mono transition-colors duration-300 ${
                    isSelected ? "bg-[#C9A96E] text-black font-bold" : "border border-white/10 text-[#8C867B]"
                  }`}>
                    {isSelected ? "تم التحديد" : "اختيار"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-16 max-w-5xl mx-auto px-5 sm:px-8 border-b border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-[#C9A96E] uppercase block">
              THE METHOD
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              خدمة مريحة، ونهتم بأدق التفاصيل.
            </h2>
            <p className="text-xs sm:text-sm text-[#9E988D] leading-relaxed font-light">
              فريقنا يأتي بسيارة مجهزة بالكامل لتنظيف سيارتك في مكانها، بدون عناء الذهاب للمغاسل أو الانتظار.
            </p>

            <div className="space-y-3 pt-2 text-xs text-[#C5BFB5]">
              <div className="flex items-start gap-2.5">
                <span className="text-[#C9A96E] font-bold">✓</span>
                <span>استقلالية تامة: لا نطلب أي مصدر ماء أو كهرباء من موقعك.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-[#C9A96E] font-bold">✓</span>
                <span>عناية بالأسطح: مواد متعادلة آمنة للطلاء وتنظيف هادئ للمقصورة.</span>
              </div>
            </div>
          </div>

          <div className="group relative aspect-[16/10] w-full border border-white/10 overflow-hidden">
            <Image
              src="/service-wash.jpg"
              alt="عناية دقيقة بالمقصورة"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          </div>
        </div>
      </section>

      <section id="booking" className="py-20 max-w-2xl mx-auto px-5 sm:px-8">
        <div className="text-center space-y-2 mb-8">
          <span className="text-[10px] font-mono tracking-widest text-[#C9A96E] uppercase block">
            DIRECT BOOKING
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            حجز موعد فوري
          </h2>
          <p className="text-xs text-[#8C867B]">
            اختر الخدمة وتفاصيل الموعد وسنؤكد معك مباشرة عبر واتساب.
          </p>
        </div>

        <form 
          onSubmit={handleBookingSubmit} 
          suppressHydrationWarning
          className="bg-[#100F14] border border-white/10 p-6 sm:p-10 space-y-5 shadow-2xl"
        >
          <div>
            <label className="text-xs text-[#C5BFB5] block mb-2 font-medium">الخدمة المحددة</label>
            <select
              suppressHydrationWarning
              value={mounted ? selectedServiceId : "wash-5"}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              className="w-full bg-[#08080A] border border-white/15 px-4 py-3.5 text-base sm:text-sm text-white focus:outline-none focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/20 transition-colors duration-300"
            >
              {SERVICES_DATA.map((s) => (
                <option key={s.id} value={s.id} className="bg-[#0E0D12] text-white">
                  {s.title} — ({s.price} دينار)
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-[#C5BFB5] font-medium">أين السيارة في عمّان؟</label>
              <button
                type="button"
                onClick={handleGeoLocation}
                disabled={isLocating}
                className="text-[11px] font-mono text-[#C9A96E] hover:underline flex items-center gap-1 cursor-pointer disabled:opacity-60"
              >
                <Navigation className="w-3 h-3" />
                <span>{isLocating ? "جارٍ التحديد..." : "إرفاق الموقع الحالي (GPS)"}</span>
              </button>
            </div>
            <input
              suppressHydrationWarning
              type="text"
              required
              placeholder="المنطقة أو الحي (مثال: عبدون، دير غبار)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-[#08080A] border border-white/15 px-4 py-3 text-base sm:text-xs text-white placeholder-[#555260] focus:outline-none focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/20 transition-colors duration-300"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-[#C5BFB5] block mb-2 font-medium">اليوم المفضل</label>
              <input
                suppressHydrationWarning
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#08080A] border border-white/15 px-4 py-3 text-base sm:text-xs text-white focus:outline-none focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/20 transition-colors duration-300 font-mono"
              />
            </div>
            <div>
              <label className="text-xs text-[#C5BFB5] block mb-2 font-medium">الوقت التقريبي</label>
              <input
                suppressHydrationWarning
                type="text"
                placeholder="مثال: بعد العصر أو 11:00 صباحاً"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-[#08080A] border border-white/15 px-4 py-3 text-base sm:text-xs text-white placeholder-[#555260] focus:outline-none focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/20 transition-colors duration-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-[#C5BFB5] block mb-2 font-medium">الاسم</label>
              <input
                suppressHydrationWarning
                type="text"
                required
                placeholder="أدخل اسمك"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#08080A] border border-white/15 px-4 py-3 text-base sm:text-xs text-white placeholder-[#555260] focus:outline-none focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/20 transition-colors duration-300"
              />
            </div>
            <div>
              <label className="text-xs text-[#C5BFB5] block mb-2 font-medium">رقم الهاتف</label>
              <input
                suppressHydrationWarning
                type="tel"
                required
                placeholder="07XXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#08080A] border border-white/15 px-4 py-3 text-base sm:text-xs text-white placeholder-[#555260] focus:outline-none focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/20 transition-colors duration-300 font-mono"
                dir="ltr"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-shine w-full py-4 bg-[#C9A96E] hover:bg-[#DBC18D] disabled:opacity-70 disabled:cursor-wait text-black font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(201,169,110,0.18)] flex items-center justify-center gap-2 cursor-pointer mt-4 active:scale-[0.98]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>جاري التجهيز...</span>
              </>
            ) : (
              <>
                <span>إرسال طلب الحجز ({selectedService.price} دينار)</span>
                <ArrowLeft className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </section>

      <footer className="py-12 border-t border-white/5 bg-[#050507]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#7B766D]">
          <div className="flex items-center gap-3">
            <Image 
              src="/wash33-mark.png" 
              alt="WASH 33" 
              width={26} 
              height={26} 
              className="object-contain" 
            />
            <span className="font-serif tracking-widest text-white uppercase text-sm font-bold">
              WASH 33
            </span>
            <span className="text-[10px] text-[#555260]">AMMAN, JORDAN</span>
          </div>

          <div className="flex items-center gap-6 font-mono" dir="ltr">
            <a href="tel:0788722256" className="hover:text-white transition-colors">0788722256</a>
            <span className="text-[#33323B]">•</span>
            <a href="tel:0795905096" className="hover:text-white transition-colors">0795905096</a>
          </div>

          <div className="text-[11px]">
            © {new Date().getFullYear()} WASH 33. جميع الحقوق محفوظة.
          </div>
        </div>
      </footer>

      {/* Mobile-only persistent booking summary — the main usability fix: the user never
          has to scroll back up to see the selected service or find the CTA. */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-[#09090B]/95 backdrop-blur-md border-t border-white/10 px-4 py-3 flex items-center justify-between gap-3">
        <div className="text-right leading-tight min-w-0">
          <div className="text-[10px] text-[#8C867B] font-mono truncate max-w-[150px]">
            {selectedService.title}
          </div>
          <div className="font-serif text-lg font-bold text-[#E8D7B8]">
            {selectedService.price} <span className="text-[10px] text-[#8C867B] font-sans">د.أ</span>
          </div>
        </div>
        <a
          href="#booking"
          className="shrink-0 px-5 py-3 bg-[#C9A96E] text-black text-xs font-bold tracking-wider uppercase transition-all duration-300 active:scale-[0.97]"
        >
          احجز الآن
        </a>
      </div>

      <style jsx global>{`
        @keyframes heroRise {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .hero-rise {
          animation: heroRise 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes selectedPulse {
          0%, 100% {
            box-shadow: 0 0 20px -8px rgba(201, 169, 110, 0.25);
          }
          50% {
            box-shadow: 0 0 30px -6px rgba(201, 169, 110, 0.5);
          }
        }
        .selected-glow {
          animation: selectedPulse 2.6s ease-in-out infinite;
        }

        .btn-shine {
          position: relative;
          overflow: hidden;
        }
        .btn-shine::after {
          content: "";
          position: absolute;
          top: 0;
          left: -75%;
          width: 45%;
          height: 100%;
          background: linear-gradient(115deg, transparent, rgba(255, 255, 255, 0.35), transparent);
          transform: skewX(-20deg);
          transition: left 0.7s ease;
        }
        .btn-shine:hover::after {
          left: 130%;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-rise {
            animation: none;
            opacity: 1;
            transform: none;
          }
          .selected-glow {
            animation: none;
          }
          .btn-shine::after {
            transition: none;
            display: none;
          }
        }
      `}</style>
    </div>
  );
}