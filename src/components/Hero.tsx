"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, CheckCheck, MessageCircle } from "lucide-react";
import { useI18n } from "@/i18n/LocaleProvider";
import { SETUP_HOURS, localizedWhatsAppUrl } from "./lib/site";
import s from "./estanza.module.css";

const services = [
  { id: "ppf", name: "hero.full_front_end_ppf", duration: "hero.2_working_days", price: "hero.850_jod" },
  { id: "ceramic", name: "hero.9h_ceramic_coating", duration: "demo.24_hours", price: "hero.160_jod" },
  { id: "tint", name: "hero.full_nano_ceramic_window_tint", duration: "hero.3_hours", price: "hero.110_jod" },
];
const days = ["hero.day_1", "hero.day_2", "hero.day_3"];
const times = ["hero.9_30_am", "hero.12_30_pm", "hero.4_00_pm", "hero.6_30_pm"];
const views = ["booking", "whatsapp", "sheets"] as const;
const viewLabels = ["hero.booking_page", "hero.whatsapp_message", "hero.booking_log"];
type View = typeof views[number];

export default function Hero() {
  const { t: tr, locale } = useI18n();
  const [serviceId, setServiceId] = useState(services[0].id);
  const [day, setDay] = useState(days[0]);
  const [time, setTime] = useState(times[0]);
  const [name, setName] = useState("");
  const [view, setView] = useState<View>("booking");
  const resultRef = useRef<HTMLHeadingElement>(null);
  const selected = services.find((service) => service.id === serviceId)!;
  const customer = name.trim() || tr("hero.omar_al_tamimi_bmw_g30");
  const showResult = (next: View) => {
    setView(next);
    requestAnimationFrame(() => resultRef.current?.focus({ preventScroll: true }));
  };

  return (
    <section id="hero" aria-labelledby="hero-title" className={`${s.system} ${s.hero}`}>
      <div className={s.container}>
        <div className={s.heroIntro}>
          <div>
            <p className={s.introLabel}>{tr("hero.booking_systems_for_automotive_centres_studios")}</p>
            <h1 id="hero-title" className={s.display}>{tr("redesign.headline")}</h1>
          </div>
          <div className={s.heroDescription}>
            <p>{tr("hero.your_branding_services_and_prices_with_appointment")}</p>
            <div className={s.actions}>
              <Link href="/demo" data-cta="demo" data-source="hero" className={s.button}>{tr("demo.try_the_booking_demo")}<ArrowLeft className="directional-icon" aria-hidden="true" /></Link>
              <a href={localizedWhatsAppUrl(locale)} data-cta="whatsapp" data-source="hero" target="_blank" rel="noopener noreferrer" className={s.textLink}>{tr("hero.chat_on_whatsapp")}</a>
            </div>
          </div>
        </div>

        <div className={s.desk} id="demo">
          <div className={s.deskContext}>
            <div className={s.deskPhoto}>
              <Image src="/booking-detail.jpg" alt={tr("redesign.workshop_photo")} fill sizes="(max-width: 767px) 100vw, 40vw" preload className={s.coverImage} />
            </div>
            <div className={s.deskCaption}>
              <span className={s.captionLabel}>{tr("redesign.for_the_workshop")}</span>
              <h2>{tr("redesign.focus_on_the_car")}</h2>
              <p>{tr("redesign.preview_invitation")}</p>
              <Link href="/showcase" className={s.lightLink}>{tr("portfolio.our_work")}<ArrowLeft className="directional-icon" aria-hidden="true" /></Link>
            </div>
          </div>

          <div className={s.preview}>
            <div className={s.previewHeader}>
              <span>{tr("redesign.try_it_here")}</span>
              <span className={s.demoLabel}>{tr("hero.demo")}</span>
            </div>
            <div className={s.viewControls} role="group" aria-label={tr("redesign.preview_views")}>
              {views.map((item, index) => <button key={item} type="button" aria-pressed={view === item} aria-controls="booking-preview-panel" onClick={() => setView(item)}>{tr(viewLabels[index])}</button>)}
            </div>
            <p className="sr-only" aria-live="polite">{tr(viewLabels[views.indexOf(view)])}</p>
            <div id="booking-preview-panel" className={s.previewPanel}>
              {view === "booking" ? (
                <form onSubmit={(event) => { event.preventDefault(); showResult("whatsapp"); }}>
                  <fieldset className={s.fieldset}>
                    <legend>{tr("hero.1_your_service")}</legend>
                    <div className={s.serviceChoices}>
                      {services.map((service) => <label key={service.id} className={s.serviceChoice}>
                        <input type="radio" name="preview-service" value={service.id} checked={serviceId === service.id} onChange={() => setServiceId(service.id)} />
                        <span className={s.serviceText}><strong>{tr(service.name)}</strong><small>{tr(service.duration)}</small></span>
                        <span className={s.servicePrice}>{tr(service.price)}</span>
                      </label>)}
                    </div>
                  </fieldset>
                  <fieldset className={s.fieldset}>
                    <legend>{tr("hero.2_your_preferred_day_and_time")}</legend>
                    <div className={s.scheduleFields}>
                      <label><span>{tr("redesign.preferred_day")}</span><select name="preview-day" value={day} onChange={(event) => setDay(event.target.value)}>{days.map((item) => <option key={item} value={item}>{tr(item)} — {tr("hero.demo")}</option>)}</select></label>
                      <label><span>{tr("centre.time")}</span><select name="preview-time" value={time} onChange={(event) => setTime(event.target.value)}>{times.map((item) => <option key={item} value={item}>{tr(item)}</option>)}</select></label>
                    </div>
                  </fieldset>
                  <label className={s.nameField} htmlFor="preview-customer"><span>{tr("hero.3_customer_name_and_car")}</span><input id="preview-customer" name="customer-vehicle" autoComplete="off" maxLength={100} value={name} onChange={(event) => setName(event.target.value)} placeholder={tr("hero.e_g_omar_al_tamimi_bmw_g30")} /></label>
                  <button type="submit" className={`${s.button} ${s.fullButton}`}>{tr("hero.preview_your_booking_request")}<ArrowLeft className="directional-icon" aria-hidden="true" /></button>
                </form>
              ) : view === "whatsapp" ? (
                <div className={s.resultView}>
                  <MessageCircle className={s.resultIcon} aria-hidden="true" />
                  <h3 ref={resultRef} tabIndex={-1}>{tr("hero.a_message_built_from_your_choices")}</h3>
                  <div className={s.message}>
                    <p><CheckCheck aria-hidden="true" />{tr("hero.booking_request_from_your_page")}</p>
                    <dl className={s.requestDetails}>
                      <div><dt>{tr("hero.customer")}</dt><dd>{customer}</dd></div>
                      <div><dt>{tr("hero.service")}</dt><dd>{tr(selected.name)}</dd></div>
                      <div><dt>{tr("hero.appointment")}</dt><dd>{tr(day)} · {tr(time)}</dd></div>
                      <div><dt>{tr("hero.estimated_price")}</dt><dd>{tr(selected.price)}</dd></div>
                    </dl>
                  </div>
                  <p className={s.helper}>{tr("hero.message_preview_only_no_real_booking_is")}</p>
                  <button type="button" className={`${s.button} ${s.fullButton}`} onClick={() => showResult("sheets")}>{tr("hero.view_the_sample_booking_log")}<ArrowLeft className="directional-icon" aria-hidden="true" /></button>
                </div>
              ) : (
                <div className={s.resultView}>
                  <h3 ref={resultRef} tabIndex={-1}>{tr("hero.centre_s_booking_log")}</h3>
                  <p className={s.helper}>{tr("hero.a_sample_view_of_organised_requests")}</p>
                  <div className={s.tableScroll}>
                    <table className={s.bookingTable}>
                      <caption className="sr-only">{tr("hero.centre_s_booking_log")}</caption>
                      <thead><tr><th scope="col">{tr("hero.customer_vehicle")}</th><th scope="col">{tr("centre.service")}</th><th scope="col">{tr("centre.time")}</th></tr></thead>
                      <tbody>
                        <tr><td>{customer}<small>{tr("hero.new_request")}</small></td><td>{tr(selected.name)}</td><td>{tr(time)}</td></tr>
                        <tr><td>{tr("hero.tareq_porsche")}</td><td>{tr("autoSpa.ceramic_coating")}</td><td>{tr("hero.11_00_am")}</td></tr>
                        <tr><td>{tr("hero.khaled_land_cruiser")}</td><td>{tr("hero.window_tinting")}</td><td>{tr("hero.3_30_pm")}</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <p className={s.helper}>{tr("hero.how_requests_are_stored_and_linked_to")}</p>
                  <button type="button" className={`${s.button} ${s.fullButton}`} onClick={() => setView("booking")}>{tr("hero.try_another_booking")}</button>
                </div>
              )}
            </div>
            <p className={s.previewFootnote}>{tr("hero.interactive_demo_no_real_booking_is_sent")}</p>
          </div>
        </div>
        <ul className={s.facts}>
          <li><Check aria-hidden="true" /><span>{tr("hero.ready_in")} {new Intl.NumberFormat(locale).format(SETUP_HOURS)} {tr("hero.hours")}</span></li>
          <li><Check aria-hidden="true" /><span>{tr("hero.no_customer_app")}</span></li>
          <li><Check aria-hidden="true" /><span>{tr("hero.no_monthly_subscription")}</span></li>
        </ul>
      </div>
    </section>
  );
}
