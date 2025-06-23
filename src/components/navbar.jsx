"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useUser } from "@auth0/nextjs-auth0/client"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, error, isLoading } = useUser()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      const target = e.target
      if (
        isMenuOpen &&
        !target.closest("#mobile-menu") &&
        !target.closest("#menu-toggle-label")
      ) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isMenuOpen])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

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

        <nav className="hidden md:block">
          <ul className="flex gap-8">
            {["home", "features", "gallery", "testimonials", "contact"].map((section) => (
              <li key={section}>
                <Link
                  href={`/#${section}`}
                  className="text-gray-300 hover:text-white font-medium"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </Link>
              </li>
            ))}
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
                {(user.name && user.name[0]?.toUpperCase()) || "U"}
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

        {/* Mobile Slide-out Menu */}
        <div
          id="mobile-menu"
          className={`fixed top-0 right-0 h-full w-[80%] max-w-[300px] bg-[#8e0e00] shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="pt-20 px-6">
            <ul className="flex flex-col space-y-4">
              {["home", "features", "gallery", "testimonials", "contact"].map((section) => (
                <li key={section}>
                  <Link
                    href={`/#${section}`}
                    className="text-gray-300 hover:text-white font-medium block py-2 border-b border-[#a81515]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </Link>
                </li>
              ))}
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

        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          ></div>
        )}
      </div>
    </header>
  )
}
