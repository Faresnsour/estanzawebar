"use client";
import s from "./estanza.module.css";
import { useI18n } from "@/i18n/LocaleProvider";
import { MessageCircle } from "lucide-react";
import { localizedWhatsAppUrl } from "./lib/site";
export default function FinalCTA() {
  const { t: tr, locale } = useI18n();
  return <section id="contact" aria-labelledby="contact-title" className={`${s.system} ${s.contact}`}>
    <div className={`${s.container} ${s.contactLayout}`}>
      <div><h2 id="contact-title">{tr("contact.see_what_booking_could_look_like_for")}</h2><p>{tr("contact.send_us_your_centre_s_name_and")}</p></div>
      <div className={s.contactAction}><a href={localizedWhatsAppUrl(locale)} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-source="final" className={s.button}><MessageCircle aria-hidden="true" />{tr("contact.get_a_preview_for_your_centre")}</a><p className={s.contactNote}>{tr("contact.a_simple_conversation_no_commitment_to_buy")}</p></div>
    </div>
  </section>;
}
