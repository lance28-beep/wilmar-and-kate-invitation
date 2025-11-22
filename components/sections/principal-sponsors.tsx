"use client"

import React from "react"
import { useEffect, useMemo, useState } from "react"
import { Section } from "@/components/section"
import Image from "next/image"

interface PrincipalSponsor {
  MalePrincipalSponsor: string
  FemalePrincipalSponsor: string
}

export function PrincipalSponsors() {
  // Helper component for elegant section titles
  const SectionTitle = ({
    children,
    align = "center",
    className = "",
  }: {
    children: React.ReactNode
    align?: "left" | "center" | "right"
    className?: string
  }) => {
    const textAlign =
      align === "right" ? "text-right" : align === "left" ? "text-left" : "text-center"
    return (
      <h3 className={`text-[10px] sm:text-xs md:text-sm lg:text-base font-bold uppercase text-[#0A3428] mb-1.5 sm:mb-2 md:mb-3 tracking-[0.12em] ${textAlign} ${className} drop-shadow-sm`}>
        {children}
      </h3>
    )
  }

  // Helper component for name items with alignment
  const NameItem = ({ name, align = "center" }: { name: string, align?: "left" | "center" | "right" }) => {
    const containerAlign =
      align === "right" ? "items-end" : align === "left" ? "items-start" : "items-center"
    const textAlign =
      align === "right" ? "text-right" : align === "left" ? "text-left" : "text-center"
    return (
      <div className={`flex flex-col ${containerAlign} justify-center py-1.5 sm:py-2 md:py-2.5 w-full group/item transition-all duration-200 hover:scale-[1.02]`}>
        <p className={`text-[#0A3428] text-xs sm:text-sm md:text-base font-semibold leading-tight break-words ${textAlign} group-hover/item:text-[#106552] transition-colors duration-200`}>{name}</p>
      </div>
    )
  }

  // Remote data state
  const [sponsors, setSponsors] = useState<PrincipalSponsor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSponsors = async () => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/principal-sponsor", { cache: "no-store" })
      if (!res.ok) throw new Error("Failed to load principal sponsors")
      const data: PrincipalSponsor[] = await res.json()
      setSponsors(data)
    } catch (e: any) {
      console.error(e)
      setError(e?.message || "Failed to load principal sponsors")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSponsors()
  }, [])

  // Keep sponsors as pairs to ensure alignment
  const sponsorPairs = useMemo(() => 
    sponsors.filter(s => s.MalePrincipalSponsor || s.FemalePrincipalSponsor),
    [sponsors]
  )

  return (
    <Section
      id="sponsors"
      className="relative bg-transparent py-8 sm:py-10 md:py-14 lg:py-16 xl:py-20 overflow-hidden"
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
        
        {/* Corner decorations - matching countdown section */}
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
          Principal Sponsors
        </h2>
        
        {/* Decorative element below subtitle */}
        <div className="flex items-center justify-center gap-2 mt-2.5 sm:mt-3">
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
        </div>
      </div>

      {/* Sponsors content */}
      <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-4 md:px-6">
        {/* Enhanced card with gradient glow */}
        <div className="relative bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden border border-[#C3A161]/40 shadow-2xl hover:shadow-[0_10px_50px_rgba(195,161,97,0.2)] transition-all duration-300 group">
          {/* Subtle glow on hover */}
          <div className="absolute -inset-0.5 bg-gradient-to-br from-[#C3A161]/20 to-[#C5A572]/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          
          {/* Decorative corner accents - more compact */}
          <div className="absolute top-0.5 left-0.5 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-[#C3A161]/50 rounded-tl-lg" />
          <div className="absolute top-0.5 right-0.5 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-r-2 border-[#C3A161]/50 rounded-tr-lg" />
          <div className="absolute bottom-0.5 left-0.5 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-l-2 border-[#C3A161]/50 rounded-bl-lg" />
          <div className="absolute bottom-0.5 right-0.5 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-[#C3A161]/50 rounded-br-lg" />
          
          {/* Card content */}
          <div className="relative p-4 sm:p-5 md:p-7 lg:p-9 z-10">
            <div className="relative z-10 w-full">
              {isLoading ? (
                <div className="flex items-center justify-center py-16 sm:py-20 md:py-24">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 border-4 border-[#C3A161]/30 border-t-[#C5A572] rounded-full animate-spin" />
                    <span className="text-[#0A3428]/70 text-sm sm:text-base">Loading sponsors...</span>
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center py-16 sm:py-20 md:py-24">
                  <div className="text-center">
                    <p className="text-red-600 text-sm sm:text-base mb-2">{error}</p>
                    <button
                      onClick={fetchSponsors}
                      className="text-[#C5A572] hover:text-[#0A3428] text-sm underline transition-colors duration-200"
                    >
                      Try again
                    </button>
                  </div>
                </div>
              ) : sponsorPairs.length === 0 ? (
                <div className="text-center py-16 sm:py-20 md:py-24">
                  <p className="text-[#0A3428]/60 text-sm sm:text-base">No sponsors yet</p>
                </div>
              ) : (
                <div className="mb-4 sm:mb-5 md:mb-7 lg:mb-9">
                  <div className="grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-2 sm:gap-x-3 md:gap-x-4 mb-2 sm:mb-2.5 md:mb-4">
                    <SectionTitle align="right" className="pr-2 sm:pr-3 md:pr-5">Male Principal Sponsors</SectionTitle>
                    <SectionTitle align="left" className="pl-2 sm:pl-3 md:pl-5">Female Principal Sponsors</SectionTitle>
                  </div>
                  <div className="grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-2 sm:gap-x-3 md:gap-x-4 gap-y-1 sm:gap-y-1.5 md:gap-y-2 items-stretch">
                    {sponsorPairs.map((pair, idx) => (
                      <>
                        <div key={`male-${idx}-${pair.MalePrincipalSponsor || 'empty'}`} className="px-2 sm:px-3 md:px-5">
                          {pair.MalePrincipalSponsor ? (
                            <NameItem name={pair.MalePrincipalSponsor} align="right" />
                          ) : (
                            <div className="py-1 sm:py-1.5" />
                          )}
                        </div>
                        <div key={`female-${idx}-${pair.FemalePrincipalSponsor || 'empty'}`} className="px-2 sm:px-3 md:px-5">
                          {pair.FemalePrincipalSponsor ? (
                            <NameItem name={pair.FemalePrincipalSponsor} align="left" />
                          ) : (
                            <div className="py-1 sm:py-1.5" />
                          )}
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
