"use client";
import { useI18n } from "@/i18n/LocaleProvider";
import { brand, getRecommendedPackage, getVehicle, packageOptions, prices, type StepProps, type Vehicle, } from "../../_data/packages";
import s from "../../auto-spa.module.css";
export function PackageStep({ draft, onChange, onNext, onBack, }: StepProps) {
    const { t: tr } = useI18n();
    const recommended = getRecommendedPackage(draft.goal);
    if (!draft.vehicle) {
        return (<div className={s.stepHeading}>
        <h2 data-step-heading tabIndex={-1}>{tr("autoSpa.please_choose_your_vehicle_type_first")}</h2>

        <button type="button" className={s.textButton} onClick={onBack}>{tr("autoSpa.back_to_vehicle_selection")}</button>
      </div>);
    }
    const vehicle: Vehicle = draft.vehicle;
    const selectedVehicle = getVehicle(vehicle);
    return (<>
      <div className={s.stepHeading}>
        <p className={s.eyebrow} dir="ltr">02 / YOUR LEVEL OF CARE</p>
        <h2 data-step-heading tabIndex={-1}>{tr("autoSpa.care_that_fits_your_car")}</h2>
        <p>{tr("autoSpa.see_what_s_included_in_each_package")}</p>
      </div>

      <div className={s.vehicleToggle} aria-label={tr("autoSpa.vehicle_type")}>
        {(["sedan", "suv"] as const).map((value) => (<button key={value} type="button" className={vehicle === value ? s.toggleActive : ""} aria-pressed={vehicle === value} onClick={() => onChange({ vehicle: value })}>
            {tr(value === "sedan" ? tr("autoSpa.sedan") : tr("autoSpa.suv"))}
          </button>))}
      </div>

      {tr(brand.demoPricing && (<p className={s.demoNotice}>{tr("autoSpa.the_following_prices_and_inclusions_are_illustrative")}</p>))}

      <div className={s.bookingPackageList}>
        {packageOptions.map((item, index) => {
            const selected = draft.packageId === item.id;
            return (<article key={item.id} className={`${s.bookingPackage} ${selected ? s.selectedPackage : ""}`}>
              <button type="button" className={s.packageSelectButton} aria-pressed={selected} onClick={() => onChange({ packageId: item.id })}>
                <span className={s.rowNumber}>
                  {tr(String(index + 1).padStart(2, "0"))}
                </span>

                <span className={s.packageName}>
                  <strong dir="ltr">{tr(item.english)}</strong>
                  <span>{tr(item.title)}</span>

                  {tr(recommended === item.id && (<small className={s.recommendation}>{tr("autoSpa.suggested_for_you")}</small>))}
                </span>

                <span key={`${vehicle}-${item.id}`} className={s.bookingPrice}>
                  <strong>{tr(prices[vehicle][item.id])}</strong>
                  <span dir="ltr">OMR</span>
                </span>

                <span className={s.selectionCircle} aria-hidden="true">
                  {tr(selected ? "✓" : "")}
                </span>
              </button>

              <details className={s.packageInclusions}>
                <summary>{tr("autoSpa.what_s_included")}</summary>

                <p>{tr(item.description)}</p>

                <ul className={s.includedList}>
                  {item.services.map((service) => (<li key={service}>{tr(service)}</li>))}
                </ul>
              </details>
            </article>);
        })}
      </div>

      <div className={s.stepFooter}>
        <button type="button" className={s.textButton} onClick={onBack}>{tr("autoSpa.back")}</button>

        <div className={s.stepFooterAction}>
          <span className={s.smallNote}>{tr(selectedVehicle?.title)}</span>

          <button type="button" className={s.primaryButton} disabled={!draft.packageId} onClick={onNext}>{tr("autoSpa.choose_an_appointment")}{" "}<span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    </>);
}
