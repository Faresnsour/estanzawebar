"use client";
import { useI18n } from "@/i18n/LocaleProvider";
import { speedCar } from "../_data/services";
import { Brand } from "./navbar";
import s from "../speedcar.module.css";
export function Footer() {
    const { t: tr } = useI18n();
    return (<footer className={s.footer}>
      <div className={s.footerTop}>
        <Brand large/>
        <p dir="ltr">LESS HEAT. MORE COMFORT.</p>
        <nav aria-label={tr("autoSpa.contact_links")}>
          <a href={`https://wa.me/${speedCar.whatsappNumber}`} target="_blank" rel="noopener noreferrer">
            WhatsApp ↗
          </a>
          <a href={`tel:${speedCar.phone}`}>{tr("speedCar.call")}</a>
          <a href="#location">{tr("autoSpa.location")}</a>
        </nav>
      </div>
      <div className={s.footerWordmark} dir="ltr" aria-hidden="true">
        SPEED CAR
      </div>
      <div className={s.footerBottom}>
        <span>© Speed Car Jo</span>
        <a href="https://www.estanza.dev" target="_blank" rel="noopener noreferrer" dir="ltr">
          CRAFTED BY ESTANZA ↗
        </a>
      </div>
    </footer>);
}
