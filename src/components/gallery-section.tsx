"use client"

import { useEffect, useState } from "react"

// Define image arrays for themes
const christmasImages = [
  "/images/christmas2.jpg",
  "/images/christmas4.jpg",
  "/images/christmas5.jpg",
  "/images/christmas6.jpg",
  "/images/christmas2.jpg",
  "/images/christmas5.jpg",
]

// Default images for the gallery
const defaultImages = [
  "/images/img_fox.jpg",
  "/images/img_eagle.jpg",
  "/images/campus-hero.png",
  "/images/christmas2.jpg",
  "/images/christmas5.jpg",
  "/images/christmas4.jpg",
]

// Image titles
const imageTitles = [
  "Arctic Fox in Snow",
  "Majestic Eagle",
  "Campus Entrance",
  "Christmas Telephone Booth",
  "Santa Claus Ornament",
  "Christmas Ornaments",
]

export function GallerySection() {
  const [isChristmas, setIsChristmas] = useState(false)
  const [currentImages, setCurrentImages] = useState(defaultImages)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const toggleTheme = () => {
    setIsChristmas(!isChristmas)
    setCurrentImages(isChristmas ? defaultImages : christmasImages)
  }

  // Simple lightbox implementation without jQuery
  const openLightbox = (index: number) => {
    setSelectedImage(index)
    document.body.style.overflow = "hidden" // Prevent scrolling when lightbox is open
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = "" // Restore scrolling
  }

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedImage === null) return

    if (direction === "prev") {
      setSelectedImage(selectedImage === 0 ? currentImages.length - 1 : selectedImage - 1)
    } else {
      setSelectedImage(selectedImage === currentImages.length - 1 ? 0 : selectedImage + 1)
    }
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return

      if (e.key === "Escape") {
        closeLightbox()
      } else if (e.key === "ArrowLeft") {
        navigateImage("prev")
      } else if (e.key === "ArrowRight") {
        navigateImage("next")
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedImage])

  return (
    <section id="gallery" className="py-10 px-5 bg-white">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Gallery</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our collection of images showcasing campus life and seasonal themes.
        </p>
      </div>

      <button
        onClick={toggleTheme}
        className="ml-10 mt-6 mb-4 bg-gradient-to-r from-[#f7d354] to-[#f7971e] text-black py-2 px-5 rounded-md text-lg font-medium hover:from-[#ffe48d] hover:to-[#f7971e] transition-all"
      >
        {isChristmas ? "Default Gallery" : "Christmas Theme"}
      </button>

      {/* Improved Gallery Grid - with images 5 and 6 side by side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {/* First row - 3 images */}
        <div className="row-span-1 col-span-1" onClick={() => openLightbox(0)}>
          <div className="relative block w-full h-64 overflow-hidden rounded-lg group cursor-pointer">
            <img
              src={currentImages[0] || "/placeholder.svg"}
              alt={imageTitles[0]}
              className="w-full h-full object-cover transform scale-105 transition-all duration-500 group-hover:scale-110 group-hover:blur-sm"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-100">
              <span className="relative text-xl text-white font-bold uppercase leading-relaxed">{imageTitles[0]}</span>
            </div>
          </div>
        </div>

        <div className="row-span-1 col-span-1" onClick={() => openLightbox(1)}>
          <div className="relative block w-full h-64 overflow-hidden rounded-lg group cursor-pointer">
            <img
              src={currentImages[1] || "/placeholder.svg"}
              alt={imageTitles[1]}
              className="w-full h-full object-cover transform scale-105 transition-all duration-500 group-hover:scale-110 group-hover:blur-sm"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-100">
              <span className="relative text-xl text-white font-bold uppercase leading-relaxed">{imageTitles[1]}</span>
            </div>
          </div>
        </div>

        <div className="row-span-1 col-span-1" onClick={() => openLightbox(2)}>
          <div className="relative block w-full h-64 overflow-hidden rounded-lg group cursor-pointer">
            <img
              src={currentImages[2] || "/placeholder.svg"}
              alt={imageTitles[2]}
              className="w-full h-full object-cover transform scale-105 transition-all duration-500 group-hover:scale-110 group-hover:blur-sm"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-100">
              <span className="relative text-xl text-white font-bold uppercase leading-relaxed">{imageTitles[2]}</span>
            </div>
          </div>
        </div>

        {/* Second row - 3 images (including images 5 and 6 side by side) */}
        <div className="row-span-1 col-span-1" onClick={() => openLightbox(3)}>
          <div className="relative block w-full h-64 overflow-hidden rounded-lg group cursor-pointer">
            <img
              src={currentImages[3] || "/placeholder.svg"}
              alt={imageTitles[3]}
              className="w-full h-full object-cover transform scale-105 transition-all duration-500 group-hover:scale-110 group-hover:blur-sm"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-100">
              <span className="relative text-xl text-white font-bold uppercase leading-relaxed">{imageTitles[3]}</span>
            </div>
          </div>
        </div>

        {/* Images 5 and 6 side by side */}
        <div className="row-span-1 col-span-1" onClick={() => openLightbox(4)}>
          <div className="relative block w-full h-64 overflow-hidden rounded-lg group cursor-pointer">
            <img
              src={currentImages[4] || "/placeholder.svg"}
              alt={imageTitles[4]}
              className="w-full h-full object-cover transform scale-105 transition-all duration-500 group-hover:scale-110 group-hover:blur-sm"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-100">
              <span className="relative text-xl text-white font-bold uppercase leading-relaxed">{imageTitles[4]}</span>
            </div>
          </div>
        </div>

        <div className="row-span-1 col-span-1" onClick={() => openLightbox(5)}>
          <div className="relative block w-full h-64 overflow-hidden rounded-lg group cursor-pointer">
            <img
              src={currentImages[5] || "/placeholder.svg"}
              alt={imageTitles[5]}
              className="w-full h-full object-cover transform scale-105 transition-all duration-500 group-hover:scale-110 group-hover:blur-sm"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-100">
              <span className="relative text-xl text-white font-bold uppercase leading-relaxed">{imageTitles[5]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={closeLightbox}>
          <div className="relative max-w-4xl max-h-[90vh] p-2" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-2 right-2 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/80"
              onClick={closeLightbox}
            >
              ✕
            </button>

            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/80"
              onClick={(e) => {
                e.stopPropagation()
                navigateImage("prev")
              }}
            >
              ←
            </button>

            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/80"
              onClick={(e) => {
                e.stopPropagation()
                navigateImage("next")
              }}
            >
              →
            </button>

            <div className="flex flex-col items-center">
              <img
                src={currentImages[selectedImage] || "/placeholder.svg"}
                alt={imageTitles[selectedImage]}
                className="max-h-[80vh] max-w-full object-contain"
              />
              <div className="mt-2 text-white text-center">
                <p className="text-lg font-semibold">{imageTitles[selectedImage]}</p>
                <p className="text-sm">
                  {selectedImage + 1} of {currentImages.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
