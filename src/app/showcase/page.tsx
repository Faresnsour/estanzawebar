import { source } from "@/i18n/messages";
import Content from "./showcase-content";
import { pageMetadata } from "@/lib/metadata";
export function generateMetadata() { return pageMetadata(source("portfolio.meta_title"), source("portfolio.meta_description"), "/showcase"); }
export default function Page() { return <Content />; }
