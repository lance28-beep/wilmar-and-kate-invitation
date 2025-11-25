"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"
import { Download, Copy, Check, Share2, ArrowLeft, Upload } from "lucide-react"
import { QRCodeCanvas } from "qrcode.react"
import { siteConfig } from "@/content/site"

// This will be replaced with dynamic image loading
const images = [
  { src: "/desktop-background/couple (1).jpg", category: "desktop" as const },
  { src: "/desktop-background/couple (2).jpg", category: "desktop" as const },
  { src: "/desktop-background/couple (3).jpg", category: "desktop" as const },
  { src: "/desktop-background/couple (4).jpg", category: "desktop" as const },
  { src: "/mobile-background/couple (1).jpg", category: "mobile" as const },
  { src: "/mobile-background/couple (2).jpg", category: "mobile" as const },
  { src: "/mobile-background/couple (3).jpg", category: "mobile" as const },
  { src: "/mobile-background/couple (4).jpg", category: "mobile" as const },
  { src: "/mobile-background/couple (5).jpg", category: "mobile" as const },
  { src: "/mobile-background/couple (6).jpg", category: "mobile" as const },
  { src: "/mobile-background/couple (7).jpg", category: "mobile" as const },
  { src: "/mobile-background/couple (8).jpg", category: "mobile" as const },
  { src: "/mobile-background/couple (9).jpg", category: "mobile" as const },
  { src: "/mobile-background/couple (10).jpg", category: "mobile" as const },
  { src: "/mobile-background/couple (11).jpg", category: "mobile" as const },
  { src: "/mobile-background/couple (12).jpg", category: "mobile" as const },
  { src: "/mobile-background/couple (13).jpg", category: "mobile" as const },
  { src: "/desktop-background/couple (5).jpg", category: "desktop" as const },
  { src: "/desktop-background/couple (6).jpg", category: "desktop" as const },
  { src: "/desktop-background/couple (7).jpg", category: "desktop" as const },
  { src: "/desktop-background/couple (8).jpg", category: "desktop" as const },
  { src: "/desktop-background/couple (9).jpg", category: "desktop" as const },
  { src: "/desktop-background/couple (10).jpg", category: "desktop" as const },
  { src: "/desktop-background/couple (11).jpg", category: "desktop" as const },
]

export default function GalleryPage() {
  const [isMobile, setIsMobile] = useState(false)
  const [copiedDriveQR, setCopiedDriveQR] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  
  const googleDriveUrl = siteConfig.snapShare?.googleDriveLink || ""

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const downloadDriveQRCode = () => {
    const canvas = document.getElementById("gallery-drive-qr") as HTMLCanvasElement | null
    if (!canvas) return
    const link = document.createElement("a")
    link.download = "wedding-gallery-qr.png"
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

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#821D30] via-[#821D30] to-[#B88A93] relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft gradient overlays */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/15 via-white/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white/15 via-white/5 to-transparent" />
        
        {/* Floating decorative circles */}
        <motion.div
          className="absolute top-16 right-12 w-32 h-32 bg-white/8 rounded-full blur-2xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.12, 0.08] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-32 left-20 w-24 h-24 bg-white/6 rounded-full blur-xl"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.12, 0.08, 0.12] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-16 left-20 w-28 h-28 bg-white/10 rounded-full blur-2xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Bottom corner flower decorations */}
        <div className="absolute bottom-0 left-0 z-0">
          <Image
            src="/decoration/left-bottom-left-flower.png"
            alt=""
            width={400}
            height={400}
            className="w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 2xl:w-96 h-auto opacity-80"
            priority={false}
          />
        </div>
        
        <div className="absolute bottom-0 right-0 z-0">
          <Image
            src="/decoration/left-bottom-left-flower.png"
            alt=""
            width={400}
            height={400}
            className="w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 2xl:w-96 h-auto opacity-80 scale-x-[-1]"
            priority={false}
          />
        </div>
      </div>

      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-10"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/30 rounded-full text-white transition-all duration-200 shadow-md hover:shadow-lg group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-lora text-sm">Back to Home</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          {/* Decorative element above title */}
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <div className="w-8 sm:w-12 md:w-16 h-px bg-white/40" />
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
            <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
            <div className="w-8 sm:w-12 md:w-16 h-px bg-white/40" />
          </div>
          
          <h1 className="imperial-script-regular text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white mb-3 sm:mb-4 drop-shadow-lg">
            Our Gallery
          </h1>
          
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
            A collection of our favorite moments captured together
          </p>
          
          {/* Decorative element below subtitle */}
          <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
            <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          </div>
        </motion.div>

        {/* Gallery Grid */}
        {images.length === 0 ? (
          <div className="text-center text-white/80 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <p className="font-lora">No images found yet. Check back soon for beautiful moments!</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-12 sm:mb-16 md:mb-20"
          >
            {images.map((image, index) => (
              <motion.div
                key={image.src}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative aspect-square overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl border border-[#821D30]/30 hover:border-[#821D30]/60 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedImage(image.src)}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src={image.src}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Upload Section with QR Code */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-[#904945]/40 overflow-hidden">
            <div className="relative p-6 sm:p-8 md:p-10">
              {/* Corner accents */}
              <div className="absolute top-1 left-1 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-[#904945]/50 rounded-tl-lg" />
              <div className="absolute top-1 right-1 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-r-2 border-[#904945]/50 rounded-tr-lg" />
              <div className="absolute bottom-1 left-1 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-l-2 border-[#904945]/50 rounded-bl-lg" />
              <div className="absolute bottom-1 right-1 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-[#904945]/50 rounded-br-lg" />
              
              <div className="text-center mb-6 sm:mb-8">
                {/* Header with icon */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#5c1f24] to-[#904945] flex items-center justify-center shadow-md">
                    <Upload className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <h2 className="font-playfair text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#2E0B0F]">
                    Upload Your Photos & Videos
                  </h2>
                </div>
                
                <p className="font-lora text-[#2E0B0F]/70 text-xs sm:text-sm md:text-base mb-4 leading-relaxed max-w-2xl mx-auto">
                  {siteConfig.snapShare?.instructions || "Scan the QR code below, create a folder with your name, and upload your photos/videos from our special day!"}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                {/* QR Code Section */}
                {googleDriveUrl && (
                  <div className="flex flex-col items-center justify-center">
                    <div className="bg-gradient-to-br from-[#5c1f24]/10 via-white to-[#904945]/10 p-4 sm:p-5 md:p-6 rounded-2xl shadow-lg border border-[#904945]/30 mb-4">
                      <div className="bg-white p-3 sm:p-4 rounded-xl shadow-inner">
                        <div className="relative mx-auto w-fit">
                          <QRCodeCanvas 
                            id="gallery-drive-qr" 
                            value={googleDriveUrl} 
                            size={isMobile ? 180 : 220} 
                            includeMargin={true}
                            level="H"
                            className="bg-white rounded-lg"
                            fgColor="#5c1f24"
                            bgColor="#FFFFFF"
                          />
                          {/* Decorative corners on QR */}
                          <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#904945] rounded-tl" />
                          <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#904945] rounded-tr" />
                          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#904945] rounded-bl" />
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#904945] rounded-br" />
                        </div>
                      </div>
                      
                      {/* Scan instruction */}
                      <p className="text-center mt-3 text-xs sm:text-sm text-[#2E0B0F]/60 font-lora">
                        📱 Scan with your camera app
                      </p>
                    </div>
                  </div>
                )}

                {/* Actions Section */}
                <div className="flex flex-col justify-center space-y-3 sm:space-y-4">
                  <div className="space-y-2 sm:space-y-3">
                    <button
                      onClick={downloadDriveQRCode}
                      className="flex items-center justify-center gap-2 w-full py-3 sm:py-3.5 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-xs sm:text-sm md:text-base bg-gradient-to-r from-[#904945] to-[#904945]/90 text-white hover:from-[#904945]/90 hover:to-[#904945]/80 font-medium"
                    >
                      <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="font-lora">Download QR Code</span>
                    </button>
                    
                    <button
                      onClick={copyDriveLink}
                      className="flex items-center justify-center gap-2 w-full py-3 sm:py-3.5 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-xs sm:text-sm md:text-base border-2 border-[#904945]/40 hover:border-[#904945]/60 bg-white hover:bg-[#904945]/5 font-medium"
                    >
                      {copiedDriveQR ? (
                        <>
                          <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#904945]" />
                          <span className="font-lora text-[#904945]">Link Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-[#2E0B0F]/60" />
                          <span className="font-lora text-[#2E0B0F]/80">Copy Drive Link</span>
                        </>
                      )}
                    </button>
                    
                    {/* Divider */}
                    <div className="flex items-center gap-2 py-2">
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#904945]/30 to-transparent" />
                      <span className="text-xs text-[#2E0B0F]/50 font-lora italic">or</span>
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#904945]/30 to-transparent" />
                    </div>
                    
                    {/* Direct link button */}
                    <a
                      href={googleDriveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 sm:py-3.5 px-4 rounded-lg bg-gradient-to-r from-[#904945]/10 to-[#5c1f24]/10 border border-[#904945]/30 hover:border-[#904945]/50 transition-all duration-200 shadow-sm hover:shadow-md group"
                    >
                      <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#904945] group-hover:scale-110 transition-transform" />
                      <span className="font-lora text-xs sm:text-sm md:text-base text-[#2E0B0F]/80 group-hover:text-[#904945] font-medium transition-colors">
                        Open Google Drive Folder
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Back to Snap & Share */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-10 sm:mt-12"
        >
          <Link
            href="/#snap-share"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-full text-white transition-all duration-200 shadow-md hover:shadow-lg font-lora text-sm sm:text-base"
          >
            <span>View More Sharing Options</span>
            <Share2 className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl w-full h-full flex items-center justify-center">
            <Image
              src={selectedImage}
              alt="Full size image"
              fill
              className="object-contain"
              sizes="100vw"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 flex items-center justify-center text-white transition-all duration-200"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </main>
  )
}


