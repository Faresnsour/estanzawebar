import { tintServices, speedCar } from "../_data/services";
import { BookButton } from "./booking/booking-flow";
import { ArrowIcon } from "./icons";
import s from "../speedcar.module.css";

export function Comparison() {
  return (
    <section
      id="compare"
      className={`${s.section} ${s.comparisonSection}`}
      aria-labelledby="comparison-title"
    >
      <div className={s.sectionHeading}>
        <div>
          <p className={s.eyebrow} dir="ltr">
            02 / CLARITY BEFORE COMMITMENT
          </p>
          <h2 id="comparison-title">
            اختَر وأنت
            <br />
            <span>عارف التفاصيل.</span>
          </h2>
        </div>
        <p>
          السعر حسب نوع التظليل وأجزاء الزجاج.
          <br />
          طلبك يتجه للمركز لتأكيد الموعد والتفاصيل.
        </p>
      </div>
      <div
        className={s.tableScroll}
        tabIndex={0}
        role="region"
        aria-label="جدول مقارنة التظليل، اسحب أفقيًا على الهاتف"
      >
        <table className={s.comparisonTable}>
          <caption className={s.srOnly}>
            مقارنة خيارات التظليل وأسعار تغطية الزجاج بالدينار الأردني
          </caption>
          <thead>
            <tr>
              <th scope="col">الخيار</th>
              <th scope="col">العزل المعلن</th>
              <th scope="col">الكفالة</th>
              <th scope="col">4 شبابيك</th>
              <th scope="col">أمامي / خلفي*</th>
              <th scope="col">
                <span className={s.srOnly}>اختيار</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {tintServices.map((item) => (
              <tr key={item.id}>
                <th scope="row">
                  <span dir="ltr">{item.english}</span>
                  <small>{item.shortName}</small>
                </th>
                <td>
                  {item.id === "original-3m" ? "حتى " : ""}
                  {item.heat}%
                </td>
                <td>{item.warranty}</td>
                <td>
                  <strong>{item.prices["four-windows"]}</strong> د.أ
                </td>
                <td>
                  {item.prices.front === null
                    ? "يؤكد المركز السعر"
                    : `${item.prices.front} د.أ`}
                </td>
                <td>
                  <BookButton
                    tint={item.id}
                    className={s.tableSelect}
                    aria-label={`اختيار ${item.name}`}
                  >
                    <ArrowIcon />
                  </BookButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={s.comparisonNotes}>
        <p>* سعر الأمامي أو الخلفي لكل قطعة على حدة.</p>
        <p>{speedCar.surchargeNote}</p>
        <p>
          نسبة العزل الحراري تختلف عن درجة نفاذ الضوء؛ العتمة ليست مقياس العزل.
        </p>
      </div>
      <div className={s.processStrip}>
        <div>
          <span>01</span>
          <strong>اختر التظليل</strong>
          <p>قارن العزل والكفالة</p>
        </div>
        <div>
          <span>02</span>
          <strong>حدّد الزجاج</strong>
          <p>شاهد السعر الأساسي</p>
        </div>
        <div>
          <span>03</span>
          <strong>أرسل طلبك</strong>
          <p>الفريق يؤكد الموعد</p>
        </div>
      </div>
    </section>
  );
}
