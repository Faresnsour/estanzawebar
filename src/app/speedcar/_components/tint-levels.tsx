"use client";
import { useI18n } from "@/i18n/LocaleProvider";
import { useState } from "react";
import { getTint, tintServices, type TintId } from "../_data/services";
import { BookButton } from "./booking/booking-flow";
import { ArrowIcon, ShieldIcon, SunIcon } from "./icons";
import s from "../speedcar.module.css";
export function TintLevels() {
    const { t: tr } = useI18n();
    const [selected, setSelected] = useState<TintId>("nano");
    const tint = getTint(selected);
    return (<section id="tints" className={s.section} aria-labelledby="tints-title">
      <div className={s.sectionHeading}>
        <div>
          <p className={s.eyebrow} dir="ltr">
            01 / FIND YOUR COMFORT
          </p>
          <h2 id="tints-title">{tr("speedCar.four_options")}<br />
            <span>{tr("speedCar.find_your_comfort")}</span>
          </h2>
        </div>
        <p>{tr("speedCar.compare_heat_rejection_warranty_and_price")}<br />{tr("speedCar.everything_you_need_before_requesting_an_appointment")}</p>
      </div>
      <div className={s.tintLayout}>
        <div className={s.tintList} aria-label={tr("speedCar.choose_your_film_548")}>
          {tintServices.map((item) => (<button key={item.id} type="button" aria-pressed={selected === item.id} className={`${s.tintRow} ${selected === item.id ? s.tintRowActive : ""}`} onClick={() => setSelected(item.id)}>
              <span className={s.index}>{tr(item.number)}</span>
              <span className={s.tintName}>
                <strong dir="ltr">{tr(item.english)}</strong>
                <span>{tr(item.name)}</span>
              </span>
              <span className={s.tintRowPrice}>
                <strong>{tr(item.prices["four-windows"])}</strong>
                <small>{tr("speedCar.jod_4_windows")}</small>
              </span>
              <span className={s.rowArrow} aria-hidden="true">
                ↖
              </span>
            </button>))}
        </div>
        <div className={s.tintDetail} aria-live="polite" aria-atomic="true">
          <div className={s.detailTop}>
            <span className={s.eyebrow} dir="ltr">
              THERMAL PERFORMANCE
            </span>
            <SunIcon />
          </div>
          <div key={tint.id} className={s.metric}>
            <strong>
              {tr(tint.heat)}
              <span>%</span>
            </strong>
            <p>
              {tr(tint.id === "original-3m"
            ? tr("speedCar.stated_heat_rejection_up_to") : tr("speedCar.stated_heat_rejection_550"))}
            </p>
          </div>
          <div className={s.performanceTrack}>
            <span style={{ width: `${tint.heat}%` }}/>
          </div>
          <p className={s.tintDescription}>{tr(tint.description)}</p>
          <div className={s.detailFeatures}>
            <span>
              <ShieldIcon />{tr("speedCar.warranty")}{" "}{tr(tint.warranty)}
            </span>
            <span>
              {tr(tint.uv !== null
            ? tr("speedCar.stated_uv_protection_value", [tint.uv]) : tr("speedCar.5_tint_level_as_advertised"))}
            </span>
          </div>
          <BookButton tint={tint.id} className={s.primaryButton}>{tr("speedCar.select")}{" "}{tr(tint.shortName)}
            <ArrowIcon />
          </BookButton>
          <p className={s.finePrint}>{tr("speedCar.heat_rejection_figures_and_warranties_are_provided")}</p>
        </div>
      </div>
    </section>);
}
