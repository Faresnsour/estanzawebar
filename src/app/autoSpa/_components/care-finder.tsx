"use client";
import { useI18n } from "@/i18n/LocaleProvider";
import { goals } from "../_data/packages";
import { BookButton } from "./booking/booking-sheet";
import s from "../auto-spa.module.css";
export function CareFinder() {
    const { t: tr } = useI18n();
    return (<section id="care" className={s.section} aria-labelledby="care-title">
      <div className={s.sectionHeading}>
        <div>
          <p className={s.eyebrow} dir="ltr">01 / FIND YOUR CARE</p>
          <h2 id="care-title" className={s.sectionTitle}>{tr("autoSpa.how_should_your_car")}<br />{tr("autoSpa.feel_when_it_s_ready")}</h2>
        </div>

        <p className={s.sectionDescription}>{tr("autoSpa.start_with_what_matters_to_you_we")}</p>
      </div>

      <div className={s.goalList}>
        {goals.map((goal, index) => (<BookButton key={goal.id} goal={goal.id} className={s.goalRow}>
            <span className={s.rowNumber}>
              {tr(String(index + 1).padStart(2, "0"))}
            </span>

            <span className={s.goalCopy}>
              <strong>{tr(goal.title)}</strong>
              <span>{tr(goal.description)}</span>
            </span>

            <span className={s.goalEnglish} dir="ltr">
              {tr(goal.english)}
            </span>

            <span className={s.rowArrow} aria-hidden="true">↗</span>
          </BookButton>))}
      </div>

      <p className={s.smallNote}>{tr("autoSpa.not_sure_start_with_your_vehicle_type")}</p>
    </section>);
}
