import type { Metadata } from "next";
import { Camera, Check, MessageCircle, Phone } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getLocale, getServerTranslator } from "@/i18n/server";
import { localDateId } from "@/lib/booking";
import ShinexBrand from "@/components/shinex/shinex-brand";
import ShinexBooking from "@/components/shinex/shinex-booking";
import ShinexFaq from "@/components/shinex/shinex-faq";
import VehicleArt, { InteriorArt } from "@/components/shinex/vehicle-art";
import s from "@/components/shinex/shinex.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerTranslator();
  const locale = await getLocale();
  return {
    title: { absolute: t("shinex.meta_title") }, description: t("shinex.meta_description"),
    robots: { index: false, follow: false },
    openGraph: { title: t("shinex.meta_title"), description: t("shinex.meta_description"), siteName: "SHINEX", locale: locale === "ar" ? "ar_JO" : "en_GB", url: "/demos/shinex" },
    twitter: { title: t("shinex.meta_title"), description: t("shinex.meta_description") },
    icons: { icon: "/shinex/logo.jpg", apple: "/shinex/logo.jpg" },
  };
}
export default async function ShinexPage() {
  const t = await getServerTranslator();
  const features = <div className={s.packageFeatures} id="package-details">
    <p className={s.samePackage}>{t("shinex.same_package")}</p>
    <ul>{[1,2,3,4].map(n => <li key={n}><Check size={16} aria-hidden="true" />{t(`shinex.feature_${n}`)}</li>)}</ul>
    <p className={s.exterior}>{t("shinex.exterior")}</p>
  </div>;
  return <div className={s.site} id="top">
    <a href="#shinex-booking" className="skip-to-content">{t("shinex.skip")}</a>
    <header className={s.header}><div className={`${s.container} ${s.headerInner}`}>
      <ShinexBrand name={t("shinex.brand")} />
      <div className={s.headerActions}><a href="tel:0782987733" className={s.phone} aria-label={t("shinex.call")}><Phone size={18} aria-hidden="true" /><bdi>0782987733</bdi></a><LanguageSwitcher /><span className={s.demoLabel}>{t("shinex.demo")}</span></div>
    </div></header>
    <main>
      <section className={s.hero} aria-labelledby="shinex-title"><div className={`${s.container} ${s.heroGrid}`}>
        <div className={s.heroCopy}><p className={s.eyebrow}>{t("shinex.eyebrow")}</p><h1 id="shinex-title">{t("shinex.hero_title")}</h1><p className={s.heroBody}>{t("shinex.hero_body")}</p></div>
        <div className={s.heroVehicle}><VehicleArt /><div className={s.heroPrice}><span>{t("shinex.for_sedan")}</span><bdi><strong>29</strong> <small>{t("shinex.currency")}</small></bdi></div></div>
      </div></section>
      <ShinexBooking initialToday={localDateId()} features={features} />
      <section className={`${s.container} ${s.care}`} aria-labelledby="care-title"><div className={s.careCopy}><p>{t("shinex.care_eyebrow")}</p><h2 id="care-title">{t("shinex.care_title")}</h2><p>{t("shinex.care_body")}</p><a href="#package-details">{t("shinex.care_details")}</a></div><div className={s.interior}><InteriorArt /><div className={s.interiorLabels}>{[1,2,3].map(n => <span key={n}>{t(`shinex.feature_${n}`)}</span>)}</div></div></section>
      <section className={`${s.container} ${s.faq}`} aria-labelledby="shinex-faq-title"><h2 id="shinex-faq-title">{t("shinex.faq_title")}</h2><ShinexFaq items={[1,2].map(n => ({ question: t(`shinex.faq_${n}_q`), answer: t(`shinex.faq_${n}_a`) }))} /></section>
      <section className={s.contact}><div className={`${s.container} ${s.contactInner}`}><div><h2>{t("shinex.contact_title")}</h2><p>{t("shinex.contact_body")}</p></div><a href="https://wa.me/962782987733" target="_blank" rel="noopener noreferrer" className={s.contactButton}><MessageCircle size={25} aria-hidden="true" />{t("shinex.contact")}</a></div></section>
    </main>
    <footer className={s.footer}><div className={`${s.container} ${s.footerInner}`}><p>{t("shinex.footer")}</p><a href="tel:0782987733"><Phone size={18} aria-hidden="true" /><bdi>0782987733</bdi></a><a href="https://www.instagram.com/shinex863/" target="_blank" rel="noopener noreferrer"><Camera size={18} aria-hidden="true" /><bdi>@shinex863</bdi></a></div></footer>
  </div>;
}
