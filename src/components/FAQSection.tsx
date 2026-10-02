"use client";
import s from "./estanza.module.css";
import { source } from "@/i18n/messages";
import { useI18n } from "@/i18n/LocaleProvider";
const faqs = [
    { question: source("faq.is_there_a_monthly_subscription"), answer: source("faq.the_launch_plan_is_a_one_time") },
    { question: source("faq.do_i_need_a_new_whatsapp_number"), answer: source("faq.booking_requests_can_go_to_your_centre") },
    { question: source("faq.does_the_customer_need_an_app_or"), answer: source("faq.no_customers_open_your_centre_s_link") },
    { question: source("faq.is_an_appointment_confirmed_when_a_request"), answer: source("faq.the_customer_sends_a_request_and_your") },
    { question: source("faq.what_if_my_services_or_prices_change"), answer: source("faq.they_can_be_updated_later_we_agree") },
    { question: source("faq.is_support_available_after_delivery"), answer: source("faq.you_can_reach_us_on_whatsapp_the") },
];
export default function FAQSection() {
  const { t: tr } = useI18n();
  return <section id="faq" aria-labelledby="faq-title" className={`${s.system} ${s.section} ${s.faq}`}>
    <div className={`${s.container} ${s.split}`}>
      <div><p className={s.sectionLabel}>{tr("faq.before_we_talk")}</p><h2 id="faq-title" className={s.sectionTitle}>{tr("faq.your_questions_answered")}</h2></div>
      <div className={s.questions}>{faqs.map((faq) => <details key={faq.question} className={s.question}>
        <summary>{tr(faq.question)}<span aria-hidden="true">+</span></summary><p>{tr(faq.answer)}</p>
      </details>)}</div>
    </div>
  </section>;
}
