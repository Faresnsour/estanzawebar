import { NextResponse, type NextRequest } from "next/server";

// This customer demo starts in Arabic. The existing explicit language cookie
// still wins; no preference cookie is written for an automatic default.
export function proxy(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set("x-estanza-default-locale", "ar");
  return NextResponse.next({ request: { headers } });
}

export const config = { matcher: "/demos/shinex" };
