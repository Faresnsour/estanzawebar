"use client";
import s from "./estanza.module.css";
import { source } from "@/i18n/messages";
import { useI18n } from "@/i18n/LocaleProvider";
const steps = [
    { title: source("clean.process_1"), description: source("clean.process_1_body") },
    { title: source("clean.process_2"), description: source("clean.process_2_body") },
    { title: source("clean.process_3"), description: source("clean.process_3_body") },
];
export default function HowItWorks() {
  const { t: tr, locale } = useI18n();
  return <section id="how-it-works" aria-labelledby="how-title" className={`${s.system} ${s.section} ${s.process}`}>
    <div className={s.container}>
      <p className={s.sectionLabel}>{tr("howItWorks.how_it_works")}</p><h2 id="how-title" className={s.sectionTitle}>{tr("clean.process_title")}</h2>
      <ol className={s.steps}>{steps.map((step, index) => <li key={step.title}>
        <span className={s.stepNumber} aria-hidden="true">{new Intl.NumberFormat(locale, {minimumIntegerDigits: 2}).format(index + 1)}</span>
        <div><h3>{tr(step.title)}</h3><p>{tr(step.description)}</p></div>
      </li>)}</ol>
    </div>
  </section>;
}
