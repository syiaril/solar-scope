import type { Metadata } from 'next';
import Link from 'next/link';
import { planets, sunData } from '@/data/planets';

export const metadata: Metadata = {
  title: 'Rangkuman Materi Tata Surya | SolarScope',
  description: 'Ringkasan materi pembelajaran ICT susunan dan anggota Tata Surya.',
};

export default function RangkumanPage() {
  const planetDalam = planets.slice(0, 4);
  const planetLuar = planets.slice(4, 8);

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 bg-[#050816] text-white flex flex-col items-center">
      <div className="max-w-6xl w-full mx-auto">
        {/* Header Rangkuman */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs text-[#FACC15] font-semibold mb-3 shadow-sm">
            <span>📜 Komponen Instruksional: Rangkuman/Ringkasan Materi</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-300 to-[#FACC15] tracking-tight">
            Rangkuman Tata Surya
          </h1>
          <p className="text-slate-400 text-sm md:text-base mt-2.5 max-w-2xl mx-auto">
            Intisari konsep penting peredaran benda langit dan anggota keluarga Tata Surya kita.
          </p>
        </div>

        {/* Kotak Inti Rangkuman Materi */}
        <div className="bg-[#0B1020] border-2 border-slate-800 rounded-3xl p-6 md:p-10 mb-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#7C3AED]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header Kartu Utama */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-800">
            <span className="text-4xl filter drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]">🌌</span>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Konsep Pokok Tata Surya
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Pusat orbit dan klasifikasi anggota tata surya</p>
            </div>
          </div>

          {/* Kutipan Inti Materi */}
          <div className="p-5 md:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 text-base md:text-lg leading-relaxed text-slate-200 mb-8 font-medium">
            &ldquo;<strong className="text-[#FACC15]">Tata surya kita terdiri dari Matahari sebagai pusatnya</strong>, dikelilingi oleh <strong className="text-sky-300">8 planet</strong>: <span className="text-slate-100 font-semibold">Merkurius, Venus, Bumi, Mars, Yupiter, Saturnus, Uranus, dan Neptunus</span> yang mengorbit karena gaya gravitasi Matahari.&rdquo;
          </div>

          {/* Kartu Bintang Pusat (Matahari) */}
          <div className="p-5 rounded-2xl bg-[#070C1E] border border-amber-500/30 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <span className="text-3xl filter drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]">☀️</span>
              <div>
                <span className="text-xs uppercase font-bold text-amber-400 tracking-wider block">
                  Pusat Tata Surya
                </span>
                <h3 className="text-lg font-bold text-white">{sunData.name}</h3>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 sm:max-w-xl leading-relaxed">
              {sunData.description}
            </p>
          </div>

          {/* Pengelompokan Planet Dalam & Luar dengan Tata Letak Lega */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                icon: '🪨',
                title: 'Planet Dalam (Terestrial)',
                titleColor: 'text-amber-400',
                desc: 'Terletak di antara Matahari dan sabuk asteroid. Berukuran lebih kecil, memiliki permukaan padat, dan tersusun atas bebatuan serta logam.',
                items: planetDalam,
              },
              {
                icon: '🪐',
                title: 'Planet Luar (Raksasa Gas & Es)',
                titleColor: 'text-sky-400',
                desc: 'Terletak di luar sabuk asteroid. Berukuran raksasa, tersusun atas gas dan es tebal, serta memiliki banyak satelit alami dan sistem cincin.',
                items: planetLuar,
              },
            ].map((group) => (
              <div
                key={group.title}
                className="p-6 md:p-7 rounded-3xl bg-[#070C1E] border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{group.icon}</span>
                    <h3 className={`text-xl font-bold ${group.titleColor}`}>
                      {group.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                    {group.desc}
                  </p>

                  <div className="space-y-4">
                    {group.items.map((p) => (
                      <div
                        key={p.id}
                        className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col gap-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-sm sm:text-base flex items-center gap-2.5">
                            <span
                              className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm"
                              style={{ backgroundColor: p.color }}
                            />
                            {p.order}. {p.name}
                          </span>
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                            {p.distanceFromSun} jt km
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-6">
                          {p.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tombol Navigasi Lanjut */}
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
