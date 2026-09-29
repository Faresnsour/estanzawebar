"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle, ChevronLeft, ArrowUpLeft } from "lucide-react";
import EstanzaLogo from "./EstanzaLogo";

const WHATSAPP_URL =
  "https://wa.me/962790899175?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20Estanza%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%AA%D8%AC%D9%87%D9%8A%D8%B2%20%D9%86%D8%B8%D8%A7%D9%85%20%D8%A7%D9%84%D8%AD%D8%AC%D9%88%D8%B2%D8%A7%D8%AA";

const MENU_LINKS = [
  { label: "المميزات والخصائص", id: "features", href: "/#features" },
  { label: "آلية العمل السريعة", id: "how-it-works", href: "/#how-it-works" },
  { label: "الأسعار والتجهيز", id: "pricing", href: "/#pricing" },
  { label: "أعمالنا", href: "/showcase" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // دالة الضغط على الرابط بدون أي تعليق
  const handleLinkClick = (id?: string) => {
    setIsOpen(false);
    
    if (id) {
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 50);
    }
  };

  return (
    <>
      <header
        dir="rtl"
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-slate-200/90 py-3.5 shadow-sm"
            : "bg-white/90 backdrop-blur-md border-b border-slate-100 py-4"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
            <EstanzaLogo className="h-8 w-8 text-[#008774]" />
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-[#05221C] leading-none">
                Estanza
              </span>
              <span className="text-[10px] font-semibold text-[#008774] mt-1">
                نظام الحجز الذكي
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            {MENU_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => handleLinkClick(link.id)}
                className={`transition-colors ${
                  link.href === "/showcase"
                    ? "text-[#008774] font-bold hover:text-[#007060]"
                    : "hover:text-[#008774]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[#008774]/30 bg-[#008774]/10 text-[#008774] px-4 py-2 text-xs font-bold hover:bg-[#008774] hover:text-white transition-all shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>طلب النظام</span>
            </a>

            <button
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
              className="w-10 h-10 rounded-full flex flex-col items-center justify-center gap-1.5 border border-slate-200 bg-slate-50 hover:bg-[#008774]/10 text-slate-800 transition-all cursor-pointer"
            >
              <span
                className={`h-[2px] rounded-full transition-all duration-300 ${
                  isOpen
                    ? "w-4 rotate-45 translate-y-[8px] bg-[#008774]"
                    : "w-4 bg-slate-800"
                }`}
              />
              <span
                className={`h-[2px] rounded-full transition-all duration-200 ${
                  isOpen ? "w-0 opacity-0" : "w-3 bg-slate-800"
                }`}
              />
              <span
                className={`h-[2px] rounded-full transition-all duration-300 ${
                  isOpen
                    ? "w-4 -rotate-45 -translate-y-[8px] bg-[#008774]"
                    : "w-4 bg-slate-800"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* قائمة الموبايل: تفتح وتغلق بخفة بدون أن تجمّد الصفحة */}
      <div
        dir="rtl"
        className={`fixed inset-0 z-40 bg-[#F8FAF9] pt-24 pb-8 px-6 flex flex-col justify-between transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        <div className="max-w-xl mx-auto w-full my-auto space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-200/80">
            <EstanzaLogo className="h-8 w-8 text-[#008774]" />
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-[#05221C] leading-none">
                Estanza
              </span>
              <span className="text-[10px] font-semibold text-[#008774] mt-1">
                أنظمة الحجز المتطورة
              </span>
            </div>
          </div>

          <nav>
            <ul className="divide-y divide-slate-200/70">
              {MENU_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => handleLinkClick(item.id)}
                    className={`flex items-center justify-between py-4 text-base sm:text-lg font-bold transition-colors cursor-pointer ${
                      item.href === "/showcase"
                        ? "text-[#008774] hover:text-[#007060]"
                        : "text-[#05221C] hover:text-[#008774]"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronLeft className="w-4 h-4 text-slate-400" />
                  </Link>
                </li>
              ))}

              <li className="pt-2">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between py-3.5 text-base sm:text-lg font-bold text-[#008774] hover:text-[#007060]"
                >
                  <span>احجز نظامك خلال 24 ساعة</span>
                  <ArrowUpLeft className="w-5 h-5 text-[#008774]" />
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="max-w-xl mx-auto w-full pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500 font-mono">
          <span>© {new Date().getFullYear()} Estanza</span>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="text-[#008774] font-bold hover:underline"
          >
            تواصل عبر واتساب
          </a>
        </div>
      </div>
    </>
  );
}
