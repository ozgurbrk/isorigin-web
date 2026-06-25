import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BackgroundFX from "@/components/BackgroundFX";
import Tracker from "@/components/Tracker";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://isorigin.com";

const title = "isorigin — Metin2 İçerik Üreticisi & Canlı Yayın";
const description =
  "isorigin resmi sitesi — 2018'den beri Metin2 ve MarkMT2 içerik üreticisi. MarkMT2 (Mark Metin2) 1-99 hard emek serisi, Metin2 videoları, rehberler, PvM ve canlı yayınlar (TikTok, Kick, Twitch), Discord topluluğu ve duyurular tek yerde.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s · isorigin — Metin2",
  },
  description,
  applicationName: "isorigin",
  keywords: [
    "isorigin",
    "isorigin metin2",
    "Metin2",
    "Metin2 içerik üreticisi",
    "Metin2 yayıncı",
    "Metin2 videoları",
    "Metin2 canlı yayın",
    "Metin2 rehber",
    "Metin2 PvM",
    "Metin2 youtuber",
    "Metin2 Türkiye",
    "markmt2",
    "mark metin2",
    "markmetin2",
    "mark mt2",
    "markmetin 2",
    "mark2",
    "mark2 1-99",
    "markmt2 hard",
    "markmt2 emek",
    "markmt2 1-99",
    "markmt2 isorigin",
    "isorigin markmt2",
  ],
  authors: [{ name: "isorigin" }],
  creator: "isorigin",
  publisher: "isorigin",
  alternates: { canonical: "/" },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteUrl,
    siteName: "isorigin",
    title,
    description,
    images: [
      {
        url: "/og-image.jpg",
        width: 1199,
        height: 630,
        alt: "isorigin — Metin2 İçerik Üreticisi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "gaming",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={inter.variable}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  name: "isorigin",
                  url: siteUrl,
                  inLanguage: "tr-TR",
                  description,
                },
                {
                  "@type": "Person",
                  name: "isorigin",
                  url: siteUrl,
                  jobTitle: "Metin2 İçerik Üreticisi",
                  description:
                    "2018'den beri Metin2 içerik üreticisi ve canlı yayıncı.",
                  knowsAbout: [
                    "Metin2",
                    "MarkMT2",
                    "Mark Metin2",
                    "MarkMT2 1-99 Hard Emek",
                    "Oyun",
                    "Canlı Yayın",
                  ],
                },
              ],
            }),
          }}
        />
        <BackgroundFX />
        <Tracker />
        {children}
      </body>
    </html>
  );
}
