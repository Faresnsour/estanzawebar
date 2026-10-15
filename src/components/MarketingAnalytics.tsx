"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
const analyticsId = "G-KQ37ND6FP7";
export default function MarketingAnalytics() {
  const pathname = usePathname();
  const isDemo = pathname === "/cleaning/demo" || pathname === "/demos/shinex";
  useEffect(() => {
    const flags = window as unknown as Record<string, unknown>;
    flags[`ga-disable-${analyticsId}`] = isDemo;
    // Disable before client navigation as well, so enhanced measurement cannot
    // collect interactions with the demonstration's form fields.
    const beforeNavigation = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (link && ["/cleaning/demo", "/demos/shinex"].includes(new URL(link.href).pathname)) flags[`ga-disable-${analyticsId}`] = true;
    };
    // Count the marketing visit, then stop collection before the visitor uses
    // the embedded demo. Keep it disabled until they leave this page, including
    // during review, reset and language changes. Never pass booking fields to GA.
    const protectBooking = (event: Event) => {
      if (event.target instanceof Element && event.target.closest("#hero-booking, #experience")) {
        flags[`ga-disable-${analyticsId}`] = true;
      }
    };
    document.addEventListener("click", beforeNavigation, true);
    const events = ["pointerdown", "focusin", "input", "submit"] as const;
    events.forEach(name => document.addEventListener(name, protectBooking, true));
    return () => {
      document.removeEventListener("click", beforeNavigation, true);
      events.forEach(name => document.removeEventListener(name, protectBooking, true));
    };
  }, [isDemo, pathname]);
  if (isDemo) return null;
  return <>
    <Script id="google-analytics" strategy="afterInteractive">{`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag("js", new Date());
      gtag("set", "user_data", {});
      gtag("config", "${analyticsId}", {
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        page_location: location.origin + location.pathname
      });
    `}</Script>
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`} strategy="afterInteractive" />
  </>;
}
