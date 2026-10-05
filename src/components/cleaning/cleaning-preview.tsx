"use client";
import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/i18n/LocaleProvider";
import { quoteTotal, seedDemo } from "@/lib/cleaning-demo";
import { RequestSummary, QuoteSummary, useDemoFormat } from "./request-summary";
import s from "@/components/estanza.module.css";
import c from "./cleaning.module.css";
const sample = seedDemo("2030-01-01").requests[1];
const stages = ["new", "quote", "followup", "confirmed"] as const;
export default function CleaningPreview() {
  const { t } = useI18n(); const f = useDemoFormat();
  const [stage, setStage] = useState<typeof stages[number]>("followup");
  return <div className={`${s.desk} ${c.previewDesk}`}>
    <div className={`${s.deskContext} ${c.previewContext}`}>
      <div className={s.deskCaption}>
        <span className={s.captionLabel}>{t("clean.preview_label")}</span>
        <h2>{t("clean.preview_title")}</h2><p>{t("clean.preview_body")}</p>
        <ol className={c.previewJourney}>{stages.map((item, index) => <li key={item} data-current={stage === item}><span aria-hidden="true">{index + 1}</span>{t(`clean.preview_${item}`)}</li>)}</ol>
        <Link className={s.lightLink} href="/cleaning/demo" data-cta="demo" data-source="cleaning-preview">{t("clean.journey_cta")}</Link>
      </div>
    </div>
    <div className={s.preview}>
      <p className={s.helper}>{t("clean.demo_notice")}</p>
      <div className={`${s.viewControls} ${c.previewTabs}`} role="group" aria-label={t("clean.preview_stages")}>
        {stages.map(item => <button type="button" key={item} aria-pressed={stage === item} onClick={() => setStage(item)}>{t(`clean.preview_${item}`)}</button>)}
      </div>
      <div className={c.previewContent} aria-live="polite">
        <h3>{t(`clean.preview_${stage}`)}</h3>
        {stage === "quote" ? <QuoteSummary request={sample} /> : <RequestSummary request={{ ...sample, status: stage === "confirmed" ? "scheduled" : stage === "followup" ? "awaiting_reply" : "new" }} />}
        {stage === "new" ? <p className={s.helper}>{t("clean.preview_preference")}</p> : null}
        {stage === "followup" ? <dl className={`${s.requestDetails} ${c.summary}`}>
          <div><dt>{t("clean.total")}</dt><dd><bdi>{f.money(quoteTotal(sample.quote), sample.currency)}</bdi></dd></div>
          <div><dt>{t("clean.preview_next_action")}</dt><dd>{t("clean.preview_followup_action")}</dd></div>
          <div><dt>{t("clean.next_followup")}</dt><dd><time dateTime={sample.followUp}>{f.date(sample.followUp)}</time></dd></div>
        </dl> : null}
        {stage === "confirmed" ? <p className={s.helper}>{t("clean.preview_confirmed_body")}</p> : null}
      </div>
      <Link href="/cleaning/demo" className={`${s.button} ${s.fullButton}`} data-cta="demo" data-source="cleaning-preview">{t("clean.demo_cta")}</Link>
    </div>
  </div>;
}
