"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Section } from "@/components/section"
import { siteConfig } from "@/content/site"
import Image from "next/image"

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: "What is the dress code?",
    answer:
      `We'd love to see you in shades of brown!\n\nFor Guests:\nLadies: Cocktail, midi or maxi dress\nGentlemen: Long sleeved dress shirt and/or coat, slacks. Dressy shoes\n\nFor Principal Sponsors:\nNinang: Long gown or Semi-formal in cream or champagne gold color\nNinong: Barong Tagalog paired with Black slacks\n\nColor Palette: #CCB595, #805640, #D5A98C, #AA7B5F`,
  },
  {
    question: "When and where is the ceremony?",
    answer:
      `The ceremony is on ${siteConfig.ceremony.day}, ${siteConfig.ceremony.date} at ${siteConfig.ceremony.time} at ${siteConfig.ceremony.venue}.\n\nEntourage should arrive by 3:30 PM, and guests by 3:45 PM.`,
  },
  {
    question: "Where is the reception?",
    answer:
      `The reception will follow at ${siteConfig.reception.time} at ${siteConfig.reception.venue}.\n\nBoth the ceremony and reception will be held at the same venue.`,
  },
  {
    question: "When is the RSVP deadline?",
    answer:
      `Please confirm your attendance by ${siteConfig.details.rsvp.deadline}. Your response helps us finalize our guest list. Thank you! [RSVP_LINK]Click here to RSVP[/RSVP_LINK]`,
  },
  {
    question: "Do you have a gift registry?",
    answer:
      "Your presence is the greatest gift. If you feel inclined to give, we would appreciate monetary gifts given in person so we can thank you personally.",
  },
  {
    question: "Is there parking available?",
    answer:
      `Yes! ${siteConfig.wedding.venue} offers ample parking spaces. Kindly arrive 15–20 minutes early to settle in comfortably.`,
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
      className="relative bg-[#58171D] py-8 sm:py-10 md:py-14 lg:py-16 xl:py-20 overflow-hidden"
    >
      {/* Flower decorations - bottom corners only */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Bottom left corner decoration - flipped horizontally */}
        <div className="absolute bottom-0 left-0 z-0">
          <Image
            src="/decoration/right-bottom-corner-flower.png"
            alt=""
            width={200}
            height={200}
            className="w-40 sm:w-48 md:w-52 lg:w-56 xl:w-60 h-auto opacity-80 scale-x-[-1]"
            priority={false}
          />
        </div>
        
        {/* Bottom right corner decoration */}
        <div className="absolute bottom-0 right-0 z-0">
          <Image
            src="/decoration/right-bottom-corner-flower.png"
            alt=""
            width={200}
            height={200}
            className="w-40 sm:w-48 md:w-52 lg:w-56 xl:w-60 h-auto opacity-80"
            priority={false}
          />
        </div>
      </div>

      {/* Header with enhanced decorations */}
      <div className="relative z-10 px-3 sm:px-4 text-center mb-6 sm:mb-8 md:mb-12">
        {/* Decorative element above title */}
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <div className="w-8 sm:w-12 md:w-16 h-px bg-white/40" />
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          <div className="w-8 sm:w-12 md:w-16 h-px bg-white/40" />
        </div>
        
        <h2 className="imperial-script-regular mb-2 sm:mb-3 md:mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-white drop-shadow-lg">
          Frequently Asked Questions
        </h2>
        
        <p className="mx-auto max-w-xl text-xs sm:text-sm md:text-base lg:text-lg font-light leading-relaxed text-white/90 px-2">
          Everything you need to know
        </p>
        
        {/* Decorative element below subtitle */}
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
        </div>
      </div>

      {/* FAQ content */}
      <div className="relative z-10 px-2 sm:px-4">
        <div className="flex justify-center">
          <div className="max-w-4xl w-full">
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

                {/* FAQ items */}
                <div className="relative z-10 space-y-3 sm:space-y-4">
                  {faqItems.map((item, index) => {
                    const isOpen = openIndex === index
                    const contentId = `faq-item-${index}`
                    return (
                      <div
                        key={index}
                        className="rounded-lg sm:rounded-xl border-2 border-[#B08981]/30 bg-white/40 hover:bg-white/60 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-lg hover:border-[#B08981]/50"
                      >
                        <button
                          onClick={() => toggleItem(index)}
                          className="group w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left outline-none focus-visible:ring-2 focus-visible:ring-[#B08981]/50 focus-visible:ring-offset-2 rounded-t-lg sm:rounded-t-xl transition-colors hover:bg-[#B08981]/5"
                          aria-expanded={isOpen}
                          aria-controls={contentId}
                        >
                          <span className="font-semibold text-[#5A1422] pr-4 text-sm sm:text-base md:text-lg font-sans leading-relaxed">
                            {item.question}
                          </span>
                          <ChevronDown
                            size={20}
                            className={`text-[#B08981] flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""} sm:w-6 sm:h-6`}
                            aria-hidden
                          />
                        </button>

                        <div
                          id={contentId}
                          role="region"
                          className={`grid transition-all duration-300 ease-out rounded-b-lg sm:rounded-b-xl ${
                            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-br from-[#B08981]/10 to-[#EFBFBB]/10 border-t-2 border-[#B08981]/30">
                              {item.answer.includes("[COLOR_PALETTE]") ? (
                                <div className="space-y-3 sm:space-y-4">
                                  <p className="text-[#5A1422] leading-relaxed text-sm sm:text-base md:text-lg font-sans">
                                    Theme: Classic. Motif: Elegant Earth Tones.
                                  </p>
                                  <div>
                                    <p className="text-[#5A1422] font-semibold text-xs sm:text-sm mb-3 font-sans">
                                      Color Palette:
                                    </p>
                                    <div className="flex gap-2 sm:gap-3 flex-wrap items-center">
                                      {[
                                        { color: "#666956", label: "Sage Green" },
                                        { color: "#8D8E7C", label: "Muted Olive" },
                                        { color: "#B08981", label: "Dusty Rose" },
                                        { color: "#EFBFBB", label: "Blush Pink" },
                                        { color: "#FFE5E4", label: "Soft Peach" },
                                      ].map(({ color, label }) => (
                                        <div
                                          key={label}
                                          className="flex items-center gap-2 bg-white/60 px-3 py-2 rounded-lg border border-[#B08981]/30 shadow-sm"
                                        >
                                          <div
                                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-md border-2 border-white ring-2 ring-[#B08981]/20"
                                            style={{ backgroundColor: color }}
                                            title={label}
                                          />
                                          <span className="text-xs sm:text-sm text-[#5A1422] font-medium font-sans">{label}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              ) : item.answer.includes("[RSVP_LINK]") ? (
                                <p className="text-[#5A1422] leading-relaxed text-sm sm:text-base md:text-lg font-sans whitespace-pre-line">
                                  {item.answer.split("[RSVP_LINK]")[0]}
                                  <a
                                    href="#guest-list"
                                    className="text-[#B08981] underline font-semibold hover:text-[#EFBFBB] transition-colors"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      document.getElementById("guest-list")?.scrollIntoView({ behavior: "smooth" })
                                    }}
                                  >
                                    {item.answer.match(/\[RSVP_LINK\](.*?)\[\/RSVP_LINK\]/)?.[1]}
                                  </a>
                                  {item.answer.split("[/RSVP_LINK]")[1]}
                                </p>
                              ) : (
                                <p className="text-[#5A1422] leading-relaxed text-sm sm:text-base md:text-lg font-sans whitespace-pre-line">
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

                {/* Sparkle accents */}
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-2 h-2 sm:w-3 sm:h-3 bg-[#EFBFBB] rounded-full animate-ping opacity-80 shadow-lg" />
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#B08981] rounded-full animate-pulse opacity-70 shadow-md" />
                <div className="absolute top-1/2 left-1 sm:left-2 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#FFE5E4] rounded-full animate-pulse opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
