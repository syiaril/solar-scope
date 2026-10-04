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
  // Sebarkan planet di sepanjang orbit agar tidak bertumpuk di titik awal
  return {
    mercury: 0,
    venus: Math.PI * 0.45,
    earth: Math.PI * 0.9,
    mars: Math.PI * 1.35,
    jupiter: Math.PI * 1.7,
    saturn: Math.PI * 0.25,
    uranus: Math.PI * 0.75,
    neptune: Math.PI * 1.15,
  };
}

export const BASE_SPEED = 0.008;
