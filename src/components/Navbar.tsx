"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { MessageCircle, ChevronLeft } from "lucide-react";
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
      <EstanzaLogo className="h-11 w-11" />
      <span className="flex flex-col gap-1">
        <span className="text-2xl font-bold leading-none text-[#05221C]" dir="ltr">Estanza</span>
        <span className="whitespace-nowrap text-[11px] font-medium leading-4 text-[#006f60]">حجز أسهل لمركزك</span>
      </span>
    </Link>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return <span className="menu-icon" data-open={open} aria-hidden="true"><span /><span /><span /></span>;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const previousOverflow = useRef<string | null>(null);

  const unlockBody = useCallback(() => {
    if (previousOverflow.current === null) return;
    document.body.style.overflow = previousOverflow.current;
    previousOverflow.current = null;
  }, []);

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
    const panel = panelRef.current;
    if (!dialog || !panel) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const animations: Animation[] = [];
    if (isOpen) {
      if (previousOverflow.current === null) previousOverflow.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      if (!dialog.open) dialog.showModal();
      if (!reduced) {
        animations.push(dialog.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 180, easing: "ease-out" }));
        animations.push(panel.animate([{ transform: "translateY(-10px)" }, { transform: "translateY(0)" }], { duration: 180, easing: "ease-out" }));
      }
    } else if (dialog.open) {
      if (reduced) {
        dialog.close();
      } else {
        const fade = dialog.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 150, easing: "ease-in" });
        animations.push(fade, panel.animate([{ transform: "translateY(0)" }, { transform: "translateY(-8px)" }], { duration: 150, easing: "ease-in" }));
        fade.onfinish = () => dialog.close();
      }
    }
    return () => animations.forEach((animation) => animation.cancel());
  }, [isOpen]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => {
      if (!desktop.matches) return;
      dialogRef.current?.close();
      setIsOpen(false);
      unlockBody();
    };
    desktop.addEventListener("change", onResize);
    return () => {
      desktop.removeEventListener("change", onResize);
      unlockBody();
    };
  }, [unlockBody]);

  return (
    <>
      <a href="#main-content" className="skip-to-content">انتقل إلى المحتوى</a>
      <header data-scrolled={hasScrolled} className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-200 ${hasScrolled ? "border-slate-200 bg-white shadow-[0_2px_8px_rgba(5,34,28,0.04)]" : "border-slate-200/50 bg-[#F8FAF9]/95"}`} dir="rtl">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-8 lg:px-8">
          <div className="justify-self-start"><Brand /></div>
          <nav aria-label="القائمة الرئيسية" className="hidden items-center gap-5 whitespace-nowrap text-sm font-semibold text-slate-600 lg:flex xl:gap-7">
            {links.map((link) => <Link key={link.href} href={link.href} className="inline-flex min-h-11 items-center rounded-md px-1.5 transition-colors duration-200 hover:text-[#006f60]">{link.label}</Link>)}
          </nav>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-source="navbar" className="hidden min-h-11 items-center gap-2 justify-self-end whitespace-nowrap rounded-full border border-[#008774]/25 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-[#006f60] transition-colors duration-200 hover:bg-[#006f60] hover:text-white lg:inline-flex">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />اسألنا على واتساب
          </a>
          <button type="button" onClick={() => setIsOpen((open) => !open)} aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"} aria-expanded={isOpen} aria-controls="mobile-navigation" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 text-[#05221C] transition-colors duration-200 hover:bg-emerald-50 lg:hidden">
            <MenuIcon open={isOpen} />
          </button>
        </div>
      </header>
      <dialog ref={dialogRef} id="mobile-navigation" aria-label="قائمة التنقل" dir="rtl" onKeyDown={containMenuFocus} onCancel={(event) => { event.preventDefault(); setIsOpen(false); }} onClose={() => { setIsOpen(false); unlockBody(); }} onClick={(event) => { if (event.target === event.currentTarget) setIsOpen(false); }} className="mobile-menu fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto border-0 bg-[#05221C]/20 p-0 text-[#05221C] backdrop-blur-[3px]">
        <div ref={panelRef} className="mx-auto max-w-6xl rounded-b-3xl border-b border-[#008774]/20 bg-[#F8FAF9] px-4 pb-6 shadow-xl sm:px-6">
          <div className="flex h-20 items-center justify-between border-b border-slate-200" onClick={(event) => { if ((event.target as HTMLElement).closest("a")) setIsOpen(false); }}>
            <Brand />
            <button type="button" autoFocus onClick={() => setIsOpen(false)} aria-label="إغلاق القائمة" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 transition-colors duration-200 hover:bg-emerald-50">
              <MenuIcon open={isOpen} />
            </button>
          </div>
          <nav aria-label="قائمة الهاتف" className="pt-3">
            {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="flex min-h-14 items-center justify-between gap-4 rounded-sm border-b border-slate-200 py-3.5 text-base font-semibold transition-colors duration-200 hover:text-[#006f60]">{link.label}<ChevronLeft className="h-4 w-4 text-[#008774]" aria-hidden="true" /></Link>)}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-source="mobile-menu" onClick={() => setIsOpen(false)} className="mt-5 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#006f60] px-5 py-3 font-bold text-white transition-colors duration-200 hover:bg-[#05221C]">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />اسألنا على واتساب
            </a>
          </nav>
        </div>
      </dialog>
    </>
  );
}
