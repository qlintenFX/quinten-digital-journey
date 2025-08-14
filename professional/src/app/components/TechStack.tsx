import React from 'react'

export const TechStack: React.FC<{ techStack: Array<{ name: string; version?: string; icon: React.ReactNode }> }> = ({ techStack }) => (
  <div className="bg-[#1c1c1c] p-6 rounded-2xl border border-[#2d2d2d] w-full">
    <h2 className="text-white text-lg font-bold">My Tech Stack</h2>
    <p className="text-gray-400 text-sm mt-1 mb-4">My favorite tech stack I use on my projects.</p>
    <div className="grid grid-cols-2 gap-4">
      {techStack.map((tech, index) => (
        <div key={index} className="flex items-center bg-[#2d2d2d] rounded-xl p-4 border border-[#444]">
          {tech.icon}
          <div className="ml-3">
            <h3 className="text-white font-semibold">{tech.name}</h3>
            {tech.version && <p className="text-gray-400 text-xs">Version {tech.version}</p>}
          </div>
        </div>
      ))}
    </div>
  </div>
)


