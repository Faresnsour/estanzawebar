export function localDateId(now = new Date(), timeZone = "Asia/Amman") {
    const parts = new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now);
    const read = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
    return `${read("year")}-${read("month")}-${read("day")}`;
}
export function preferredDays(now = new Date(), timeZone = "Asia/Amman", count = 7, locale: "ar" | "en" = "ar") {
    const base = new Date(`${localDateId(now, timeZone)}T12:00:00Z`);
    return Array.from({ length: count }, (_, index) => {
        const date = new Date(base);
        date.setUTCDate(base.getUTCDate() + index);
        return {
            id: date.toISOString().slice(0, 10),
            label: new Intl.DateTimeFormat(locale === "en" ? "en-JO" : "ar-JO", { timeZone, weekday: "long" }).format(date),
            dateLabel: new Intl.DateTimeFormat(locale === "en" ? "en-JO" : "ar-JO", { timeZone, day: "numeric", month: "long" }).format(date),
            slotsLeft: 1,
        };
    });
}
export function futurePreferredSlots<T extends {
    startMinutes?: number;
}>(slots: T[], day: string, now: Date, timeZone = "Asia/Amman") {
    const today = localDateId(now, timeZone);
    if (day < today)
        return [];
    if (day > today)
        return slots;
    const parts = new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(now);
    const read = (type: string) => Number(parts.find((part) => part.type === type)?.value);
    const currentMinutes = read("hour") * 60 + read("minute");
    return slots.filter((slot) => slot.startMinutes !== undefined && slot.startMinutes > currentMinutes);
}
