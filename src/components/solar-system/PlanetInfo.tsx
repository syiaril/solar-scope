'use client';

import { Planet } from '@/types/planet';
import { motion, AnimatePresence } from 'motion/react';

interface PlanetInfoProps {
  planet: Planet | null;
  onClose: () => void;
}

export function PlanetInfo({ planet, onClose }: PlanetInfoProps) {
  return (
    <AnimatePresence>
      {planet && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.3 }}
          className="w-full lg:w-96 bg-[#0B1020] border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex-shrink-0"
        >
          <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: planet.color }}
              />
              {planet.name}
            </h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Tutup panel informasi"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="p-6 overflow-y-auto text-slate-300 space-y-5">
            <p className="text-base leading-relaxed text-slate-200">
              {planet.description}
            </p>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                <span className="block text-slate-500 mb-1 text-xs">Urutan</span>
                <span className="font-semibold text-white">
                  Ke-{planet.order} dari Matahari
                </span>
              </div>
              <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                <span className="block text-slate-500 mb-1 text-xs">Jarak dari Matahari</span>
                <span className="font-semibold text-white">
                  {planet.distanceFromSun.toLocaleString('id-ID')} juta km
                </span>
              </div>
              <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                <span className="block text-slate-500 mb-1 text-xs">Diameter</span>
                <span className="font-semibold text-white">
                  {planet.diameter.toLocaleString('id-ID')} km
                </span>
              </div>
              <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                <span className="block text-slate-500 mb-1 text-xs">Rotasi</span>
                <span className="font-semibold text-white">
                  {planet.rotationPeriod}
                </span>
              </div>
              <div className="col-span-2 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                <span className="block text-slate-500 mb-1 text-xs">Revolusi</span>
                <span className="font-semibold text-white">
                  {planet.revolutionPeriod}
                </span>
              </div>
            </div>

            <div className="bg-indigo-950/30 border border-indigo-900/50 p-4 rounded-xl">
              <h3 className="text-indigo-300 font-medium mb-2 flex items-center gap-2 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                Tahukah Kamu?
              </h3>
              <p className="text-indigo-200/80 text-sm leading-relaxed">
                {planet.fact}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
