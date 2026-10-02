import { source } from "@/i18n/messages";
import Content from "./privacy-content";
import { pageMetadata } from "@/lib/metadata";
export function generateMetadata() { return pageMetadata(source("privacy.privacy_policy"), source("privacy.privacy_policy_for_estanza_services_and_booking"), "/privacy"); }
export default function Page() { return <Content />; }
