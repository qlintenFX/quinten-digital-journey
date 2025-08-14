import React from 'react'
import { StarRating } from './StarRating'

export const Testimonials: React.FC<{ testimonials: Array<{ name: string; description: string; rating: number; quote: string }> }> = ({ testimonials }) => (
  <div className="bg-[#1c1c1c] p-6 rounded-2xl border border-[#2d2d2d] w-full">
    <h2 className="text-white text-lg font-bold">Testimonials</h2>
    <p className="text-gray-400 text-sm mt-1 mb-4">What my clients say about me.</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {testimonials.map((testimonial, index) => (
        <div key={index} className="bg-[#2d2d2d] rounded-xl p-4 border border-[#444]">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 rounded-full bg-gray-600 flex-shrink-0"></div>
            <div className="ml-3 flex-1">
              <div className="flex justify-between items-center">
                <h3 className="text-white font-semibold">{testimonial.name}</h3>
                <StarRating rating={testimonial.rating} />
              </div>
              <p className="text-gray-400 text-xs">{testimonial.description}</p>
            </div>
          </div>
          <p className="text-gray-300 text-sm">{testimonial.quote}</p>
        </div>
      ))}
    </div>
  </div>
)


