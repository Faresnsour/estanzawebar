import { source } from "@/i18n/messages";
import BookingLanding from "@/components/booking-site/booking-landing";
import { localDateId } from "@/lib/booking";
import { pageMetadata } from "@/lib/metadata";
export async function generateMetadata() {
    const result = await pageMetadata(source("bookingSite.meta_title"), source("bookingSite.meta_description"), "/");
    const images = [{ url: "/share", width: 1200, height: 630, alt: "Estanza — Booking systems built around your business" }];
    return { ...result, title: { absolute: result.openGraph?.title }, openGraph: { ...result.openGraph, images }, twitter: { ...result.twitter, images } };
}
export default function Home() {
    return <BookingLanding initialDay={localDateId()} />;
}
