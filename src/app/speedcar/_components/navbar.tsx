"use client";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useI18n } from "@/i18n/LocaleProvider";
import { speedCar } from "../_data/services";
import { BookButton } from "./booking/booking-flow";
import { ArrowIcon } from "./icons";
import s from "../speedcar.module.css";
export function Brand({ large = false }: {
    large?: boolean;
}) {
    const { t: tr } = useI18n();
    return (<a href="#home" className={`${s.brand} ${large ? s.largeBrand : ""}`} aria-label={tr("speedCar.speed_car_jo_home")}>
      <span className={s.logoCrop}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={speedCar.logo} alt="" width="1140" height="540"/>
      </span>
      <span dir="ltr">
        <strong>SPEED CAR</strong>
        <small>JO / WINDOW FILM STUDIO</small>
      </span>
    </a>);
}
export function Navbar() {
    const { t: tr } = useI18n();
    return (<>
      <a className={s.skipLink} href="#speedcar-main">{tr("autoSpa.skip_to_content")}</a>
      <header className={s.navbar}>
        <Brand />
        <nav className={s.desktopNav} aria-label={tr("autoSpa.main_navigation")}>
          <a href="#tints">{tr("speedCar.window_films")}</a>
          <a href="#compare">{tr("speedCar.compare_options")}</a>
          <a href="#location">{tr("speedCar.visit_us")}</a>
        </nav>
        <div className={s.navActions}><LanguageSwitcher />
          <BookButton className={s.navBook}>{tr("autoSpa.request_appointment")}{" "}<ArrowIcon />
          </BookButton>
          <details className={s.mobileMenu}>
            <summary aria-label={tr("speedCar.menu")}>
              <span />
              <span />
            </summary>
            <nav aria-label={tr("speedCar.mobile_navigation")}>
              <a href="#tints">{tr("speedCar.window_films")}</a>
              <a href="#compare">{tr("speedCar.compare_options")}</a>
              <a href="#location">{tr("speedCar.visit_us")}</a>
              <a href={`tel:${speedCar.phone}`}>{tr("speedCar.call_the_centre")}</a>
            </nav>
          </details>
        </div>
      </header>
    </>);
}
