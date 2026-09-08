'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { usePortfolio } from '@/context/portfolio-context';
import { useThemeDetector } from '@/hooks/use-theme-detector';
import { MOTION } from '@/lib/design-tokens';
import ContactModal from './contact-modal';

export default function TopBar() {
  const { settings } = usePortfolio();
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
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 py-5 sm:py-6 pointer-events-none"
      >
        {/* Brand Text: Inverted to White on Dark Sections, Black on Light Sections */}
        <Link
          href="/"
          className={`pointer-events-auto text-[15px] sm:text-base font-semibold tracking-tight transition-colors duration-400 ${
            isDarkSection ? 'text-white drop-shadow-sm' : 'text-[#111111]'
          } hover:opacity-75`}
        >
          {settings.brandName}
        </Link>

        {/* Lime Contact Action Button */}
        <button
          onClick={() => setIsContactOpen(true)}
          className="pointer-events-auto group flex items-center gap-2.5 bg-[#d4e157] text-[#111111] font-semibold text-xs uppercase tracking-wider rounded-full pl-4 pr-2 py-2 shadow-sm hover:bg-[#dcec6a] transition-all transform hover:scale-105"
        >
          <span>Contact</span>
          <div className="h-6 w-6 rounded-full bg-[#111111] text-white flex items-center justify-center">
            <ArrowUpRight className="h-3.5 w-3.5 group-hover:rotate-45 transition-transform duration-300" />
          </div>
        </button>
      </motion.header>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
