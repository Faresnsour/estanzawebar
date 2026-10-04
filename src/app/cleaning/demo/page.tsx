import { source } from "@/i18n/messages";
import { pageMetadata } from "@/lib/metadata";
import CleaningDemo from "./cleaning-demo";
export async function generateMetadata() {
  const metadata = await pageMetadata(source("clean.meta_demo"), source("clean.demo_notice"), "/cleaning/demo", false);
  return { ...metadata, title: { absolute: metadata.openGraph?.title } };
}
export default function CleaningDemoPage() {
  return <CleaningDemo referenceDay={new Date().toISOString().slice(0, 10)} />;
}
