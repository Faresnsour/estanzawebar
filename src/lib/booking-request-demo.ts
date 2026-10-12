// This model is used only by the in-page demonstration. No persistence or sending.
export const DEMO_SERVICES = ["first", "second", "third"] as const;
export const DEMO_TIMES = ["09:00", "10:00", "12:00", "13:00"] as const;
export type BookingDraft = { service: string; date: string; time: string; name: string; phone: string };
export type BookingErrors = Partial<Record<keyof BookingDraft, string>>;
export type BookingDemo = {
  draft: BookingDraft;
  step: 0 | 1 | 2 | 3;
  request: (BookingDraft & { reference: string }) | null;
  sequence: number;
};
export function demoDates(today: string) {
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(`${today}T12:00:00Z`);
    day.setUTCDate(day.getUTCDate() + i + 1);
    return day.toISOString().slice(0, 10);
  });
}
export function initialBookingDemo(today: string, sequence = 104): BookingDemo {
  return { draft: { service: "first", date: demoDates(today)[0], time: "10:00", name: "", phone: "" }, step: 0, request: null, sequence };
}
export function validateBooking(draft: BookingDraft, today: string, details = false): BookingErrors {
  const errors: BookingErrors = {};
  if (!DEMO_SERVICES.includes(draft.service as typeof DEMO_SERVICES[number])) errors.service = "bookingSite.error_service";
  if (!demoDates(today).includes(draft.date)) errors.date = "bookingSite.error_date";
  if (!DEMO_TIMES.includes(draft.time as typeof DEMO_TIMES[number])) errors.time = "bookingSite.error_time";
  if (details) {
    if (draft.name.trim().length < 2 || draft.name.trim().length > 80) errors.name = "bookingSite.error_name";
    const phone = draft.phone.replace(/[٠-٩]/g, c => String(c.charCodeAt(0) - 1632)).replace(/[۰-۹]/g, c => String(c.charCodeAt(0) - 1776));
    if (!/^\+?[\d ()-]{7,22}$/.test(phone) || phone.replace(/\D/g, "").length < 7 || phone.replace(/\D/g, "").length > 15) errors.phone = "bookingSite.error_phone";
  }
  return errors;
}
export type BookingAction =
  | { type: "edit"; field: keyof BookingDraft; value: string }
  | { type: "advance"; from: BookingDemo["step"]; today: string }
  | { type: "back"; step: 0 | 1 | 2 }
  | { type: "reset"; today: string };
export function bookingDemoReducer(state: BookingDemo, action: BookingAction): BookingDemo {
  if (action.type === "reset") return initialBookingDemo(action.today, state.sequence + (state.request ? 1 : 0));
  if (state.request) return state;
  if (action.type === "edit") return { ...state, draft: { ...state.draft, [action.field]: action.value } };
  if (action.type === "back") return action.step <= state.step ? { ...state, step: action.step } : state;
  // A queued double click cannot advance two steps or register a second request.
  if (action.from !== state.step || Object.keys(validateBooking(state.draft, action.today, state.step > 0)).length) return state;
  if (state.step === 2) return { ...state, step: 3, request: { ...state.draft, name: state.draft.name.trim(), phone: state.draft.phone.trim(), reference: `DEMO-${state.sequence}` } };
  return { ...state, step: state.step === 0 ? 1 : 2 };
}
