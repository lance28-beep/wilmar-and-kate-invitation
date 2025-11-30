"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "motion/react"
import { Instagram, Facebook, Twitter, Share2, Copy, Check, Download } from "lucide-react"
import { Section } from "@/components/section"
import { QRCodeCanvas } from "qrcode.react"
import { siteConfig } from "@/content/site"

export function SnapShare() {
  const [copiedHashtag, setCopiedHashtag] = useState(false)
  const [copiedDriveQR, setCopiedDriveQR] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const websiteUrl = typeof window !== "undefined" ? window.location.href : "https://example.com"
  const googleDriveUrl = siteConfig.snapShare?.googleDriveLink || ""
  const hashtags = ["#DediKATEdbyGodForWILMAR"]
  const shareText = `Join us in celebrating our special day! Check out our wedding website: ${websiteUrl} ${hashtags.join(" ")} 💕`

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedHashtag(true)
      setTimeout(() => setCopiedHashtag(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const shareOnSocial = (platform: "instagram" | "facebook" | "twitter" | "tiktok") => {
    const encodedUrl = encodeURIComponent(websiteUrl)
    const encodedText = encodeURIComponent(shareText)

    const urls: Record<string, string> = {
      instagram: `https://www.instagram.com/`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
      tiktok: `https://www.tiktok.com/`,
    }

    const target = urls[platform]
    if (target) {
      window.open(target, "_blank", "width=600,height=400")
    }
  }

  const downloadQRCode = () => {
    const canvas = document.getElementById("snapshare-qr") as HTMLCanvasElement | null
    if (!canvas) return
    const link = document.createElement("a")
    link.download = "wedding-qr.png"
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  const downloadDriveQRCode = () => {
    const canvas = document.getElementById("drive-qr") as HTMLCanvasElement | null
    if (!canvas) return
    const link = document.createElement("a")
    link.download = "drive-qr.png"
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  const copyDriveLink = async () => {
    if (googleDriveUrl) {
      try {
        await navigator.clipboard.writeText(googleDriveUrl)
        setCopiedDriveQR(true)
        setTimeout(() => setCopiedDriveQR(false), 2000)
      } catch (err) {
        console.error("Failed to copy: ", err)
      }
    }
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <Section id="snap-share" className="relative bg-transparent py-8 sm:py-10 md:py-14 lg:py-16 xl:py-20 overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-3 sm:px-4 md:px-6 z-10">
        <motion.div
          className="text-center mb-6 sm:mb-8 md:mb-12"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Decorative element above title */}
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <div className="w-8 sm:w-12 md:w-16 h-px bg-white/40" />
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
            <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
            <div className="w-8 sm:w-12 md:w-16 h-px bg-white/40" />
          </div>
          
          <h2 className="imperial-script-regular mb-2 sm:mb-3 md:mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-white drop-shadow-lg">
            Snap & Share
          </h2>
          
          <p className="mx-auto max-w-xl text-xs sm:text-sm md:text-base lg:text-lg font-light leading-relaxed text-white/90 px-2">
            Help us document our special day by sharing moments using our official hashtags.
          </p>
          
          {/* Decorative element below subtitle */}
          <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
            <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          </div>
        </motion.div>

        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4" variants={staggerChildren} initial="initial" animate="animate">
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -2 }}
          >
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

                <div className="relative p-1 sm:p-2 md:p-3 z-10">
                  <div className="text-center">
                    <div className="space-y-2 mb-3">
                      {hashtags.map((hashtag) => (
                        <div key={hashtag} className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-[#821D30]/10 to-[#B88A93]/15 px-3 py-2 sm:py-2.5 rounded-lg shadow-md border border-[#904945]/25 w-full sm:w-auto mx-auto">
                          <span className="font-lora text-sm sm:text-base md:text-lg font-bold text-[#5A1422] break-all sm:break-normal tracking-wide">{hashtag}</span>
                          <button
                            onClick={() => copyToClipboard(hashtag)}
                            className="p-1 sm:p-1.5 rounded-full bg-white/90 hover:bg-white transition-colors duration-200 shadow-sm flex-shrink-0 ring-1 ring-[#A1857A]/40"
                            title="Copy hashtag"
                          >
                            {copiedHashtag ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#821D30]" /> : <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#5A1422]/60" />}
                          </button>
                        </div>
                      ))}
                    </div>
                    <p className="font-lora text-[#5A1422] text-[10px] sm:text-xs md:text-sm mb-2.5">Use these hashtags on your posts to be featured in our gallery.</p>
                  </div>

                  <div className="mt-4 sm:mt-5">
                    <h4 className="font-playfair text-sm sm:text-base md:text-lg font-bold text-[#5A1422] mb-2.5 sm:mb-3 text-center">Our Favorite Moments</h4>
                    {/* Two squares on top, one landscape below */}
                    <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                      <motion.div className="relative aspect-square rounded-lg overflow-hidden shadow-md ring-1 ring-[#A1857A]/40" whileHover={{ scale: 1.03 }} transition={{ duration: 0.25 }}>
                        <Image src="/mobile-background/couple (3).jpg" alt="Favorite moment 1" fill className="object-cover" />
                      </motion.div>
                      <motion.div className="relative aspect-square rounded-lg overflow-hidden shadow-md ring-1 ring-[#A1857A]/40" whileHover={{ scale: 1.03 }} transition={{ duration: 0.25 }}>
                        <Image src="/mobile-background/couple (4).jpg" alt="Favorite moment 2" fill className="object-cover" />
                      </motion.div>
                      <motion.div className="relative col-span-2 aspect-[3/2] rounded-lg overflow-hidden shadow-md ring-1 ring-[#A1857A]/40" whileHover={{ scale: 1.02 }} transition={{ duration: 0.25 }}>
                        <Image src="/gallery/Screenshot 2025-11-30 171230.png" alt="Favorite moment 3" fill className="object-cover" />
                      </motion.div>
                    </div>
                    <p className="font-lora text-[#5A1422] text-[9px] sm:text-[10px] md:text-xs text-center mt-2 sm:mt-2.5 px-2">Share your photos using our hashtag to be featured here!</p>
                  </div>
                </div>

                {/* Sparkle accents */}
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-2 h-2 sm:w-3 sm:h-3 bg-[#EFBFBB] rounded-full animate-ping opacity-80 shadow-lg" />
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#B08981] rounded-full animate-pulse opacity-70 shadow-md" />
                <div className="absolute top-1/2 left-1 sm:left-2 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#FFE5E4] rounded-full animate-pulse opacity-50" />
              </div>
            </div>
          </motion.div>

          <motion.div className="space-y-3 sm:space-y-4" variants={fadeInUp}>
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

                <div className="relative p-1 sm:p-2 md:p-3 z-10 text-center">
                
                <h4 className="font-playfair text-sm sm:text-base md:text-lg font-bold text-[#5A1422] mb-3">Share Our Website</h4>
                <div className="mx-auto inline-flex flex-col items-center bg-white p-3 sm:p-4 rounded-xl shadow-md border border-ink/10 mb-3">
                  <div className="mb-2 sm:mb-2.5 p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-[#A1857A]/40 via-[#FFFFFF]/40 to-white ring-1 ring-[#A1857A]/40">
                    <div className="bg-white p-1.5 sm:p-2 rounded-md shadow-sm">
                      <QRCodeCanvas id="snapshare-qr" value={websiteUrl} size={isMobile ? 100 : 140} includeMargin className="bg-white" />
                    </div>
                  </div>
                  <button
                    onClick={downloadQRCode}
                    className="flex items-center gap-1.5 sm:gap-2 mx-auto px-3 py-1.5 sm:py-2 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md text-[10px] sm:text-xs md:text-sm bg-[#904945] text-white"
                  >
                    <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span className="font-lora">Download QR</span>
                  </button>
                </div>
                <p className="font-lora text-[#5A1422] text-[9px] sm:text-[10px] md:text-xs">Scan with any camera app</p>
                </div>

                {/* Sparkle accents */}
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-2 h-2 sm:w-3 sm:h-3 bg-[#EFBFBB] rounded-full animate-ping opacity-80 shadow-lg" />
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#B08981] rounded-full animate-pulse opacity-70 shadow-md" />
                <div className="absolute top-1/2 left-1 sm:left-2 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#FFE5E4] rounded-full animate-pulse opacity-50" />
              </div>
            </div>

            {/* Google Drive QR Code Section */}
            {googleDriveUrl && (
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

                  <div className="relative p-1 sm:p-2 md:p-3 z-10">
                  
                  {/* Header with icon */}
                  <div className="flex items-center justify-center gap-2 sm:gap-2.5 mb-2 sm:mb-2.5">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-[#821D30] to-[#B88A93] flex items-center justify-center flex-shrink-0 shadow-md">
                      <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white" />
                    </div>
                    <h4 className="font-playfair text-sm sm:text-base md:text-lg lg:text-xl font-bold text-[#5A1422]">Upload Your Photos & Videos</h4>
                  </div>
                  
                  {/* Instructions */}
                  <p className="font-lora text-[#5A1422]/70 text-[10px] sm:text-xs md:text-sm mb-3 sm:mb-4 px-2 leading-relaxed text-center">
                    {siteConfig.snapShare?.instructions || "Scan the QR code below, create a folder with your name, and upload your photos/videos from our special day!"}
                  </p>
                  
                  {/* Enhanced QR container with larger QR */}
                  <div className="mx-auto max-w-xs">
                    <div className="bg-gradient-to-br from-[#821D30]/10 via-white to-[#B88A93]/10 p-3 sm:p-4 rounded-2xl shadow-lg border border-[#B88A93]/30 mb-3 sm:mb-4">
                      <div className="bg-white p-2.5 sm:p-3 rounded-xl shadow-inner">
                        <div className="relative mx-auto w-fit">
                          <QRCodeCanvas 
                            id="drive-qr" 
                            value={googleDriveUrl} 
                            size={isMobile ? 140 : 200} 
                            includeMargin={true}
                            level="H"
                            className="bg-white rounded-lg"
                          />
                          {/* Decorative corners on QR */}
                          <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#904945] rounded-tl" />
                          <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#904945] rounded-tr" />
                          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#904945] rounded-bl" />
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#904945] rounded-br" />
                        </div>
                      </div>
                      
                      {/* Scan instruction */}
                      <p className="text-center mt-2 sm:mt-2.5 text-[9px] sm:text-[10px] md:text-xs text-[#5A1422]/60 font-lora">
                        📱 Scan with your camera app
                      </p>
                    </div>
                    
                    {/* Action buttons - improved layout */}
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={downloadDriveQRCode}
                          className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2 sm:py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-[10px] sm:text-xs md:text-sm bg-gradient-to-r from-[#821D30] to-[#904945]/90 text-white hover:from-[#821D30]/90 hover:to-[#904945]/80 font-medium"
                        >
                          <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          <span className="font-lora">Download</span>
                        </button>
                        
                        <button
                          onClick={copyDriveLink}
                          className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2 sm:py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-[10px] sm:text-xs md:text-sm border-2 border-[#B88A93]/40 hover:border-[#B88A93]/60 bg-white hover:bg-[#A1857A]/5 font-medium"
                          title="Copy link"
                        >
                          {copiedDriveQR ? (
                            <>
                              <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#821D30]" />
                              <span className="font-lora text-[#821D30]">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#5A1422]/60" />
                              <span className="font-lora text-[#5A1422]/80">Copy Link</span>
                            </>
                          )}
                        </button>
                      </div>
                      
                      {/* Divider */}
                      <div className="flex items-center gap-2 py-1">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#A1857A]/30 to-transparent" />
                        <span className="text-[9px] sm:text-[10px] text-[#5A1422]/50 font-lora italic">or</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#A1857A]/30 to-transparent" />
                      </div>
                      
                      {/* Direct link button - full width */}
                      <a
                        href={googleDriveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-2 sm:py-2.5 px-3 rounded-lg bg-gradient-to-r from-[#A1857A]/10 to-[#904945]/10 border border-[#B88A93]/30 hover:border-[#B88A93]/50 transition-all duration-200 shadow-sm hover:shadow-md group"
                      >
                        <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#821D30] group-hover:scale-110 transition-transform" />
                        <span className="font-lora text-[10px] sm:text-xs md:text-sm text-[#5A1422]/80 group-hover:text-[#821D30] font-medium transition-colors">Open Google Drive Folder</span>
                      </a>
                    </div>
                  </div>
                  </div>

                  {/* Sparkle accents */}
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-2 h-2 sm:w-3 sm:h-3 bg-[#EFBFBB] rounded-full animate-ping opacity-80 shadow-lg" />
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#B08981] rounded-full animate-pulse opacity-70 shadow-md" />
                  <div className="absolute top-1/2 left-1 sm:left-2 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#FFE5E4] rounded-full animate-pulse opacity-50" />
                </div>
              </div>
            )}

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

                <div className="relative p-1 sm:p-2 md:p-3 z-10">
                
                <h5 className="font-playfair text-sm sm:text-base md:text-lg font-bold text-[#5A1422] mb-2.5 sm:mb-3 text-center">Share on Social Media</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                  <button
                    onClick={() => shareOnSocial("instagram")}
                    className="group flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 text-white px-3 py-2 sm:py-2.5 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg ring-1 ring-white/20"
                  >
                    <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
                    <span className="font-lora font-medium text-[10px] sm:text-xs md:text-sm">Instagram</span>
                  </button>
                  <button
                    onClick={() => shareOnSocial("facebook")}
                    className="group flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-br from-blue-500 to-blue-700 text-white px-3 py-2 sm:py-2.5 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg ring-1 ring-white/20"
                  >
                    <Facebook className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
                    <span className="font-lora font-medium text-[10px] sm:text-xs md:text-sm">Facebook</span>
                  </button>
                  <button
                    onClick={() => shareOnSocial("tiktok")}
                    className="group flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-br from-black via-gray-800 to-black text-white px-3 py-2 sm:py-2.5 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg ring-1 ring-white/10"
                  >
                    <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
                    <span className="font-lora font-medium text-[10px] sm:text-xs md:text-sm">TikTok</span>
                  </button>
                  <button
                    onClick={() => shareOnSocial("twitter")}
                    className="group flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-br from-sky-400 to-blue-500 text-white px-3 py-2 sm:py-2.5 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg ring-1 ring-white/20"
                  >
                    <Twitter className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
                    <span className="font-lora font-medium text-[10px] sm:text-xs md:text-sm">Twitter</span>
                  </button>
                </div>
                </div>

                {/* Sparkle accents */}
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-2 h-2 sm:w-3 sm:h-3 bg-[#EFBFBB] rounded-full animate-ping opacity-80 shadow-lg" />
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#B08981] rounded-full animate-pulse opacity-70 shadow-md" />
                <div className="absolute top-1/2 left-1 sm:left-2 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#FFE5E4] rounded-full animate-pulse opacity-50" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="text-center mt-5 sm:mt-6 md:mt-7" variants={fadeInUp}>
          <div className="max-w-3xl mx-auto">
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

                <div className="relative p-1 sm:p-2 md:p-3 z-10">
              
              <p className="font-lora text-[#5A1422] text-xs sm:text-sm md:text-base leading-relaxed mb-3">
                We are delighted to share this wonderful and blessed moment with you!
              </p>
              <div className="flex items-center justify-center gap-2">
                <div className="text-center">
                  <span className="block font-playfair text-[#5A1422] font-bold text-base sm:text-lg md:text-xl">– {siteConfig.couple.groomNickname} & {siteConfig.couple.brideNickname} –</span>
                </div>
                </div>

                {/* Sparkle accents */}
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-2 h-2 sm:w-3 sm:h-3 bg-[#EFBFBB] rounded-full animate-ping opacity-80 shadow-lg" />
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#B08981] rounded-full animate-pulse opacity-70 shadow-md" />
                <div className="absolute top-1/2 left-1 sm:left-2 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#FFE5E4] rounded-full animate-pulse opacity-50" />
              </div>
            </div>
          </div>
        </div>
        </motion.div>
      </div>
    </Section>
  )
}
