'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { planets } from '@/data/planets';

export default function PlanetComparison() {
  const [planetAId, setPlanetAId] = useState('earth');
  const [planetBId, setPlanetBId] = useState('mars');

  const planetA = planets.find((p) => p.id === planetAId) || planets[2];
  const planetB = planets.find((p) => p.id === planetBId) || planets[3];

  const maxDiameter = Math.max(...planets.map((p) => p.diameter));
  const maxDistance = Math.max(...planets.map((p) => p.distanceFromSun));

  return (
    <div className="w-full bg-[#0B1020] border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-sm shadow-xl">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-2">
        Bandingkan Planet
      </h2>
      <p className="text-center text-slate-400 text-sm mb-8">
        Pilih dua planet untuk melihat perbedaan skala fisik dan karakteristik orbitnya.
      </p>

      {/* Selectors and Visuals */}
      <div className="grid grid-cols-2 gap-4 md:gap-12 mb-10">
        <div className="flex flex-col items-center">
          <label htmlFor="planet-a-select" className="sr-only">Pilih Planet Pertama</label>
          <select
            id="planet-a-select"
            value={planetAId}
            onChange={(e) => setPlanetAId(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 outline-none focus:border-[#7C3AED] transition-colors appearance-none text-center cursor-pointer font-semibold shadow-inner"
          >
            {planets.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <div className="relative flex items-center justify-center w-24 h-24 md:w-32 md:h-32 mt-6">
            <div
              className="w-20 h-20 md:w-28 md:h-28 rounded-full shadow-lg relative z-10"
              style={{
                background: `radial-gradient(circle at 35% 35%, ${planetA.color} 0%, #1e1b4b 100%)`,
                boxShadow: `inset -4px -4px 10px rgba(0,0,0,0.6), 0 0 20px ${planetA.color}40`,
              }}
            />
            {planetA.id === 'saturn' && (
              <div
                className="absolute z-20 w-32 h-10 border-2 rounded-[100%] pointer-events-none rotate-[-20deg]"
                style={{
                  borderColor: `${planetA.color}88`,
                  boxShadow: `0 0 10px ${planetA.color}40`,
                }}
              />
            )}
          </div>
          <span className="text-white font-bold mt-2 text-lg">{planetA.name}</span>
        </div>

        <div className="flex flex-col items-center">
          <label htmlFor="planet-b-select" className="sr-only">Pilih Planet Kedua</label>
          <select
            id="planet-b-select"
            value={planetBId}
            onChange={(e) => setPlanetBId(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 outline-none focus:border-[#38BDF8] transition-colors appearance-none text-center cursor-pointer font-semibold shadow-inner"
          >
            {planets.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <div className="relative flex items-center justify-center w-24 h-24 md:w-32 md:h-32 mt-6">
            <div
              className="w-20 h-20 md:w-28 md:h-28 rounded-full shadow-lg relative z-10"
              style={{
                background: `radial-gradient(circle at 35% 35%, ${planetB.color} 0%, #1e1b4b 100%)`,
                boxShadow: `inset -4px -4px 10px rgba(0,0,0,0.6), 0 0 20px ${planetB.color}40`,
              }}
            />
            {planetB.id === 'saturn' && (
              <div
                className="absolute z-20 w-32 h-10 border-2 rounded-[100%] pointer-events-none rotate-[-20deg]"
                style={{
                  borderColor: `${planetB.color}88`,
                  boxShadow: `0 0 10px ${planetB.color}40`,
                }}
              />
            )}
          </div>
          <span className="text-white font-bold mt-2 text-lg">{planetB.name}</span>
        </div>
      </div>

      {/* Numeric Comparisons */}
      <div className="space-y-6">
        {/* Diameter Bar Comparison */}
        <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-800">
          <div className="flex justify-between text-xs text-slate-400 font-medium uppercase tracking-wider mb-2">
            <span>{planetA.diameter.toLocaleString('id-ID')} km</span>
            <span className="text-slate-300 font-semibold">Diameter</span>
            <span>{planetB.diameter.toLocaleString('id-ID')} km</span>
          </div>
          <div className="flex items-center gap-2 h-5">
            <div className="w-1/2 flex justify-end">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.max(6, (planetA.diameter / maxDiameter) * 100)}%` }}
                transition={{ duration: 0.5 }}
                className="h-3 rounded-l-full bg-[#7C3AED]"
              />
            </div>
            <div className="w-0.5 h-full bg-slate-700" />
            <div className="w-1/2 flex justify-start">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.max(6, (planetB.diameter / maxDiameter) * 100)}%` }}
                transition={{ duration: 0.5 }}
                className="h-3 rounded-r-full bg-[#38BDF8]"
              />
            </div>
          </div>
        </div>

        {/* Distance from Sun Bar Comparison */}
        <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-800">
          <div className="flex justify-between text-xs text-slate-400 font-medium uppercase tracking-wider mb-2">
            <span>{planetA.distanceFromSun} jt km</span>
            <span className="text-slate-300 font-semibold">Jarak dari Matahari</span>
            <span>{planetB.distanceFromSun} jt km</span>
          </div>
          <div className="flex items-center gap-2 h-5">
            <div className="w-1/2 flex justify-end">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.max(6, (planetA.distanceFromSun / maxDistance) * 100)}%` }}
                transition={{ duration: 0.5 }}
                className="h-3 rounded-l-full bg-[#7C3AED]"
              />
            </div>
            <div className="w-0.5 h-full bg-slate-700" />
            <div className="w-1/2 flex justify-start">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.max(6, (planetB.distanceFromSun / maxDistance) * 100)}%` }}
                transition={{ duration: 0.5 }}
                className="h-3 rounded-r-full bg-[#38BDF8]"
              />
            </div>
          </div>
        </div>

        {/* Rotation & Revolution Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-800">
            <span className="block text-center text-xs text-slate-400 uppercase font-medium mb-3">
              Periode Rotasi
            </span>
            <div className="flex justify-between text-sm">
              <span className="text-[#7C3AED] font-bold">{planetA.rotationPeriod}</span>
              <span className="text-slate-600">vs</span>
              <span className="text-[#38BDF8] font-bold">{planetB.rotationPeriod}</span>
            </div>
          </div>

          <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-800">
            <span className="block text-center text-xs text-slate-400 uppercase font-medium mb-3">
              Periode Revolusi
            </span>
            <div className="flex justify-between text-sm">
              <span className="text-[#7C3AED] font-bold">{planetA.revolutionPeriod}</span>
              <span className="text-slate-600">vs</span>
              <span className="text-[#38BDF8] font-bold">{planetB.revolutionPeriod}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
