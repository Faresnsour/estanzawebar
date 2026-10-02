"use client";
import { useI18n } from "@/i18n/LocaleProvider";
import { speedCar } from "../_data/services";
import { BookButton } from "./booking/booking-flow";
import { ArrowIcon, PinIcon } from "./icons";
import s from "../speedcar.module.css";
export function Location() {
    const { t: tr } = useI18n();
    return (<section id="location" className={`${s.section} ${s.locationSection}`} aria-labelledby="location-title">
      <div className={s.locationCopy}>
        <p className={s.eyebrow} dir="ltr">
          03 / YOUR NEXT STOP
        </p>
        <h2 id="location-title">{tr("speedCar.visit_the_studio")}<br />
          <span>{tr("speedCar.drive_away_more_comfortable")}</span>
        </h2>
        <address>
          <strong>{tr(speedCar.address)}</strong>
          <span>{tr(speedCar.directions)}</span>
        </address>
        <div className={s.hours}>
          <span>{tr("speedCar.opening_hours_533")}</span>
          <strong>{tr(speedCar.hours)}</strong>
        </div>
        <div className={s.locationActions}>
          <BookButton className={s.primaryButton}>{tr("speedCar.prepare_your_appointment_request")}<ArrowIcon />
          </BookButton>
          <a href={`tel:${speedCar.phone}`} className={s.textLink}>
            <span dir="ltr">{tr(speedCar.phone)}</span>{tr("speedCar.call_directly")}</a>
        </div>
      </div>
      <a className={s.locationPanel} href={speedCar.mapsUrl} target="_blank" rel="noopener noreferrer">
        <div className={s.locationLines} aria-hidden="true"/>
        <span className={s.mapCorner} dir="ltr">
          AMMAN / YASMEEN
        </span>
        <div className={s.locationPin}>
          <PinIcon />
          <strong dir="ltr">SPEED CAR JO</strong>
          <span>{tr("speedCar.near_al_irsal_bridge")}</span>
        </div>
        <span className={s.mapLink}>
          {tr(speedCar.mapsLabel)}
          <ArrowIcon />
        </span>
      </a>
    </section>);
}
