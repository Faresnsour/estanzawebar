"use client";
import { useReducer, useRef, useState, type ReactNode } from "react";
import { Radio } from "@base-ui/react/radio";
import { RadioGroup } from "@base-ui/react/radio-group";
import { Field } from "@base-ui/react/field";
import { Collapsible } from "@base-ui/react/collapsible";
import { DirectionProvider } from "@base-ui/react/direction-provider";
import { ArrowLeft, CalendarDays, Check, ChevronDown, Copy } from "lucide-react";
import { useI18n } from "@/i18n/LocaleProvider";
import { localDateId } from "@/lib/booking";
import { SHINEX_CARS, SHINEX_PRICES, SHINEX_PERIODS, initialShinex, shinexReducer, validateShinex, shinexDateLabel, shinexMessage, type ShinexDraft, type ShinexErrors, type ShinexState } from "@/lib/shinex-demo";
import VehicleArt from "./vehicle-art";
import { useShinexMotion } from "./shinex-motion";
import s from "./shinex.module.css";

const steps = ["car", "appointment", "details", "review"] as const;
export default function ShinexBooking({ initialToday, features }: { initialToday: string; features: ReactNode }) {
  const { t, locale, direction } = useI18n();
  const [state, dispatch] = useReducer(shinexReducer, undefined, initialShinex);
  const [today, setToday] = useState(initialToday);
  const [errors, setErrors] = useState<ShinexErrors>({});
  const [copyStatus, setCopyStatus] = useState<"copied" | "copy_failed" | null>(null);
  const root = useRef<HTMLElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const { draft, step, prepared } = state;
  useShinexMotion(root, `${step}-${prepared}`, draft.car, locale);
  function focusHeading() {
    requestAnimationFrame(() => {
      heading.current?.focus({ preventScroll: true });
      // Keep the current step in view without overriding the visitor's scrolling.
      const rect = heading.current?.getBoundingClientRect();
      if (rect && (rect.top < 20 || rect.bottom > window.innerHeight - 100)) heading.current?.scrollIntoView({ block: "start", behavior: "instant" });
    });
  }
  function edit(field: keyof ShinexDraft, value: string) {
    dispatch({ type: "edit", field, value });
    setErrors(previous => ({ ...previous, [field]: undefined }));
    setCopyStatus(null);
  }
  function back(target: ShinexState["step"]) {
    dispatch({ type: "back", step: target }); setErrors({}); setCopyStatus(null); focusHeading();
  }
  function next() {
    const day = localDateId(); setToday(day);
    const validation = validateShinex(draft, day, step);
    setErrors(validation);
    if (Object.values(validation).some(Boolean)) {
      if (validation.date || validation.period) dispatch({ type: "back", step: 1 });
      requestAnimationFrame(() => root.current?.querySelector<HTMLElement>('input[aria-invalid="true"], textarea[aria-invalid="true"], [role="radio"][data-invalid="true"]')?.focus());
      return;
    }
    dispatch({ type: "next", from: step, today: day }); focusHeading();
  }
  function reset() { dispatch({ type: "reset" }); setErrors({}); setCopyStatus(null); setToday(localDateId()); focusHeading(); }
  const message = prepared ? shinexMessage(draft, locale, t) : "";
  async function copyMessage() {
    try { await navigator.clipboard.writeText(message); setCopyStatus("copied"); }
    catch { setCopyStatus("copy_failed"); messageRef.current?.focus(); messageRef.current?.select(); }
  }
  const price = <bdi className={s.price}><strong>{SHINEX_PRICES[draft.car]}</strong> <small>{t("shinex.currency")}</small></bdi>;
  const schedule = <dl className={s.detailsList}>
    <div><dt>{t("shinex.date")}</dt><dd>{draft.date ? shinexDateLabel(draft.date, locale) : t("shinex.not_selected")}</dd></div>
    <div><dt>{t("shinex.period")}</dt><dd>{draft.period ? t(`shinex.${draft.period}`) : t("shinex.not_selected")}</dd></div>
  </dl>;
  const summary = <div className={s.summaryContent}>
    <VehicleArt car={draft.car} /><h3>{t(`shinex.${draft.car}`)}</h3><p>{t("shinex.package_name")}</p>
    <div data-price aria-live="polite" aria-atomic="true">{price}</div>
    {step > 0 ? schedule : <div className={s.nextHint}><small>{t("shinex.next_step")}</small><p>{t("shinex.appointment")}</p></div>}
    {!prepared ? <div className={s.summaryNext}><p className={s.disclaimer}>{t("shinex.no_send")}</p><button type="submit" form="shinex-form" className={s.primary}>{t(`shinex.next_${step}`)}<ArrowLeft className="directional-icon" size={19} aria-hidden="true" /></button></div> : null}
    <p className={s.availability}><CalendarDays size={18} aria-hidden="true" />{t("shinex.pending")}</p>
    {prepared ? <p className={s.disclaimer}>{t("shinex.no_send")}</p> : null}
  </div>;
  const title = prepared ? "success" : ["choose_car", "schedule_title", "details_title", "review_title"][step];
  return <DirectionProvider direction={direction}><section className={`${s.container} ${s.booking}`} id="shinex-booking" ref={root} aria-labelledby="shinex-step-title">
    <nav className={s.steps} aria-label={t("shinex.demo")}><ol>{steps.map((key, index) => <li key={key} aria-current={index === step ? "step" : undefined} data-complete={index < step || prepared}>
      <span className={s.stepNumber} aria-hidden="true">{index < step || prepared ? <Check size={16} /> : index + 1}</span>
      {index < step ? <button type="button" onClick={() => back(index as ShinexState["step"])}>{t(`shinex.${key}`)}</button> : <span>{t(`shinex.${key}`)}</span>}
    </li>)}</ol></nav>
    <div className={s.bookingGrid}>
      <div className={s.active}>
        <div className={s.viewport} data-step-viewport><div data-step-content className={s.stepContent}>
          <p className={s.stepCount}>{t("shinex.step_count", [step + 1])}</p>
          <h2 id="shinex-step-title" ref={heading} tabIndex={-1}>{t(`shinex.${title}`)}</h2>
          {!prepared ? <form id="shinex-form" autoComplete="off" noValidate onSubmit={e => { e.preventDefault(); next(); }}>
            <p className={s.stepIntro}>{t(`shinex.${["choose_body", "schedule_body", "details_body", "review_body"][step]}`)}</p>
            {step === 0 ? <RadioGroup className={s.carChoices} name="shinex-car" value={draft.car} onValueChange={value => edit("car", value)} aria-label={t("shinex.car")}>
              {SHINEX_CARS.map(car => <Radio.Root key={car} value={car} className={s.carChoice} aria-label={`${t(`shinex.${car}`)}, ${SHINEX_PRICES[car]} ${t("shinex.currency")}`}>
                <span className={s.choiceMark}><Radio.Indicator><Check size={15} aria-hidden="true" /></Radio.Indicator></span>
                <VehicleArt car={car} /><strong>{t(`shinex.${car}`)}</strong><bdi><b>{SHINEX_PRICES[car]}</b> <small>{t("shinex.currency")}</small></bdi>
              </Radio.Root>)}
            </RadioGroup> : null}
            {step === 1 ? <div className={s.schedule}>
              <Field.Root className={s.field} name="date" invalid={!!errors.date}>
                <Field.Label htmlFor="shinex-date">{t("shinex.date")}</Field.Label>
                <Field.Control id="shinex-date" type="date" min={today} value={draft.date} onValueChange={value => edit("date", value)} aria-invalid={!!errors.date} />
                {errors.date ? <Field.Error match className={s.error}>{t(errors.date)}</Field.Error> : null}
              </Field.Root>
              <fieldset><legend>{t("shinex.period")}</legend><RadioGroup className={s.periods} name="shinex-period" value={draft.period} onValueChange={value => edit("period", value)} aria-label={t("shinex.period")} aria-describedby={errors.period ? "shinex-period-error" : undefined}>
                {SHINEX_PERIODS.map(period => <Radio.Root value={period} key={period} className={s.period} data-invalid={!!errors.period}><span className={s.choiceMark}><Radio.Indicator><Check size={14} aria-hidden="true" /></Radio.Indicator></span>{t(`shinex.${period}`)}</Radio.Root>)}
              </RadioGroup>{errors.period ? <p id="shinex-period-error" className={s.error}>{t(errors.period)}</p> : null}</fieldset>
              <p className={s.availability}><CalendarDays size={18} aria-hidden="true" />{t("shinex.pending")}</p>
            </div> : null}
            {step === 2 ? <div className={s.personalFields}>{(["name", "phone", "area", "notes"] as const).map(field => <Field.Root key={field} className={s.field} name={field} invalid={!!errors[field]}>
              <Field.Label htmlFor={`shinex-${field}`}>{t(`shinex.${field}`)}{field === "area" || field === "notes" ? <small> ({t("shinex.optional")})</small> : null}</Field.Label>
              {field === "notes" ? <textarea id="shinex-notes" name="notes" maxLength={500} rows={3} value={draft.notes} onChange={e => edit("notes", e.target.value)} placeholder={t("shinex.notes_example")} aria-invalid={!!errors.notes} aria-describedby={errors.notes ? "shinex-notes-error" : undefined} /> : <Field.Control id={`shinex-${field}`} type={field === "phone" ? "tel" : "text"} inputMode={field === "phone" ? "tel" : "text"} dir={field === "phone" ? "ltr" : "auto"} value={draft[field]} maxLength={field === "phone" ? 30 : field === "name" ? 80 : 160} onValueChange={value => edit(field, value)} placeholder={t(`shinex.${field}_example`)} aria-invalid={!!errors[field]} autoComplete="off" />}
              {errors[field] ? <Field.Error match id={`shinex-${field}-error`} className={s.error}>{t(errors[field]!)}</Field.Error> : null}
            </Field.Root>)}</div> : null}
            {step === 3 ? <div className={s.reviewGroups}>
              <div><div className={s.reviewHeading}><h3>{t("shinex.car")}</h3><button type="button" onClick={() => back(0)}>{t("shinex.edit_car")}</button></div><p>{t(`shinex.${draft.car}`)}</p><p>{t("shinex.package_name")}</p>{price}</div>
              <div><div className={s.reviewHeading}><h3>{t("shinex.appointment")}</h3><button type="button" onClick={() => back(1)}>{t("shinex.edit_appointment")}</button></div>{schedule}<p className={s.disclaimer}>{t("shinex.pending")}</p></div>
              <div><div className={s.reviewHeading}><h3>{t("shinex.details")}</h3><button type="button" onClick={() => back(2)}>{t("shinex.edit_details")}</button></div><dl className={s.detailsList}>{(["name", "phone", "area", "notes"] as const).filter(field => draft[field].trim()).map(field => <div key={field}><dt>{t(`shinex.${field}`)}</dt><dd><bdi dir={field === "phone" ? "ltr" : "auto"}>{draft[field]}</bdi></dd></div>)}</dl></div>
            </div> : null}
            <div className={s.formActions}>
              <p>{t("shinex.no_send")}</p><button type="submit" className={s.primary}>{t(`shinex.next_${step}`)}<ArrowLeft className="directional-icon" size={19} aria-hidden="true" /></button>
              {step > 0 ? <button type="button" className={s.back} onClick={() => back((step - 1) as ShinexState["step"])}>{t("shinex.back")}</button> : null}
            </div>
          </form> : <div className={s.result}>
            <p role="status" className={s.resultNotice}><Check size={20} aria-hidden="true" />{t("shinex.no_send")}</p>
            <label htmlFor="shinex-message">{t("shinex.message_label")}</label>
            <textarea id="shinex-message" ref={messageRef} readOnly rows={12} value={message} />
            <div className={s.resultActions}><button type="button" className={s.primary} onClick={copyMessage}><Copy size={18} aria-hidden="true" />{t("shinex.copy")}</button><button type="button" className={s.back} onClick={reset}>{t("shinex.reset")}</button></div>
            <p role="status">{copyStatus ? t(`shinex.${copyStatus}`) : ""}</p>
            <button type="button" className={s.back} onClick={() => back(3)}>{t("shinex.review")}</button>
          </div>}
        </div></div>
        {features}
      </div>
      <aside className={s.summary} aria-label={t("shinex.summary")}>
        <div className={s.desktopSummary}><h2>{t("shinex.current")}</h2>{summary}</div>
        <Collapsible.Root className={s.mobileSummary}><Collapsible.Trigger className={s.summaryTrigger}>{t("shinex.summary")}<span>{SHINEX_PRICES[draft.car]} {t("shinex.currency")}</span><ChevronDown size={20} aria-hidden="true" /></Collapsible.Trigger><Collapsible.Panel>{summary}</Collapsible.Panel></Collapsible.Root>
      </aside>
    </div>
    <p className={s.session}>{t("shinex.session_note")}</p>
  </section></DirectionProvider>;
}
