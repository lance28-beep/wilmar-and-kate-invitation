"use client"

import { useState, useEffect } from "react"
import { Loader2, Mail, MessageSquare, Heart, Sparkles, User } from "lucide-react"
import Image from "next/image"

interface Guest {
  Name: string
  Email: string
  RSVP: string
  Guest: string
  Message: string
}

export function BookOfGuests() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalGuests, setTotalGuests] = useState(0)

  const getInitials = (name: string) => {
    if (!name) return "?"
    const parts = name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
    return parts.map((p) => p[0]?.toUpperCase()).join("") || "?"
  }

  const fetchGuests = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/guests", { cache: "no-store" })

      if (!response.ok) {
        throw new Error("Failed to fetch guest list")
      }

      const data: Guest[] = await response.json()

      // Filter only attending guests and normalize Guest field
      const attendingGuests = data
        .filter((guest) => guest.RSVP === "Yes")
        .map((guest) => ({
          ...guest,
          Guest: guest.Guest || '1', // Ensure Guest field exists
        }))
      
      // Calculate total guests by summing the Guest column values
      const totalGuestCount = attendingGuests.reduce((sum, guest) => {
        const guestCount = parseInt(String(guest.Guest)) || 1
        return sum + guestCount
      }, 0)
      
      setGuests(attendingGuests)
      setTotalGuests(totalGuestCount)
    } catch (error: any) {
      console.error("Failed to load guests:", error)
      setError(error?.message || "Failed to load guest list")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Initial fetch
    fetchGuests()

    // Set up event listener for RSVP updates
    const handleRsvpUpdate = () => {
      // Add a small delay to allow Google Sheets to update
      setTimeout(() => {
        fetchGuests()
      }, 2000)
    }

    window.addEventListener("rsvpUpdated", handleRsvpUpdate)

    return () => {
      window.removeEventListener("rsvpUpdated", handleRsvpUpdate)
    }
  }, [])

  return (
    <div 
      id="guests" 
      className="relative z-[55] isolate bg-[#83927D] py-8 sm:py-10 md:py-14 lg:py-16 xl:py-20 overflow-hidden"
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft gradient overlays */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/15 via-white/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white/15 via-white/5 to-transparent" />
        
        {/* Floating decorative circles */}
        <div className="absolute top-16 right-12 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-32 left-20 w-24 h-24 bg-white/8 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-16 left-20 w-28 h-28 bg-white/12 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-24 right-12 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 z-0">
          <Image
            src="/decoration/corner-left-button.png"
            alt=""
            width={200}
            height={200}
            className="w-24 sm:w-32 md:w-40 lg:w-48 xl:w-56 h-auto opacity-60 scale-y-[-1]"
            priority={false}
          />
        </div>
        
        <div className="absolute top-0 right-0 z-0">
          <Image
            src="/decoration/corner-left-button.png"
            alt=""
            width={200}
            height={200}
            className="w-24 sm:w-32 md:w-40 lg:w-48 xl:w-56 h-auto opacity-60 scale-x-[-1] scale-y-[-1]"
            priority={false}
          />
        </div>
        
        <div className="absolute bottom-0 left-0 z-0">
          <Image
            src="/decoration/corner-left-button.png"
            alt=""
            width={200}
            height={200}
            className="w-24 sm:w-32 md:w-40 lg:w-48 xl:w-56 h-auto opacity-60"
            priority={false}
          />
        </div>
        
        <div className="absolute bottom-0 right-0 z-0">
          <Image
            src="/decoration/corner-left-button.png"
            alt=""
            width={200}
            height={200}
            className="w-24 sm:w-32 md:w-40 lg:w-48 xl:w-56 h-auto opacity-60 scale-x-[-1]"
            priority={false}
          />
        </div>
        
        {/* Decorative horizontal line */}
        <div className="absolute top-1/3 left-0 w-full h-px bg-white/20" />
      </div>

      {/* Section Header */}
      <div className="relative z-10 text-center mb-6 sm:mb-7 md:mb-9 lg:mb-11 px-3 sm:px-4">
        {/* Decorative element above title */}
        <div className="flex items-center justify-center gap-2 mb-2.5 sm:mb-3">
          <div className="w-8 sm:w-12 md:w-16 h-px bg-white/40" />
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          <div className="w-8 sm:w-12 md:w-16 h-px bg-white/40" />
        </div>
        
        <h2 className="imperial-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-white mb-2 sm:mb-3 drop-shadow-lg leading-tight">
          Book of Guests
        </h2>
        
        <p className="text-xs sm:text-sm md:text-base text-white/90 font-light max-w-xl mx-auto leading-relaxed px-2">
          See who's celebrating with us
        </p>
        
        {/* Decorative element below subtitle */}
        <div className="flex items-center justify-center gap-2 mt-2.5 sm:mt-3">
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
        </div>
      </div>

      {/* Guests content */}
      <div className="relative z-10">
        {/* Stats card */}
        <div className="text-center mb-4 sm:mb-5 md:mb-6 px-3 sm:px-4 md:px-6">
          <div className="relative max-w-3xl mx-auto">
            <div className="relative bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden border border-[#869EB6]/40 shadow-2xl hover:shadow-[0_10px_50px_rgba(134,158,182,0.3)] transition-all duration-300 group">
              {/* Subtle glow on hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-br from-[#869EB6]/20 to-[#83927D]/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
              
              {/* Decorative corner accents - compact */}
              <div className="absolute top-0.5 left-0.5 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-[#869EB6]/50 rounded-tl-lg" />
              <div className="absolute top-0.5 right-0.5 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-r-2 border-[#869EB6]/50 rounded-tr-lg" />
              <div className="absolute bottom-0.5 left-0.5 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-l-2 border-[#869EB6]/50 rounded-bl-lg" />
              <div className="absolute bottom-0.5 right-0.5 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-[#869EB6]/50 rounded-br-lg" />
              
              {/* Content */}
              <div className="relative z-10 p-3 sm:p-4 md:p-5">
                <div className="flex items-center justify-center gap-2 mb-1.5 sm:mb-2">
                  <div className="bg-gradient-to-br from-[#83927D] to-[#869EB6] p-1.5 rounded-full shadow-md flex-shrink-0">
                    <Heart className="text-white h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </div>
                  <div className="flex flex-col items-center">
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-sans font-bold text-[#0A3428] leading-tight">
                      {totalGuests} {totalGuests === 1 ? "Guest" : "Guests"} Celebrating
                    </h3>
                    <p className="text-[9px] sm:text-[10px] md:text-xs text-[#0A3428]/70 font-sans mt-0.5">
                      {guests.length} {guests.length === 1 ? "RSVP entry" : "RSVP entries"}
                    </p>
                  </div>
                </div>
                <p className="text-[10px] sm:text-xs md:text-sm text-[#0A3428]/80 font-sans leading-relaxed">
                  Thank you for your RSVP!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Guest list container */}
        <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6">
          <div className="relative bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden border border-[#869EB6]/40 shadow-2xl hover:shadow-[0_10px_50px_rgba(134,158,182,0.3)] transition-all duration-300 group">
            {/* Subtle glow on hover */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-[#869EB6]/20 to-[#83927D]/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
            
            {/* Decorative corner accents - compact */}
            <div className="absolute top-0.5 left-0.5 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-[#869EB6]/50 rounded-tl-lg" />
            <div className="absolute top-0.5 right-0.5 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-r-2 border-[#869EB6]/50 rounded-tr-lg" />
            <div className="absolute bottom-0.5 left-0.5 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-l-2 border-[#869EB6]/50 rounded-bl-lg" />
            <div className="absolute bottom-0.5 right-0.5 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-[#869EB6]/50 rounded-br-lg" />
            
            <div className="relative p-3 sm:p-4 md:p-6 lg:p-8 z-10">
            
            {isLoading ? (
              <div className="flex items-center justify-center py-12 sm:py-16">
                <div className="flex flex-col items-center gap-2.5">
                  <Loader2 className="h-7 w-7 sm:h-8 sm:w-8 animate-spin text-[#869EB6]" />
                  <span className="text-[#0A3428]/70 font-sans text-xs sm:text-sm">Loading guests...</span>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-12 sm:py-16">
                <div className="text-center">
                  <MessageSquare className="h-8 w-8 sm:h-10 sm:w-10 text-red-500 mx-auto mb-2.5" />
                  <p className="text-red-600 font-sans text-xs sm:text-sm mb-2">{error}</p>
                </div>
              </div>
            ) : guests.length === 0 ? (
              <div className="flex items-center justify-center py-12 sm:py-16">
                <div className="text-center px-3">
                  <div className="bg-gradient-to-br from-[#83927D] to-[#869EB6] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-2.5">
                    <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg font-sans font-bold text-[#0A3428] mb-1 sm:mb-1.5">
                    No guests yet
                  </h3>
                  <p className="text-[10px] sm:text-xs text-[#0A3428]/70 font-sans max-w-xs mx-auto leading-relaxed">
                    Be the first to RSVP!
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-2 relative z-10">
                {guests.map((guest, index) => (
                  <div
                    key={index}
                    className="group relative bg-white rounded-lg sm:rounded-xl p-2 sm:p-2.5 md:p-3 border border-[#869EB6]/30 hover:border-[#869EB6]/50 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="flex gap-2">
                      {/* Avatar */}
                      <div className="relative h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 flex-shrink-0">
                        <div className="h-full w-full rounded-full bg-gradient-to-br from-[#83927D] to-[#869EB6] text-white flex items-center justify-center font-semibold shadow-md ring-2 ring-white text-[10px] sm:text-xs">
                          {getInitials(guest.Name)}
                        </div>
                      </div>
                      
                      {/* Guest Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1.5 sm:gap-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-sans text-xs sm:text-sm md:text-base font-semibold text-[#0A3428] mb-0.5 group-hover:text-[#83927D] transition-colors duration-200 truncate">
                              {guest.Name}
                            </h4>
                            {guest.Email && guest.Email !== "Pending" && (
                              <div className="flex items-center text-[9px] sm:text-[10px] text-[#0A3428]/70 mb-0.5">
                                <Mail className="h-2.5 w-2.5 mr-1 text-[#869EB6] flex-shrink-0" />
                                <span className="font-sans truncate">{guest.Email}</span>
                              </div>
                            )}
                          </div>
                          {/* Guest count badge */}
                          <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
                            <User className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#869EB6]" />
                            <span className="inline-flex items-center justify-center px-1.5 py-0.5 sm:px-2 bg-[#869EB6]/10 text-[#83927D] rounded-full text-[9px] sm:text-[10px] font-semibold border border-[#869EB6]/30 whitespace-nowrap">
                              {guest.Guest ? (parseInt(String(guest.Guest)) || 1) : 1}
                            </span>
                          </div>
                        </div>
                        
                        {/* Message */}
                        {guest.Message && (
                          <div className="mt-1.5 sm:mt-2 pt-1.5 sm:pt-2 border-t border-[#869EB6]/20">
                            <div className="flex items-start gap-1 sm:gap-1.5">
                              <MessageSquare className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#869EB6] flex-shrink-0 mt-0.5" />
                              <p className="text-[9px] sm:text-[10px] md:text-xs text-[#0A3428]/80 font-sans leading-relaxed italic flex-1">
                                "{guest.Message}"
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
