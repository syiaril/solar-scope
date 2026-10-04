import { planets } from '@/data/planets';
import PlanetCard from '@/components/learning/PlanetCard';
import PlanetComparison from '@/components/learning/PlanetComparison';
import Link from 'next/link';

export const metadata = {
  title: 'Uraian Materi Tata Surya | SolarScope',
  description: 'Uraian materi lengkap mengenai Matahari, Planet Dalam, dan Planet Luar.',
};

export default function BelajarPage() {
  const planetDalam = planets.slice(0, 4);
  const planetLuar = planets.slice(4, 8);

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 bg-[#050816] text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Pembelajaran */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs text-[#FACC15] font-semibold mb-3">
            <span>📚 Komponen Instruksional: Uraian Materi (Teks, Ilustrasi, Animasi)</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-300 to-[#FACC15]">
            Uraian Materi Tata Surya
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-base">
            Pelajari karakteristik bintang pusat serta 8 planet yang terbagi menjadi kelompok <strong>Planet Dalam</strong> dan <strong>Planet Luar</strong>.
          </p>
        </div>

        {/* ============================================================== */}
        {/* URAIAN MATERI: MATAHARI SEBAGAI PUSAT                          */}
        {/* ============================================================== */}
        <section className="mb-20 bg-[#0B1020] border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative flex items-center justify-center shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-tr from-[#FDB813] to-[#F97316] shadow-[0_0_60px_rgba(249,115,22,0.6)] animate-pulse flex items-center justify-center text-5xl">
                ☀️
              </div>
            </div>
            <div className="space-y-3">
              <div className="inline-block px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
                Bintang Induk
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white">
                Matahari (The Sun)
              </h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                <strong>Matahari</strong> adalah bintang raksasa gas panas yang menjadi <strong>pusat tata surya</strong>. Memiliki gaya gravitasi luar biasa kuat yang menjaga seluruh planet, asteroid, dan komet tetap berada pada jalur orbitnya masing-masing.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-300">
                <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block">Suhu Inti</span>
                  <span className="font-bold text-amber-400">~15.000.000 °C</span>
                </div>
                <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block">Komposisi Utama</span>
                  <span className="font-bold text-white">Hidrogen & Helium</span>
                </div>
                <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
                  <span className="text-slate-500 block">Peran Utama</span>
                  <span className="font-bold text-sky-400">Sumber Energi Kehidupan</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* BAGIAN 1: PLANET DALAM                                         */}
        {/* Merkurius, Venus, Bumi, Mars                                   */}
        {/* ============================================================== */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-800">
            <span className="text-2xl">🪨</span>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Kelompok Planet Dalam (Terestrial)
              </h2>
              <p className="text-xs md:text-sm text-slate-400">
                Planet-planet berbatu padat yang berada paling dekat dengan Matahari: Merkurius, Venus, Bumi, dan Mars.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {planetDalam.map((planet) => (
              <PlanetCard key={planet.id} planet={planet} />
            ))}
          </div>
        </section>

        {/* ============================================================== */}
        {/* BAGIAN 2: PLANET LUAR                                          */}
        {/* Yupiter, Saturnus, Uranus, Neptunus                            */}
        {/* ============================================================== */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-800">
            <span className="text-2xl">🪐</span>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Kelompok Planet Luar (Raksasa Gas & Es)
              </h2>
              <p className="text-xs md:text-sm text-slate-400">
                Planet-planet raksasa bergas dan berlapisan es di luar sabuk asteroid: Yupiter, Saturnus, Uranus, dan Neptunus.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {planetLuar.map((planet) => (
              <PlanetCard key={planet.id} planet={planet} />
            ))}
          </div>
        </section>

        {/* ============================================================== */}
        {/* BAGIAN 3: BANDINGKAN DUA PLANET                                */}
        {/* ============================================================== */}
        <section className="max-w-4xl mx-auto mb-16">
          <PlanetComparison />
        </section>

        {/* Tautan Lanjut ke Rangkuman */}
        <div className="text-center pt-8 border-t border-slate-800">
          <Link
            href="/rangkuman"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#38BDF8] text-white font-bold hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] transition-all"
          >
            <span>Lanjut Membaca Rangkuman Materi</span>
            <span>📜</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
