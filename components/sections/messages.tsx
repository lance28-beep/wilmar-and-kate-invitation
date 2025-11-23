"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { MessageCircle, Heart, Sparkles, Send } from "lucide-react"
import { Section } from "@/components/section"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import MessageWallDisplay from "./message-wall-display"

interface Message {
  timestamp: string
  name: string
  message: string
}

interface MessageFormProps {
  onSuccess?: () => void
  onMessageSent?: () => void
}

function MessageForm({ onSuccess, onMessageSent }: MessageFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [nameValue, setNameValue] = useState("")
  const [messageValue, setMessageValue] = useState("")
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const message = formData.get("message") as string

    const googleFormData = new FormData()
    googleFormData.append("entry.405401269", name)
    googleFormData.append("entry.893740636", message)

    try {
      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSf1Lo2M_Y3RoCI2vwjAhub6Kdd5SpVvvpw4erFYdgrjD_fFUw/formResponse",
        {
          method: "POST",
          mode: "no-cors",
          body: googleFormData,
        }
      )

      toast({
        title: "Message Sent! 💌",
        description: "Your heartfelt wishes have been delivered",
        duration: 3000,
      })

      setIsSubmitted(true)
      setNameValue("")
      setMessageValue("")
      formRef.current?.reset()
      
      // Reset submitted state after animation
      setTimeout(() => setIsSubmitted(false), 1000)
      
      if (onSuccess) onSuccess()
      if (onMessageSent) onMessageSent()
    } catch (error) {
      toast({
        title: "Unable to send message",
        description: "Please try again in a moment",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative w-full max-w-md sm:max-w-lg mx-auto px-2 sm:px-3 md:px-0">
      {/* Enhanced decorative background elements - hidden on mobile */}
      <div className="hidden sm:block absolute -top-4 -left-4 w-8 h-8 bg-[#904945]/20 rounded-full blur-sm animate-pulse sm:w-12 sm:h-12 sm:-top-6 sm:-left-6"></div>
      <div className="hidden sm:block absolute -bottom-4 -right-4 w-12 h-12 bg-[#A1857A]/15 rounded-full blur-md animate-pulse sm:w-16 sm:h-16 sm:-bottom-6 sm:-right-6"></div>
      
      <Card className={`relative w-full border-2 shadow-[0_8px_32px_rgba(144,73,69,0.18)] bg-white/95 backdrop-blur-md transition-all duration-500 group overflow-hidden rounded-xl sm:rounded-2xl ${
        isFocused ? 'scale-[1.02] border-[#904945] bg-white' : 'border-[#904945]/40 hover:border-[#904945]/60 hover:bg-white'
      } ${isSubmitted ? 'animate-bounce' : ''}`}>
        {/* Subtle background overlay */}
        <div className="absolute inset-0 bg-[#904945]/5"></div>
        
        {/* Animated shine effect */}
        <div className="absolute inset-0 bg-[#904945]/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        
        {/* Success animation overlay */}
        {isSubmitted && (
          <div className="absolute inset-0 bg-[#A1857A]/20 flex items-center justify-center z-20 pointer-events-none">
            <div className="flex flex-col items-center gap-2 animate-pulse">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#904945] rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <p className="text-[#904945] font-semibold text-sm sm:text-lg">Sent!</p>
            </div>
          </div>
        )}
        
        <CardContent className="relative p-4 sm:p-5 md:p-7 lg:p-9">
          {/* Header with icon - Compact on mobile */}
          <div className="text-center mb-4 sm:mb-6 md:mb-8">
            <div className="relative inline-block mb-2 sm:mb-3 md:mb-4">
              <div className="absolute inset-0 bg-[#904945]/20 rounded-full blur-lg scale-150"></div>
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-[#904945] rounded-full flex items-center justify-center mx-auto shadow-lg">
                <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white" />
              </div>
            </div>
            <h3 className="text-sm sm:text-base md:text-xl font-playfair font-bold text-foreground mb-1 sm:mb-1.5 md:mb-2">
              Share Your Love
            </h3>
            <p className="text-[10px] sm:text-xs md:text-sm text-foreground/70 font-lora px-1 sm:px-2 md:px-0">
              Your message will be treasured forever
            </p>
          </div>

          <form 
            ref={formRef} 
            onSubmit={handleSubmit} 
            className="space-y-3 sm:space-y-4 md:space-y-6"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            {/* Name Field */}
            <div className="space-y-1 sm:space-y-1.5 md:space-y-3">
              <label className="block text-[11px] sm:text-xs md:text-sm font-medium text-foreground font-lora flex items-center gap-1.5 sm:gap-2">
                <div className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-[#904945]/20 rounded-full flex items-center justify-center transition-all duration-300 ${
                  focusedField === 'name' ? 'scale-110 bg-[#904945]/30' : ''
                }`}>
                  <Heart className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 text-[#904945]" />
                </div>
                Your Name
              </label>
              <div className="relative">
                <Input
                  name="name"
                  required
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your name"
                  className={`w-full border-2 rounded-lg sm:rounded-xl py-2 sm:py-2.5 md:py-3.5 px-3 sm:px-3.5 md:px-5 text-xs sm:text-sm md:text-base font-lora placeholder:text-foreground/50 transition-all duration-300 bg-white backdrop-blur-sm shadow-sm hover:shadow-md focus:shadow-lg ${
                    focusedField === 'name' 
                      ? 'border-[#904945] focus:border-[#904945] focus:ring-2 sm:focus:ring-4 focus:ring-[#904945]/20 shadow-lg' 
                      : 'border-[#904945]/30 hover:border-[#904945]/50'
                  }`}
                />
                {nameValue && (
                  <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#904945] rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Message Field */}
            <div className="space-y-1 sm:space-y-1.5 md:space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-[11px] sm:text-xs md:text-sm font-medium text-foreground font-lora flex items-center gap-1.5 sm:gap-2">
                  <div className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-[#904945]/20 rounded-full flex items-center justify-center transition-all duration-300 ${
                    focusedField === 'message' ? 'scale-110 bg-[#904945]/30' : ''
                  }`}>
                    <MessageCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 text-[#904945]" />
                  </div>
                  Your Message
                </label>
                {messageValue && (
                  <span className={`text-[10px] sm:text-[11px] md:text-xs font-lora transition-colors ${
                    messageValue.length > 500 ? 'text-red-500' : 'text-foreground/50'
                  }`}>
                    {messageValue.length}/500
                  </span>
                )}
              </div>
              <div className="relative">
                <Textarea
                  name="message"
                  required
                  value={messageValue}
                  onChange={(e) => {
                    if (e.target.value.length <= 500) {
                      setMessageValue(e.target.value)
                    }
                  }}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Share your love, memories, or well wishes..."
                  className={`w-full border-2 rounded-lg sm:rounded-xl min-h-[80px] sm:min-h-[90px] md:min-h-[120px] text-xs sm:text-sm md:text-base font-lora placeholder:text-foreground/50 transition-all duration-300 resize-none bg-white backdrop-blur-sm shadow-sm hover:shadow-md focus:shadow-lg py-2 sm:py-2.5 md:py-4 px-3 sm:px-3.5 md:px-5 ${
                    focusedField === 'message' 
                      ? 'border-[#904945] focus:border-[#904945] focus:ring-2 sm:focus:ring-4 focus:ring-[#904945]/20 shadow-lg' 
                      : 'border-[#904945]/30 hover:border-[#904945]/50'
                  }`}
                />
                {messageValue && (
                  <div className="absolute right-2 sm:right-3 top-2 sm:top-3">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#904945] rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting || !nameValue.trim() || !messageValue.trim()}
              className="w-full bg-[#904945] hover:bg-[#904945]/90 text-[#FFFFFF] py-2 sm:py-2.5 md:py-4 px-4 sm:px-5 md:px-8 rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-lora font-semibold shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group border border-[#A1857A]/30"
              style={{ backgroundColor: '#904945' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#904945'
                e.currentTarget.style.opacity = '0.9'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#904945'
                e.currentTarget.style.opacity = '1'
              }}
            >
              {/* Button background animation */}
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-1.5 sm:gap-2 relative z-10">
                  <svg className="animate-spin h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span className="text-xs sm:text-sm md:text-base">Sending...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center gap-1.5 sm:gap-2 relative z-10">
                  <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                  <span className="text-xs sm:text-sm md:text-base">Send Message</span>
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export function Messages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  const fetchMessages = useCallback(() => {
    setLoading(true)
    fetch(
      "https://script.google.com/macros/s/AKfycbyRxxVD7pUycZ7pheaeacubp8AVb6eJ9MD7A1QOOsKkWkuQvCR5Z3hAnYlXwe8_apV4jA/exec"
    )
      .then((res) => res.json())
      .then((data) => {
        const rows: string[][] = data.GoogleSheetData
        const [header, ...entries] = rows
        const idxName = header.findIndex((h: string) => h.toLowerCase().includes("name"))
        const idxMsg = header.findIndex((h: string) => h.toLowerCase().includes("message"))
        const idxTime = header.findIndex((h: string) => h.toLowerCase().includes("timestamp"))
        const parsed = entries
          .map((row: string[]) => ({
            timestamp: row[idxTime],
            name: row[idxName],
            message: row[idxMsg],
          }))
          .reverse()
        setMessages(parsed)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Failed to fetch messages:", error)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  return (
    <Section id="messages" bgColor="sand">
      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {/* Floating soft glows - hidden on mobile for compactness */}
          <div className="hidden sm:block absolute -top-6 -left-6 w-24 h-24 bg-[#904945]/10 rounded-full blur-2xl animate-pulse" />
          <div className="hidden sm:block absolute top-10 right-0 w-20 h-20 bg-[#A1857A]/15 rounded-full blur-xl animate-pulse delay-1000" />
          <div className="hidden sm:block absolute bottom-10 left-10 w-28 h-28 bg-[#904945]/8 rounded-full blur-2xl animate-pulse delay-2000" />

          {/* Gradient lines - hidden on mobile */}
          <div className="hidden sm:block absolute top-1/3 left-0 w-full h-px bg-[#904945]/25" />
          <div className="hidden sm:block absolute bottom-1/4 left-0 w-full h-px bg-[#A1857A]/20" />
        </div>
        
        {/* Header Section - Compact on mobile */}
        <div className="text-center mb-5 sm:mb-6 md:mb-8 lg:mb-12">
          <h2 className="imperial-script-regular text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal text-white mb-2 sm:mb-3 md:mb-4 lg:mb-6 text-balance drop-shadow-lg">
            Love Messages
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-playfair font-bold text-white mb-1.5 sm:mb-2 md:mb-3">
              Share Your Heartfelt Wishes
            </h3>
            <p className="text-[11px] sm:text-xs md:text-sm lg:text-base text-white/80 font-lora leading-relaxed max-w-2xl mx-auto px-2 sm:px-3 md:px-4">
              Your messages of love and joy will be treasured forever.
            </p>
          </div>
        </div>

        {/* Form Section - Compact spacing */}
        <div className="flex justify-center mb-6 sm:mb-8 md:mb-12 lg:mb-16">
          <div className="relative max-w-2xl w-full">
            {/* Card halo - hidden on mobile */}
            <div className="hidden sm:block absolute -inset-3 bg-[#904945]/15 rounded-3xl blur-2xl opacity-70" />
            <div className="hidden sm:block absolute -inset-1 bg-[#A1857A]/10 rounded-3xl blur-md opacity-80" />
            <MessageForm onMessageSent={fetchMessages} />
          </div>
        </div>

        {/* Messages Display Section - Compact spacing */}
        <div className="relative max-w-5xl mx-auto">
          {/* Top corner accents - hidden on mobile */}
          <div className="hidden sm:block absolute -top-3 -left-3 w-4 h-4 bg-[#904945] rounded-full blur-sm opacity-70" />
          <div className="hidden sm:block absolute -top-3 -right-3 w-4 h-4 bg-[#A1857A] rounded-full blur-sm opacity-70" />
          
          <div className="text-center mb-5 sm:mb-6 md:mb-8 lg:mb-10">
            <div className="relative inline-block mb-2 sm:mb-3 md:mb-4 lg:mb-5">
              <div className="absolute inset-0 bg-[#904945]/20 rounded-full blur-xl scale-150"></div>
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-[#904945] rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 text-white" />
              </div>
            </div>
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-playfair font-bold text-white mb-1 sm:mb-1.5 md:mb-2">
              Messages from Loved Ones
            </h3>
            <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-white/70 font-lora max-w-2xl mx-auto px-2 sm:px-3 md:px-4">
              Read the beautiful messages shared by family and friends
            </p>
          </div>
          
          <MessageWallDisplay messages={messages} loading={loading} />
        </div>

      </div>
    </Section>
  )
}
