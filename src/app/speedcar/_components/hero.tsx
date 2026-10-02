"use client";
import { useI18n } from "@/i18n/LocaleProvider";
import { speedCar } from "../_data/services";
import { BookButton } from "./booking/booking-flow";
import { ArrowIcon, ShieldIcon, SunIcon } from "./icons";
import s from "../speedcar.module.css";
export function Hero() {
    const { t: tr } = useI18n();
    return (<section id="home" className={s.hero} aria-labelledby="hero-title">
      <div className={s.heroImageWrap}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={speedCar.heroImage} alt={tr("speedCar.illustrative_photo_of_a_car_with_tinted")} fetchPriority="high" className={s.heroImage}/>
      </div>
      <div className={s.heroGrid} aria-hidden="true"/>
      <div className={s.heroContent}>
        <p className={s.eyebrow}>
          <span className={s.tinyLine}/>
          <span dir="ltr">PRECISION IN EVERY LAYER.</span>
        </p>
        <h1 id="hero-title">{tr("speedCar.comfort_you_feel")}<br />
          <span>{tr("speedCar.heat_you_leave_outside")}</span>
        </h1>
        <p className={s.heroDescription}>{tr("speedCar.the_right_film_starts_with_a_clear")}<br />{tr("speedCar.compare_the_options_choose_your_glass_coverage")}</p>
        <div className={s.heroActions}>
          <BookButton className={s.primaryButton}>{tr("speedCar.build_your_tinting_request")}{" "}<ArrowIcon />
          </BookButton>
          <a className={s.textLink} href="#tints">{tr("speedCar.explore_window_films")}{" "}<span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className={s.heroMetadata}>
          <span dir="ltr">AMMAN / YASMEEN</span>
          <span>{tr("speedCar.appointment_requests_via_whatsapp")}</span>
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
          <span>{tr("speedCar.4_heat_protection_options")}</span>
        </div>
        <div>
          <ShieldIcon />
          <span>{tr("speedCar.warranties_from_2_to_10_years")}</span>
        </div>
        <div>
          <span className={s.locationDot}/>
          <span>{tr("speedCar.al_yasmeen_near_al_irsal_bridge")}</span>
        </div>
      </div>
    </section>);
}
