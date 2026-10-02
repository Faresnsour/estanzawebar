import { source } from "@/i18n/messages";
import { pageMetadata } from "@/lib/metadata";
export function generateMetadata() { return pageMetadata(source("wash33.wash_33_car_care_at_your_door"), source("wash33.mobile_car_washing_and_interior_detailing_in"), "/wash33"); }
export default function Layout({ children }: {
    children: React.ReactNode;
}) { return children; }
