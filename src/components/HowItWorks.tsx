"use client";
import s from "./estanza.module.css";
import { source } from "@/i18n/messages";
import { useI18n } from "@/i18n/LocaleProvider";
const steps = [
    { title: source("howItWorks.see_services_and_prices"), description: source("howItWorks.services_prices_and_durations_without_asking_your") },
    { title: source("howItWorks.pick_a_time_and_add_details"), description: source("howItWorks.a_preferred_day_and_time_plus_their") },
    { title: source("howItWorks.receive_the_request_on_whatsapp"), description: source("howItWorks.one_message_your_team_checks_availability_and") },
];
export default function HowItWorks() {
  const { t: tr, locale } = useI18n();
  return <section id="how-it-works" aria-labelledby="how-title" className={`${s.system} ${s.section} ${s.process}`}>
    <div className={s.container}>
      <p className={s.sectionLabel}>{tr("howItWorks.how_it_works")}</p><h2 id="how-title" className={s.sectionTitle}>{tr("howItWorks.three_steps_one_clear_request")}</h2>
      <ol className={s.steps}>{steps.map((step, index) => <li key={step.title}>
        <span className={s.stepNumber} aria-hidden="true">{new Intl.NumberFormat(locale, {minimumIntegerDigits: 2}).format(index + 1)}</span>
        <div><h3>{tr(step.title)}</h3><p>{tr(step.description)}</p></div>
      </li>)}</ol>
    </div>
  </section>;
}
