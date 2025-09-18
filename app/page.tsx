'use client';

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-50 to-blue-100 p-8 flex flex-col items-center justify-center space-y-12 font-sans">
      {/* Hero Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">⚡ The Future Is Live</h1>
        <h2 className="text-xl sm:text-2xl text-pink-600 font-medium">Tonight’s Theme: Endless Sommar</h2>
      </div>

      {/* Two Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* Make Your Avatar */}
        <div
          onClick={() => router.push('/avatar')}
          className="cursor-pointer bg-white hover:bg-pink-50 border-2 border-pink-300 rounded-lg p-8 shadow-md transition-all flex flex-col items-center text-center"
        >
          <span className="text-5xl mb-4">🧍‍♀️</span>
          <h3 className="text-xl font-bold">Create Your Endless Sommar Avatar</h3>
          <p className="text-gray-600 mt-2 text-sm">
            Upload your photo and choose your vibe. Generate a summer-styled avatar in seconds.
          </p>
        </div>

        {/* Make Visuals for Artists */}
        <div
          onClick={() => router.push('/visuals')}
          className="cursor-pointer bg-white hover:bg-blue-50 border-2 border-blue-300 rounded-lg p-8 shadow-md transition-all flex flex-col items-center text-center"
        >
          <span className="text-5xl mb-4">🎆</span>
          <h3 className="text-xl font-bold">Create Visuals for Tonight’s Artists</h3>
          <p className="text-gray-600 mt-2 text-sm">
            Remix stage visuals using artist styles and your input. Co-create something epic.
          </p>
        </div>
      </div>
    </div>
  );
}
