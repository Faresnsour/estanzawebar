"use client";
import { useState, type ReactNode } from "react";
import { useI18n } from "@/i18n/LocaleProvider";
import { SERVICES, validateRequest, localDay, type RequestInput } from "@/lib/cleaning-demo";
import s from "@/components/estanza.module.css";
import c from "./cleaning.module.css";
export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return <label className={c.field}><span>{label}</span>{children}{hint ? <small>{hint}</small> : null}</label>;
}
const empty: RequestInput = { name: "", contact: "", area: "", service: "sofa", quantity: "1", size: "", preferredDate: "", notes: "" };
export default function RequestForm({ onAdd }: { onAdd: (input: RequestInput) => void }) {
  const { t } = useI18n();
  const [input, setInput] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const set = (field: keyof RequestInput, value: string) => setInput(previous => ({ ...previous, [field]: value }));
  const props = (field: keyof RequestInput) => ({ id: `request-${field}`, name: field, value: input[field], "aria-invalid": !!errors[field], "aria-describedby": errors[field] ? `error-${field}` : undefined });
  const error = (field: keyof RequestInput) => errors[field] ? <small className={c.errorText} id={`error-${field}`}>{t(errors[field])}</small> : null;
  return <section className={c.panel} aria-labelledby="request-form-title">
    <h2 id="request-form-title">{t("clean.form_title")}</h2><p className={s.helper}>{t("clean.form_hint")}</p>
    <form noValidate onSubmit={event => { event.preventDefault(); const next = validateRequest(input, localDay()); setErrors(next); if (Object.keys(next).length) { requestAnimationFrame(() => document.getElementById(`request-${Object.keys(next)[0]}`)?.focus()); return; } onAdd(input); }}>
      {Object.keys(errors).length ? <div className={c.errorBox} role="alert"><p>{t("clean.error_form")}</p><ul>{Object.entries(errors).map(([field, key]) => <li key={field}><a href={`#request-${field}`}>{t(key)}</a></li>)}</ul></div> : null}
      <div className={c.formGrid}>
        <Field label={t("clean.name")}><input {...props("name")} autoComplete="off" maxLength={100} required onChange={e => set("name", e.target.value)} />{error("name")}</Field>
        <Field label={t("clean.contact")} hint={t("clean.contact_hint")}><input {...props("contact")} autoComplete="off" spellCheck={false} maxLength={100} required onChange={e => set("contact", e.target.value)} />{error("contact")}</Field>
        <Field label={t("clean.area")} hint={t("clean.area_hint")}><input {...props("area")} autoComplete="off" maxLength={100} required onChange={e => set("area", e.target.value)} />{error("area")}</Field>
        <Field label={t("clean.service")}><select {...props("service")} onChange={e => set("service", e.target.value)}>{SERVICES.map(service => <option key={service} value={service}>{t(`clean.service_${service}`)}</option>)}</select></Field>
        {input.service === "deep" ? <Field label={t("clean.size")}><input {...props("size")} autoComplete="off" required maxLength={200} onChange={e => set("size", e.target.value)} />{error("size")}</Field> : <Field label={t("clean.quantity")}><input {...props("quantity")} type="number" inputMode="numeric" min={1} max={100} step={1} required onChange={e => set("quantity", e.target.value)} />{error("quantity")}</Field>}
        <Field label={`${t("clean.preferred_date")} (${t("clean.optional")})`}><input {...props("preferredDate")} type="date" onChange={e => set("preferredDate", e.target.value)} />{error("preferredDate")}</Field>
      </div>
      <Field label={`${t("clean.notes")} (${t("clean.optional")})`}><textarea {...props("notes")} rows={3} maxLength={500} onChange={e => set("notes", e.target.value)} />{error("notes")}</Field>
      <button className={s.button} type="submit">{t("clean.add_request")}</button>
    </form>
  </section>;
}
