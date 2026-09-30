import { useState, type MouseEvent } from "react";
import {
  coverageOptions,
  formatDate,
  formatTime,
  getSubtotal,
  getTint,
  isRequestTimeValid,
  speedCar,
  type BookingDraft,
} from "../../_data/services";
import { createWhatsAppUrl } from "../../_lib/whatsapp";
import { ArrowIcon } from "../icons";
import s from "../../speedcar.module.css";

type Props = {
  draft: BookingDraft;
  onEdit: (step: number) => void;
  onReset: () => void;
};
export function SummaryStep({ draft, onEdit, onReset }: Props) {
  const [error, setError] = useState("");
  const tint = getTint(draft.tint);
  const subtotal = getSubtotal(draft);
  const url = createWhatsAppUrl(draft);
  function validate(event: MouseEvent<HTMLAnchorElement>) {
    const fresh = createWhatsAppUrl(draft);
    if (!fresh) {
      event.preventDefault();
      setError(
        isRequestTimeValid(draft.date, draft.time)
          ? "راجع بيانات السيارة والتواصل قبل الإرسال."
          : "الوقت المختار مضى. عدّل الموعد قبل الإرسال.",
      );
      return;
    }
    event.currentTarget.href = fresh;
    setError("");
  }
  return (
    <>
      <div className={s.stepHeading}>
        <p className={s.eyebrow} dir="ltr">
          05 / READY FOR THE TEAM
        </p>
        <h2 data-step-heading tabIndex={-1}>
          طلبك، بكل تفاصيله.
        </h2>
        <p>راجع الاختيارات. سيفتح واتساب برسالة جاهزة لإرسالها.</p>
      </div>
      <div className={s.receipt}>
        <div className={s.receiptHeader}>
          <span dir="ltr">
            <strong>SPEED CAR JO</strong>
            <small>WINDOW FILM / APPOINTMENT REQUEST</small>
          </span>
          <span className={s.receiptIcon}>↖</span>
        </div>
        <dl className={s.receiptRows}>
          <div>
            <dt>التظليل</dt>
            <dd>
              {tint.name}
              <small>كفالة {tint.warranty} وفق شروط المركز</small>
            </dd>
          </div>
          <div>
            <dt>التغطية</dt>
            <dd>
              {coverageOptions
                .filter((item) => draft.coverage.includes(item.id))
                .map((item) => item.name)
                .join(" + ")}
            </dd>
          </div>
          <div className={s.receiptTotal}>
            <dt>السعر الأساسي</dt>
            <dd>
              <strong>{subtotal ?? "—"}</strong>
              <span>دينار</span>
            </dd>
          </div>
          <div>
            <dt>السيارة</dt>
            <dd>{draft.carModel}</dd>
          </div>
          <div>
            <dt>اليوم المفضّل</dt>
            <dd>{formatDate(draft.date)}</dd>
          </div>
          <div>
            <dt>الوقت المفضّل</dt>
            <dd>{formatTime(draft.time)}</dd>
          </div>
          <div>
            <dt>الاسم</dt>
            <dd>{draft.name}</dd>
          </div>
          <div>
            <dt>رقم التواصل</dt>
            <dd dir="ltr">{draft.phone}</dd>
          </div>
        </dl>
        <p className={s.finePrint}>{speedCar.surchargeNote}</p>
      </div>
      <p className={s.summaryNote}>
        الموعد والسعر النهائي يؤكدهما المركز. بعد فتح واتساب، اضغط «إرسال» داخل
        المحادثة.
      </p>
      {error && (
        <p className={s.fieldError} role="alert">
          {error}
        </p>
      )}
      <div className={s.summaryActions}>
        <button
          type="button"
          className={s.textButton}
          onClick={() => onEdit(2)}
        >
          تعديل بياناتي
        </button>
        <button
          type="button"
          className={s.textButton}
          onClick={() => onEdit(3)}
        >
          تعديل الموعد
        </button>
      </div>
      <div className={s.stepFooter}>
        <button type="button" className={s.textButton} onClick={onReset}>
          طلب جديد
        </button>
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={validate}
            className={s.primaryButton}
          >
            افتح واتساب لإرسال الطلب
            <ArrowIcon />
          </a>
        ) : (
          <button
            type="button"
            className={s.primaryButton}
            onClick={() => onEdit(3)}
          >
            راجع الموعد والبيانات
            <ArrowIcon />
          </button>
        )}
      </div>
    </>
  );
}
