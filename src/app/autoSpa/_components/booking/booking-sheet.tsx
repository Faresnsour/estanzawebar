"use client";
import { source } from "@/i18n/messages";
import { useI18n } from "@/i18n/LocaleProvider";
import { createContext, useContext, useEffect, useRef, useState, type ButtonHTMLAttributes, type ReactNode, } from "react";
import { initialDraft, type BookingDraft, type Goal, } from "../../_data/packages";
import { VehicleStep } from "./vehicle-step";
import { PackageStep } from "./package-step";
import { DateStep } from "./date-step";
import { CustomerStep } from "./customer-step";
import { ConfirmationStep } from "./confirmation-step";
import s from "../../auto-spa.module.css";
type BookingContextValue = {
    openBooking: (goal?: Goal) => void;
};
const BookingContext = createContext<BookingContextValue | null>(null);
function useBooking() {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error("BookButton must be rendered inside BookingProvider.");
    }
    return context;
}
type BookButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    goal?: Goal;
};
export function BookButton({ goal, children, onClick, ...props }: BookButtonProps) {
    const { openBooking } = useBooking();
    return (<button {...props} type="button" onClick={(event) => {
            onClick?.(event);
            if (!event.defaultPrevented) {
                openBooking(goal);
            }
        }}>
      {children}
    </button>);
}
const stepLabels = [source("autoSpa.vehicle"), source("autoSpa.care"), source("autoSpa.appointment"), source("autoSpa.your_details")];
export function BookingProvider({ children }: {
    children: ReactNode;
}) {
    const { t: tr, direction, locale } = useI18n();
    const dialogRef = useRef<HTMLDialogElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(0);
    const [draft, setDraft] = useState<BookingDraft>({ ...initialDraft });
    function openBooking(goal?: Goal) {
        if (goal) {
            setDraft((current) => ({
                ...current,
                goal,
                packageId: null,
            }));
            setStep(0);
        }
        setIsOpen(true);
    }
    function updateDraft(patch: Partial<BookingDraft>) {
        setDraft((current) => ({ ...current, ...patch }));
    }
    function next() {
        setStep((current) => Math.min(current + 1, 4));
    }
    function back() {
        setStep((current) => Math.max(current - 1, 0));
    }
    function reset() {
        setDraft({ ...initialDraft });
        setStep(0);
    }
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog)
            return;
        if (isOpen && !dialog.open) {
            dialog.showModal();
        }
        else if (!isOpen && dialog.open) {
            dialog.close();
        }
    }, [isOpen]);
    useEffect(() => {
        if (!isOpen)
            return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isOpen]);
    useEffect(() => {
        if (!isOpen)
            return;
        const frame = requestAnimationFrame(() => {
            const heading = contentRef.current?.querySelector<HTMLElement>("[data-step-heading]");
            heading?.focus();
            if (contentRef.current) {
                contentRef.current.scrollTop = 0;
            }
        });
        return () => cancelAnimationFrame(frame);
    }, [isOpen, step]);
    const stepProps = {
        draft,
        onChange: updateDraft,
        onNext: next,
        onBack: back,
    };
    return (<BookingContext.Provider value={{ openBooking }}>
      <div className={s.site} dir={direction} lang={locale}>
        {children}

        {tr(!isOpen && (<div className={s.mobileBookingBar}>
            <BookButton className={s.primaryButton}>{tr("autoSpa.start_your_care_request")}<span aria-hidden="true">↗</span>
            </BookButton>
          </div>))}

        <dialog ref={dialogRef} className={s.bookingDialog} aria-labelledby="booking-title" onCancel={(event) => {
            event.preventDefault();
            setIsOpen(false);
        }} onClose={() => setIsOpen(false)} onClick={(event) => {
            if (event.target !== event.currentTarget)
                return;
            const rect = event.currentTarget.getBoundingClientRect();
            const outside = event.clientX < rect.left ||
                event.clientX > rect.right ||
                event.clientY < rect.top ||
                event.clientY > rect.bottom;
            if (outside)
                setIsOpen(false);
        }}>
          <header className={s.bookingHeader}>
            <div>
              <span className={s.eyebrow} dir="ltr">
                DOPAMINE / CARE REQUEST
              </span>
              <span id="booking-title" className={s.bookingHeaderTitle}>{tr("autoSpa.your_care_request")}</span>
            </div>

            <button type="button" className={s.closeButton} onClick={() => setIsOpen(false)} aria-label={tr("autoSpa.close_booking")}>
              ×
            </button>
          </header>

          <div className={s.bookingProgress} aria-label={tr("autoSpa.booking_steps")}>
            {stepLabels.map((label, index) => (<button key={label} type="button" disabled={index >= step} aria-current={step === index ? "step" : undefined} className={`${s.progressStep} ${index <= step ? s.progressActive : ""}`} onClick={() => setStep(index)}>
                <span>{tr(String(index + 1).padStart(2, "0"))}</span>
                <span>{tr(label)}</span>
              </button>))}
          </div>

          <div ref={contentRef} className={s.bookingContent}>
            <div key={step} className={s.stepContent}>
              {tr(step === 0 && <VehicleStep {...stepProps}/>)}
              {tr(step === 1 && <PackageStep {...stepProps}/>)}
              {tr(step === 2 && <DateStep {...stepProps}/>)}
              {tr(step === 3 && <CustomerStep {...stepProps}/>)}

              {tr(step === 4 && (<ConfirmationStep draft={draft} onBack={back} onReset={reset} onEditSchedule={() => setStep(2)}/>))}
            </div>
          </div>

          <div className={s.bookingDisclaimer}>{tr("autoSpa.your_request_is_not_a_confirmed_appointment")}</div>
        </dialog>
      </div>
    </BookingContext.Provider>);
}
