'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { scrollToSection } from './smooth-scroll';

export default function ScrollIndicator() {
  const { scrollY } = useScroll();
  // Fade out before reaching the dark about section
  const opacity = useTransform(scrollY, [0, 250], [1, 0]);
  const y = useTransform(scrollY, [0, 250], [0, 16]);

  return (
    <motion.button
      style={{ opacity, y }}
      onClick={() => scrollToSection('#about')}
      className="fixed bottom-6 left-5 sm:left-8 z-40 hidden sm:flex items-center gap-3 group"
    >
      <div className="h-9 w-9 rounded-full border border-[#111111]/30 bg-white/40 backdrop-blur-sm flex items-start justify-center pt-2 overflow-hidden">
        <div className="h-1.5 w-1.5 rounded-full bg-[#111111] animate-scroll-dot" />
      </div>
      <span className="text-[11px] uppercase tracking-[0.16em] font-semibold text-[#111111]/55 group-hover:text-[#111111] transition-colors">
        Scroll
      </span>
    </motion.button>
  );
}
