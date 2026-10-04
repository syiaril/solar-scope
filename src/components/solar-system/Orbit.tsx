'use client';

interface OrbitProps {
  cx: number;
  cy: number;
  radius: number;
}

export function Orbit({ cx, cy, radius }: OrbitProps) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={radius}
      stroke="rgba(148, 163, 184, 0.15)"
      strokeWidth={1}
      fill="none"
    />
  );
}
