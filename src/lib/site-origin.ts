/** Match the production redirect, including when an older env uses the apex. */
export function siteOrigin(configured?: string) {
  const url = new URL(configured?.startsWith("http") ? configured : `https://${configured || "www.estanza.dev"}`);
  if (url.hostname === "estanza.dev" || url.hostname === "www.estanza.dev") return "https://www.estanza.dev";
  return url.origin;
}
