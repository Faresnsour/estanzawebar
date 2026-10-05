import "server-only";
import { cookies } from "next/headers";
import { LOCALE_COOKIE, getTranslator, resolveLocale, type Locale } from "./messages";

export async function getLocale(): Promise<Locale> {
  return resolveLocale((await cookies()).get(LOCALE_COOKIE)?.value);
}

export async function getServerTranslator() {
  return getTranslator(await getLocale());
}
