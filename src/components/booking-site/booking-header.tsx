"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog } from "@base-ui/react/dialog";
import { DirectionProvider } from "@base-ui/react/direction-provider";
import { Menu, MessageCircle, X } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { buildWhatsAppUrl } from "@/components/lib/site";
import { useI18n } from "@/i18n/LocaleProvider";
import BookingBrand from "./booking-brand";
import s from "./booking-site.module.css";

export default function BookingHeader() {
  const { t, direction } = useI18n();
  const [open, setOpen] = useState(false);
  const contact = buildWhatsAppUrl(t("bookingSite.contact_message"));
  const pathname = usePathname();
  const home = pathname === "/" ? "" : "/";
  const navigation = [
    ["business.services", `${home}#services`],
    ["business.voice_nav", "/ai-voice-agents"],
    ["business.booking_nav", `${home}#booking-pages`],
    ["bookingSite.setup", `${home}#setup`],
  ] as const;
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1201px)");
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);
  return <DirectionProvider direction={direction}>
    <header className={s.header}>
      <div className={`${s.container} ${s.headerInner}`}>
        <BookingBrand label={t("navigation.estanza_home")} />
        <nav className={s.desktopNav} aria-label={t("autoSpa.main_navigation")}>
          {navigation.map(([key, href]) => <Link href={href} key={key} aria-current={href === pathname ? "page" : undefined}>{t(key)}</Link>)}
        </nav>
        <div className={s.headerActions}>
          <LanguageSwitcher />
          <a className={`${s.button} ${s.outline} ${s.headerContact}`} href={contact} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} aria-hidden="true" />{t("business.project")}</a>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger className={s.mobileMenu} aria-label={t("autoSpa.open_menu")}><Menu size={24} aria-hidden="true" /></Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Backdrop className={s.menuBackdrop} />
              <Dialog.Popup className={`${s.portalTheme} ${s.menuPopup}`} dir={direction}>
                <div className={s.menuHeading}>
                  <Dialog.Title>{t("speedCar.mobile_navigation")}</Dialog.Title>
                  <Dialog.Close className={s.iconButton} aria-label={t("bookingSite.close_menu")}><X size={22} aria-hidden="true" /></Dialog.Close>
                </div>
                <nav aria-label={t("autoSpa.main_navigation")}>
                  {navigation.map(([key, href]) => <Link href={href} onClick={() => setOpen(false)} key={key} aria-current={href === pathname ? "page" : undefined}>{t(key)}</Link>)}
                  <a href={contact} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>{t("business.project")}</a>
                </nav>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  </DirectionProvider>;
}
