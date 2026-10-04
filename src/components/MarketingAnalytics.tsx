"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
const analyticsId = "G-KQ37ND6FP7";
export default function MarketingAnalytics() {
  const pathname = usePathname();
  const isDemo = pathname === "/cleaning/demo";
  useEffect(() => {
    const flags = window as unknown as Record<string, unknown>;
    flags[`ga-disable-${analyticsId}`] = isDemo;
    // Disable before client navigation as well, so enhanced measurement cannot
    // collect interactions with the demonstration's form fields.
    const beforeNavigation = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (link && new URL(link.href).pathname === "/cleaning/demo") flags[`ga-disable-${analyticsId}`] = true;
    };
    document.addEventListener("click", beforeNavigation, true);
    return () => document.removeEventListener("click", beforeNavigation, true);
  }, [isDemo]);
  if (isDemo) return null;
  return <>
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`} strategy="lazyOnload" />
    <Script id="google-analytics" strategy="lazyOnload">{`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag("js", new Date());
      gtag("config", "${analyticsId}");
    `}</Script>
  </>;
}
