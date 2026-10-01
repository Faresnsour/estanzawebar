import test from "node:test";
import assert from "node:assert/strict";
import { preferredDays, futurePreferredSlots } from "../src/lib/booking.ts";
import { serviceSlots } from "../src/app/perfect/schedule.ts";

test("preferred dates use the center's local day across a year boundary", () => {
  const days = preferredDays(new Date("2026-12-31T22:30:00Z"), "Asia/Amman", 3);
  assert.deepEqual(days.map((day) => day.id), ["2027-01-01", "2027-01-02", "2027-01-03"]);
});

test("dates roll into the next month without stale month labels", () => {
  const days = preferredDays(new Date("2026-10-31T10:00:00Z"), "Asia/Amman", 3);
  assert.deepEqual(days.map((day) => day.id), ["2026-10-31", "2026-11-01", "2026-11-02"]);
  assert.notEqual(days[0].dateLabel, days[1].dateLabel);
});

test("today only offers future starts that finish before closing", () => {
  assert.deepEqual(serviceSlots(4, 9, 20, true, 12), [13, 15]);
  assert.deepEqual(serviceSlots(11, 9, 20, true, 10), []);
});

test("a full-day service is offered on a future day at opening", () => {
  assert.deepEqual(serviceSlots(11, 9, 20, false, 23), [9]);
});

test("closing time never causes fallback to past or out-of-hours starts", () => {
  assert.deepEqual(serviceSlots(4, 9, 20, true, 20), []);
  assert.deepEqual(serviceSlots(4, 9, 20, true, null), []);
});

test("preferred slots never send past days or passed times in Jordan", () => {
  const slots = [{ id: "morning", startMinutes: 600 }, { id: "afternoon", startMinutes: 1020 }];
  const now = new Date("2026-10-01T09:00:00Z");
  assert.deepEqual(futurePreferredSlots(slots, "2026-10-01", now).map((slot) => slot.id), ["afternoon"]);
  assert.deepEqual(futurePreferredSlots(slots, "2026-09-30", now), []);
  assert.deepEqual(futurePreferredSlots(slots, "2026-10-02", now), slots);
});
