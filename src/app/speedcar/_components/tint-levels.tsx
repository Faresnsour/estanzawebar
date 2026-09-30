"use client";
import { useState } from "react";
import { getTint, tintServices, type TintId } from "../_data/services";
import { BookButton } from "./booking/booking-flow";
import { ArrowIcon, ShieldIcon, SunIcon } from "./icons";
import s from "../speedcar.module.css";

export function TintLevels() {
  const [selected, setSelected] = useState<TintId>("nano");
  const tint = getTint(selected);
  return (
    <section id="tints" className={s.section} aria-labelledby="tints-title">
      <div className={s.sectionHeading}>
        <div>
          <p className={s.eyebrow} dir="ltr">
            01 / FIND YOUR COMFORT
          </p>
          <h2 id="tints-title">
            أربع خيارات.
            <br />
            <span>قرار على راحتك.</span>
          </h2>
        </div>
        <p>
          فرق العزل، فرق الكفالة، وفرق السعر.
          <br />
          كل التفاصيل أمامك قبل طلب الموعد.
        </p>
      </div>
      <div className={s.tintLayout}>
        <div className={s.tintList} aria-label="اختر نوع التظليل">
          {tintServices.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={selected === item.id}
              className={`${s.tintRow} ${selected === item.id ? s.tintRowActive : ""}`}
              onClick={() => setSelected(item.id)}
            >
              <span className={s.index}>{item.number}</span>
              <span className={s.tintName}>
                <strong dir="ltr">{item.english}</strong>
                <span>{item.name}</span>
              </span>
              <span className={s.tintRowPrice}>
                <strong>{item.prices["four-windows"]}</strong>
                <small>د.أ / 4 شبابيك</small>
              </span>
              <span className={s.rowArrow} aria-hidden="true">
                ↖
              </span>
            </button>
          ))}
        </div>
        <div className={s.tintDetail} aria-live="polite" aria-atomic="true">
          <div className={s.detailTop}>
            <span className={s.eyebrow} dir="ltr">
              THERMAL PERFORMANCE
            </span>
            <SunIcon />
          </div>
          <div key={tint.id} className={s.metric}>
            <strong>
              {tint.heat}
              <span>%</span>
            </strong>
            <p>
              {tint.id === "original-3m"
                ? "عزل حراري معلن يصل إلى"
                : "عزل حراري معلن"}
            </p>
          </div>
          <div className={s.performanceTrack}>
            <span style={{ width: `${tint.heat}%` }} />
          </div>
          <p className={s.tintDescription}>{tint.description}</p>
          <div className={s.detailFeatures}>
            <span>
              <ShieldIcon />
              كفالة {tint.warranty}
            </span>
            <span>
              {tint.uv !== null
                ? `حجب UV معلن ${tint.uv}%`
                : "درجة التظليل 5% بحسب العرض"}
            </span>
          </div>
          <BookButton tint={tint.id} className={s.primaryButton}>
            اختيار {tint.shortName}
            <ArrowIcon />
          </BookButton>
          <p className={s.finePrint}>
            * نسب العزل والكفالة بحسب بيانات المركز. التفاصيل وشروط الكفالة تؤكد
            قبل التنفيذ.
          </p>
        </div>
      </div>
    </section>
  );
}
