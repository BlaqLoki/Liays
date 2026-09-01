import type { Metadata } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { SiteChrome } from "@/components/site-chrome";
import Footer from "@/components/footer";
import { SkipLink } from "@/components/ui/skip-link";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { MobileCtaBar } from "@/components/mobile-cta-bar";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/*
 * The title is the Google result and the browser tab, so it leads with the
 * offer rather than the category. "Websites & Notion Systems" described what we
 * do; "$995, live in five days" is the thing someone searching for a website in
 * Winnipeg is actually deciding about. Under 60 characters so Google doesn't
 * truncate it mid-offer.
 */
export const metadata: Metadata = {
  title: "Liays Inc — Winnipeg Websites, Live in Five Days",
  description:
    "Smarter Systems. Stronger Business. A one-page website that helps customers find, trust and contact you — $995, live in five business days. Winnipeg.",
  metadataBase: new URL("https://liays.ca"),
  openGraph: {
    title: "Liays Inc — Winnipeg Websites, Live in Five Days",
    description:
      "Smarter Systems. Stronger Business. A lead-ready website for $995, live in five business days.",
    type: "website",
    locale: "en_CA",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-[var(--color-fg-on-ink)] grain">
        {/* Gated so /demo routes render as the client's own site, not ours
            wearing their name. Server children pass straight through. */}
        <SiteChrome>
          <SkipLink />
          <ScrollProgress />
          <Navbar />
        </SiteChrome>
        <main id="main-content" className="flex-1 pb-20 lg:pb-0">
          {children}
        </main>
        <SiteChrome>
          <Footer />
          <MobileCtaBar />
        </SiteChrome>
      </body>
    </html>
  );
}
