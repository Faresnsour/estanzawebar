import { useState, type FormEvent } from "react";
import { normalizePhone, type BookingDraft } from "../../_data/services";
import { ArrowIcon } from "../icons";
import s from "../../speedcar.module.css";

type Props = {
  draft: BookingDraft;
  onChange: (patch: Partial<BookingDraft>) => void;
  onNext: () => void;
  onBack: () => void;
};
export function VehicleStep({ draft, onChange, onNext, onBack }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (draft.carModel.trim().length < 2)
      next.carModel = "اكتب نوع السيارة وموديلها.";
    if (draft.name.trim().length < 2)
      next.name = "اكتب اسمك من حرفين على الأقل.";
    const phone = normalizePhone(draft.phone);
    if (!phone)
      next.phone = "اكتب رقمًا أردنيًا صحيحًا أو رقمًا دوليًا يبدأ بـ +.";
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(`sc-${Object.keys(next)[0]}`)?.focus();
      return;
    }
    onChange({
      carModel: draft.carModel.trim(),
      name: draft.name.trim(),
      phone,
    });
    onNext();
  }
  return (
    <>
      <div className={s.stepHeading}>
        <p className={s.eyebrow} dir="ltr">
          03 / YOUR CAR, YOUR DETAILS
        </p>
        <h2 data-step-heading tabIndex={-1}>
          نتعرّف على سيارتك.
        </h2>
        <p>ثلاث معلومات لتجهيز طلب واضح للفريق.</p>
      </div>
      <form className={s.detailsForm} onSubmit={submit} noValidate>
        <div className={s.formField}>
          <label htmlFor="sc-carModel">السيارة والموديل</label>
          <input
            id="sc-carModel"
            name="carModel"
            maxLength={80}
            value={draft.carModel}
            placeholder="مثل: Kia Sportage 2022"
            required
            aria-invalid={!!errors.carModel}
            aria-describedby={errors.carModel ? "sc-carModel-error" : undefined}
            onChange={(event) => onChange({ carModel: event.target.value })}
          />
          {errors.carModel && (
            <p id="sc-carModel-error" className={s.fieldError} role="alert">
              {errors.carModel}
            </p>
          )}
        </div>
        <div className={s.formRow}>
          <div className={s.formField}>
            <label htmlFor="sc-name">اسمك</label>
            <input
              id="sc-name"
              name="name"
              autoComplete="name"
              maxLength={80}
              value={draft.name}
              placeholder="الاسم"
              required
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "sc-name-error" : undefined}
              onChange={(event) => onChange({ name: event.target.value })}
            />
            {errors.name && (
              <p id="sc-name-error" className={s.fieldError} role="alert">
                {errors.name}
              </p>
            )}
          </div>
          <div className={s.formField}>
            <label htmlFor="sc-phone">رقم التواصل</label>
            <input
              id="sc-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              dir="ltr"
              maxLength={30}
              value={draft.phone}
              placeholder="07XXXXXXXX"
              required
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "sc-phone-error" : undefined}
              onChange={(event) => onChange({ phone: event.target.value })}
            />
            {errors.phone && (
              <p id="sc-phone-error" className={s.fieldError} role="alert">
                {errors.phone}
              </p>
            )}
          </div>
        </div>
        <p className={s.privacyNote}>
          بياناتك تضاف إلى رسالة واتساب عند اختيار إرسال الطلب. لا يوجد دفع
          إلكتروني في هذه الخطوة.
        </p>
        <div className={s.stepFooter}>
          <button type="button" className={s.textButton} onClick={onBack}>
            رجوع
          </button>
          <button type="submit" className={s.primaryButton}>
            اختر الوقت
            <ArrowIcon />
          </button>
        </div>
      </form>
    </>
  );
}
