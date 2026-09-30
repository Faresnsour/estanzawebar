import { speedCar } from "../_data/services";
import { BookButton } from "./booking/booking-flow";
import { ArrowIcon, ShieldIcon, SunIcon } from "./icons";
import s from "../speedcar.module.css";

export function Hero() {
  return (
    <section id="home" className={s.hero} aria-labelledby="hero-title">
      <div className={s.heroImageWrap}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={speedCar.heroImage}
          alt="تصوير توضيحي لسيارة بزجاج مظلل"
          fetchPriority="high"
          className={s.heroImage}
        />
      </div>
      <div className={s.heroGrid} aria-hidden="true" />
      <div className={s.heroContent}>
        <p className={s.eyebrow}>
          <span className={s.tinyLine} />
          <span dir="ltr">PRECISION IN EVERY LAYER.</span>
        </p>
        <h1 id="hero-title">
          راحة تُرى.
          <br />
          <span>حرارة تُحجب.</span>
        </h1>
        <p className={s.heroDescription}>
          العزل المناسب يبدأ باختيار واضح.
          <br />
          قارن التظليل، حدّد الزجاج، واترك الباقي للفريق.
        </p>
        <div className={s.heroActions}>
          <BookButton className={s.primaryButton}>
            صمّم عناية زجاجك <ArrowIcon />
          </BookButton>
          <a className={s.textLink} href="#tints">
            اكتشف خيارات التظليل <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className={s.heroMetadata}>
          <span dir="ltr">AMMAN / YASMEEN</span>
          <span>المركز يستقبل طلبات المواعيد عبر واتساب</span>
        </div>
      </div>
      <div className={s.heroCaption} dir="ltr">
        <span>WINDOW FILM</span>
        <strong>
          THE ART OF
          <br />A COOLER DRIVE.
        </strong>
        <small>ILLUSTRATIVE VISUAL / SPEED CAR JO</small>
      </div>
      <div className={s.heroBottom}>
        <div>
          <SunIcon />
          <span>4 خيارات للعزل الحراري</span>
        </div>
        <div>
          <ShieldIcon />
          <span>كفالات من سنتين إلى 10 سنوات*</span>
        </div>
        <div>
          <span className={s.locationDot} />
          <span>الياسمين · قرب جسر الإرسال</span>
        </div>
      </div>
    </section>
  );
}
