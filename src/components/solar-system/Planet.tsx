'use client';

import { useState } from 'react';

interface PlanetProps {
  id: string;
  name: string;
  color: string;
  x: number;
  y: number;
  size: number;
  isSelected: boolean;
  hasRings?: boolean;
  onClick: () => void;
}

export function Planet({
  id,
  name,
  color,
  x,
  y,
  size,
  isSelected,
  hasRings,
  onClick,
}: PlanetProps) {
  const [isHovered, setIsHovered] = useState(false);
  const showLabel = isHovered || isSelected;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <g
      transform={`translate(${x}, ${y}) scale(${isHovered ? 1.35 : 1})`}
      className="cursor-pointer outline-none transition-[filter] duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label={name}
      role="button"
    >
      <defs>
        <filter id={`glow-${id}`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Area sentuh ekstra lebar agar mudah diklik di desktop & touchscreen */}
      <circle cx={0} cy={0} r={Math.max(16, size + 8)} fill="transparent" />

      {/* Cincin Saturnus */}
      {hasRings && (
        <ellipse
          cx={0}
          cy={0}
          rx={size * 2.4}
          ry={size * 0.9}
          stroke={color}
          strokeWidth={1.5}
          fill="none"
          opacity={0.7}
          transform="rotate(-20)"
          className="pointer-events-none"
        />
      )}

      {/* Visual Tubuh Planet */}
      <circle
        cx={0}
        cy={0}
        r={size}
        fill={color}
        filter={isSelected || isHovered ? `url(#glow-${id})` : undefined}
        stroke={isSelected ? '#FFFFFF' : 'rgba(255,255,255,0.2)'}
        strokeWidth={isSelected ? 1.5 : 0.5}
      />

      {/* Label Nama Planet */}
      {showLabel && (
        <g className="pointer-events-none select-none">
          <rect
            x={-(name.length * 3.6 + 6)}
            y={-(size + 20)}
            width={name.length * 7.2 + 12}
            height={16}
            rx={4}
            fill="#0B1020"
            stroke={isSelected ? '#38BDF8' : 'rgba(255,255,255,0.2)'}
            strokeWidth={1}
            opacity={0.9}
          />
          <text
            x={0}
            y={-(size + 9)}
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="10"
            fontWeight="bold"
            className="tracking-wide"
          >
            {name}
          </text>
        </g>
      )}
    </g>
  );
}
