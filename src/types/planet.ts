export interface Planet {
  id: string;
  name: string;
  order: number;
  diameter: number; // km
  distanceFromSun: number; // million km
  rotationPeriod: string;
  revolutionPeriod: string;
  description: string;
  fact: string;
  color: string;
  orbitRadius: number; // px for SVG
  orbitSpeed: number; // relative speed multiplier
}
