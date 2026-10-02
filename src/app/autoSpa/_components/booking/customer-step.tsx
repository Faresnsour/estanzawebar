"use client";
import { useI18n } from "@/i18n/LocaleProvider";
import { useState, type FormEvent } from "react";
import { normalizePhone, type StepProps, } from "../../_data/packages";
import s from "../../auto-spa.module.css";
export function CustomerStep({ draft, onChange, onNext, onBack, }: StepProps) {
    const { t: tr } = useI18n();
    const [errors, setErrors] = useState<{
        name?: string;
        phone?: string;
    }>({});
    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const name = draft.name.trim();
        const phone = normalizePhone(draft.phone);
        const nextErrors: typeof errors = {};
        if (name.length < 2 || name.length > 80) {
            nextErrors.name = tr("autoSpa.please_enter_a_name_between_2_and");
        }
        if (!phone) {
            nextErrors.phone = tr("autoSpa.enter_a_valid_omani_number_or_an");
        }
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0)
            return;
        onChange({
            name,
            phone,
            carModel: draft.carModel.trim(),
        });
        onNext();
    }
    return (<>
      <div className={s.stepHeading}>
        <p className={s.eyebrow} dir="ltr">04 / A WAY TO REACH YOU</p>
        <h2 data-step-heading tabIndex={-1}>{tr("autoSpa.how_can_we_reach_you")}</h2>
        <p>{tr("autoSpa.a_few_details_help_the_team_prepare")}</p>
      </div>

      <form className={s.customerForm} onSubmit={submit} noValidate>
        <div className={s.formField}>
          <label htmlFor="autospa-name">{tr("autoSpa.your_name")}</label>

          <input id="autospa-name" name="name" autoComplete="name" placeholder={tr("autoSpa.name")} value={draft.name} maxLength={80} required aria-invalid={!!errors.name} aria-describedby={errors.name ? "autospa-name-error" : undefined} onChange={(event) => onChange({ name: event.target.value })}/>

          {tr(errors.name && (<p id="autospa-name-error" className={s.fieldError} role="alert">
              {tr(errors.name)}
            </p>))}
        </div>

        <div className={s.formField}>
          <label htmlFor="autospa-phone">{tr("autoSpa.contact_number")}</label>

          <input id="autospa-phone" name="phone" type="tel" inputMode="tel" dir="ltr" autoComplete="tel" placeholder="+968" value={draft.phone} maxLength={30} required aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "autospa-phone-error" : "autospa-phone-hint"} onChange={(event) => onChange({ phone: event.target.value })}/>

          {tr(errors.phone ? (<p id="autospa-phone-error" className={s.fieldError} role="alert">
              {tr(errors.phone)}
            </p>) : (<p id="autospa-phone-hint" className={s.smallNote}>{tr("autoSpa.omani_numbers_are_accepted_without_the_country")}</p>))}
        </div>

        <div className={s.formField}>
          <label htmlFor="autospa-model">{tr("autoSpa.car_model")}{" "}<span className={s.optional}>{tr("autoSpa.optional")}</span>
          </label>

          <input id="autospa-model" name="carModel" placeholder={tr("autoSpa.e_g_toyota_camry")} value={draft.carModel} maxLength={80} onChange={(event) => onChange({ carModel: event.target.value })}/>
        </div>

        <p className={s.privacyNote}>{tr("autoSpa.your_details_are_added_to_the_whatsapp")}</p>

        <div className={s.stepFooter}>
          <button type="button" className={s.textButton} onClick={onBack}>{tr("autoSpa.back")}</button>

          <button type="submit" className={s.primaryButton}>{tr("autoSpa.review_request")}{" "}<span aria-hidden="true">↗</span>
          </button>
        </div>
      </form>
    </>);
}
