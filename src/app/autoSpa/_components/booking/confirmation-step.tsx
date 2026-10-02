"use client";
import { source } from "@/i18n/messages";
import { useI18n } from "@/i18n/LocaleProvider";
import { useState, type MouseEvent } from "react";
import { brand, formatDate, formatTime, getPackage, getPrice, getVehicle, isRequestTimeValid, type BookingDraft, } from "../../_data/packages";
import { createWhatsAppUrl, hasWhatsAppNumber, } from "../../_lib/whatsapp";
import s from "../../auto-spa.module.css";
type Props = {
    draft: BookingDraft;
    onBack: () => void;
    onReset: () => void;
    onEditSchedule: () => void;
};
export function ConfirmationStep({ draft, onBack, onReset, onEditSchedule, }: Props) {
    const { t: tr, locale } = useI18n();
    const [error, setError] = useState("");
    const selectedPackage = getPackage(draft.packageId);
    const selectedVehicle = getVehicle(draft.vehicle);
    const price = getPrice(draft);
    const whatsappReady = hasWhatsAppNumber();
    const url = createWhatsAppUrl(draft, locale);
    function validateBeforeOpening(event: MouseEvent<HTMLAnchorElement>) {
        if (!isRequestTimeValid(draft.date, draft.time)) {
            event.preventDefault();
            setError(source("autoSpa.your_chosen_time_has_passed_please_update"));
            return;
        }
        const freshUrl = createWhatsAppUrl(draft, locale);
        if (!freshUrl) {
            event.preventDefault();
            setError(source("autoSpa.please_check_your_details_and_contact_number"));
            return;
        }
        // تحديث الرابط لحظة الضغط بعد إعادة التحقق من الوقت.
        event.currentTarget.href = freshUrl;
        setError("");
    }
    return (<>
      <div className={s.stepHeading}>
        <p className={s.eyebrow} dir="ltr">YOUR CARE REQUEST</p>
        <h2 data-step-heading tabIndex={-1}>{tr("autoSpa.everything_in_one_place")}</h2>
        <p>{tr("autoSpa.review_your_request_then_open_whatsapp_to")}</p>
      </div>

      <div className={s.summaryReceipt}>
        <div className={s.receiptHeader}>
          <span dir="ltr">
            <strong>DOPAMINE</strong>
            <small>AUTO SPA / CARE REQUEST</small>
          </span>

          <span className={s.receiptMark} aria-hidden="true">↗</span>
        </div>

        <dl className={s.summaryList}>
          <div>
            <dt>{tr("autoSpa.vehicle")}</dt>
            <dd>
              {tr(selectedVehicle?.title)}
              {tr(draft.carModel && <span>{tr(draft.carModel)}</span>)}
            </dd>
          </div>

          <div>
            <dt>{tr("autoSpa.care")}</dt>
            <dd>{tr(selectedPackage?.title)}</dd>
          </div>

          <div className={s.summaryPriceRow}>
            <dt>{tr(brand.demoPricing ? tr("autoSpa.sample_price") : tr("autoSpa.price"))}</dt>
            <dd>
              <strong>{tr(price ?? "—")}</strong>
              <span>{tr("autoSpa.omr")}</span>
            </dd>
          </div>

          <div>
            <dt>{tr("autoSpa.requested_day")}</dt>
            <dd>{tr(formatDate(draft.date, locale))}</dd>
          </div>

          <div>
            <dt>{tr("autoSpa.requested_time")}</dt>
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

        <p className={s.receiptNote}>
          {tr(brand.demoPricing
            ? tr("autoSpa.prices_and_inclusions_are_illustrative_the_centre") : tr("autoSpa.the_centre_will_review_your_request_and"))}
        </p>
      </div>

      {tr(!whatsappReady && (<p className={s.demoNotice} role="status">{tr("autoSpa.requests_are_currently_unavailable_you_can_contact")}</p>))}

      <p className={s.fieldError} role="status">{tr(error)}</p>

      {tr(error && (<button type="button" className={s.textButton} onClick={onEditSchedule}>{tr("autoSpa.change_appointment")}</button>))}

      <div className={s.stepFooter}>
        <button type="button" className={s.textButton} onClick={onBack}>{tr("autoSpa.edit_my_details")}</button>

        {tr(url ? (<a href={url} target="_blank" rel="noopener noreferrer" className={s.primaryButton} onClick={validateBeforeOpening}>{tr("autoSpa.open_whatsapp_to_send")}<span aria-hidden="true">↗</span>
          </a>) : (<button type="button" className={s.primaryButton} disabled>{tr("autoSpa.send_request_on_whatsapp")}<span aria-hidden="true">↗</span>
          </button>))}
      </div>

      <div className={s.summaryBottom}>
        <button type="button" className={s.textButton} onClick={onReset}>{tr("autoSpa.start_a_new_request")}</button>

        <a href={brand.instagramUrl} target="_blank" rel="noopener noreferrer" className={s.textLink}>{tr("autoSpa.centre_s_profile")}</a>
      </div>
    </>);
}
