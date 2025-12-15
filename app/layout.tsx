import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ColorPalette from "@/components/ColorPalette";
import ContactButton from "@/components/ContactButton";
import CookieBanner from "@/components/CookieBanner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "BOOST Service - Chiptuning, Usuwanie ADBLUE, Konwersja USA",
  description: "Profesjonalny chiptuning, usuwanie ADBLUE oraz konwersja pojazdów USA. Zwiększ moc, popraw osiągi i dostosuj auto do swoich potrzeb.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <ColorPalette />
          <ContactButton />
          <CookieBanner />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
