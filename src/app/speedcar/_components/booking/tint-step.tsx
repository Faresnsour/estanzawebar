"use client";
import { useI18n } from "@/i18n/LocaleProvider";
import { tintServices, getTint, type BookingDraft, type TintId, } from "../../_data/services";
import { ArrowIcon } from "../icons";
import s from "../../speedcar.module.css";
export function TintStep({ draft, onSelect, onNext, }: {
    draft: BookingDraft;
    onSelect: (id: TintId) => void;
    onNext: () => void;
}) {
    const { t: tr } = useI18n();
    const tint = getTint(draft.tint);
    return (<>
      <div className={s.stepHeading}>
        <p className={s.eyebrow} dir="ltr">
          01 / CHOOSE YOUR FILM
        </p>
        <h2 data-step-heading tabIndex={-1}>{tr("speedCar.comfort_starts_here")}</h2>
        <p>{tr("speedCar.choose_your_window_film_you_can_change")}</p>
      </div>
      <div className={s.bookingTintList}>
        {tintServices.map((item) => (<button key={item.id} type="button" className={`${s.bookingTint} ${draft.tint === item.id ? s.bookingTintActive : ""}`} aria-pressed={draft.tint === item.id} onClick={() => onSelect(item.id)}>
            <span className={s.index}>{tr(item.number)}</span>
            <span>
              <strong dir="ltr">{tr(item.english)}</strong>
              <small>{tr(item.name)}</small>
              <em>{tr("speedCar.heat_rejection")}{" "}{tr(item.id === "original-3m" ? tr("speedCar.up_to") : "")}
                {tr(item.heat)}{tr("speedCar.warranty_485")}{" "}{tr(item.warranty)}
              </em>
            </span>
            <span className={s.tintRowPrice}>
              <strong>{tr(item.prices["four-windows"])}</strong>
              <small>{tr("speedCar.jod_4_windows")}</small>
            </span>
            <span className={s.checkCircle}>
              {tr(draft.tint === item.id ? "✓" : "")}
            </span>
          </button>))}
      </div>
      <p className={s.finePrint}>{tr("speedCar.figures_and_warranty_terms_are_supplied_by")}</p>
      <div className={s.stepFooter}>
        <span className={s.smallNote}>{tr("speedCar.your_choice")}{" "}{tr(tint.shortName)}</span>
        <button className={s.primaryButton} type="button" onClick={onNext}>{tr("speedCar.choose_glass_coverage")}<ArrowIcon />
        </button>
      </div>
    </>);
}
