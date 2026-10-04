import type { MetadataRoute } from "next";
import { SITE_URL } from "@/components/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/cleaning`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/showcase`, changeFrequency: "monthly", priority: 0.9 },
    ...["wash33", "perfect", "speedcar", "autoSpa", "blitz", "privacy", "terms"].map((path) => ({
      url: `${SITE_URL}/${path}`, changeFrequency: "monthly" as const, priority: 0.6,
    })),
  ];
}
