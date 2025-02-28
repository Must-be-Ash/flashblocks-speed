import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Flashblocks vs Blocks - 10x Speed Comparison",
  description: "Experience the power of Flashblocks - building blocks that operate 10x faster than traditional blocks. Watch iconic buildings being constructed in real-time to see the difference.",
  keywords: ["Flashblocks", "building blocks", "speed comparison", "construction", "visualization"],
  authors: [{ name: "Navigate" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" }
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#FF5F1F" },
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    title: "Flashblocks",
    statusBarStyle: "default",
    capable: true,
  },
  openGraph: {
    title: "Flashblocks vs Blocks - 10x Speed Comparison",
    description: "Experience the power of Flashblocks - building blocks that operate 10x faster than traditional blocks. Watch iconic buildings being constructed in real-time.",
    url: "https://flashblocks.vercel.app",
    siteName: "Flashblocks",
    images: [
      {
        url: "https://flashblocks.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Flashblocks vs Blocks - 10x Speed Comparison",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flashblocks vs Blocks - 10x Speed Comparison",
    description: "Experience the power of Flashblocks - building blocks that operate 10x faster than traditional blocks.",
    images: ["https://flashblocks.vercel.app/og-image.png"],
    creator: "@navigate_ai",
  },
  metadataBase: new URL("https://flashblocks.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#FF5F1F" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans min-h-screen antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
