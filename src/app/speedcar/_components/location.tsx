import { speedCar } from "../_data/services";
import { BookButton } from "./booking/booking-flow";
import { ArrowIcon, PinIcon } from "./icons";
import s from "../speedcar.module.css";

export function Location() {
  return (
    <section
      id="location"
      className={`${s.section} ${s.locationSection}`}
      aria-labelledby="location-title"
    >
      <div className={s.locationCopy}>
        <p className={s.eyebrow} dir="ltr">
          03 / YOUR NEXT STOP
        </p>
        <h2 id="location-title">
          مرّ علينا.
          <br />
          <span>وخلّي الفرق يرافقك.</span>
        </h2>
        <address>
          <strong>{speedCar.address}</strong>
          <span>{speedCar.directions}</span>
        </address>
        <div className={s.hours}>
          <span>ساعات الدوام</span>
          <strong>{speedCar.hours}</strong>
        </div>
        <div className={s.locationActions}>
          <BookButton className={s.primaryButton}>
            جهّز طلب موعدك
            <ArrowIcon />
          </BookButton>
          <a href={`tel:${speedCar.phone}`} className={s.textLink}>
            <span dir="ltr">{speedCar.phone}</span>اتصال مباشر
          </a>
        </div>
      </div>
      <a
        className={s.locationPanel}
        href={speedCar.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className={s.locationLines} aria-hidden="true" />
        <span className={s.mapCorner} dir="ltr">
          AMMAN / YASMEEN
        </span>
        <div className={s.locationPin}>
          <PinIcon />
          <strong dir="ltr">SPEED CAR JO</strong>
          <span>قرب جسر الإرسال</span>
        </div>
        <span className={s.mapLink}>
          {speedCar.mapsLabel}
          <ArrowIcon />
        </span>
      </a>
    </section>
  );
}
