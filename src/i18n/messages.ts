import ar from "./ar.json" with { type: "json" };
import en from "./en.json" with { type: "json" };

export type Locale = "ar" | "en";
export type MessageKey = keyof typeof ar;
export const LOCALE_COOKIE = "estanza-language";
export const catalogs: Record<Locale, Record<string, string>> = { ar, en };
const arabicKeys = new Map(Object.entries(ar).map(([key, value]) => [value, key]));
const englishKeys = new Map(Object.entries(en).map(([key, value]) => [value, key]));
const escape = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// Stored service content stays stable for IDs, matching and booking state.
// Interpolated legacy data is resolved through the same authored messages.
const patterns = Object.entries(ar).filter(([, value]) => /\{\d+\}/.test(value)).map(([key, value]) => ({
  key,
  expression: new RegExp("^" + value.split(/\{\d+\}/).map(escape).join("([\\s\\S]*?)") + "$"),
}));

export function translate<T>(locale: Locale, value: T, params?: readonly unknown[]): T {
  if (Array.isArray(value)) return value.map((item) => translate(locale, item)) as T;
  if (typeof value !== "string") return value;
  const key = Object.hasOwn(ar, value) ? value : arabicKeys.get(value) ?? englishKeys.get(value);
  if (key) {
    const text = catalogs[locale][key];
    return (params ? text.replace(/\{(\d+)\}/g, (_, index) => String(translate(locale, params[Number(index)] ?? ""))) : text) as T;
  }
  if (locale === "en" && /[\u0600-\u06ff]/.test(value)) {
    for (const pattern of patterns) {
      const match = pattern.expression.exec(value);
      if (match) return translate(locale, pattern.key, match.slice(1)) as T;
    }
    // Locale-generated numbers retain their value, with Latin digits in English.
    return value.replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit))) as T;
  }
  return value;
}

export const getTranslator = (locale: Locale) => <T,>(value: T, params?: readonly unknown[]) => translate(locale, value, params);
export const source = (key: MessageKey, params?: readonly unknown[]) => translate("ar", key, params);
