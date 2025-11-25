"use client"

import CircularGallery from "@/components/CircularGallery"
import { Section } from "@/components/section"
import { ChevronRight } from "lucide-react"
import NextImage from "next/image"

const galleryItems = [
  { image: "/mobile-background/couple (1).jpg", text: "" },
  { image: "/mobile-background/couple (2).jpg", text: "" },
  { image: "/mobile-background/couple (3).jpg", text: "" },
  { image: "/mobile-background/couple (4).jpg", text: "" },
  { image: "/mobile-background/couple (5).jpg", text: "" },
  { image: "/mobile-background/couple (6).jpg", text: "" },
  { image: "/mobile-background/couple (7).jpg", text: "" },
  { image: "/mobile-background/couple (8).jpg", text: "" },
  { image: "/mobile-background/couple (9).jpg", text: "" },
  { image: "/mobile-background/couple (10).jpg", text: "" },
  { image: "/mobile-background/couple (11).jpg", text: "" },
  { image: "/mobile-background/couple (12).jpg", text: "" },
  { image: "/mobile-background/couple (13).jpg", text: "" },
  { image: "/mobile-background/couple (14).jpg", text: "" },
  { image: "/mobile-background/couple (15).jpg", text: "" },
  { image: "/mobile-background/couple (16).jpg", text: "" },
  { image: "/mobile-background/couple (17).jpg", text: "" },
  { image: "/mobile-background/couple (18).jpg", text: "" },
  { image: "/mobile-background/couple (19).jpg", text: "" },
  { image: "/mobile-background/couple (20).jpg", text: "" },
  { image: "/mobile-background/couple (21).jpg", text: "" },
  { image: "/mobile-background/couple (22).jpg", text: "" },
  { image: "/mobile-background/couple (23).jpg", text: "" },

]

export function Gallery() {
  return (
    <Section
      id="gallery"
      className="relative overflow-hidden bg-[#5A1422] py-10 sm:py-12 md:py-16 lg:py-20"
    >
      {/* Flower decorations - bottom corners only */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Bottom left corner decoration - flipped horizontally */}
        <div className="absolute bottom-0 left-0 z-0">
          <NextImage
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
          <NextImage
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
          className="group relative inline-flex items-center gap-2 sm:gap-2.5 whitespace-nowrap rounded-xl border-2 border-[#EAD4D9]/40 bg-[#821D30] px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-3.5 md:py-4 text-xs sm:text-sm md:text-base font-bold uppercase tracking-[0.15em] text-white shadow-[0_8px_32px_rgba(130,29,48,0.4)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(130,29,48,0.6)] hover:scale-[1.03] hover:border-[#EAD4D9]/60 active:scale-[0.98] overflow-hidden"
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
