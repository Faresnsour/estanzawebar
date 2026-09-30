import { useState, type FormEvent } from "react";

import {
  normalizePhone,
  type StepProps,
} from "../../_data/packages";

import s from "../../auto-spa.module.css";

export function CustomerStep({
  draft,
  onChange,
  onNext,
  onBack,
}: StepProps) {
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
  }>({});

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = draft.name.trim();
    const phone = normalizePhone(draft.phone);
    const nextErrors: typeof errors = {};

    if (name.length < 2 || name.length > 80) {
      nextErrors.name = "اكتب اسمًا بين حرفين و80 حرفًا.";
    }

    if (!phone) {
      nextErrors.phone =
        "اكتب رقمًا عُمانيًا صحيحًا، أو رقمًا دوليًا يبدأ بـ + ورمز الدولة.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    onChange({
      name,
      phone,
      carModel: draft.carModel.trim(),
    });

    onNext();
  }

  return (
    <>
      <div className={s.stepHeading}>
        <p className={s.eyebrow} dir="ltr">04 / A WAY TO REACH YOU</p>
        <h2 data-step-heading tabIndex={-1}>كيف يتواصل معك الفريق؟</h2>
        <p>بيانات بسيطة لتجهيز الطلب ومراجعة تفاصيله معك.</p>
      </div>

      <form className={s.customerForm} onSubmit={submit} noValidate>
        <div className={s.formField}>
          <label htmlFor="autospa-name">اسمك</label>

          <input
            id="autospa-name"
            name="name"
            autoComplete="name"
            placeholder="الاسم"
            value={draft.name}
            maxLength={80}
            required
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "autospa-name-error" : undefined}
            onChange={(event) => onChange({ name: event.target.value })}
          />

          {errors.name && (
            <p id="autospa-name-error" className={s.fieldError} role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div className={s.formField}>
          <label htmlFor="autospa-phone">رقم التواصل</label>

          <input
            id="autospa-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            dir="ltr"
            autoComplete="tel"
            placeholder="+968"
            value={draft.phone}
            maxLength={30}
            required
            aria-invalid={!!errors.phone}
            aria-describedby={
              errors.phone ? "autospa-phone-error" : "autospa-phone-hint"
            }
            onChange={(event) => onChange({ phone: event.target.value })}
          />

          {errors.phone ? (
            <p id="autospa-phone-error" className={s.fieldError} role="alert">
              {errors.phone}
            </p>
          ) : (
            <p id="autospa-phone-hint" className={s.smallNote}>
              الرقم العُماني يُقبل دون رمز الدولة.
            </p>
          )}
        </div>

        <div className={s.formField}>
          <label htmlFor="autospa-model">
            موديل السيارة <span className={s.optional}>اختياري</span>
          </label>

          <input
            id="autospa-model"
            name="carModel"
            placeholder="مثل Toyota Camry"
            value={draft.carModel}
            maxLength={80}
            onChange={(event) => onChange({ carModel: event.target.value })}
          />
        </div>

        <p className={s.privacyNote}>
          تُضاف هذه البيانات إلى رسالة واتساب فقط عند اختيار إرسال الطلب.
        </p>

        <div className={s.stepFooter}>
          <button type="button" className={s.textButton} onClick={onBack}>
            رجوع
          </button>

          <button type="submit" className={s.primaryButton}>
            راجع الطلب <span aria-hidden="true">↗</span>
          </button>
        </div>
      </form>
    </>
  );
}