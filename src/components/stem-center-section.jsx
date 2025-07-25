"use client"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Lightbulb } from "lucide-react"

export function StemCenterSection() {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
        >
          <Card className="p-8 md:p-12 bg-card/30 backdrop-blur-lg border border-border text-center">
            <Lightbulb className="h-12 w-12 text-secondary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">
              An Initiative of the Gannon University STEM Center
            </h2>
            <p className="max-w-3xl mx-auto text-muted-foreground text-lg">
              GUNotes is a project born from the spirit of innovation and collaboration at the Gannon University STEM Center. Our mission is to leverage technology to foster a connected and empowered learning community, providing students with the tools they need to succeed.
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
