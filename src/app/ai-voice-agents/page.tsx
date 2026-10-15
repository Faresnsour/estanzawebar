import { ArrowLeft } from "lucide-react";
import { buildWhatsAppUrl } from "@/components/lib/site";
import BookingHeader from "@/components/booking-site/booking-header";
import BookingFooter from "@/components/booking-site/booking-footer";
import BookingFaq from "@/components/booking-site/booking-faq";
import BusinessContact from "@/components/booking-site/business-contact";
import { getServerTranslator } from "@/i18n/server";
import { source } from "@/i18n/messages";
import { pageMetadata } from "@/lib/metadata";
import { localDateId } from "@/lib/booking";
import s from "@/components/booking-site/booking-site.module.css";
import b from "@/components/booking-site/business-site.module.css";

export async function generateMetadata() {
  const metadata = await pageMetadata(source("voice.meta_title"), source("voice.meta_description"), "/ai-voice-agents");
  const images = [{ url: "/share", width: 1200, height: 630, alt: "Estanza — AI Voice Agents & Booking Pages" }];
  return { ...metadata, openGraph: { ...metadata.openGraph, images }, twitter: { ...metadata.twitter, images } };
}

export default async function VoiceAgentsPage() {
  const t = await getServerTranslator();
  const contact = buildWhatsAppUrl(t("voice.contact_message"));
  return <div className={s.site}>
    <a href="#main-content" className="skip-to-content">{t("autoSpa.skip_to_content")}</a>
    <BookingHeader />
    <main id="main-content">
      <section className={b.hero} aria-labelledby="voice-title">
        <div className={s.container}><div className={b.voiceHero}>
          <p className={s.eyebrow}>{t("business.voice_title")}</p>
          <h1 id="voice-title" className={b.title}>{t("voice.title")}</h1>
          <p className={b.introduction}>{t("voice.description")}</p>
          <div className={s.actions}><a href={contact} target="_blank" rel="noopener noreferrer" className={`${s.button} ${s.lightButton}`}>{t("voice.request_demo")}<ArrowLeft className="directional-icon" aria-hidden="true" /></a></div>
        </div></div>
      </section>
      <section className={s.section} aria-labelledby="capabilities-title">
        <div className={s.container}>
          <div className={b.capabilities}>
            <div className={b.capabilitiesIntro}><h2 id="capabilities-title">{t("voice.capabilities")}</h2></div>
            <ul className={b.capabilityList}>{["answer", "understand", "choose", "book", "transfer", "followup"].map(key => <li key={key}>
              <h3>{t(`voice.${key}_title`)}</h3><p>{t(`voice.${key}_body`)}</p>
            </li>)}</ul>
          </div>
          <div className={b.scopeNote}><p>{t("voice.scope")}</p><div className={s.actions}><a href={contact} target="_blank" rel="noopener noreferrer" className={s.button}>{t("voice.request_demo")}</a></div></div>
        </div>
      </section>
      <section className={`${s.section} ${b.examples}`} aria-labelledby="examples-title"><div className={s.container}>
        <div className={b.sectionHeading}><h2 id="examples-title">{t("voice.examples_title")}</h2><p>{t("voice.examples_note")}</p></div>
        <div className={b.exampleList}>{["stays", "rental", "appointments"].map(key => <article key={key}><h3>{t(`voice.${key}_title`)}</h3><p>{t(`voice.${key}_body`)}</p></article>)}</div>
      </div></section>
      <section className={s.faq} aria-labelledby="voice-faq-title"><div className={s.container}>
        <h2 id="voice-faq-title">{t("bookingSite.faq_title")}</h2>
        <BookingFaq items={[1,2,3,4,5].map(n => ({ question: t(`business.faq_${n}_q`), answer: t(`business.faq_${n}_a`) }))} />
      </div></section>
      <BusinessContact />
    </main>
    <BookingFooter year={localDateId().slice(0,4)} />
  </div>;
}
