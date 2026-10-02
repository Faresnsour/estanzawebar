"use client";
import { source } from "@/i18n/messages";
import { useI18n } from "@/i18n/LocaleProvider";
import { useEffect, useState } from "react";
import { getRequestDays, isRequestTimeValid, requestTimes, formatTime, type StepProps, } from "../../_data/packages";
import s from "../../auto-spa.module.css";
export function DateStep({ draft, onChange, onNext, onBack, }: StepProps) {
    const { t: tr, locale } = useI18n();
    const [now, setNow] = useState(() => new Date());
    const [error, setError] = useState("");
    useEffect(() => {
        const timer = window.setInterval(() => setNow(new Date()), 30000);
        return () => window.clearInterval(timer);
    }, []);
    const days = getRequestDays(now, locale);
    const valid = isRequestTimeValid(draft.date, draft.time, now);
    function continueBooking() {
        if (!isRequestTimeValid(draft.date, draft.time)) {
            setError(source("autoSpa.choose_a_date_and_time_that_haven"));
            setNow(new Date());
            return;
        }
        setError("");
        onNext();
    }
    return (<>
      <div className={s.stepHeading}>
        <p className={s.eyebrow} dir="ltr">03 / YOUR PREFERRED TIME</p>
        <h2 data-step-heading tabIndex={-1}>{tr("autoSpa.when_suits_you")}</h2>
        <p>{tr("autoSpa.choose_your_preferred_appointment_the_team_confirms")}</p>
      </div>

      <div className={s.dateStrip} role="group" aria-label={tr("centre.choose_a_day")}>
        {days.map((day) => (<button key={day.value} type="button" className={`${s.dateOption} ${draft.date === day.value ? s.selectedDate : ""}`} aria-pressed={draft.date === day.value} aria-label={tr(`${day.day} ${day.number} ${day.month}`)} onClick={() => {
                setError("");
                onChange({ date: day.value, time: "" });
            }}>
            <span>{tr(day.day)}</span>
            <strong>{tr(day.number)}</strong>
            <span>{tr(day.month)}</span>
          </button>))}
      </div>

      <div className={s.timeHeading}>
        <p className={s.eyebrow} dir="ltr">PREFERRED TIMES</p>
        <span className={s.smallNote}>{tr("autoSpa.muscat_time")}</span>
      </div>

      <div className={s.timeGrid} role="group" aria-label={tr("autoSpa.choose_a_time")}>
        {requestTimes.map((time) => {
            const enabled = !!draft.date && isRequestTimeValid(draft.date, time, now);
            return (<button key={time} type="button" disabled={!enabled} className={`${s.timeOption} ${draft.time === time ? s.selectedTime : ""}`} aria-pressed={draft.time === time} onClick={() => {
                    setError("");
                    onChange({ time });
                }}>
              <span>{tr(formatTime(time, locale))}</span>
            </button>);
        })}
      </div>

      {tr(!draft.date && (<p className={s.smallNote}>{tr("autoSpa.choose_a_day_to_see_the_available")}</p>))}

      <p className={s.fieldError} role="status">{tr(error)}</p>

      <div className={s.stepFooter}>
        <button type="button" className={s.textButton} onClick={onBack}>{tr("autoSpa.back")}</button>

        <button type="button" className={s.primaryButton} disabled={!valid} onClick={continueBooking}>{tr("autoSpa.contact_details")}{" "}<span aria-hidden="true">↗</span>
        </button>
      </div>
    </>);
}
