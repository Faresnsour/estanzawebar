"use client";
import { source } from "@/i18n/messages";
import { useI18n } from "@/i18n/LocaleProvider";
import { useState, type MouseEvent } from "react";
import { coverageOptions, formatDate, formatTime, getSubtotal, getTint, isRequestTimeValid, speedCar, type BookingDraft, } from "../../_data/services";
import { createWhatsAppUrl } from "../../_lib/whatsapp";
import { ArrowIcon } from "../icons";
import s from "../../speedcar.module.css";
type Props = {
    draft: BookingDraft;
    onEdit: (step: number) => void;
    onReset: () => void;
};
export function SummaryStep({ draft, onEdit, onReset }: Props) {
    const { t: tr, locale } = useI18n();
    const [error, setError] = useState("");
    const tint = getTint(draft.tint);
    const subtotal = getSubtotal(draft);
    const url = createWhatsAppUrl(draft, new Date(), locale);
    function validate(event: MouseEvent<HTMLAnchorElement>) {
        const fresh = createWhatsAppUrl(draft, new Date(), locale);
        if (!fresh) {
            event.preventDefault();
            setError(isRequestTimeValid(draft.date, draft.time)
                ? source("speedCar.please_check_your_vehicle_and_contact_details") : source("speedCar.your_chosen_time_has_passed_update_it"));
            return;
        }
        event.currentTarget.href = fresh;
        setError("");
    }
    return (<>
      <div className={s.stepHeading}>
        <p className={s.eyebrow} dir="ltr">
          05 / READY FOR THE TEAM
        </p>
        <h2 data-step-heading tabIndex={-1}>{tr("speedCar.your_request_at_a_glance")}</h2>
        <p>{tr("speedCar.review_your_choices_whatsapp_will_open_with")}</p>
      </div>
      <div className={s.receipt}>
        <div className={s.receiptHeader}>
          <span dir="ltr">
            <strong>SPEED CAR JO</strong>
            <small>WINDOW FILM / APPOINTMENT REQUEST</small>
          </span>
          <span className={`${s.receiptIcon} directional-icon`}>↖</span>
        </div>
        <dl className={s.receiptRows}>
          <div>
            <dt>{tr("speedCar.tint")}</dt>
            <dd>
              {tr(tint.name)}
              <small>{tr("speedCar.warranty")}{" "}{tr(tint.warranty)}{" "}{tr("speedCar.subject_to_the_centre_s_terms")}</small>
            </dd>
          </div>
          <div>
            <dt>{tr("speedCar.coverage")}</dt>
            <dd>
              {tr(coverageOptions
            .filter((item) => draft.coverage.includes(item.id))
            .map((item) => tr(item.name))
            .join(" + "))}
            </dd>
          </div>
          <div className={s.receiptTotal}>
            <dt>{tr("speedCar.base_price")}</dt>
            <dd>
              <strong>{tr(subtotal ?? "—")}</strong>
              <span>{tr("speedCar.jod")}</span>
            </dd>
          </div>
          <div>
            <dt>{tr("autoSpa.vehicle")}</dt>
            <dd>{tr(draft.carModel)}</dd>
          </div>
          <div>
            <dt>{tr("speedCar.preferred_day")}</dt>
            <dd>{tr(formatDate(draft.date, locale))}</dd>
          </div>
          <div>
            <dt>{tr("speedCar.preferred_time")}</dt>
            <dd>{tr(formatTime(draft.time, locale))}</dd>
          </div>
          <div>
            <dt>{tr("autoSpa.name")}</dt>
            <dd>{tr(draft.name)}</dd>
          </div>
          <div>
            <dt>{tr("autoSpa.contact_number")}</dt>
            <dd dir="ltr">{tr(draft.phone)}</dd>
          </div>
        </dl>
        <p className={s.finePrint}>{tr(speedCar.surchargeNote)}</p>
      </div>
      <p className={s.summaryNote}>{tr("speedCar.the_centre_confirms_your_appointment_and_final")}</p>
      {tr(error && (<p className={s.fieldError} role="alert">
          {tr(error)}
        </p>))}
      <div className={s.summaryActions}>
        <button type="button" className={s.textButton} onClick={() => onEdit(2)}>{tr("autoSpa.edit_my_details")}</button>
        <button type="button" className={s.textButton} onClick={() => onEdit(3)}>{tr("autoSpa.change_appointment")}</button>
      </div>
      <div className={s.stepFooter}>
        <button type="button" className={s.textButton} onClick={onReset}>{tr("speedCar.new_request")}</button>
        {tr(url ? (<a href={url} target="_blank" rel="noopener noreferrer" onClick={validate} className={s.primaryButton}>{tr("autoSpa.open_whatsapp_to_send")}<ArrowIcon />
          </a>) : (<button type="button" className={s.primaryButton} onClick={() => onEdit(3)}>{tr("speedCar.check_appointment_and_details")}<ArrowIcon />
          </button>))}
      </div>
    </>);
}
