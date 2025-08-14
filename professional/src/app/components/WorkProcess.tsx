import React from 'react'

export const WorkProcess: React.FC<{ workProcess: Array<{ id: number; title: string; description: string; icon: React.ReactNode }> }> = ({ workProcess }) => (
  <div className="bg-[#1c1c1c] p-6 rounded-2xl border border-[#2d2d2d] w-full">
    <h2 className="text-white text-lg font-bold">Work Process</h2>
    <p className="text-gray-400 text-sm mt-1 mb-4">My work process explained in 4 simple steps.</p>
    <div className="space-y-4">
      {workProcess.map((step) => (
        <div key={step.id} className="flex items-start">
          <div className="w-10 h-10 bg-[#2d2d2d] flex-shrink-0 rounded-full flex items-center justify-center border border-[#444]">
            {step.icon}
          </div>
          <div className="ml-4 flex-1">
            <h3 className="text-white font-semibold flex justify-between items-center">
              {step.title}
              <span className="text-gray-500 text-xs">#{step.id}</span>
            </h3>
            <p className="text-gray-400 text-sm">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
)


