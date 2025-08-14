export const Socials: React.FC<{ socials: Array<{ name: string; href: string }> }> = ({ socials }) => (
  <div className="bg-[#1c1c1c] p-6 rounded-2xl border border-[#2d2d2d] w-full">
    <h2 className="text-white text-lg font-bold">Socials</h2>
    <p className="text-gray-400 text-sm mt-1 mb-4">Connect with me</p>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {socials.map((s) => (
        <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-200 bg-[#2d2d2d] rounded-xl p-4 border border-[#444] text-center hover:bg-[#3d3d3d]">
          {s.name}
        </a>
      ))}
    </div>
  </div>
)


