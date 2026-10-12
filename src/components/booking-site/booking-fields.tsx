"use client";
import { useI18n } from "@/i18n/LocaleProvider";
import { DEMO_SERVICES, DEMO_TIMES, demoDates, type BookingDraft, type BookingErrors } from "@/lib/booking-request-demo";
import BookingSelect from "./booking-select";
import s from "./booking-site.module.css";
export function useBookingFormat() {
  const { locale } = useI18n();
  const language = locale === "en" ? "en-GB" : "ar-JO";
  return {
    day: (value: string, options: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "long" }) => new Intl.DateTimeFormat(language, { ...options, timeZone: "UTC" }).format(new Date(`${value}T12:00:00Z`)),
    time: (value: string) => new Intl.DateTimeFormat(language, { hour: "numeric", minute: "2-digit", timeZone: "UTC" }).format(new Date(`2030-01-01T${value}:00Z`)),
  };
}
export function ScheduleFields({ draft, today, errors, onEdit, compact = false, disabled = false }: {
  draft: BookingDraft; today: string; errors: BookingErrors; onEdit: (field: keyof BookingDraft, value: string) => void; compact?: boolean; disabled?: boolean;
}) {
  const { t } = useI18n(); const f = useBookingFormat(); const prefix = compact ? "hero" : "booking";
  const dates = demoDates(today);
  const error = (field: keyof BookingDraft) => errors[field] ? <span className={s.error} id={`${prefix}-${field}-error`}>{t(errors[field]!)}</span> : null;
  return <fieldset disabled={disabled} className={s.scheduleFields}>
    <legend className={s.srOnly}>{t("bookingSite.step_1")}</legend>
    {compact ? <fieldset className={s.days} aria-describedby={errors.date ? `${prefix}-date-error` : undefined}>
      <legend className={s.srOnly}>{t("bookingSite.date")}</legend>
      {dates.map(date => <label key={date} className={s.dayChoice}>
        <input type="radio" name={`${prefix}-date`} value={date} checked={draft.date === date} onChange={() => onEdit("date", date)} aria-label={f.day(date)} data-invalid={!!errors.date} />
        <span><small>{f.day(date, { weekday: "short" })}</small><strong>{f.day(date, { day: "numeric" })}</strong><small>{f.day(date, { month: "short" })}</small></span>
      </label>)}{error("date")}
    </fieldset> : null}
    <BookingSelect id={`${prefix}-service`} name="service" label={t("bookingSite.service")} value={draft.service}
      items={DEMO_SERVICES.map(service => ({ value: service, label: t(`bookingSite.${service}`) }))}
      error={errors.service ? t(errors.service) : undefined} disabled={disabled} onChange={value => onEdit("service", value)} />
    {!compact ? <BookingSelect id={`${prefix}-date`} name="date" label={t("bookingSite.date")} value={dates.includes(draft.date) ? draft.date : ""}
      items={[...(!dates.includes(draft.date) ? [{ value: "", label: t("bookingSite.error_date") }] : []), ...dates.map(date => ({ value: date, label: f.day(date) }))]}
      error={errors.date ? t(errors.date) : undefined} disabled={disabled} onChange={value => onEdit("date", value)} /> : null}
    <fieldset className={s.times} aria-describedby={errors.time ? `${prefix}-time-error` : undefined}>
      <legend>{t("bookingSite.time")}</legend>
      {DEMO_TIMES.map(time => <label key={time} className={s.timeChoice}>
        <input type="radio" name={`${prefix}-time`} value={time} checked={draft.time === time} onChange={() => onEdit("time", time)} data-invalid={!!errors.time} />
        <span>{f.time(time)}</span>
      </label>)}{error("time")}
    </fieldset>
  </fieldset>;
}
export function BookingSummary({ draft }: { draft: BookingDraft }) {
  const { t } = useI18n(); const f = useBookingFormat();
  return <dl className={s.requestDetails}>
    <div><dt>{t("bookingSite.service")}</dt><dd>{t(`bookingSite.${draft.service}`)}</dd></div>
    <div><dt>{t("bookingSite.date")}</dt><dd>{f.day(draft.date)}</dd></div>
    <div><dt>{t("bookingSite.time")}</dt><dd>{f.time(draft.time)}</dd></div>
    <div><dt>{t("bookingSite.field_name")}</dt><dd><bdi>{draft.name || t("bookingSite.not_entered")}</bdi></dd></div>
    <div><dt>{t("bookingSite.field_phone")}</dt><dd>{draft.phone ? <bdi dir="ltr">{draft.phone}</bdi> : t("bookingSite.not_entered")}</dd></div>
  </dl>;
}
