'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { usePortfolio } from '@/context/portfolio-context';
import { useLanguage } from '@/context/language-context';
import { useThemeDetector } from '@/hooks/use-theme-detector';
import { MOTION } from '@/lib/design-tokens';
import ContactModal from './contact-modal';

export default function TopBar() {
  const { settings } = usePortfolio();
  const { lang, setLang, t } = useLanguage();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  
  // Detect dark section at top bar position ('top' -> 32px from top), piercing headerRef
  const isDarkSection = useThemeDetector('top', headerRef);

  return (
    <>
      <motion.header
        ref={headerRef}
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: MOTION.ease }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-3.5 sm:px-8 py-3 sm:py-6 pointer-events-none"
      >
        {/* Brand Text: Inverted to White on Dark Sections, Black on Light Sections - displayed completely without truncation */}
        <Link
          href="/"
          className={`pointer-events-auto text-[13px] xs:text-sm sm:text-base font-semibold tracking-tight transition-colors duration-400 whitespace-nowrap shrink min-w-0 ${
            isDarkSection ? 'text-white drop-shadow-sm' : 'text-[#111111]'
          } hover:opacity-75`}
        >
          {settings.brandName || 'Filamsi Mabda Ghifary'}
        </Link>

        {/* Right Actions: Language Switcher & Contact Button */}
        <div className="flex items-center gap-1.5 sm:gap-3 pointer-events-auto shrink-0">
          {/* Dual Language Switcher [ID | EN] */}
          <div
            className={`flex items-center p-0.5 sm:p-1 rounded-full border backdrop-blur-md transition-colors duration-400 text-xs font-semibold ${
              isDarkSection
                ? 'bg-white/10 border-white/20 text-white shadow-sm'
                : 'bg-white/80 border-black/10 text-[#111111] shadow-2xs'
            }`}
          >
            <button
              onClick={() => setLang('id')}
              className={`relative px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider transition-colors duration-300 ${
                lang === 'id'
                  ? 'text-[#111111]'
                  : isDarkSection
                  ? 'text-white/70 hover:text-white'
                  : 'text-[#111111]/60 hover:text-[#111111]'
              }`}
              title="Bahasa Indonesia"
            >
              {lang === 'id' && (
                <motion.div
                  layoutId="langPill"
                  className="absolute inset-0 rounded-full bg-[#d4e157] shadow-2xs"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              <span className="relative z-10">ID</span>
            </button>
            <button
              onClick={() => setLang('en')}
              className={`relative px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider transition-colors duration-300 ${
                lang === 'en'
                  ? 'text-[#111111]'
                  : isDarkSection
                  ? 'text-white/70 hover:text-white'
                  : 'text-[#111111]/60 hover:text-[#111111]'
              }`}
              title="English"
            >
              {lang === 'en' && (
                <motion.div
                  layoutId="langPill"
                  className="absolute inset-0 rounded-full bg-[#d4e157] shadow-2xs"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              <span className="relative z-10">EN</span>
            </button>
          </div>

          {/* Lime Contact Action Button */}
          <button
            onClick={() => setIsContactOpen(true)}
            className="group flex items-center gap-1 sm:gap-2.5 bg-[#d4e157] text-[#111111] font-semibold text-[10px] sm:text-xs uppercase tracking-wider rounded-full pl-2.5 sm:pl-4 pr-1 sm:pr-2 py-1 sm:py-2 shadow-sm hover:bg-[#dcec6a] transition-all transform hover:scale-105 active:scale-95"
          >
            <span>{t('topbar.contact')}</span>
            <div className="h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-[#111111] text-white flex items-center justify-center">
              <ArrowUpRight className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 group-hover:rotate-45 transition-transform duration-300" />
            </div>
          </button>
        </div>
      </motion.header>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
