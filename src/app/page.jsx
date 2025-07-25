"use client"
import Header from "../components/Header"
import { FeaturesSection } from "../components/features-section"
import { Footer } from "../components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { StemCenterSection } from "../components/stem-center-section"
import { HowItWorksSection } from "../components/how-it-works-section"
import { TestimonialsSection } from "../components/testimonials-section"

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <div className="aurora-background"></div>
      <Header />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="h-screen flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter">
                Where Knowledge Connects
              </h1>
              <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
                A project by the Gannon University STEM Center. Share your insights, discover new perspectives, and elevate your learning experience.
              </p>
              <div className="mt-10">
                <Link href="/api/auth/login" passHref>
                  <Button size="lg" className="bg-primary text-primary-foreground font-bold text-lg px-8 py-6 rounded-full transform hover:scale-105 transition-transform shadow-[0_0_30px_rgba(168,21,21,0.6)]">
                    Join the Collective <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <StemCenterSection />
        <HowItWorksSection />
        <FeaturesSection />
        <TestimonialsSection />

        {/* Final CTA Section */}
        <section className="py-32">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold">Ready to Begin?</h2>
            <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
              Create an account in seconds and unlock a universe of shared knowledge.
            </p>
            <div className="mt-8">
              <Link href="/api/auth/login" passHref>
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold text-lg px-8 py-6 rounded-full transform hover:scale-105 transition-transform shadow-[0_0_30px_rgba(234,179,8,0.4)]">
                  Sign Up for Free
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}