"use client";
import { source } from "@/i18n/messages";
import { useI18n } from "@/i18n/LocaleProvider";
import { createContext, useContext, useEffect, useRef, useState, type ButtonHTMLAttributes, type ReactNode, } from "react";
import { coverageOptions, getSubtotal, getTint, initialDraft, selectTint, tintServices, type BookingDraft, type TintId, } from "../../_data/services";
import { TintStep } from "./tint-step";
import { CoverageStep } from "./coverage-step";
import { VehicleStep } from "./vehicle-step";
import { ScheduleStep } from "./schedule-step";
import { SummaryStep } from "./summary-step";
import { ArrowIcon, ShieldIcon } from "../icons";
import s from "../../speedcar.module.css";
const BookingContext = createContext<{
    open: (tint?: TintId) => void;
} | null>(null);
export function BookButton({ tint, children, onClick, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & {
    tint?: TintId;
}) {
    const context = useContext(BookingContext);
    if (!context)
        throw new Error("BookButton requires BookingProvider.");
    return (<button {...props} type="button" onClick={(event) => {
            onClick?.(event);
            if (!event.defaultPrevented)
                context.open(tint);
        }}>
      {children}
    </button>);
}
const stepLabels = [source("speedCar.tint"), source("speedCar.glass"), source("autoSpa.vehicle"), source("autoSpa.appointment"), source("speedCar.review")];
export function BookingProvider({ children }: {
    children: ReactNode;
}) {
    const { t: tr, direction, locale } = useI18n();
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(0);
    const [draft, setDraft] = useState<BookingDraft>({
        ...initialDraft,
        coverage: [...initialDraft.coverage],
    });
    const dialogRef = useRef<HTMLDialogElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    function open(tint?: TintId) {
        if (tint) {
            setDraft((current) => selectTint(current, tint));
            setStep(1);
        }
        setIsOpen(true);
    }
    function update(patch: Partial<BookingDraft>) {
        setDraft((current) => ({ ...current, ...patch }));
    }
    function reset() {
        setDraft({ ...initialDraft, coverage: [...initialDraft.coverage] });
        setStep(0);
    }
    const next = () => setStep((current) => Math.min(4, current + 1));
    const back = () => setStep((current) => Math.max(0, current - 1));
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog)
            return;
        if (isOpen && !dialog.open)
            dialog.showModal();
        if (!isOpen && dialog.open)
            dialog.close();
    }, [isOpen]);
    useEffect(() => {
        if (!isOpen)
            return;
        const before = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = before;
        };
    }, [isOpen]);
    useEffect(() => {
        if (!isOpen)
            return;
        const frame = requestAnimationFrame(() => {
            contentRef.current
                ?.querySelector<HTMLElement>("[data-step-heading]")
                ?.focus();
            if (contentRef.current)
                contentRef.current.scrollTop = 0;
        });
        return () => cancelAnimationFrame(frame);
    }, [step, isOpen]);
    const tint = getTint(draft.tint);
    const total = getSubtotal(draft);
    const startingPrice = Math.min(...tintServices.map((service) => service.prices["four-windows"] ?? Infinity));
    const props = { draft, onChange: update, onNext: next, onBack: back };
    return (<BookingContext.Provider value={{ open }}>
      <div className={s.site} dir={direction} lang={locale}>
        {children}
        {tr(!isOpen && (<div className={s.mobileCta}>
            <span>
              <small>{tr("speedCar.from")}</small>
              <strong>
                {tr(startingPrice)} <span>{tr("speedCar.jod_4_windows")}</span>
              </strong>
            </span>
            <BookButton className={s.primaryButton}>{tr("autoSpa.request_appointment")}<ArrowIcon />
            </BookButton>
          </div>))}
        <dialog ref={dialogRef} className={s.bookingDialog} aria-labelledby="sc-booking-title" onCancel={(event) => {
            event.preventDefault();
            setIsOpen(false);
        }} onClose={() => setIsOpen(false)} onClick={(event) => {
            if (event.target !== event.currentTarget)
                return;
            const box = event.currentTarget.getBoundingClientRect();
            if (event.clientX < box.left ||
                event.clientX > box.right ||
                event.clientY < box.top ||
                event.clientY > box.bottom)
                setIsOpen(false);
        }}>
          <header className={s.bookingHeader}>
            <div>
              <span className={s.eyebrow} dir="ltr">
                SPEED CAR JO / CONFIGURE YOUR COMFORT
              </span>
              <span id="sc-booking-title">{tr("speedCar.tinting_appointment_request")}</span>
            </div>
            <button type="button" className={s.closeButton} aria-label={tr("autoSpa.close_booking")} onClick={() => setIsOpen(false)}>
              ×
            </button>
          </header>
          <div className={s.bookingProgress} aria-label={tr("speedCar.appointment_request_steps")}>
            {stepLabels.map((label, index) => (<button key={label} type="button" disabled={index >= step} aria-current={index === step ? "step" : undefined} className={`${s.progressStep} ${index <= step ? s.progressActive : ""}`} onClick={() => setStep(index)}>
                <span>{tr(String(index + 1).padStart(2, "0"))}</span>
                <span>{tr(label)}</span>
              </button>))}
          </div>
          <div className={s.bookingBody}>
            <div ref={contentRef} className={s.bookingContent}>
              <div key={step} className={s.stepContent}>
                {tr(step === 0 && (<TintStep draft={draft} onSelect={(id) => setDraft((current) => selectTint(current, id))} onNext={next}/>))}{" "}
                {tr(step === 1 && <CoverageStep {...props}/>)}{" "}
                {tr(step === 2 && <VehicleStep {...props}/>)}{" "}
                {tr(step === 3 && <ScheduleStep {...props}/>)}{" "}
                {tr(step === 4 && (<SummaryStep draft={draft} onEdit={setStep} onReset={reset}/>))}
              </div>
            </div>
            <aside className={s.bookingAside}>
              <p className={s.eyebrow} dir="ltr">
                YOUR SELECTION
              </p>
              <div className={s.asideEmblem}>
                S<span>C</span>
              </div>
              <strong dir="ltr">{tr(tint.english)}</strong>
              <p>{tr(tint.name)}</p>
              <div className={s.asideWarranty}>
                <ShieldIcon />
                <span>{tr("speedCar.warranty")}{" "}{tr(tint.warranty)}</span>
              </div>
              <ul>
                {coverageOptions
            .filter((item) => draft.coverage.includes(item.id))
            .map((item) => (<li key={item.id}>
                      <span>{tr(item.name)}</span>
                      <span>{tr(tint.prices[item.id])}{" "}{tr("demo.jod")}</span>
                    </li>))}
              </ul>
              <div className={s.asidePrice}>
                <span>{tr("speedCar.base_price")}</span>
                <strong key={total}>
                  {tr(total ?? "—")}
                  <small>{" "}{tr("demo.jod")}</small>
                </strong>
              </div>
              <p className={s.finePrint}>{tr("speedCar.before_any_applicable_oversized_glass_surcharge")}<br />{tr("speedCar.the_team_confirms_your_request_details")}</p>
            </aside>
          </div>
          <div className={s.bookingDisclaimer}>{tr("speedCar.an_appointment_request_is_not_a_confirmed")}</div>
        </dialog>
      </div>
    </BookingContext.Provider>);
}
