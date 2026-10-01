import Image from "next/image";
import { brand, resultShots } from "../_data/packages";
import s from "../auto-spa.module.css";

export function Results() {
  return (
    <section
      id="results"
      className={`${s.section} ${s.resultsSection}`}
      aria-labelledby="results-title"
    >
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
          <p>شاهد أعمال المركز وتفاصيل العناية من داخل الورشة.</p>

          <a
            href={brand.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={s.textLink}
          >
            افتح Instagram <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      {resultShots.length > 0 ? (
        <div className={s.resultsGrid}>
          {resultShots.map((shot, index) => (
            <figure key={shot.src} className={s.resultFigure}>
              <div className={s.resultImageWrap}>
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  sizes="(max-width: 720px) 100vw, 50vw"
                  loading="lazy"
                  width={1000}
                  height={800}
                />

                <span className={s.imageIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <figcaption>
                <strong>{shot.title}</strong>
                <span>{shot.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <a
          href={brand.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={s.instagramPanel}
        >
          <span className={s.eyebrow} dir="ltr">DOPAMINE.AUTO.SPA</span>

          <strong>
            شوف الشغل.
            <br />
            وخذ قرارك.
          </strong>

          <span className={s.textLink}>
            استكشف حساب المركز <span aria-hidden="true">↗</span>
          </span>

          <span className={s.panelWatermark} aria-hidden="true" dir="ltr">
            D
          </span>
        </a>
      )}
    </section>
  );
}