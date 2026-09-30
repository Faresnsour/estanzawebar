import {
  goals,
  vehicles,
  type StepProps,
} from "../../_data/packages";
import s from "../../auto-spa.module.css";

export function VehicleStep({
  draft,
  onChange,
  onNext,
}: StepProps) {
  const goal = goals.find((item) => item.id === draft.goal);

  return (
    <>
      <div className={s.stepHeading}>
        <p className={s.eyebrow} dir="ltr">01 / YOUR CAR</p>

        <h2 data-step-heading tabIndex={-1}>
          نبدأ من سيارتك.
        </h2>

        <p>اختر الفئة لعرض أسعار العناية المناسبة.</p>
      </div>

      {goal && (
        <p className={s.intentNote}>
          النتيجة التي اخترتها: <strong>{goal.title}</strong>
        </p>
      )}

      <div className={s.vehicleList}>
        {vehicles.map((vehicle, index) => (
          <button
            key={vehicle.id}
            type="button"
            className={`${s.vehicleOption} ${
              draft.vehicle === vehicle.id ? s.selectedOption : ""
            }`}
            aria-pressed={draft.vehicle === vehicle.id}
            onClick={() => onChange({ vehicle: vehicle.id })}
          >
            <span className={s.rowNumber}>
              {String(index + 1).padStart(2, "0")}
            </span>

            <span className={s.vehicleCopy}>
              <strong dir="ltr">{vehicle.english}</strong>
              <span>{vehicle.title}</span>
              <small>{vehicle.description}</small>
            </span>

            <span className={s.selectionCircle} aria-hidden="true">
              {draft.vehicle === vehicle.id ? "✓" : ""}
            </span>
          </button>
        ))}
      </div>

      <div className={s.stepFooter}>
        <p className={s.smallNote}>يمكنك تعديل الاختيار في أي خطوة.</p>

        <button
          type="button"
          className={s.primaryButton}
          disabled={!draft.vehicle}
          onClick={onNext}
        >
          اختر العناية <span aria-hidden="true">↗</span>
        </button>
      </div>
    </>
  );
}