import { speedCar } from "../_data/services";
import { Brand } from "./navbar";
import s from "../speedcar.module.css";

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.footerTop}>
        <Brand large />
        <p dir="ltr">LESS HEAT. MORE COMFORT.</p>
        <nav aria-label="روابط التواصل">
          <a
            href={`https://wa.me/${speedCar.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp ↗
          </a>
          <a href={`tel:${speedCar.phone}`}>اتصال ↗</a>
          <a href="#location">الموقع ↗</a>
        </nav>
      </div>
      <div className={s.footerWordmark} dir="ltr" aria-hidden="true">
        SPEED CAR
      </div>
      <div className={s.footerBottom}>
        <span>© Speed Car Jo</span>
        <a
          href="https://www.estanza.dev"
          target="_blank"
          rel="noopener noreferrer"
          dir="ltr"
        >
          CRAFTED BY ESTANZA ↗
        </a>
      </div>
    </footer>
  );
}
