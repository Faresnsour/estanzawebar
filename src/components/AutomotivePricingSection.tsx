"use client";

import { Check, MessageCircle } from "lucide-react";
import { useI18n } from "@/i18n/LocaleProvider";
import { buildWhatsAppUrl, CORE_PRICE, PRO_PRICE } from "./lib/site";
import s from "./estanza.module.css";

const packages = [
  {
    id: "core",
    price: CORE_PRICE,
    features: ["branded_page", "automatic_pricing", "instant_whatsapp", "customer_vehicle", "delivery_72_hours"],
  },
  {
    id: "pro",
    price: PRO_PRICE,
    features: ["everything_core", "slot_locking", "calendar_sheets", "multiple_bays", "booking_rules", "month_support"],
  },
] as const;

// Use the requested dollar symbol and Latin digits in both reading directions.
const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function AutomotivePricingSection() {
  const { t: tr } = useI18n();

  return (
    <section id="pricing" aria-labelledby="pricing-title" className={`${s.system} ${s.section} ${s.pricing}`}>
      <div className={s.container}>
        <div className={s.sectionHead}>
          <div>
            <p className={s.sectionLabel}>{tr("perfect.packages")}</p>
            <h2 id="pricing-title" className={s.sectionTitle}>{tr("clean.automotive_prices")}</h2>
          </div>
        </div>
        <p className={s.helper}>{tr("clean.automotive_price_note")}</p>
        <div className={s.priceComparison}>
          {packages.map((plan) => {
            const featured = plan.id === "pro";
            const price = usd.format(plan.price);
            return (
              <article key={plan.id} aria-labelledby={`pricing-${plan.id}-title`} className={`${s.pricePlan} ${featured ? s.proPlan : s.corePlan}`}>
                <div className={s.planHeading}>
                  <h3 id={`pricing-${plan.id}-title`}>{tr(`pricing.${plan.id}_name`)}</h3>
                  {featured ? <span className={s.featuredLabel}>{tr("pricing.most_popular")}</span> : null}
                </div>
                <p className={s.price}><strong><bdi dir="ltr">{price}</bdi></strong></p>
                <p className={s.priceNote}>{tr("pricing.one_time_payment_no_monthly_subscription")}</p>
                <ul className={s.featureList}>
                  {plan.features.map((feature) => <li key={feature}><Check aria-hidden="true" /><span>{tr(`pricing.${feature}`)}</span></li>)}
                </ul>
                <a
                  href={buildWhatsAppUrl(tr(`pricing.${plan.id}_message`, [price]))}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="whatsapp"
                  data-source={`pricing-${plan.id}`}
                  className={`${s.button} ${featured ? s.featuredButton : s.secondaryButton}`}
                >
                  <MessageCircle aria-hidden="true" />{tr(`pricing.${plan.id}_cta`)}
                </a>
              </article>
            );
          })}
        </div>
        <p className={s.paymentNote}><span aria-hidden="true">⚡</span><span>{tr("pricing.payment_trust")}</span></p>
      </div>
    </section>
  );
}
