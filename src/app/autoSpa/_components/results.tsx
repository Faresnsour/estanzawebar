"use client";
import { useI18n } from "@/i18n/LocaleProvider";
import Image from "next/image";
import { brand, resultShots } from "../_data/packages";
import s from "../auto-spa.module.css";
export function Results() {
    const { t: tr, locale } = useI18n();
    return (<section id="results" className={`${s.section} ${s.resultsSection}`} aria-labelledby="results-title">
      <div className={s.sectionHeading}>
        <div>
          <p className={s.eyebrow} dir="ltr">02 / FROM THE SHOP FLOOR</p>

          <h2 id="results-title" className={s.displayTitle} dir="ltr">
            THE DETAILS.
            <br />
            THE DIFFERENCE.
          </h2>
        </div>

        <div className={s.sectionDescription}>
          <p>{tr("autoSpa.see_our_work_and_the_details_behind")}</p>

          <a href={brand.instagramUrl} target="_blank" rel="noopener noreferrer" className={s.textLink}>{tr("autoSpa.open_instagram")}{" "}<span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      {tr(resultShots.length > 0 ? (<div className={s.resultsGrid}>
          {resultShots.map((shot, index) => (<figure key={shot.src} className={s.resultFigure}>
              <div className={s.resultImageWrap}>
                <Image src={locale === "en" && index === 0 ? "/auto-spa/result-03.jpg" : shot.src} alt={tr(shot.alt)} sizes="(max-width: 720px) 100vw, 50vw" loading="lazy" width={1000} height={800}/>

                <span className={s.imageIndex}>
                  {tr(String(index + 1).padStart(2, "0"))}
                </span>
              </div>

              <figcaption>
                <strong>{tr(shot.title)}</strong>
                <span>{tr(shot.caption)}</span>
              </figcaption>
            </figure>))}
        </div>) : (<a href={brand.instagramUrl} target="_blank" rel="noopener noreferrer" className={s.instagramPanel}>
          <span className={s.eyebrow} dir="ltr">DOPAMINE.AUTO.SPA</span>

          <strong>{tr("autoSpa.see_the_work")}<br />{tr("autoSpa.choose_with_confidence")}</strong>

          <span className={s.textLink}>{tr("autoSpa.visit_our_profile")}{" "}<span aria-hidden="true">↗</span>
          </span>

          <span className={s.panelWatermark} aria-hidden="true" dir="ltr">
            D
          </span>
        </a>))}
    </section>);
}
