"use client";
import { useI18n } from "@/i18n/LocaleProvider";
import { useState, type FormEvent } from "react";
import { normalizePhone, type BookingDraft } from "../../_data/services";
import { ArrowIcon } from "../icons";
import s from "../../speedcar.module.css";
type Props = {
    draft: BookingDraft;
    onChange: (patch: Partial<BookingDraft>) => void;
    onNext: () => void;
    onBack: () => void;
};
export function VehicleStep({ draft, onChange, onNext, onBack }: Props) {
    const { t: tr } = useI18n();
    const [errors, setErrors] = useState<Record<string, string>>({});
    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const next: Record<string, string> = {};
        if (draft.carModel.trim().length < 2)
            next.carModel = tr("speedCar.please_enter_your_car_s_make_and");
        if (draft.name.trim().length < 2)
            next.name = tr("speedCar.please_enter_a_name_with_at_least");
        const phone = normalizePhone(draft.phone);
        if (!phone)
            next.phone = tr("speedCar.enter_a_valid_jordanian_number_or_an");
        setErrors(next);
        if (Object.keys(next).length) {
            document.getElementById(`sc-${Object.keys(next)[0]}`)?.focus();
            return;
        }
        onChange({
            carModel: draft.carModel.trim(),
            name: draft.name.trim(),
            phone,
        });
        onNext();
    }
    return (<>
      <div className={s.stepHeading}>
        <p className={s.eyebrow} dir="ltr">
          03 / YOUR CAR, YOUR DETAILS
        </p>
        <h2 data-step-heading tabIndex={-1}>{tr("speedCar.tell_us_about_your_car")}</h2>
        <p>{tr("speedCar.three_details_help_us_prepare_a_clear")}</p>
      </div>
      <form className={s.detailsForm} onSubmit={submit} noValidate>
        <div className={s.formField}>
          <label htmlFor="sc-carModel">{tr("speedCar.car_make_and_model")}</label>
          <input id="sc-carModel" name="carModel" maxLength={80} value={draft.carModel} placeholder={tr("speedCar.e_g_kia_sportage_2022")} required aria-invalid={!!errors.carModel} aria-describedby={errors.carModel ? "sc-carModel-error" : undefined} onChange={(event) => onChange({ carModel: event.target.value })}/>
          {tr(errors.carModel && (<p id="sc-carModel-error" className={s.fieldError} role="alert">
              {tr(errors.carModel)}
            </p>))}
        </div>
        <div className={s.formRow}>
          <div className={s.formField}>
            <label htmlFor="sc-name">{tr("autoSpa.your_name")}</label>
            <input id="sc-name" name="name" autoComplete="name" maxLength={80} value={draft.name} placeholder={tr("autoSpa.name")} required aria-invalid={!!errors.name} aria-describedby={errors.name ? "sc-name-error" : undefined} onChange={(event) => onChange({ name: event.target.value })}/>
            {tr(errors.name && (<p id="sc-name-error" className={s.fieldError} role="alert">
                {tr(errors.name)}
              </p>))}
          </div>
          <div className={s.formField}>
            <label htmlFor="sc-phone">{tr("autoSpa.contact_number")}</label>
            <input id="sc-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" dir="ltr" maxLength={30} value={draft.phone} placeholder="07XXXXXXXX" required aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "sc-phone-error" : undefined} onChange={(event) => onChange({ phone: event.target.value })}/>
            {tr(errors.phone && (<p id="sc-phone-error" className={s.fieldError} role="alert">
                {tr(errors.phone)}
              </p>))}
          </div>
        </div>
        <p className={s.privacyNote}>{tr("speedCar.your_details_are_added_to_the_whatsapp")}</p>
        <div className={s.stepFooter}>
          <button type="button" className={s.textButton} onClick={onBack}>{tr("autoSpa.back")}</button>
          <button type="submit" className={s.primaryButton}>{tr("autoSpa.choose_a_time")}<ArrowIcon />
          </button>
        </div>
      </form>
    </>);
}
