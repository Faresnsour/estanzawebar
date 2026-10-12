import { source } from "@/i18n/messages";
import BookingLanding from "@/components/booking-site/booking-landing";
import { localDateId } from "@/lib/booking";
import { pageMetadata } from "@/lib/metadata";
export async function generateMetadata() {
    const result = await pageMetadata(source("bookingSite.meta_title"), source("bookingSite.meta_description"), "/");
    return { ...result, title: { absolute: result.openGraph?.title } };
}
export default function Home() {
    return <BookingLanding initialDay={localDateId()} />;
}
