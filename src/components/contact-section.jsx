"use client"

import { useState } from "react"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import Image from "next/image"

export function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    alert("Message sent successfully!")
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    })
  }

  return (
    <section id="contact" className="py-16 px-5 bg-[rgba(168,21,21,0.809)] text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Contact Info */}
        <div className="grid grid-cols-1 gap-10">
          <div className="flex flex-col items-center bg-white/10 p-5 rounded-lg shadow-lg text-center">
            <Phone className="w-8 h-8 text-[#f7d354] mb-3" />
            <span className="font-semibold text-lg">Phone No.</span>
            <span className="text-base opacity-90">(814) 871-7557</span>
          </div>

          <div className="flex flex-col items-center bg-white/10 p-5 rounded-lg shadow-lg text-center">
            <Mail className="w-8 h-8 text-[#f7d354] mb-3" />
            <span className="font-semibold text-lg">E-mail</span>
            <span className="text-base opacity-90">info@gannon.edu</span>
          </div>

          <div className="flex flex-col items-center bg-white/10 p-5 rounded-lg shadow-lg text-center">
            <MapPin className="w-8 h-8 text-[#f7d354] mb-3" />
            <span className="font-semibold text-lg">Address</span>
            <span className="text-base opacity-90">109 University Square, Erie PA 16541 United States</span>
          </div>

          <div className="flex flex-col items-center bg-white/10 p-5 rounded-lg shadow-lg text-center">
            <Clock className="w-8 h-8 text-[#f7d354] mb-3" />
            <span className="font-semibold text-lg">Opening Hours</span>
            <span className="text-base opacity-90">Monday - Friday (9:00 AM to 5:00 PM)</span>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white/10 p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full p-3 border-none rounded bg-[#333] text-white outline-none focus:shadow-[0_0_8px_rgba(255,126,95,0.8)]"
                required
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full p-3 border-none rounded bg-[#333] text-white outline-none focus:shadow-[0_0_8px_rgba(255,126,95,0.8)]"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="E-mail"
                className="w-full p-3 border-none rounded bg-[#333] text-white outline-none focus:shadow-[0_0_8px_rgba(255,126,95,0.8)]"
                required
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full p-3 border-none rounded bg-[#333] text-white outline-none focus:shadow-[0_0_8px_rgba(255,126,95,0.8)]"
                required
              />
            </div>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              placeholder="Message"
              className="w-full p-3 border-none rounded bg-[#333] text-white outline-none focus:shadow-[0_0_8px_rgba(255,126,95,0.8)] resize-none mb-4"
              required
            ></textarea>

            <button
              type="submit"
              className="w-full p-3 bg-gradient-to-r from-[#f7d354] to-[#f7971e] border-none rounded text-white text-xl cursor-pointer hover:bg-[#feb47b] transition-colors"
            >
              Send Message
            </button>
          </form>

          <div className="grid place-items-center mt-5 p-4 bg-gradient-to-r from-[#a81515] to-[#e63946] rounded-lg shadow-md overflow-hidden">
            <Image
              src="/images/contact.png"
              alt="Contact Us"
              width={300}
              height={200}
              className="w-full max-w-[300px] h-auto rounded object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
