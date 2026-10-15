import { ArrowLeft, MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/components/lib/site";
import { getServerTranslator } from "@/i18n/server";
import s from "./booking-site.module.css";

export default async function BusinessContact() {
  const t = await getServerTranslator();
  const contact = buildWhatsAppUrl(t("bookingSite.contact_message"));
  return <section id="contact" className={s.contact} aria-labelledby="contact-title"><div className={`${s.container} ${s.contactInner}`}><div><h2 id="contact-title">{t("bookingSite.final_title")}</h2><p>{t("bookingSite.final_body")}</p></div><a href={contact} className={`${s.button} ${s.lightButton}`} target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden="true" />{t("business.project_cta")}<ArrowLeft className="directional-icon" aria-hidden="true" /></a></div></section>;
}
