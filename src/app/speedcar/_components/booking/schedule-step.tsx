import { useEffect, useState } from "react";
import {
  getRequestDays,
  isRequestTimeValid,
  formatTime,
  preferredTimes,
  speedCar,
  type BookingDraft,
} from "../../_data/services";
import { ArrowIcon } from "../icons";
import s from "../../speedcar.module.css";

type Props = {
  draft: BookingDraft;
  onChange: (patch: Partial<BookingDraft>) => void;
  onNext: () => void;
  onBack: () => void;
};
export function ScheduleStep({ draft, onChange, onNext, onBack }: Props) {
  const [now, setNow] = useState(() => new Date());
  const [error, setError] = useState("");
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30000);
    return () => window.clearInterval(timer);
  }, []);
  const days = getRequestDays(now);
  const valid = isRequestTimeValid(draft.date, draft.time, now);
  function next() {
    if (!isRequestTimeValid(draft.date, draft.time)) {
      setNow(new Date());
      setError("اختر وقتًا لم يمضِ بعد.");
      return;
    }
    setError("");
    onNext();
  }
  return (
    <>
      <div className={s.stepHeading}>
        <p className={s.eyebrow} dir="ltr">
          04 / YOUR PREFERRED TIME
        </p>
        <h2 data-step-heading tabIndex={-1}>
          متى يناسبك تمرّ؟
        </h2>
        <p>الدوام {speedCar.hours}. الفريق يؤكد توفر الموعد.</p>
      </div>
      <div className={s.dateStrip} role="group" aria-label="اختر اليوم">
        {days.map((day) => (
          <button
            key={day.value}
            type="button"
            aria-pressed={draft.date === day.value}
            aria-label={`${day.day} ${day.number} ${day.month}`}
            className={`${s.dateOption} ${draft.date === day.value ? s.dateActive : ""}`}
            onClick={() => {
              onChange({ date: day.value, time: "" });
              setError("");
            }}
          >
            <span>{day.day}</span>
            <strong>{day.number}</strong>
            <small>{day.month}</small>
          </button>
        ))}
      </div>
      <div className={s.timeHeading}>
        <p className={s.eyebrow} dir="ltr">
          PREFERRED TIME
        </p>
        <span>بتوقيت عمّان</span>
      </div>
      <div className={s.timeGrid} role="group" aria-label="اختر الوقت">
        {preferredTimes.map((time) => (
          <button
            key={time}
            type="button"
            disabled={!isRequestTimeValid(draft.date, time, now)}
            aria-pressed={draft.time === time}
            className={`${s.timeOption} ${draft.time === time ? s.timeActive : ""}`}
            onClick={() => {
              onChange({ time });
              setError("");
            }}
          >
            {formatTime(time)}
          </button>
        ))}
      </div>
      {!draft.date && <p className={s.smallNote}>اختر اليوم أولًا.</p>}
      <div className={s.scheduleNote}>
        <span className={s.locationDot} />
        <p>
          هذه أوقات مفضّلة لطلب الحجز، وليست مواعيد مؤكدة أو جدول توفر مباشر.
        </p>
      </div>
      {error && (
        <p role="alert" className={s.fieldError}>
          {error}
        </p>
      )}
      <div className={s.stepFooter}>
        <button type="button" className={s.textButton} onClick={onBack}>
          رجوع
        </button>
        <button
          type="button"
          className={s.primaryButton}
          disabled={!valid}
          onClick={next}
        >
          راجع طلبك
          <ArrowIcon />
        </button>
      </div>
    </>
  );
}
