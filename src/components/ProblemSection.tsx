"use client";
import s from "./estanza.module.css";
import { source } from "@/i18n/messages";
import { useI18n } from "@/i18n/LocaleProvider";
import { Check } from "lucide-react";
const problems = [
    { badge: source("problems.after_hours_enquiries"), title: source("problems.customers_want_to_book_while_you_re"), description: source("problems.they_find_your_work_at_night_then"), impact: source("problems.a_booking_page_they_can_use_anytime") },
    { badge: source("problems.repeat_conversations"), title: source("problems.the_same_booking_questions_every_day"), description: source("problems.how_much_how_long_what_times_are"), impact: source("problems.collect_the_details_from_the_start") },
    { badge: source("problems.scheduling_conflicts"), title: source("problems.two_requests_for_the_same_time"), description: source("problems.appointment_details_are_scattered_across_chats"), impact: source("problems.organised_requests_that_fit_your_setup") },
];
export default function ProblemSection() {
  const { t: tr } = useI18n();
  return <section id="features" aria-labelledby="problems-title" className={`${s.system} ${s.section} ${s.problem}`}>
    <div className={`${s.container} ${s.split}`}>
      <div><p className={s.sectionLabel}>{tr("problems.everyday_booking_problems")}</p><h2 id="problems-title" className={s.sectionTitle}>{tr("problems.how_many_messages_does_one_appointment_take")}</h2></div>
      <div className={s.problemRows}>{problems.map((item) => <article key={item.badge} className={s.problemRow}>
        <h3>{tr(item.title)}</h3><p>{tr(item.description)}</p><p className={s.impact}><Check aria-hidden="true" />{tr(item.impact)}</p>
      </article>)}</div>
    </div>
  </section>;
}
