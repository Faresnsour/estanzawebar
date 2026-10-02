import { source } from "@/i18n/messages";
import { pageMetadata } from "@/lib/metadata";
export function generateMetadata() { return pageMetadata(source("perfect.perfect_auto_care_services_appointments"), source("perfect.explore_perfect_auto_care_s_work_car"), "/perfect"); }
export default function Layout({ children }: {
    children: React.ReactNode;
}) { return children; }
