"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react"

interface AudioContextValue {
  pauseMusic: () => void
  resumeMusic: () => void
  isPlaying: boolean
  isEnabled: boolean
}

const AudioContext = createContext<AudioContextValue | undefined>(undefined)

interface AudioProviderProps {
  children: ReactNode
  enabled?: boolean
}

export function AudioProvider({ children, enabled = true }: AudioProviderProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const interactionBoundRef = useRef(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const pauseMusic = useCallback(() => {
    const audioEl = audioRef.current
    if (!audioEl) return
    audioEl.pause()
    setIsPlaying(false)
  }, [])

  const resumeMusic = useCallback(() => {
    if (!enabled) return
    const audioEl = audioRef.current
    if (!audioEl) return

    audioEl
      .play()
      .then(() => {
        setIsPlaying(true)
      })
      .catch((error) => {
        console.warn("Background music playback blocked:", error)
      })
  }, [enabled])

  useEffect(() => {
    if (!enabled) {
      pauseMusic()
      return
    }

    if (interactionBoundRef.current) return

    const handleUserInteraction = () => {
      resumeMusic()
      document.removeEventListener("click", handleUserInteraction)
      document.removeEventListener("touchstart", handleUserInteraction)
      interactionBoundRef.current = false
    }

    document.addEventListener("click", handleUserInteraction)
    document.addEventListener("touchstart", handleUserInteraction, { passive: true })
    interactionBoundRef.current = true

    return () => {
      document.removeEventListener("click", handleUserInteraction)
      document.removeEventListener("touchstart", handleUserInteraction)
      interactionBoundRef.current = false
    }
  }, [enabled, resumeMusic, pauseMusic])

  const contextValue = useMemo<AudioContextValue>(
    () => ({
      pauseMusic,
      resumeMusic,
      isPlaying,
      isEnabled: enabled,
    }),
    [pauseMusic, resumeMusic, isPlaying, enabled],
  )

  return (
    <AudioContext.Provider value={contextValue}>
      {children}
      {enabled && (
        <audio
          ref={audioRef}
          src={encodeURI(
            "/background_music/Kina Grannis ft. Imaginary Future - I Will Spend My Whole Life Loving You lyrics.mp3",
          )}
          loop
          preload="auto"
          playsInline
          style={{ display: "none" }}
        />
      )}
    </AudioContext.Provider>
  )
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider")
  }
  return context
}


