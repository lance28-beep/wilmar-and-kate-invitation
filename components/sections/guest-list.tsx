"use client"

import { useState, useEffect, useRef } from "react"
import { Section } from "@/components/section"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import {
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Mail,
  MessageSquare,
  RefreshCw,
  X,
  Heart,
  Sparkles,
  Phone,
  UserPlus,
} from "lucide-react"

interface Guest {
  Name: string
  Email: string
  RSVP: string
  Guest: string
  Message: string
}

export function GuestList() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [filteredGuests, setFilteredGuests] = useState<Guest[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [requestSuccess, setRequestSuccess] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [hasResponded, setHasResponded] = useState(false)
  const [showRequestModal, setShowRequestModal] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    RSVP: "",
    Guest: "1",
    Message: "",
  })

  // Request form state
  const [requestFormData, setRequestFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Guest: "1",
    Message: "",
  })

  const searchRef = useRef<HTMLDivElement>(null)

  // Fetch all guests on component mount
  useEffect(() => {
    fetchGuests()
  }, [])

  // Filter guests based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredGuests([])
      setIsSearching(false)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = guests.filter((guest) =>
      guest.Name.toLowerCase().includes(query)
    )

    setFilteredGuests(filtered)
    setIsSearching(filtered.length > 0)
  }, [searchQuery, guests])

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearching(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const fetchGuests = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/guests")
      if (!response.ok) {
        throw new Error("Failed to fetch guests")
      }
      const data = await response.json()
      setGuests(data)
    } catch (error) {
      console.error("Error fetching guests:", error)
      setError("Failed to load guest list")
      setTimeout(() => setError(null), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearchSelect = (guest: Guest) => {
    setSelectedGuest(guest)
    setSearchQuery(guest.Name)
    setIsSearching(false)
    
    // Set form data with existing guest info
    setFormData({
      Name: guest.Name,
      Email: guest.Email && guest.Email !== "Pending" ? guest.Email : "",
      RSVP: guest.RSVP || "",
      Guest: guest.Guest && guest.Guest !== "" ? guest.Guest : "1",
      Message: guest.Message || "",
    })
    
    // Check if guest has already responded
    setHasResponded(!!(guest.RSVP && guest.RSVP.trim() !== ""))
    
    // Show modal
    setShowModal(true)
  }

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitRSVP = async () => {
    if (!selectedGuest) return

    if (!formData.RSVP) {
      setError("Please select if you can attend")
      setTimeout(() => setError(null), 5000)
      return
    }

    // Validate guest count if attending
    if (formData.RSVP === "Yes" && (!formData.Guest || parseInt(formData.Guest) < 1)) {
      setError("Please enter the number of guests (minimum 1)")
      setTimeout(() => setError(null), 5000)
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch("/api/guests", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "update",
          originalName: selectedGuest.Name,
          Name: formData.Name,
          Email: formData.Email || "Pending",
          RSVP: formData.RSVP,
          Guest: formData.RSVP === "Yes" ? (formData.Guest || "1") : "0",
          Message: formData.Message,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit RSVP")
      }

      // Show success and close modal after delay
      setSuccess("Thank you for your response!")
      setHasResponded(true)
      
      // Trigger event to refresh Book of Guests
      window.dispatchEvent(new Event("rsvpUpdated"))
      
      // Close modal and reset after showing success
      setTimeout(() => {
        setShowModal(false)
        setSearchQuery("")
        setSelectedGuest(null)
        setSuccess(null)
        fetchGuests()
      }, 3000)
    } catch (error) {
      console.error("Error submitting RSVP:", error)
      setError("Failed to submit RSVP. Please try again.")
      setTimeout(() => setError(null), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedGuest(null)
    setSearchQuery("")
    setFormData({ Name: "", Email: "", RSVP: "", Guest: "1", Message: "" })
    setHasResponded(false)
    setError(null)
  }

  const handleSubmitRequest = async () => {
    if (!requestFormData.Name) {
      setError("Name is required")
      setTimeout(() => setError(null), 5000)
      return
    }

    setIsLoading(true)
    setError(null)
    setRequestSuccess(null)

    try {
      const response = await fetch("/api/guest-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestFormData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit request")
      }

      setRequestSuccess("Request submitted! We'll review and get back to you.")
      
      // Close modal and reset after showing success
      setTimeout(() => {
        setShowRequestModal(false)
        setRequestFormData({ Name: "", Email: "", Phone: "", Guest: "1", Message: "" })
        setSearchQuery("")
        setRequestSuccess(null)
      }, 3000)
    } catch (error) {
      console.error("Error submitting request:", error)
      setError("Failed to submit request. Please try again.")
      setTimeout(() => setError(null), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseRequestModal = () => {
    setShowRequestModal(false)
    setRequestFormData({ Name: "", Email: "", Phone: "", Guest: "1", Message: "" })
    setError(null)
    setRequestSuccess(null)
  }

  return (
    <Section id="guest-list" className="relative z-[60] isolate py-8 sm:py-10 md:py-14 lg:py-16 xl:py-20 bg-[#869EB6] overflow-visible">
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
          You Are Invited
        </h2>
        
        <p className="text-xs sm:text-sm md:text-base text-white/90 font-light max-w-xl mx-auto leading-relaxed px-2">
          Please search for your name below to confirm your attendance
        </p>
        <p className="text-[10px] sm:text-xs text-white/70 font-light max-w-2xl mx-auto mt-1.5 sm:mt-2 px-2">
          Reply requested on or before January 13, 2026 • Contact: RIA MANALANSAN (fb) or 09615525606 (viber)
        </p>
        
        {/* Decorative element below subtitle */}
        <div className="flex items-center justify-center gap-2 mt-2.5 sm:mt-3">
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
        </div>
      </div>

      {/* Search Section */}
      <div className="relative z-10 max-w-3xl mx-auto px-3 sm:px-4 md:px-6">
        {/* Enhanced card with gradient glow */}
        <div className="relative bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-visible border border-[#83927D]/40 shadow-2xl hover:shadow-[0_10px_50px_rgba(131,146,125,0.3)] transition-all duration-300 group" style={{ overflow: 'visible' }}>
          {/* Subtle glow on hover */}
          <div className="absolute -inset-0.5 bg-gradient-to-br from-[#83927D]/20 to-[#869EB6]/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          
          {/* Decorative corner accents - compact */}
          <div className="absolute top-0.5 left-0.5 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-[#83927D]/50 rounded-tl-lg" />
          <div className="absolute top-0.5 right-0.5 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-r-2 border-[#83927D]/50 rounded-tr-lg" />
          <div className="absolute bottom-0.5 left-0.5 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-l-2 border-[#83927D]/50 rounded-bl-lg" />
          <div className="absolute bottom-0.5 right-0.5 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-[#83927D]/50 rounded-br-lg" />
          
          {/* Card content */}
          <div className="relative p-3 sm:p-4 md:p-6 lg:p-8 z-10">
            <div className="relative z-10 space-y-4 sm:space-y-5">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-gradient-to-br from-[#83927D] to-[#869EB6] p-1.5 sm:p-2 rounded-lg shadow-md">
                  <Search className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div>
                  <label className="block text-sm sm:text-base font-semibold text-[#0A3428] font-sans mb-0.5">
                    Find Your Name
                  </label>
                  <p className="text-[10px] sm:text-xs text-[#0A3428]/70 font-sans">
                    Type as you search to see instant results
                  </p>
                </div>
              </div>
              <div ref={searchRef} className="relative overflow-visible" style={{ zIndex: 50 }}>
                <div className="relative">
                  <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#83927D]/60 pointer-events-none transition-colors duration-200" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Type your name..."
                    className="w-full pl-9 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3.5 border-2 border-[#83927D]/30 focus:border-[#83927D] rounded-lg sm:rounded-xl text-sm sm:text-base font-sans placeholder:text-[#0A3428]/40 transition-all duration-300 hover:border-[#83927D]/50 focus:ring-4 focus:ring-[#83927D]/10 bg-white shadow-inner focus:shadow-lg"
                  />
                </div>
                {/* Autocomplete dropdown */}
                {isSearching && filteredGuests.length > 0 && (
                  <div 
                    className="absolute z-50 w-full mt-1.5 sm:mt-2 bg-white/95 backdrop-blur-lg border border-[#83927D]/30 rounded-lg shadow-2xl overflow-hidden" 
                    style={{ 
                      position: 'absolute', 
                      top: '100%',
                      zIndex: 50
                    }}
                  >
                    <div className="relative">
                      {filteredGuests.map((guest, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearchSelect(guest)}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-left hover:bg-[#83927D]/10 active:bg-[#83927D]/20 transition-all duration-200 flex items-center gap-2 sm:gap-3 border-b border-[#C1C1C1]/20 last:border-b-0 group"
                        >
                          <div className="relative flex-shrink-0">
                            <div className="bg-gradient-to-br from-[#83927D] to-[#869EB6] p-1.5 rounded-full shadow-md group-hover:shadow-lg transition-all duration-300">
                              <User className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-xs sm:text-sm text-[#0A3428] group-hover:text-[#83927D] transition-colors duration-200 truncate">
                              {guest.Name}
                            </div>
                            {guest.Email && guest.Email !== "Pending" && (
                              <div className="text-[9px] sm:text-[10px] text-[#0A3428]/60 truncate mt-0.5">
                                {guest.Email}
                              </div>
                            )}
                          </div>
                          <div className="text-[#83927D]/40 group-hover:text-[#83927D] group-hover:translate-x-1 transition-all duration-200 flex-shrink-0">
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {searchQuery && filteredGuests.length === 0 && (
                  <div 
                    className="absolute z-50 w-full mt-1.5 sm:mt-2 bg-white/95 backdrop-blur-lg border border-[#83927D]/30 rounded-lg shadow-2xl overflow-hidden" 
                    style={{ 
                      position: 'absolute', 
                      top: '100%',
                      zIndex: 50
                    }}
                  >
                    <div className="p-3 sm:p-4">
                      <div className="flex items-start gap-2 sm:gap-3 mb-2.5 sm:mb-3">
                        <div className="bg-gradient-to-br from-[#83927D] to-[#869EB6] p-1.5 rounded-lg flex-shrink-0 shadow-md">
                          <UserPlus className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-xs sm:text-sm text-[#0A3428] mb-0.5">Not finding your name?</h4>
                          <p className="text-[10px] sm:text-xs text-[#0A3428]/70 leading-relaxed">
                            We'd love to have you with us! Send us your details.
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={() => {
                          setRequestFormData({ ...requestFormData, Name: searchQuery })
                          setShowRequestModal(true)
                        }}
                        className="w-full bg-gradient-to-r from-[#83927D] to-[#869EB6] hover:from-[#869EB6] hover:to-[#83927D] text-white py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <UserPlus className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1.5 inline" />
                        You Are Invited
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RSVP Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-3 md:p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-[calc(100%-16px)] sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl border border-[#C3A161]/30 overflow-hidden animate-in zoom-in-95 duration-300 max-h-[95vh] sm:max-h-[90vh] flex flex-col">
              {/* Modal Header with Gradient */}
              <div className="relative bg-gradient-to-r from-[#83927D] via-[#869EB6] to-[#83927D] p-3 sm:p-4 md:p-5 flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                <div className="relative flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-1.5">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                        <Heart className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-white" />
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl font-serif font-bold text-white truncate">
                        You're Invited!
                      </h3>
                    </div>
                    <p className="text-white/95 text-xs sm:text-sm md:text-base font-sans leading-tight">
                      Hello <span className="font-extrabold text-white drop-shadow-lg">{selectedGuest?.Name}</span>!
                    </p>
                  </div>
                  {!hasResponded && (
                    <button
                      onClick={handleCloseModal}
                      className="text-white/80 hover:text-white transition-colors p-1.5 sm:p-2 hover:bg-white/20 rounded-full flex-shrink-0"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-3 sm:p-4 md:p-6 overflow-y-auto flex-1 min-h-0">
                {hasResponded ? (
                  // Thank you message for guests who already responded
                  <div className="text-center py-4 sm:py-6 md:py-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full mb-3 sm:mb-4 md:mb-6">
                      <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-green-600" />
                    </div>
                    <h4 className="text-base sm:text-xl md:text-2xl font-serif font-bold text-[#0A3428] mb-2 sm:mb-3">
                      Thank You for Responding!
                    </h4>
                    <p className="text-[#0A3428]/80 text-xs sm:text-sm md:text-base mb-3 sm:mb-4 md:mb-6 px-2">
                      We've received your RSVP and look forward to celebrating with you!
                    </p>
                    <div className="bg-[#C3A161]/10 rounded-xl p-3 sm:p-4 md:p-6 border border-[#C3A161]/20 space-y-2.5 sm:space-y-3 md:space-y-4">
                      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-1.5 sm:mb-2 md:mb-3">
                        {selectedGuest?.RSVP === "Yes" && (
                          <>
                            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-green-600" />
                            <span className="text-sm sm:text-base md:text-lg font-semibold text-green-600">
                              You're Attending!
                            </span>
                          </>
                        )}
                        {selectedGuest?.RSVP === "No" && (
                          <>
                            <XCircle className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-red-600" />
                            <span className="text-sm sm:text-base md:text-lg font-semibold text-red-600">
                              Unable to Attend
                            </span>
                          </>
                        )}
                      </div>
                      {selectedGuest?.RSVP === "Yes" && selectedGuest?.Guest && (
                        <div className="bg-[#C3A161]/10 rounded-lg p-2.5 sm:p-3 md:p-4 border border-[#C3A161]/30">
                          <div className="text-center">
                            <p className="text-[10px] sm:text-xs md:text-sm text-[#0A3428]/70 mb-0.5 sm:mb-1 font-medium">Number of Guests</p>
                            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[#106552]">
                              {selectedGuest.Guest || "1"}
                            </p>
                          </div>
                        </div>
                      )}
                      {selectedGuest && selectedGuest.Message && selectedGuest.Message.trim() !== "" && (
                        <div className="pt-2 sm:pt-3 border-t border-[#C3A161]/20">
                          <p className="text-[10px] sm:text-xs md:text-sm text-[#0A3428]/80 italic px-1">
                            "{selectedGuest.Message}"
                          </p>
                        </div>
                      )}
                    </div>
                    <Button
                      onClick={handleCloseModal}
                      className="mt-3 sm:mt-4 md:mt-6 bg-gradient-to-r from-[#0A3428] to-[#106552] hover:from-[#106552] hover:to-[#0A3428] text-[#FFFFFF] px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-xl text-xs sm:text-sm md:text-base"
                    >
                      Close
                    </Button>
                  </div>
                ) : (
                  // RSVP Form for guests who haven't responded
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleSubmitRSVP()
                    }}
                    className="space-y-3 sm:space-y-4 md:space-y-5"
                  >
                    {/* Can you attend? */}
                    <div>
                      <label className="flex items-center gap-1.5 text-xs sm:text-sm md:text-base font-semibold text-[#0A3428] mb-1.5 sm:mb-2 font-sans">
                        <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#83927D] flex-shrink-0" />
                        <span className="leading-tight">Can you attend? *</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, RSVP: "Yes" }))}
                          className={`relative p-3 sm:p-4 md:p-5 rounded-xl border-2 transition-all duration-300 min-h-[56px] ${
                            formData.RSVP === "Yes"
                              ? "border-green-500 bg-green-50 shadow-lg scale-105"
                              : "border-[#C3A161]/30 bg-white hover:border-[#C3A161]/50 hover:shadow-md"
                          }`}
                        >
                          <div className="flex items-center justify-center gap-2">
                            <CheckCircle
                              className={`h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 ${
                                formData.RSVP === "Yes" ? "text-green-600" : "text-[#0A3428]/40"
                              }`}
                            />
                            <span
                              className={`text-sm sm:text-base md:text-lg font-bold ${
                                formData.RSVP === "Yes"
                                  ? "text-green-600"
                                  : "text-[#0A3428]"
                              }`}
                            >
                              Yes!
                            </span>
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, RSVP: "No" }))}
                          className={`relative p-3 sm:p-4 md:p-5 rounded-xl border-2 transition-all duration-300 min-h-[56px] ${
                            formData.RSVP === "No"
                              ? "border-red-500 bg-red-50 shadow-lg scale-105"
                              : "border-[#C3A161]/30 bg-white hover:border-[#C3A161]/50 hover:shadow-md"
                          }`}
                        >
                          <div className="flex items-center justify-center gap-2">
                            <XCircle
                              className={`h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 ${
                                formData.RSVP === "No" ? "text-red-600" : "text-[#0A3428]/40"
                              }`}
                            />
                            <span
                              className={`text-sm sm:text-base md:text-lg font-bold ${
                                formData.RSVP === "No" ? "text-red-600" : "text-[#0A3428]"
                              }`}
                            >
                              Sorry, No
                            </span>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Number of Guests - Only show when RSVP is "Yes" */}
                    {formData.RSVP === "Yes" && (
                      <div>
                        <label className="flex items-center gap-1.5 text-xs sm:text-sm md:text-base font-semibold text-[#0A3428] mb-1.5 sm:mb-2 font-sans">
                          <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#869EB6] flex-shrink-0" />
                          <span className="leading-tight">Number of Guests *</span>
                        </label>
                        <input
                          type="number"
                          name="Guest"
                          value={formData.Guest}
                          onChange={handleFormChange}
                          min="1"
                          required
                          placeholder="How many guests?"
                          className="w-full px-3 py-2.5 sm:py-3 border-2 border-[#869EB6]/30 focus:border-[#869EB6] rounded-lg text-sm sm:text-base font-sans placeholder:text-[#0A3428]/40 transition-all duration-300 focus:ring-4 focus:ring-[#869EB6]/10 bg-white"
                        />
                      </div>
                    )}

                    {/* Message to the couple */}
                    <div>
                      <label className="flex items-center gap-1.5 text-xs sm:text-sm md:text-base font-semibold text-[#0A3428] mb-1.5 sm:mb-2 font-sans flex-wrap">
                        <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#83927D] flex-shrink-0" />
                        <span className="leading-tight">Your Message</span>
                        <span className="text-[10px] sm:text-xs font-normal text-[#0A3428]/60">(Optional)</span>
                      </label>
                      <textarea
                        name="Message"
                        value={formData.Message}
                        onChange={handleFormChange}
                        placeholder="Share your excitement..."
                        rows={3}
                        className="w-full px-3 py-2.5 sm:py-3 border-2 border-[#C1C1C1]/30 focus:border-[#83927D] rounded-lg text-sm sm:text-base font-sans placeholder:text-gray-400 placeholder:opacity-70 transition-all duration-300 focus:ring-4 focus:ring-[#83927D]/10 resize-none bg-white/80"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="flex items-center gap-1.5 text-xs sm:text-sm md:text-base font-semibold text-[#0A3428] mb-1.5 sm:mb-2 font-sans flex-wrap">
                        <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#869EB6] flex-shrink-0" />
                        <span className="leading-tight">Email Address</span>
                        <span className="text-[10px] sm:text-xs font-normal text-[#0A3428]/60">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        name="Email"
                        value={formData.Email}
                        onChange={handleFormChange}
                        placeholder="your.email@example.com"
                        className="w-full px-3 py-2.5 sm:py-3 border-2 border-[#C1C1C1]/30 focus:border-[#869EB6] rounded-lg text-sm sm:text-base font-sans placeholder:text-gray-400 placeholder:opacity-70 transition-all duration-300 focus:ring-4 focus:ring-[#869EB6]/10 bg-white/80"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2 sm:pt-3">
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-[#83927D] to-[#869EB6] hover:from-[#869EB6] hover:to-[#83927D] text-white py-3 sm:py-3.5 rounded-lg text-sm sm:text-base font-semibold shadow-xl transition-all duration-300 hover:shadow-2xl disabled:opacity-70"
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center gap-2">
                            <RefreshCw className="h-5 w-5 animate-spin" />
                            <span>Submitting...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <Heart className="h-5 w-5" />
                            <span>Submit RSVP</span>
                          </div>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </div>

              {/* Enhanced Success Overlay */}
              {success && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#0A3428]/98 via-[#106552]/98 to-[#0A3428]/98 backdrop-blur-md flex items-center justify-center z-50 animate-in fade-in duration-300 p-4">
                  <div className="text-center p-4 sm:p-6 md:p-8 max-w-sm mx-auto">
                    {/* Enhanced Icon Circle */}
                    <div className="relative inline-flex items-center justify-center mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                      {/* Animated rings */}
                      <div className="absolute inset-0 rounded-full border-2 sm:border-4 border-[#FFFFFF]/20 animate-ping" />
                      <div className="absolute inset-0 rounded-full border-2 border-[#FFFFFF]/30" />
                      {/* Icon container */}
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-[#FFFFFF] to-white rounded-full flex items-center justify-center shadow-xl">
                        <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-[#0A3428]" strokeWidth={2.5} />
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif font-bold text-[#FFFFFF] mb-2 sm:mb-3 md:mb-4">
                      RSVP Confirmed!
                    </h4>
                    
                    {/* Message based on RSVP response */}
                    {formData.RSVP === "Yes" && (
                      <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 md:mb-5">
                        <p className="text-[#FFFFFF]/95 text-sm sm:text-base md:text-lg font-medium">
                          We're thrilled you'll be joining us!
                        </p>
                        <p className="text-[#FFFFFF]/80 text-xs sm:text-sm md:text-base">
                          Your response has been recorded
                        </p>
                      </div>
                    )}
                    {formData.RSVP === "No" && (
                      <p className="text-[#FFFFFF]/90 text-sm sm:text-base md:text-lg mb-3 sm:mb-4 md:mb-5">
                        We'll miss you, but thank you for letting us know.
                      </p>
                    )}
                    {!formData.RSVP && (
                      <p className="text-[#FFFFFF]/90 text-sm sm:text-base md:text-lg mb-3 sm:mb-4 md:mb-5">
                        Thank you for your response!
                      </p>
                    )}
                    
                    {/* Subtle closing indicator */}
                    <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4 md:mt-5">
                      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#FFFFFF]/60 rounded-full animate-pulse" />
                      <p className="text-[#FFFFFF]/70 text-[10px] sm:text-xs md:text-sm">
                        This will close automatically
                      </p>
                      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#FFFFFF]/60 rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>
              )}

              {/* Error message */}
              {error && !success && (
                <div className="px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6">
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 sm:p-4">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                      <span className="text-red-600 font-semibold text-sm">{error}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Request to Join Modal */}
        {showRequestModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-3 md:p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-[calc(100%-16px)] sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl border border-[#C3A161]/30 overflow-hidden animate-in zoom-in-95 duration-300 max-h-[95vh] sm:max-h-[90vh] flex flex-col">
              {/* Modal Header with Gradient */}
              <div className="relative bg-gradient-to-r from-[#83927D] via-[#869EB6] to-[#83927D] p-3 sm:p-4 md:p-5 flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                <div className="relative flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-1.5">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                        <UserPlus className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-white" />
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl font-serif font-bold text-white truncate">
                        You Are Invited
                      </h3>
                    </div>
                    <p className="text-white/95 text-sm sm:text-base font-sans leading-tight sm:leading-normal">
                      {requestFormData.Name ? (
                        <>Hi <span className="font-extrabold text-[#FFFFFF] drop-shadow-[0_1px_6px_rgba(102,105,86,0.55)]">{requestFormData.Name}</span>!</>
                      ) : (
                        <>Want to celebrate with us?</>
                      )}
                    </p>
                  </div>
                  <button
                    onClick={handleCloseRequestModal}
                    className="text-white/80 hover:text-white transition-colors p-1.5 sm:p-2 hover:bg-white/20 rounded-full flex-shrink-0"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-3 sm:p-4 md:p-6 overflow-y-auto flex-1 min-h-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmitRequest()
                  }}
                  className="space-y-3 sm:space-y-4 md:space-y-5"
                >
                  {/* Name */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs sm:text-sm md:text-base font-semibold text-[#0A3428] mb-1.5 sm:mb-2 font-sans">
                      <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#869EB6] flex-shrink-0" />
                      <span className="leading-tight">Full Name *</span>
                    </label>
                    <input
                      type="text"
                      name="Name"
                      value={requestFormData.Name}
                      onChange={(e) => setRequestFormData({ ...requestFormData, Name: e.target.value })}
                      required
                      placeholder="Enter your full name"
                      className="w-full px-3 py-2.5 sm:py-3 border-2 border-[#C1C1C1]/30 focus:border-[#869EB6] rounded-lg text-sm sm:text-base font-sans placeholder:text-gray-400 placeholder:opacity-70 transition-all duration-300 focus:ring-4 focus:ring-[#869EB6]/10 bg-white/80"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs sm:text-sm md:text-base font-semibold text-[#0A3428] mb-1.5 sm:mb-2 font-sans flex-wrap">
                      <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#83927D] flex-shrink-0" />
                      <span className="leading-tight">Email</span>
                      <span className="text-[10px] sm:text-xs font-normal text-[#0A3428]/60">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      name="Email"
                      value={requestFormData.Email}
                      onChange={(e) => setRequestFormData({ ...requestFormData, Email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="w-full px-3 py-2.5 sm:py-3 border-2 border-[#C1C1C1]/30 focus:border-[#83927D] rounded-lg text-sm sm:text-base font-sans placeholder:text-gray-400 placeholder:opacity-70 transition-all duration-300 focus:ring-4 focus:ring-[#83927D]/10 bg-white/80"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs sm:text-sm md:text-base font-semibold text-[#0A3428] mb-1.5 sm:mb-2 font-sans flex-wrap">
                      <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#869EB6] flex-shrink-0" />
                      <span className="leading-tight">Phone</span>
                      <span className="text-[10px] sm:text-xs font-normal text-[#0A3428]/60">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      name="Phone"
                      value={requestFormData.Phone}
                      onChange={(e) => setRequestFormData({ ...requestFormData, Phone: e.target.value })}
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-3 py-2.5 sm:py-3 border-2 border-[#C1C1C1]/30 focus:border-[#869EB6] rounded-lg text-sm sm:text-base font-sans placeholder:text-gray-400 placeholder:opacity-70 transition-all duration-300 focus:ring-4 focus:ring-[#869EB6]/10 bg-white/80"
                    />
                  </div>

                  {/* Number of Guests */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs sm:text-sm md:text-base font-semibold text-[#0A3428] mb-1.5 sm:mb-2 font-sans">
                      <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#83927D] flex-shrink-0" />
                      <span className="leading-tight">Number of Guests *</span>
                    </label>
                    <input
                      type="number"
                      name="Guest"
                      value={requestFormData.Guest}
                      onChange={(e) => setRequestFormData({ ...requestFormData, Guest: e.target.value })}
                      min="1"
                      required
                      placeholder="How many guests?"
                      className="w-full px-3 py-2.5 sm:py-3 border-2 border-[#C1C1C1]/30 focus:border-[#83927D] rounded-lg text-sm sm:text-base font-sans placeholder:text-gray-400 placeholder:opacity-70 transition-all duration-300 focus:ring-4 focus:ring-[#83927D]/10 bg-white/80"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs sm:text-sm md:text-base font-semibold text-[#0A3428] mb-1.5 sm:mb-2 font-sans flex-wrap">
                      <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#869EB6] flex-shrink-0" />
                      <span className="leading-tight">Message</span>
                      <span className="text-[10px] sm:text-xs font-normal text-[#0A3428]/60">(Optional)</span>
                    </label>
                    <textarea
                      name="Message"
                      value={requestFormData.Message}
                      onChange={(e) => setRequestFormData({ ...requestFormData, Message: e.target.value })}
                      placeholder="Share why you'd like to join..."
                      rows={3}
                      className="w-full px-3 py-2.5 sm:py-3 border-2 border-[#C1C1C1]/30 focus:border-[#869EB6] rounded-lg text-sm sm:text-base font-sans placeholder:text-gray-400 placeholder:opacity-70 transition-all duration-300 focus:ring-4 focus:ring-[#869EB6]/10 resize-none bg-white/80"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 sm:pt-3">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-[#83927D] to-[#869EB6] hover:from-[#869EB6] hover:to-[#83927D] text-white py-3 sm:py-3.5 rounded-lg text-sm sm:text-base font-semibold shadow-xl transition-all duration-300 hover:shadow-2xl disabled:opacity-70"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <RefreshCw className="h-5 w-5 animate-spin" />
                          <span>Submitting...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <UserPlus className="h-5 w-5" />
                          <span>Send Request</span>
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              </div>

              {/* Enhanced Success Overlay */}
              {requestSuccess && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#0A3428]/98 via-[#106552]/98 to-[#0A3428]/98 backdrop-blur-md flex items-center justify-center z-50 animate-in fade-in duration-300 p-4">
                  <div className="text-center p-4 sm:p-6 md:p-8 max-w-sm mx-auto">
                    {/* Enhanced Icon Circle */}
                    <div className="relative inline-flex items-center justify-center mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                      {/* Animated rings */}
                      <div className="absolute inset-0 rounded-full border-2 sm:border-4 border-[#FFFFFF]/20 animate-ping" />
                      <div className="absolute inset-0 rounded-full border-2 border-[#FFFFFF]/30" />
                      {/* Icon container */}
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-[#FFFFFF] to-white rounded-full flex items-center justify-center shadow-xl">
                        <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-[#0A3428]" strokeWidth={2.5} />
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif font-bold text-[#FFFFFF] mb-2 sm:mb-3 md:mb-4">
                      Request Sent!
                    </h4>
                    
                    {/* Message */}
                    <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 md:mb-5">
                      <p className="text-[#FFFFFF]/95 text-sm sm:text-base md:text-lg font-medium">
                        We've received your request
                      </p>
                      <p className="text-[#FFFFFF]/85 text-xs sm:text-sm md:text-base">
                        We'll review it and get back to you soon
                      </p>
                    </div>
                    
                    {/* Subtle closing indicator */}
                    <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4 md:mt-5">
                      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#FFFFFF]/60 rounded-full animate-pulse" />
                      <p className="text-[#FFFFFF]/70 text-[10px] sm:text-xs md:text-sm">
                        This will close automatically
                      </p>
                      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#FFFFFF]/60 rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>
              )}

              {/* Error message */}
              {error && !requestSuccess && (
                <div className="px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6">
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 sm:p-4">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                      <span className="text-red-600 font-semibold text-sm">{error}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      {/* Floating Status Messages (outside modals) */}
      {success && !showModal && !showRequestModal && !requestSuccess && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4">
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-3 sm:p-4 shadow-lg animate-in slide-in-from-top">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
              <span className="text-green-600 font-semibold text-sm sm:text-base">{success}</span>
            </div>
          </div>
        </div>
      )}
    </Section>
  )
}
