import Image from "next/image";
import { brand } from "../_data/packages";
import { BookButton } from "./booking/booking-sheet";
import s from "../auto-spa.module.css";

function CarStudy() {
  return (
    <svg
      className={s.carStudy}
      viewBox="0 0 1000 560"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="dopamine-body" x1="220" y1="210" x2="650" y2="470">
          <stop stopColor="#707681" />
          <stop offset=".3" stopColor="#242831" />
          <stop offset="1" stopColor="#0c0e13" />
        </linearGradient>

        <linearGradient id="dopamine-glass" x1="460" y1="175" x2="590" y2="305">
          <stop stopColor="#8a91a0" />
          <stop offset="1" stopColor="#11141b" />
        </linearGradient>

        <linearGradient id="dopamine-light">
          <stop stopColor="#e7ecff" />
          <stop offset="1" stopColor="#728bff" />
        </linearGradient>
      </defs>

      <ellipse cx="530" cy="456" rx="335" ry="25" fill="#000" opacity=".55" />

      <path
        d="M141 376 190 303 343 267 433 186 Q456 167 489 168
           L650 179 Q683 183 713 215 L776 277 851 308
           Q877 319 882 349 L889 401 855 424 180 424
           Q151 419 141 397Z"
        fill="url(#dopamine-body)"
        stroke="#555c69"
        strokeWidth="2"
      />

      <path
        d="M363 267 442 194 Q459 181 488 183
           L555 188 568 270Z"
        fill="url(#dopamine-glass)"
        stroke="#7f8795"
        strokeWidth="2"
      />

      <path
        d="M575 191 647 195 Q669 199 693 221 L740 271 589 270Z"
        fill="#181c25"
        stroke="#626b7b"
        strokeWidth="2"
      />

      <path d="m343 278 402 8 97 31" stroke="#949baa" strokeOpacity=".6" />
      <path d="m571 287 3 101M755 292l34 99" stroke="#0a0c11" strokeWidth="3" />
      <path d="m206 329 127-23" stroke="#b1b7c1" strokeOpacity=".4" />
      <path d="M388 392h304" stroke="#747c8b" strokeOpacity=".4" />

      <path
        d="m163 350 138-22-10 24-129 19Z"
        fill="url(#dopamine-light)"
      />

      <path d="m854 328 19 11 4 24-29-8Z" fill="#7489dc" />

      <path d="m166 386 112-11-3 28-106 2Z" fill="#080a0f" />
      <path d="M289 382h50" stroke="#697181" strokeWidth="3" />

      <circle cx="342" cy="411" r="61" fill="#090b10" />
      <circle cx="342" cy="411" r="43" fill="#313642" stroke="#737b89" />
      <circle cx="342" cy="411" r="14" fill="#10131a" />

      <circle cx="775" cy="411" r="61" fill="#090b10" />
      <circle cx="775" cy="411" r="43" fill="#313642" stroke="#737b89" />
      <circle cx="775" cy="411" r="14" fill="#10131a" />

      <g stroke="#a1a9b8" strokeWidth="4">
        <path d="m342 370 0 27m0 28v27m-41-41h27m28 0h27" />
        <path d="m775 370 0 27m0 28v27m-41-41h27m28 0h27" />
        <path d="m313 382 19 19m20 20 19 19m0-58-19 19m-20 20-19 19" />
        <path d="m746 382 19 19m20 20 19 19m0-58-19 19m-20 20-19 19" />
      </g>
    </svg>
  );
}

export function AutoSpaHero() {
  return (
    <section id="home" className={s.hero} aria-labelledby="hero-title">
      <div className={s.heroGeometry} aria-hidden="true" />

      <div className={s.heroVisual}>
        {brand.heroImage ? (
          <Image
            src={brand.heroImage}
            alt="سيارة داخل ورشة DOPAMINE"
            className={s.heroImage}
            width={1440}
            height={1000}
            sizes="(max-width: 720px) 100vw, 65vw"
            loading="eager"
            fetchPriority="high"
          />
        ) : (
          <CarStudy />
        )}
      </div>

      <div className={s.heroContent}>
        <p className={s.eyebrow} dir="ltr">
          MUSCAT, OMAN / AUTO CARE STUDIO
        </p>

        <h1 id="hero-title" className={s.heroTitle} dir="ltr">
          FEEL
          <br />
          THE <span>SHINE.</span>
        </h1>

        <div className={s.heroCopy}>
          <h2>سيارتك تستحق المعاملة الصح.</h2>
          <p>
            اختر العناية المناسبة، اطّلع على التفاصيل، وجهّز طلب موعدك
            بخطوات واضحة.
          </p>
        </div>

        <div className={s.heroActions}>
          <BookButton className={s.primaryButton}>
            ابدأ اختيار العناية
            <span aria-hidden="true">↗</span>
          </BookButton>

          <a href="#results" className={s.textLink}>
            شاهد أعمال المركز <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <div className={s.heroBottom}>
        <span>{brand.address}</span>
        <a href="#care" aria-label="استكشف الصفحة">
          <span dir="ltr">SCROLL TO EXPLORE</span>
          <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}