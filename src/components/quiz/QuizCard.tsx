'use client';

import { motion } from 'motion/react';
import type { QuizQuestion } from '@/types/quiz';

interface QuizCardProps {
  question: QuizQuestion;
  selectedAnswer: number | null;
  onSelectAnswer: (index: number) => void;
  showExplanation: boolean;
}

export default function QuizCard({ 
  question, 
  selectedAnswer, 
  onSelectAnswer, 
  showExplanation 
}: QuizCardProps) {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-[#0B1020] border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur-sm shadow-xl"
    >
      <h3 className="text-xl md:text-2xl font-semibold text-white mb-6 leading-relaxed">
        {question.question}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {question.options.map((option: string, index: number) => {
          let buttonClass = "bg-slate-900/60 border-slate-800 text-slate-200 hover:bg-slate-800/80 hover:border-slate-700";
          
          if (showExplanation) {
            if (index === question.correctAnswer) {
              buttonClass = "bg-emerald-500/20 border-emerald-500/60 text-emerald-300 font-medium";
            } else if (index === selectedAnswer) {
              buttonClass = "bg-rose-500/20 border-rose-500/60 text-rose-300";
            } else {
              buttonClass = "bg-slate-900/30 border-slate-900 text-slate-600 opacity-50";
            }
          } else if (selectedAnswer === index) {
            buttonClass = "bg-[#7C3AED]/30 border-[#7C3AED] text-white font-medium ring-1 ring-[#7C3AED]";
          }

          return (
            <button
              key={index}
              onClick={() => !showExplanation && onSelectAnswer(index)}
              disabled={showExplanation}
              className={`p-4 rounded-xl border text-left transition-all ${buttonClass}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                  showExplanation && index === question.correctAnswer ? 'bg-emerald-500/30 text-emerald-200' :
                  showExplanation && index === selectedAnswer ? 'bg-rose-500/30 text-rose-200' :
                  'bg-slate-800 text-slate-300'
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="text-sm md:text-base leading-snug">{option}</span>
              </div>
            </button>
          );
        })}
      </div>

      {showExplanation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/50 text-indigo-200 text-sm md:text-base"
        >
          <p><strong className="text-indigo-300">Penjelasan:</strong> {question.explanation}</p>
        </motion.div>
      )}
    </motion.div>
  );
}
