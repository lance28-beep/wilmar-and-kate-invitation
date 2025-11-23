"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { siteConfig } from "@/content/site"
import StaggeredMenu from "./StaggeredMenu"

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#countdown", label: "Countdown" },
  { href: "#gallery", label: "Gallery" },
  { href: "#messages", label: "Messages" },
  { href: "#details", label: "Details" },
  { href: "#entourage", label: "Entourage" },
  { href: "#sponsors", label: "Sponsors" },
  { href: "#guest-list", label: "RSVP" },
  { href: "#registry", label: "Registry" },
  { href: "#faq", label: "FAQ" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("#home")

  const rafIdRef = useRef<number | null>(null)

  useEffect(() => {
    const onScroll = () => {
      if (rafIdRef.current != null) return
      rafIdRef.current = window.requestAnimationFrame(() => {
        rafIdRef.current = null
        setIsScrolled(window.scrollY > 50)
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current)
      window.removeEventListener("scroll", onScroll as EventListener)
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    const sectionIds = navLinks.map(l => l.href.substring(1))
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio - a.intersectionRatio))
        if (visible.length > 0) {
          const topMost = visible[0]
          if (topMost.target && topMost.target.id) {
            const newActive = `#${topMost.target.id}`
            setActiveSection(prev => (prev === newActive ? prev : newActive))
          }
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -70% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1]
      }
    )

    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const menuItems = useMemo(() => navLinks.map((l) => ({ label: l.label, ariaLabel: `Go to ${l.label}`, link: l.href })), [])

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-700 ease-out ${
      isScrolled 
        ? 'bg-[#904945]/95 backdrop-blur-xl shadow-[0_8px_25px_rgba(46,11,15,0.35)] border-b border-[#E6CFC9]/60' 
        : 'bg-[#904945]/85 backdrop-blur-lg border-b border-[#E6CFC9]/40'
    }`}>
      {/* Subtle romantic veil to keep text crisp */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#E6CFC9]/20 via-transparent to-[#E6CFC9]/15 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#A1857A]/15 to-[#A1857A]/25 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 relative">
        <div className="flex justify-between items-center h-12 sm:h-20">
          <Link href="#home" className="flex-shrink-0 group relative z-10">
            <div className="flex items-center gap-3 sm:gap-4">
              <Image
                src="/decoration/Monogram.png"
                alt={`${siteConfig.couple.groomNickname} and ${siteConfig.couple.brideNickname} monogram`}
                width={48}
                height={48}
                priority
                className="object-contain w-8 h-8 sm:w-10 sm:h-10 brightness-0 invert drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
              />
              <div className="flex flex-col">
                <div className="alex-brush-regular text-lg sm:text-2xl md:text-3xl font-medium text-white tracking-wide transition-colors duration-500 group-hover:text-[#E6CFC9]">
                  {siteConfig.couple.groomNickname} & {siteConfig.couple.brideNickname}
                </div>
                <div className="text-[9px] sm:text-xs font-sans tracking-[0.18em] text-[#E6CFC9]/90 uppercase">
                  {siteConfig.ceremony.date}
                </div>
              </div>
            </div>
            <div className="absolute -inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-[#E6CFC9]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Link>

          <div className="hidden md:flex gap-1 items-center">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium rounded-lg transition-all duration-500 relative group drop-shadow-md ${
                    isActive 
                      ? 'text-white bg-gradient-to-br from-[#58171D]/60 via-[#904945]/50 to-[#A1857A]/40 backdrop-blur-md shadow-[0_4px_18px_rgba(46,11,15,0.4)] border border-[#E6CFC9]/60' 
                      : 'text-slate-100/90 hover:text-white hover:bg-gradient-to-br hover:from-[#58171D]/35 hover:via-[#904945]/30 hover:to-[#A1857A]/20 hover:border hover:border-[#E6CFC9]/50 hover:backdrop-blur-md hover:shadow-[0_6px_18px_rgba(46,11,15,0.35)] hover:scale-[1.03] active:scale-95'
                  }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#58171D] via-[#E6CFC9] to-[#904945] transition-all duration-500 rounded-full ${
                    isActive ? 'w-full shadow-[0_0_10px_rgba(230,207,201,0.8)]' : 'w-0 group-hover:w-full group-hover:shadow-[0_0_8px_rgba(230,207,201,0.6)]'
                  }`} />
                  {isActive && (
                    <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-white/90 animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#58171D]/0 via-[#2E0B0F]/15 to-[#904945]/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                </Link>
              )
            })}
          </div>

          <div className="md:hidden absolute right-2 top-0 z-20">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-[#904945]/30 via-[#E6CFC9]/20 to-transparent blur-lg pointer-events-none" />
            <div className="absolute inset-0 rounded-full ring-1 ring-white/40 pointer-events-none" />
            <StaggeredMenu
              position="left"
              items={menuItems}
              socialItems={[]}
              displaySocials={false}
              displayItemNumbering={true}
              menuButtonColor="#FFFFFF"
              openMenuButtonColor="#E6CFC9"
              changeMenuColorOnOpen={true}
              colors={["#904945", "#58171D", "#A1857A", "#E6CFC9", "#FFFFFF"]}
              accentColor="#904945"
              isFixed={true}
              onMenuOpen={() => {}}
              onMenuClose={() => {}}
            />
          </div>
        </div>

      </div>
    </nav>
  )
}
