import { useEffect, useState } from "react";

import {
  getRequestDays,
  isRequestTimeValid,
  requestTimes,
  formatTime,
  type StepProps,
} from "../../_data/packages";

import s from "../../auto-spa.module.css";

export function DateStep({
  draft,
  onChange,
  onNext,
  onBack,
}: StepProps) {
  const [now, setNow] = useState(() => new Date());
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  const days = getRequestDays(now);
  const valid = isRequestTimeValid(draft.date, draft.time, now);

  function continueBooking() {
    if (!isRequestTimeValid(draft.date, draft.time)) {
      setError("اختر يومًا ووقتًا لم يمضِ بعد.");
      setNow(new Date());
      return;
    }

    setError("");
    onNext();
  }

  return (
    <>
      <div className={s.stepHeading}>
        <p className={s.eyebrow} dir="ltr">03 / YOUR PREFERRED TIME</p>
        <h2 data-step-heading tabIndex={-1}>متى يناسبك؟</h2>
        <p>اختر موعدًا مفضّلًا. يؤكد الفريق التوفر بعد إرسال الطلب.</p>
      </div>

      <div className={s.dateStrip} role="group" aria-label="اختر اليوم">
        {days.map((day) => (
          <button
            key={day.value}
            type="button"
            className={`${s.dateOption} ${
              draft.date === day.value ? s.selectedDate : ""
            }`}
            aria-pressed={draft.date === day.value}
            aria-label={`${day.day} ${day.number} ${day.month}`}
            onClick={() => {
              setError("");
              onChange({ date: day.value, time: "" });
            }}
          >
            <span>{day.day}</span>
            <strong>{day.number}</strong>
            <span>{day.month}</span>
          </button>
        ))}
      </div>

      <div className={s.timeHeading}>
        <p className={s.eyebrow} dir="ltr">PREFERRED TIMES</p>
        <span className={s.smallNote}>بتوقيت مسقط</span>
      </div>

      <div className={s.timeGrid} role="group" aria-label="اختر الوقت">
        {requestTimes.map((time) => {
          const enabled =
            !!draft.date && isRequestTimeValid(draft.date, time, now);

          return (
            <button
              key={time}
              type="button"
              disabled={!enabled}
              className={`${s.timeOption} ${
                draft.time === time ? s.selectedTime : ""
              }`}
              aria-pressed={draft.time === time}
              onClick={() => {
                setError("");
                onChange({ time });
              }}
            >
              <span>{formatTime(time)}</span>
            </button>
          );
        })}
      </div>

      {!draft.date && (
        <p className={s.smallNote}>اختر اليوم أولًا لعرض الأوقات القابلة للطلب.</p>
      )}

      <p className={s.fieldError} role="status">{error}</p>

      <div className={s.stepFooter}>
        <button type="button" className={s.textButton} onClick={onBack}>
          رجوع
        </button>

        <button
          type="button"
          className={s.primaryButton}
          disabled={!valid}
          onClick={continueBooking}
        >
          بيانات التواصل <span aria-hidden="true">↗</span>
        </button>
      </div>
    </>
  );
}