import {
  brand,
  packageOptions,
  prices,
  serviceStories,
} from "../_data/packages";
import { BookButton } from "./booking/booking-sheet";
import s from "../auto-spa.module.css";

export function Services() {
  return (
    <section
      id="services"
      className={s.section}
      aria-labelledby="services-title"
    >
      <div className={s.sectionHeading}>
        <div>
          <p className={s.eyebrow} dir="ltr">03 / CONSIDERED CARE</p>
          <h2 id="services-title" className={s.sectionTitle}>
            لكل تفصيل
            <br />
            عنايته.
          </h2>
        </div>

        <p className={s.sectionDescription}>
          نوع الطلاء، حالة المقصورة، والنتيجة المطلوبة تحدد العناية
          المناسبة. التفاصيل تُراجع مع الفريق قبل التنفيذ.
        </p>
      </div>

      <div className={s.serviceList}>
        {serviceStories.map((service) => (
          <article key={service.number} className={s.serviceRow}>
            <span className={s.rowNumber}>{service.number}</span>

            <div>
              <p className={s.eyebrow} dir="ltr">{service.english}</p>
              <h3>{service.title}</h3>
            </div>

            <div className={s.serviceDescription}>
              <p>{service.description}</p>
              <span>{service.detail}</span>
            </div>
          </article>
        ))}
      </div>

      <div className={s.packagesHeading}>
        <div>
          <p className={s.eyebrow} dir="ltr">CHOOSE YOUR LEVEL OF CARE</p>
          <h3>التفاصيل قبل القرار.</h3>
        </div>

        <span className={s.smallNote}>
          {brand.demoPricing
            ? "الأسعار والبنود تجريبية وتحتاج اعتماد المركز"
            : "الأسعار بالريال العُماني"}
        </span>
      </div>

      <div className={s.packageAccordion}>
        {packageOptions.map((item, index) => (
          <details key={item.id} className={s.packageDetails}>
            <summary>
              <span className={s.rowNumber}>
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className={s.packageName}>
                <strong dir="ltr">{item.english}</strong>
                <span>{item.title}</span>
              </span>

              <span className={s.packageFrom}>
                <span>صالون</span>
                <strong>{prices.sedan[item.id]} OMR</strong>
              </span>

              <span className={s.accordionPlus} aria-hidden="true">＋</span>
            </summary>

            <div className={s.packageDetailsBody}>
              <p>{item.description}</p>

              <ul className={s.includedList}>
                {item.services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>

              <div className={s.packageDetailsFooter}>
                <p>
                  صالون: <b>{prices.sedan[item.id]}</b>
                  {" · "}
                  دفع رباعي: <b>{prices.suv[item.id]}</b>
                  {" "}ريال عُماني
                </p>

                <BookButton className={s.textButton}>
                  ابدأ طلب العناية <span aria-hidden="true">↗</span>
                </BookButton>
              </div>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}