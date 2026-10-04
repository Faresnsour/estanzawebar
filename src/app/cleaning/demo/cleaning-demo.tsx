"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/i18n/LocaleProvider";
import Navbar from "@/components/Navbar";
import RequestForm from "@/components/cleaning/request-form";
import RequestDetail from "@/components/cleaning/request-detail";
import { useDemoFormat } from "@/components/cleaning/request-summary";
import { STATUSES, seedDemo, updateDemo, needsFollowUp, metrics, localDay, DemoError, type DemoAction } from "@/lib/cleaning-demo";
import s from "@/components/estanza.module.css";
import c from "@/components/cleaning/cleaning.module.css";

type View = "requests" | "new" | "jobs" | "detail";
export default function CleaningDemo({ referenceDay }: { referenceDay: string }) {
  const { t } = useI18n(); const f = useDemoFormat();
  const [state, setState] = useState(() => seedDemo(referenceDay));
  const [view, setView] = useState<View>("requests");
  const [selected, setSelected] = useState(state.requests[0].id);
  const [search, setSearch] = useState(""); const [filter, setFilter] = useState("all");
  const [notice, setNotice] = useState({ text: "", error: false });
  const noticeRef = useRef<HTMLDivElement>(null); const contentRef = useRef<HTMLDivElement>(null);
  const counts = metrics(state.requests);
  const today = localDay();
  const shown = state.requests.filter(r => (filter === "all" || (filter === "due" ? needsFollowUp(r, today) : r.status === filter)) && [t(r.name), t(r.area), r.id].some(value => value.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase())));
  const request = state.requests.find(r => r.id === selected)!;
  const jobs = state.requests.filter(r => r.status === "scheduled" && r.schedule).sort((a, b) => `${a.schedule!.date}${a.schedule!.start}`.localeCompare(`${b.schedule!.date}${b.schedule!.start}`));
  const navigate = (next: View) => { setView(next); setNotice({ text: "", error: false }); requestAnimationFrame(() => contentRef.current?.focus({ preventScroll: true })); };
  const action = (a: DemoAction) => {
    try {
      const next = updateDemo(state, a); setState(next);
      setNotice({ text: a.type === "add" ? "clean.added" : "clean.saved", error: false });
      if (a.type === "add") { setSelected(next.requests[0].id); setView("detail"); }
      if (["add", "approve", "revise", "complete"].includes(a.type)) {
        requestAnimationFrame(() => contentRef.current?.querySelector<HTMLElement>("#detail-heading")?.focus());
      }
      return true;
    } catch (error) {
      setNotice({ text: error instanceof DemoError ? error.message : "clean.error_form", error: true });
      requestAnimationFrame(() => { noticeRef.current?.focus(); noticeRef.current?.scrollIntoView({ behavior: "instant", block: "center" }); });
      return false;
    }
  };
  const openRequest = (id: string) => { setSelected(id); navigate("detail"); };
  return <>
    <Navbar demoMode />
    <main id="main-content" className={`${s.system} ${s.page} ${c.demo}`}>
      <div className={s.container}>
        <header className={c.demoIntro}>
          <Link className={s.textLink} href="/cleaning">{t("clean.service_name")}</Link>
          <h1 className={s.sectionTitle}>{t("clean.demo_title")}</h1><p className={s.helper}>{t("clean.demo_intro")}</p>
        </header>
        <aside className={c.demoNotice}><strong>{t("clean.demo_notice")}</strong><p>{t("clean.session_notice")}</p></aside>
        <dl className={c.metrics}>
          {(["requests", "approved", "scheduled"] as const).map((key, i) => <div key={key}><dt>{t(["clean.requests", "clean.approved_quotes", "clean.scheduled_jobs"][i])}</dt><dd data-metric={key}>{f.number(counts[key])}</dd></div>)}
        </dl>
        <div className={c.toolbar}>
          <div role="group" aria-label={t("clean.demo_title")} className={c.viewButtons}>
            <button type="button" data-view="requests" aria-pressed={view === "requests" || view === "detail"} onClick={() => navigate("requests")}>{t("clean.request_list")}</button>
            <button type="button" data-view="new" aria-pressed={view === "new"} onClick={() => navigate("new")}>{t("clean.new_request")}</button>
            <button type="button" data-view="jobs" aria-pressed={view === "jobs"} onClick={() => navigate("jobs")}>{t("clean.schedule_list")}</button>
          </div>
          <button type="button" className={s.textLink} data-reset onClick={() => { if (!window.confirm(t("clean.reset_confirm"))) return; const next = seedDemo(localDay()); setState(next); setSelected(next.requests[0].id); setView("requests"); setSearch(""); setFilter("all"); setNotice({ text: "clean.reset_done", error: false }); }}>{t("clean.reset")}</button>
        </div>
        <div ref={noticeRef} tabIndex={-1} role={notice.error ? "alert" : "status"} className={notice.text ? notice.error ? c.errorBox : c.notice : undefined}>{t(notice.text)}</div>
        <div ref={contentRef} tabIndex={-1} className={c.content}>
          {view === "new" ? <RequestForm onAdd={input => action({ type: "add", input })} /> : null}
          {view === "requests" ? <section aria-labelledby="requests-heading">
            <h2 id="requests-heading" className={c.contentTitle}>{t("clean.request_list")}</h2>
            <div className={c.filters}>
              <label className={c.field}><span>{t("clean.search")}</span><input type="search" name="search" autoComplete="off" value={search} onChange={event => setSearch(event.target.value)} /></label>
              <label className={c.field}><span>{t("clean.filter")}</span><select name="filter" value={filter} onChange={event => setFilter(event.target.value)}><option value="all">{t("clean.all")}</option><option value="due">{t("clean.due")}</option>{STATUSES.map(status => <option key={status} value={status}>{t(`clean.status_${status}`)}</option>)}</select></label>
            </div>
            <p className={s.helper} role="status">{t("clean.results_count", [f.number(shown.length)])}</p>
            <div className={c.requestList}>{shown.map(r => <button key={r.id} type="button" className={c.requestRow} data-request-id={r.id} onClick={() => openRequest(r.id)}>
              <span><strong>{t(r.name)}</strong><small><bdi>{r.id}</bdi> · {t(`clean.service_${r.service}`)}</small></span>
              <span><strong>{t(`clean.status_${r.status}`)}</strong><small>{t("clean.owner")}: {t(`clean.owner_${r.owner}`)}</small></span>
              <span><small>{t("clean.last_action")}</small>{t(r.lastAction)}</span>
              <span><small>{t("clean.next_followup")}</small>{r.followUp ? f.date(r.followUp) : t("clean.none")}</span>
            </button>)}</div>
            {!shown.length ? <p className={c.empty}>{t("clean.no_results")}</p> : null}
          </section> : null}
          {view === "detail" ? <><button type="button" className={s.textLink} onClick={() => navigate("requests")}>{t("clean.back_requests")}</button><RequestDetail key={selected} request={request} onAction={action} /></> : null}
          {view === "jobs" ? <section aria-labelledby="jobs-heading"><h2 id="jobs-heading" className={c.contentTitle}>{t("clean.schedule_list")}</h2><p className={s.helper}>{t("clean.conflict_hint")}</p>
            <div className={c.requestList}>{jobs.map(r => <button type="button" key={r.id} className={c.requestRow} data-job-id={r.id} onClick={() => openRequest(r.id)}>
              <span><strong>{t(r.name)}</strong><small><bdi>{r.id}</bdi> · {t(`clean.service_${r.service}`)}</small></span>
              <span>{f.date(r.schedule!.date)}<small><bdi>{r.schedule!.start}–{r.schedule!.end}</bdi></small></span><span>{t(`clean.team_${r.schedule!.team}`)}</span><span>{t(r.area)}</span>
            </button>)}</div>{!jobs.length ? <p className={c.empty}>{t("clean.no_jobs")}</p> : null}
          </section> : null}
        </div>
        <p className={c.demoBottom}>{t("clean.demo_notice")} <Link href="/cleaning">{t("clean.service_link")}</Link></p>
      </div>
    </main>
  </>;
}
