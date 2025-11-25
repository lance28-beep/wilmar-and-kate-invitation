"use client"

import { Section } from "@/components/section"
import { Heart, ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export function Registry() {
  const [showQRCode, setShowQRCode] = useState(false)
  
  return (
    <Section id="registry" className="relative bg-transparent py-8 sm:py-10 md:py-14 lg:py-16 xl:py-20 overflow-hidden">

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
          Gift Registry
        </h2>
        
        <p className="mx-auto max-w-xl text-xs sm:text-sm md:text-base lg:text-lg font-light leading-relaxed text-white/90 px-2">
          Your presence is the greatest gift
        </p>
        
        {/* Decorative element below subtitle */}
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-3 sm:px-4 md:px-6">
        {/* Enhanced card with gradient glow */}
        <div className="relative bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden border border-[#B88A93]/40 shadow-2xl hover:shadow-[0_10px_50px_rgba(131,146,125,0.3)] transition-all duration-300 group">
          {/* Subtle glow on hover */}
          <div className="absolute -inset-0.5 bg-gradient-to-br from-[#B88A93]/20 to-[#821D30]/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          
          {/* Decorative corner accents - compact */}
          <div className="absolute top-0.5 left-0.5 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-[#B88A93]/50 rounded-tl-lg" />
          <div className="absolute top-0.5 right-0.5 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-r-2 border-[#B88A93]/50 rounded-tr-lg" />
          <div className="absolute bottom-0.5 left-0.5 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-l-2 border-[#B88A93]/50 rounded-bl-lg" />
          <div className="absolute bottom-0.5 right-0.5 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-[#B88A93]/50 rounded-br-lg" />
          
          {/* Card content */}
          <div className="relative p-4 sm:p-5 md:p-7 lg:p-9 z-10">
            <div className="flex flex-col items-center space-y-3 sm:space-y-4 md:space-y-5">
              {/* Header with hearts */}
              <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#821D30] fill-current flex-shrink-0" />
                <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold uppercase text-[#5A1422] text-center tracking-[0.12em]">
                  Your Presence Is Our Gift
                </h3>
                <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#821D30] fill-current flex-shrink-0" />
              </div>
              
              {/* Main message - Poetic verse */}
              <div className="text-center space-y-1 sm:space-y-1.5 md:space-y-2 max-w-2xl px-2 sm:px-3">
                <div className="relative py-2.5 sm:py-3 md:py-4">
                  {/* Decorative top border */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 sm:w-16 md:w-24 h-px bg-gradient-to-r from-transparent via-[#B88A93]/60 to-transparent"></div>
                  
                  <div className="space-y-1 sm:space-y-1.5 md:space-y-2 font-sans">
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#5A1422] leading-relaxed">
                      With all that we have, we've been truly blessed.
                    </p>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#5A1422] leading-relaxed">
                      Your presence and prayers are all that we request.
                    </p>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#5A1422] leading-relaxed pt-1 sm:pt-1.5 md:pt-2">
                      But if you desire to give nonetheless,
                    </p>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#5A1422] leading-relaxed">
                      Monetary gift is one we suggest.
                    </p>
                  </div>
                  
                  {/* Decorative bottom border */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 sm:w-16 md:w-24 h-px bg-gradient-to-r from-transparent via-[#B88A93]/60 to-transparent"></div>
                </div>
              </div>
              
              {/* Toggle Button */}
              <button
                onClick={() => setShowQRCode(!showQRCode)}
                className="flex items-center justify-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 bg-gradient-to-r from-[#B88A93] to-[#821D30] hover:from-[#821D30] hover:to-[#B88A93] text-white rounded-lg font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl group"
                aria-label={showQRCode ? "Hide QR Code" : "Show QR Code"}
              >
                <span>{showQRCode ? "Hide" : "View"} GCash QR Code</span>
                {showQRCode ? (
                  <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-y-0.5 flex-shrink-0" />
                )}
              </button>
              
              {/* QR Code Section - Animated */}
              <div
                className={`overflow-hidden transition-all duration-700 ease-in-out ${
                  showQRCode
                    ? "max-h-[900px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="flex flex-col items-center space-y-2.5 sm:space-y-3 md:space-y-4 pt-3 sm:pt-4 md:pt-5">
                  {/* Decorative divider */}
                  <div className="flex items-center gap-1.5 w-full max-w-md">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#B88A93]/50 to-[#B88A93]"></div>
                    <div className="w-1 h-1 bg-[#B88A93] rounded-full"></div>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#B88A93]/50 to-[#B88A93]"></div>
                  </div>
                  
                  {/* GCash Label */}
                  <div className="text-center space-y-0.5">
                    <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-serif font-bold text-[#5A1422] mb-0.5">
                      GCash
                    </h4>
                    <p className="text-[10px] sm:text-xs md:text-sm text-[#5A1422]/70 font-sans">
                      Scan to send your gift
                    </p>
                  </div>
                  
                  {/* QR Code Image */}
                  <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 bg-white rounded-xl p-2 sm:p-2.5 md:p-3 lg:p-4 shadow-xl border-2 border-[#B88A93]/40 hover:border-[#B88A93]/70 transition-all duration-500 hover:shadow-2xl group/qr">
                    <div className="relative w-full h-full">
                      <Image
                        src="/QR/gcash3.png"
                        alt="GCash QR Code - Scan to send monetary gift"
                        fill
                        className="object-contain rounded-lg group-hover/qr:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, 224px"
                        priority
                      />
                    </div>
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#B88A93]/0 via-[#B88A93]/10 to-[#B88A93]/0 opacity-0 group-hover/qr:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  
                  {/* Instructions */}
                  <div className="text-center space-y-1.5 sm:space-y-2 pt-1">
                    <p className="text-[9px] sm:text-[10px] md:text-xs text-[#5A1422]/70 font-sans">
                      Open GCash app → Scan QR → Enter amount
                    </p>
                    <div className="flex items-center justify-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs md:text-sm text-[#821D30]">
                      <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 fill-current flex-shrink-0" />
                      <span className="font-sans">Thank you for your generosity</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Closing message */}
              <div className="text-center pt-0.5 sm:pt-1">
                <div className="flex items-center justify-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs md:text-sm lg:text-base text-[#B88A93] font-semibold">
                  <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-[#821D30] fill-current flex-shrink-0" />
                  <span>We look forward to celebrating with you</span>
                  <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-[#821D30] fill-current flex-shrink-0" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
