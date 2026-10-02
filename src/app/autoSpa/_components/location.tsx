"use client";
import { useI18n } from "@/i18n/LocaleProvider";
import { brand } from "../_data/packages";
import { hasWhatsAppNumber } from "../_lib/whatsapp";
import s from "../auto-spa.module.css";
export function Location() {
    const { t: tr } = useI18n();
    const whatsappReady = hasWhatsAppNumber();
    return (<section id="location" className={`${s.section} ${s.locationSection}`} aria-labelledby="location-title">
      <div className={s.locationCopy}>
        <p className={s.eyebrow} dir="ltr">04 / VISIT THE STUDIO</p>

        <h2 id="location-title" className={s.displayTitle} dir="ltr">
          COME FEEL
          <br />
          THE SHINE.
        </h2>

        <p className={s.locationAddress}>{tr(brand.address)}</p>

        <div className={s.contactLinks}>
          <a href={brand.mapsUrl} target="_blank" rel="noopener noreferrer">{tr("autoSpa.find_us_on_google_maps")}<span aria-hidden="true">↗</span>
          </a>

          <a href={brand.instagramUrl} target="_blank" rel="noopener noreferrer">
            Instagram <span aria-hidden="true">↗</span>
          </a>

          {tr(whatsappReady && (<>
              <a href={`https://wa.me/${brand.whatsappNumber}`} target="_blank" rel="noopener noreferrer">{tr("autoSpa.contact_us_on_whatsapp")}{" "}<span aria-hidden="true">↗</span>
              </a>

              <a href={`tel:+${brand.whatsappNumber}`}>
                <span dir="ltr">+{tr(brand.whatsappNumber)}</span>
                <span aria-hidden="true">↗</span>
              </a>
            </>))}
        </div>
      </div>

      <a className={s.locationGraphic} href={brand.mapsUrl} target="_blank" rel="noopener noreferrer" aria-label={tr("autoSpa.find_dopamine_on_google_maps")}>
        <div className={s.locationRings} aria-hidden="true"/>
        <span className={s.locationCross} aria-hidden="true">＋</span>

        <div className={s.locationMarker}>
          <span className={s.statusDot} aria-hidden="true"/>
          <strong dir="ltr">DOPAMINE</strong>
          <span>{tr("autoSpa.al_mabela_industrial_area_8")}</span>
        </div>

        <span className={s.locationGraphicLabel} dir="ltr">
          MUSCAT / AL MAABILAH
          <span aria-hidden="true">↗</span>
        </span>
      </a>
    </section>);
}
