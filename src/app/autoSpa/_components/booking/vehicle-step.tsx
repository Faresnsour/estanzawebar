"use client";
import { useI18n } from "@/i18n/LocaleProvider";
import { goals, vehicles, type StepProps, } from "../../_data/packages";
import s from "../../auto-spa.module.css";
export function VehicleStep({ draft, onChange, onNext, }: StepProps) {
    const { t: tr } = useI18n();
    const goal = goals.find((item) => item.id === draft.goal);
    return (<>
      <div className={s.stepHeading}>
        <p className={s.eyebrow} dir="ltr">01 / YOUR CAR</p>

        <h2 data-step-heading tabIndex={-1}>{tr("autoSpa.start_with_your_car")}</h2>

        <p>{tr("autoSpa.choose_your_vehicle_type_to_see_the")}</p>
      </div>

      {tr(goal && (<p className={s.intentNote}>{tr("autoSpa.your_chosen_goal")}{" "}<strong>{tr(goal.title)}</strong>
        </p>))}

      <div className={s.vehicleList}>
        {vehicles.map((vehicle, index) => (<button key={vehicle.id} type="button" className={`${s.vehicleOption} ${draft.vehicle === vehicle.id ? s.selectedOption : ""}`} aria-pressed={draft.vehicle === vehicle.id} onClick={() => onChange({ vehicle: vehicle.id })}>
            <span className={s.rowNumber}>
              {tr(String(index + 1).padStart(2, "0"))}
            </span>

            <span className={s.vehicleCopy}>
              <strong dir="ltr">{tr(vehicle.english)}</strong>
              <span>{tr(vehicle.title)}</span>
              <small>{tr(vehicle.description)}</small>
            </span>

            <span className={s.selectionCircle} aria-hidden="true">
              {tr(draft.vehicle === vehicle.id ? "✓" : "")}
            </span>
          </button>))}
      </div>

      <div className={s.stepFooter}>
        <p className={s.smallNote}>{tr("autoSpa.you_can_change_your_selection_at_any")}</p>

        <button type="button" className={s.primaryButton} disabled={!draft.vehicle} onClick={onNext}>{tr("autoSpa.choose_your_care")}{" "}<span aria-hidden="true">↗</span>
        </button>
      </div>
    </>);
}
