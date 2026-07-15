import type { Metadata } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
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

export const metadata: Metadata = {
  title: "Liays Inc — Websites & Notion Systems for Winnipeg Businesses",
  description:
    "Liays Inc is a Winnipeg-based agency building elegant websites and running hands-on Notion training so your team can actually run on it.",
  metadataBase: new URL("https://liays.ca"),
  openGraph: {
    title: "Liays Inc — Websites & Notion Systems",
    description:
      "Winnipeg-based agency building elegant websites and running hands-on Notion training.",
    type: "website",
  },
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
        <SkipLink />
        <ScrollProgress />
        <Navbar />
        <main id="main-content" className="flex-1 pb-20 lg:pb-0">
          {children}
        </main>
        <Footer />
        <MobileCtaBar />
      </body>
    </html>
  );
}
