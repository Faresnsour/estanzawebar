"use client";
import { useI18n } from "@/i18n/LocaleProvider";
import { tintServices, speedCar } from "../_data/services";
import { BookButton } from "./booking/booking-flow";
import { ArrowIcon } from "./icons";
import s from "../speedcar.module.css";
export function Comparison() {
    const { t: tr } = useI18n();
    return (<section id="compare" className={`${s.section} ${s.comparisonSection}`} aria-labelledby="comparison-title">
      <div className={s.sectionHeading}>
        <div>
          <p className={s.eyebrow} dir="ltr">
            02 / CLARITY BEFORE COMMITMENT
          </p>
          <h2 id="comparison-title">{tr("speedCar.choose_with")}<br />
            <span>{tr("speedCar.all_the_details")}</span>
          </h2>
        </div>
        <p>{tr("speedCar.pricing_depends_on_your_film_and_glass")}<br />{tr("speedCar.your_request_goes_to_the_centre_for")}</p>
      </div>
      <div className={s.tableScroll} tabIndex={0} role="region" aria-label={tr("speedCar.compare_window_films")}>
        <table className={s.comparisonTable}>
          <caption className={s.srOnly}>{tr("speedCar.window_film_and_glass_coverage_price_comparison")}</caption>
          <thead>
            <tr>
              <th scope="col">{tr("speedCar.option")}</th>
              <th scope="col">{tr("speedCar.stated_heat_rejection")}</th>
              <th scope="col">{tr("speedCar.warranty_505")}</th>
              <th scope="col">{tr("speedCar.4_windows")}</th>
              <th scope="col">{tr("speedCar.front_rear")}</th>
              <th scope="col">
                <span className={s.srOnly}>{tr("speedCar.select")}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {tintServices.map((item) => (<tr key={item.id}>
                <th scope="row">
                  <span dir="ltr">{tr(item.english)}</span>
                  <small>{tr(item.shortName)}</small>
                </th>
                <td data-label={tr("speedCar.stated_heat_rejection")}>
                  {tr(item.id === "original-3m" ? tr("speedCar.up_to") : "")}
                  {tr(item.heat)}%
                </td>
                <td data-label={tr("speedCar.warranty_505")}>{tr(item.warranty)}</td>
                <td data-label={tr("speedCar.4_windows")}>
                  <strong>{tr(item.prices["four-windows"])}</strong>{" "}{tr("demo.jod")}</td>
                <td data-label={tr("speedCar.front_rear")}>
                  {tr(item.prices.front === null
                ? tr("speedCar.confirm_price_with_centre") : tr("speedCar.value_jod", [item.prices.front]))}
                </td>
                <td>
                  <BookButton tint={item.id} className={s.tableSelect} aria-label={tr("speedCar.select_value", [item.name])}>
                    <ArrowIcon />
                  </BookButton>
                </td>
              </tr>))}
          </tbody>
        </table>
      </div>
      <div className={s.comparisonNotes}>
        <p>{tr("speedCar.front_and_rear_prices_apply_to_each")}</p>
        <p>{tr(speedCar.surchargeNote)}</p>
        <p>{tr("speedCar.heat_rejection_and_visible_light_transmission_are")}</p>
      </div>
      <div className={s.processStrip}>
        <div>
          <span>01</span>
          <strong>{tr("speedCar.choose_your_film")}</strong>
          <p>{tr("speedCar.compare_heat_rejection_and_warranty")}</p>
        </div>
        <div>
          <span>02</span>
          <strong>{tr("speedCar.choose_glass_coverage")}</strong>
          <p>{tr("speedCar.see_your_base_price")}</p>
        </div>
        <div>
          <span>03</span>
          <strong>{tr("speedCar.send_your_request")}</strong>
          <p>{tr("speedCar.the_team_confirms_your_appointment")}</p>
        </div>
      </div>
    </section>);
}
