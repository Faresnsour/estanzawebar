"use client";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import {
  coverageOptions,
  getSubtotal,
  getTint,
  initialDraft,
  selectTint,
  tintServices,
  type BookingDraft,
  type TintId,
} from "../../_data/services";
import { TintStep } from "./tint-step";
import { CoverageStep } from "./coverage-step";
import { VehicleStep } from "./vehicle-step";
import { ScheduleStep } from "./schedule-step";
import { SummaryStep } from "./summary-step";
import { ArrowIcon, ShieldIcon } from "../icons";
import s from "../../speedcar.module.css";

const BookingContext = createContext<{ open: (tint?: TintId) => void } | null>(
  null,
);
export function BookButton({
  tint,
  children,
  onClick,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { tint?: TintId }) {
  const context = useContext(BookingContext);
  if (!context) throw new Error("BookButton requires BookingProvider.");
  return (
    <button
      {...props}
      type="button"
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) context.open(tint);
      }}
    >
      {children}
    </button>
  );
}

const stepLabels = ["التظليل", "الزجاج", "السيارة", "الموعد", "المراجعة"];
export function BookingProvider({ children }: { children: ReactNode }) {
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
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);
  useEffect(() => {
    if (!isOpen) return;
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = before;
    };
  }, [isOpen]);
  useEffect(() => {
    if (!isOpen) return;
    const frame = requestAnimationFrame(() => {
      contentRef.current
        ?.querySelector<HTMLElement>("[data-step-heading]")
        ?.focus();
      if (contentRef.current) contentRef.current.scrollTop = 0;
    });
    return () => cancelAnimationFrame(frame);
  }, [step, isOpen]);
  const tint = getTint(draft.tint);
  const total = getSubtotal(draft);
  const startingPrice = Math.min(
    ...tintServices.map(
      (service) => service.prices["four-windows"] ?? Infinity,
    ),
  );
  const props = { draft, onChange: update, onNext: next, onBack: back };
  return (
    <BookingContext.Provider value={{ open }}>
      <div className={s.site} dir="rtl" lang="ar">
        {children}
        {!isOpen && (
          <div className={s.mobileCta}>
            <span>
              <small>ابدأ من</small>
              <strong>
                {startingPrice} <span>د.أ / 4 شبابيك</span>
              </strong>
            </span>
            <BookButton className={s.primaryButton}>
              طلب موعد
              <ArrowIcon />
            </BookButton>
          </div>
        )}
        <dialog
          ref={dialogRef}
          className={s.bookingDialog}
          aria-labelledby="sc-booking-title"
          onCancel={(event) => {
            event.preventDefault();
            setIsOpen(false);
          }}
          onClose={() => setIsOpen(false)}
          onClick={(event) => {
            if (event.target !== event.currentTarget) return;
            const box = event.currentTarget.getBoundingClientRect();
            if (
              event.clientX < box.left ||
              event.clientX > box.right ||
              event.clientY < box.top ||
              event.clientY > box.bottom
            )
              setIsOpen(false);
          }}
        >
          <header className={s.bookingHeader}>
            <div>
              <span className={s.eyebrow} dir="ltr">
                SPEED CAR JO / CONFIGURE YOUR COMFORT
              </span>
              <span id="sc-booking-title">طلب تظليل وموعد</span>
            </div>
            <button
              type="button"
              className={s.closeButton}
              aria-label="إغلاق الحجز"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </header>
          <div className={s.bookingProgress} aria-label="خطوات طلب الحجز">
            {stepLabels.map((label, index) => (
              <button
                key={label}
                type="button"
                disabled={index >= step}
                aria-current={index === step ? "step" : undefined}
                className={`${s.progressStep} ${index <= step ? s.progressActive : ""}`}
                onClick={() => setStep(index)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{label}</span>
              </button>
            ))}
          </div>
          <div className={s.bookingBody}>
            <div ref={contentRef} className={s.bookingContent}>
              <div key={step} className={s.stepContent}>
                {step === 0 && (
                  <TintStep
                    draft={draft}
                    onSelect={(id) =>
                      setDraft((current) => selectTint(current, id))
                    }
                    onNext={next}
                  />
                )}{" "}
                {step === 1 && <CoverageStep {...props} />}{" "}
                {step === 2 && <VehicleStep {...props} />}{" "}
                {step === 3 && <ScheduleStep {...props} />}{" "}
                {step === 4 && (
                  <SummaryStep draft={draft} onEdit={setStep} onReset={reset} />
                )}
              </div>
            </div>
            <aside className={s.bookingAside}>
              <p className={s.eyebrow} dir="ltr">
                YOUR SELECTION
              </p>
              <div className={s.asideEmblem}>
                S<span>C</span>
              </div>
              <strong dir="ltr">{tint.english}</strong>
              <p>{tint.name}</p>
              <div className={s.asideWarranty}>
                <ShieldIcon />
                <span>كفالة {tint.warranty}</span>
              </div>
              <ul>
                {coverageOptions
                  .filter((item) => draft.coverage.includes(item.id))
                  .map((item) => (
                    <li key={item.id}>
                      <span>{item.name}</span>
                      <span>{tint.prices[item.id]} د.أ</span>
                    </li>
                  ))}
              </ul>
              <div className={s.asidePrice}>
                <span>السعر الأساسي</span>
                <strong key={total}>
                  {total ?? "—"}
                  <small>د.أ</small>
                </strong>
              </div>
              <p className={s.finePrint}>
                قبل زيادة الزجاج الكبير إن انطبقت.
                <br />
                الفريق يؤكد تفاصيل الطلب.
              </p>
            </aside>
          </div>
          <div className={s.bookingDisclaimer}>
            طلب الموعد لا يؤكد الحجز. تأكيد التوفر والسعر يتم مباشرة من المركز.
          </div>
        </dialog>
      </div>
    </BookingContext.Provider>
  );
}
