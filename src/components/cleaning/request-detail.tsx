"use client";
import { useState } from "react";
import { useI18n } from "@/i18n/LocaleProvider";
import { CURRENCIES, quoteTotal, type CleaningRequest, type DemoAction, type QuoteLine, type Currency, type Status } from "@/lib/cleaning-demo";
import { RequestSummary, QuoteSummary, useDemoFormat } from "./request-summary";
import { Field } from "./request-form";
import s from "@/components/estanza.module.css";
import c from "./cleaning.module.css";

type Props = { request: CleaningRequest; onAction: (action: DemoAction) => boolean };
export default function RequestDetail({ request: r, onAction }: Props) {
  const { t } = useI18n(); const f = useDemoFormat();
  const [note, setNote] = useState("");
  const [lines, setLines] = useState<QuoteLine[]>(() => r.quote.length ? r.quote.map(line => ({ ...line })) : [{ description: `clean.service_${r.service}`, quantity: r.quantity, price: 0 }]);
  const [currency, setCurrency] = useState<Currency>(r.currency);
  const [copyState, setCopyState] = useState("");
  const final = ["completed", "closed"].includes(r.status);
  const lockedQuote = final || r.status === "scheduled";
  const changeLine = (index: number, change: Partial<QuoteLine>) => setLines(current => current.map((line, i) => i === index ? { ...line, ...change } : line));
  const followupText = t("clean.followup_text", [t(r.name), t(`clean.service_${r.service}`), f.money(quoteTotal(r.quote), r.currency)]);

  return <div className={c.detail}>
    <section className={c.panel} aria-labelledby="detail-heading">
      <div className={c.panelHeading}><h2 id="detail-heading" tabIndex={-1}>{t("clean.details")} <bdi>{r.id}</bdi></h2><strong className={c.status}>{t(`clean.status_${r.status}`)}</strong></div>
      <RequestSummary request={r} showStatus={false} />
      <dl className={`${s.requestDetails} ${c.summary}`}><div><dt>{t("clean.contact")}</dt><dd>{t(r.contact)}</dd></div><div><dt>{t("clean.preferred_date")}</dt><dd>{r.preferredDate ? f.date(r.preferredDate) : t("clean.none")}</dd></div><div><dt>{t("clean.last_action")}</dt><dd>{t(r.lastAction)}</dd></div><div><dt>{t("clean.next_followup")}</dt><dd>{r.followUp ? f.date(r.followUp) : t("clean.none")}</dd></div></dl>
      {final ? <p className={s.helper}>{t("clean.final_hint")}</p> : null}
      <div className={c.formGrid}>
        <Field label={t("clean.owner")}><select name="owner" value={r.owner} onChange={event => onAction({ type: "owner", id: r.id, owner: event.target.value })}>{["unassigned", "a", "b"].map(owner => <option key={owner} value={owner}>{t(`clean.owner_${owner}`)}</option>)}</select></Field>
        {!final && !["approved", "scheduled"].includes(r.status) ? <Field label={t("clean.change_status")} hint={t("clean.status_hint")}><select name="status" value={r.status} onChange={event => onAction({ type: "status", id: r.id, status: event.target.value as Status })}>{["new", "needs_info", "quote_sent", "awaiting_reply", "closed"].map(status => <option key={status} value={status} disabled={["quote_sent", "awaiting_reply"].includes(status) && !r.quoteShared}>{t(`clean.status_${status}`)}</option>)}</select></Field> : null}
      </div>
      {r.status === "approved" ? <button className={`${s.button} ${s.secondaryButton}`} type="button" onClick={() => { if (window.confirm(t("clean.close_confirm"))) onAction({ type: "status", id: r.id, status: "closed" }); }}>{t("clean.close_request")}</button> : null}
    </section>

    <section className={c.panel} aria-labelledby="quote-heading">
      <h2 id="quote-heading">{t("clean.quote_title")}</h2><p className={s.helper}>{t("clean.quote_hint")}</p>
      {!lockedQuote ? <form noValidate onSubmit={event => { event.preventDefault(); onAction({ type: "quote", id: r.id, lines, currency }); }}>
        <Field label={t("clean.currency")} hint={t("clean.currency_hint")}><select name="quote-currency" value={currency} onChange={event => setCurrency(event.target.value as Currency)}>{CURRENCIES.map(code => <option key={code}>{code}</option>)}</select></Field>
        <div className={c.quoteEditor}>{lines.map((line, index) => <fieldset key={index} className={c.quoteLine}>
          <legend>{t("clean.quote_item")} {f.number(index + 1)}</legend>
          <Field label={t("clean.quote_item")}><input name={`line-${index}-description`} autoComplete="off" maxLength={120} value={t(line.description)} onChange={event => changeLine(index, { description: event.target.value })} /></Field>
          <div className={c.formGrid}>
            <Field label={t("clean.quote_quantity")}><input name={`line-${index}-quantity`} type="number" min={1} max={100} step={1} value={line.quantity || ""} onChange={event => changeLine(index, { quantity: Number(event.target.value) })} /></Field>
            <Field label={t("clean.unit_price")}><input name={`line-${index}-price`} type="number" inputMode="decimal" min="0.01" max={100000} step="0.01" value={line.price || ""} onChange={event => changeLine(index, { price: Number(event.target.value) })} /></Field>
          </div>
          <button type="button" className={s.textLink} disabled={lines.length === 1} onClick={() => setLines(current => current.filter((_, i) => i !== index))}>{t("clean.remove_line", [f.number(index + 1)])}</button>
        </fieldset>)}</div>
        <div className={s.actions}><button type="button" className={`${s.button} ${s.secondaryButton}`} disabled={lines.length >= 12} onClick={() => setLines(current => [...current, { description: "", quantity: 1, price: 0 }])}>{t("clean.add_line")}</button><p className={c.quoteTotal}>{t("clean.total")} <strong><bdi>{f.money(quoteTotal(lines), currency)}</bdi></strong></p></div>
        <p className={s.helper}>{t("clean.quote_save_hint")}</p><button type="submit" className={s.button}>{t("clean.save_quote")}</button>
      </form> : null}
      {r.quote.length ? <>
        {!lockedQuote && !r.quoteApproved ? <div className={c.subsection}><button className={`${s.button} ${s.secondaryButton}`} type="button" disabled={r.quoteShared} onClick={() => onAction({ type: "share", id: r.id })}>{t("clean.share_quote")}</button><p className={s.helper}>{t("clean.share_hint")}</p></div> : null}
        <details className={c.customerPreview} open={r.quoteShared || r.quoteApproved}>
          <summary>{t("clean.customer_preview")}</summary>
          <p className={s.helper}>{t("clean.customer_hint")}</p><QuoteSummary request={r} />
          {r.quoteShared && !r.quoteApproved && !lockedQuote ? <div className={s.actions}>
            <button type="button" className={s.button} onClick={() => onAction({ type: "approve", id: r.id })}>{t("clean.approve")}</button>
            <button type="button" className={`${s.button} ${s.secondaryButton}`} onClick={() => onAction({ type: "revise", id: r.id })}>{t("clean.revise")}</button>
          </div> : null}
        </details>
      </> : <p className={s.helper}>{t("clean.quote_empty")}</p>}
    </section>

    {!final ? <section className={c.panel} aria-labelledby="followup-heading">
      <h2 id="followup-heading">{t("clean.followup_title")}</h2>
      <form key={r.followUp} noValidate onSubmit={event => { event.preventDefault(); const data = new FormData(event.currentTarget); onAction({ type: "followup", id: r.id, date: String(data.get("followup") || "") }); }}>
        <Field label={t("clean.followup_date")} hint={t("clean.followup_hint")}><input type="date" name="followup" defaultValue={r.followUp} /></Field><button type="submit" className={`${s.button} ${s.secondaryButton}`}>{t("clean.save_followup")}</button>
      </form>
      {r.quoteShared ? <div className={c.subsection}>
        <Field label={t("clean.followup_preview")}><textarea rows={4} readOnly value={followupText} name="followup-text" /></Field>
        <button type="button" className={s.textLink} onClick={async () => { try { await navigator.clipboard.writeText(followupText); setCopyState("clean.copied"); } catch { setCopyState("clean.copy_failed"); } }}>{t("clean.copy")}</button>
        <p className={s.helper} role="status">{t(copyState)}</p>
      </div> : null}
    </section> : null}

    <section className={c.panel} aria-labelledby="schedule-heading">
      <h2 id="schedule-heading">{t("clean.schedule_title")}</h2><p className={s.helper}>{t("clean.schedule_hint")}</p>
      {r.quoteApproved && !final ? <form noValidate onSubmit={event => { event.preventDefault(); const data = new FormData(event.currentTarget); onAction({ type: "schedule", id: r.id, schedule: { date: String(data.get("job-date") || ""), start: String(data.get("job-start") || ""), end: String(data.get("job-end") || ""), team: String(data.get("job-team") || "") } }); }}>
        <div className={c.formGrid}>
          <Field label={t("clean.date")}><input type="date" name="job-date" defaultValue={r.schedule?.date || r.preferredDate} /></Field>
          <Field label={t("clean.team")}><select name="job-team" defaultValue={r.schedule?.team || "a"}>{["a", "b"].map(team => <option key={team} value={team}>{t(`clean.team_${team}`)}</option>)}</select></Field>
          <Field label={t("clean.start")}><input type="time" name="job-start" defaultValue={r.schedule?.start || "09:00"} /></Field>
          <Field label={t("clean.end")}><input type="time" name="job-end" defaultValue={r.schedule?.end || "11:00"} /></Field>
        </div>
        <button type="submit" className={s.button}>{t("clean.save_schedule")}</button>
      </form> : <p className={s.helper}>{t(final ? "clean.final_hint" : "clean.approval_needed")}</p>}
      {r.schedule ? <p className={c.scheduledSummary} data-schedule-summary>{f.date(r.schedule.date)} — <bdi>{r.schedule.start}–{r.schedule.end}</bdi> — {t(`clean.team_${r.schedule.team}`)}</p> : null}
      {r.status === "scheduled" ? <button type="button" className={`${s.button} ${s.secondaryButton}`} onClick={() => onAction({ type: "complete", id: r.id })}>{t("clean.complete")}</button> : null}
      <p className={s.helper}>{t("clean.conflict_hint")}</p>
    </section>

    <section className={c.panel} aria-labelledby="notes-heading">
      <h2 id="notes-heading">{t("clean.notes")}</h2>
      {r.notes.length ? <ul className={c.notes}>{r.notes.map((item, index) => <li key={index}>{item}</li>)}</ul> : <p className={s.helper}>{t("clean.note_empty")}</p>}
      <form noValidate onSubmit={event => { event.preventDefault(); if (onAction({ type: "note", id: r.id, note })) setNote(""); }}>
        <Field label={t("clean.add_note")}><textarea name="note" rows={3} maxLength={500} value={note} onChange={event => setNote(event.target.value)} /></Field><button className={`${s.button} ${s.secondaryButton}`} type="submit">{t("clean.save_note")}</button>
      </form>
    </section>
  </div>;
}
