import type { Metadata } from 'next';
import Link from 'next/link';
import { planets } from '@/data/planets';

export const metadata: Metadata = {
  title: 'Rangkuman Materi Tata Surya | SolarScope',
  description: 'Ringkasan materi pembelajaran ICT susunan dan anggota Tata Surya.',
};

export default function RangkumanPage() {
  const planetDalam = planets.slice(0, 4);
  const planetLuar = planets.slice(4, 8);

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 bg-[#050816] text-white flex flex-col items-center">
      <div className="max-w-5xl w-full mx-auto">
        {/* Header Rangkuman */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs text-[#FACC15] font-semibold mb-3">
            <span>📜 Komponen Instruksional: Rangkuman/Ringkasan Materi</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-300 to-[#FACC15]">
            Rangkuman Tata Surya
          </h1>
          <p className="text-slate-400 text-sm md:text-base mt-2 max-w-2xl mx-auto">
            Intisari konsep penting peredaran benda langit dan anggota keluarga Tata Surya kita.
          </p>
        </div>

        {/* Kotak Inti Rangkuman Materi */}
        <div className="bg-[#0B1020] border-2 border-slate-800 rounded-3xl p-6 md:p-10 mb-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#7C3AED]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-800">
            <span className="text-4xl">🌌</span>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Konsep Pokok Tata Surya
              </h2>
              <p className="text-xs text-slate-400">Pusat orbit dan klasifikasi planet</p>
            </div>
          </div>

          <div className="p-5 md:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 text-base md:text-lg leading-relaxed text-slate-200 mb-8 font-medium">
            &ldquo;<strong className="text-[#FACC15]">Tata surya kita terdiri dari Matahari sebagai pusatnya</strong>, dikelilingi oleh <strong className="text-sky-300">8 planet</strong>: <span className="text-slate-100">Merkurius, Venus, Bumi, Mars, Yupiter, Saturnus, Uranus, dan Neptunus</span> yang mengorbit karena gaya gravitasi Matahari.&rdquo;
          </div>

          {/* Pengelompokan Planet Dalam & Luar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bagian Planet Dalam */}
            <div className="p-6 rounded-2xl bg-[#070C1E] border border-slate-800/80">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🪨</span>
                <h3 className="text-lg font-bold text-amber-400">
                  Planet Dalam (Terestrial / Kebumian)
                </h3>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                Terletak di antara Matahari dan sabuk asteroid. Berpermukaan padat dan berbatu.
              </p>
              <div className="space-y-2">
                {planetDalam.map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                    <span className="font-semibold text-white flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                      {p.order}. {p.name}
                    </span>
                    <span className="text-slate-400">{p.description}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bagian Planet Luar */}
            <div className="p-6 rounded-2xl bg-[#070C1E] border border-slate-800/80">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🪐</span>
                <h3 className="text-lg font-bold text-sky-400">
                  Planet Luar (Raksasa Gas & Es)
                </h3>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                Terletak di luar sabuk asteroid. Berukuran sangat besar dan tidak memiliki permukaan padat.
              </p>
              <div className="space-y-2">
                {planetLuar.map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                    <span className="font-semibold text-white flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                      {p.order}. {p.name}
                    </span>
                    <span className="text-slate-400">{p.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tombol Lanjut ke Soal & Latihan */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/belajar"
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 text-center font-semibold text-sm transition-all"
          >
            Kembali ke Uraian Materi 📖
          </Link>
          <Link
            href="/kuis"
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#7C3AED] via-[#38BDF8] to-[#0284C7] text-white text-center font-bold text-sm shadow-[0_0_25px_rgba(56,189,248,0.35)] transition-all flex items-center justify-center gap-2"
          >
            <span>Lanjut ke Soal / Latihan</span>
            <span>📝</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
