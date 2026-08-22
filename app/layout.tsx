import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next"
// import {cinzel } from '@/app/ui/fonts';
import "./ui/styles/globals.css";
import NavBar from "./ui/components/navbar";
import { ThemeProvider } from "./ui/components/providers/themeProvider";


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
      className={`antialiased GeistSans.variable GeistMono.variable h-full`}
      // next-themes pose la classe .dark côté client avant l'hydratation :
      // ce mismatch attendu entre le HTML serveur et le premier rendu
      // client doit être explicitement toléré ici.
      suppressHydrationWarning
    >

      <body className={`antialiased min-h-full flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NavBar />
          {children}
        </ThemeProvider>
      </body>
      <Analytics />
      <SpeedInsights />
    </html>
  );
}