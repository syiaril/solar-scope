'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';

interface Question {
  id: number;
  question: string;
  options: { key: string; text: string }[];
  correct: string;
  explanation: string;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: 'Planet manakah yang merupakan planet terbesar di tata surya kita?',
    options: [
      { key: 'a', text: 'Bumi' },
      { key: 'b', text: 'Yupiter' },
      { key: 'c', text: 'Mars' },
    ],
    correct: 'b',
    explanation: 'Yupiter adalah planet terbesar dengan diameter sekitar 142.984 km!',
  },
  {
    id: 2,
    question: 'Planet yang memiliki cincin yang sangat indah adalah...',
    options: [
      { key: 'a', text: 'Saturnus' },
      { key: 'b', text: 'Venus' },
      { key: 'c', text: 'Neptunus' },
    ],
    correct: 'a',
    explanation: 'Saturnus terkenal memiliki cincin es dan bebatuan megah yang melingkarinya.',
  },
  {
    id: 3,
    question: 'Bintang raksasa bercahaya yang menjadi pusat peredaran seluruh planet adalah...',
    options: [
      { key: 'a', text: 'Bulan' },
      { key: 'b', text: 'Matahari' },
      { key: 'c', text: 'Komet' },
    ],
    correct: 'b',
    explanation: 'Matahari adalah bintang induk di pusat tata surya yang menahan semua planet dengan gravitasinya.',
  },
  {
    id: 4,
    question: 'Planet terdekat dari Matahari dan memiliki ukuran paling kecil adalah...',
    options: [
      { key: 'a', text: 'Merkurius' },
      { key: 'b', text: 'Mars' },
      { key: 'c', text: 'Venus' },
    ],
    correct: 'a',
    explanation: 'Merkurius adalah planet terdekat dari Matahari sekaligus planet terkecil di tata surya.',
  },
  {
    id: 5,
    question: 'Planet yang dijuluki sebagai "Planet Merah" karena permukaannya yang kaya oksida besi adalah...',
    options: [
      { key: 'a', text: 'Bumi' },
      { key: 'b', text: 'Mars' },
      { key: 'c', text: 'Uranus' },
    ],
    correct: 'b',
    explanation: 'Mars memiliki warna kemerahan akibat debu besi berkarat di seluruh permukaannya.',
  },
];

export default function KuisPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [feedbackStatus, setFeedbackStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = quizQuestions[currentIdx];

  const handleAnswer = (optionKey: string) => {
    setSelectedOpt(optionKey);
    if (optionKey === currentQ.correct) {
      setFeedbackStatus('correct');
      setScore((prev) => prev + 1);
    } else {
      setFeedbackStatus('wrong');
    }
  };

  const handleNext = () => {
    setFeedbackStatus('idle');
    setSelectedOpt(null);
    if (currentIdx + 1 < quizQuestions.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRetryCurrent = () => {
    setFeedbackStatus('idle');
    setSelectedOpt(null);
  };

  const handleRestartQuiz = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setFeedbackStatus('idle');
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 bg-[#050816] text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#7C3AED]/15 to-[#38BDF8]/15 rounded-full blur-[140px] -z-10 pointer-events-none" />

      <div className="max-w-2xl w-full mx-auto">
        {/* Header Kuis & Latihan */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs text-[#FACC15] font-semibold mb-3">
            <span>📝 Komponen Instruksional: Soal/Latihan & Balikan</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-300 to-[#FACC15]">
            Uji Pemahaman Tata Surya
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Jawab pertanyaan di bawah ini untuk melihat balikan (feedback) pemahamanmu!
          </p>
        </div>

        {!isCompleted ? (
          <div className="bg-[#0B1020] border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative">
            {/* Maskot Karakter Astronot */}
            <div className="flex items-center gap-4 pb-6 mb-6 border-b border-slate-800/80">
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-900/60 to-slate-900 border border-slate-700 flex items-center justify-center text-3xl shadow-lg shrink-0"
              >
                👨‍🚀
              </motion.div>
              <div>
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block">
                  Maskot Astronot Cilik Bertanya:
                </span>
                <span className="text-sm text-slate-300">
                  Pertanyaan {currentIdx + 1} dari {quizQuestions.length}
                </span>
              </div>
            </div>

            {/* Pertanyaan */}
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6 leading-relaxed">
              {currentQ.question}
            </h2>

            {/* Opsi Pilihan */}
            <div className="space-y-3 mb-6">
              {currentQ.options.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => handleAnswer(opt.key)}
                  className={`w-full p-4 rounded-2xl border text-left flex items-center gap-4 transition-all ${
                    selectedOpt === opt.key
                      ? 'bg-sky-500/20 border-sky-400 text-white shadow-lg'
                      : 'bg-slate-900/60 border-slate-800 text-slate-200 hover:bg-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <span className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-sm uppercase text-[#FACC15]">
                    {opt.key}
                  </span>
                  <span className="text-base font-medium">{opt.text}</span>
                </button>
              ))}
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-[#7C3AED] to-[#38BDF8] h-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / quizQuestions.length) * 100}%` }}
              />
            </div>
          </div>
        ) : (
          /* Layar Hasil Akhir */
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#0B1020] border border-slate-800 rounded-3xl p-8 text-center shadow-2xl"
          >
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-3xl font-extrabold text-white mb-2">
              Latihan Selesai!
            </h2>
            <p className="text-slate-300 text-sm mb-6">
              Kamu berhasil menjawab dengan benar <strong className="text-[#FACC15] text-lg font-bold">{score}</strong> dari <strong className="text-white text-lg">{quizQuestions.length}</strong> pertanyaan.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleRestartQuiz}
                className="px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-all"
              >
                Ulangi Latihan 🔄
              </button>
              <Link
                href="/rangkuman"
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#38BDF8] text-white font-bold transition-all shadow-lg"
              >
                Baca Rangkuman 📜
              </Link>
            </div>
          </motion.div>
        )}
      </div>

      {/* ============================================================== */}
      {/* POP-UP BALIKAN (FEEDBACK) SESUAI DESAIN PPT DOSEN               */}
      {/* ============================================================== */}
      <AnimatePresence>
        {feedbackStatus !== 'idle' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          >
            {feedbackStatus === 'correct' ? (
              /* BALIKAN JIKA JAWABAN BENAR */
              <motion.div
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 20 }}
                className="bg-[#0B1020] border-2 border-emerald-500/80 rounded-3xl p-8 max-w-md w-full text-center shadow-[0_0_50px_rgba(16,185,129,0.3)] relative overflow-hidden"
              >
                <div className="text-6xl mb-3 animate-bounce">👍</div>
                <h3 className="text-2xl md:text-3xl font-black text-emerald-400 mb-2">
                  BENAR...
                </h3>
                <h4 className="text-lg font-bold text-white mb-4">
                  Jawaban Cerdas...! ✨
                </h4>
                <p className="text-slate-300 text-sm mb-6 leading-relaxed bg-emerald-950/30 p-3 rounded-xl border border-emerald-800/40">
                  {currentQ.explanation}
                </p>
                <button
                  onClick={handleNext}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-base shadow-lg transition-all"
                >
                  {currentIdx + 1 < quizQuestions.length ? 'Lanjut ke Soal Berikutnya ➔' : 'Lihat Hasil Akhir ➔'}
                </button>
              </motion.div>
            ) : (
              /* BALIKAN JIKA JAWABAN SALAH */
              <motion.div
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 20 }}
                className="bg-[#0B1020] border-2 border-rose-500/80 rounded-3xl p-8 max-w-md w-full text-center shadow-[0_0_50px_rgba(244,63,94,0.3)] relative overflow-hidden"
              >
                <div className="text-6xl mb-3">⚡</div>
                <h3 className="text-xl md:text-2xl font-black text-rose-400 mb-2">
                  Maaf ya dek...
                </h3>
                <h4 className="text-lg font-bold text-white mb-4">
                  Coba diulangi lagi...! 💪
                </h4>
                <p className="text-slate-300 text-sm mb-6 leading-relaxed bg-rose-950/30 p-3 rounded-xl border border-rose-800/40">
                  Jawabanmu masih belum tepat. Jangan menyerah, baca kembali pertanyaannya ya!
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleRetryCurrent}
                    className="flex-1 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm transition-all shadow-lg"
                  >
                    Ulangi Soal Ini 🔄
                  </button>
                  <Link
                    href="/belajar"
                    className="flex-1 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition-all flex items-center justify-center"
                  >
                    Pelajari Materi 📖
                  </Link>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
