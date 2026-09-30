import { brand } from "../_data/packages";
import { BookButton } from "./booking/booking-sheet";
import s from "../auto-spa.module.css";

export function Navbar() {
  return (
    <>
      <a className={s.skipLink} href="#main-content">
        انتقل إلى المحتوى
      </a>

      <header className={s.navbar}>
        <a href="#home" className={s.brand} aria-label="DOPAMINE الرئيسية">
          {brand.logoImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={brand.logoImage}
              alt=""
              className={s.brandImage}
              width={42}
              height={42}
            />
          )}

          <span dir="ltr">
            <strong>DOPAMINE</strong>
            <small>AUTO SPA</small>
          </span>
        </a>

        <nav className={s.desktopNav} aria-label="القائمة الرئيسية">
          <a href="#care">اختر العناية</a>
          <a href="#results">أعمال المركز</a>
          <a href="#services">الخدمات</a>
          <a href="#location">الموقع</a>
        </nav>

        <div className={s.navActions}>
          <BookButton className={s.navBook}>
            طلب موعد <span aria-hidden="true">↗</span>
          </BookButton>

          <details className={s.mobileMenu}>
            <summary aria-label="فتح القائمة">
              <span />
              <span />
            </summary>

            <nav aria-label="قائمة الموبايل">
              <a href="#care">اختر العناية</a>
              <a href="#results">أعمال المركز</a>
              <a href="#services">الخدمات</a>
              <a href="#location">الموقع</a>
            </nav>
          </details>
        </div>
      </header>
    </>
  );
}