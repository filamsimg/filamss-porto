'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useThemeDetector } from '@/hooks/use-theme-detector';
import { MOTION } from '@/lib/design-tokens';

export default function FloatingNav() {
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  
  // Detect dark section at floating nav position ('bottom' -> window.innerHeight - 36px)
  const isDark = useThemeDetector('bottom', navRef);

  const navItems = [
    { label: 'HOME', href: '/' },
    { label: 'PROJECTS', href: '/projects' },
    { label: 'ABOUT', href: '/about' },
  ];

  return (
    <div ref={navRef} className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: MOTION.ease }}
        className={`flex items-center gap-1.5 p-1.5 rounded-full border shadow-[0_15px_40px_rgba(0,0,0,0.18)] backdrop-blur-md transition-colors duration-400 ${
          isDark
            ? 'bg-[#121c19]/90 border-white/20 text-white shadow-2xl'
            : 'bg-white/90 border-black/10 text-[#111111]'
        }`}
      >
        {navItems.map((item) => {
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`relative px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-colors duration-300 ${
                isActive
                  ? 'text-[#111111]'
                  : isDark
                  ? 'text-white/70 hover:text-white'
                  : 'text-[#111111]/60 hover:text-[#111111]'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activePill"
                  className="absolute inset-0 rounded-full bg-[#d4e157] shadow-sm"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
}
