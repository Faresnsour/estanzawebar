import { ArrowLeft, ClipboardList } from "lucide-react";
import { buildWhatsAppUrl } from "@/components/lib/site";
import { getServerTranslator } from "@/i18n/server";
import { DEMO_SERVICES } from "@/lib/booking-request-demo";
import BookingFooter from "./booking-footer";
import BusinessContact from "./business-contact";
import BusinessIntro from "./business-intro";
import BookingHeader from "./booking-header";
import BookingDemo from "./booking-demo";
import BookingFaq from "./booking-faq";
import s from "./booking-site.module.css";
export default async function BookingLanding({ initialDay }: { initialDay: string }) {
  const t = await getServerTranslator();
  const quote = buildWhatsAppUrl(t("bookingSite.quote_message"));
  return <div className={s.site}>
    <a href="#main-content" className="skip-to-content">{t("autoSpa.skip_to_content")}</a>
    <BookingHeader />
    <main id="main-content">
      <BusinessIntro />
      <BookingDemo initialDay={initialDay} heroCopy={
            <div className={s.heroCopy}>
              <p className={s.eyebrow}>{t("business.booking_title")}</p>
              <h2 id="booking-service-title">{t("business.booking_tagline")}</h2>
              <p className={s.heroBody}>{t("business.booking_body")}</p>
              <div className={s.actions}><a href="#experience" className={`${s.button} ${s.lightButton}`}>{t("business.booking_cta")}<ArrowLeft className="directional-icon" aria-hidden="true" /></a></div>
              <p className={s.heroBody}>{t("bookingSite.notice")}</p>
            </div>
      } />
      <section id="how-it-works" className={s.customBand} aria-labelledby="custom-title"><div className={`${s.container} ${s.customGrid}`}>
        <div className={s.customContent}><h2 id="custom-title">{t("bookingSite.custom_title")}</h2>
          <dl className={s.customRows}>
            <div><dt>{t("bookingSite.custom_services")}</dt><dd>{DEMO_SERVICES.map(service => <span className={s.exampleField} key={service}>{t(`bookingSite.${service}`)}</span>)}</dd></div>
            <div><dt>{t("bookingSite.custom_hours")}</dt><dd>{t("bookingSite.hours_example")}</dd></div>
            <div><dt>{t("bookingSite.custom_fields")}</dt><dd>{["name", "phone", "notes"].map(key => <span className={s.exampleField} key={key}>{t(`bookingSite.field_${key}`)}</span>)}</dd></div>
          </dl>
          <div className={s.brandPreview}><span className={s.miniBrand}>{t("bookingSite.company")}</span><p>{t("bookingSite.branding_caption")}</p></div>
        </div>
        <div className={s.customStatement}><p>{t("bookingSite.custom_statement")}</p><span className={s.shortRule} /><small>{t("bookingSite.custom_note")}</small></div>
      </div></section>
      <section id="setup" className={`${s.section} ${s.setup}`} aria-labelledby="setup-title"><div className={`${s.container} ${s.scopeGrid}`}>
        <div><h2 id="setup-title">{t("bookingSite.scope_title")}</h2><div id="pricing" className={s.setupQuote}><ClipboardList size={30} aria-hidden="true" /><div><h3>{t("bookingSite.price_title")}</h3><p>{t("bookingSite.price_body")}</p><a href={quote} className={s.button} target="_blank" rel="noopener noreferrer">{t("bookingSite.quote")}<ArrowLeft className="directional-icon" aria-hidden="true" /></a></div></div></div>
        <ol className={s.scopeSteps}>{[1,2,3,4].map(n => <li key={n}><span aria-hidden="true">0{n}</span><div><h3>{t(`bookingSite.scope_${n}`)}</h3><p>{t(`bookingSite.scope_${n}_body`)}</p></div></li>)}</ol>
      </div></section>
      <section id="faq" className={s.faq} aria-labelledby="faq-title"><div className={s.container}><h2 id="faq-title">{t("bookingSite.faq_title")}</h2><BookingFaq items={[...[1,2,3,4,5].map(n => ({ question: t(`business.faq_${n}_q`), answer: t(`business.faq_${n}_a`) })), ...[1,2,3].map(n => ({ question: t(`bookingSite.faq_${n}_q`), answer: t(`bookingSite.faq_${n}_a`) }))]} /></div></section>
      <BusinessContact />
    </main>
    <BookingFooter year={initialDay.slice(0,4)} />
  </div>;
}
