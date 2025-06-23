"use client"

import { useState } from "react"
import { Gem, PenToolIcon as Tools, Smile, Lock, ChevronRight } from "lucide-react"

export function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(null)

  const features = [
    {
      icon: <Gem className="text-[#f7d354] w-16 h-16" />,
      title: "Quality Notes",
      description: "Access comprehensive, well-organized notes for all your courses.",
      stats: { users: "5,000+", rating: "4.8/5" },
      details:
        "Our notes are created by top students and reviewed by professors to ensure accuracy and completeness. Each set of notes includes key concepts, examples, and study tips.",
    },
    {
      icon: <Tools className="text-[#f7d354] w-16 h-16" />,
      title: "Study Tools",
      description: "Powerful tools to help you study more effectively and efficiently.",
      stats: { tools: "15+", efficiency: "+40%" },
      details:
        "Our platform includes flashcards, practice quizzes, mind maps, and study planners. These tools are designed to help you retain information better and prepare for exams more effectively.",
    },
    {
      icon: <Smile className="text-[#f7d354] w-16 h-16" />,
      title: "User Experience",
      description: "An intuitive interface designed with students in mind.",
      stats: { satisfaction: "96%", retention: "92%" },
      details:
        "We've designed our platform to be easy to use and accessible on all devices. With dark mode, customizable themes, and offline access, you can study your way, anywhere.",
    },
    {
      icon: <Lock className="text-[#f7d354] w-16 h-16" />,
      title: "Secure Platform",
      description: "Your data and notes are always safe and private.",
      stats: { uptime: "99.9%", security: "256-bit" },
      details:
        "We use industry-standard encryption to protect your data. Your notes are backed up automatically, and you control who can access your shared content.",
    },
  ]

  return (
    <section id="features" className="py-16 px-5 bg-gradient-to-r from-[#6a1919] to-[#c99a00] text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Premium Features</h2>
          <p className="text-lg text-gray-200 mb-6 max-w-2xl mx-auto">
            Discover the tools and features that make GUNotes the preferred choice for students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[rgba(168,21,21,0.9)] to-[rgba(77,9,9,0.95)] rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              onMouseEnter={() => setActiveFeature(index)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              <div className="p-6">
                <div className="flex justify-center items-center mb-6 transition-all duration-300">
                  <div
                    className={`p-4 rounded-full bg-[rgba(255,255,255,0.1)] ${
                      activeFeature === index ? "animate-pulse" : ""
                    }`}
                  >
                    {feature.icon}
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-3 text-center text-[#f7d354]">{feature.title}</h3>
                <p className="text-gray-200 text-center mb-4">{feature.description}</p>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  {Object.entries(feature.stats).map(([key, value], i) => (
                    <div key={i} className="bg-black/20 p-2 rounded text-center">
                      <div className="text-[#f7d354] font-bold text-xl">{value}</div>
                      <div className="text-xs text-gray-300 capitalize">{key}</div>
                    </div>
                  ))}
                </div>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    activeFeature === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-sm text-gray-300 mb-4">{feature.details}</p>
                </div>

                <div className="text-center mt-4">
                  <button className="inline-flex items-center text-[#f7d354] hover:text-white transition-colors">
                    Learn more <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
