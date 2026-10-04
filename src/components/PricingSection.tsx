"use client";
import { useI18n } from "@/i18n/LocaleProvider";
import { localizedWhatsAppUrl } from "./lib/site";
import s from "./estanza.module.css";
export default function PricingSection() {
  const { t, locale } = useI18n();
  return <section id="pricing" aria-labelledby="pricing-title" className={`${s.system} ${s.section} ${s.pricing}`}>
    <div className={`${s.container} ${s.split}`}>
      <h2 id="pricing-title" className={s.sectionTitle}>{t("clean.cost_title")}</h2>
      <div><p className={s.projectDescription}>{t("clean.cost_body")}</p><p className={s.helper}>{t("clean.cost_note")}</p>
        <a href={localizedWhatsAppUrl(locale)} className={s.button} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-source="pricing-scope">{t("clean.contact_cta")}</a>
      </div>
    </div>
  </section>;
}
