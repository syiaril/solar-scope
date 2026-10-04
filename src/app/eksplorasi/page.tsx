import type { Metadata } from 'next';
import SolarSystem from '@/components/solar-system/SolarSystem';

export const metadata: Metadata = {
  title: 'Eksplorasi Simulasi Tata Surya | SolarScope',
  description: 'Simulasi interaktif orbit dan informasi planet di Tata Surya.',
};

export default function EksplorasiPage() {
  return (
    <main className="min-h-screen pt-20 pb-16 px-4 bg-[#050816] text-white flex flex-col items-center">
      <div className="max-w-7xl w-full mx-auto flex flex-col items-center">
        {/* Header eksplorasi ringkas */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#7C3AED] via-[#38BDF8] to-[#FACC15]">
            Simulasi Interaktif Tata Surya
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto">
            Klik dan amati pergerakan setiap planet di sekitar Matahari. Pilih planet untuk membaca data fisik dan karakteristik khususnya.
          </p>
        </div>

        {/* Kontainer Simulasi Tata Surya */}
        <div className="w-full bg-[#0B1020]/80 border border-slate-800 rounded-3xl p-4 md:p-8 backdrop-blur-sm shadow-2xl">
          <SolarSystem />
        </div>
      </div>
    </main>
  );
}
