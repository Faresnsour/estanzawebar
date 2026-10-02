"use client";
import { source } from "@/i18n/messages";
import { useI18n } from "@/i18n/LocaleProvider";
import { useEffect, useState } from "react";
import { getRequestDays, isRequestTimeValid, formatTime, preferredTimes, speedCar, type BookingDraft, } from "../../_data/services";
import { ArrowIcon } from "../icons";
import s from "../../speedcar.module.css";
type Props = {
    draft: BookingDraft;
    onChange: (patch: Partial<BookingDraft>) => void;
    onNext: () => void;
    onBack: () => void;
};
export function ScheduleStep({ draft, onChange, onNext, onBack }: Props) {
    const { t: tr, locale } = useI18n();
    const [now, setNow] = useState(() => new Date());
    const [error, setError] = useState("");
    useEffect(() => {
        const timer = window.setInterval(() => setNow(new Date()), 30000);
        return () => window.clearInterval(timer);
    }, []);
    const days = getRequestDays(now, locale);
    const valid = isRequestTimeValid(draft.date, draft.time, now);
    function next() {
        if (!isRequestTimeValid(draft.date, draft.time)) {
            setNow(new Date());
            setError(source("speedCar.choose_a_time_that_hasn_t_passed"));
            return;
        }
        setError("");
        onNext();
    }
    return (<>
      <div className={s.stepHeading}>
        <p className={s.eyebrow} dir="ltr">
          04 / YOUR PREFERRED TIME
        </p>
        <h2 data-step-heading tabIndex={-1}>{tr("speedCar.when_would_you_like_to_visit")}</h2>
        <p>{tr("speedCar.opening_hours")}{" "}{tr(speedCar.hours)}{tr("speedCar.the_team_confirms_availability")}</p>
      </div>
      <div className={s.dateStrip} role="group" aria-label={tr("centre.choose_a_day")}>
        {days.map((day) => (<button key={day.value} type="button" aria-pressed={draft.date === day.value} aria-label={tr(`${day.day} ${day.number} ${day.month}`)} className={`${s.dateOption} ${draft.date === day.value ? s.dateActive : ""}`} onClick={() => {
                onChange({ date: day.value, time: "" });
                setError("");
            }}>
            <span>{tr(day.day)}</span>
            <strong>{tr(day.number)}</strong>
            <small>{tr(day.month)}</small>
          </button>))}
      </div>
      <div className={s.timeHeading}>
        <p className={s.eyebrow} dir="ltr">
          PREFERRED TIME
        </p>
        <span>{tr("speedCar.amman_time")}</span>
      </div>
      <div className={s.timeGrid} role="group" aria-label={tr("autoSpa.choose_a_time")}>
        {preferredTimes.map((time) => (<button key={time} type="button" disabled={!isRequestTimeValid(draft.date, time, now)} aria-pressed={draft.time === time} className={`${s.timeOption} ${draft.time === time ? s.timeActive : ""}`} onClick={() => {
                onChange({ time });
                setError("");
            }}>
            {tr(formatTime(time, locale))}
          </button>))}
      </div>
      {tr(!draft.date && <p className={s.smallNote}>{tr("speedCar.please_choose_a_day_first")}</p>)}
      <div className={s.scheduleNote}>
        <span className={s.locationDot}/>
        <p>{tr("speedCar.these_are_preferred_request_times_not_confirmed")}</p>
      </div>
      {tr(error && (<p role="alert" className={s.fieldError}>
          {tr(error)}
        </p>))}
      <div className={s.stepFooter}>
        <button type="button" className={s.textButton} onClick={onBack}>{tr("autoSpa.back")}</button>
        <button type="button" className={s.primaryButton} disabled={!valid} onClick={next}>{tr("speedCar.review_your_request")}<ArrowIcon />
        </button>
      </div>
    </>);
}
