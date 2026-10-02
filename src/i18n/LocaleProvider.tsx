"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { getTranslator, LOCALE_COOKIE, type Locale } from "./messages";

type LocaleContext = {
  locale: Locale;
  direction: "rtl" | "ltr";
  t: ReturnType<typeof getTranslator>;
  setLocale: (locale: Locale) => void;
};
const Context = createContext<LocaleContext | null>(null);

export function LocaleProvider({ initialLocale, children }: { initialLocale: Locale; children: ReactNode }) {
  const [locale, updateLocale] = useState(initialLocale);
  const router = useRouter();
  const setLocale = useCallback((next: Locale) => {
    document.cookie = `${LOCALE_COOKIE}=${next}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
    document.documentElement.lang = next;
    document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
    updateLocale(next);
    // Refresh server-rendered metadata and date labels without a document reload.
    router.refresh();
  }, [router]);
  const value = useMemo<LocaleContext>(() => ({ locale, direction: locale === "ar" ? "rtl" : "ltr", t: getTranslator(locale), setLocale }), [locale, setLocale]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useI18n() {
  const value = useContext(Context);
  if (!value) throw new Error("LocaleProvider is required");
  return value;
}
