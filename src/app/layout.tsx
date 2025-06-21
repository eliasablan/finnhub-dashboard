import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FinnhubProvider } from "@/providers/FinnhubProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Insider Trading Dashboard",
    template: "%s | Insider Trading Dashboard",
  },
  description:
    "Track and analyze insider trading activities across multiple companies with real-time data visualization and detailed transaction histories.",
  icons: {
    icon: [
      {
        url: "./favicon.svg",
        type: "image/svg+xml",
      },
    ],
  },
  keywords: [
    "insider trading",
    "stock market",
    "financial dashboard",
    "SEC Form 4",
    "stock analysis",
  ],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Insider Trading Dashboard",
    description:
      "Track and analyze insider trading activities across multiple companies",
    type: "website",
    locale: "en_US",
    siteName: "Insider Trading Dashboard",
  },
  twitter: {
    card: "summary_large_image",
    title: "Insider Trading Dashboard",
    description:
      "Track and analyze insider trading activities across multiple companies",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <FinnhubProvider>{children}</FinnhubProvider>
      </body>
    </html>
  );
}
