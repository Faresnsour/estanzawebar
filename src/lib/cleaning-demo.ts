/** Browser-only demonstration domain. No transport, persistence or production data. */
export const STATUSES = ["new", "needs_info", "quote_sent", "awaiting_reply", "approved", "scheduled", "completed", "closed"] as const;
export const SERVICES = ["sofa", "carpet", "deep"] as const;
export const CURRENCIES = ["USD", "SAR", "AED"] as const;
export type Status = typeof STATUSES[number];
export type Service = typeof SERVICES[number];
export type Currency = typeof CURRENCIES[number];
export type QuoteLine = { description: string; quantity: number; price: number };
export type Schedule = { date: string; start: string; end: string; team: string };
export type RequestInput = { name: string; contact: string; area: string; service: Service; quantity: string; size: string; preferredDate: string; notes: string };
export type CleaningRequest = Omit<RequestInput, "quantity" | "notes"> & {
  id: string; quantity: number; status: Status; owner: string; lastAction: string;
  notes: string[]; followUp: string; quote: QuoteLine[]; currency: Currency;
  quoteShared: boolean; quoteApproved: boolean; schedule: Schedule | null;
};
export type DemoState = { requests: CleaningRequest[]; nextId: number };
export class DemoError extends Error {
  constructor(key: string) { super(key); this.name = "DemoError"; }
}
export function validDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T12:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}
export function localDay(now = new Date()) {
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}
export function addDays(day: string, amount: number) {
  const date = new Date(`${day}T12:00:00Z`); date.setUTCDate(date.getUTCDate() + amount);
  return date.toISOString().slice(0, 10);
}
export function validateRequest(input: RequestInput, today: string): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const field of ["name", "contact", "area"] as const) {
    if (input[field].trim().length < 2 || input[field].length > 100) errors[field] = `clean.error_${field}`;
  }
  if (!SERVICES.includes(input.service)) errors.service = "clean.error_service";
  if (input.service === "deep") {
    if (input.size.trim().length < 3 || input.size.length > 200) errors.size = "clean.error_size";
  } else if (!Number.isInteger(Number(input.quantity)) || Number(input.quantity) < 1 || Number(input.quantity) > 100) {
    errors.quantity = "clean.error_quantity";
  }
  if (input.preferredDate && (!validDate(input.preferredDate) || input.preferredDate < today)) errors.preferredDate = "clean.error_date";
  if (input.notes.length > 500) errors.notes = "clean.error_notes";
  return errors;
}
/** Round each line to cents so displayed rows sum exactly to the displayed total. */
export function lineCents(line: QuoteLine) { return Math.round(line.quantity * Math.round(line.price * 100)); }
export function quoteTotal(lines: QuoteLine[]) { return lines.reduce((total, line) => total + lineCents(line), 0) / 100; }
export function validQuote(lines: QuoteLine[]) {
  return lines.length > 0 && lines.length <= 12 && lines.every(line =>
    line.description.trim().length > 0 && line.description.length <= 120 &&
    Number.isInteger(line.quantity) && line.quantity >= 1 && line.quantity <= 100 &&
    Number.isFinite(line.price) && line.price > 0 && line.price <= 100000 &&
    Math.abs(line.price * 100 - Math.round(line.price * 100)) < 0.000001);
}
export function needsFollowUp(request: CleaningRequest, today: string) {
  return !!request.followUp && request.followUp <= today && !["completed", "closed"].includes(request.status);
}
export function metrics(requests: CleaningRequest[]) {
  return { requests: requests.length, approved: requests.filter(r => r.quoteApproved).length, scheduled: requests.filter(r => r.status === "scheduled").length };
}
export function scheduleError(schedule: Schedule, now = new Date()): string | null {
  if (!validDate(schedule.date) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(schedule.start) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(schedule.end) || !["a", "b"].includes(schedule.team)) return "clean.error_schedule";
  if (schedule.end <= schedule.start) return "clean.error_end";
  if (new Date(`${schedule.date}T${schedule.start}`).getTime() <= now.getTime()) return "clean.error_past";
  return null;
}
export function hasConflict(requests: CleaningRequest[], id: string, schedule: Schedule) {
  return requests.some(r => r.id !== id && r.status === "scheduled" && r.schedule && r.schedule.date === schedule.date && r.schedule.team === schedule.team && r.schedule.start < schedule.end && schedule.start < r.schedule.end);
}
export function seedDemo(today: string): DemoState {
  const make = (id: number, status: Status, service: Service): CleaningRequest => ({
    id: `D-${100 + id}`, name: `clean.sample_${id}`, contact: `demo-${id}`, area: `clean.area_${id}`,
    service, quantity: 3, size: "clean.sample_size", preferredDate: addDays(today, 2),
    status, owner: id === 1 ? "unassigned" : "a", lastAction: `clean.status_${status}`,
    notes: [], followUp: status === "awaiting_reply" ? today : "", quote: [{ description: `clean.service_${service}`, quantity: 3, price: 20 }], currency: "USD",
    quoteShared: ["awaiting_reply", "scheduled", "completed"].includes(status),
    quoteApproved: ["scheduled", "completed"].includes(status),
    schedule: status === "scheduled" ? { date: addDays(today, 2), start: "10:00", end: "12:00", team: "a" } : null,
  });
  return { requests: [make(1, "new", "sofa"), make(2, "awaiting_reply", "carpet"), make(3, "scheduled", "deep"), make(4, "completed", "sofa")], nextId: 105 };
}
export type DemoAction =
  | { type: "add"; input: RequestInput }
  | { type: "note"; id: string; note: string }
  | { type: "status"; id: string; status: Status }
  | { type: "owner"; id: string; owner: string }
  | { type: "quote"; id: string; lines: QuoteLine[]; currency: Currency }
  | { type: "share" | "approve" | "revise" | "complete"; id: string }
  | { type: "followup"; id: string; date: string }
  | { type: "schedule"; id: string; schedule: Schedule };

export function updateDemo(state: DemoState, action: DemoAction, now = new Date()): DemoState {
  const today = localDay(now);
  if (action.type === "add") {
    if (Object.keys(validateRequest(action.input, today)).length) throw new DemoError("clean.error_form");
    const i = action.input;
    const request: CleaningRequest = { ...i, name: i.name.trim(), contact: i.contact.trim(), area: i.area.trim(), size: i.service === "deep" ? i.size.trim() : "",
      quantity: i.service === "deep" ? 1 : Number(i.quantity), id: `D-${state.nextId}`, status: "new", owner: "unassigned", lastAction: "clean.action_added",
      notes: i.notes.trim() ? [i.notes.trim()] : [], followUp: "", quote: [], currency: "USD", quoteShared: false, quoteApproved: false, schedule: null };
    return { requests: [request, ...state.requests], nextId: state.nextId + 1 };
  }
  const request = state.requests.find(r => r.id === action.id);
  if (!request) throw new DemoError("clean.error_missing");
  let change: Partial<CleaningRequest> = {};
  const final = ["completed", "closed"].includes(request.status);
  if (final && !["note", "owner"].includes(action.type)) throw new DemoError("clean.error_final");
  switch (action.type) {
    case "note":
      if (!action.note.trim() || action.note.length > 500) throw new DemoError("clean.error_note");
      change = { notes: [...request.notes, action.note.trim()], lastAction: "clean.action_note" }; break;
    case "owner":
      if (!["unassigned", "a", "b"].includes(action.owner)) throw new DemoError("clean.error_owner");
      change = { owner: action.owner, lastAction: "clean.action_owner" }; break;
    case "quote":
      if (request.status === "scheduled") throw new DemoError("clean.error_scheduled_quote");
      if (!validQuote(action.lines) || !CURRENCIES.includes(action.currency)) throw new DemoError("clean.error_quote");
      change = { quote: action.lines.map(line => ({ ...line, description: line.description.trim() })), currency: action.currency, quoteShared: false, quoteApproved: false, status: "new", lastAction: "clean.action_quote" }; break;
    case "share":
      if (!validQuote(request.quote) || request.quoteApproved) throw new DemoError("clean.error_share");
      change = { quoteShared: true, status: "quote_sent", lastAction: "clean.action_shared" }; break;
    case "approve":
      if (!request.quoteShared || !validQuote(request.quote) || request.quoteApproved) throw new DemoError("clean.error_approve");
      change = { quoteApproved: true, status: "approved", followUp: "", lastAction: "clean.action_approved" }; break;
    case "revise":
      if (!request.quoteShared || request.status === "scheduled") throw new DemoError("clean.error_share");
      change = { quoteApproved: false, quoteShared: false, status: "needs_info", lastAction: "clean.action_revision" }; break;
    case "status":
      if (!["new", "needs_info", "quote_sent", "awaiting_reply", "closed"].includes(action.status) || request.status === "scheduled") throw new DemoError("clean.error_transition");
      if (["quote_sent", "awaiting_reply"].includes(action.status) && !request.quoteShared) throw new DemoError("clean.error_share");
      // Approval/scheduling/completion use explicit actions, never a display-side effect.
      if (request.quoteApproved && action.status !== "closed") throw new DemoError("clean.error_transition");
      change = { status: action.status, lastAction: `clean.status_${action.status}`, ...(action.status === "closed" ? { followUp: "" } : {}) }; break;
    case "followup":
      if (action.date && (!validDate(action.date) || action.date < today)) throw new DemoError("clean.error_date");
      change = { followUp: action.date, lastAction: "clean.action_followup" }; break;
    case "schedule": {
      if (!request.quoteApproved || !["approved", "scheduled"].includes(request.status)) throw new DemoError("clean.error_approve");
      const error = scheduleError(action.schedule, now); if (error) throw new DemoError(error);
      if (hasConflict(state.requests, request.id, action.schedule)) throw new DemoError("clean.error_conflict");
      change = { schedule: { ...action.schedule }, status: "scheduled", followUp: "", lastAction: "clean.action_scheduled" }; break;
    }
    case "complete":
      if (request.status !== "scheduled" || !request.schedule) throw new DemoError("clean.error_transition");
      change = { status: "completed", followUp: "", lastAction: "clean.action_completed" }; break;
  }
  return { ...state, requests: state.requests.map(r => r.id === request.id ? { ...r, ...change } : r) };
}
