import React from 'react'

export const Projects: React.FC<{ projects: Array<{ title: string; description: string; image: string }> }> = ({ projects }) => (
  <div className="bg-[#1c1c1c] p-6 rounded-2xl border border-[#2d2d2d] w-full">
    <h2 className="text-white text-lg font-bold">Projects</h2>
    <p className="text-gray-400 text-sm mt-1 mb-4">Here are some of my projects I have worked on.</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {projects.map((project, index) => (
        <div key={index} className="bg-[#2d2d2d] rounded-xl overflow-hidden border border-[#444]">
          <img src={project.image} alt={project.title} className="w-full h-auto object-cover" />
          <div className="p-4">
            <h3 className="text-white font-semibold">{project.title}</h3>
            <p className="text-gray-400 text-sm">{project.description}</p>
          </div>
        </div>
      ))}
    </div>
    <div className="mt-6 flex justify-center">
      <a href="#projects" className="bg-green-500 text-black py-2 px-4 rounded-xl font-semibold flex items-center space-x-2">
        <span>View All Projects</span>
        <svg className="w-5 h-5 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
      </a>
    </div>
  </div>
)


