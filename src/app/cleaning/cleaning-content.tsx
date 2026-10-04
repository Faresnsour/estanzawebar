"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import CleaningPreview from "@/components/cleaning/cleaning-preview";
import { localizedWhatsAppUrl } from "@/components/lib/site";
import { useI18n } from "@/i18n/LocaleProvider";
import s from "@/components/estanza.module.css";
import c from "@/components/cleaning/cleaning.module.css";
export default function CleaningContent() {
  const { t, locale } = useI18n();
  return <><Navbar /><main id="main-content" className={`${s.system} ${s.page}`}>
    <section className={`${s.hero} ${s.container}`} aria-labelledby="cleaning-title">
      <div className={s.heroIntro}>
        <div><p className={s.introLabel}>{t("clean.service_name")}</p><h1 id="cleaning-title" className={s.display}>{t("clean.service_title")}</h1></div>
        <div className={s.heroDescription}><p>{t("clean.service_description")}</p><div className={s.actions}><Link href="/cleaning/demo" className={s.button} data-cta="demo" data-source="cleaning-service">{t("clean.journey_cta")}<ArrowLeft className="directional-icon" aria-hidden="true" /></Link><a href={localizedWhatsAppUrl(locale)} className={s.textLink} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-source="cleaning-service">{t("clean.contact_cta")}</a></div></div>
      </div>
      <CleaningPreview />
    </section>
    <section className={`${s.section} ${s.problem}`}><div className={`${s.container} ${s.split}`}><h2 className={s.sectionTitle}>{t("clean.audience_title")}</h2><div><p className={s.projectDescription}>{t("clean.audience_body")}</p><p className={s.helper}>{t("clean.not_ads")}</p></div></div></section>
    <section className={`${s.section} ${s.process}`}><div className={s.container}><h2 className={s.sectionTitle}>{t("clean.journey_title")}</h2><ol className={s.steps}>{[1,2,3].map(n => <li key={n}><span className={s.stepNumber} aria-hidden="true">{new Intl.NumberFormat(locale).format(n)}</span><div><h3>{t(`clean.journey_${n}`)}</h3><p>{t(`clean.journey_${n}_body`)}</p></div></li>)}</ol></div></section>
    <section className={`${s.section} ${s.problem}`}><div className={s.container}><h2 className={s.sectionTitle}>{t("clean.scope_title")}</h2><p className={s.projectDescription}>{t("clean.scope_body")}</p><div className={`${s.split} ${c.serviceScope}`}><div><h3>{t("clean.now_title")}</h3><p className={s.helper}>{t("clean.now_body")}</p></div><div><h3>{t("clean.later_title")}</h3><p className={s.helper}>{t("clean.later_body")}</p></div></div></div></section>
    <PricingSection /><FAQSection /><FinalCTA />
  </main><Footer /></>;
}
