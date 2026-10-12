import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

// DRIFT FIX (see DRIFT.md #2): Inter's weight array includes "800" so the
// ExtraBold body/eyebrow variant (Design.md §3) actually loads that font
// file, instead of the browser faking a bold weight that doesn't exist.
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rodrigo Seoane — Conversational Portfolio",
  description:
    "Ask a question, get a short answer plus the one card that actually fits it — a case study, not a pricing table pretending to be one. Every answer comes from Rodrigo's approved knowledge base.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${inter.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
