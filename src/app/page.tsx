"use client"
import { useEffect } from "react"
import Header from "../components/Landing/header"
import { GallerySection } from "../components/gallery-section"
import { FeaturesSection } from "../components/features-section"
import { TestimonialsSection } from "../components/testimonials-section"
import { ContactSection } from "../components/contact-section"
import { Navbar } from "../components/navbar"
import { Footer } from "../components/footer"

export default function Page() {
  // Add scroll reveal effect
  useEffect(() => {
    const sections = document.querySelectorAll("section")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeIn")
          }
        })
      },
      { threshold: 0.1 },
    )

    sections.forEach((section) => {
      observer.observe(section)
    })

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section)
      })
    }
  }, [])

  return (
    <div className="min-h-screen">
      {/* Background pattern with improved opacity */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-70"></div>

      {/* Header */}
      <Header />

      {/* Navbar */}
      <Navbar />

      {/* Hero Section - Enhanced with better visuals */}
      <section
        id="home"
        className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#8e0e00] to-[#4a0000] text-center px-5 relative z-10 overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-[#f7d354]/20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-[#f7d354]/10 animate-pulse delay-1000"></div>

        <div className="max-w-[700px] border border-[#400] p-[60px_40px] rounded-xl md:p-[60px_40px] p-[40px_20px] backdrop-blur-sm bg-black/20 shadow-xl transform transition-all duration-500 hover:scale-[1.02]">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white mb-5">
            <span className="block mb-2 text-[#f7d354]">GUNotes</span>
            <span>Ready to grab</span>
            <br />
            <span>
              your <u className="underline decoration-[#f7d354] underline-offset-[6px]">notes</u>
            </span>
          </h1>
          <p className="text-base text-gray-300 mb-8 max-w-md mx-auto">
            GUNote provides all subject notes that you are looking for. We have arranged all notes according to your
            respective institutes or colleges.
          </p>
          <a
            href="/get-started"
            className="inline-block bg-gradient-to-r from-[#f7d354] to-[#f7971e] text-black py-4 px-7 font-bold rounded-full shadow-lg hover:from-[#ffe48d] hover:to-[#f7971e] transition-all hover:shadow-xl hover:-translate-y-1"
          >
            ✨ Start taking notes
          </a>
        </div>
      </section>

      {/* Feature Section */}
      <FeaturesSection />

      {/* Gallery Section */}
      <GallerySection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  )
}
