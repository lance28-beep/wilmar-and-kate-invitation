"use client"

import CircularGallery from "@/components/CircularGallery"
import { Section } from "@/components/section"
import { ChevronRight } from "lucide-react"

const galleryItems = [
  { image: "/mobile-background/couple (1).jpeg", text: "" },
  { image: "/mobile-background/couple (3).jpeg", text: "" },
  { image: "/mobile-background/couple (5).jpeg", text: "" },
  { image: "/mobile-background/couple (7).jpeg", text: "" },
  { image: "/mobile-background/couple (9).jpeg", text: "" },
  { image: "/mobile-background/couple (11).jpeg", text: "" },
  { image: "/mobile-background/couple (13).jpeg", text: "" },

]

export function Gallery() {
  return (
    <Section
      id="gallery"
      className="relative overflow-hidden bg-[#83927D] py-10 sm:py-12 md:py-16 lg:py-20"
    >
      {/* Enhanced background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradient overlays */}
        <div className="absolute top-0 left-0 h-1/2 w-full bg-gradient-to-b from-white/20 via-white/5 to-transparent" />
        <div className="absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-white/20 via-white/5 to-transparent" />
        
        {/* Floating decorative circles */}
        <div className="absolute top-12 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-24 left-16 w-24 h-24 bg-white/8 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-white/12 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-32 left-12 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        
        {/* Decorative lines */}
        <div className="absolute top-1/3 left-0 w-full h-px bg-white/20" />
        
        {/* Bottom center decoration */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center">
          <img
            src="/decoration/bottom-center-flower.png"
            alt=""
            aria-hidden="true"
            className="h-auto w-[180px] opacity-75 sm:w-[280px] md:w-[340px] lg:w-[400px]"
            loading="lazy"
            decoding="async"
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
          Our Moments
        </h2>
        
        <p className="mx-auto max-w-xl text-xs sm:text-sm md:text-base lg:text-lg font-light leading-relaxed text-white/90 px-2">
          Every moment, a treasured memory made eternal
        </p>
        
        {/* Decorative element below subtitle */}
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
        </div>
      </div>

      {/* Gallery Container - Enhanced */}
      <div className="relative z-10 px-3 sm:px-4 md:px-6 lg:px-8 mb-8 sm:mb-10 md:mb-12">
        <div className="mx-auto w-full max-w-[360px] sm:max-w-5xl">
          {/* Outer glow effect */}
          <div className="absolute -inset-2 bg-white/20 rounded-[32px] sm:rounded-[36px] blur-2xl opacity-50" />
          
          <div className="relative rounded-[24px] sm:rounded-[28px] md:rounded-[32px] border-2 border-white/20 bg-white/10 p-2 sm:p-2.5 md:p-3 shadow-[0_12px_48px_rgba(0,0,0,0.15)] backdrop-blur-xl">
            {/* Decorative corner accents */}
            <div className="absolute top-1 left-1 w-4 h-4 sm:w-5 sm:h-5 border-t-2 border-l-2 border-white/30 rounded-tl-2xl" />
            <div className="absolute top-1 right-1 w-4 h-4 sm:w-5 sm:h-5 border-t-2 border-r-2 border-white/30 rounded-tr-2xl" />
            <div className="absolute bottom-1 left-1 w-4 h-4 sm:w-5 sm:h-5 border-b-2 border-l-2 border-white/30 rounded-bl-2xl" />
            <div className="absolute bottom-1 right-1 w-4 h-4 sm:w-5 sm:h-5 border-b-2 border-r-2 border-white/30 rounded-br-2xl" />
            
            <div className="relative h-[260px] sm:h-[380px] md:h-[480px] lg:h-[560px]">
              <CircularGallery
                items={galleryItems}
                bend={3}
                textColor="#ffffff"
                borderRadius={0.05}
                scrollEase={0.02}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Button */}
      <div className="relative z-10 flex justify-center px-3 sm:px-4">
        <a
          href="/gallery"
          className="group relative inline-flex items-center gap-2 sm:gap-2.5 whitespace-nowrap rounded-xl border-2 border-[#C3A161]/40 bg-[#C5A572] px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-3.5 md:py-4 text-xs sm:text-sm md:text-base font-bold uppercase tracking-[0.15em] text-white shadow-[0_8px_32px_rgba(197,165,114,0.4)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(197,165,114,0.6)] hover:scale-[1.03] hover:border-[#C3A161]/60 active:scale-[0.98] overflow-hidden"
        >
          {/* Button shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          
          <span className="relative z-10">View Full Gallery</span>
          <ChevronRight className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" size={18} />
        </a>
      </div>
    </Section>
  )
}
