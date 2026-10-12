"use client";
import { useRef, type RefObject } from "react";
import { Field } from "@base-ui/react/field";
import { Collapsible } from "@base-ui/react/collapsible";
import { useExperienceMotion } from "./booking-motion";
import { ArrowLeft, Check, ClipboardList, Clock3 } from "lucide-react";
import { useI18n } from "@/i18n/LocaleProvider";
import { type BookingDraft, type BookingErrors, type BookingDemo } from "@/lib/booking-request-demo";
import { BookingSummary, ScheduleFields } from "./booking-fields";
import s from "./booking-site.module.css";
export default function BookingExperience({ state, today, errors, onEdit, onAdvance, onBack, onReset, headingRef }: {
  state: BookingDemo; today: string; errors: BookingErrors;
  onEdit: (field: keyof BookingDraft, value: string) => void; onAdvance: () => void;
  onBack: (step: 0 | 1 | 2) => void; onReset: () => void; headingRef: RefObject<HTMLHeadingElement | null>;
}) {
  const { t } = useI18n();
  const scope = useRef<HTMLElement>(null);
  useExperienceMotion(scope, state.step, `${state.draft.service}|${state.draft.date}|${state.draft.time}`);
  const summary = <div className={s.receipt}>
    <div className={s.receiptHeading}><strong>{t(state.request ? "bookingSite.request_title" : "bookingSite.preview_draft")}</strong>{state.request ? <bdi className={s.reference}>{state.request.reference}</bdi> : <ClipboardList size={20} aria-hidden="true" />}</div>
    <BookingSummary draft={state.request ?? state.draft} />
    <p className={state.request ? s.pending : s.draftStatus}><Clock3 size={16} aria-hidden="true" />{t(state.request ? "bookingSite.pending" : "bookingSite.draft_status")}</p>
  </div>;
  const heading = state.step === 0 ? "bookingSite.step_1" : state.step === 1 ? "bookingSite.details_title" : state.step === 2 ? "bookingSite.review_title" : "bookingSite.success_title";
  return <section ref={scope} id="experience" className={`${s.section} ${s.experience}`} aria-labelledby="experience-title">
    <div className={s.container}>
      <div className={s.sectionIntro}><h2 id="experience-title">{t("bookingSite.demo_title")}</h2><p>{t("bookingSite.notice")}</p></div>
      <div className={s.experienceGrid}>
        <nav className={s.stepper} aria-label={t("bookingSite.steps_label")}>
          <ol>{[0,1,2,3].map(index => <li key={index} aria-current={index === state.step ? "step" : undefined} data-complete={index < state.step}>
            <span className={s.stepNumber} aria-hidden="true">{index < state.step ? <Check size={16} /> : `0${index + 1}`}</span>
            {index < state.step && !state.request ? <button type="button" onClick={() => onBack(index as 0 | 1 | 2)}>{t(`bookingSite.step_${index + 1}`)}</button> : <span>{t(`bookingSite.step_${index + 1}`)}</span>}
          </li>)}</ol>
        </nav>
        <div className={s.activeStep}><div className={s.stepViewport}><div className={s.stepContent}>
          <p className={s.stepCounter}>{t("bookingSite.step_count", [state.step + 1])}</p>
          <h3 ref={headingRef} tabIndex={-1} id="booking-step-title">{t(heading)}</h3>
          {Object.values(errors).some(Boolean) ? <p role="alert" className={s.errorSummary}>{t("bookingSite.errors_title")}</p> : null}
          {state.step < 3 ? <form noValidate autoComplete="off" onSubmit={e => { e.preventDefault(); onAdvance(); }}>
            {state.step === 0 ? <><ScheduleFields draft={state.draft} today={today} errors={errors} onEdit={onEdit} /><p className={s.helper}>{t("bookingSite.time_note")}</p></> : null}
            {state.step === 1 ? <>
              <p className={s.helper}>{t("bookingSite.phone_hint")}</p>
              {(["name", "phone"] as const).map(field => <Field.Root className={s.field} key={field} name={field} invalid={!!errors[field]}><Field.Label htmlFor={`booking-${field}`}>{t(`bookingSite.${field}`)}</Field.Label>
                <Field.Control id={`booking-${field}`} name={field} type={field === "phone" ? "tel" : "text"} inputMode={field === "phone" ? "tel" : "text"} dir={field === "phone" ? "ltr" : "auto"} maxLength={field === "phone" ? 22 : 80} autoComplete="off" spellCheck={false} value={state.draft[field]} onChange={e => onEdit(field, e.target.value)} placeholder={field === "phone" ? "000 000 0000" : t("bookingSite.name_placeholder")} aria-invalid={!!errors[field]} aria-describedby={errors[field] ? `booking-${field}-error` : undefined} />
                {errors[field] ? <Field.Error match className={s.error} id={`booking-${field}-error`}>{t(errors[field]!)}</Field.Error> : null}
              </Field.Root>)}
              <button type="button" className={s.textButton} onClick={() => onBack(0)}>{t("bookingSite.edit")}</button>
            </> : null}
            {state.step === 2 ? <><BookingSummary draft={state.draft} /><p className={s.helper}>{t("bookingSite.review_hint")}</p></> : null}
            <div className={s.formActions}>
              <button type="submit" className={s.button}>{t(state.step === 0 ? "bookingSite.continue_details" : state.step === 1 ? "bookingSite.review_button" : "bookingSite.record")}<ArrowLeft className="directional-icon" aria-hidden="true" /></button>
              {state.step > 0 ? <button type="button" className={s.textButton} onClick={() => onBack((state.step - 1) as 0 | 1)}>{t("bookingSite.back")}</button> : null}
            </div>
          </form> : <div className={s.success}>
            <p className={s.successMark}><Check size={20} aria-hidden="true" />{t("bookingSite.pending")}</p>
            <p>{t("bookingSite.success_body")}</p>
            <p className={s.helper} role="status">{t("bookingSite.success_notice")}</p>
            <div className={s.mobileResult}>{summary}</div>
            <button className={s.button} type="button" onClick={onReset}>{t("bookingSite.reset")}<ArrowLeft className="directional-icon" aria-hidden="true" /></button>
          </div>}
        </div>
        </div></div>
        <aside className={s.teamPreview} aria-labelledby="team-preview-title">
          <h3 id="team-preview-title"><ClipboardList size={20} aria-hidden="true" />{t("bookingSite.preview_title")}</h3>
          <div className={s.desktopReceipt}>{summary}</div>
          {state.step < 3 ? <Collapsible.Root className={s.mobileReceipt}><Collapsible.Trigger className={s.receiptTrigger}>{t("bookingSite.preview_title")}</Collapsible.Trigger><Collapsible.Panel>{summary}</Collapsible.Panel></Collapsible.Root> : null}
          <p className={s.helper}>{t("bookingSite.preview_hint")}</p>
        </aside>
      </div>
      <p className={s.sessionNotice}>{t("bookingSite.session_note")}</p>
    </div>
  </section>;
}
