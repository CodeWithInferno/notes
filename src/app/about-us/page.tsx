export function TestimonialsSection() {
    return (
      <section id="testimonials" className="py-16 px-5 bg-gradient-to-r from-[#6a1919] to-[#c99a00] shadow-lg">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">What Our Users Say</h2>
          <p className="text-lg text-gray-200 text-center mb-10 max-w-2xl mx-auto">
            Hear from students who have transformed their study experience with GUNotes.
          </p>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="border-5 border-[#ff7e5f] rounded-lg transform transition-transform duration-300 hover:scale-105 animate-slideIn">
              <div className="bg-white rounded-md shadow-xl p-8 text-center relative">
                <span className="text-2xl font-extrabold text-black mb-4 block">Saving notes is easy</span>
                <blockquote className="text-gray-700 italic mb-6">
                  "I expected it to taste bad, but it didn't. Burned my mouth though."
                </blockquote>
                <h3 className="text-xl font-light text-gray-800">Mina MacClellan</h3>
                <h4 className="text-base font-extralight text-gray-600 mb-6">Massage Therapist</h4>
                <img
                  src="https://assets.codepen.io/5303666/1.jpg"
                  alt="Mina MacClellan"
                  className="w-20 h-20 rounded-full mx-auto -mt-8 shadow-lg"
                />
              </div>
            </div>
  
            {/* Testimonial 2 */}
            <div className="border-5 border-[#ff7e5f] rounded-lg transform transition-transform duration-300 hover:scale-105 animate-slideIn">
              <div className="bg-white rounded-md shadow-xl p-8 text-center relative">
                <span className="text-2xl font-extrabold text-black mb-4 block">Good Management</span>
                <blockquote className="text-gray-700 italic mb-6">
                  "Pizza Box takes the guesswork out of a common dilemma by making it easy."
                </blockquote>
                <h3 className="text-xl font-light text-gray-800">Edgars Abrams</h3>
                <h4 className="text-base font-extralight text-gray-600 mb-6">Accountant</h4>
                <img
                  src="https://assets.codepen.io/5303666/2.jpg"
                  alt="Edgars Abrams"
                  className="w-20 h-20 rounded-full mx-auto -mt-8 shadow-lg"
                />
              </div>
            </div>
  
            {/* Testimonial 3 */}
            <div className="border-5 border-[#ff7e5f] rounded-lg transform transition-transform duration-300 hover:scale-105 animate-slideIn">
              <div className="bg-white rounded-md shadow-xl p-8 text-center relative">
                <span className="text-2xl font-extrabold text-black mb-4 block">Accessibility of notes</span>
                <blockquote className="text-gray-700 italic mb-6">
                  "So if I sign this saying you can use my picture on the website, I get $50?"
                </blockquote>
                <h3 className="text-xl font-light text-gray-800">Seth Hull</h3>
                <h4 className="text-base font-extralight text-gray-600 mb-6">Model Train Engineer</h4>
                <img
                  src="https://assets.codepen.io/5303666/3.jpg"
                  alt="Seth Hull"
                  className="w-20 h-20 rounded-full mx-auto -mt-8 shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  