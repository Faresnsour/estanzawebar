import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getServerTranslator } from "@/i18n/server";
import s from "./booking-site.module.css";
import b from "./business-site.module.css";

export default async function BusinessIntro() {
  const t = await getServerTranslator();
  return <>
    <section id="system" className={b.hero} aria-labelledby="business-title">
      <div className={s.container}>
        <p className={s.eyebrow}>{t("bookingSite.eyebrow")}</p>
        <h1 id="business-title" className={b.title}>{t("bookingSite.hero_title")}</h1>
        <div className={b.heroDetails}>
          <p className={b.introduction}>{t("bookingSite.hero_body")}</p>
          <div><p className={b.support}>{t("business.hero_support")}</p>
            <div className={s.actions}>
              <Link href="/ai-voice-agents" className={`${s.button} ${s.lightButton}`}>{t("business.explore_voice")}<ArrowLeft className="directional-icon" aria-hidden="true" /></Link>
              <a href="#booking-pages" className={`${s.button} ${s.outline}`}>{t("business.explore_booking")}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="services" className={s.section} aria-labelledby="services-title">
      <div className={s.container}>
        <div className={b.sectionHeading}><h2 id="services-title">{t("business.services")}</h2><p>{t("business.independent")}</p></div>
        <div className={b.services}>
          <article className={`${b.service} ${b.primaryService}`}>
            <h3>{t("business.voice_title")}</h3>
            <p className={b.serviceLead}>{t("business.voice_lead")}</p>
            <p className={b.serviceBody}>{t("business.voice_body")}</p>
            <Link href="/ai-voice-agents" className={`${s.button} ${s.lightButton}`}>{t("business.voice_cta")}<ArrowLeft className="directional-icon" aria-hidden="true" /></Link>
          </article>
          <article className={b.service}>
            <h3>{t("business.booking_title")}</h3>
            <p className={b.serviceLead}>{t("business.booking_lead")}</p>
            <p className={b.serviceBody}>{t("business.booking_body")}</p>
            <a href="#experience" className={s.button}>{t("business.booking_cta")}<ArrowLeft className="directional-icon" aria-hidden="true" /></a>
          </article>
        </div>
      </div>
    </section>
  </>;
}
