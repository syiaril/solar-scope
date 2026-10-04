'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Planet } from '@/types/planet';

interface PlanetCardProps {
  planet: Planet;
}

export default function PlanetCard({ planet }: PlanetCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isSaturn = planet.id === 'saturn';

  return (
    <motion.div
      layout
      whileHover={{ y: -5, boxShadow: `0 10px 25px -5px ${planet.color}33` }}
      onClick={() => setIsExpanded(!isExpanded)}
      className="cursor-pointer bg-[#0B1020] border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden backdrop-blur-sm transition-colors"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsExpanded(!isExpanded);
        }
      }}
      aria-expanded={isExpanded}
      aria-label={`Kartu informasi ${planet.name}`}
    >
      <motion.div layout className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex items-center justify-center w-16 h-16">
              <motion.div
                layoutId={`planet-visual-${planet.id}`}
                className="w-14 h-14 rounded-full relative z-10"
                style={{
                  background: `radial-gradient(circle at 35% 35%, ${planet.color} 0%, #1e1b4b 100%)`,
                  boxShadow: `inset -3px -3px 8px rgba(0,0,0,0.6), 0 0 15px ${planet.color}40`,
                }}
              />
              {isSaturn && (
                <div
                  className="absolute z-20 w-20 h-6 border-2 rounded-[100%] pointer-events-none rotate-[-20deg]"
                  style={{
                    borderColor: `${planet.color}88`,
                    boxShadow: `0 0 8px ${planet.color}40`,
                  }}
                />
              )}
            </div>
            <div>
              <motion.h3 layout="position" className="text-2xl font-bold text-white tracking-wide">
                {planet.name}
              </motion.h3>
              <div className="text-xs font-semibold px-2.5 py-0.5 bg-slate-800 text-slate-300 rounded-full inline-block mt-1 border border-slate-700">
                Planet ke-{planet.order}
              </div>
            </div>
          </div>
        </div>

        <motion.p layout="position" className="text-slate-300 text-sm leading-relaxed mb-4">
          {planet.description}
        </motion.p>

        {!isExpanded && (
          <motion.div
            layout="position"
            className="text-xs text-slate-400 flex justify-between items-center border-t border-slate-800/80 pt-3"
          >
            <span>Diameter:</span>
            <span className="font-semibold text-white">{planet.diameter.toLocaleString('id-ID')} km</span>
          </motion.div>
        )}

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-slate-800/80 space-y-3"
            >
              <div className="bg-indigo-950/20 border border-indigo-900/40 p-3 rounded-xl text-xs text-indigo-200">
                <span className="font-semibold text-indigo-300 block mb-1">Fakta Menarik:</span>
                {planet.fact}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block">Jarak Matahari</span>
                  <span className="font-semibold text-slate-200">{planet.distanceFromSun} jt km</span>
                </div>
                <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block">Diameter</span>
                  <span className="font-semibold text-slate-200">{planet.diameter.toLocaleString('id-ID')} km</span>
                </div>
                <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block">Periode Rotasi</span>
                  <span className="font-semibold text-slate-200">{planet.rotationPeriod}</span>
                </div>
                <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block">Periode Revolusi</span>
                  <span className="font-semibold text-slate-200">{planet.revolutionPeriod}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
