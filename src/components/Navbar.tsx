"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { Menu, MessageCircle, ArrowUpLeft, X } from "lucide-react";
import EstanzaLogo from "./EstanzaLogo";
import { WHATSAPP_URL } from "./lib/site";

const links = [
  { label: "كيف يعمل", href: "/#how-it-works" },
  { label: "أعمالنا", href: "/showcase" },
  { label: "الأسعار", href: "/#pricing" },
  { label: "الأسئلة الشائعة", href: "/#faq" },
];

function containMenuFocus(event: KeyboardEvent<HTMLDialogElement>) {
  if (event.key !== "Tab") return;
  const controls = event.currentTarget.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
  const first = controls[0];
  const last = controls[controls.length - 1];
  if (!first || !last) return;
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function Brand() {
  return (
    <Link href="/" className="inline-flex min-h-11 shrink-0 items-center gap-3 rounded-lg" aria-label="Estanza — الرئيسية">
      <EstanzaLogo className="h-10 w-10 lg:h-11 lg:w-11" />
      <span className="flex flex-col gap-1">
        <span className="text-[22px] font-bold leading-none text-[#05221C] lg:text-2xl lg:leading-none" dir="ltr">Estanza</span>
        <span className="whitespace-nowrap text-[11px] font-medium leading-4 text-[#006f60]">حجز أسهل لمركزك</span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const update = () => setHasScrolled(window.scrollY > 8);
    const frame = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => { if (desktop.matches) setIsOpen(false); };
    desktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener("change", onResize);
    };
  }, [isOpen]);

  return (
    <>
      <a href="#main-content" className="skip-to-content">انتقل إلى المحتوى</a>
      <header data-scrolled={hasScrolled} className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-200 ${hasScrolled ? "border-slate-200 bg-white shadow-[0_2px_8px_rgba(5,34,28,0.04)]" : "border-slate-200/70 bg-white/95"}`} dir="rtl">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-8 lg:px-8">
          <div className="justify-self-start">
            <Brand />
          </div>
          <nav aria-label="القائمة الرئيسية" className="hidden items-center gap-5 whitespace-nowrap text-sm font-semibold text-slate-600 lg:flex xl:gap-7">
            {links.map((link) => <Link key={link.href} href={link.href} className="inline-flex min-h-11 items-center rounded-md px-1.5 transition-colors duration-200 hover:text-[#006f60]">{link.label}</Link>)}
          </nav>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-source="navbar" className="hidden min-h-11 items-center gap-2 justify-self-end whitespace-nowrap rounded-full border border-[#008774]/25 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-[#006f60] transition-colors duration-200 hover:bg-[#006f60] hover:text-white lg:inline-flex">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />اسألنا على واتساب
          </a>
          <button type="button" onClick={() => setIsOpen(true)} aria-label="فتح القائمة" aria-expanded={isOpen} aria-controls="mobile-navigation" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 text-[#05221C] transition-colors duration-200 hover:bg-emerald-50 lg:hidden">
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </header>
      <dialog ref={dialogRef} id="mobile-navigation" aria-label="قائمة التنقل" dir="rtl" onKeyDown={containMenuFocus} onCancel={() => setIsOpen(false)} onClose={() => setIsOpen(false)} className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto border-0 bg-[#F8FAF9] p-0 text-[#05221C]">
        <div className="mx-auto flex min-h-full max-w-6xl flex-col px-4 sm:px-6">
          <div className="flex h-20 shrink-0 items-center justify-between border-b border-slate-200" onClick={(event) => { if ((event.target as HTMLElement).closest("a")) setIsOpen(false); }}>
            <Brand />
            <button type="button" autoFocus onClick={() => setIsOpen(false)} aria-label="إغلاق القائمة" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 transition-colors duration-200 hover:bg-emerald-50">
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="قائمة الهاتف" className="my-auto w-full max-w-xl self-center py-6">
            {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="flex min-h-14 items-center rounded-sm border-b border-slate-200 py-3.5 text-lg font-semibold transition-colors duration-200 hover:text-[#006f60]">{link.label}</Link>)}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-source="mobile-menu" onClick={() => setIsOpen(false)} className="mt-6 flex min-h-12 items-center justify-between rounded-xl bg-[#006f60] px-5 py-4 font-bold text-white transition-colors duration-200 hover:bg-[#05221C]">
              اسألنا على واتساب<ArrowUpLeft className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
          <p className="border-t border-slate-200 py-5 text-sm text-slate-600">Estanza · عمّان، الأردن</p>
        </div>
      </dialog>
    </>
  );
}
