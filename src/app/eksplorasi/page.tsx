'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Planet } from '@/types/planet';
import { PlanetInfo } from '@/components/solar-system/PlanetInfo';
import { SimulationControls } from '@/components/solar-system/SimulationControls';
import SolarSystem2D from '@/components/solar-system/SolarSystem';

// Load Three.js 3D component dynamically client-side only
const SolarSystem3D = dynamic(
  () => import('@/components/solar-system/SolarSystem3D'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[620px] flex flex-col items-center justify-center text-slate-400 gap-3">
        <div className="w-12 h-12 border-4 border-sky-400 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-medium">Memuat Tata Surya 3D...</span>
      </div>
    ),
  }
);

export default function EksplorasiPage() {
  const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d');
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [resetTrigger, setResetTrigger] = useState(0);

  const handleTogglePlay = () => setIsPlaying((p) => !p);
  const handleReset = () => setResetTrigger((r) => r + 1);
  const handleSelectPlanet = (planet: Planet) => {
    setSelectedPlanet((prev) => (prev?.id === planet.id ? null : planet));
  };

  return (
    <main className="min-h-screen pt-20 pb-16 px-3 sm:px-4 bg-[#050816] text-white flex flex-col items-center">
      <div className="max-w-7xl w-full mx-auto flex flex-col items-center">
        {/* Header eksplorasi ringkas */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs text-[#FACC15] font-semibold mb-2">
            <span>🪐 Media Interaktif Tata Surya 3D & 2D</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-300 to-[#FACC15]">
            Eksplorasi Simulasi Tata Surya
          </h1>
          <p className="text-slate-300 text-xs md:text-sm max-w-2xl mx-auto">
            Gunakan mouse untuk putar sudut pandang (klik kiri), zoom (scroll), dan klik planet untuk melihat kartu informasi yang melayang.
          </p>
        </div>

        {/* Petunjuk Kontrol Navigasi Mouse (Instruksional) */}
        <div className="w-full max-w-3xl mb-5 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-300">
          <div className="bg-[#0B1020]/90 border border-slate-800 p-2.5 rounded-xl flex items-center gap-2">
            <span className="text-base">🖱️</span>
            <div>
              <span className="text-sky-400 font-bold block">Klik Kiri</span>
              <span>Putar Kamera</span>
            </div>
          </div>
          <div className="bg-[#0B1020]/90 border border-slate-800 p-2.5 rounded-xl flex items-center gap-2">
            <span className="text-base">🔄</span>
            <div>
              <span className="text-sky-400 font-bold block">Scroll Mouse</span>
              <span>Zoom In / Out</span>
            </div>
          </div>
          <div className="bg-[#0B1020]/90 border border-slate-800 p-2.5 rounded-xl flex items-center gap-2">
            <span className="text-base">🖐️</span>
            <div>
              <span className="text-sky-400 font-bold block">Klik R-Click</span>
              <span>Geser (Pan)</span>
            </div>
          </div>
          <div className="bg-[#0B1020]/90 border border-slate-800 p-2.5 rounded-xl flex items-center gap-2">
            <span className="text-base">🎯</span>
            <div>
              <span className="text-amber-400 font-bold block">Klik Planet</span>
              <span>Info Melayang</span>
            </div>
          </div>
        </div>

        {/* Tombol Pengalih Mode 3D / 2D */}
        <div className="flex items-center gap-2 mb-4 bg-slate-900/90 border border-slate-800 p-1.5 rounded-2xl shadow-lg">
          <button
            onClick={() => setViewMode('3d')}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              viewMode === '3d'
                ? 'bg-gradient-to-r from-[#7C3AED] to-[#38BDF8] text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🌐 Mode 3D (Orbit Bebas)</span>
          </button>
          <button
            onClick={() => setViewMode('2d')}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              viewMode === '2d'
                ? 'bg-gradient-to-r from-[#7C3AED] to-[#38BDF8] text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🗺️ Mode 2D (Skematik SVG)</span>
          </button>
        </div>

        {/* Kontainer Kanvas Penuh Lebar (Full Width Canvas Container) */}
        <div className="w-full bg-[#0B1020]/90 border border-slate-800 rounded-3xl p-3 sm:p-4 backdrop-blur-md shadow-2xl flex flex-col items-center">
          {viewMode === '3d' ? (
            <div className="w-full flex flex-col items-center gap-4">
              {/* Viewport 3D Canvas Penuh - Panel Melayang Berada di Dalamnya */}
              <div className="w-full h-[580px] lg:h-[680px] rounded-2xl overflow-hidden bg-[#030611] border border-slate-800/80 shadow-inner relative">
                <SolarSystem3D
                  selectedPlanet={selectedPlanet}
                  onSelectPlanet={handleSelectPlanet}
                  isPlaying={isPlaying}
                  speed={speed}
                  resetTrigger={resetTrigger}
                />

                {/* Panel Info Melayang (Overlay Card) di Sudut Atas Kanan Kanvas */}
                <PlanetInfo
                  planet={selectedPlanet}
                  onClose={() => setSelectedPlanet(null)}
                />

                {/* Petunjuk Interaksi di Sudut Bawah Kiri Kanvas */}
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[11px] text-slate-300 pointer-events-none select-none z-10">
                  Tahan klik kiri & geser untuk memutar | Scroll untuk zoom
                </div>
              </div>

              {/* Kontrol Kecepatan dan Play/Pause di Bawah Kanvas */}
              <SimulationControls
                isPlaying={isPlaying}
                speed={speed}
                onTogglePlay={handleTogglePlay}
                onReset={handleReset}
                onSpeedChange={setSpeed}
              />
            </div>
          ) : (
            <div className="w-full">
              <SolarSystem2D />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
