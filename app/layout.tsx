import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import {
  Cormorant_Garamond,
  Great_Vibes,
  Imperial_Script,
  Inter,
  Playfair_Display,
  WindSong,
} from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { siteConfig } from "@/content/site"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wilmar-and-kate-invitation.vercel.app/"
const canonicalUrl = siteUrl.replace(/\/$/, "")
const eventImagePath = "/desktop-background/couple (48).jpg"
const eventImageUrl = `${canonicalUrl}${eventImagePath}`
const eventTitle = `${siteConfig.couple.groom} & ${siteConfig.couple.bride} | Wedding 2025`
const eventDescription = `You're invited to celebrate ${siteConfig.couple.groom} & ${siteConfig.couple.bride}'s wedding on ${siteConfig.wedding.date} at ${siteConfig.wedding.venue}. ${siteConfig.wedding.theme} with heartfelt stories, schedules, and RSVP details.`
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: eventTitle,
  startDate: "2025-12-21T16:00:00+08:00",
  endDate: "2025-12-21T21:00:00+08:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: [
    {
      "@type": "Place",
      name: siteConfig.ceremony.location,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.ceremony.location,
        addressLocality: "Dasmariñas",
        addressRegion: "Cavite",
        addressCountry: "PH",
      },
    },
  ],
  image: [eventImageUrl],
  description: eventDescription,
  organizer: {
    "@type": "Person",
    name: `${siteConfig.couple.groom} & ${siteConfig.couple.bride}`,
  },
  offers: {
    "@type": "Offer",
    url: canonicalUrl,
    availability: "https://schema.org/InStock",
    price: "0",
    priceCurrency: "PHP",
  },
  eventHashtag: "#DediKATEdbyGodForWILMAR",
}

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--font-serif" })
const imperialScript = Imperial_Script({ subsets: ["latin"], weight: "400", variable: "--font-imperial-script" })
const cormorantGaramond = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-cormorant" })
const windSong = WindSong({ subsets: ["latin"], weight: "400", variable: "--font-windsong" })
const playfairDisplay = Playfair_Display({ subsets: ["latin"], weight: ["400", "700", "900"], variable: "--font-playfair" })

export const metadata: Metadata = {
  title: eventTitle,
  description: eventDescription,
  keywords:
    "Wilmar Kate wedding, Wilmar Kate wedding invitation, Villa Anaya Resort and Events Place, emerald green beige wedding, RSVP, wedding invitation website, 2025 weddings, Filipino wedding, wilmarkate25@gmail.com",
  authors: [
    { name: siteConfig.couple.groom },
    { name: siteConfig.couple.bride },
  ],
  creator: `${siteConfig.couple.groom} & ${siteConfig.couple.bride}`,
  publisher: `${siteConfig.couple.groom} & ${siteConfig.couple.bride}`,
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  metadataBase: new URL(canonicalUrl),
  alternates: {
    canonical: canonicalUrl,
  },
  icons: {
    icon: [
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon_io/favicon.ico",
    apple: "/favicon_io/apple-touch-icon.png",
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/favicon_io/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/favicon_io/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/favicon_io/site.webmanifest",
  openGraph: {
    title: eventTitle,
    description: eventDescription,
    url: canonicalUrl,
    siteName: "Wilmar & Kate Wedding Invitation",
    locale: "en_PH",
    type: "website",
    images: [
      {
        url: eventImageUrl,
        width: 1200,
        height: 630,
        alt: "Invitation cover for Wilmar & Kate's wedding celebration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: eventTitle,
    description: eventDescription,
    images: [eventImageUrl],
    creator: "@wilmarkate25",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
  other: {
    "application/ld+json": JSON.stringify(jsonLd),
    image: eventImageUrl,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content={siteConfig.colors.primary} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Imperial+Script&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Fleur+De+Leah&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Tangerine:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="preload" as="image" href="/mobile-background/DSCF2614-min.jpg" media="(max-width: 767px)" />
        <link rel="preload" as="image" href="/desktop-background/DSCF2444-min.jpg" media="(min-width: 768px)" />
      </head>
      <body
        className={`${inter.variable} ${greatVibes.variable} ${imperialScript.variable} ${cormorantGaramond.variable} ${windSong.variable} ${playfairDisplay.variable} font-inter antialiased text-foreground`}
      >
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
