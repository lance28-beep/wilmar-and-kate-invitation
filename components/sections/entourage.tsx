"use client"

import React from "react"
import { useState, useEffect, useMemo } from "react"
import { Loader2, Users } from "lucide-react"
import Image from "next/image"

interface EntourageMember {
  Name: string
  RoleCategory: string
  RoleTitle: string
  Email: string
}

const ROLE_CATEGORY_ORDER = [
  "The Couple",
  "Parents of the Groom",
  "Parents of the Bride",
  "Best Man",
  "Maid/Matron of Honor",
  "Candle Sponsors",
  "Veil Sponsors",
  "Cord Sponsors",
  "Groomsmen",
  "Bridesmaids",
  "Flower Girls",
  "Ring/Coin Bearers",
]

export function Entourage() {
  const [entourage, setEntourage] = useState<EntourageMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEntourage = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/entourage", { cache: "no-store" })
      if (!response.ok) {
        throw new Error("Failed to fetch entourage")
      }
      const data: EntourageMember[] = await response.json()
      setEntourage(data)
    } catch (error: any) {
      console.error("Failed to load entourage:", error)
      setError(error?.message || "Failed to load entourage")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchEntourage()

    // Set up auto-refresh listener for dashboard updates
    const handleEntourageUpdate = () => {
      setTimeout(() => {
        fetchEntourage()
      }, 1000)
    }

    window.addEventListener("entourageUpdated", handleEntourageUpdate)

    return () => {
      window.removeEventListener("entourageUpdated", handleEntourageUpdate)
    }
  }, [])

  // Group entourage by role category
  const grouped = useMemo(() => {
    const grouped: Record<string, EntourageMember[]> = {}
    
    entourage.forEach((member) => {
      const category = member.RoleCategory || "Other"
      if (!grouped[category]) {
        grouped[category] = []
      }
      grouped[category].push(member)
    })
    
    return grouped
  }, [entourage])

  // Helper component for elegant section titles
  const SectionTitle = ({ 
    children,
    align = "center",
    className = ""
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

  // Helper component for name items with role title (supports alignment)
  const NameItem = ({
    member,
    align = "center",
    showRole = true,
  }: {
    member: EntourageMember
    align?: "left" | "center" | "right"
    showRole?: boolean
  }) => {
    const containerAlign =
      align === "right" ? "items-end" : align === "left" ? "items-start" : "items-center"
    const textAlign =
      align === "right" ? "text-right" : align === "left" ? "text-left" : "text-center"
    return (
      <div className={`flex flex-col ${containerAlign} justify-center py-1.5 sm:py-2 md:py-2.5 leading-tight group/item transition-all duration-200 hover:scale-[1.02]`}>
        <p className={`text-[#5A1422] text-xs sm:text-sm md:text-base font-semibold ${textAlign} group-hover/item:text-[#821D30] transition-colors duration-200`}>
          {member.Name}
        </p>
        {showRole && member.RoleTitle && (
          <p className={`text-[#5A1422] text-[9px] sm:text-[10px] md:text-xs font-medium mt-0.5 leading-snug ${textAlign} tracking-wider uppercase`}>
            {member.RoleTitle}
          </p>
        )}
      </div>
    )
  }

  // Helper component for two-column layout wrapper
  const TwoColumnLayout = ({ 
    children, 
    leftTitle, 
    rightTitle,
    singleTitle,
    centerContent = false 
  }: { 
    children: React.ReactNode
    leftTitle?: string
    rightTitle?: string
    singleTitle?: string
    centerContent?: boolean
  }) => {
    if (singleTitle) {
      return (
        <div className="mb-4 sm:mb-5 md:mb-7 lg:mb-9">
          <SectionTitle>{singleTitle}</SectionTitle>
          <div className={`grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-2 sm:gap-x-3 md:gap-x-4 gap-y-1 sm:gap-y-1.5 md:gap-y-2 ${centerContent ? 'max-w-2xl mx-auto' : ''}`}>
            {children}
          </div>
        </div>
      )
    }

    return (
      <div className="mb-4 sm:mb-5 md:mb-7 lg:mb-9">
        <div className="grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-2 sm:gap-x-3 md:gap-x-4 mb-2 sm:mb-2.5 md:mb-4">
          {leftTitle && (
            <SectionTitle align="right" className="pr-2 sm:pr-3 md:pr-5">{leftTitle}</SectionTitle>
          )}
          {rightTitle && (
            <SectionTitle align="left" className="pl-2 sm:pl-3 md:pl-5">{rightTitle}</SectionTitle>
          )}
        </div>
        <div className={`grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-2 sm:gap-x-3 md:gap-x-4 gap-y-1 sm:gap-y-1.5 md:gap-y-2 ${centerContent ? 'max-w-2xl mx-auto' : ''}`}>
          {children}
        </div>
      </div>
    )
  }

  return (
    <section
      id="entourage"
      className="relative min-h-screen py-8 sm:py-10 md:py-14 lg:py-16 xl:py-20 overflow-hidden"
      style={{
        backgroundImage: 'url(/gallery/maroon-white-gradient-noisy-grain-background.avif)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Flower decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Top right corner decoration */}
        <div className="absolute -top-10 -right-6 sm:-top-14 sm:-right-8 md:-top-16 md:-right-10 z-0">
          <Image
            src="/decoration/top-right-corner-flower.png"
            alt=""
            width={280}
            height={280}
            className="w-48 sm:w-60 md:w-72 lg:w-80 xl:w-96 h-auto opacity-80"
            priority={false}
          />
        </div>
        {/* Top left corner decoration - mirrored */}
        <div className="absolute -top-10 -left-6 sm:-top-14 sm:-left-8 md:-top-16 md:-left-10 z-0">
          <Image
            src="/decoration/top-right-corner-flower.png"
            alt=""
            width={280}
            height={280}
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

      {/* Header with enhanced decorations */}
      <div className="relative z-10 px-3 sm:px-4 text-center mb-6 sm:mb-8 md:mb-12">
        {/* Decorative element above title */}
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <div className="w-8 sm:w-12 md:w-16 h-px bg-white/40" />
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          <div className="w-8 sm:w-12 md:w-16 h-px bg-white/40" />
        </div>
        
        <h2 className="imperial-script-regular mb-2 sm:mb-3 md:mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-white drop-shadow-lg">
          Wilmar - Kate<br /><span className="font-playfair font-bold uppercase tracking-wider">Nuptials:</span>
        </h2>
        
        {/* Decorative element below subtitle */}
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
        </div>
      </div>

      {/* Central Card Container */}
      <div className="relative z-10 px-2 sm:px-4">
        <div className="flex justify-center">
          <div className="max-w-4xl w-full">
            <div className="relative">
              {/* Layered glow effects */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#B08981]/20 via-[#EFBFBB]/15 to-[#B08981]/20 rounded-3xl blur-2xl opacity-40 animate-pulse" />
              <div className="absolute -inset-3 bg-gradient-to-r from-[#B08981]/30 via-[#EFBFBB]/20 to-[#B08981]/30 rounded-3xl blur-md opacity-50 animate-pulse" />

              {/* Corner accents */}
              <div className="absolute -top-2 -left-2 w-5 h-5 bg-gradient-to-br from-[#B08981] via-[#EFBFBB] to-[#FFE5E4] rounded-full blur-sm opacity-70 shadow-lg" />
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-bl from-[#B08981] via-[#EFBFBB] to-[#FFE5E4] rounded-full blur-sm opacity-70 shadow-lg" />
              <div className="absolute -bottom-2 -left-2 w-5 h-5 bg-gradient-to-tr from-[#B08981] via-[#EFBFBB] to-[#FFE5E4] rounded-full blur-sm opacity-70 shadow-lg" />
              <div className="absolute -bottom-2 -right-2 w-5 h-5 bg-gradient-to-tl from-[#B08981] via-[#EFBFBB] to-[#FFE5E4] rounded-full blur-sm opacity-70 shadow-lg" />

              {/* Main card */}
              <div className="relative bg-gradient-to-br from-[#FFE5E4] via-[#EFBFBB]/25 to-[#FFE5E4] backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 border-2 border-[#B08981]/50 shadow-[0_8px_32px_rgba(102,105,86,0.25),0_0_0_1px_rgba(176,137,129,0.15)]">
                <div className="absolute inset-1 sm:inset-2 border border-[#B08981]/40 rounded-xl sm:rounded-2xl" />
                <div className="absolute inset-2 sm:inset-3 bg-gradient-to-br from-[#EFBFBB]/15 to-transparent rounded-xl sm:rounded-2xl" />

                {/* Card content */}
                <div className="relative p-1 sm:p-2 md:p-3 lg:p-4 z-10">
            {isLoading ? (
              <div className="flex items-center justify-center py-16 sm:py-20 md:py-24">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 animate-spin text-[#5A1422]" />
                  <span className="text-[#5A1422]/70 text-sm sm:text-base">Loading entourage...</span>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-16 sm:py-20 md:py-24">
                <div className="text-center">
                  <p className="text-red-600 text-sm sm:text-base mb-2">{error}</p>
                  <button
                    onClick={fetchEntourage}
                    className="text-[#5A1422] hover:text-[#821D30] text-sm underline transition-colors duration-200"
                  >
                    Try again
                  </button>
                </div>
              </div>
            ) : entourage.length === 0 ? (
              <div className="text-center py-16 sm:py-20 md:py-24">
                <Users className="h-12 w-12 sm:h-14 sm:w-14 text-[#EAD4D9]/30 mx-auto mb-3" />
                <p className="text-[#5A1422]/60 text-sm sm:text-base">No entourage members yet</p>
              </div>
            ) : (
            <>
              {ROLE_CATEGORY_ORDER.map((category, categoryIndex) => {
                const members = grouped[category] || []
                
                if (members.length === 0) return null

                // Special handling for The Couple - display Bride and Groom side by side
                if (category === "The Couple") {
                   const groom = members.find(m => m.RoleTitle?.toLowerCase().includes('groom'))
                  const bride = members.find(m => m.RoleTitle?.toLowerCase().includes('bride'))
                  
                  return (
                    <div key={category}>
                      {categoryIndex > 0 && (
                        <div className="flex justify-center py-2 sm:py-2.5 md:py-3 mb-3 sm:mb-4 md:mb-6">
                          <div className="flex items-center gap-1.5 w-full max-w-md">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#EAD4D9]/50 to-[#EAD4D9]"></div>
                            <div className="w-1 h-1 bg-[#EAD4D9] rounded-full"></div>
                            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#EAD4D9]/50 to-[#EAD4D9]"></div>
                          </div>
                        </div>
                      )}
                      <TwoColumnLayout singleTitle="The Couple" centerContent={true}>
                        <div className="px-2 sm:px-3 md:px-5">
                          {groom && <NameItem member={groom} align="right" />}
                        </div>
                        <div className="px-2 sm:px-3 md:px-5">
                          {bride && <NameItem member={bride} align="left" />}
                        </div>
                      </TwoColumnLayout>
                    </div>
                  )
                }

                // Special handling for Parents sections - combine into single two-column layout
                if (category === "Parents of the Bride" || category === "Parents of the Groom") {
                  // Get both parent groups
                  const parentsBride = grouped["Parents of the Bride"] || []
                  const parentsGroom = grouped["Parents of the Groom"] || []
                  
                  // Helper function to sort parents: father first, then mother
                  const sortParents = (members: EntourageMember[]) => {
                    return [...members].sort((a, b) => {
                      const aIsFather = a.RoleTitle?.toLowerCase().includes('father') ?? false
                      const bIsFather = b.RoleTitle?.toLowerCase().includes('father') ?? false
                      
                      // Father comes first
                      if (aIsFather && !bIsFather) return -1
                      if (!aIsFather && bIsFather) return 1
                      return 0
                    })
                  }
                  
                  // Only render once (when processing "Parents of the Groom")
                  if (category === "Parents of the Groom") {
                    return (
                      <div key="Parents">
                        {categoryIndex > 0 && (
                          <div className="flex justify-center py-2 sm:py-2.5 md:py-3 mb-3 sm:mb-4 md:mb-6">
                            <div className="flex items-center gap-1.5 w-full max-w-md">
                              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#CCB595]/50 to-[#CCB595]"></div>
                              <div className="w-1 h-1 bg-[#CCB595] rounded-full"></div>
                              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#CCB595]/50 to-[#CCB595]"></div>
                            </div>
                          </div>
                        )}
                        <TwoColumnLayout leftTitle="Parents of the Groom" rightTitle="Parents of the Bride">
                          {(() => {
                            const leftArr = sortParents(parentsGroom)
                            const rightArr = sortParents(parentsBride)
                            const maxLen = Math.max(leftArr.length, rightArr.length)
                            const rows = []
                            for (let i = 0; i < maxLen; i++) {
                              const left = leftArr[i]
                              const right = rightArr[i]
                              rows.push(
                                <React.Fragment key={`parents-row-${i}`}>
                                  <div key={`parent-groom-${i}`} className="px-2 sm:px-3 md:px-5">
                                    {left ? <NameItem member={left} align="right" /> : <div className="py-1 sm:py-1.5" />}
                                  </div>
                                  <div key={`parent-bride-${i}`} className="px-2 sm:px-3 md:px-5">
                                    {right ? <NameItem member={right} align="left" /> : <div className="py-1 sm:py-1.5" />}
                                  </div>
                                </React.Fragment>
                              )
                            }
                            return rows
                          })()}
                        </TwoColumnLayout>
                      </div>
                    )
                  }
                  // Skip rendering for "Parents of the Bride" since it's already rendered above
                  return null
                }

                // Special handling for Maid/Matron of Honor and Best Man - combine into single two-column layout
                if (category === "Maid/Matron of Honor" || category === "Best Man") {
                  // Get both honor attendant groups
                  const maidOfHonor = grouped["Maid/Matron of Honor"] || []
                  const bestMan = grouped["Best Man"] || []
                  
                  // Only render once (when processing "Best Man")
                  if (category === "Best Man") {
                    return (
                      <div key="HonorAttendants">
                        {categoryIndex > 0 && (
                          <div className="flex justify-center py-2 sm:py-2.5 md:py-3 mb-3 sm:mb-4 md:mb-6">
                            <div className="flex items-center gap-1.5 w-full max-w-md">
                              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#CCB595]/50 to-[#CCB595]"></div>
                              <div className="w-1 h-1 bg-[#CCB595] rounded-full"></div>
                              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#CCB595]/50 to-[#CCB595]"></div>
                            </div>
                          </div>
                        )}
                        <TwoColumnLayout leftTitle="Best Man" rightTitle="Maid/Matron of Honor">
                          {(() => {
                            const maxLen = Math.max(bestMan.length, maidOfHonor.length)
                            const rows = []
                            for (let i = 0; i < maxLen; i++) {
                              const left = bestMan[i]
                              const right = maidOfHonor[i]
                              rows.push(
                                <React.Fragment key={`honor-row-${i}`}>
                                  <div key={`bestman-cell-${i}`} className="px-2 sm:px-3 md:px-5">
                                    {left ? <NameItem member={left} align="right" /> : <div className="py-1 sm:py-1.5" />}
                                  </div>
                                  <div key={`maid-cell-${i}`} className="px-2 sm:px-3 md:px-5">
                                    {right ? <NameItem member={right} align="left" /> : <div className="py-1 sm:py-1.5" />}
                                  </div>
                                </React.Fragment>
                              )
                            }
                            return rows
                          })()}
                        </TwoColumnLayout>
                      </div>
                    )
                  }
                  // Skip rendering for "Maid/Matron of Honor" since it's already rendered above
                  return null
                }

                // Special handling for Bridesmaids and Groomsmen - combine into single two-column layout
                if (category === "Bridesmaids" || category === "Groomsmen") {
                  // Get both bridal party groups
                  const bridesmaids = grouped["Bridesmaids"] || []
                  const groomsmen = grouped["Groomsmen"] || []
                  
                  // Only render once (when processing "Bridesmaids")
                  if (category === "Bridesmaids") {
                    return (
                      <div key="BridalParty">
                        {categoryIndex > 0 && (
                          <div className="flex justify-center py-2 sm:py-2.5 md:py-3 mb-3 sm:mb-4 md:mb-6">
                            <div className="flex items-center gap-1.5 w-full max-w-md">
                              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#CCB595]/50 to-[#CCB595]"></div>
                              <div className="w-1 h-1 bg-[#CCB595] rounded-full"></div>
                              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#CCB595]/50 to-[#CCB595]"></div>
                            </div>
                          </div>
                        )}
                        <TwoColumnLayout leftTitle="Groomsmen" rightTitle="Bridesmaids">
                          {(() => {
                            const maxLen = Math.max(bridesmaids.length, groomsmen.length)
                            const rows = []
                            for (let i = 0; i < maxLen; i++) {
                              const groomsman = groomsmen[i]
                              const bridesmaid = bridesmaids[i]
                              rows.push(
                                <React.Fragment key={`bridal-row-${i}`}>
                                  <div key={`groomsman-cell-${i}`} className="px-2 sm:px-3 md:px-5">
                                    {groomsman ? <NameItem member={groomsman} align="right" /> : <div className="py-1 sm:py-1.5" />}
                                  </div>
                                  <div key={`bridesmaid-cell-${i}`} className="px-2 sm:px-3 md:px-5">
                                    {bridesmaid ? <NameItem member={bridesmaid} align="left" /> : <div className="py-1 sm:py-1.5" />}
                                  </div>
                                </React.Fragment>
                              )
                            }
                            return rows
                          })()}
                        </TwoColumnLayout>
                      </div>
                    )
                  }
                  // Skip rendering for "Groomsmen" since it's already rendered above
                  return null
                }

                // Special handling for Candle/Veil Sponsors sections - combine into single two-column layout
                if (category === "Candle Sponsors" || category === "Veil Sponsors") {
                  // Get both sponsor groups
                  const candleSponsors = grouped["Candle Sponsors"] || []
                  const veilSponsors = grouped["Veil Sponsors"] || []
                  
                  // Only render once (when processing "Candle Sponsors")
                  if (category === "Candle Sponsors") {
                    return (
                      <div key="Sponsors">
                        {categoryIndex > 0 && (
                          <div className="flex justify-center py-2 sm:py-2.5 md:py-3 mb-3 sm:mb-4 md:mb-6">
                            <div className="flex items-center gap-1.5 w-full max-w-md">
                              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#CCB595]/50 to-[#CCB595]"></div>
                              <div className="w-1 h-1 bg-[#CCB595] rounded-full"></div>
                              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#CCB595]/50 to-[#CCB595]"></div>
                            </div>
                          </div>
                        )}
                        <TwoColumnLayout leftTitle="Candle Sponsors" rightTitle="Veil Sponsors">
                          {(() => {
                            const maxLen = Math.max(candleSponsors.length, veilSponsors.length)
                            const rows = []
                            for (let i = 0; i < maxLen; i++) {
                              const left = candleSponsors[i]
                              const right = veilSponsors[i]
                              rows.push(
                                <React.Fragment key={`sponsors-row-${i}`}>
                                  <div key={`candle-cell-${i}`} className="px-2 sm:px-3 md:px-5">
                                    {left ? <NameItem member={left} align="right" /> : <div className="py-1 sm:py-1.5" />}
                                  </div>
                                  <div key={`veil-cell-${i}`} className="px-2 sm:px-3 md:px-5">
                                    {right ? <NameItem member={right} align="left" /> : <div className="py-1 sm:py-1.5" />}
                                  </div>
                                </React.Fragment>
                              )
                            }
                            return rows
                          })()}
                        </TwoColumnLayout>
                      </div>
                    )
                  }
                  // Skip rendering for "Veil Sponsors" since it's already rendered above
                  return null
                }

                // Default: single title, centered content
                return (
                  <div key={category}>
                    {categoryIndex > 0 && (
                      <div className="flex justify-center py-2 sm:py-2.5 md:py-3 mb-3 sm:mb-4 md:mb-6">
                        <div className="flex items-center gap-1.5 w-full max-w-md">
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#CCB595]/50 to-[#CCB595]"></div>
                          <div className="w-1 h-1 bg-[#CCB595] rounded-full"></div>
                          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#CCB595]/50 to-[#CCB595]"></div>
                        </div>
                      </div>
                    )}
                    <TwoColumnLayout singleTitle={category} centerContent={true}>
                      {(() => {
                        const SINGLE_COLUMN_SECTIONS = new Set([
                          "Best Man",
                          "Maid/Matron of Honor",
                          "Ring Bearer",
                          "Coin Bearer",
                          "Bible Bearer",
                          "Presider",
                        ])
                        // Special rule: Cord Sponsors with exactly 2 names should be displayed as two columns meeting at center
                        if (category === "Cord Sponsors" && members.length === 2) {
                          const left = members[0]
                          const right = members[1]
                          return (
                            <>
                              <div className="px-2 sm:px-3 md:px-5">
                                <NameItem member={left} align="right" />
                              </div>
                              <div className="px-2 sm:px-3 md:px-5">
                                <NameItem member={right} align="left" />
                              </div>
                            </>
                          )
                        }
                        if (SINGLE_COLUMN_SECTIONS.has(category) || members.length <= 2) {
                          return (
                            <div className="col-span-full">
                              <div className="max-w-sm mx-auto flex flex-col items-center gap-1.5 sm:gap-2">
                                {members.map((member, idx) => (
                                  <NameItem key={`${category}-${idx}-${member.Name}`} member={member} align="center" />
                                ))}
                              </div>
                            </div>
                          )
                        }
                        // Default two-column sections: render row-by-row pairs to keep alignment on small screens
                        const half = Math.ceil(members.length / 2)
                        const left = members.slice(0, half)
                        const right = members.slice(half)
                        const maxLen = Math.max(left.length, right.length)
                        const rows = []
                        for (let i = 0; i < maxLen; i++) {
                          const l = left[i]
                          const r = right[i]
                          rows.push(
                            <React.Fragment key={`${category}-row-${i}`}>
                              <div key={`${category}-cell-left-${i}`} className="px-2 sm:px-3 md:px-5">
                                {l ? <NameItem member={l} align="right" /> : <div className="py-1 sm:py-1.5" />}
                              </div>
                              <div key={`${category}-cell-right-${i}`} className="px-2 sm:px-3 md:px-5">
                                {r ? <NameItem member={r} align="left" /> : <div className="py-1 sm:py-1.5" />}
                              </div>
                            </React.Fragment>
                          )
                        }
                        return rows
                      })()}
                    </TwoColumnLayout>
                  </div>
                )
              })}
              
              {/* Display any other categories not in the ordered list */}
              {Object.keys(grouped).filter(cat => !ROLE_CATEGORY_ORDER.includes(cat)).map((category) => {
                const members = grouped[category]
                return (
                  <div key={category}>
                    <div className="flex justify-center py-2 sm:py-2.5 md:py-3 mb-3 sm:mb-4 md:mb-6">
                      <div className="flex items-center gap-1.5 w-full max-w-md">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#CCB595]/50 to-[#CCB595]"></div>
                        <div className="w-1 h-1 bg-[#CCB595] rounded-full"></div>
                        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#CCB595]/50 to-[#CCB595]"></div>
                      </div>
                    </div>
                    <TwoColumnLayout singleTitle={category} centerContent={true}>
                      {(() => {
                        if (members.length <= 2) {
                          return (
                            <div className="col-span-full">
                              <div className="max-w-sm mx-auto flex flex-col items-center gap-1.5 sm:gap-2">
                                {members.map((member, idx) => (
                                  <NameItem key={`${category}-${idx}-${member.Name}`} member={member} align="center" />
                                ))}
                              </div>
                            </div>
                          )
                        }
                        // Pair row-by-row for other categories as well
                        const half = Math.ceil(members.length / 2)
                        const left = members.slice(0, half)
                        const right = members.slice(half)
                        const maxLen = Math.max(left.length, right.length)
                        const rows = []
                        for (let i = 0; i < maxLen; i++) {
                          const l = left[i]
                          const r = right[i]
                          rows.push(
                            <React.Fragment key={`${category}-row-${i}`}>
                              <div key={`${category}-cell-left-${i}`} className="px-2 sm:px-3 md:px-5">
                                {l ? <NameItem member={l} align="right" /> : <div className="py-1 sm:py-1.5" />}
                              </div>
                              <div key={`${category}-cell-right-${i}`} className="px-2 sm:px-3 md:px-5">
                                {r ? <NameItem member={r} align="left" /> : <div className="py-1 sm:py-1.5" />}
                              </div>
                            </React.Fragment>
                          )
                        }
                        return rows
                      })()}
                    </TwoColumnLayout>
                  </div>
                )
              })}
            </>
            )}
                </div>

                {/* Sparkle accents */}
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-2 h-2 sm:w-3 sm:h-3 bg-[#EFBFBB] rounded-full animate-ping opacity-80 shadow-lg" />
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#B08981] rounded-full animate-pulse opacity-70 shadow-md" />
                <div className="absolute top-1/2 left-1 sm:left-2 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#FFE5E4] rounded-full animate-pulse opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
