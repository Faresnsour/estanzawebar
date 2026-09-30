import {
  tintServices,
  getTint,
  type BookingDraft,
  type TintId,
} from "../../_data/services";
import { ArrowIcon } from "../icons";
import s from "../../speedcar.module.css";

export function TintStep({
  draft,
  onSelect,
  onNext,
}: {
  draft: BookingDraft;
  onSelect: (id: TintId) => void;
  onNext: () => void;
}) {
  const tint = getTint(draft.tint);
  return (
    <>
      <div className={s.stepHeading}>
        <p className={s.eyebrow} dir="ltr">
          01 / CHOOSE YOUR FILM
        </p>
        <h2 data-step-heading tabIndex={-1}>
          الراحة تبدأ من هنا.
        </h2>
        <p>اختر نوع التظليل. يمكنك تغييره قبل إرسال الطلب.</p>
      </div>
      <div className={s.bookingTintList}>
        {tintServices.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`${s.bookingTint} ${draft.tint === item.id ? s.bookingTintActive : ""}`}
            aria-pressed={draft.tint === item.id}
            onClick={() => onSelect(item.id)}
          >
            <span className={s.index}>{item.number}</span>
            <span>
              <strong dir="ltr">{item.english}</strong>
              <small>{item.name}</small>
              <em>
                عزل {item.id === "original-3m" ? "حتى " : ""}
                {item.heat}% · كفالة {item.warranty}
              </em>
            </span>
            <span className={s.tintRowPrice}>
              <strong>{item.prices["four-windows"]}</strong>
              <small>د.أ / 4 شبابيك</small>
            </span>
            <span className={s.checkCircle}>
              {draft.tint === item.id ? "✓" : ""}
            </span>
          </button>
        ))}
      </div>
      <p className={s.finePrint}>
        الأرقام وشروط الكفالة وفق بيانات المركز. سعر الأمامي والخلفي منفصل.
      </p>
      <div className={s.stepFooter}>
        <span className={s.smallNote}>اختيارك: {tint.shortName}</span>
        <button className={s.primaryButton} type="button" onClick={onNext}>
          حدّد الزجاج
          <ArrowIcon />
        </button>
      </div>
    </>
  );
}
