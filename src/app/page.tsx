'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

export default function Home() {
  return (
    <main className="min-h-screen pt-16 flex flex-col items-center bg-[#050816] text-white">
      {/* ============================================================== */}
      {/* HALAMAN 1: BERANDA & PETUNJUK                                  */}
      {/* Visual: Ilustrasi roket luar angkasa dengan latar bintang      */}
      {/* Judul: Petualangan Menjelajah Tata Surya                        */}
      {/* ============================================================== */}
      <section className="w-full min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-16 relative overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-[#7C3AED]/20 to-[#38BDF8]/20 rounded-full blur-[120px] -z-10 pointer-events-none" />

        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Badge Judul Media */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs md:text-sm text-[#FACC15] font-semibold tracking-wide mb-6 uppercase"
          >
            <span>✨</span>
            <span>Media Pembelajaran Interaktif</span>
          </motion.div>

          {/* Visual Ilustrasi Roket Luar Angkasa */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative mb-6"
          >
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="w-28 h-28 md:w-36 md:h-36 rounded-3xl bg-[#0B1020] border border-slate-700/80 shadow-[0_0_50px_rgba(56,189,248,0.25)] flex items-center justify-center relative overflow-hidden group"
            >
              {/* Efek partikel pendorong roket */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(250,204,21,0.2),transparent_70%)]" />
              <span className="text-6xl md:text-7xl select-none filter drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]">
                🚀
              </span>
            </motion.div>
          </motion.div>

          {/* Teks Judul */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black mb-4 tracking-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FFFFFF] via-[#38BDF8] to-[#FACC15]">
              Petualangan Menjelajah Tata Surya
            </span>
          </motion.h1>

          {/* Subjudul & Petunjuk Penggunaan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl mx-auto mb-10 space-y-4"
          >
            <p className="text-lg md:text-xl text-slate-300 font-medium">
              Kenali planet, pahami orbitnya, dan temukan fakta menakjubkan tentang dunia di sekitar Matahari kita.
            </p>

            {/* Kotak Petunjuk Penggunaan */}
            <div className="p-4 md:p-5 rounded-2xl bg-[#0B1020]/90 border border-[#38BDF8]/30 shadow-lg text-left flex items-start gap-3.5 backdrop-blur-md">
              <span className="text-2xl mt-0.5 shrink-0">💡</span>
              <div>
                <span className="text-xs uppercase font-bold text-[#38BDF8] tracking-wider block mb-1">
                  Petunjuk Penggunaan:
                </span>
                <p className="text-sm md:text-base text-slate-200 leading-relaxed font-normal">
                  &ldquo;Klik tombol <strong className="text-[#FACC15] font-semibold">&apos;Mulai&apos;</strong> untuk terbang, dan klik gambar setiap planet untuk melihat informasinya.&rdquo;
                </p>
              </div>
            </div>
          </motion.div>

          {/* Tombol Aksi */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md"
          >
            <Link
              href="/eksplorasi"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#7C3AED] via-[#38BDF8] to-[#0284C7] text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] transition-all transform hover:-translate-y-1 text-center flex items-center justify-center gap-2"
            >
              <span>Mulai Terbang</span>
              <span>🚀</span>
            </Link>
            <Link
              href="/belajar"
              className="px-8 py-4 rounded-2xl bg-[#0B1020] border border-slate-700 text-slate-200 font-semibold text-lg hover:bg-slate-800/80 hover:text-white transition-all text-center"
            >
              Pelajari Planet
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* HALAMAN 2: PENDAHULUAN                                         */}
      {/* Kompetensi / Tujuan Pembelajaran & Indikator Keberhasilan      */}
      {/* ============================================================== */}
      <section className="w-full py-20 px-4 border-t border-slate-800/80 bg-[#070C1E]/80">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase font-bold text-[#7C3AED] tracking-widest block mb-2">
              Modul Edukasi
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              Pendahuluan & Sasaran Belajar
            </h2>
            <p className="text-slate-400 text-sm md:text-base mt-2 max-w-xl mx-auto">
              Fondasi kompetensi yang diharapkan dapat dikuasai setelah menyelesaikan penjelajahan tata surya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Kartu Kompetensi / Tujuan Pembelajaran */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#0B1020] border border-slate-800 p-6 md:p-8 rounded-3xl shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-2xl mb-5">
                  🎯
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Kompetensi / Tujuan Pembelajaran
                </h3>
                <p className="text-slate-300 text-base leading-relaxed">
                  Peserta didik mampu <strong className="text-purple-300 font-semibold">memahami susunan tata surya</strong> serta interaksi orbit benda-benda langit terhadap Matahari.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs text-slate-400">
                Pilar materi: Fisika Astronomi & Tata Surya
              </div>
            </motion.div>

            {/* Kartu Indikator Keberhasilan */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#0B1020] border border-slate-800 p-6 md:p-8 rounded-3xl shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-2xl mb-5">
                  🏆
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Indikator Keberhasilan
                </h3>
                <ul className="text-slate-300 text-base space-y-2.5">
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-400 mt-1">✔</span>
                    <span>Peserta didik dapat <strong className="text-sky-300 font-semibold">mengurutkan planet</strong> berdasarkan jaraknya dari Matahari.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-400 mt-1">✔</span>
                    <span>Peserta didik dapat <strong className="text-sky-300 font-semibold">menyebutkan ciri utamanya</strong> dan karakteristik masing-masing planet.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs text-slate-400">
                Evaluasi: Tersedia kuis interaktif 15 butir soal
              </div>
            </motion.div>
          </div>

          {/* Navigasi Lanjutan ke Eksplorasi */}
          <div className="text-center pt-4">
            <Link
              href="/eksplorasi"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#38BDF8] text-white font-bold hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] transition-all"
            >
              <span>Lanjut ke Simulasi Orbit</span>
              <span>🪐</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
