import React from 'react';
import { CubeCanvas } from '@/components/CubeCanvas';
import { CubeControls } from '@/components/CubeControls';
export function HomePage() {
  return (
    <div className="w-screen h-screen bg-gray-900 text-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-indigo-900/50" />
      <header className="absolute top-0 left-0 right-0 pt-8 md:pt-12 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-white tracking-wider">
            Cubic Art
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mt-2 font-sans font-light">
            An Interactive 3D Cube
          </p>
        </div>
      </header>
      <main className="w-full h-full">
        <CubeCanvas />
      </main>
      <CubeControls />
      <footer className="absolute bottom-4 left-0 right-0 text-center text-gray-500 text-sm z-10">
        <p>Built with ❤️ at Cloudflare</p>
      </footer>
    </div>
  );
}