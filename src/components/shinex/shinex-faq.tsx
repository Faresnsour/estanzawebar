"use client";
import { Accordion } from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";
import s from "./shinex.module.css";
export default function ShinexFaq({ items }: { items: { question: string; answer: string }[] }) {
  return <Accordion.Root defaultValue={[0]} multiple className={s.faqList}>
    {items.map((item, index) => <Accordion.Item key={index} value={index} className={s.faqItem}>
      <Accordion.Header><Accordion.Trigger className={s.faqTrigger}>{item.question}<ChevronDown size={20} aria-hidden="true" /></Accordion.Trigger></Accordion.Header>
      <Accordion.Panel><p>{item.answer}</p></Accordion.Panel>
    </Accordion.Item>)}
  </Accordion.Root>;
}
