import {
  brand,
  getRecommendedPackage,
  getVehicle,
  packageOptions,
  prices,
  type StepProps,
  type Vehicle,
} from "../../_data/packages";

import s from "../../auto-spa.module.css";

export function PackageStep({
  draft,
  onChange,
  onNext,
  onBack,
}: StepProps) {
  const recommended = getRecommendedPackage(draft.goal);

  if (!draft.vehicle) {
    return (
      <div className={s.stepHeading}>
        <h2 data-step-heading tabIndex={-1}>اختر نوع السيارة أولًا.</h2>

        <button type="button" className={s.textButton} onClick={onBack}>
          العودة لاختيار السيارة
        </button>
      </div>
    );
  }

  const vehicle: Vehicle = draft.vehicle;
  const selectedVehicle = getVehicle(vehicle);

  return (
    <>
      <div className={s.stepHeading}>
        <p className={s.eyebrow} dir="ltr">02 / YOUR LEVEL OF CARE</p>
        <h2 data-step-heading tabIndex={-1}>العناية على مقاسك.</h2>
        <p>راجع ما تتضمنه كل باقة، ثم اختر المناسب.</p>
      </div>

      <div className={s.vehicleToggle} aria-label="نوع السيارة">
        {(["sedan", "suv"] as const).map((value) => (
          <button
            key={value}
            type="button"
            className={vehicle === value ? s.toggleActive : ""}
            aria-pressed={vehicle === value}
            onClick={() => onChange({ vehicle: value })}
          >
            {value === "sedan" ? "صالون" : "دفع رباعي"}
          </button>
        ))}
      </div>

      {brand.demoPricing && (
        <p className={s.demoNotice}>
          الأسعار والبنود التالية تجريبية، وتحتاج اعتماد المركز.
        </p>
      )}

      <div className={s.bookingPackageList}>
        {packageOptions.map((item, index) => {
          const selected = draft.packageId === item.id;

          return (
            <article
              key={item.id}
              className={`${s.bookingPackage} ${
                selected ? s.selectedPackage : ""
              }`}
            >
              <button
                type="button"
                className={s.packageSelectButton}
                aria-pressed={selected}
                onClick={() => onChange({ packageId: item.id })}
              >
                <span className={s.rowNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className={s.packageName}>
                  <strong dir="ltr">{item.english}</strong>
                  <span>{item.title}</span>

                  {recommended === item.id && (
                    <small className={s.recommendation}>
                      مقترحة حسب اختيارك
                    </small>
                  )}
                </span>

                <span
                  key={`${vehicle}-${item.id}`}
                  className={s.bookingPrice}
                >
                  <strong>{prices[vehicle][item.id]}</strong>
                  <span dir="ltr">OMR</span>
                </span>

                <span className={s.selectionCircle} aria-hidden="true">
                  {selected ? "✓" : ""}
                </span>
              </button>

              <details className={s.packageInclusions}>
                <summary>ما الذي تشمله؟</summary>

                <p>{item.description}</p>

                <ul className={s.includedList}>
                  {item.services.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
              </details>
            </article>
          );
        })}
      </div>

      <div className={s.stepFooter}>
        <button type="button" className={s.textButton} onClick={onBack}>
          رجوع
        </button>

        <div className={s.stepFooterAction}>
          <span className={s.smallNote}>{selectedVehicle?.title}</span>

          <button
            type="button"
            className={s.primaryButton}
            disabled={!draft.packageId}
            onClick={onNext}
          >
            اختر الموعد <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    </>
  );
}