"use client"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

const testimonials = [
  {
    quote: "This platform has been a game-changer for my study habits. The quality of the notes is top-notch.",
    name: "Sarah J.",
    role: "Nursing Student",
  },
  {
    quote: "As a tutor, I can easily share my resources with a wider audience. The feedback system is fantastic.",
    name: "Michael B.",
    role: "Engineering Tutor",
  },
  {
    quote: "I found notes for a class I was struggling with, and it made all the difference. A true community.",
    name: "Emily K.",
    role: "Business Major",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Built for Gannon, by Gannon</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
             <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="bg-card/50 backdrop-blur-lg border-border h-full">
                <CardContent className="pt-6">
                  <p className="text-lg italic">"{testimonial.quote}"</p>
                  <div className="mt-4">
                    <p className="font-semibold text-primary">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}