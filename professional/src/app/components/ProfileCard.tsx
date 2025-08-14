import React from 'react'

export const ProfileCard: React.FC = () => (
  <div className="bg-[#1c1c1c] p-6 rounded-2xl border border-[#2d2d2d] w-full">
    <div className="flex items-center mb-6">
      <div className="relative">
        <img
          src="https://placehold.co/80x80/2d2d2d/ffffff?text=Quinten"
          alt="Quinten"
          className="rounded-full w-20 h-20 border-2 border-green-500"
        />
        <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full bg-green-500 border border-[#1c1c1c]"></span>
      </div>
      <div className="ml-4 flex-1">
        <h1 className="text-xl font-bold text-white flex items-center">
          Quinten De Meyer
          <span className="ml-2 text-xs text-gray-400 bg-[#2d2d2d] rounded-full px-2 py-0.5 border border-[#444] leading-none">
            Available to Work
          </span>
        </h1>
        <p className="text-gray-400">Applied Computer Science / Electronics - ICT</p>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-2 mb-6">
      <div className="flex items-center text-sm text-gray-300 bg-[#2d2d2d] rounded-lg p-2 border border-[#444]">
        <span className="mr-2">🌐</span> English & Dutch
      </div>
      <div className="flex items-center text-sm text-gray-300 bg-[#2d2d2d] rounded-lg p-2 border border-[#444]">
        <span className="mr-2">💼</span> Student / Freelancer
      </div>
      <div className="flex items-center text-sm text-gray-300 bg-[#2d2d2d] rounded-lg p-2 border border-[#444]">
        <span className="mr-2">🛡️</span> Security & DevOps
      </div>
      <div className="flex items-center text-sm text-gray-300 bg-[#2d2d2d] rounded-lg p-2 border border-[#444]">
        <span className="mr-2">📍</span> Belgium (UTC+1)
      </div>
    </div>
    <div className="flex space-x-2">
      <a href="#projects" className="flex-1 bg-green-500 text-black py-2 rounded-xl font-semibold text-center">
        View Projects
      </a>
      <a href="#contact" className="bg-[#2d2d2d] text-gray-300 py-2 px-4 rounded-xl border border-[#444]">
        Contact
      </a>
    </div>
  </div>
)


