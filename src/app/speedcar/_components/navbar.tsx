import { speedCar } from "../_data/services";
import { BookButton } from "./booking/booking-flow";
import { ArrowIcon } from "./icons";
import s from "../speedcar.module.css";

export function Brand({ large = false }: { large?: boolean }) {
  return (
    <a
      href="#home"
      className={`${s.brand} ${large ? s.largeBrand : ""}`}
      aria-label="Speed Car Jo الرئيسية"
    >
      <span className={s.logoCrop}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={speedCar.logo} alt="" width="1140" height="540" />
      </span>
      <span dir="ltr">
        <strong>SPEED CAR</strong>
        <small>JO / WINDOW FILM STUDIO</small>
      </span>
    </a>
  );
}

export function Navbar() {
  return (
    <>
      <a className={s.skipLink} href="#speedcar-main">
        انتقل إلى المحتوى
      </a>
      <header className={s.navbar}>
        <Brand />
        <nav className={s.desktopNav} aria-label="القائمة الرئيسية">
          <a href="#tints">خيارات التظليل</a>
          <a href="#compare">قارن واختر</a>
          <a href="#location">زيارة المركز</a>
        </nav>
        <div className={s.navActions}>
          <BookButton className={s.navBook}>
            طلب موعد <ArrowIcon />
          </BookButton>
          <details className={s.mobileMenu}>
            <summary aria-label="القائمة">
              <span />
              <span />
            </summary>
            <nav aria-label="قائمة الهاتف">
              <a href="#tints">خيارات التظليل</a>
              <a href="#compare">قارن واختر</a>
              <a href="#location">زيارة المركز</a>
              <a href={`tel:${speedCar.phone}`}>اتصل بالمركز</a>
            </nav>
          </details>
        </div>
      </header>
    </>
  );
}
