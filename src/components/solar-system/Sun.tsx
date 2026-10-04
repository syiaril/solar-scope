'use client';

interface SunProps {
  cx: number;
  cy: number;
}

export function Sun({ cx, cy }: SunProps) {
  return (
    <g>
      <defs>
        <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FDB813" />
          <stop offset="100%" stopColor="#F97316" />
        </radialGradient>
        <filter id="sunGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <circle
        cx={cx}
        cy={cy}
        r={28}
        fill="url(#sunGradient)"
        filter="url(#sunGlow)"
        aria-label="Matahari"
      />
    </g>
  );
}
