'use client';

import { motion } from 'motion/react';
import Link from 'next/link';

interface QuizResultProps {
  score: number;
  total: number;
  onRetry: () => void;
}

export default function QuizResult({ score, total, onRetry }: QuizResultProps) {
  const percentage = (score / total) * 100;
  
  let message = 'Terus belajar!';
  let color = 'from-red-500 to-orange-500';
  
  if (percentage >= 80) {
    message = 'Luar biasa!';
    color = 'from-green-400 to-emerald-600';
  } else if (percentage >= 60) {
    message = 'Bagus!';
    color = 'from-blue-400 to-indigo-600';
  } else if (percentage >= 40) {
    message = 'Cukup baik!';
    color = 'from-yellow-400 to-orange-500';
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm text-center max-w-lg mx-auto"
    >
      <h2 className="text-3xl font-bold text-white mb-2">Hasil Kuis</h2>
      <p className="text-gray-400 mb-8">Pencapaian kamu dalam eksplorasi Tata Surya</p>

      <div className="relative w-48 h-48 mx-auto mb-8 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
          />
          <motion.circle
            initial={{ strokeDasharray: "0, 251.2" }}
            animate={{ strokeDasharray: `${(percentage / 100) * 251.2}, 251.2` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke="url(#gradient)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={percentage >= 80 ? '#34d399' : percentage >= 60 ? '#60a5fa' : percentage >= 40 ? '#facc15' : '#f87171'} />
              <stop offset="100%" stopColor={percentage >= 80 ? '#059669' : percentage >= 60 ? '#4f46e5' : percentage >= 40 ? '#f97316' : '#ea580c'} />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-white">{score}</span>
          <span className="text-sm text-gray-400">dari {total}</span>
        </div>
      </div>

      <h3 className={`text-2xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r ${color}`}>
        {message}
      </h3>

      <div className="flex flex-col gap-4">
        <button
          onClick={onRetry}
          className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors"
        >
          Coba Lagi
        </button>
        <Link
          href="/"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#38BDF8] hover:opacity-90 text-white font-semibold transition-opacity inline-block"
        >
          Kembali ke Eksplorasi
        </Link>
      </div>
    </motion.div>
  );
}
