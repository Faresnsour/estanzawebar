"use client";
import { useI18n } from "@/i18n/LocaleProvider";
import { brand, packageOptions, prices, serviceStories, } from "../_data/packages";
import { BookButton } from "./booking/booking-sheet";
import s from "../auto-spa.module.css";
export function Services() {
    const { t: tr } = useI18n();
    return (<section id="services" className={s.section} aria-labelledby="services-title">
      <div className={s.sectionHeading}>
        <div>
          <p className={s.eyebrow} dir="ltr">03 / CONSIDERED CARE</p>
          <h2 id="services-title" className={s.sectionTitle}>{tr("autoSpa.every_detail")}<br />{tr("autoSpa.deserves_care")}</h2>
        </div>

        <p className={s.sectionDescription}>{tr("autoSpa.your_paint_interior_condition_and_desired_result")}</p>
      </div>

      <div className={s.serviceList}>
        {serviceStories.map((service) => (<article key={service.number} className={s.serviceRow}>
            <span className={s.rowNumber}>{tr(service.number)}</span>

            <div>
              <p className={s.eyebrow} dir="ltr">{tr(service.english)}</p>
              <h3>{tr(service.title)}</h3>
            </div>

            <div className={s.serviceDescription}>
              <p>{tr(service.description)}</p>
              <span>{tr(service.detail)}</span>
            </div>
          </article>))}
      </div>

      <div className={s.packagesHeading}>
        <div>
          <p className={s.eyebrow} dir="ltr">CHOOSE YOUR LEVEL OF CARE</p>
          <h3>{tr("autoSpa.know_what_s_included")}</h3>
        </div>

        <span className={s.smallNote}>
          {tr(brand.demoPricing
            ? tr("autoSpa.sample_prices_for_illustration_the_centre_approves") : tr("autoSpa.prices_in_omani_rials"))}
        </span>
      </div>

      <div className={s.packageAccordion}>
        {packageOptions.map((item, index) => (<details key={item.id} className={s.packageDetails}>
            <summary>
              <span className={s.rowNumber}>
                {tr(String(index + 1).padStart(2, "0"))}
              </span>

              <span className={s.packageName}>
                <strong dir="ltr">{tr(item.english)}</strong>
                <span>{tr(item.title)}</span>
              </span>

              <span className={s.packageFrom}>
                <span>{tr("autoSpa.sedan")}</span>
                <strong>{tr(prices.sedan[item.id])}{" "}{tr("autoSpa.omr_199")}</strong>
              </span>

              <span className={s.accordionPlus} aria-hidden="true">＋</span>
            </summary>

            <div className={s.packageDetailsBody}>
              <p>{tr(item.description)}</p>

              <ul className={s.includedList}>
                {item.services.map((service) => (<li key={service}>{tr(service)}</li>))}
              </ul>

              <div className={s.packageDetailsFooter}>
                <p>{tr("autoSpa.sedan_200")}{" "}<b>{tr(prices.sedan[item.id])}</b>
                  {" · "}{tr("autoSpa.suv_201")}{" "}<b>{tr(prices.suv[item.id])}</b>
                  {" "}{tr("autoSpa.omr")}</p>

                <BookButton className={s.textButton}>{tr("autoSpa.start_your_care_request")}{" "}<span aria-hidden="true">↗</span>
                </BookButton>
              </div>
            </div>
          </details>))}
      </div>
    </section>);
}
