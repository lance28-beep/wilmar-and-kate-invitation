"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion } from "motion/react"
import { Play } from "lucide-react"
import { Section } from "@/components/section"
import { useAudio } from "@/contexts/audio-context"

declare global {
  interface Window {
    YT?: {
      Player: new (element: HTMLElement | string, options: { events?: Record<string, (event: any) => void> }) => {
        destroy: () => void
      }
    }
    onYouTubeIframeAPIReady?: () => void
  }
}

const YOUTUBE_API_SRC = "https://www.youtube.com/iframe_api"

export function CoupleVideo() {
  const [hasClicked, setHasClicked] = useState(false)
  const [origin, setOrigin] = useState("")
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const playerRef = useRef<any>(null)
  const { pauseMusic, resumeMusic } = useAudio()
  const videoId = "FBtsqvPcNS8"

  useEffect(() => {
    if (typeof window === "undefined") return
    setOrigin(window.location.origin)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.YT?.Player) return

    if (!document.getElementById("youtube-iframe-api")) {
      const script = document.createElement("script")
      script.src = YOUTUBE_API_SRC
      script.id = "youtube-iframe-api"
      script.async = true
      const firstScript = document.getElementsByTagName("script")[0]
      firstScript?.parentNode?.insertBefore(script, firstScript)
    }
  }, [])

  useEffect(() => {
    if (!hasClicked || typeof window === "undefined") return
    let isCancelled = false

    const initializePlayer = () => {
      if (isCancelled || !iframeRef.current || !window.YT?.Player) return

      playerRef.current = new window.YT.Player(iframeRef.current, {
        events: {
          onReady: () => pauseMusic(),
          onStateChange: (event: { data: number }) => {
            if (event.data === 1) {
              pauseMusic()
            }
            if (event.data === 0 || event.data === 2) {
              resumeMusic()
            }
          },
        },
      })
    }

    const destroyPlayer = () => {
      if (playerRef.current?.destroy) {
        try {
          playerRef.current.destroy()
        } catch {
          // ignore destroy errors
        }
        playerRef.current = null
      }
    }

    if (window.YT?.Player) {
      initializePlayer()
    } else {
      window.onYouTubeIframeAPIReady = initializePlayer
    }

    return () => {
      isCancelled = true
      if (window.onYouTubeIframeAPIReady === initializePlayer) {
        window.onYouTubeIframeAPIReady = undefined
      }
      destroyPlayer()
    }
  }, [hasClicked, pauseMusic, resumeMusic])

  const handleThumbnailClick = () => {
    setHasClicked(true)
    pauseMusic()
  }

  return (
    <>
      <style jsx global>{`
        .couple-video iframe {
          pointer-events: auto;
        }
      `}</style>
      <Section id="couple-video" className="relative overflow-hidden">
        <div className="relative z-10 text-center mb-6 sm:mb-8 md:mb-10 px-3 sm:px-4">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-1 h-1 bg-[#FDECEF]/40 rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#F5E5D9]/80 rounded-full" />
            <div className="w-1 h-1 bg-[#FDECEF]/40 rounded-full" />
          </div>

          <h2 className="imperial-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-[#FDECEF] mb-2 drop-shadow-lg">
            A Glimpse of Our Love
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[#F5E5D9]/90 font-light max-w-xl mx-auto px-2">
            Watch the journey that brought our hearts together
          </p>
        </div>

        <div className="relative z-10 px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative group"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-[#660033]/35 via-[#F5E5D9]/22 to-[#660033]/35 blur-2xl opacity-70 group-hover:opacity-90 transition-all duration-500" />
              <div className="absolute -inset-4 bg-black/25 blur-3xl opacity-45 group-hover:opacity-65 transition-all duration-500" />

              <div className="relative bg-gradient-to-br from-black via-[#1a0010] to-black overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4),0_16px_64px_rgba(0,0,0,0.35),0_0_0_1px_rgba(102,0,51,0.2)] group-hover:shadow-[0_14px_52px_rgba(0,0,0,0.5),0_26px_100px_rgba(0,0,0,0.4),0_0_0_1px_rgba(102,0,51,0.3)] transition-all duration-500 couple-video">
                <div className="absolute inset-0 rounded-lg sm:rounded-xl md:rounded-2xl border border-[#F5E5D9]/20 group-hover:border-[#FDECEF]/35 transition-colors duration-500 pointer-events-none z-20" />
                <div className="absolute inset-0 rounded-lg sm:rounded-xl md:rounded-2xl shadow-[inset_0_0_40px_rgba(0,0,0,0.5)] pointer-events-none z-10" />

                <div className="relative" style={{ paddingBottom: "56.25%" }}>
                  {!hasClicked && (
                    <motion.div
                      initial={{ opacity: 1 }}
                      className="absolute inset-0 cursor-pointer z-20 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden"
                      onClick={handleThumbnailClick}
                    >
                      <Image
                        src="/desktop-background/couple (54).jpg"
                        alt="Couple video thumbnail"
                        fill
                        className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-black/35 group-hover:from-black/70 group-hover:via-black/35 group-hover:to-black/45 transition-all duration-300" />
                      <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.3)]" />

                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="relative">
                          <div className="absolute inset-0 rounded-full bg-[#660033]/45 blur-2xl scale-150 group-hover:bg-[#F5E5D9]/55 group-hover:scale-[1.7] transition-all duration-300" />

                          <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-white/95 backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.4),0_16px_48px_rgba(0,0,0,0.25),0_0_0_1px_rgba(102,0,51,0.2)] group-hover:bg-white group-hover:shadow-[0_12px_52px_rgba(0,0,0,0.5),0_24px_72px_rgba(102,0,51,0.35),0_0_0_1px_rgba(102,0,51,0.3)] transition-all duration-300">
                            <Play className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#660033] fill-[#660033] ml-1 drop-shadow-md" />
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}

                  {hasClicked && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="absolute inset-0">
                      <div className="relative w-full h-full overflow-hidden">
                        <iframe
                          ref={iframeRef}
                          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&cc_load_policy=0&fs=1&playsinline=1&enablejsapi=1&origin=${origin}`}
                          className="absolute inset-0 w-full h-full"
                          style={{ border: 0 }}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          title="Wedding Video"
                        />
                        <div
                          className="absolute top-0 left-0 right-0 h-16 pointer-events-none z-10"
                          style={{
                            background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 100%)",
                          }}
                        />
                        <div
                          className="absolute top-2 right-2 w-24 h-12 pointer-events-none z-10 bg-black/60 blur-xl"
                          style={{
                            mixBlendMode: "multiply",
                          }}
                        />
                        <div
                          className="absolute inset-0 pointer-events-none z-[5]"
                          style={{
                            background: "radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.02) 100%)",
                          }}
                        />
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-center mt-8 sm:mt-10"
            >
              <p className="text-xs sm:text-sm md:text-base text-[#9B7C6A]/80 font-light italic max-w-lg mx-auto px-4">
                A glimpse into the moments that made our hearts one
              </p>
            </motion.div>
          </div>
        </div>
      </Section>
    </>
  )
}

