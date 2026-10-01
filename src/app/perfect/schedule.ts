export function serviceSlots(durationHours: number, openHour: number, closeHour: number, today: boolean, currentHour: number | null) {
  if (today && currentHour === null) return [];
  const result: number[] = [];
  for (let hour = openHour; hour + durationHours <= closeHour; hour += 2) {
    if (!today || hour > (currentHour ?? -1)) result.push(hour);
  }
  return result;
}
