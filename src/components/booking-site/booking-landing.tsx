import Link from "next/link";
import { ArrowLeft, ClipboardList, MessageCircle } from "lucide-react";
import { SOCIAL_LINKS } from "@/components/lib/social-links";
import { buildWhatsAppUrl } from "@/components/lib/site";
import { getServerTranslator } from "@/i18n/server";
import { DEMO_SERVICES } from "@/lib/booking-request-demo";
import BookingBrand from "./booking-brand";
import BookingHeader from "./booking-header";
import BookingDemo from "./booking-demo";
import BookingFaq from "./booking-faq";
import s from "./booking-site.module.css";
export default async function BookingLanding({ initialDay }: { initialDay: string }) {
  const t = await getServerTranslator();
  const contact = buildWhatsAppUrl(t("bookingSite.contact_message"));
  const quote = buildWhatsAppUrl(t("bookingSite.quote_message"));
  return <div className={s.site}>
    <a href="#main-content" className="skip-to-content">{t("autoSpa.skip_to_content")}</a>
    <BookingHeader />
    <main id="main-content">
      <BookingDemo initialDay={initialDay} heroCopy={
            <div className={s.heroCopy}>
              <p className={s.eyebrow}>{t("bookingSite.eyebrow")}</p>
              <h1 id="booking-hero-title">{t("bookingSite.hero_title")}</h1>
              <p className={s.heroBody}>{t("bookingSite.hero_body")}</p>
              <div className={s.actions}><a href="#experience" className={`${s.button} ${s.lightButton}`}>{t("bookingSite.try")}<ArrowLeft className="directional-icon" aria-hidden="true" /></a><a href={contact} target="_blank" rel="noopener noreferrer" className={`${s.button} ${s.outline}`}>{t("bookingSite.discuss")}</a></div>
              <span className={s.heroNumber} aria-hidden="true">01</span>
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
        <ol className={s.scopeSteps}>{[1,2,3].map(n => <li key={n}><span aria-hidden="true">0{n}</span><div><h3>{t(`bookingSite.scope_${n}`)}</h3><p>{t(`bookingSite.scope_${n}_body`)}</p></div></li>)}</ol>
      </div></section>
      <section id="faq" className={s.faq} aria-labelledby="faq-title"><div className={s.container}><h2 id="faq-title">{t("bookingSite.faq_title")}</h2><BookingFaq items={[1,2,3].map(n => ({ question: t(`bookingSite.faq_${n}_q`), answer: t(`bookingSite.faq_${n}_a`) }))} /></div></section>
      <section id="contact" className={s.contact} aria-labelledby="contact-title"><div className={`${s.container} ${s.contactInner}`}><div><h2 id="contact-title">{t("bookingSite.final_title")}</h2><p>{t("bookingSite.final_body")}</p></div><a href={contact} className={`${s.button} ${s.lightButton}`} target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden="true" />{t("bookingSite.whatsapp")}<ArrowLeft className="directional-icon" aria-hidden="true" /></a></div></section>
    </main>
    <footer className={s.footer}><div className={s.container}>
      <div className={s.footerMain}><BookingBrand label={t("navigation.estanza_home")} /><a href="mailto:hello@estanza.dev" dir="ltr">hello@estanza.dev</a><div className={s.socialLinks}>{SOCIAL_LINKS.filter(item => item.name !== "Email").map(item => <a key={item.name} href={item.href} aria-label={t(item.name)} target="_blank" rel="noopener noreferrer">{item.icon}</a>)}</div><nav aria-label={t("footer.useful_links")}><Link href="/privacy">{t("footer.privacy")}</Link><Link href="/terms">{t("terms.terms_of_service")}</Link></nav></div>
      <div id="work" className={s.previous}><div><span>{t("bookingSite.previous")}</span><p>{t("bookingSite.previous_note")}</p></div><Link href="/showcase">{t("bookingSite.automotive")}</Link><Link href="/cleaning/demo">{t("bookingSite.cleaning")}</Link><small dir="ltr">© {initialDay.slice(0,4)} Estanza</small></div>
    </div></footer>
  </div>;
}
