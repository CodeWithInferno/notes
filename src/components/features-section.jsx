"use client"
import { Gem, PenToolIcon as Tools, Smile, Lock } from "lucide-react"

const features = [
  {
    icon: <Gem className="h-10 w-10 text-blue-500" />,
    title: "Quality Notes",
    description: "Access comprehensive, well-organized notes for all your courses, created by top students and reviewed by professors.",
  },
  {
    icon: <Tools className="h-10 w-10 text-green-500" />,
    title: "Study Tools",
    description: "Utilize powerful tools like flashcards, practice quizzes, and mind maps to study more effectively.",
  },
  {
    icon: <Smile className="h-10 w-10 text-purple-500" />,
    title: "Intuitive Experience",
    description: "Enjoy a clean, modern, and accessible interface designed with students in mind, available on all your devices.",
  },
  {
    icon: <Lock className="h-10 w-10 text-red-500" />,
    title: "Secure & Private",
    description: "Your data and notes are always safe with industry-standard encryption and automatic backups.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Why Choose GUNotes?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the tools and features that make our platform the preferred choice for students.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mx-auto mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
