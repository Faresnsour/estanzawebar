"use client";
import Link from "next/link";
import { useI18n } from "@/i18n/LocaleProvider";
import s from "./estanza.module.css";
export default function ProblemSection() {
  const { t } = useI18n();
  return <section id="features" aria-labelledby="service-title" className={`${s.system} ${s.section} ${s.problem}`}>
    <div className={`${s.container} ${s.split}`}>
      <div><p className={s.sectionLabel}>{t("clean.current_focus")}</p><h2 id="service-title" className={s.sectionTitle}>{t("clean.service_name")}</h2></div>
      <div className={s.problemRows}>
        <article className={s.problemRow}><h3>{t("clean.audience_title")}</h3><p>{t("clean.service_intro")}</p></article>
        <article className={s.problemRow}><h3>{t("clean.scope_title")}</h3><p>{t("clean.scope_body")}</p><Link href="/cleaning" className={s.textLink}>{t("clean.service_link")}</Link></article>
      </div>
    </div>
  </section>;
}
