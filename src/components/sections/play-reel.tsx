'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Play, X, ExternalLink, Sparkles } from 'lucide-react';
import { usePortfolio } from '@/context/portfolio-context';

export default function PlayReelSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { settings } = usePortfolio();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Parallax scale & curtain reveal transformations
  const cardScale = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.92, 1, 0.96]);
  const cardY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#1b4d3e] text-white py-[16vh] sm:py-[22vh] px-4 sm:px-8 overflow-hidden flex flex-col items-center justify-center text-center grain"
    >
      {/* Top Badge & Intro */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-4 mb-10 sm:mb-14 z-10 max-w-3xl"
      >
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 text-[#d4e157] text-xs font-mono uppercase tracking-[0.2em] border border-white/15">
          <Sparkles size={12} />
          <span>Designer &amp; Developer Hybrid</span>
        </span>

        <h2 className="font-display font-medium text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.1]">
          I build with <span className="text-[#d4e157]">care.</span>
          <br className="hidden sm:inline" /> No templates, no shortcuts.
        </h2>
      </motion.div>

      {/* Main PLAY REEL Pill Capsule Container */}
      <motion.div
        style={{ scale: cardScale, y: cardY }}
        onClick={() => setModalOpen(true)}
        className="group relative w-full max-w-4xl h-[32vh] sm:h-[45vh] rounded-[40px] sm:rounded-[70px] bg-[#09120e] border border-white/20 overflow-hidden cursor-pointer shadow-2xl flex items-center justify-center my-6 z-10"
      >
        {/* Ambient Animated Video Background Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1b4d3e]/80 via-[#0a1813] to-black opacity-80 group-hover:scale-105 transition-transform duration-700" />

        {/* Ambient Fluid Glow */}
        <div className="absolute w-[300px] h-[300px] rounded-full bg-[#d4e157]/20 blur-[90px] animate-pulse pointer-events-none" />

        {/* Giant PLAY REEL Headline */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <h3 className="font-display font-bold text-5xl sm:text-8xl md:text-9xl tracking-[-0.05em] text-[#d4e157] group-hover:text-white transition-colors duration-500 uppercase select-none">
            PLAY REEL
          </h3>

          <div className="mt-4 flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-mono uppercase tracking-widest text-white group-hover:bg-[#d4e157] group-hover:text-[#111111] transition-all">
            <Play size={12} className="fill-current" />
            <span>Click to Play Reel</span>
          </div>
        </div>
      </motion.div>

      {/* Subtext Paragraph */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-8 sm:mt-12 text-lg sm:text-2xl md:text-3xl font-display font-light text-white/90 max-w-3xl leading-relaxed z-10"
      >
        Just <span className="text-[#d4e157] font-medium">custom-made</span>, thoughtful web products – built &amp; brought to life with <span className="text-[#d4e157] font-medium">Next.js, React &amp; AI.</span>
      </motion.p>

      {/* Video Reel Modal Overlay */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-4xl aspect-video bg-[#121c19] border border-white/20 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-2xl z-10"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-[#d4e157] hover:text-[#111111] transition-colors"
              >
                <X size={20} />
              </button>

              <div className="space-y-4 max-w-lg">
                <div className="w-16 h-16 rounded-full bg-[#d4e157] text-[#111111] flex items-center justify-center mx-auto shadow-lg">
                  <Play size={28} className="fill-current translate-x-0.5" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  System &amp; Application Reel
                </h3>
                <p className="text-sm font-light text-white/80 leading-relaxed">
                  Showcasing real-time AI moderation (Athena Shield), Point of Sale automation (Yosma POS), and MediaPipe pose detection (Silat Mastery) engineered by {settings.brandName}.
                </p>
                <div className="pt-2">
                  <a
                    href="https://github.com/filamsi"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#d4e157] text-[#111111] font-semibold text-xs uppercase tracking-wider hover:bg-[#e4f167] transition-colors"
                  >
                    <span>View Projects Repository</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
