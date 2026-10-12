"use client";
import { useEffect, useState } from "react";
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
  const navigation = [["system", "#system"], ["demo", "#experience"], ["setup", "#setup"]] as const;
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 901px)");
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);
  return <DirectionProvider direction={direction}>
    <header className={s.header}>
      <div className={`${s.container} ${s.headerInner}`}>
        <BookingBrand label={t("navigation.estanza_home")} />
        <nav className={s.desktopNav} aria-label={t("autoSpa.main_navigation")}>
          {navigation.map(([key, href]) => <a href={href} key={key}>{t(`bookingSite.${key}`)}</a>)}
        </nav>
        <div className={s.headerActions}>
          <LanguageSwitcher />
          <a className={`${s.button} ${s.outline} ${s.headerContact}`} href={contact} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} aria-hidden="true" />{t("bookingSite.whatsapp")}</a>
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
                  {navigation.map(([key, href]) => <a href={href} onClick={() => setOpen(false)} key={key}>{t(`bookingSite.${key}`)}</a>)}
                  <a href={contact} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>{t("bookingSite.whatsapp")}</a>
                </nav>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  </DirectionProvider>;
}
