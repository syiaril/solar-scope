'use client';

import { useState } from 'react';

interface SunProps {
  cx: number;
  cy: number;
  isSelected?: boolean;
  onClick?: () => void;
}

export function Sun({ cx, cy, isSelected, onClick }: SunProps) {
  const [isHovered, setIsHovered] = useState(false);
  const showLabel = isHovered || isSelected;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <g
      className="cursor-pointer outline-none"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      role="button"
      aria-label="Matahari (Pusat Tata Surya)"
    >
      <defs>
        <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF3A8" />
          <stop offset="35%" stopColor="#FDB813" />
          <stop offset="100%" stopColor="#EA580C" />
        </radialGradient>
        <filter id="sunGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={isSelected || isHovered ? "14" : "9"} result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Hitbox sentuh/klik Matahari */}
      <circle cx={cx} cy={cy} r={34} fill="transparent" />

      {/* Bola Matahari utama */}
      <circle
        cx={cx}
        cy={cy}
        r={isHovered ? 30 : 28}
        fill="url(#sunGradient)"
        filter="url(#sunGlow)"
        stroke={isSelected ? '#FFFFFF' : 'rgba(255,255,255,0.4)'}
        strokeWidth={isSelected ? 2 : 0.5}
        className="transition-all duration-300"
      />

      {/* Label Nama saat Hover/Selected */}
      {showLabel && (
        <g className="pointer-events-none select-none">
          <rect
            x={cx - 36}
            y={cy - 48}
            width={72}
            height={18}
            rx={5}
            fill="#0B1020"
            stroke="#FDB813"
            strokeWidth={1}
            opacity={0.92}
          />
          <text
            x={cx}
            y={cy - 35}
            textAnchor="middle"
            fill="#FDB813"
            fontSize="10"
            fontWeight="bold"
            className="tracking-wider"
          >
            Matahari ☀️
          </text>
        </g>
      )}
    </g>
  );
}
