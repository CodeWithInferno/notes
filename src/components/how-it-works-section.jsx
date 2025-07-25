"use client"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Upload, Search, Award } from "lucide-react"

const steps = [
  {
    icon: <Upload className="h-10 w-10 text-primary" />,
    title: "1. Share Your Knowledge",
    description: "Upload your notes, study guides, and lab results to contribute to the collective knowledge base.",
  },
  {
    icon: <Search className="h-10 w-10 text-primary" />,
    title: "2. Discover & Learn",
    description: "Explore a vast library of peer-reviewed content, and find the exact materials you need to excel.",
  },
  {
    icon: <Award className="h-10 w-10 text-primary" />,
    title: "3. Earn Recognition",
    description: "Gain Kudos points for your contributions and get rewarded for your hard work and expertise.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Get Started in Seconds</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="p-8 text-center bg-transparent border-none shadow-none">
                <div className="flex justify-center mb-6">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
