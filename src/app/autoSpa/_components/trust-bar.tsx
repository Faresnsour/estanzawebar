"use client";
import { useI18n } from "@/i18n/LocaleProvider";
import { brand } from "../_data/packages";
import s from "../auto-spa.module.css";
export function TrustBar() {
    const { t: tr } = useI18n();
    return (<div className={s.trustBar} aria-label={tr("autoSpa.centre_information")}>
      <div>
        <span className={s.statusDot} aria-hidden="true"/>
        <span>{tr("autoSpa.al_mabela_industrial_area_8_muscat")}</span>
      </div>

      <a href={brand.instagramUrl} target="_blank" rel="noopener noreferrer">{tr("autoSpa.our_work_on_instagram")}{" "}<span aria-hidden="true">↗</span>
      </a>

      <div>
        <span className={s.trustSymbol} aria-hidden="true">＋</span>
        <span>{tr("autoSpa.clear_requests_confirmed_by_the_team")}</span>
      </div>
    </div>);
}
