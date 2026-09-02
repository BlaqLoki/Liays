import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Serves demo sites from their own subdomain.
 *
 * luckybarber.liays.ca shows /demo/lucky-barber, without the path appearing in
 * the address bar. A barber who gets a link with "/demo/" in it knows it's a
 * template before he's looked at it; a link that is just his shop's name reads
 * as a site that already exists.
 *
 * `proxy.ts`, not `middleware.ts` — the middleware file convention is
 * deprecated and renamed as of Next 16. A file named middleware.ts here would
 * be silently ignored: no error, no warning, the subdomain simply serving the
 * marketing homepage instead.
 *
 * Adding the next demo is one line in DEMOS plus a CNAME.
 */

const DEMOS: Record<string, string> = {
  luckybarber: "/demo/lucky-barber",
};

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  // Strip any port so this behaves the same locally as in production.
  const [subdomain] = host.split(":")[0].split(".");

  const target = DEMOS[subdomain];
  if (!target) return NextResponse.next();

  const url = request.nextUrl.clone();

  /* Only rewrite the root. Everything else on the subdomain — /_next assets,
     favicons, any path someone types — passes through untouched, so the page's
     own JS and images still resolve. Rewriting blindly would 404 every asset
     the page needs. */
  if (url.pathname === "/") {
    url.pathname = target;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  /*
   * Skip the proxy for everything that isn't a page request.
   *
   * It runs on every matched request, so excluding assets, the image optimiser
   * and API routes keeps it off the hot path — and guarantees it can never
   * interfere with a request the demo page depends on.
   */
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
