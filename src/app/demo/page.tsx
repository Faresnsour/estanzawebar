import { getLocale } from "@/i18n/server";
import { source } from "@/i18n/messages";
import DemoBooking from "./demo-booking";
import { preferredDays } from "@/lib/booking";
import { pageMetadata } from "@/lib/metadata";
export const dynamic = "force-dynamic";
export function generateMetadata() { return pageMetadata(source("demo.try_the_booking_demo"), source("demo.try_choosing_a_service_and_appointment_add"), "/demo", false); }
export default async function DemoPage() {
    return <DemoBooking days={preferredDays(new Date(), "Asia/Amman", 3, await getLocale())}/>;
}
