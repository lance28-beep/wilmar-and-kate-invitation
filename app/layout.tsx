import type React from "react"
import type { Metadata } from "next"
import { Great_Vibes, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navbar } from "@/components/navbar"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--font-serif" })

export const metadata: Metadata = {
  title: "Jay & Cha - Wedding Invitation",
  description:
    "Celebrate the simple and faith-filled wedding of Jay and Cha on January 23, 2026 at the Farm Hills Garden Tagaytay. RSVP, read the invitation, and get all event details online.",
  keywords:
    "Jay Cha wedding, Jay Cha wedding invitation, Tagaytay wedding, Farm Hills Garden Tagaytay, emerald green beige wedding, RSVP, wedding invitation website, 2026 weddings, Filipino wedding, jaycha26@gmail.com",
  authors: [
    { name: "Jay" },
    { name: "Cha" },  
  ],
  creator: "Jay & Cha",
  publisher: "Jay & Cha",
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  metadataBase: new URL("https://jay-and-cha-invitation.vercel.app/"),
  alternates: {
    canonical: "https://jay-and-cha-invitation.vercel.app/",
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
    title: "Jay & Cha Wedding | January 23, 2026",
    description:
      "Join Jay & Cha as they say “I do” on January 23, 2026 at the Farm Hills Garden Tagaytay. View the invitation, RSVP details, and schedule online.",
    url: "https://jay-and-cha-invitation.vercel.app/",
    siteName: "Jay and Cha Wedding",
    locale: "en_PH",
    type: "website",
    images: [
      {
        url: "https://jay-and-cha-invitation.vercel.app/desktop-background/couple (6).jpeg",
        width: 1200,
        height: 630,
        alt: "Jay & Cha Wedding Invitation - January 23, 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jay & Cha Wedding Invitation",
    description:
      "You're invited to the wedding of Jay & Cha on January 23, 2026 at the Farm Hills Garden Tagaytay. RSVP and view the details online. #JayAndCha",
    images: ["https://jay-and-cha-invitation.vercel.app/desktop-background/couple (6).jpeg"],
    creator: "@jayandcha",
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
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Event",
      name: "Jay & Cha Wedding",  
      startDate: "2026-01-23T04:00:00+08:00",
      endDate: "2026-01-23T06:00:00+08:00",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: "Farm Hills Garden Tagaytay",
      image: ["https://jay-and-cha-invitation.vercel.app/desktop-background/couple (6).jpeg"],
      description:
        "In honor and gratitude to God who brought them together, Jay & Cha invite you to witness their simple wedding on January 23, 2026 at the Farm Hills Garden Tagaytay. RSVP details and schedule are available online.",
      organizer: {
        "@type": "Person",
        name: "Jay & Cha",
      },
      offers: {
        "@type": "Offer",
        url: "https://jay-and-cha-invitation.vercel.app/",
        availability: "https://schema.org/InStock",
        price: "0",
        priceCurrency: "PHP",
      },
      eventHashtag: "#JayAndCha",
    }),
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
        <meta name="theme-color" content="#0A3428" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montez&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Parisienne&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Imperial+Script&display=swap" rel="stylesheet" />
        <link rel="preload" as="image" href="/mobile-background/DSCF2614-min.jpg" media="(max-width: 767px)" />
        <link rel="preload" as="image" href="/desktop-background/DSCF2444-min.jpg" media="(min-width: 768px)" />
      </head>
      <body className={`${inter.variable} ${greatVibes.variable} font-inter antialiased text-foreground`}>
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
