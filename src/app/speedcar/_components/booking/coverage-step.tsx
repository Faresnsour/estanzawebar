import {
  coverageOptions,
  getSubtotal,
  getTint,
  speedCar,
  type BookingDraft,
  type CoverageId,
} from "../../_data/services";
import { CarDiagram } from "./car-diagram";
import { ArrowIcon } from "../icons";
import s from "../../speedcar.module.css";

type Props = {
  draft: BookingDraft;
  onChange: (patch: Partial<BookingDraft>) => void;
  onNext: () => void;
  onBack: () => void;
};
export function CoverageStep({ draft, onChange, onNext, onBack }: Props) {
  const tint = getTint(draft.tint);
  const total = getSubtotal(draft);
  const unavailable = coverageOptions
    .filter((item) => tint.prices[item.id] === null)
    .map((item) => item.id);
  function toggle(id: CoverageId) {
    if (unavailable.includes(id)) return;
    onChange({
      coverage: draft.coverage.includes(id)
        ? draft.coverage.filter((value) => value !== id)
        : [...draft.coverage, id],
    });
  }
  return (
    <>
      <div className={s.stepHeading}>
        <p className={s.eyebrow} dir="ltr">
          02 / DEFINE YOUR COVERAGE
        </p>
        <h2 data-step-heading tabIndex={-1}>
          وين بدك الفرق؟
        </h2>
        <p>اختر جزءًا أو أكثر. سعر الأمامي والخلفي لكل قطعة.</p>
      </div>
      <div className={s.coverageLayout}>
        <CarDiagram
          selected={draft.coverage}
          unavailable={unavailable}
          onToggle={toggle}
        />
        <div className={s.coverageList}>
          {coverageOptions.map((item) => (
            <button
              key={item.id}
              type="button"
              disabled={unavailable.includes(item.id)}
              aria-pressed={draft.coverage.includes(item.id)}
              className={`${s.coverageOption} ${draft.coverage.includes(item.id) ? s.coverageActive : ""}`}
              onClick={() => toggle(item.id)}
            >
              <span>
                <strong>{item.name}</strong>
                <small>{item.detail}</small>
              </span>
              <span>
                {tint.prices[item.id] === null ? (
                  <small>السعر غير مذكور</small>
                ) : (
                  <strong>
                    {tint.prices[item.id]} <small>د.أ</small>
                  </strong>
                )}
              </span>
              <span className={s.checkCircle}>
                {draft.coverage.includes(item.id) ? "✓" : ""}
              </span>
            </button>
          ))}
          {unavailable.length > 0 && (
            <p className={s.finePrint}>
              سعر الأمامي والخلفي للسيراميك يؤكد عبر المركز:{" "}
              <a href={`tel:${speedCar.phone}`}>{speedCar.phone}</a>.
            </p>
          )}
          <div className={s.glassSizeField}>
            <label htmlFor="sc-glass-size">قياس الزجاج</label>
            <select
              id="sc-glass-size"
              value={draft.glassSize}
              onChange={(event) =>
                onChange({
                  glassSize: event.target.value as BookingDraft["glassSize"],
                })
              }
            >
              <option value="unknown">غير متأكد — يقيّمه المركز</option>
              <option value="standard">حتى 50 سم بحسب تقديري</option>
              <option value="oversize">قد يتجاوز 50 سم</option>
            </select>
            <p>{speedCar.surchargeNote}</p>
          </div>
        </div>
      </div>
      <div className={s.stepFooter}>
        <button type="button" className={s.textButton} onClick={onBack}>
          رجوع
        </button>
        <button
          type="button"
          className={s.primaryButton}
          disabled={total === null}
          onClick={onNext}
        >
          بيانات السيارة
          <ArrowIcon />
        </button>
      </div>
    </>
  );
}
