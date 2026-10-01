"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (command: "event", name: string, parameters: Record<string, string>) => void;
  }
}

export default function ConversionTracking() {
  useEffect(() => {
    const track = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>("a[data-cta]");
      if (!link) return;
      const action = link.dataset.cta;
      const names: Record<string, string> = { whatsapp: "whatsapp_click", demo: "demo_open", project: "project_open" };
      if (!action || !names[action]) return;
      window.gtag?.("event", names[action], { cta_source: link.dataset.source || "site", page_path: window.location.pathname });
    };
    document.addEventListener("click", track);
    return () => document.removeEventListener("click", track);
  }, []);
  return null;
}
