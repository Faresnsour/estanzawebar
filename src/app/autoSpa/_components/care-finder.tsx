import { goals } from "../_data/packages";
import { BookButton } from "./booking/booking-sheet";
import s from "../auto-spa.module.css";

export function CareFinder() {
  return (
    <section id="care" className={s.section} aria-labelledby="care-title">
      <div className={s.sectionHeading}>
        <div>
          <p className={s.eyebrow} dir="ltr">01 / FIND YOUR CARE</p>
          <h2 id="care-title" className={s.sectionTitle}>
            كيف تحب
            <br />
            تستلم سيارتك؟
          </h2>
        </div>

        <p className={s.sectionDescription}>
          ابدأ بالنتيجة التي تهمّك. سنقترح نقطة بداية، وتقدر تشوف جميع
          الباقات قبل اختيارك.
        </p>
      </div>

      <div className={s.goalList}>
        {goals.map((goal, index) => (
          <BookButton
            key={goal.id}
            goal={goal.id}
            className={s.goalRow}
          >
            <span className={s.rowNumber}>
              {String(index + 1).padStart(2, "0")}
            </span>

            <span className={s.goalCopy}>
              <strong>{goal.title}</strong>
              <span>{goal.description}</span>
            </span>

            <span className={s.goalEnglish} dir="ltr">
              {goal.english}
            </span>

            <span className={s.rowArrow} aria-hidden="true">↗</span>
          </BookButton>
        ))}
      </div>

      <p className={s.smallNote}>
        محتار؟ تقدر تبدأ من نوع السيارة وتراجع الخيارات بنفسك.
      </p>
    </section>
  );
}