import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
  authors: [{ name: "Flashblocks Team" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" }
  ],
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
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans min-h-screen antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
