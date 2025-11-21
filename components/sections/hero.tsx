"use client"

import { useEffect, useState, useMemo } from "react"
import NextImage from "next/image"
import { siteConfig } from "@/content/site"
// Decorative icons removed for a cleaner, more formal presentation

const desktopImages = [
    "/desktop-background/couple (1).jpeg",
    "/desktop-background/couple (2).jpeg",
    "/desktop-background/couple (3).jpeg",
    "/desktop-background/couple (4).jpeg",
    "/desktop-background/couple (5).jpeg",
    "/desktop-background/couple (6).jpeg",
    "/desktop-background/couple (7).jpeg",
    "/desktop-background/couple (8).jpeg",
    "/desktop-background/couple (9).jpeg",
    "/desktop-background/couple (10).jpeg",
    "/desktop-background/couple (11).jpeg",
]

const mobileImages = [
    "/mobile-background/couple (1).jpeg",
    "/mobile-background/couple (2).jpeg",
    "/mobile-background/couple (3).jpeg",
    "/mobile-background/couple (4).jpeg",
    "/mobile-background/couple (5).jpeg",
    "/mobile-background/couple (6).jpeg",
    "/mobile-background/couple (7).jpeg",
    "/mobile-background/couple (8).jpeg",
    "/mobile-background/couple (9).jpeg",
    "/mobile-background/couple (10).jpeg",
    "/mobile-background/couple (11).jpeg",
    "/mobile-background/couple (12).jpeg",
    "/mobile-background/couple (13).jpeg",
]

const softTextShadow = "0 10px 28px rgba(7, 15, 20, 0.42), 0 3px 10px rgba(0, 0, 0, 0.4)"

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

  const invitationLine = `Together with their families, ${siteConfig.couple.groomNickname} & ${siteConfig.couple.brideNickname} request the honor of your presence.`
  const subInvitationLine =
    "Let us gather in reverence and joy as we celebrate the covenant of love God has beautifully prepared."

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #869EB6 0%, #869EB6 40%, #C1C1C1 100%)",
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#869EB6]/90 via-[#869EB6]/55 via-[#C1C1C1]/35 to-transparent z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#869EB6]/35 z-0" />
        
        {/* Bottom left corner decoration - original orientation */}
        <div className="absolute bottom-0 left-0 z-0">
          <NextImage
            src="/decoration/corner-left-button.png"
            alt=""
            width={200}
            height={200}
            className="w-40 sm:w-48 md:w-52 lg:w-56 xl:w-60 h-auto opacity-80"
            priority={false}
          />
        </div>
        
        {/* Bottom right corner decoration - flipped horizontally */}
        <div className="absolute bottom-0 right-0 z-0">
          <NextImage
            src="/decoration/corner-left-button.png"
            alt=""
            width={200}
            height={200}
            className="w-40 sm:w-48 md:w-52 lg:w-56 xl:w-60 h-auto opacity-80 scale-x-[-1]"
            priority={false}
          />
        </div>
      </div>

      <div className="relative z-10 w-full container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex flex-col items-center justify-end min-h-screen pb-12 sm:pb-20 md:pb-28 lg:pb-40 xl:pb-48">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 sm:inset-x-6 md:inset-x-10 lg:inset-x-16 top-16 sm:top-20 lg:top-28 bottom-24 sm:bottom-28 lg:bottom-40 mx-auto max-w-5xl rounded-[42px] bg-gradient-to-b from-[#F9E7D3]/65 via-[#FDF5EC]/55 to-[#F9E7D3]/15 opacity-90 blur-[40px] drop-shadow-[0_35px_65px_rgba(7,12,18,0.35)]"
        />
        <div className={`relative z-10 w-full max-w-4xl text-center space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Warm invitation line */}
          <div className="space-y-2 sm:space-y-3 mb-2 sm:mb-4">
            <p
              className="text-sm sm:text-base md:text-lg lg:text-xl font-light text-[#FFFFFF]/95 tracking-wide text-balance"
              style={{ textShadow: softTextShadow }}
            >
              {invitationLine}
            </p>
            <p
              className="text-xs sm:text-sm md:text-base lg:text-lg text-[#FFFFFF]/85 tracking-wide text-balance"
              style={{ textShadow: softTextShadow }}
            >
              {subInvitationLine}
            </p>
            {/* Subtle divider */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 py-1">
              <div className="h-px w-16 sm:w-20 md:w-24 bg-gradient-to-r from-transparent via-[#C1C1C1]/70 to-[#C1C1C1]" />
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#C1C1C1]/80 shadow-[0_0_12px_rgba(193,193,193,0.8)]" />
              <div className="h-px w-16 sm:w-20 md:w-24 bg-gradient-to-l from-transparent via-[#C1C1C1]/70 to-[#C1C1C1]" />
            </div>
          </div>

          {/* Couple names - keeping the arrangement as requested */}
          <div className="space-y-3 sm:space-y-4 md:space-y-5">
            <h1
              className="parisienne-regular text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[11rem] font-semibold tracking-[0.02em] sm:tracking-[0.03em] md:tracking-[0.04em] drop-shadow-2xl leading-tight"
              style={{
                color: '#FFFFFF',
                textShadow: "0 16px 38px rgba(10, 20, 32, 0.45), 0 6px 24px rgba(28, 51, 63, 0.35)",
              }}
            >
              <span className="inline-block transform transition-all duration-700 hover:scale-105">
                {siteConfig.couple.groomNickname}
              </span>
              <span className="mx-2 sm:mx-3 md:mx-4 text-[#FFFFFF]">&</span>
              <span className="inline-block transform transition-all duration-700 hover:scale-105">
                {siteConfig.couple.brideNickname}
              </span>
            </h1>
            {/* Elegant divider */}
            <div className="h-0.5 sm:h-1 w-20 sm:w-24 md:w-32 lg:w-40 mx-auto bg-gradient-to-r from-transparent via-[#C1C1C1] to-transparent shadow-[0_0_14px_rgba(193,193,193,0.55)]" />
          </div>

          {/* Tagline with improved typography */}
          <div className="space-y-3 sm:space-y-4 md:space-y-5 pt-2 sm:pt-4">
            <p
              className="imperial-script-regular text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[#FFFFFF] tracking-wide"
              style={{ textShadow: softTextShadow }}
            >
              {siteConfig.wedding.tagline}
            </p>

            {/* Date and time information */}
            <div className="space-y-2 sm:space-y-2.5 md:space-y-3 pt-2">
              <p
                className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-light text-[#FFFFFF] tracking-wide"
                style={{ textShadow: softTextShadow }}
              >
                {siteConfig.ceremony.day} • {siteConfig.ceremony.date}
              </p>
              <p
                className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-[#FFFFFF] tracking-[0.25em]"
                style={{ textShadow: softTextShadow }}
              >
                {siteConfig.ceremony.time} • Garden Vows at {siteConfig.ceremony.venue}
              </p>
              <p
                className="text-[11px] sm:text-xs md:text-sm lg:text-base font-medium text-[#FFFFFF]/80 tracking-wide"
                style={{ textShadow: softTextShadow }}
              >
                Reception follows at {siteConfig.reception.time} in the {siteConfig.reception.venue}
              </p>
            </div>
          </div>

            {/* CTA Buttons - Horizontal layout on all devices */}
            <div className="pt-6 sm:pt-8 md:pt-10 lg:pt-12 flex flex-row gap-2 sm:gap-3 md:gap-4 justify-center items-center max-w-2xl mx-auto w-full px-2">
            <a
                href="#messages"
              className="group flex-1 max-w-[200px] sm:max-w-none sm:min-w-[160px] md:min-w-[180px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-2.5 sm:py-3 md:py-3.5 lg:py-4 rounded-lg sm:rounded-xl font-semibold sm:font-bold transition-all duration-500 ease-out uppercase tracking-wider text-xs sm:text-sm md:text-base whitespace-nowrap relative overflow-hidden border-2 backdrop-blur-sm"
              style={{
                backgroundColor: "rgba(134, 158, 182, 0.92)",
                borderColor: "rgba(193, 193, 193, 0.5)",
                color: "#FFFFFF",
                boxShadow: "0 6px 24px rgba(134, 158, 182, 0.45), 0 2px 6px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.15)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#869EB6";
                e.currentTarget.style.borderColor = "rgba(193, 193, 193, 0.8)";
                e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(134, 158, 182, 0.55), 0 4px 12px rgba(0,0,0,0.35), 0 0 20px rgba(193, 193, 193, 0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(134, 158, 182, 0.92)";
                e.currentTarget.style.borderColor = "rgba(193, 193, 193, 0.5)";
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 6px 24px rgba(134, 158, 182, 0.45), 0 2px 6px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.15)";
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = "translateY(-1px) scale(0.98)";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
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
              className="group flex-1 max-w-[200px] sm:max-w-none sm:min-w-[160px] md:min-w-[180px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-2.5 sm:py-3 md:py-3.5 lg:py-4 rounded-lg sm:rounded-xl font-semibold sm:font-bold transition-all duration-500 ease-out uppercase tracking-wider text-xs sm:text-sm md:text-base whitespace-nowrap relative overflow-hidden border-2 backdrop-blur-sm"
              style={{
                backgroundColor: "rgba(134, 158, 182, 0.92)",
                borderColor: "rgba(255, 255, 255, 0.5)",
                color: "#FFFFFF",
                boxShadow: "0 6px 24px rgba(134, 158, 182, 0.45), 0 2px 6px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#869EB6";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.85)";
                e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(134, 158, 182, 0.6), 0 4px 12px rgba(0,0,0,0.35), 0 0 20px rgba(255, 255, 255, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(134, 158, 182, 0.92)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.5)";
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 6px 24px rgba(134, 158, 182, 0.45), 0 2px 6px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.2)";
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = "translateY(-1px) scale(0.98)";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
              }}
            >
              <span className="relative z-10 flex items-center justify-center">
                RSVP
              </span>
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFFFFF]/35 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 transform -skew-x-12 -translate-x-full group-hover:translate-x-full"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
