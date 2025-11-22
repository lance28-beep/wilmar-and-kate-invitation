"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Section } from "@/components/section"
import Image from "next/image"

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: "What is the dress code?",
    answer:
      "We would love to see you in formal attire following our color palette: Sage Green – Dusty Blue – Gray/Silver.",
  },
  {
    question: "When and where is the ceremony?",
    answer:
      "The ceremony is on January 13, 2026 at 4:00 PM at FARM HILLS GARDEN TAGAYTAY - Garden Area.",
  },
  {
    question: "Where is the reception?",
    answer:
      "The reception will follow at 6:00 PM at FARM HILLS GARDEN TAGAYTAY - Pavilion.",
  },
  {
    question: "When is the RSVP deadline?",
    answer:
      "Please confirm your attendance by January 3, 2026. Your response helps us finalize our guest list. Thank you! [RSVP_LINK]Click here to RSVP[/RSVP_LINK]",
  },
  {
    question: "Do you have a gift registry?",
    answer:
      "Your presence is the greatest gift. If you feel inclined to give, we would appreciate monetary gifts given in person so we can thank you personally.",
  },
  {
    question: "Is there parking available?",
    answer:
      "Yes! Ample parking is available at the venue. We recommend arriving 15-20 minutes early to secure a spot.",
  },
  {
    question: "Can I bring a plus one?",
    answer:
      "We kindly ask that any additional guests be included or declared in your RSVP so we can make the proper arrangements. Thank you so much for your understanding — we can't wait to celebrate together on our special day!",
  },
  {
    question: "What if I have dietary restrictions or allergies?",
    answer:
      "Please mention any dietary restrictions, allergies, or special meal requirements in the message field when you submit your RSVP.",
  },
  {
    question: "Can I take photos during the ceremony?",
    answer:
      "We have a professional photographer, but you're welcome to take photos! Please share your photos with us by scanning the QR code in the Snap & Share section.",
  },
  {
    question: "What should I do if I need to cancel my RSVP?",
    answer:
      "Please contact us as soon as possible if your plans change. You can update your RSVP by searching for your name in the RSVP section or contact RIA MANALANSAN (fb) or 09615525606 (viber).",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <Section
      id="faq"
      className="relative bg-[#83927D] py-8 sm:py-10 md:py-14 lg:py-16 xl:py-20 overflow-hidden"
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft gradient overlays */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/15 via-white/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white/15 via-white/5 to-transparent" />
        
        {/* Floating decorative circles */}
        <div className="absolute top-16 right-12 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-32 left-20 w-24 h-24 bg-white/8 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-16 left-20 w-28 h-28 bg-white/12 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-24 right-12 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 z-0">
          <Image
            src="/decoration/corner-left-button.png"
            alt=""
            width={200}
            height={200}
            className="w-24 sm:w-32 md:w-40 lg:w-48 xl:w-56 h-auto opacity-60 scale-y-[-1]"
            priority={false}
          />
        </div>
        
        <div className="absolute top-0 right-0 z-0">
          <Image
            src="/decoration/corner-left-button.png"
            alt=""
            width={200}
            height={200}
            className="w-24 sm:w-32 md:w-40 lg:w-48 xl:w-56 h-auto opacity-60 scale-x-[-1] scale-y-[-1]"
            priority={false}
          />
        </div>
        
        <div className="absolute bottom-0 left-0 z-0">
          <Image
            src="/decoration/corner-left-button.png"
            alt=""
            width={200}
            height={200}
            className="w-24 sm:w-32 md:w-40 lg:w-48 xl:w-56 h-auto opacity-60"
            priority={false}
          />
        </div>
        
        <div className="absolute bottom-0 right-0 z-0">
          <Image
            src="/decoration/corner-left-button.png"
            alt=""
            width={200}
            height={200}
            className="w-24 sm:w-32 md:w-40 lg:w-48 xl:w-56 h-auto opacity-60 scale-x-[-1]"
            priority={false}
          />
        </div>
        
        {/* Decorative horizontal line */}
        <div className="absolute top-1/3 left-0 w-full h-px bg-white/20" />
      </div>

      {/* Section Header */}
      <div className="relative z-10 text-center mb-6 sm:mb-7 md:mb-9 lg:mb-11 px-3 sm:px-4">
        {/* Decorative element above title */}
        <div className="flex items-center justify-center gap-2 mb-2.5 sm:mb-3">
          <div className="w-8 sm:w-12 md:w-16 h-px bg-white/40" />
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          <div className="w-8 sm:w-12 md:w-16 h-px bg-white/40" />
        </div>
        
        <h2 className="imperial-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-white mb-2 sm:mb-3 drop-shadow-lg leading-tight">
          Frequently Asked Questions
        </h2>
        
        <p className="text-xs sm:text-sm md:text-base text-white/90 font-light max-w-xl mx-auto leading-relaxed px-2">
          Everything you need to know
        </p>
        
        {/* Decorative element below subtitle */}
        <div className="flex items-center justify-center gap-2 mt-2.5 sm:mt-3">
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
        </div>
      </div>

      {/* FAQ content */}
      <div className="relative z-10 max-w-4xl mx-auto px-3 sm:px-4 md:px-6">
        {/* Enhanced card with gradient glow */}
        <div className="relative bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden border border-[#869EB6]/40 shadow-2xl hover:shadow-[0_10px_50px_rgba(134,158,182,0.3)] transition-all duration-300 group">
          {/* Subtle glow on hover */}
          <div className="absolute -inset-0.5 bg-gradient-to-br from-[#869EB6]/20 to-[#83927D]/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          
          {/* Decorative corner accents - compact */}
          <div className="absolute top-0.5 left-0.5 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-[#869EB6]/50 rounded-tl-lg" />
          <div className="absolute top-0.5 right-0.5 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-r-2 border-[#869EB6]/50 rounded-tr-lg" />
          <div className="absolute bottom-0.5 left-0.5 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-l-2 border-[#869EB6]/50 rounded-bl-lg" />
          <div className="absolute bottom-0.5 right-0.5 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-[#869EB6]/50 rounded-br-lg" />
          
          {/* FAQ items */}
          <div className="relative p-3 sm:p-4 md:p-5 lg:p-7 z-10">
            <div className="space-y-2">
              {faqItems.map((item, index) => {
                const isOpen = openIndex === index
                const contentId = `faq-item-${index}`
                return (
                  <div
                    key={index}
                    className="rounded-lg border border-[#869EB6]/30 bg-white hover:bg-[#869EB6]/5 transition-all duration-300 hover:shadow-md overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="group w-full px-2.5 sm:px-3 md:px-4 py-2.5 sm:py-3 md:py-3.5 flex items-center justify-between text-left outline-none focus-visible:ring-2 focus-visible:ring-[#869EB6]/50 focus-visible:ring-offset-2 transition-colors"
                      aria-expanded={isOpen}
                      aria-controls={contentId}
                    >
                      <span className="font-semibold text-[#0A3428] pr-2 sm:pr-2.5 text-xs sm:text-sm md:text-base font-sans leading-snug group-hover:text-[#83927D] transition-colors duration-200">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#869EB6] flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        aria-hidden
                      />
                    </button>

                    <div
                      id={contentId}
                      role="region"
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 bg-[#869EB6]/10 border-t border-[#869EB6]/20">
                          {item.answer.includes("[RSVP_LINK]") ? (
                            <p className="text-[#0A3428] leading-relaxed text-[10px] sm:text-xs md:text-sm font-sans whitespace-pre-line">
                              {item.answer.split("[RSVP_LINK]")[0]}
                              <a 
                                href="#guest-list" 
                                className="text-[#83927D] underline font-semibold hover:text-[#869EB6] transition-colors"
                                onClick={(e) => {
                                  e.preventDefault()
                                  document.getElementById('guest-list')?.scrollIntoView({ behavior: 'smooth' })
                                }}
                              >
                                {item.answer.match(/\[RSVP_LINK\](.*?)\[\/RSVP_LINK\]/)?.[1]}
                              </a>
                              {item.answer.split("[/RSVP_LINK]")[1]}
                            </p>
                          ) : (
                            <p className="text-[#0A3428] leading-relaxed text-[10px] sm:text-xs md:text-sm font-sans whitespace-pre-line">
                              {item.answer}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
