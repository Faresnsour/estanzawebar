"use client";
import s from "./estanza.module.css";
import { useI18n } from "@/i18n/LocaleProvider";
const faqs = [1, 2, 3, 4, 5, 6].map(n => ({ question: `clean.faq_${n}_q`, answer: `clean.faq_${n}_a` }));
export default function FAQSection() {
  const { t: tr } = useI18n();
  return <section id="faq" aria-labelledby="faq-title" className={`${s.system} ${s.section} ${s.faq}`}>
    <div className={`${s.container} ${s.split}`}>
      <div><p className={s.sectionLabel}>{tr("faq.before_we_talk")}</p><h2 id="faq-title" className={s.sectionTitle}>{tr("clean.faq_title")}</h2></div>
      <div className={s.questions}>{faqs.map((faq) => <details key={faq.question} className={s.question}>
        <summary>{tr(faq.question)}<span aria-hidden="true">+</span></summary><p>{tr(faq.answer)}</p>
      </details>)}</div>
    </div>
  </section>;
}
