import type { Metadata } from "next";
import { Noto_Serif, Roboto } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-noto-serif",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "NSBC | Monthly Bookkeeping for Accounting Firms, $100 per Account",
  description:
    "NSBC delivers monthly bookkeeping behind your accounting firm, in every state, for a flat $100 per client account per month. You keep the client and the final review.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${notoSerif.variable} ${roboto.variable}`}
    >
      <body className="bg-white font-sans text-ink">
        {children}
      </body>
    </html>
  );
}