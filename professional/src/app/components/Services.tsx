import React from 'react'

export const Services: React.FC<{ services: string[] }> = ({ services }) => (
  <div className="bg-[#1c1c1c] p-6 rounded-2xl border border-[#2d2d2d] w-full">
    <h2 className="text-white text-lg font-bold">Services</h2>
    <p className="text-gray-400 text-sm mt-1 mb-4">My services are tailored to your needs and budget</p>
    <div className="flex flex-wrap gap-2">
      {services.map((service, index) => (
        <span key={index} className="bg-[#2d2d2d] text-gray-300 text-sm rounded-full px-4 py-2 border border-[#444] cursor-pointer hover:bg-[#3d3d3d]">
          {service}
        </span>
      ))}
    </div>
  </div>
)


