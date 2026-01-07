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
  metadataBase: new URL('https://boostservice.pl'),
  title: {
    default: "BOOST Service - Chiptuning, Usuwanie ADBLUE, Konwersja USA",
    template: "%s | BOOST Service",
  },
  description: "Profesjonalny chiptuning, usuwanie ADBLUE oraz konwersja pojazdów USA. Zwiększ moc, popraw osiągi i dostosuj auto do swoich potrzeb. Hamownia, naprawa elektroniki, multimedia samochodowe.",
  keywords: [
    "chiptuning",
    "usuwanie ADBLUE",
    "konwersja USA",
    "hamownia",
    "naprawa elektroniki",
    "multimedia samochodowe",
    "kalibracja radarów",
    "usuwanie DPF",
    "usuwanie EGR",
    "boost service",
    "tuning",
    "ECU",
    "optymalizacja silnika",
  ],
  authors: [{ name: "BOOST Service" }],
  creator: "BOOST Service",
  publisher: "BOOST Service",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: 'https://boostservice.pl',
    siteName: 'BOOST Service',
    title: 'BOOST Service - Chiptuning, Usuwanie ADBLUE, Konwersja USA',
    description: 'Profesjonalny chiptuning, usuwanie ADBLUE oraz konwersja pojazdów USA. Zwiększ moc, popraw osiągi i dostosuj auto do swoich potrzeb.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'BOOST Service Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BOOST Service - Chiptuning, Usuwanie ADBLUE, Konwersja USA',
    description: 'Profesjonalny chiptuning, usuwanie ADBLUE oraz konwersja pojazdów USA.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Możesz dodać Google Search Console verification code tutaj
    // google: 'your-verification-code',
  },
  alternates: {
    canonical: 'https://boostservice.pl',
  },
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
