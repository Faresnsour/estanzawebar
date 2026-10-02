"use client";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useI18n } from "@/i18n/LocaleProvider";
import Image from "next/image";
import { brand } from "../_data/packages";
import { BookButton } from "./booking/booking-sheet";
import s from "../auto-spa.module.css";
export function Navbar() {
    const { t: tr } = useI18n();
    return (<>
      <a className={s.skipLink} href="#main-content">{tr("autoSpa.skip_to_content")}</a>

      <header className={s.navbar}>
        <a href="#home" className={s.brand} aria-label={tr("autoSpa.dopamine_home")}>
          {tr(brand.logoImage && (<Image src={brand.logoImage} alt="" className={s.brandImage} sizes="42px" width={42} height={42}/>))}

          <span dir="ltr">
            <strong>DOPAMINE</strong>
            <small>AUTO SPA</small>
          </span>
        </a>

        <nav className={s.desktopNav} aria-label={tr("autoSpa.main_navigation")}>
          <a href="#care">{tr("autoSpa.choose_your_care")}</a>
          <a href="#results">{tr("autoSpa.our_work")}</a>
          <a href="#services">{tr("autoSpa.services")}</a>
          <a href="#location">{tr("autoSpa.location_184")}</a>
        </nav>

        <div className={s.navActions}><LanguageSwitcher />
          <BookButton className={s.navBook}>{tr("autoSpa.request_appointment")}{" "}<span aria-hidden="true">↗</span>
          </BookButton>

          <details className={s.mobileMenu}>
            <summary aria-label={tr("autoSpa.open_menu")}>
              <span />
              <span />
            </summary>

            <nav aria-label={tr("autoSpa.mobile_navigation")}>
              <a href="#care">{tr("autoSpa.choose_your_care")}</a>
              <a href="#results">{tr("autoSpa.our_work")}</a>
              <a href="#services">{tr("autoSpa.services")}</a>
              <a href="#location">{tr("autoSpa.location_184")}</a>
            </nav>
          </details>
        </div>
      </header>
    </>);
}
