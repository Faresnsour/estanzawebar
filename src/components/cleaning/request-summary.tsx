"use client";
import { useI18n } from "@/i18n/LocaleProvider";
import { quoteTotal, lineCents, type CleaningRequest } from "@/lib/cleaning-demo";
import s from "@/components/estanza.module.css";
import c from "./cleaning.module.css";

export function useDemoFormat() {
  const { locale } = useI18n();
  return {
    money: (amount: number, currency: string) => new Intl.NumberFormat(locale, { style: "currency", currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount),
    date: (value: string) => value ? new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(new Date(`${value}T12:00:00`)) : "",
    number: (value: number) => new Intl.NumberFormat(locale).format(value),
  };
}
export function RequestSummary({ request, showStatus = true }: { request: CleaningRequest; showStatus?: boolean }) {
  const { t } = useI18n(); const f = useDemoFormat();
  return <dl className={`${s.requestDetails} ${c.summary}`}>
    <div><dt>{t("clean.name")}</dt><dd>{t(request.name)}</dd></div>
    <div><dt>{t("clean.service")}</dt><dd>{t(`clean.service_${request.service}`)}</dd></div>
    <div><dt>{t("clean.area")}</dt><dd>{t(request.area)}</dd></div>
    <div><dt>{t(request.service === "deep" ? "clean.size" : "clean.quantity")}</dt><dd>{request.service === "deep" ? t(request.size) : f.number(request.quantity)}</dd></div>
    {showStatus ? <div><dt>{t("clean.status")}</dt><dd>{t(`clean.status_${request.status}`)}</dd></div> : null}
  </dl>;
}
export function QuoteSummary({ request }: { request: CleaningRequest }) {
  const { t } = useI18n(); const f = useDemoFormat();
  return <div className={c.quoteSummary}>
    <p className={s.helper}>{t("clean.quote_hint")}</p>
    <dl>{request.quote.map((line, index) => <div className={c.quoteRow} key={index}>
      <dt>{t(line.description)}<small>{f.number(line.quantity)} × <bdi>{f.money(line.price, request.currency)}</bdi></small></dt>
      <dd><bdi>{f.money(lineCents(line) / 100, request.currency)}</bdi></dd>
    </div>)}</dl>
    <p className={c.quoteTotal}><span>{t("clean.total")}</span><strong><bdi>{f.money(quoteTotal(request.quote), request.currency)}</bdi></strong></p>
  </div>;
}
