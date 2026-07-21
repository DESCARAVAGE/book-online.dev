import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next"
// import {cinzel } from '@/app/ui/fonts';
import "./ui/styles/globals.css";
import NavBar from "./ui/components/navbar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aesteria - Photographe",
  description: "Site Web by Proxima",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >

      <body className={`antialiased min-h-full flex flex-col`}>
        <NavBar />
        {children}</body>
      <Analytics />
      <SpeedInsights />
    </html>
  );
}
