import "server-only";
import { cookies, headers } from "next/headers";
import { LOCALE_COOKIE, getTranslator, resolveLocale, type Locale } from "./messages";

export async function getLocale(): Promise<Locale> {
  const preference = (await cookies()).get(LOCALE_COOKIE)?.value;
  if (preference === "ar" || preference === "en") return preference;
  return resolveLocale((await headers()).get("x-estanza-default-locale") ?? undefined);
}

export async function getServerTranslator() {
  return getTranslator(await getLocale());
}
