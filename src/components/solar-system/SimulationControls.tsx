'use client';

interface SimulationControlsProps {
  isPlaying: boolean;
  speed: number;
  onTogglePlay: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
}

export function SimulationControls({
  isPlaying,
  speed,
  onTogglePlay,
  onReset,
  onSpeedChange,
}: SimulationControlsProps) {
  const speeds = [0.25, 0.5, 1, 2, 4];

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 bg-[#0B1020] border border-slate-800 rounded-xl p-3 shadow-lg max-w-full">
      <div className="flex items-center gap-2">
        <button
          onClick={onTogglePlay}
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
          aria-label={isPlaying ? "Jeda" : "Putar"}
          title={isPlaying ? "Jeda" : "Putar"}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          )}
        </button>
        <button
          onClick={onReset}
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          aria-label="Ulangi"
          title="Ulangi"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
            <path d="M3 3v5h5"></path>
          </svg>
        </button>
      </div>

      <div className="h-8 w-px bg-slate-800 mx-2 hidden sm:block"></div>

      <div className="flex items-center gap-1 bg-slate-900 rounded-lg p-1">
        {speeds.map((s) => (
          <button
            key={s}
            onClick={() => onSpeedChange(s)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              speed === s
                ? 'bg-indigo-500/20 text-indigo-300'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            {s}x
          </button>
        ))}
      </div>
    </div>
  );
}
