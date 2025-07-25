"use client"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Gem, Users, BarChart, Upload } from "lucide-react"

const features = [
  {
    title: "A Centralized Knowledge Hub",
    description: "Access a vast library of peer-reviewed notes, study guides, and resources, all in one place.",
    icon: <Gem className="h-8 w-8 text-primary" />,
  },
  {
    title: "Contribute and Be Recognized",
    description: "Upload your notes, earn Kudos points for your contributions, and build your academic reputation.",
    icon: <Upload className="h-8 w-8 text-primary" />,
  },
  {
    title: "A Community of Scholars",
    description: "Join a network of Gannon's brightest minds, all dedicated to mutual academic success.",
    icon: <Users className="h-8 w-8 text-primary" />,
  },
  {
    title: "Track Your Impact",
    description: "See how your notes are helping others through a transparent rating and review system.",
    icon: <BarChart className="h-8 w-8 text-primary" />,
  },
]

const cardVariants = {
  offscreen: {
    y: 100,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 1,
    },
  },
}

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-4">
      <div className="container mx-auto">
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card className="p-8 bg-card/50 backdrop-blur-lg border border-border h-full hover:border-primary/50 transition-colors group">
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-lg">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}