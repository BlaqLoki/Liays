"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Hides the Liays nav, footer and mobile bar on /demo routes.
 *
 * A demo built for a barber has to look like that barber's website, not like
 * ours with his name on it — the whole point is that a prospect sees himself.
 * Liays chrome wrapped around it would undo that in the first half second.
 *
 * A client component wrapping server children: Navbar and Footer still render
 * on the server and arrive here as finished nodes, so this costs a pathname
 * read and nothing else.
 *
 * The alternative — two root layouts via route groups — is the more orthodox
 * Next answer, but it requires every existing page to move into a group, and
 * that is a lot of blast radius for one demo route.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/demo")) return null;
  return <>{children}</>;
}
