"use client";
import { useI18n } from "@/i18n/LocaleProvider";
import { brand } from "../_data/packages";
import { hasWhatsAppNumber } from "../_lib/whatsapp";
import s from "../auto-spa.module.css";
export function AutoSpaFooter() {
    const { t: tr } = useI18n();
    return (<footer className={s.footer}>
      <div className={s.footerTop}>
        <a href="#home" className={s.brand}>
          <span dir="ltr">
            <strong>DOPAMINE</strong>
            <small>AUTO SPA</small>
          </span>
        </a>

        <p dir="ltr">Feel the Shine.</p>

        <nav aria-label={tr("autoSpa.contact_links")}>
          <a href={brand.instagramUrl} target="_blank" rel="noopener noreferrer">
            Instagram ↗
          </a>

          {tr(hasWhatsAppNumber() && (<a href={`https://wa.me/${brand.whatsappNumber}`} target="_blank" rel="noopener noreferrer">
              WhatsApp ↗
            </a>))}

          <a href="#location">{tr("autoSpa.location")}</a>
        </nav>
      </div>

      <div className={s.footerWordmark} aria-hidden="true" dir="ltr">
        DOPAMINE
      </div>

      <div className={s.footerBottom}>
        <span>© DOPAMINE Auto Spa</span>
        <span dir="ltr">DESIGNED AROUND THE DETAILS.</span>
      </div>
    </footer>);
}
