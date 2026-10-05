"use client";
import s from "./estanza.module.css";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { source } from "@/i18n/messages";
import { useI18n } from "@/i18n/LocaleProvider";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { MessageCircle, ChevronLeft } from "lucide-react";
import EstanzaLogo from "./EstanzaLogo";
import { localizedWhatsAppUrl } from "./lib/site";
const links = [
    { label: source("howItWorks.how_it_works"), href: "/#how-it-works" },
    { label: source("clean.service_nav"), href: "/cleaning" },
    { label: source("navigation.pricing"), href: "/#pricing" },
    { label: source("navigation.faq"), href: "/#faq" },
];
function containMenuFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab")
        return;
    const controls = event.currentTarget.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (!first || !last)
        return;
    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
    }
    else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
    }
}
function Brand({ onNavigate, cleaningFocus = false }: { onNavigate?: () => void; cleaningFocus?: boolean }) {
    const { t: tr } = useI18n();
    return (<Link href="/" onClick={onNavigate} className={s.brand} aria-label={tr("navigation.estanza_home")}>
      <EstanzaLogo className={s.brandLogo}/>
      <span className="flex flex-col gap-1">
        <span className={s.brandName} dir="ltr" translate="no">Estanza</span>
        <span className={s.brandTag}>{tr(cleaningFocus ? "clean.home_brand_tagline" : "clean.brand_tagline")}</span>
      </span>
    </Link>);
}
function MenuIcon({ open }: {
    open: boolean;
}) {
    return <span className="menu-icon" data-open={open} aria-hidden="true"><span /><span /><span /></span>;
}
export default function Navbar({ demoMode = false, cleaningFocus = false }: { demoMode?: boolean; cleaningFocus?: boolean }) {
    const { t: tr, direction, locale } = useI18n();
    const [isOpen, setIsOpen] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const previousOverflow = useRef<string | null>(null);
    const unlockBody = useCallback(() => {
        if (previousOverflow.current === null)
            return;
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
        if (!dialog || !panel)
            return;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const animations: Animation[] = [];
        if (isOpen) {
            if (previousOverflow.current === null)
                previousOverflow.current = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            if (!dialog.open)
                dialog.showModal();
            if (!reduced) {
                animations.push(dialog.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 180, easing: "ease-out" }));
                animations.push(panel.animate([{ transform: "translateY(-10px)" }, { transform: "translateY(0)" }], { duration: 180, easing: "ease-out" }));
            }
        }
        else if (dialog.open) {
            if (reduced) {
                dialog.close();
            }
            else {
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
            if (!desktop.matches)
                return;
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
    return (<>
      <a href="#main-content" className="skip-to-content">{tr("autoSpa.skip_to_content")}</a>
      <header data-scrolled={hasScrolled} className={`${s.system} ${s.navbar}`} dir={direction}>
        <div className={`${s.container} ${s.navInner}`}>
          <div className="justify-self-start"><Brand cleaningFocus={cleaningFocus} /></div>
          <nav aria-label={tr("autoSpa.main_navigation")} className={s.navLinks}>
            {links.map((link) => <Link key={link.href} href={link.href} className="inline-flex min-h-11 items-center rounded-md px-1.5 transition-colors duration-200 hover:text-[#006f60]">{tr(link.label)}</Link>)}
          </nav>
          <div className={s.navActions}><LanguageSwitcher />
          {!demoMode ? <a href={localizedWhatsAppUrl(locale)} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-source="navbar" className={`${s.button} ${s.navContact}`}>
            <MessageCircle className="h-4 w-4" aria-hidden="true"/>{tr("hero.chat_on_whatsapp")}</a> : null}
          <button type="button" onClick={() => setIsOpen((open) => !open)} aria-label={tr(isOpen ? tr("navigation.close_menu") : tr("autoSpa.open_menu"))} aria-expanded={isOpen} aria-controls="mobile-navigation" className={s.menuToggle}>
            <MenuIcon open={isOpen}/>
          </button></div>
        </div>
      </header>
      <dialog ref={dialogRef} id="mobile-navigation" aria-label={tr("navigation.navigation_menu")} dir={direction} onKeyDown={containMenuFocus} onCancel={(event) => { event.preventDefault(); setIsOpen(false); }} onClose={() => { setIsOpen(false); unlockBody(); }} onClick={(event) => {
            if (event.target === event.currentTarget)
                setIsOpen(false);
        }} className={`${s.system} ${s.mobileDialog}`}>
        <div ref={panelRef} className={s.mobilePanel}>
          <div className={s.mobileTop}>
            <Brand cleaningFocus={cleaningFocus} onNavigate={() => setIsOpen(false)} />
            <div className="flex items-center gap-2"><LanguageSwitcher /><button type="button" autoFocus onClick={() => setIsOpen(false)} aria-label={tr("navigation.close_menu")} className={s.menuToggle}>
              <MenuIcon open={isOpen}/>
            </button></div>
          </div>
          <nav aria-label={tr("speedCar.mobile_navigation")} className={s.mobileLinks}>
            {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="flex min-h-14 items-center justify-between gap-4 rounded-sm border-b border-slate-200 py-3.5 text-base font-semibold transition-colors duration-200 hover:text-[#006f60]">{tr(link.label)}<ChevronLeft className="directional-icon h-4 w-4 text-[#008774]" aria-hidden="true"/></Link>)}
            {!demoMode ? <a href={localizedWhatsAppUrl(locale)} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-source="mobile-menu" onClick={() => setIsOpen(false)} className={s.button}>
              <MessageCircle className="h-4 w-4" aria-hidden="true"/>{tr("hero.chat_on_whatsapp")}</a> : null}
          </nav>
        </div>
      </dialog>
    </>);
}
