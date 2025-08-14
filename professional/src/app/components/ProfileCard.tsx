import React from 'react'
import { profile } from '../../data/data'

export const ProfileCard: React.FC = () => (
  <div className="bg-[#1c1c1c] p-6 rounded-2xl border border-[#2d2d2d] w-full">
    <div className="flex items-center mb-6">
      <div className="relative">
        <img
          src={profile.image}
          alt={profile.name}
          className="rounded-full w-20 h-20 border-2 border-green-500"
        />
        
      </div>
      <div className="ml-4 flex-1">
        <h1 className="text-xl font-bold text-white flex items-center">
          {profile.name}
        </h1>
        <p className="text-gray-400">{profile.title}</p>
        <p className="text-gray-400 text-sm">Hobby: YouTube cinematics for Assetto Corsa (@qlintenFX)</p>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-2 mb-6">
      <div className="flex items-center text-sm text-gray-300 bg-[#2d2d2d] rounded-lg p-2 border border-[#444]">
        <span className="mr-2">🌐</span> English & Dutch
      </div>
      <div className="flex items-center text-sm text-gray-300 bg-[#2d2d2d] rounded-lg p-2 border border-[#444]">
        <span className="mr-2">🛡️</span> Security & DevOps
      </div>
      <div className="flex items-center text-sm text-gray-300 bg-[#2d2d2d] rounded-lg p-2 border border-[#444]">
        <span className="mr-2">📍</span> Belgium (UTC+1)
      </div>
    </div>
    <div className="flex flex-wrap gap-2">
      <a 
        href="https://github.com/qlintenFX/" target="_blank" rel="noopener noreferrer"
        className="px-3 py-2 rounded-xl bg-[#2d2d2d] text-gray-300 border border-[#444] hover:bg-[#3a3a3a]"
        aria-label="GitHub"
      >GitHub</a>
      <a 
        href="https://www.youtube.com/@qlintenFX" target="_blank" rel="noopener noreferrer"
        className="px-3 py-2 rounded-xl bg-[#2d2d2d] text-gray-300 border border-[#444] hover:bg-[#3a3a3a]"
        aria-label="YouTube"
      >YouTube</a>
      <a 
        href="https://www.linkedin.com/in/quinten-de-meyer-2336282a2/" target="_blank" rel="noopener noreferrer"
        className="px-3 py-2 rounded-xl bg-[#2d2d2d] text-gray-300 border border-[#444] hover:bg-[#3a3a3a]"
        aria-label="LinkedIn"
      >LinkedIn</a>
      <a 
        href="mailto:quinten1508@gmail.com"
        className="px-3 py-2 rounded-xl bg-[#2d2d2d] text-gray-300 border border-[#444] hover:bg-[#3a3a3a]"
        aria-label="Email"
      >Email</a>
    </div>
  </div>
)


