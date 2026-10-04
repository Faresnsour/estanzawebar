"use client";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { useI18n } from "@/i18n/LocaleProvider";
import { localizedWhatsAppUrl } from "./lib/site";
import CleaningPreview from "./cleaning/cleaning-preview";
import s from "./estanza.module.css";
export default function Hero() {
  const { t, locale } = useI18n();
  return <section id="hero" aria-labelledby="hero-title" className={`${s.system} ${s.hero}`}>
    <div className={s.container}>
      <div className={s.heroIntro}>
        <div><p className={s.introLabel}>{t("clean.brand_line")}</p><h1 id="hero-title" className={s.display}>{t("clean.home_title")}</h1></div>
        <div className={s.heroDescription}><p>{t("clean.home_description")}</p><div className={s.actions}>
          <Link href="/cleaning/demo" data-cta="demo" data-source="hero" className={s.button}>{t("clean.demo_cta")}<ArrowLeft className="directional-icon" aria-hidden="true" /></Link>
          <a href={localizedWhatsAppUrl(locale)} data-cta="whatsapp" data-source="hero" target="_blank" rel="noopener noreferrer" className={s.textLink}>{t("clean.contact_cta")}</a>
        </div></div>
      </div>
      <CleaningPreview />
      <ul className={s.facts}>{[1,2,3].map(n => <li key={n}><Check aria-hidden="true"/><span>{t(`clean.fact_${n}`)}</span></li>)}</ul>
    </div>
  </section>;
}
