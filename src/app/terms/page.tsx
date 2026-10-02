import { source } from "@/i18n/messages";
import Content from "./terms-content";
import { pageMetadata } from "@/lib/metadata";
export function generateMetadata() { return pageMetadata(source("terms.terms_of_service"), source("terms.terms_of_service_for_estanza_and_its"), "/terms"); }
export default function Page() { return <Content />; }
