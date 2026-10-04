export interface OrbitalState {
  angle: number;
  x: number;
  y: number;
}

export function calculateOrbitalPosition(
  centerX: number,
  centerY: number,
  orbitRadius: number,
  angle: number
): { x: number; y: number } {
  return {
    x: centerX + orbitRadius * Math.cos(angle),
    y: centerY + orbitRadius * Math.sin(angle),
  };
}

export function getInitialAngles(): Record<string, number> {
  // Spread planets around the orbit so they don't start bunched
  return {
    mercury: 0,
    venus: Math.PI * 0.4,
    earth: Math.PI * 0.8,
    mars: Math.PI * 1.2,
    jupiter: Math.PI * 1.5,
    saturn: Math.PI * 0.2,
    uranus: Math.PI * 0.7,
    neptune: Math.PI * 1.1,
  };
}

export const BASE_SPEED = 0.002;
