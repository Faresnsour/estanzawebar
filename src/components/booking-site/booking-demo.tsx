"use client";
import { useReducer, useRef, useState, type ReactNode } from "react";
import { DirectionProvider } from "@base-ui/react/direction-provider";
import { ArrowLeft, ClipboardList, Clock3 } from "lucide-react";
import { useI18n } from "@/i18n/LocaleProvider";
import { localDateId } from "@/lib/booking";
import { bookingDemoReducer, initialBookingDemo, validateBooking, type BookingDraft, type BookingErrors } from "@/lib/booking-request-demo";
import { ScheduleFields } from "./booking-fields";
import BookingExperience from "./booking-experience";
import { useHeroMotion } from "./booking-motion";
import s from "./booking-site.module.css";
export default function BookingDemo({ initialDay, heroCopy }: { initialDay: string; heroCopy: ReactNode }) {
  const { t, direction } = useI18n();
  const heroRef = useRef<HTMLElement>(null);
  useHeroMotion(heroRef);
  const [state, dispatch] = useReducer(bookingDemoReducer, initialDay, initialBookingDemo);
  const [today, setToday] = useState(initialDay);
  const [errors, setErrors] = useState<BookingErrors>({});
  const headingRef = useRef<HTMLHeadingElement>(null);
  function focusStep() {
    requestAnimationFrame(() => {
      headingRef.current?.focus({ preventScroll: true });
      headingRef.current?.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    });
  }
  function edit(field: keyof BookingDraft, value: string) {
    dispatch({ type: "edit", field, value });
    setErrors(previous => ({ ...previous, [field]: undefined }));
  }
  function advance(fromHero = false) {
    if (state.request) { focusStep(); return; }
    const day = localDateId(); setToday(day);
    const nextErrors = validateBooking(state.draft, day, !fromHero && state.step > 0);
    // A date can expire while the page is open: return to the editable schedule.
    const scheduleError = !!(nextErrors.date || nextErrors.time || nextErrors.service);
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) {
      if (!fromHero && scheduleError) dispatch({ type: "back", step: 0 });
      requestAnimationFrame(() => document.querySelector<HTMLElement>(`${fromHero ? "#hero-booking" : "#experience"} :is([aria-invalid="true"], [data-invalid="true"])`)?.focus());
      return;
    }
    if (fromHero) dispatch({ type: "back", step: 0 });
    dispatch({ type: "advance", from: fromHero ? 0 : state.step, today: day });
    focusStep();
  }
  function back(step: 0 | 1 | 2) { setErrors({}); dispatch({ type: "back", step }); focusStep(); }
  function reset() { const day = localDateId(); setToday(day); setErrors({}); dispatch({ type: "reset", today: day }); focusStep(); }
  return <DirectionProvider direction={direction}>
      <section ref={heroRef} id="booking-pages" className={s.hero} aria-labelledby="booking-service-title">
        <div className={s.container}>
          <div className={s.heroGrid}>
            {heroCopy}
            <div className={s.heroBookingWrap}>
              <form id="hero-booking" className={s.heroBooking} onSubmit={e => { e.preventDefault(); advance(true); }} noValidate>
                <div className={s.formBrand}><span>{t("bookingSite.company")}</span><span className={s.sampleLabel}>{t("bookingSite.sample")}</span></div>
                <h2>{t("bookingSite.choose_title")}</h2>
                <ScheduleFields compact disabled={!!state.request} draft={state.draft} today={today} errors={errors} onEdit={edit} />
                <button className={`${s.button} ${s.fullButton}`} type="submit">{t(state.request ? "bookingSite.resume" : "bookingSite.continue")}<ArrowLeft className="directional-icon" aria-hidden="true" /></button>
                <p className={s.helper}>{t("bookingSite.time_note")}</p>
              </form>
              <div className={s.requestChip}><ClipboardList size={23} aria-hidden="true" /><div><strong>{t("bookingSite.request_title")}</strong><span>{t("bookingSite.pending")}</span></div><Clock3 size={21} aria-hidden="true" /></div>
            </div>
          </div>
          <ol className={s.heroPath}>{["service", "time", "details", "request"].map(key => <li key={key}>{t(`bookingSite.path_${key}`)}</li>)}</ol>
        </div>
      </section>
      <BookingExperience state={state} today={today} errors={errors} onEdit={edit} onAdvance={() => advance()} onBack={back} onReset={reset} headingRef={headingRef} />
  </DirectionProvider>;
}
