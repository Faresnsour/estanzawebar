"use client";
import { useI18n } from "@/i18n/LocaleProvider";
import { coverageOptions, getSubtotal, getTint, speedCar, type BookingDraft, type CoverageId, } from "../../_data/services";
import { CarDiagram } from "./car-diagram";
import { ArrowIcon } from "../icons";
import s from "../../speedcar.module.css";
type Props = {
    draft: BookingDraft;
    onChange: (patch: Partial<BookingDraft>) => void;
    onNext: () => void;
    onBack: () => void;
};
export function CoverageStep({ draft, onChange, onNext, onBack }: Props) {
    const { t: tr } = useI18n();
    const tint = getTint(draft.tint);
    const total = getSubtotal(draft);
    const unavailable = coverageOptions
        .filter((item) => tint.prices[item.id] === null)
        .map((item) => item.id);
    function toggle(id: CoverageId) {
        if (unavailable.includes(id))
            return;
        onChange({
            coverage: draft.coverage.includes(id)
                ? draft.coverage.filter((value) => value !== id)
                : [...draft.coverage, id],
        });
    }
    return (<>
      <div className={s.stepHeading}>
        <p className={s.eyebrow} dir="ltr">
          02 / DEFINE YOUR COVERAGE
        </p>
        <h2 data-step-heading tabIndex={-1}>{tr("speedCar.where_do_you_want_coverage")}</h2>
        <p>{tr("speedCar.choose_one_or_more_areas_front_and")}</p>
      </div>
      <div className={s.coverageLayout}>
        <CarDiagram selected={draft.coverage} unavailable={unavailable} onToggle={toggle}/>
        <div className={s.coverageList}>
          {coverageOptions.map((item) => (<button key={item.id} type="button" disabled={unavailable.includes(item.id)} aria-pressed={draft.coverage.includes(item.id)} className={`${s.coverageOption} ${draft.coverage.includes(item.id) ? s.coverageActive : ""}`} onClick={() => toggle(item.id)}>
              <span>
                <strong>{tr(item.name)}</strong>
                <small>{tr(item.detail)}</small>
              </span>
              <span>
                {tr(tint.prices[item.id] === null ? (<small>{tr("speedCar.price_not_listed")}</small>) : (<strong>
                    {tr(tint.prices[item.id])} <small>{tr("demo.jod")}</small>
                  </strong>))}
              </span>
              <span className={s.checkCircle}>
                {tr(draft.coverage.includes(item.id) ? "✓" : "")}
              </span>
            </button>))}
          {tr(unavailable.length > 0 && (<p className={s.finePrint}>{tr("speedCar.for_ceramic_film_the_centre_confirms_front")}{" "}
              <a href={`tel:${speedCar.phone}`}>{tr(speedCar.phone)}</a>.
            </p>))}
          <div className={s.glassSizeField}>
            <label htmlFor="sc-glass-size">{tr("speedCar.glass_size")}</label>
            <select id="sc-glass-size" value={draft.glassSize} onChange={(event) => onChange({
            glassSize: event.target.value as BookingDraft["glassSize"],
        })}>
              <option value="unknown">{tr("speedCar.not_sure_let_the_centre_measure")}</option>
              <option value="standard">{tr("speedCar.up_to_50_cm_by_my_estimate")}</option>
              <option value="oversize">{tr("speedCar.may_exceed_50_cm")}</option>
            </select>
            <p>{tr(speedCar.surchargeNote)}</p>
          </div>
        </div>
      </div>
      <div className={s.stepFooter}>
        <button type="button" className={s.textButton} onClick={onBack}>{tr("autoSpa.back")}</button>
        <button type="button" className={s.primaryButton} disabled={total === null} onClick={onNext}>{tr("speedCar.vehicle_details")}<ArrowIcon />
        </button>
      </div>
    </>);
}
