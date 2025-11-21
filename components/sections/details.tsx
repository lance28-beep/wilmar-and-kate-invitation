"use client"

import { Section } from "@/components/section"
import { siteConfig } from "@/content/site"
import { Car, Shirt, Copy, Check, Navigation, MapPin, Mail, Phone, Music2 } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

export function Details() {
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set())

  const copyToClipboard = async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItems(prev => new Set(prev).add(itemId))
      setTimeout(() => {
        setCopiedItems(prev => {
          const newSet = new Set(prev)
          newSet.delete(itemId)
          return newSet
        })
      }, 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  // Updated venue information
  const ceremonyVenueName = "Farm Hills Garden Tagaytay"
  const ceremonyVenueAddress = "Garden Area"
  const receptionVenueName = "Farm Hills Garden Tagaytay"
  const receptionVenueAddress = "Pavilion"
  const fullAddress = "Farm Hills Garden, Tagaytay"
  const venue = `Farm Hills Garden, Tagaytay`
  const ceremonyMapsLink = `https://maps.google.com/?q=${encodeURIComponent(venue)}`
  const receptionMapsLink = `https://maps.google.com/?q=${encodeURIComponent(venue)}`

  const openInMaps = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer')
  }


  return (
    <Section id="details" className="relative bg-[#869EB6] py-10 sm:py-12 md:py-16 lg:py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/Details/FARMHILLSGARDENTAGAYTAY.png"
          alt="Farm Hills Garden"
          fill
          className="object-cover opacity-20"
          sizes="100vw"
          priority
        />
        {/* Overlay to blend with theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#869EB6]/80 via-[#869EB6]/70 to-[#869EB6]/80" />
      </div>

      {/* Enhanced background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft gradient overlays */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 via-white/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white/20 via-white/5 to-transparent" />
        
        {/* Floating decorative circles */}
        <div className="absolute top-12 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-24 left-16 w-24 h-24 bg-white/8 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-white/12 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-32 left-12 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        
        {/* Corner decorations - more compact on mobile */}
        <div className="absolute top-0 left-0 z-0">
          <Image
            src="/decoration/corner-left-button.png"
            alt=""
            width={200}
            height={200}
            className="w-28 sm:w-36 md:w-44 lg:w-52 xl:w-60 h-auto opacity-75 scale-y-[-1]"
            priority={false}
          />
        </div>
        
        <div className="absolute top-0 right-0 z-0">
          <Image
            src="/decoration/corner-left-button.png"
            alt=""
            width={200}
            height={200}
            className="w-28 sm:w-36 md:w-44 lg:w-52 xl:w-60 h-auto opacity-75 scale-x-[-1] scale-y-[-1]"
            priority={false}
          />
        </div>
        
        <div className="absolute bottom-0 left-0 z-0">
          <Image
            src="/decoration/corner-left-button.png"
            alt=""
            width={200}
            height={200}
            className="w-28 sm:w-36 md:w-44 lg:w-52 xl:w-60 h-auto opacity-75"
            priority={false}
          />
        </div>
        
        <div className="absolute bottom-0 right-0 z-0">
          <Image
            src="/decoration/corner-left-button.png"
            alt=""
            width={200}
            height={200}
            className="w-28 sm:w-36 md:w-44 lg:w-52 xl:w-60 h-auto opacity-75 scale-x-[-1]"
            priority={false}
          />
        </div>
        
        {/* Decorative lines */}
        <div className="absolute top-1/3 left-0 w-full h-px bg-white/20" />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-6 sm:mb-8 md:mb-10 px-3 sm:px-4">
        {/* Decorative element above title */}
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <div className="w-8 sm:w-12 md:w-16 h-px bg-white/40" />
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          <div className="w-8 sm:w-12 md:w-16 h-px bg-white/40" />
        </div>
        
        <h2 className="imperial-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-white mb-2 sm:mb-3 md:mb-4 drop-shadow-lg leading-snug">
          Event Details
        </h2>
        
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/90 font-light max-w-xl mx-auto leading-relaxed px-2">
          Everything you need to know about our special day
        </p>
        
        {/* Decorative element below subtitle */}
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
        </div>
      </div>

      {/* Ceremony and Reception - Countdown Style Card */}
      <div className="relative z-10 mb-6 sm:mb-7 md:mb-9 max-w-4xl mx-auto px-3 sm:px-4 md:px-6">
        <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-2xl border border-white/30">
          {/* Venue Image */}
          <div className="relative w-full h-40 sm:h-48 md:h-56 lg:h-64 mb-5 sm:mb-6 rounded-xl overflow-hidden">
            <Image
              src="/Details/FARMHILLSGARDENTAGAYTAY.png"
              alt="Farm Hills Garden Tagaytay"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            
            {/* Venue overlay */}
            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 drop-shadow-lg leading-tight">
                Farm Hills Garden
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-white/95 font-medium drop-shadow-md">
                Tagaytay City
              </p>
            </div>
          </div>

          {/* Content Section */}
          <div className="relative">
            {/* Date - Countdown style */}
            <div className="text-center mb-5 sm:mb-6">
              {/* Decorative divider */}
              <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                <div className="w-12 sm:w-16 h-px bg-white/50" />
                <div className="flex items-center gap-1.5">
                  <div className="w-1 h-1 bg-white/70 rounded-full" />
                  <div className="w-1.5 h-1.5 bg-white/90 rounded-full" />
                  <div className="w-1 h-1 bg-white/70 rounded-full" />
                </div>
                <div className="w-12 sm:w-16 h-px bg-white/50" />
              </div>
              
              <p className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 sm:mb-4">
                January 23, 2026 • Thursday
              </p>
              
              {/* Bottom decorative divider */}
              <div className="flex items-center justify-center gap-1.5">
                <div className="w-1 h-1 bg-white/70 rounded-full" />
                <div className="w-1.5 h-1.5 bg-white/90 rounded-full" />
                <div className="w-1 h-1 bg-white/70 rounded-full" />
              </div>
            </div>

            {/* Ceremony and Reception Times - Compact */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center mb-5 sm:mb-6">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2.5 rounded-lg text-center">
                <p className="text-xs sm:text-sm md:text-base text-white font-semibold">
                  Ceremony: 4:00 PM
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2.5 rounded-lg text-center">
                <p className="text-xs sm:text-sm md:text-base text-white font-semibold">
                  Reception: 6:00 PM
                </p>
              </div>
            </div>

            {/* Venue Details - Compact */}
            <div className="space-y-2 sm:space-y-2.5 mb-5 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-3.5 bg-white/15 backdrop-blur-sm rounded-lg border border-white/20">
                <div className="bg-white/20 p-2 rounded-lg flex-shrink-0">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-bold text-white">Ceremony</p>
                  <p className="text-[11px] sm:text-xs text-white/90">Garden Area</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-3.5 bg-white/15 backdrop-blur-sm rounded-lg border border-white/20">
                <div className="bg-white/20 p-2 rounded-lg flex-shrink-0">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-bold text-white">Reception</p>
                  <p className="text-[11px] sm:text-xs text-white/90">Pavilion</p>
                </div>
              </div>
            </div>

            {/* Action Buttons - Clean, One Row on Mobile */}
            <div className="flex flex-row gap-2 sm:gap-3">
              <button
                onClick={() => openInMaps(ceremonyMapsLink)}
                className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-3 sm:py-3.5 bg-white/95 hover:bg-white text-[#869EB6] rounded-xl font-bold text-xs sm:text-sm md:text-base transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-md hover:shadow-lg"
                aria-label="Get directions to venue"
              >
                <Navigation className="w-4 h-4 flex-shrink-0" />
                <span className="hidden sm:inline">Get Directions</span>
                <span className="sm:hidden">Directions</span>
              </button>
              <button
                onClick={() => copyToClipboard(venue, 'venue')}
                className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-3 sm:py-3.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-xl font-bold text-xs sm:text-sm md:text-base transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
                aria-label="Copy venue address"
              >
                {copiedItems.has('venue') ? (
                  <Check className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <Copy className="w-4 h-4 flex-shrink-0" />
                )}
                <span className="hidden sm:inline">{copiedItems.has('venue') ? 'Copied!' : 'Copy Address'}</span>
                <span className="sm:hidden">Copy</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-4 md:px-6">
        <div className="text-center mb-5 sm:mb-6 md:mb-7">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1.5 sm:mb-2 text-white drop-shadow-lg">Important Information</h3>
          <p className="text-xs sm:text-sm text-white/90 font-light">Everything you need to know</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
          {/* Dress Code - Countdown Style */}
          <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 shadow-xl border border-white/30">
            {/* Corner decorations like countdown */}
            <div className="absolute top-1 left-1 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-white/40 rounded-tl-lg" />
            <div className="absolute top-1 right-1 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-r-2 border-white/40 rounded-tr-lg" />
            <div className="absolute bottom-1 left-1 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-l-2 border-white/40 rounded-bl-lg" />
            <div className="absolute bottom-1 right-1 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-white/40 rounded-br-lg" />
            
            <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
              <div className="bg-white/20 p-2 sm:p-2.5 rounded-lg flex-shrink-0">
                <Shirt className="text-white w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h4 className="text-base sm:text-lg md:text-xl font-bold text-white">Dress Code</h4>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <div>
                <p className="text-xs sm:text-sm md:text-base text-white/95 leading-relaxed">
                  We would love to see you in <span className="font-semibold">formal attire</span> following our color palette.
                </p>
              </div>

              {/* Color Palette */}
              <div>
                <p className="text-xs sm:text-sm font-semibold text-white mb-2 sm:mb-2.5">Wedding Colors</p>
                <div className="flex gap-2 sm:gap-3 flex-wrap items-center">
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full shadow-md border-2 border-white/60 bg-[#83927D]" />
                    <span className="text-[10px] sm:text-xs text-white/90 font-medium">Sage Green</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full shadow-md border-2 border-white/60 bg-[#869EB6]" />
                    <span className="text-[10px] sm:text-xs text-white/90 font-medium">Dusty Blue</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full shadow-md border-2 border-white/60 bg-[#A8A8A8]" />
                    <span className="text-[10px] sm:text-xs text-white/90 font-medium">Gray/Silver</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Parking & Travel - Countdown Style */}
          <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 shadow-xl border border-white/30">
            {/* Corner decorations like countdown */}
            <div className="absolute top-1 left-1 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-white/40 rounded-tl-lg" />
            <div className="absolute top-1 right-1 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-r-2 border-white/40 rounded-tr-lg" />
            <div className="absolute bottom-1 left-1 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-l-2 border-white/40 rounded-bl-lg" />
            <div className="absolute bottom-1 right-1 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-white/40 rounded-br-lg" />
            
            <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
              <div className="bg-white/20 p-2 sm:p-2.5 rounded-lg flex-shrink-0">
                <Car className="text-white w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h4 className="text-base sm:text-lg md:text-xl font-bold text-white">Parking & Travel</h4>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <div>
                <p className="text-xs sm:text-sm font-semibold text-white mb-1.5 sm:mb-2">Parking Available</p>
                <p className="text-[11px] sm:text-xs text-white/90 leading-relaxed">
                  Farm Hills Garden offers ample parking spaces. Kindly arrive 15–20 minutes early to settle in comfortably.
                </p>
              </div>

              <div>
                <p className="text-xs sm:text-sm font-semibold text-white mb-1.5 sm:mb-2">Getting There</p>
                <p className="text-[11px] sm:text-xs text-white/90 leading-relaxed">
                  The venue is located in Tagaytay City. Please use "Farm Hills Garden, Tagaytay" in your navigation app for directions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </Section>
  )
}


