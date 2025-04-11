"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useUser } from '@auth0/nextjs-auth0/client';


export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, error, isLoading } = useUser()
  const pathname = usePathname()

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (isMenuOpen && !target.closest("#mobile-menu") && !target.closest("#menu-toggle-label")) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isMenuOpen])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#8e0e00] shadow-md py-2" : "bg-[#8e0e00] py-3"
      }`}
    >
      <div className="flex justify-between items-center px-8 py-3">
        <div className="font-bold text-2xl text-[#f7d354] tracking-wider">
          <Link href="/">GUNotes</Link>
        </div>

        {/* Mobile Menu Button - Fixed to use onClick instead of onChange */}
        <button
          id="menu-toggle-label"
          className="flex flex-col gap-[5px] cursor-pointer md:hidden z-50"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span
            className={`h-[3px] w-[25px] bg-white rounded-md transition-all duration-300 ${
              isMenuOpen ? "transform rotate-45 translate-y-[8px]" : ""
            }`}
          ></span>
          <span
            className={`h-[3px] w-[25px] bg-white rounded-md transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`h-[3px] w-[25px] bg-white rounded-md transition-all duration-300 ${
              isMenuOpen ? "transform -rotate-45 -translate-y-[8px]" : ""
            }`}
          ></span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex gap-8">
            <li>
              <Link href="/#home" className="text-gray-300 hover:text-white font-medium">
                Home
              </Link>
            </li>
            <li>
              <Link href="/#features" className="text-gray-300 hover:text-white font-medium">
                Features
              </Link>
            </li>
            <li>
              <Link href="/#gallery" className="text-gray-300 hover:text-white font-medium">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/#testimonials" className="text-gray-300 hover:text-white font-medium">
                Testimonials
              </Link>
            </li>
            <li>
              <Link href="/#contact" className="text-gray-300 hover:text-white font-medium">
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="https://www.gannon.edu/about-gannon/"
                target="_blank"
                className="text-gray-300 hover:text-white font-medium"
              >
                About Us
              </Link>
            </li>
          </ul>
        </nav>

        {user ? (
  <Link href="/dashboard" className="hidden md:flex items-center gap-2 text-gray-300 hover:text-white">
    {user.picture ? (
      <img src={user.picture} alt="User avatar" className="w-8 h-8 rounded-full" />
    ) : (
      <div className="w-8 h-8 rounded-full bg-gray-300 text-black flex items-center justify-center font-bold">
        {user.name?.[0]?.toUpperCase() || "U"}
      </div>
    )}
  </Link>
) : (
  <Link
    href="/api/auth/login"
    className="hidden md:block border border-gray-300 text-gray-300 px-5 py-2 rounded-full hover:bg-[#f7d354] hover:text-black transition-colors"
  >
    Login
  </Link>
)}


        {/* Mobile Menu - Improved with animation and positioning */}
        <div
          id="mobile-menu"
          className={`fixed top-0 right-0 h-full w-[80%] max-w-[300px] bg-[#8e0e00] shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="pt-20 px-6">
            <ul className="flex flex-col space-y-4">
              <li>
                <Link
                  href="/#home"
                  className="text-gray-300 hover:text-white font-medium block py-2 border-b border-[#a81515]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/#features"
                  className="text-gray-300 hover:text-white font-medium block py-2 border-b border-[#a81515]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/#gallery"
                  className="text-gray-300 hover:text-white font-medium block py-2 border-b border-[#a81515]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/#testimonials"
                  className="text-gray-300 hover:text-white font-medium block py-2 border-b border-[#a81515]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-gray-300 hover:text-white font-medium block py-2 border-b border-[#a81515]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.gannon.edu/about-gannon/"
                  target="_blank"
                  className="text-gray-300 hover:text-white font-medium block py-2 border-b border-[#a81515]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
              </li>
              <li className="mt-6">
  {user ? (
    <Link
      href="/dashboard"
      className="block w-full text-center border border-gray-300 text-gray-300 px-5 py-2 rounded-full hover:bg-[#f7d354] hover:text-black transition-colors"
      onClick={() => setIsMenuOpen(false)}
    >
      Profile
    </Link>
  ) : (
    <Link
      href="/api/auth/login"
      className="block w-full text-center border border-gray-300 text-gray-300 px-5 py-2 rounded-full hover:bg-[#f7d354] hover:text-black transition-colors"
      onClick={() => setIsMenuOpen(false)}
    >
      Login
    </Link>
  )}
</li>

            </ul>
          </div>
        </div>

        {/* Overlay when mobile menu is open */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black/50 z-30" onClick={() => setIsMenuOpen(false)} aria-hidden="true"></div>
        )}
      </div>
    </header>
  )
}






