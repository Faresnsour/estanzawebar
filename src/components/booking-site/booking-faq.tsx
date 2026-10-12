"use client";
import { Accordion } from "@base-ui/react/accordion";
import { Plus } from "lucide-react";
import s from "./booking-site.module.css";

export default function BookingFaq({ items }: { items: { question: string; answer: string }[] }) {
  return <Accordion.Root multiple>
    {items.map((item, index) => <Accordion.Item key={index} value={index} className={s.faqItem}>
      <Accordion.Header className={s.faqHeading}>
        <Accordion.Trigger className={s.faqTrigger}>{item.question}<Plus size={18} aria-hidden="true" /></Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Panel className={s.faqPanel}><p>{item.answer}</p></Accordion.Panel>
    </Accordion.Item>)}
  </Accordion.Root>;
}
