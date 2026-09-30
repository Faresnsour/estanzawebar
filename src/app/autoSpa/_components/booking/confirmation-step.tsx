import { useState, type MouseEvent } from "react";

import {
  brand,
  formatDate,
  formatTime,
  getPackage,
  getPrice,
  getVehicle,
  isRequestTimeValid,
  type BookingDraft,
} from "../../_data/packages";

import {
  createWhatsAppUrl,
  hasWhatsAppNumber,
} from "../../_lib/whatsapp";

import s from "../../auto-spa.module.css";

type Props = {
  draft: BookingDraft;
  onBack: () => void;
  onReset: () => void;
  onEditSchedule: () => void;
};

export function ConfirmationStep({
  draft,
  onBack,
  onReset,
  onEditSchedule,
}: Props) {
  const [error, setError] = useState("");

  const selectedPackage = getPackage(draft.packageId);
  const selectedVehicle = getVehicle(draft.vehicle);
  const price = getPrice(draft);
  const whatsappReady = hasWhatsAppNumber();
  const url = createWhatsAppUrl(draft);

  function validateBeforeOpening(event: MouseEvent<HTMLAnchorElement>) {
    if (!isRequestTimeValid(draft.date, draft.time)) {
      event.preventDefault();
      setError("الوقت المختار مضى. عدّل الموعد قبل إرسال الطلب.");
      return;
    }

    const freshUrl = createWhatsAppUrl(draft);

    if (!freshUrl) {
      event.preventDefault();
      setError("راجع بيانات الطلب ورقم التواصل قبل المتابعة.");
      return;
    }

    // تحديث الرابط لحظة الضغط بعد إعادة التحقق من الوقت.
    event.currentTarget.href = freshUrl;
    setError("");
  }

  return (
    <>
      <div className={s.stepHeading}>
        <p className={s.eyebrow} dir="ltr">YOUR CARE REQUEST</p>
        <h2 data-step-heading tabIndex={-1}>كل التفاصيل أمامك.</h2>
        <p>راجع الطلب، ثم افتح واتساب لإرساله إلى المركز.</p>
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
            <dt>السيارة</dt>
            <dd>
              {selectedVehicle?.title}
              {draft.carModel && <span>{draft.carModel}</span>}
            </dd>
          </div>

          <div>
            <dt>العناية</dt>
            <dd>{selectedPackage?.title}</dd>
          </div>

          <div className={s.summaryPriceRow}>
            <dt>{brand.demoPricing ? "السعر التجريبي" : "السعر"}</dt>
            <dd>
              <strong>{price ?? "—"}</strong>
              <span>ريال عُماني</span>
            </dd>
          </div>

          <div>
            <dt>اليوم المطلوب</dt>
            <dd>{formatDate(draft.date)}</dd>
          </div>

          <div>
            <dt>الوقت المطلوب</dt>
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

        <p className={s.receiptNote}>
          {brand.demoPricing
            ? "الأسعار والبنود تجريبية. يؤكد المركز السعر والخدمة وتوفر الموعد."
            : "يراجع المركز الطلب ويؤكد توفر الموعد وتفاصيل الخدمة."}
        </p>
      </div>

      {!whatsappReady && (
        <p className={s.demoNotice} role="status">
          إرسال الطلب غير متاح حاليًا. يمكنك التواصل مع المركز عبر حسابه.
        </p>
      )}

      <p className={s.fieldError} role="status">{error}</p>

      {error && (
        <button
          type="button"
          className={s.textButton}
          onClick={onEditSchedule}
        >
          تعديل الموعد
        </button>
      )}

      <div className={s.stepFooter}>
        <button type="button" className={s.textButton} onClick={onBack}>
          تعديل بياناتي
        </button>

        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={s.primaryButton}
            onClick={validateBeforeOpening}
          >
            افتح واتساب لإرسال الطلب
            <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <button
            type="button"
            className={s.primaryButton}
            disabled
          >
            إرسال الطلب عبر واتساب
            <span aria-hidden="true">↗</span>
          </button>
        )}
      </div>

      <div className={s.summaryBottom}>
        <button type="button" className={s.textButton} onClick={onReset}>
          بدء طلب جديد
        </button>

        <a
          href={brand.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={s.textLink}
        >
          حساب المركز ↗
        </a>
      </div>
    </>
  );
}