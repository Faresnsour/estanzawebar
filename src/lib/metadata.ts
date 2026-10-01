import type { Metadata } from "next";
import { SITE_URL } from "@/components/lib/site";

export function pageMetadata(title: string, description: string, path: string, index = true): Metadata {
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: { title, description, url: `${SITE_URL}${path}`, locale: "ar_JO", type: "website" },
    twitter: { card: "summary_large_image", title, description },
    robots: { index, follow: true },
  };
}
