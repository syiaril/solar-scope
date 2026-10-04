'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { planets } from '@/data/planets';
import { Planet } from '@/types/planet';
import { calculateOrbitalPosition, getInitialAngles, BASE_SPEED } from '@/lib/simulation';
import { Sun } from './Sun';
import { Orbit } from './Orbit';
import { Planet as PlanetComponent } from './Planet';
import { PlanetInfo } from './PlanetInfo';
import { SimulationControls } from './SimulationControls';

const PLANET_SIZES: Record<string, number> = {
  mercury: 4,
  venus: 5.5,
  earth: 6,
  mars: 5,
  jupiter: 13,
  saturn: 10.5,
  uranus: 8,
  neptune: 7.5,
};

const CENTER_X = 375;
const CENTER_Y = 375;

// Generate star positions once
const STARS = Array.from({ length: 28 }, (_, i) => ({
  x: ((i * 173 + 47) % 750),
  y: ((i * 239 + 83) % 750),
  r: (i % 3 === 0) ? 1.3 : 0.8,
  opacity: 0.2 + (i % 5) * 0.12,
}));

export default function SolarSystem() {
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [, setFrameTick] = useState(0);

  const anglesRef = useRef<Record<string, number>>(getInitialAngles());
  const animFrameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  const animate = useCallback(
    (time: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = time;
      }
      const delta = Math.min(time - lastTimeRef.current, 100); // Batasi clamp delta agar tidak loncat bila tab idle
      lastTimeRef.current = time;

      if (isPlaying) {
        const speedFactor = speed * (delta / 16.67);
        for (const planet of planets) {
          anglesRef.current[planet.id] =
            (anglesRef.current[planet.id] || 0) +
            planet.orbitSpeed * BASE_SPEED * speedFactor;
        }
        setFrameTick((prev) => (prev + 1) % 1000000);
      }

      animFrameRef.current = requestAnimationFrame(animate);
    },
    [isPlaying, speed]
  );

  useEffect(() => {
    lastTimeRef.current = 0;
    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [animate]);

  const handleReset = useCallback(() => {
    anglesRef.current = getInitialAngles();
    lastTimeRef.current = 0;
    setFrameTick((prev) => (prev + 1) % 1000000);
  }, []);

  const handleSelectPlanet = useCallback(
    (planet: Planet) => {
      setSelectedPlanet((prev) => (prev?.id === planet.id ? null : planet));
    },
    []
  );

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 items-start justify-center">
      {/* Area Simulasi SVG */}
      <div className="flex-1 w-full flex flex-col items-center gap-5">
        <div className="w-full max-w-[680px] aspect-square relative bg-[#050816]/60 rounded-3xl p-2 border border-slate-800/80 shadow-2xl flex items-center justify-center">
          <svg
            viewBox="0 0 750 750"
            className="w-full h-full"
            role="img"
            aria-label="Simulasi Tata Surya interaktif bergerak"
          >
            {/* Taburan Bintang Latar Belakang */}
            {STARS.map((star, i) => (
              <circle
                key={`star-${i}`}
                cx={star.x}
                cy={star.y}
                r={star.r}
                fill="white"
                opacity={star.opacity}
              />
            ))}

            {/* Jalur Orbit Tiap Planet */}
            {planets.map((planet) => (
              <Orbit
                key={`orbit-${planet.id}`}
                cx={CENTER_X}
                cy={CENTER_Y}
                radius={planet.orbitRadius}
              />
            ))}

            {/* Matahari di Pusat Orbit */}
            <Sun cx={CENTER_X} cy={CENTER_Y} />

            {/* Planet Mengorbit */}
            {planets.map((planet) => {
              const currentAngle = anglesRef.current[planet.id] ?? 0;
              const pos = calculateOrbitalPosition(
                CENTER_X,
                CENTER_Y,
                planet.orbitRadius,
                currentAngle
              );

              return (
                <PlanetComponent
                  key={planet.id}
                  id={planet.id}
                  name={planet.name}
                  color={planet.color}
                  x={pos.x}
                  y={pos.y}
                  size={PLANET_SIZES[planet.id] || 5}
                  isSelected={selectedPlanet?.id === planet.id}
                  hasRings={planet.id === 'saturn'}
                  onClick={() => handleSelectPlanet(planet)}
                />
              );
            })}
          </svg>
        </div>

        {/* Panel Kontrol Simulasi */}
        <SimulationControls
          isPlaying={isPlaying}
          speed={speed}
          onTogglePlay={() => setIsPlaying((p) => !p)}
          onReset={handleReset}
          onSpeedChange={setSpeed}
        />

        <p className="text-xs text-slate-400 text-center">
          Skala visual disesuaikan agar seluruh planet dapat terlihat.
        </p>
      </div>

      {/* Panel Info Planet Terpilih */}
      <PlanetInfo
        planet={selectedPlanet}
        onClose={() => setSelectedPlanet(null)}
      />
    </div>
  );
}
