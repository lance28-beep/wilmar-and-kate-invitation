"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Heart, MessageCircle, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"

interface Message {
  timestamp: string
  name: string
  message: string
}

interface MessageWallDisplayProps {
  messages: Message[]
  loading: boolean
}

export default function MessageWallDisplay({ messages, loading }: MessageWallDisplayProps) {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (messages.length > 0) {
      setIsAnimating(true)
      // Stagger the animation of messages
      const timer = setTimeout(() => {
        setVisibleMessages(messages)
        setIsAnimating(false)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setVisibleMessages([])
    }
  }, [messages])

  if (loading) {
    return (
      <div className="space-y-2 sm:space-y-2.5 md:space-y-3 lg:space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border border-[#821D30]/30 shadow-md bg-white/95 backdrop-blur-sm">
            <CardContent className="p-2.5 sm:p-3 md:p-4 lg:p-5">
              <div className="flex justify-between items-start mb-1.5 sm:mb-2 md:mb-3">
                <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3">
                  <Skeleton className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full" />
                  <div className="space-y-1 sm:space-y-1.5">
                    <Skeleton className="h-2.5 sm:h-3 md:h-4 w-16 sm:w-20 md:w-24 lg:w-32" />
                    <Skeleton className="h-2 sm:h-2.5 md:h-3 w-12 sm:w-16 md:w-20 lg:w-24" />
                  </div>
                </div>
              </div>
              <Skeleton className="h-10 sm:h-12 md:h-16 lg:h-20 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-6 sm:py-8 md:py-12 lg:py-16 px-2 sm:px-3 md:px-4">
        <div className="relative inline-block mb-3 sm:mb-4 md:mb-6 lg:mb-8">
          <div className="absolute inset-0 bg-[#821D30]/20 rounded-full blur-xl scale-150 animate-pulse"></div>
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-[#821D30] rounded-full flex items-center justify-center mx-auto">
            <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 text-white" />
          </div>
        </div>
        <h3 className="text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-playfair font-bold text-[#FFFFFF] mb-1.5 sm:mb-2 md:mb-3 lg:mb-4">
          No Messages Yet
        </h3>
        <p className="text-[11px] sm:text-xs md:text-sm lg:text-base xl:text-lg text-[#FFFFFF]/90 font-lora max-w-md mx-auto leading-relaxed px-1 sm:px-2">
          Be the first to share your heartfelt wishes for the happy couple!
        </p>
        <div className="mt-3 sm:mt-4 md:mt-6 lg:mt-8 flex justify-center">
          <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 text-[#B88A93]/80">
            <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 animate-pulse" />
            <span className="text-[10px] sm:text-[11px] md:text-xs lg:text-sm font-lora text-[#FFFFFF]/85">Your message will appear here</span>
            <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 animate-pulse" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2 sm:space-y-2.5 md:space-y-3 lg:space-y-4">
      {visibleMessages.map((msg, index) => (
        <Card
          key={index}
          className={`relative border-2 border-[#821D30]/40 shadow-[0_6px_24px_rgba(134,158,182,0.15)] bg-white/95 backdrop-blur-sm hover:shadow-[0_10px_32px_rgba(134,158,182,0.25)] transition-all duration-500 group overflow-hidden transform rounded-lg sm:rounded-xl md:rounded-2xl ${
            isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
          style={{
            transitionDelay: `${index * 100}ms`,
            animation: isAnimating ? 'none' : 'fadeInUp 0.6s ease-out forwards'
          }}
        >
          {/* Card background effects */}
          <div className="absolute inset-0 bg-[#821D30]/5 group-hover:bg-[#821D30]/8 transition-all duration-300"></div>
          <div className="absolute top-0 left-0 w-full h-0.5 sm:h-1 bg-[#B88A93] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          
          <CardContent className="relative p-2.5 sm:p-3 md:p-4 lg:p-5">
            <div className="flex justify-between items-start mb-1.5 sm:mb-2 md:mb-3">
              <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3 min-w-0 flex-1">
                <div className="relative flex-shrink-0">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-[#821D30] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <span className="text-white font-lora text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-semibold tracking-wide">
                      {msg.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </span>
                  </div>
                  {/* Avatar glow effect - hidden on mobile */}
                  <div className="hidden sm:block absolute inset-0 bg-[#821D30]/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-lora text-foreground text-[11px] sm:text-xs md:text-sm lg:text-base font-semibold truncate leading-tight">{msg.name}</h4>
                  <span className="text-[9px] sm:text-[10px] md:text-[11px] lg:text-xs text-foreground/60 font-lora">
                    {new Date(msg.timestamp).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-0.5 sm:gap-1 md:gap-1.5 flex-shrink-0">
                <Heart className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4 text-[#B88A93]/70 fill-[#B88A93]/20 group-hover:fill-[#B88A93]/40 group-hover:text-[#B88A93] transition-all duration-300" />
                <Sparkles className="h-2 w-2 sm:h-2.5 sm:w-2.5 md:h-3 md:w-3 lg:h-3.5 lg:w-3.5 text-[#821D30]/70 group-hover:text-[#821D30] transition-colors duration-300" />
              </div>
            </div>
            
            <div className="relative">
              <span className="absolute -left-0.5 -top-0.5 sm:-left-1 sm:-top-1 md:-left-1.5 md:-top-1.5 text-sm sm:text-base md:text-xl lg:text-2xl text-[#821D30]/30 font-playfair group-hover:text-[#821D30]/50 transition-colors duration-300">"</span>
              <p className="text-foreground/80 text-[11px] sm:text-[12px] md:text-[13px] lg:text-sm leading-relaxed pl-2.5 sm:pl-3 md:pl-4 lg:pl-5 pr-1.5 sm:pr-2 md:pr-0 font-lora group-hover:text-foreground/90 transition-colors duration-300">{msg.message}</p>
              <span className="absolute -right-0.5 -bottom-0.5 sm:-right-1 sm:-bottom-1 md:-right-1.5 md:-bottom-1.5 text-sm sm:text-base md:text-xl lg:text-2xl text-[#821D30]/30 font-playfair group-hover:text-[#821D30]/50 transition-colors duration-300">"</span>
            </div>
            
            {/* Message bottom accent */}
            <div className="mt-1.5 sm:mt-2 md:mt-2.5 lg:mt-3 flex justify-end">
              <div className="w-6 sm:w-8 md:w-10 lg:w-12 h-0.5 bg-[#B88A93]/40 group-hover:bg-[#B88A93]/60 transition-colors duration-300"></div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
