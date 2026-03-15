'use client'

import { useState } from 'react'
import { WalkingIcon } from './Icons'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Availability', href: '#availability' },
    { name: 'Services', href: '#services' },
    { name: 'Photo Gallery', href: '#gallery' },
    { name: 'Pet Care', href: '#pet-care' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Get in Touch', href: '#contact' },
    { name: 'Location', href: '#location' },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const href = e.currentTarget.getAttribute('href')
    if (href) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        setIsOpen(false)
      }
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo/Brand */}
        <a
          href="#"
          className="text-[#3A3A3A] font-bold text-xl uppercase"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          Julie's Dog Care <WalkingIcon className="inline-flex align-text-bottom ml-1 w-6 h-6" size={24} />
        </a>

        

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#3A3A3A] font-bold text-3xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={handleNavClick}
              className="text-[#3A3A3A] font-semibold hover:text-[#01BD70] transition uppercase text-sm"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-lightGray">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={handleNavClick}
              className="block py-2 text-[#3A3A3A] font-semibold hover:text-[#01BD70] transition uppercase text-sm border-b border-lightGray"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
