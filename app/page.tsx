'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { services, reviews } from '@/lib/services'

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [images, setImages] = useState<string[]>([])
  const [imagesToShow, setImagesToShow] = useState(12) // 3 rows of 4 columns
  const [scrollPosition, setScrollPosition] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const reviewsRef = useRef<HTMLDivElement>(null)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  
  // Initialize availability data for March through December and beyond
  const initializeAvailability = () => {
    const availability: Record<string, Record<string, boolean>> = {}
    const serviceDefaults = { boarding: true, dropIn: true, daycare: true, walking: true }
    
    // March: 12-31 available, except 18-19
    for (let day = 12; day <= 31; day++) {
      const dateStr = `2026-03-${String(day).padStart(2, '0')}`
      availability[dateStr] = {
        ...serviceDefaults,
        // 18th and 19th are booked (false)
        ...(day >= 18 && day <= 19 ? { boarding: false, dropIn: false, daycare: false, walking: false } : {})
      }
    }
    
    // April: All available except 18-25
    for (let day = 1; day <= 30; day++) {
      const dateStr = `2026-04-${String(day).padStart(2, '0')}`
      availability[dateStr] = {
        ...serviceDefaults,
        // 18th-25th are booked (false)
        ...(day >= 18 && day <= 25 ? { boarding: false, dropIn: false, daycare: false, walking: false } : {})
      }
    }
    
    // May: All available
    for (let day = 1; day <= 31; day++) {
      const dateStr = `2026-05-${String(day).padStart(2, '0')}`
      availability[dateStr] = serviceDefaults
    }
    
    // June: All available
    for (let day = 1; day <= 30; day++) {
      const dateStr = `2026-06-${String(day).padStart(2, '0')}`
      availability[dateStr] = serviceDefaults
    }
    
    // July through December: All available
    const monthDays = { 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31 }
    for (const [month, days] of Object.entries(monthDays)) {
      for (let day = 1; day <= days; day++) {
        const dateStr = `2026-${String(parseInt(month)).padStart(2, '0')}-${String(day).padStart(2, '0')}`
        availability[dateStr] = serviceDefaults
      }
    }
    
    return availability
  }

  const [dateAvailability, setDateAvailability] = useState<Record<string, Record<string, boolean>>>(initializeAvailability())
  const [availability, setAvailability] = useState({
    boarding: true,
    dropIn: true,
    daycare: true,
    walking: true,
  })

  // Get availability for selected date
  const getDateKey = (date: Date) => {
    return date.toISOString().split('T')[0]
  }

  const currentDateKey = getDateKey(selectedDate)
  const dateAvailabilityData = dateAvailability[currentDateKey] || {
    boarding: true,
    dropIn: true,
    daycare: true,
    walking: true,
  }

  // Fetch dog images from API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/dogs')
        const data = await response.json()
        setImages(data.images || [])
      } catch (error) {
        console.error('Failed to fetch images:', error)
      }
    }
    fetchImages()
  }, [])

  // Reviews carousel scroll functions
  const scrollReviews = (direction: 'left' | 'right') => {
    const container = reviewsRef.current
    if (!container) return
    
    // Get the first review card to calculate its width
    const firstCard = container.querySelector('div[class*="flex-shrink-0"]') as HTMLElement
    if (!firstCard) return
    
    // Calculate scroll distance: card width + gap (gap-6 = 1.5rem = 24px)
    const cardWidth = firstCard.offsetWidth
    const gap = 24 // gap-6 = 1.5rem = 24px
    const scrollAmount = cardWidth + gap
    
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX)
    if (!reviewsRef.current) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50
    if (isLeftSwipe) scrollReviews('right')
    if (isRightSwipe) scrollReviews('left')
  }

  return (
    <main className="w-full">
      {/* Hero Section */}
      <section 
        className="w-full bg-cover bg-no-repeat py-20 px-4 relative"
        style={{
          backgroundImage: 'url(/images/hero.webp)',
          backgroundPosition: 'bottom',
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 uppercase">
            Julie's Dog Sitting
          </h1>
          <p className="text-2xl text-white mb-8 font-light">
            Fresh Air, Long Walks & Attention
          </p>
          <p className="text-lg text-white mb-8 max-w-2xl mx-auto">
            Trusted dog sitting, boarding, and day care services in Georgetown, Massachusetts
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-[#01BD70] text-white font-bold text-lg hover:bg-[#00a85f] transition uppercase"
            >
              Book Now
            </button>
          </div>
        </div>
      </section>

      {/* About Julie Section */}
      <section className="py-20 bg-white px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#3A3A3A] mb-12 uppercase text-center">About Julie</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-[#3A3A3A] mb-6 uppercase">
                Responsive, Reliable Pet Care
              </h3>
              <p className="text-lg text-[#6B7280] mb-4 leading-relaxed">
                Julie is a responsive sitter who delivers highly rated care and has a history of listing accurate availability and preferences, making it easier for pet parents to find the best care for their pets.
              </p>
              <p className="text-lg text-[#6B7280] mb-6 leading-relaxed">
                <strong className="text-[#3A3A3A]">Fresh air, long walks and attention</strong> are the foundation of our care philosophy. We've been caring for pets for years, and it's been a joy for our whole family.
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-[#3A3A3A] mb-2">📞 Communication</h4>
                  <ul className="text-[#6B7280] space-y-1">
                    <li>✓ 7 repeat pet parents</li>
                    <li>✓ 100% response rate</li>
                    <li>✓ Usually responds in under an hour</li>
                    <li>✓ 80% bookings with photo updates</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-[#3A3A3A] mb-2">🎯 Skills</h4>
                  <ul className="text-[#6B7280] space-y-1">
                    <li>✓ 4 years of experience</li>
                    <li>✓ Oral medication administration</li>
                    <li>✓ Provides daily exercise</li>
                    <li>✓ Special needs accommodation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br lightGray p-8 rounded-lg">
              <h3 className="text-xl font-bold text-[#3A3A3A] mb-6 uppercase">A Typical Day</h3>
              <p className="text-[#6B7280] leading-relaxed mb-6">
                When your dog is here, your dog is family. Days are filled with:
              </p>
              <ul className="space-y-3 text-[#6B7280]">
                <li className="flex gap-3">
                  <span className="text-[#01BD70] font-bold">🚶</span>
                  <span>Walks around the block and in the nature preserve behind our home</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#01BD70] font-bold">🎾</span>
                  <span>Playing fetch in the yard and practicing skills</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#01BD70] font-bold">🤗</span>
                  <span>Attention and snuggles as part of the package</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#01BD70] font-bold">🍽️</span>
                  <span>Regular meal times and potty breaks every 2-4 hours</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
        
      <section className="py-20 bg-lightGray px-4">

        <h2 className="text-4xl font-bold text-[#3A3A3A] mb-12 uppercase text-center">Calendar Availability</h2>

        <div className="max-w-6xl mx-auto">
          {/* Availability Calendar & Toggle */}
          <div className="mb-20 bg-white p-6 rounded-lg shadow">
            
            {/* Selected Date Display */}
            <div className="text-center mb-6 p-4 bg-lightGray rounded">
              <p className="text-[#3A3A3A] font-bold uppercase">
                {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
            </div>

            {/* Availability for Selected Date */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { key: 'boarding', label: 'Boarding' },
                { key: 'dropIn', label: 'Drop-in Visits' },
                { key: 'daycare', label: 'Day Care' },
                { key: 'walking', label: 'Walking' },
              ].map((service) => {
                const isAvailable = dateAvailabilityData[service.key as keyof typeof dateAvailabilityData]
                return (
                  <div
                    key={service.key}
                    className={`p-4 rounded-lg font-bold text-center uppercase cursor-default ${
                      isAvailable
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {service.label}
                    <div className="text-sm mt-1">
                      {isAvailable ? '✓ Available' : '✗ Booked'}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Calendar */}
            <div className="flex justify-center mt-8">
              <div className="w-full md:w-auto [&_.react-calendar]:border-[1px] [&_.react-calendar]:border-[#01BD70] [&_.react-calendar]:rounded-lg [&_.react-calendar_button]:text-[#3A3A3A] [&_.react-calendar_button:hover]:text-white">
                <Calendar 
                  value={selectedDate} 
                  onChange={(value) => setSelectedDate(value as Date)}
                  minDate={new Date()}
                  tileClassName={({ date }) => {
                    const dateStr = getDateKey(date)
                    const isSelected = date.toDateString() === selectedDate.toDateString()
                    const dateData = dateAvailability[dateStr]
                    const isAvailable = dateData ? Object.values(dateData).some(v => v) : false
                    const isPast = date < new Date() && date.toDateString() !== new Date().toDateString()
                    
                    if (isSelected) {
                      return 'bg-yellow-400 text-[#3A3A3A] font-bold'
                    } else if (isAvailable) {
                      return 'bg-green-500 text-white'
                    } else if (isPast) {
                      return 'bg-gray-400 text-[#3A3A3A] solid-unavailable'
                    } else {
                      return 'bg-lightGray text-[#6B7280] striped-unavailable'
                    }
                  }}
                />
              </div>
            </div>
            {/* Book Now Button */}
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="block mx-auto px-8 py-3 bg-[#01BD70] text-white font-bold hover:bg-[#00a85f] transition uppercase mt-4"
            >
              Book Now
            </button>
          </div>

          {/* Services & Pricing Header */}
          <h2 className="text-4xl font-bold text-[#3A3A3A] mb-6 uppercase text-center">Services & Pricing</h2>
          <p className="text-center text-[#6B7280] mb-12 max-w-2xl mx-auto">
            Flexible pet care options to meet your needs
          </p>

          {/* Pricing Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div key={service.id} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-[#3A3A3A] mb-2 uppercase">{service.name}</h3>
                <p className="text-[#6B7280] mb-4">{service.description}</p>
                <div className="bg-lightGray p-4 rounded mb-4">
                  <div className="text-3xl font-bold text-[#01BD70]">
                    ${(service.basePrice / 100).toFixed(2)}
                  </div>
                  <div className="text-sm text-[#6B7280]">
                    {service.id === 'boarding' && 'per night'}
                    {service.id === 'drop-in' && 'per visit'}
                    {service.id === 'daycare' && 'per day'}
                    {service.id === 'walking' && 'per walk'}
                  </div>
                </div>
                {service.variants && service.variants.length > 0 && (
                  <div className="text-sm text-[#6B7280] space-y-1">
                    <p className="font-bold text-[#3A3A3A]">Variations:</p>
                    {service.variants.map((variant, idx) => (
                      <div key={idx}>
                        {variant.name}: +${(variant.priceModifier / 100).toFixed(2)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-20 bg-white px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#3A3A3A] mb-12 uppercase text-center">
            Dogs We've Loved
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {images.slice(0, imagesToShow).map((image, i) => (
              <div 
                key={image} 
                onClick={() => setSelectedImage(images.indexOf(image))}
                className="aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer"
              >
                <Image
                  src={`/images/dogs/${image}`}
                  alt={`Dog photo ${i + 1}`}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover hover:scale-105 transition"
                  priority={i < 4}
                />
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {imagesToShow < images.length && (
            <button
              onClick={() => setImagesToShow(prev => prev + 12)}
              className="block mx-auto px-8 py-3 bg-[#01BD70] text-white font-bold hover:bg-[#00a85f] transition uppercase mb-4"
            >
              Load More
            </button>
          )}

          {/* Lightbox Modal */}
          {selectedImage !== null && images.length > 0 && (
            <div 
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            >
              <div 
                onClick={(e) => e.stopPropagation()}
                className="relative bg-black rounded-lg max-w-4xl max-h-[90vh] flex items-center justify-center"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 transition z-10"
                >
                  ✕
                </button>

                {/* Previous Button */}
                {selectedImage > 0 && (
                  <button
                    onClick={() => setSelectedImage(selectedImage - 1)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-gray-300 transition z-10 bg-black/50 hover:bg-black/70 px-3 py-2 rounded"
                  >
                    ‹
                  </button>
                )}

                {/* Next Button */}
                {selectedImage < images.length - 1 && (
                  <button
                    onClick={() => setSelectedImage(selectedImage + 1)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-gray-300 transition z-10 bg-black/50 hover:bg-black/70 px-3 py-2 rounded"
                  >
                    ›
                  </button>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/70 px-4 py-2 rounded">
                  {selectedImage + 1} / {images.length}
                </div>

                {/* Image */}
                <Image
                  src={`/images/dogs/${images[selectedImage]}`}
                  alt={`Dog photo ${selectedImage + 1}`}
                  width={1200}
                  height={1200}
                  className="w-full h-full object-contain"
                  quality={95}
                />
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Home & Environment Section */}
      <section className="py-20 bg-lightGray px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#3A3A3A] mb-12 uppercase text-center">
            Safety, Trust & Environment
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow">
              <h3 className="text-2xl font-bold text-[#3A3A3A] mb-6 uppercase">🏡 Home Details</h3>
              <ul className="space-y-3 text-[#6B7280]">
                <li className="flex gap-3">
                  <span className="text-[#01BD70]">✓</span>
                  <span><strong>House</strong> with plenty of space</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#01BD70]">✓</span>
                  <span><strong>Fenced yard</strong> for safe outdoor play</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#01BD70]">✓</span>
                  <span><strong>Nature preserve trails</strong> behind our home for adventure seekers</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#01BD70]">✓</span>
                  <span><strong>Non-smoking</strong> household</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#01BD70]">✓</span>
                  <span>Has caged pets and <strong>children 6-12</strong></span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#01BD70]">✓</span>
                  <span>Dogs allowed on <strong>bed & furniture</strong></span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow">
              <h3 className="text-2xl font-bold text-[#3A3A3A] mb-6 uppercase">🛡️ Care Standards</h3>
              <ul className="space-y-3 text-[#6B7280]">
                <li className="flex gap-3">
                  <span className="text-[#01BD70]">✓</span>
                  <span><strong>Potty breaks</strong> every 2-4 hours</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#01BD70]">✓</span>
                  <span><strong>Flexible accommodation</strong> for special needs</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#01BD70]">✓</span>
                  <span>We ask about <strong>behaviors & special needs</strong> upfront</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#01BD70]">✓</span>
                  <span><strong>Daily photo updates</strong> during stays</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#01BD70]">✓</span>
                  <span><strong>Licensed & trustworthy</strong> - verified reviews</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#01BD70]">✓</span>
                  <span>Member of <strong>Rover community</strong> with proven track record</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-white px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#3A3A3A] mb-12 uppercase text-center">
            What Pet Parents Say
          </h2>
          {/* Reviews Carousel */}
          <div className="relative mb-12">
            {/* Scroll Container */}
            <div
              ref={reviewsRef}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="flex gap-6 overflow-x-auto scroll-smooth pb-4 md:pb-0 scrollbar-hide"
              style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {reviews.map((review) => (
                <div 
                  key={review.id} 
                  className="flex-shrink-0 w-full sm:w-96 bg-lightGray p-6 rounded-lg shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-[#3A3A3A]">{review.name}</h4>
                      <p className="text-sm text-[#6B7280]">{review.service} • {review.date}</p>
                    </div>
                    <div className="text-lg">⭐⭐⭐⭐⭐</div>
                  </div>
                  <p className="text-[#6B7280] italic">"{review.text}"</p>
                </div>
              ))}
            </div>

            {/* Navigation Buttons Below */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => scrollReviews('left')}
                className="px-6 py-2 bg-[#01BD70] hover:bg-[#00a85f] text-white font-bold rounded transition uppercase"
              >
                ← Previous
              </button>
              <button
                onClick={() => scrollReviews('right')}
                className="px-6 py-2 bg-[#01BD70] hover:bg-[#00a85f] text-white font-bold rounded transition uppercase"
              >
                Next →
              </button>
            </div>

            {/* Mobile Swipe Hint */}
            <p className="text-center text-sm text-[#6B7280] mt-4 md:hidden italic">
              👉 Swipe left or right to see more reviews
            </p>
          </div>
          <button
            onClick={() => document.getElementById('submit-review')?.scrollIntoView({ behavior: 'smooth' })}
            className="block mx-auto px-8 py-3 bg-[#01BD70] text-white font-bold hover:bg-[#00a85f] transition uppercase"
          >
            Leave a Review
          </button>
        </div>
      </section>

      {/* Contact & Review Submission Section */}
      <section id="contact" className="py-20 bg-lightGray px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#3A3A3A] mb-12 uppercase text-center">
            Get in Touch
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow">
              <h3 className="text-2xl font-bold text-[#3A3A3A] mb-6 uppercase">Book a Service</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-[#3A3A3A] font-bold mb-2">Your Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-[#D1D5DB] rounded focus:outline-none focus:border-[#01BD70]"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-[#3A3A3A] font-bold mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-[#D1D5DB] rounded focus:outline-none focus:border-[#01BD70]"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-[#3A3A3A] font-bold mb-2">Service</label>
                  <select className="w-full px-4 py-2 border border-[#D1D5DB] rounded focus:outline-none focus:border-[#01BD70]">
                    <option>Select a service</option>
                    <option>Boarding</option>
                    <option>Drop-in Visits</option>
                    <option>Day Care</option>
                    <option>Dog Walking</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#3A3A3A] font-bold mb-2">Message</label>
                  <textarea
                    className="w-full px-4 py-2 border border-[#D1D5DB] rounded focus:outline-none focus:border-[#01BD70] h-32"
                    placeholder="Tell Julie about your dog and what you need..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-3 bg-[#01BD70] text-white font-bold hover:bg-[#00a85f] transition uppercase"
                >
                  Send Inquiry
                </button>
              </form>
            </div>

            {/* Review Submission */}
            <div id="submit-review" className="bg-white p-8 rounded-lg shadow">
              <h3 className="text-2xl font-bold text-[#3A3A3A] mb-6 uppercase">Leave a Review</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-[#3A3A3A] font-bold mb-2">Your Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-[#D1D5DB] rounded focus:outline-none focus:border-[#01BD70]"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-[#3A3A3A] font-bold mb-2">Your Dog's Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-[#D1D5DB] rounded focus:outline-none focus:border-[#01BD70]"
                    placeholder="Dog's name"
                  />
                </div>
                <div>
                  <label className="block text-[#3A3A3A] font-bold mb-2">Service Type</label>
                  <select className="w-full px-4 py-2 border border-[#D1D5DB] rounded focus:outline-none focus:border-[#01BD70]">
                    <option>Select service</option>
                    <option>Boarding</option>
                    <option>Drop-in Visits</option>
                    <option>Day Care</option>
                    <option>Dog Walking</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#3A3A3A] font-bold mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="text-3xl hover:text-[#01BD70]"
                      >
                        ⭐
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[#3A3A3A] font-bold mb-2">Your Review</label>
                  <textarea
                    className="w-full px-4 py-2 border border-[#D1D5DB] rounded focus:outline-none focus:border-[#01BD70] h-24"
                    placeholder="Share your experience with Julie!"
                  />
                </div>
                <p className="text-sm text-[#6B7280]">
                  Your review will be sent to Julie for approval before being posted.
                </p>
                <button
                  type="submit"
                  className="w-full px-8 py-3 bg-[#01BD70] text-white font-bold hover:bg-[#00a85f] transition uppercase"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#3A3A3A] mb-6 uppercase text-center">
            Location
          </h2>
          <p className="text-center text-[#6B7280] mb-12 max-w-2xl mx-auto">
            Service area centered in Georgetown, Massachusetts. Exact address provided upon booking.
          </p>
          <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2972.8326509949316!2d-71.13944!3d42.39583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e372a0e0e0e0e1%3A0x0!2sGeorgetown%2C%20Massachusetts!5e0!3m2!1sen!2sus!4v1234567890"
            />
          </div>
          <p className="text-center text-sm text-[#6B7280] mt-6 italic">
            📍 Georgetown, Massachusetts — For privacy, exact address is shared with confirmed bookings only.
          </p>
        </div>
      </section>
    </main>
  )
}
