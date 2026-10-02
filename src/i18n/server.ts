import "server-only";
import { cookies } from "next/headers";
import { LOCALE_COOKIE, getTranslator, type Locale } from "./messages";

export async function getLocale(): Promise<Locale> {
  return (await cookies()).get(LOCALE_COOKIE)?.value === "en" ? "en" : "ar";
}

export async function getServerTranslator() {
  return getTranslator(await getLocale());
}
