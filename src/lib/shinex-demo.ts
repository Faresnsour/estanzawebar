export const SHINEX_CARS = ["sedan", "suv5", "suv7"] as const;
export type ShinexCar = typeof SHINEX_CARS[number];
export const SHINEX_PRICES: Record<ShinexCar, number> = { sedan: 29, suv5: 39, suv7: 49 };
export const SHINEX_PERIODS = ["morning", "midday", "evening"] as const;
export type ShinexDraft = {
  car: ShinexCar; date: string; period: string; name: string; phone: string; area: string; notes: string;
};
export type ShinexState = { draft: ShinexDraft; step: 0 | 1 | 2 | 3; prepared: boolean };
export type ShinexErrors = Partial<Record<keyof ShinexDraft, string>>;
type Action = { type: "edit"; field: keyof ShinexDraft; value: string }
  | { type: "back"; step: ShinexState["step"] }
  | { type: "next"; from: ShinexState["step"]; today: string }
  | { type: "reset" };

export function initialShinex(): ShinexState {
  return { draft: { car: "sedan", date: "", period: "", name: "", phone: "", area: "", notes: "" }, step: 0, prepared: false };
}
export function normalisePhone(value: string) {
  return value.replace(/[٠-٩]/g, c => String("٠١٢٣٤٥٦٧٨٩".indexOf(c)))
    .replace(/[۰-۹]/g, c => String("۰۱۲۳۴۵۶۷۸۹".indexOf(c))).replace(/[\s()-]/g, "");
}
export function validateShinex(draft: ShinexDraft, today: string, step: number): ShinexErrors {
  const errors: ShinexErrors = {};
  if (!SHINEX_CARS.includes(draft.car)) errors.car = "shinex.error_car";
  if (step >= 1) {
    const parsed = new Date(`${draft.date}T12:00:00Z`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(draft.date) || !Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== draft.date || draft.date < today) errors.date = "shinex.error_date";
    if (!SHINEX_PERIODS.some(period => period === draft.period)) errors.period = "shinex.error_period";
  }
  if (step >= 2) {
    if (draft.name.trim().length < 2 || draft.name.trim().length > 80) errors.name = "shinex.error_name";
    if (!/^\+?\d{7,15}$/.test(normalisePhone(draft.phone))) errors.phone = "shinex.error_phone";
    if (draft.area.length > 160) errors.area = "shinex.error_area";
    if (draft.notes.length > 500) errors.notes = "shinex.error_notes";
  }
  return errors;
}
export function shinexReducer(state: ShinexState, action: Action): ShinexState {
  if (action.type === "reset") return initialShinex();
  if (action.type === "back") return { ...state, step: Math.min(action.step, state.step) as ShinexState["step"], prepared: false };
  if (state.prepared) return state;
  if (action.type === "edit") {
    if (action.field === "car" && !SHINEX_CARS.some(car => car === action.value)) return state;
    return { ...state, draft: { ...state.draft, [action.field]: action.value } };
  }
  if (action.from !== state.step || Object.keys(validateShinex(state.draft, action.today, state.step)).length) return state;
  return state.step === 3 ? { ...state, prepared: true } : { ...state, step: (state.step + 1) as ShinexState["step"] };
}
export function shinexDateLabel(date: string, locale: "ar" | "en") {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-JO" : "en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Amman" }).format(new Date(`${date}T12:00:00Z`));
}
export function shinexMessage(draft: ShinexDraft, locale: "ar" | "en", t: (key: string) => string) {
  return [t("shinex.message_title"), `${t("shinex.car")}: ${t(`shinex.${draft.car}`)}`,
    `${t("shinex.package")}: ${t("shinex.package_name")}`,
    `${t("shinex.price")}: ${SHINEX_PRICES[draft.car]} ${t("shinex.currency")}`,
    `${t("shinex.date")}: ${shinexDateLabel(draft.date, locale)}`,
    `${t("shinex.period")}: ${t(`shinex.${draft.period}`)}`,
    `${t("shinex.name")}: ${draft.name.trim()}`, `${t("shinex.phone")}: ${normalisePhone(draft.phone)}`,
    ...(draft.area.trim() ? [`${t("shinex.area")}: ${draft.area.trim()}`] : []),
    ...(draft.notes.trim() ? [`${t("shinex.notes")}: ${draft.notes.trim()}`] : []),
    t("shinex.pending"), t("shinex.no_send")].join("\n");
}
