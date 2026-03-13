'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { services, reviews } from '@/lib/services'

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [availability, setAvailability] = useState({
    boarding: true,
    dropIn: true,
    daycare: true,
    walking: true,
  })

  return (
    <main className="w-full">
      {/* Hero Section */}
      <section 
        className="w-full bg-cover bg-no-repeat py-20 md:py-32 px-4 relative"
        style={{
          backgroundImage: 'url(/images/dogs/21.webp)',
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
      <section className="py-20 md:py-32 bg-white px-4">
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

      {/* Services & Pricing Section */}
      <section className="py-20 md:py-32 bg-lightGray px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#3A3A3A] mb-6 uppercase text-center">Services & Pricing</h2>
          <p className="text-center text-[#6B7280] mb-12 max-w-2xl mx-auto">
            Flexible pet care options to meet your needs
          </p>

          {/* Availability Toggle */}
          <div className="mb-12 bg-white p-6 rounded-lg shadow">
            <h3 className="font-bold text-[#3A3A3A] mb-4 uppercase">Current Availability</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { key: 'boarding', label: 'Boarding' },
                { key: 'dropIn', label: 'Drop-in Visits' },
                { key: 'daycare', label: 'Day Care' },
                { key: 'walking', label: 'Walking' },
              ].map((service) => (
                <button
                  key={service.key}
                  onClick={() => setAvailability(prev => ({ ...prev, [service.key]: !prev[service.key as keyof typeof availability] }))}
                  className={`p-4 rounded-lg font-bold transition text-center uppercase ${
                    availability[service.key as keyof typeof availability]
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {service.label}
                  <div className="text-sm mt-1">
                    {availability[service.key as keyof typeof availability] ? '✓ Available' : 'Booked'}
                  </div>
                </button>
              ))}
            </div>
          </div>

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
      <section className="py-20 md:py-32 bg-white px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#3A3A3A] mb-12 uppercase text-center">
            Dogs We've Loved
          </h2>
          <p className="text-center text-[#6B7280] mb-12 max-w-2xl mx-auto">
            Meet some of the wonderful pups Julie has cared for. Upload up to 125 photos to this gallery!
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 21 }).map((_, i) => (
              <div 
                key={i} 
                onClick={() => setSelectedImage(i + 1)}
                className="aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer"
              >
                <Image
                  src={`/images/dogs/${i + 1}.webp`}
                  alt={`Dog photo ${i + 1}`}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover hover:scale-105 transition"
                  priority={i < 4}
                />
              </div>
            ))}
          </div>

          {/* Lightbox Modal */}
          {selectedImage && (
            <div 
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            >
              <div 
                onClick={(e) => e.stopPropagation()}
                className="relative bg-black rounded-lg max-w-4xl max-h-[90vh] flex items-center justify-center"
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 transition z-10"
                >
                  ✕
                </button>
                <Image
                  src={`/images/dogs/${selectedImage}.webp`}
                  alt={`Dog photo ${selectedImage}`}
                  width={1200}
                  height={1200}
                  className="w-full h-full object-contain"
                  quality={95}
                />
              </div>
            </div>
          )}
          <p className="text-center text-[#6B7280] mt-8 italic">
            {21} beautiful pups! Space for up to 104 more photos.
          </p>
        </div>
      </section>

      {/* Home & Environment Section */}
      <section className="py-20 md:py-32 bg-lightGray px-4">
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
      <section className="py-20 md:py-32 bg-white px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#3A3A3A] mb-12 uppercase text-center">
            What Pet Parents Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {reviews.slice(0, 9).map((review) => (
              <div key={review.id} className="bg-lightGray p-6 rounded-lg shadow">
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
          <button
            onClick={() => document.getElementById('submit-review')?.scrollIntoView({ behavior: 'smooth' })}
            className="block mx-auto px-8 py-3 bg-[#01BD70] text-white font-bold hover:bg-[#00a85f] transition uppercase"
          >
            Leave a Review
          </button>
        </div>
      </section>

      {/* Contact & Review Submission Section */}
      <section id="contact" className="py-20 md:py-32 bg-lightGray px-4">
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
      <section className="py-20 md:py-32 bg-white px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#3A3A3A] mb-12 uppercase text-center">
            Location
          </h2>
          <div className="w-full h-96 bg-gradient-to-br lightGray rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">📍</div>
              <p className="text-xl font-bold text-[#3A3A3A]">Georgetown, Massachusetts</p>
              <p className="text-[#6B7280] mt-2">Map integration coming soon</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
