"use client"
import { Section } from "@/components/section"
import { siteConfig } from "@/content/site"
import Stack from "@/components/stack"
import { motion } from "motion/react"
import Image from "next/image"


export function Narrative() {
  return (
    <Section id="narrative" className="relative py-8 sm:py-12 md:py-20 overflow-hidden bg-[#821D30]">
      {/* Enhanced background elements - romantic and compact */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft gradient overlays with romantic pink tones */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#EAD4D9]/10 via-white/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#EAD4D9]/10 via-white/5 to-transparent" />
        
        {/* Floating decorative circles - smaller for mobile */}
        <div className="absolute top-6 left-6 w-20 h-20 sm:w-32 sm:h-32 bg-white/8 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-12 right-10 w-16 h-16 sm:w-24 sm:h-24 bg-[#EAD4D9]/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-12 left-12 w-20 h-20 sm:w-28 sm:h-28 bg-white/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-16 right-8 w-14 h-14 sm:w-20 sm:h-20 bg-[#EAD4D9]/8 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        
        {/* Romantic floating hearts - subtle animation */}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute text-white/15"
            style={{
              top: `${20 + i * 20}%`,
              left: `${10 + (i % 2) * 80}%`,
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut",
            }}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </motion.div>
        ))}
        
        {/* Bottom corner flower decorations - smaller for mobile */}
        <div className="absolute bottom-0 left-0 z-0">
          <Image
            src="/decoration/left-bottom-left-flower.png"
            alt=""
            width={400}
            height={400}
            className="w-32 sm:w-48 md:w-64 lg:w-72 h-auto opacity-70"
            priority={false}
          />
        </div>
        
        <div className="absolute bottom-0 right-0 z-0">
          <Image
            src="/decoration/left-bottom-left-flower.png"
            alt=""
            width={400}
            height={400}
            className="w-32 sm:w-48 md:w-64 lg:w-72 h-auto opacity-70 scale-x-[-1]"
            priority={false}
          />
        </div>
      </div>

      {/* Header - Compact for mobile */}
      <div className="relative z-10 text-center mb-6 sm:mb-8 md:mb-12 px-3 sm:px-4">
        {/* Decorative element above title - romantic hearts */}
        <motion.div 
          className="flex items-center justify-center gap-1.5 sm:gap-2 mb-2 sm:mb-3"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-6 sm:w-8 md:w-12 h-px bg-white/40" />
          <motion.svg 
            className="w-3 h-3 sm:w-4 sm:h-4 text-[#EAD4D9]/80" 
            fill="currentColor" 
            viewBox="0 0 24 24"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </motion.svg>
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/60 rounded-full" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#EAD4D9]/60 rounded-full" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/60 rounded-full" />
          <motion.svg 
            className="w-3 h-3 sm:w-4 sm:h-4 text-[#EAD4D9]/80" 
            fill="currentColor" 
            viewBox="0 0 24 24"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </motion.svg>
          <div className="w-6 sm:w-8 md:w-12 h-px bg-white/40" />
        </motion.div>
        
        <motion.h2 
          className="imperial-script-regular text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal text-white mb-3 sm:mb-4 md:mb-6 text-balance drop-shadow-lg tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          The proposal and Pamamanhikan moments
        </motion.h2>
        
        {/* Decorative element below title - romantic */}
        <motion.div 
          className="flex items-center justify-center gap-1.5 sm:gap-2 mt-2 sm:mt-3"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/60 rounded-full" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#EAD4D9]/60 rounded-full" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/60 rounded-full" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">

        {/* Main Content - Centered Layout - Compact */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12 items-center lg:items-start"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Left Spacer */}
          <div className="hidden lg:block"></div>

          {/* Interactive Stack Component - Center - Smaller for mobile */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Enhanced glow effect - romantic pink/white glow */}
              <div className="absolute inset-0 bg-[#EAD4D9]/15 rounded-full blur-3xl -z-10 w-full h-full max-w-[240px] sm:max-w-sm animate-pulse"></div>
              <div className="absolute inset-0 bg-white/8 rounded-full blur-2xl -z-10 w-full h-full max-w-[240px] sm:max-w-sm"></div>

              <div className="scale-[0.75] sm:scale-90 md:scale-100">
                <Stack
                  randomRotation={true}
                  sensitivity={180}
                  sendToBackOnClick={false}
                  cardDimensions={{ width: 220, height: 260 }}
                  cardsData={[
                    { id: 1, img: "/Pamamanhikan/image (1).jpg" },
                   
                    { id: 18, img: "/Pamamanhikan/image (23).jpg" },
                    { id: 19, img: "/Pamamanhikan/image (22).jpg" },
                    { id: 20, img: "/Pamamanhikan/image (21).jpg" },
                    { id: 22, img: "/gallery/new couple (4).jfif" },
                    { id: 23, img: "/gallery/new couple (5).jfif" },

                
                  ]}
                  animationConfig={{ stiffness: 260, damping: 20 }}
                />
              </div>

              <motion.p 
                className="text-center text-xs sm:text-sm md:text-base text-white/90 mt-4 sm:mt-6 font-sans font-medium tracking-wide drop-shadow-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
              >
                ✨ Drag to explore our moments ✨
              </motion.p>
            </div>
          </div>

          {/* Right Spacer */}
          <div className="hidden lg:block"></div>
        </motion.div>

        {/* Story Text - Full Width Below - Compact for mobile */}
        <motion.div 
          className="mt-8 sm:mt-12 md:mt-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Text container - compact padding for mobile */}
          <div className="relative bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-2xl border border-white/30">
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              {siteConfig.narrative.split("\n\n").map((paragraph, index) => (
                <motion.div 
                  key={index} 
                  className="relative"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                >
                  {/* First paragraph with drop cap - smaller for mobile */}
                  {index === 0 ? (
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-white text-pretty font-sans font-light pl-2 sm:pl-3 md:pl-4">
                      <span className="float-left text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white/95 leading-none mr-1.5 sm:mr-2 mt-0.5 sm:mt-1 drop-shadow-md">
                        {paragraph.charAt(0)}
                      </span>
                      {paragraph.slice(1)}
                    </p>
                  ) : (
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-white/90 text-pretty font-sans font-light pl-2 sm:pl-3 md:pl-4">
                      {paragraph}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
            
            {/* Decorative corner accents - romantic hearts */}
            <div className="absolute top-1 left-1 w-2 h-2 sm:w-3 sm:h-3 border-t-2 border-l-2 border-[#EAD4D9]/50 rounded-tl-lg" />
            <div className="absolute top-1 right-1 w-2 h-2 sm:w-3 sm:h-3 border-t-2 border-r-2 border-[#EAD4D9]/50 rounded-tr-lg" />
            <div className="absolute bottom-1 left-1 w-2 h-2 sm:w-3 sm:h-3 border-b-2 border-l-2 border-[#EAD4D9]/50 rounded-bl-lg" />
            <div className="absolute bottom-1 right-1 w-2 h-2 sm:w-3 sm:h-3 border-b-2 border-r-2 border-[#EAD4D9]/50 rounded-br-lg" />
          </div>
        </motion.div>

        {/* Divider and CTA - Compact */}
        <motion.div 
            className="mt-8 sm:mt-12 md:mt-16 space-y-6 sm:space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* Decorative divider - romantic with hearts */}
            <div className="flex items-center justify-center gap-2 sm:gap-4">
              <div className="flex-1 h-px bg-white/40"></div>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <motion.svg 
                  className="w-3 h-3 sm:w-4 sm:h-4 text-[#EAD4D9]/80" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </motion.svg>
                <div className="w-1 h-1 bg-white/70 rounded-full"></div>
                <motion.svg 
                  className="w-3 h-3 sm:w-4 sm:h-4 text-[#EAD4D9]/80" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </motion.svg>
              </div>
              <div className="flex-1 h-px bg-white/40"></div>
            </div>

            {/* Enhanced CTA Button - Compact for mobile */}
            <div className="flex justify-center">
              <motion.a
                href="#guest-list"
                className="group relative w-full sm:w-auto px-6 sm:px-8 md:px-12 py-3.5 sm:py-4 md:py-5 bg-gradient-to-r from-[#821D30] via-[#821D30] to-[#5A1422] text-[#FFFFFF] font-sans font-bold text-sm sm:text-base md:text-lg lg:text-xl rounded-[1.5rem] sm:rounded-[2rem] transition-all duration-500 text-center overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#821D30]/40 border-2 border-white/30 hover:border-white/50 hover:text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Pulsing glow effect - refined colors */}
                <motion.div 
                  className="absolute inset-0 bg-[#821D30]/40 rounded-[2rem] blur-2xl"
                  animate={{
                    opacity: [0.4, 0.7, 0.4],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                {/* Enhanced gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Double shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent"></div>
                <div className="absolute inset-0 translate-x-full group-hover:-translate-x-full transition-transform duration-1200 delay-200 bg-gradient-to-l from-transparent via-white/15 to-transparent"></div>
                
                {/* Enhanced sparkle effects */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      top: `${20 + i * 15}%`,
                      left: `${10 + (i % 3) * 40}%`,
                    }}
                    animate={{
                      scale: [0, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeInOut",
                    }}
                  >
                    <svg className="w-3 h-3 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                    </svg>
                  </motion.div>
                ))}
                
                {/* Animated gradient border */}
                <div className="absolute inset-0 rounded-[2rem] border-2 border-white/10 group-hover:border-white/30 transition-all duration-500"></div>
                <motion.div 
                  className="absolute inset-0 rounded-[2rem] border-2 border-white/20"
                  animate={{
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                {/* Decorative waves on hover */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ y: 0 }}
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <svg className="w-full h-full" fill="none" viewBox="0 0 400 100" preserveAspectRatio="none">
                    <path d="M0,50 Q100,20 200,50 T400,50 L400,100 L0,100 Z" fill="white" opacity="0.1"/>
                  </svg>
                </motion.div>
                
                {/* Button content - compact */}
                <span className="relative z-10 tracking-wide uppercase inline-flex items-center gap-2 sm:gap-3 font-bold text-[#FFFFFF] text-xs sm:text-sm md:text-base">
                  Join Our Celebration
                  <motion.svg 
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#FFFFFF]" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{
                      x: [0, 4, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </span>
                
                {/* Enhanced decorative corner ornaments */}
                <motion.div 
                  className="absolute top-2 left-2 w-2 h-2 bg-white/50 rounded-full opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: [0, 1.5, 1] }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div 
                  className="absolute top-2 right-2 w-2 h-2 bg-white/50 rounded-full opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: [0, 1.5, 1] }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                />
                <motion.div 
                  className="absolute bottom-2 left-2 w-2 h-2 bg-white/50 rounded-full opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: [0, 1.5, 1] }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
                <motion.div 
                  className="absolute bottom-2 right-2 w-2 h-2 bg-white/50 rounded-full opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: [0, 1.5, 1] }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                />
              </motion.a>
            </div>
        </motion.div>

      </div>
    </Section>
  )
}
