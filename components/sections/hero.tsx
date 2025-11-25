"use client"

import { useEffect, useState, useMemo } from "react"
import { siteConfig } from "@/content/site"
// Decorative icons removed for a cleaner, more formal presentation

const desktopImages = [
    "/desktop-background/couple (1).jpg",
    "/desktop-background/couple (2).jpg",
    "/desktop-background/couple (3).jpg",
    "/desktop-background/couple (4).jpg",
    "/desktop-background/couple (5).jpg",
    "/desktop-background/couple (6).jpg",
    "/desktop-background/couple (7).jpg",
    "/desktop-background/couple (8).jpg",
    "/desktop-background/couple (9).jpg",
    "/desktop-background/couple (10).jpg",
    "/desktop-background/couple (11).jpg",
    "/desktop-background/couple (12).jpg",
    "/desktop-background/couple (13).jpg",
    "/desktop-background/couple (14).jpg",
    "/desktop-background/couple (15).jpg",
    "/desktop-background/couple (16).jpg",
    "/desktop-background/couple (17).jpg",
    "/desktop-background/couple (18).jpg",
    "/desktop-background/couple (19).jpg",
    "/desktop-background/couple (20).jpg",
    "/desktop-background/couple (21).jpg",
    "/desktop-background/couple (22).jpg",
    "/desktop-background/couple (23).jpg",
    "/desktop-background/couple (24).jpg",
    "/desktop-background/couple (25).jpg",
    "/desktop-background/couple (26).jpg",
    "/desktop-background/couple (27).jpg",
    "/desktop-background/couple (28).jpg",
    "/desktop-background/couple (29).jpg",
    "/desktop-background/couple (30).jpg",
    "/desktop-background/couple (31).jpg",
    "/desktop-background/couple (32).jpg",
    "/desktop-background/couple (33).jpg",
    "/desktop-background/couple (34).jpg",
    "/desktop-background/couple (35).jpg",
    "/desktop-background/couple (36).jpg",
    "/desktop-background/couple (37).jpg",
    "/desktop-background/couple (38).jpg",
    "/desktop-background/couple (39).jpg",
    "/desktop-background/couple (40).jpg",
    "/desktop-background/couple (41).jpg",
    "/desktop-background/couple (42).jpg",
    "/desktop-background/couple (43).jpg",
    "/desktop-background/couple (44).jpg",
    "/desktop-background/couple (45).jpg",
    "/desktop-background/couple (46).jpg",
    "/desktop-background/couple (47).jpg",
    "/desktop-background/couple (48).jpg",
    "/desktop-background/couple (49).jpg",
    "/desktop-background/couple (50).jpg",
    "/desktop-background/couple (51).jpg",
    "/desktop-background/couple (52).jpg",
    "/desktop-background/couple (53).jpg",
    "/desktop-background/couple (54).jpg",
    "/desktop-background/couple (55).jpg",
    "/desktop-background/couple (56).jpg",
    "/desktop-background/couple (57).jpg",
    "/desktop-background/couple (58).jpg",
    "/desktop-background/couple (59).jpg",
    "/desktop-background/couple (60).jpg",
    "/desktop-background/couple (61).jpg",
    "/desktop-background/couple (62).jpg",
    "/desktop-background/couple (63).jpg",
    "/desktop-background/couple (64).jpg",
    "/desktop-background/couple (65).jpg",
    "/desktop-background/couple (66).jpg",
    "/desktop-background/couple (67).jpg",
    "/desktop-background/couple (68).jpg",
    "/desktop-background/couple (69).jpg",
    "/desktop-background/couple (70).jpg",
    "/desktop-background/couple (71).jpg",
    "/desktop-background/couple (72).jpg",
    "/desktop-background/couple (73).jpg",
    "/desktop-background/couple (74).jpg",
    "/desktop-background/couple (75).jpg",
    "/desktop-background/couple (76).jpg",
    "/desktop-background/couple (77).jpg",
    "/desktop-background/couple (78).jpg",
    "/desktop-background/couple (79).jpg",

]

const mobileImages = [
    "/mobile-background/couple (1).jpg",
    "/mobile-background/couple (2).jpg",
    "/mobile-background/couple (3).jpg",
    "/mobile-background/couple (4).jpg",
    "/mobile-background/couple (5).jpg",
    "/mobile-background/couple (6).jpg",
    "/mobile-background/couple (7).jpg",
    "/mobile-background/couple (8).jpg",
    "/mobile-background/couple (9).jpg",
    "/mobile-background/couple (10).jpg",
    "/mobile-background/couple (11).jpg",
    "/mobile-background/couple (12).jpg",
    "/mobile-background/couple (13).jpg",
    "/mobile-background/couple (14).jpg",
    "/mobile-background/couple (15).jpg",
    "/mobile-background/couple (16).jpg",
    "/mobile-background/couple (17).jpg",
    "/mobile-background/couple (18).jpg",
    "/mobile-background/couple (19).jpg",
    "/mobile-background/couple (20).jpg",
    "/mobile-background/couple (21).jpg",
    "/mobile-background/couple (22).jpg",
    "/mobile-background/couple (23).jpg",
    "/mobile-background/couple (24).jpg",
    "/mobile-background/couple (25).jpg",
    "/mobile-background/couple (26).jpg",
    "/mobile-background/couple (27).jpg",
    "/mobile-background/couple (28).jpg",
    "/mobile-background/couple (29).jpg",
    "/mobile-background/couple (30).jpg",
    "/mobile-background/couple (31).jpg",
    "/mobile-background/couple (32).jpg",
    "/mobile-background/couple (33).jpg",
    "/mobile-background/couple (34).jpg",
    "/mobile-background/couple (35).jpg",
    "/mobile-background/couple (36).jpg",
    "/mobile-background/couple (37).jpg",
    "/mobile-background/couple (38).jpg",
    "/mobile-background/couple (39).jpg",
    "/mobile-background/couple (40).jpg",
]

const softTextShadow = "0 2px 4px rgba(0, 0, 0, 0.9), 0 4px 8px rgba(0, 0, 0, 0.7), 0 8px 16px rgba(0, 0, 0, 0.5), 0 12px 24px rgba(0, 0, 0, 0.3)"

export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect screen size and update isMobile state
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }
    
    // Check on mount
    checkScreenSize()
    
    // Listen for resize events
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Get the appropriate image array based on screen size
  const backgroundImages = useMemo(() => {
    return isMobile ? mobileImages : desktopImages
  }, [isMobile])

  // Preload images progressively - show first image immediately
  useEffect(() => {
    setImagesLoaded(false)
    setCurrentImageIndex(0)
    
    // Load first image with priority to show it immediately
    const firstImg = new Image()
    firstImg.src = backgroundImages[0]
    firstImg.onload = () => {
      setImagesLoaded(true) // Show first image immediately
    }
    
    // Then preload a small lookahead set in background (avoid preloading all)
    setTimeout(() => {
      if (typeof navigator !== 'undefined' && (navigator as any).connection?.saveData) return
      backgroundImages.slice(1, 3).forEach((src) => {
        const img = new Image()
        img.decoding = 'async'
        img.loading = 'lazy' as any
        img.src = src
      })
    }, 200)
  }, [backgroundImages])

  useEffect(() => {
    if (!imagesLoaded) return
    
    const imageTimer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length)
    }, 5000)
    return () => clearInterval(imageTimer)
  }, [imagesLoaded, backgroundImages])

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (imagesLoaded) {
      setIsVisible(true)
    }
  }, [imagesLoaded])

  const invitationLine = `Together with our families, we warmly invite you\nto witness and celebrate our union`

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #821D30 0%, #821D30 50%, #B88A93 100%)",
      }}
    >
      <div className="absolute inset-0 w-full h-full">
        {imagesLoaded && backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url('${image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              willChange: "opacity",
            }}
          />
        ))}
        {/* Enhanced gradient overlay with better depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#821D30]/90 via-[#821D30]/50 via-[#B88A93]/30 to-transparent z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#821D30]/30 z-0" />
      </div>

      <div className="relative z-10 w-full container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex flex-col items-center justify-center min-h-screen py-20 sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 sm:inset-x-6 md:inset-x-10 lg:inset-x-16 top-1/4 bottom-1/4 mx-auto max-w-4xl rounded-[42px] bg-gradient-to-b from-[#EAD4D9]/50 via-[#EAD4D9]/40 to-[#B88A93]/10 opacity-80 blur-[35px] drop-shadow-[0_20px_40px_rgba(130,29,48,0.3)]"
        />
        <div className={`relative z-10 w-full max-w-3xl text-center space-y-3 sm:space-y-4 md:space-y-5 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Warm invitation line */}
          <div className="space-y-2 mb-3 sm:mb-4">
            <p
              className="font-sans text-base sm:text-lg md:text-xl lg:text-2xl font-normal text-white tracking-normal text-balance whitespace-pre-line leading-relaxed"
              style={{ 
                fontFamily: 'Arial, sans-serif',
                textShadow: softTextShadow 
              }}
            >
              {invitationLine}
            </p>
            {/* Subtle divider */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 py-1">
              <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent via-[#EAD4D9]/60 to-[#EAD4D9]" />
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#EAD4D9]/80 shadow-[0_0_10px_rgba(234,212,217,0.7)]" />
              <div className="h-px w-12 sm:w-16 bg-gradient-to-l from-transparent via-[#EAD4D9]/60 to-[#EAD4D9]" />
            </div>
          </div>

          {/* Couple names */}
          <div className="space-y-2 sm:space-y-3">
            <h1
              className="alex-brush-regular text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-normal tracking-wide drop-shadow-2xl leading-tight"
              style={{
                color: '#FFFFFF',
                textShadow: "0 0 15px rgba(255, 255, 255, 0.9), 0 0 30px rgba(255, 255, 255, 0.7), 0 0 45px rgba(255, 255, 255, 0.5), 0 4px 12px rgba(0, 0, 0, 0.4)",
              }}
            >
              <span className="inline-block transform transition-all duration-700 hover:scale-105">
                {siteConfig.couple.groomNickname}
              </span>
              <span className="mx-2 sm:mx-3 md:mx-4">&</span>
              <span className="inline-block transform transition-all duration-700 hover:scale-105">
                {siteConfig.couple.brideNickname}
              </span>
            </h1>
            {/* Elegant divider */}
            <div className="h-px w-16 sm:w-20 md:w-24 lg:w-32 mx-auto bg-gradient-to-r from-transparent via-[#EAD4D9] to-transparent shadow-[0_0_12px_rgba(234,212,217,0.5)]" />
          </div>

          {/* Tagline with improved typography */}
          <div className="space-y-2 sm:space-y-3 pt-2 sm:pt-3">
            <p
              className="alex-brush-regular text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-[#FFFFFF] tracking-wide"
              style={{ textShadow: softTextShadow }}
            >
              {siteConfig.wedding.tagline}
            </p>

            {/* Date and time information */}
            <div className="space-y-1.5 sm:space-y-2 pt-2">
              <p
                className="text-xs sm:text-sm md:text-base lg:text-lg font-light text-[#FFFFFF] tracking-wide"
                style={{ textShadow: softTextShadow }}
              >
                {siteConfig.ceremony.day} • {siteConfig.ceremony.date} • {siteConfig.ceremony.time}
              </p>
              <p
                className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-[#FFFFFF]/95 tracking-wide"
                style={{ textShadow: softTextShadow }}
              >
                {siteConfig.wedding.venue}
              </p>
            </div>
          </div>

            {/* CTA Buttons - Elegant and compact */}
            <div className="pt-4 sm:pt-6 md:pt-8 flex flex-row gap-3 sm:gap-4 justify-center items-center">
            <a
                href="#messages"
              className="group px-6 sm:px-8 md:px-10 py-2 sm:py-2.5 md:py-3 rounded-lg font-semibold transition-all duration-500 ease-out uppercase tracking-wider text-xs sm:text-sm whitespace-nowrap relative overflow-hidden border-2 backdrop-blur-sm"
              style={{
                backgroundColor: "rgba(130, 29, 48, 0.9)",
                borderColor: "rgba(234, 212, 217, 0.6)",
                color: "#FFFFFF",
                boxShadow: "0 4px 16px rgba(130, 29, 48, 0.4), 0 2px 6px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#821D30";
                e.currentTarget.style.borderColor = "rgba(234, 212, 217, 0.9)";
                e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(130, 29, 48, 0.5), 0 4px 12px rgba(0,0,0,0.3), 0 0 16px rgba(234, 212, 217, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(130, 29, 48, 0.9)";
                e.currentTarget.style.borderColor = "rgba(234, 212, 217, 0.6)";
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(130, 29, 48, 0.4), 0 2px 6px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)";
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(0.98)";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
              }}
            >
              <span className="relative z-10 flex items-center justify-center">
                Message
              </span>
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFFFFF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 transform -skew-x-12 -translate-x-full group-hover:translate-x-full"
              />
            </a>
            <a
              href="#guest-list"
              className="group px-6 sm:px-8 md:px-10 py-2 sm:py-2.5 md:py-3 rounded-lg font-semibold transition-all duration-500 ease-out uppercase tracking-wider text-xs sm:text-sm whitespace-nowrap relative overflow-hidden border-2 backdrop-blur-sm"
              style={{
                backgroundColor: "rgba(234, 212, 217, 0.95)",
                borderColor: "rgba(130, 29, 48, 0.6)",
                color: "#821D30",
                boxShadow: "0 4px 16px rgba(234, 212, 217, 0.4), 0 2px 6px rgba(0,0,0,0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#EAD4D9";
                e.currentTarget.style.borderColor = "rgba(130, 29, 48, 0.9)";
                e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(234, 212, 217, 0.5), 0 4px 12px rgba(0,0,0,0.3), 0 0 16px rgba(255, 255, 255, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(234, 212, 217, 0.95)";
                e.currentTarget.style.borderColor = "rgba(130, 29, 48, 0.6)";
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(234, 212, 217, 0.4), 0 2px 6px rgba(0,0,0,0.2)";
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(0.98)";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
              }}
            >
              <span className="relative z-10 flex items-center justify-center">
                RSVP
              </span>
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#821D30]/15 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 transform -skew-x-12 -translate-x-full group-hover:translate-x-full"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
