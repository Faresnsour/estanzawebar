"use client";
import s from "./estanza.module.css";
import { source } from "@/i18n/messages";
import { useI18n } from "@/i18n/LocaleProvider";
import { Check, MessageCircle } from "lucide-react";
import { buildWhatsAppUrl, LAUNCH_PRICE } from "./lib/site";
const launchFeatures = [
    source("pricing.your_centre_s_logo_and_colours"),
    source("pricing.services_prices_and_durations"),
    source("pricing.appointment_customer_and_vehicle_details"),
    source("pricing.whatsapp_messages_with_booking_details"),
    source("pricing.mobile_preview_before_handover"),
];
const proFeatures = [
    source("pricing.multiple_staff_members_or_bays"),
    source("pricing.a_gallery_of_your_centre_s_work"),
    source("pricing.custom_booking_steps"),
    source("pricing.google_sheets_or_calendar_integration"),
];
export default function PricingSection() {
  const { t: tr, locale } = useI18n();
  return <section id="pricing" aria-labelledby="pricing-title" className={`${s.system} ${s.section} ${s.pricing}`}>
    <div className={s.container}>
      <div className={s.sectionHead}><div><p className={s.sectionLabel}>{tr("perfect.packages")}</p><h2 id="pricing-title" className={s.sectionTitle}>{tr("pricing.start_with_what_your_centre_needs")}</h2></div></div>
      <div className={s.priceComparison}>
        <article className={`${s.pricePlan} ${s.launchPlan}`}>
          <h3>{tr("pricing.launch_plan")}</h3>
          <p className={s.price}><strong>{new Intl.NumberFormat(locale).format(LAUNCH_PRICE)}</strong><span>{tr("demo.jod")}</span></p>
          <p className={s.priceNote}>{tr("pricing.one_time_payment_no_monthly_subscription")}</p>
          <ul className={s.featureList}>{launchFeatures.map((feature) => <li key={feature}><Check aria-hidden="true" /><span>{tr(feature)}</span></li>)}</ul>
          <a href={buildWhatsAppUrl(tr("pricing.hi_i_d_like_to_learn_about"))} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-source="pricing-launch" className={s.button}><MessageCircle aria-hidden="true" />{tr("pricing.ask_about_the_launch_plan")}</a>
        </article>
        <article className={s.pricePlan}>
          <h3>{tr("pricing.professional_plan")}</h3><p className={s.customPrice}>{tr("pricing.priced_for_your_centre")}</p>
          <p className={s.priceNote}>{tr("pricing.everything_in_launch_with_options_such_as")}</p>
          <ul className={s.featureList}>{proFeatures.map((feature) => <li key={feature}><Check aria-hidden="true" /><span>{tr(feature)}</span></li>)}</ul>
          <a href={buildWhatsAppUrl(tr("pricing.hi_our_centre_has_additional_scheduling_needs"))} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-source="pricing-pro" className={`${s.button} ${s.secondaryButton}`}><MessageCircle aria-hidden="true" />{tr("pricing.discuss_your_centre_s_needs")}</a>
        </article>
      </div><p className={s.paymentNote}>{tr("pricing.50_to_start_50_after_your_preview")}</p>
    </div>
  </section>;
}
