'use client';

import { useState, useEffect, useCallback } from 'react';
import { planets, sunData } from '@/data/planets';
import { Planet } from '@/types/planet';
import { calculateOrbitalPosition, getInitialAngles, BASE_SPEED } from '@/lib/simulation';
import { Sun } from './Sun';
import { Planet as PlanetComponent } from './Planet';

interface SolarSystemProps {
  selectedPlanet?: Planet | null;
  onSelectPlanet?: (planet: Planet) => void;
  isPlaying?: boolean;
  speed?: number;
  resetTrigger?: number;
}

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

export default function SolarSystem({
  selectedPlanet: controlledSelectedPlanet,
  onSelectPlanet: controlledOnSelectPlanet,
  isPlaying: controlledIsPlaying,
  speed: controlledSpeed,
  resetTrigger = 0,
}: SolarSystemProps = {}) {
  const [internalSelectedPlanet, setInternalSelectedPlanet] = useState<Planet | null>(null);
  const [internalIsPlaying] = useState(true);
  const [internalSpeed] = useState(1);
  const [angles, setAngles] = useState<Record<string, number>>(getInitialAngles);
  const [prevResetTrigger, setPrevResetTrigger] = useState(resetTrigger);

  const selectedPlanet =
    controlledOnSelectPlanet !== undefined ? (controlledSelectedPlanet ?? null) : internalSelectedPlanet;
  const isPlaying = controlledIsPlaying !== undefined ? controlledIsPlaying : internalIsPlaying;
  const speed = controlledSpeed !== undefined ? controlledSpeed : internalSpeed;

  if (resetTrigger !== prevResetTrigger) {
    setPrevResetTrigger(resetTrigger);
    setAngles(getInitialAngles());
  }

  useEffect(() => {
    let animId = 0;
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      animId = requestAnimationFrame(loop);

      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      if (isPlaying) {
        const speedFactor = speed * (delta * 60);
        setAngles((prev) => {
          const next: Record<string, number> = {};
          for (const planet of planets) {
            next[planet.id] =
              (prev[planet.id] || 0) +
              planet.orbitSpeed * BASE_SPEED * speedFactor;
          }
          return next;
        });
      }
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, speed]);

  const handleSelectPlanet = useCallback(
    (planet: Planet) => {
      if (controlledOnSelectPlanet) {
        controlledOnSelectPlanet(planet);
      } else {
        setInternalSelectedPlanet((prev) => (prev?.id === planet.id ? null : planet));
      }
    },
    [controlledOnSelectPlanet]
  );

  const handleSelectSun = useCallback(() => {
    if (controlledOnSelectPlanet) {
      controlledOnSelectPlanet(sunData);
    } else {
      setInternalSelectedPlanet((prev) => (prev?.id === sunData.id ? null : sunData));
    }
  }, [controlledOnSelectPlanet]);

  return (
    <div className="w-full h-full flex items-center justify-center p-2 sm:p-4">
      <svg
        viewBox="0 0 750 750"
        className="w-full h-full max-h-full max-w-full aspect-square"
        role="img"
        aria-label="Simulasi Tata Surya 2D Skematik interaktif bergerak"
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
          <circle
            key={`orbit-${planet.id}`}
            cx={CENTER_X}
            cy={CENTER_Y}
            r={planet.orbitRadius}
            stroke="rgba(148, 163, 184, 0.15)"
            strokeWidth={1}
            fill="none"
          />
        ))}

        {/* Matahari di Pusat Orbit (Interaktif saat diklik) */}
        <Sun
          cx={CENTER_X}
          cy={CENTER_Y}
          isSelected={selectedPlanet?.id === 'sun'}
          onClick={handleSelectSun}
        />

        {/* Planet Mengorbit */}
        {planets.map((planet) => {
          const currentAngle = angles[planet.id] ?? 0;
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
  );
}
