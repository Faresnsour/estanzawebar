import { source } from "@/i18n/messages";
import Content from "./showcase-content";
import { pageMetadata } from "@/lib/metadata";
export function generateMetadata() { return pageMetadata(source("portfolio.our_work_automotive_booking_systems"), source("portfolio.explore_booking_pages_for_automotive_care_centres"), "/showcase"); }
export default function Page() { return <Content />; }
