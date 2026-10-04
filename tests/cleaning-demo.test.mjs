import test from "node:test";
import assert from "node:assert/strict";
import {
  addDays, hasConflict, lineCents, localDay, metrics, quoteTotal, scheduleError,
  seedDemo, updateDemo, validDate,
} from "../src/lib/cleaning-demo.ts";

const now = new Date("2026-10-05T07:00:00");
const today = localDay(now);
const sample = (overrides = {}) => ({
  name: "Demo Customer", contact: "demo@example.invalid", area: "Amman",
  service: "sofa", quantity: "2", size: "", preferredDate: addDays(today, 1), notes: "",
  ...overrides,
});

test("a request can move through quote approval, scheduling and completion", () => {
  let state = seedDemo(today);
  state = updateDemo(state, { type: "add", input: sample() }, now);
  let request = state.requests[0];
  const id = request.id;
  assert.equal(request.status, "new");

  state = updateDemo(state, { type: "quote", id, currency: "SAR", lines: [
    { description: "Sofa cleaning", quantity: 2, price: 37.5 },
    { description: "Stain treatment", quantity: 1, price: 8.25 },
  ] }, now);
  assert.equal(quoteTotal(state.requests[0].quote), 83.25);
  state = updateDemo(state, { type: "share", id }, now);
  assert.equal(state.requests[0].status, "quote_sent");
  state = updateDemo(state, { type: "approve", id }, now);
  assert.equal(state.requests[0].status, "approved");
  const schedule = { date: addDays(today, 1), start: "10:00", end: "12:00", team: "b" };
  state = updateDemo(state, { type: "schedule", id, schedule }, now);
  assert.equal(state.requests[0].status, "scheduled");
  state = updateDemo(state, { type: "complete", id }, now);
  assert.equal(state.requests[0].status, "completed");
  assert.equal(metrics(state.requests).approved, 3);
  assert.throws(() => updateDemo(state, { type: "status", id, status: "new" }, now), /clean.error_final/);
});

test("quote totals, date validation and team overlap checks are exact", () => {
  assert.equal(lineCents({ description: "rounding", quantity: 3, price: 0.1 }), 30);
  assert.equal(quoteTotal([{ description: "rounding", quantity: 3, price: 0.1 }]), 0.3);
  assert.throws(() => updateDemo(seedDemo(today), { type: "quote", id: "D-101", currency: "JOD", lines: [{ description: "Cleaning", quantity: 1, price: 10 }] }, now), /clean.error_quote/);
  assert.equal(validDate("2026-02-30"), false);
  const state = seedDemo(today);
  const occupied = state.requests.find(request => request.status === "scheduled");
  const overlap = { ...occupied.schedule, start: "11:00", end: "13:00" };
  assert.equal(hasConflict(state.requests, "another", overlap), true);
  assert.equal(scheduleError({ ...overlap, start: "13:00", end: "12:00" }, now), "clean.error_end");
  let candidate = state;
  candidate = updateDemo(candidate, { type: "quote", id: "D-102", currency: "USD", lines: [{ description: "Cleaning", quantity: 1, price: 10 }] }, now);
  candidate = updateDemo(candidate, { type: "share", id: "D-102" }, now);
  candidate = updateDemo(candidate, { type: "approve", id: "D-102" }, now);
  assert.throws(() => updateDemo(candidate, { type: "schedule", id: "D-102", schedule: overlap }, now), /clean.error_conflict/);
});
