'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: 'Beranda', href: '/' },
    { name: 'Eksplorasi', href: '/eksplorasi' },
    { name: 'Belajar', href: '/belajar' },
    { name: 'Rangkuman', href: '/rangkuman' },
    { name: 'Kuis', href: '/kuis' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#050816]/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2.5 group">
              <span className="text-2xl filter drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]">🚀</span>
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#FFFFFF] via-[#38BDF8] to-[#FACC15] tracking-wider leading-none">
                  SOLARSCOPE
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-tight">
                  Media ICT Tata Surya
                </span>
              </div>
            </Link>
          </div>
          
          <div className="hidden lg:block">
            <div className="flex items-center space-x-1">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                      isActive 
                        ? 'text-white bg-gradient-to-r from-[#7C3AED]/40 to-[#38BDF8]/40 border border-[#38BDF8]/50 shadow-sm' 
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
          
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              aria-label="Buka menu navigasi"
            >
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-[#050816]/95 border-b border-slate-800"
            id="mobile-menu"
          >
            <div className="px-3 pt-2 pb-4 space-y-1">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-2.5 rounded-xl text-sm font-semibold ${
                      isActive 
                        ? 'text-white bg-[#7C3AED]/20 border border-[#7C3AED]/40' 
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
