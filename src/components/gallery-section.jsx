"use client"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

const galleryImages = [
  { src: "/images/campus-hero.png", alt: "Campus Entrance" },
  { src: "/images/img_fox.jpg", alt: "Arctic Fox in Snow" },
  { src: "/images/img_eagle.jpg", alt: "Majestic Eagle" },
  { src: "/images/christmas2.jpg", alt: "Christmas Telephone Booth" },
  { src: "/images/christmas5.jpg", alt: "Santa Claus Ornament" },
]

export function GallerySection() {
  return (
    <section id="gallery" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Campus Life & Events
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A glimpse into the vibrant life at our university.
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {galleryImages.map((image, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="relative aspect-square flex items-center justify-center p-0">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  )
}
