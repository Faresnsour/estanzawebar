import { source } from "@/i18n/messages";
import { pageMetadata } from "@/lib/metadata";
import CleaningContent from "./cleaning-content";
export async function generateMetadata() {
  const metadata = await pageMetadata(source("clean.meta_service"), source("clean.service_description"), "/cleaning");
  return { ...metadata, title: { absolute: metadata.openGraph?.title } };
}
export default function CleaningPage() { return <CleaningContent />; }
