export const YouTube: React.FC<{ videos: string[] }> = ({ videos }) => (
  <div className="bg-[#1c1c1c] p-6 rounded-2xl border border-[#2d2d2d] w-full">
    <h2 className="text-white text-lg font-bold">YouTube</h2>
    <p className="text-gray-400 text-sm mt-1 mb-4">Featured videos from my channel</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {videos.map((id) => (
        <div key={id} className="relative rounded-lg overflow-hidden shadow-md" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${id}`}
            title={id}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      ))}
    </div>
  </div>
)


