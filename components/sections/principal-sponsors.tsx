"use client"

import React from "react"
import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { Loader2, Users } from "lucide-react"

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
      <h3 className={`text-[10px] sm:text-xs md:text-sm lg:text-base font-bold uppercase text-[#5A1422] mb-1.5 sm:mb-2 md:mb-3 tracking-[0.12em] ${textAlign} ${className} drop-shadow-sm`}>
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
        <p className={`text-[#5A1422] text-xs sm:text-sm md:text-base font-semibold leading-tight break-words ${textAlign} group-hover/item:text-[#821D30] transition-colors duration-200`}>{name}</p>
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
    <section
      id="sponsors"
      className="relative min-h-screen py-8 sm:py-10 md:py-14 lg:py-16 xl:py-20 overflow-hidden"
      style={{
        backgroundImage: 'url(/gallery/maroon-white-gradient-noisy-grain-background.avif)',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Floral decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Top right corner decoration */}
        <div className="absolute -top-10 -right-6 sm:-top-14 sm:-right-8 md:-top-16 md:-right-10 z-0">
          <Image
            src="/decoration/top-right-corner-flower.png"
            alt=""
            width={320}
            height={320}
            className="w-48 sm:w-60 md:w-72 lg:w-80 xl:w-96 h-auto opacity-80"
            priority={false}
          />
        </div>
        {/* Top left corner decoration */}
        <div className="absolute -top-10 -left-6 sm:-top-14 sm:-left-8 md:-top-16 md:-left-10 z-0">
          <Image
            src="/decoration/top-right-corner-flower.png"
            alt=""
            width={320}
            height={320}
            className="w-48 sm:w-60 md:w-72 lg:w-80 xl:w-96 h-auto opacity-80 scale-x-[-1]"
            priority={false}
          />
        </div>
        {/* Bottom left corner decoration - flipped horizontally */}
        <div className="absolute bottom-0 left-0 z-0">
          <Image
            src="/decoration/right-bottom-corner-flower.png"
            alt=""
            width={200}
            height={200}
            className="w-40 sm:w-48 md:w-52 lg:w-56 xl:w-60 h-auto opacity-80 scale-x-[-1]"
            priority={false}
          />
        </div>
        
        {/* Bottom right corner decoration */}
        <div className="absolute bottom-0 right-0 z-0">
          <Image
            src="/decoration/right-bottom-corner-flower.png"
            alt=""
            width={200}
            height={200}
            className="w-40 sm:w-48 md:w-52 lg:w-56 xl:w-60 h-auto opacity-80"
            priority={false}
          />
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 px-3 sm:px-4 text-center mb-6 sm:mb-8 md:mb-12">
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <div className="w-8 sm:w-12 md:w-16 h-px bg-white/40" />
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          <div className="w-8 sm:w-12 md:w-16 h-px bg-white/40" />
        </div>
        
        <h2 className="imperial-script-regular mb-2 sm:mb-3 md:mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-white drop-shadow-lg">
          Principal Sponsors
        </h2>
        
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
        </div>
      </div>

      {/* Sponsors content */}
      <div className="relative z-10 px-3 sm:px-4 md:px-6 lg:px-8 mb-8 sm:mb-10 md:mb-12">
        <div className="mx-auto w-full max-w-5xl relative">
          <div className="absolute -inset-2 rounded-[32px] sm:rounded-[36px] bg-white/30 blur-3xl opacity-40" />
          
          <div className="relative rounded-[24px] sm:rounded-[28px] md:rounded-[32px] bg-white/20 p-[3px] shadow-[0_18px_60px_rgba(0,0,0,0.18)] backdrop-blur-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent pointer-events-none" />
            
            <div className="relative p-4 sm:p-5 md:p-7 lg:p-9 z-10 rounded-[20px] sm:rounded-[24px] md:rounded-[28px] bg-white/30 backdrop-blur-2xl">
              {isLoading ? (
                <div className="flex items-center justify-center py-16 sm:py-20 md:py-24">
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 animate-spin text-[#5A1422]" />
                    <span className="text-[#5A1422]/70 text-sm sm:text-base">Loading sponsors...</span>
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center py-16 sm:py-20 md:py-24">
                  <div className="text-center">
                    <p className="text-red-600 text-sm sm:text-base mb-2">{error}</p>
                    <button
                      onClick={fetchSponsors}
                      className="text-[#5A1422] hover:text-[#821D30] text-sm underline transition-colors duration-200"
                    >
                      Try again
                    </button>
                  </div>
                </div>
              ) : sponsorPairs.length === 0 ? (
                <div className="text-center py-16 sm:py-20 md:py-24">
                  <Users className="h-12 w-12 sm:h-14 sm:w-14 text-[#EAD4D9]/30 mx-auto mb-3" />
                  <p className="text-[#5A1422]/60 text-sm sm:text-base">No sponsors yet</p>
                </div>
              ) : (
                <div className="mb-4 sm:mb-5 md:mb-7 lg:mb-9">
                  <div className="grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-2 sm:gap-x-3 md:gap-x-4 mb-2 sm:mb-2.5 md:mb-4">
                    <SectionTitle align="right" className="pr-2 sm:pr-3 md:pr-5">Male Principal Sponsors</SectionTitle>
                    <SectionTitle align="left" className="pl-2 sm:pl-3 md:pl-5">Female Principal Sponsors</SectionTitle>
                  </div>
                  <div className="grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-2 sm:gap-x-3 md:gap-x-4 gap-y-1 sm:gap-y-1.5 md:gap-y-2 items-stretch">
                    {sponsorPairs.map((pair, idx) => (
                      <React.Fragment key={`sponsor-row-${idx}`}>
                        <div className="px-2 sm:px-3 md:px-5">
                          {pair.MalePrincipalSponsor ? (
                            <NameItem name={pair.MalePrincipalSponsor} align="right" />
                          ) : (
                            <div className="py-1 sm:py-1.5" />
                          )}
                        </div>
                        <div className="px-2 sm:px-3 md:px-5">
                          {pair.FemalePrincipalSponsor ? (
                            <NameItem name={pair.FemalePrincipalSponsor} align="left" />
                          ) : (
                            <div className="py-1 sm:py-1.5" />
                          )}
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
