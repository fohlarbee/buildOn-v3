import type { Metadata } from "next";
import type { CSSProperties } from "react";
import {
  Geist,
  Geist_Mono,
  Red_Hat_Display,
  Roboto_Slab,
} from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const redHat = Red_Hat_Display({
  variable: "--font-red-hat",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BuildOn",
  description: "Pioneering technology for limitless business.",
};

/** Inline so these apply on first document paint, before globals.css. */
const scrollbarPrePaintStyle: CSSProperties = {
  msOverflowStyle: "none",
  scrollbarWidth: "none",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${redHat.variable} ${robotoSlab.variable} antialiased`}
      style={scrollbarPrePaintStyle}
    >
      <head>
        <style>{`html::-webkit-scrollbar, body::-webkit-scrollbar { width: 0; height: 0; display: none; }`}</style>
      </head>
      <body className="min-h-svh antialiased" style={scrollbarPrePaintStyle}>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
