import type React from "react"
import type { Metadata } from "next"
import { Great_Vibes, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navbar } from "@/components/navbar"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--font-serif" })

export const metadata: Metadata = {
  title: "Wilmar&Kate - Wedding Invitation",
  description:
    "Celebrate the simple andbeautiful wedding of Wilmar and Kate on December 21, 2025 at the Villa Anaya Resort and Events Place. RSVP, read the invitation, and get all event details online.",
  keywords:
    "Wilmar Kate wedding, Wilmar Kate wedding invitation, Villa Anaya Resort and Events Place, emerald green beige wedding, RSVP, wedding invitation website, 2025 weddings, Filipino wedding, wilmarkate25@gmail.com",
  authors: [
    { name: "Wilmar" }, 
    { name: "Kate" },  
  ],
  creator: "Wilmar & Kate",
  publisher: "Wilmar & Kate",
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  metadataBase: new URL("https://wilmar-and-kate-invitation.vercel.app/"),
  alternates: {
    canonical: "https://wilmar-and-kate-invitation.vercel.app/",
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
    title: "Wilmar & Kate Wedding | December 21, 2025",
    description:
      'Join Wilmar & Kate as they say "I do" on December 21, 2025 at the Villa Anaya Resort and Events Place. View the invitation, RSVP details, and schedule online.',
    url: "https://wilmar-and-kate-invitation.vercel.app/",
    siteName: "Wilmar and Kate Wedding",
    locale: "en_PH",
    type: "website",
    images: [
      {
        url: "https://wilmar-and-kate-invitation.vercel.app/desktop-background/couple (66).jpg",
        width: 1200,
        height: 630,
        alt: "Wilmar & Kate Wedding Invitation - December 21, 2025",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wilmar & Kate Wedding Invitation",
    description:
      "You're invited to the wedding of Wilmar & Kate on December 21, 2025 at the Villa Anaya Resort and Events Place. RSVP and view the details online. #WilmarAndKate",
    images: ["https://wilmar-and-kate-invitation.vercel.app/desktop-background/couple (66).jpg"],
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
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Event",
      name: "Jay & Cha Wedding",  
      startDate: "2026-01-13T04:00:00+08:00",
      endDate: "2026-01-13T06:00:00+08:00",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: "Farm Hills Garden Tagaytay",
      image: ["https://wilmar-and-kate-invitation.vercel.app/desktop-background/couple (66).jpg"],
      description:
        "In honor and gratitude to God who brought them together, Wilmar & Kate invite you to witness their simple wedding on December 21, 2025 at the Villa Anaya Resort and Events Place. RSVP details and schedule are available online.",
      organizer: {
        "@type": "Person",
        name: "Wilmar & Kate",
      },
      offers: {
        "@type": "Offer",
        url: "https://wilmar-and-kate-invitation.vercel.app/",
        availability: "https://schema.org/InStock",
        price: "0",
        priceCurrency: "PHP",
      },
      eventHashtag: "#DediKATEdbyGodForWILMAR",
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
        <link href="https://fonts.googleapis.com/css2?family=Alex+Brush&display=swap" rel="stylesheet" />
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
