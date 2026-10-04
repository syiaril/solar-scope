'use client';

import { Planet } from '@/types/planet';
import { motion, AnimatePresence } from 'motion/react';

interface PlanetInfoProps {
  planet: Planet | null;
  onClose: () => void;
}

export function PlanetInfo({ planet, onClose }: PlanetInfoProps) {
  const stats = planet
    ? [
        { label: 'Urutan Orbit', value: `Ke-${planet.order} dari Matahari`, colorClass: 'text-white' },
        { label: 'Jarak Matahari', value: `${planet.distanceFromSun.toLocaleString('id-ID')} jt km`, colorClass: 'text-sky-300' },
        { label: 'Diameter', value: `${planet.diameter.toLocaleString('id-ID')} km`, colorClass: 'text-white' },
        { label: 'Rotasi Sumbu', value: planet.rotationPeriod, colorClass: 'text-white' },
        { label: 'Revolusi Orbit', value: planet.revolutionPeriod, colorClass: 'text-amber-300', span: 'col-span-2' },
      ]
    : [];

  return (
    <AnimatePresence>
      {planet && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="absolute top-4 right-4 z-30 w-[90%] sm:w-80 md:w-96 max-h-[85%] bg-[#0B1020]/90 backdrop-blur-xl border border-slate-700/80 rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.7)] flex flex-col pointer-events-auto"
        >
          {/* Header Panel Melayang */}
          <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/60">
            <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
              <span
                className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm"
                style={{ backgroundColor: planet.color }}
              />
              <span className="tracking-wide">{planet.name}</span>
            </h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800/80 transition-colors"
              aria-label="Tutup panel informasi"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Isi Konten Melayang */}
          <div className="p-4 sm:p-5 overflow-y-auto text-slate-300 space-y-4 text-xs sm:text-sm">
            <p className="leading-relaxed text-slate-200">
              {planet.description}
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className={`bg-slate-900/70 p-2.5 rounded-xl border border-slate-800 ${s.span || ''}`}
                >
                  <span className="block text-slate-400 mb-0.5 text-[11px]">{s.label}</span>
                  <span className={`font-bold ${s.colorClass}`}>{s.value}</span>
                </div>
              ))}
            </div>

            {/* Fakta Unik */}
            <div className="bg-indigo-950/40 border border-indigo-800/60 p-3 rounded-xl">
              <h3 className="text-indigo-300 font-semibold mb-1 flex items-center gap-1.5 text-xs">
                <span>✨</span>
                Tahukah Kamu?
              </h3>
              <p className="text-indigo-200/90 text-xs leading-relaxed">
                {planet.fact}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
