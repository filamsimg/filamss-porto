'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, Code2 } from 'lucide-react';
import { usePortfolio } from '@/context/portfolio-context';
import { useLanguage } from '@/context/language-context';

/** Returns the uploaded video URL, or default sample video if available */
function resolveVideoSrc(url?: string): string | null {
  if (url && url.trim().startsWith('/')) {
    return url.trim();
  }
  // Default fallback sample video bundled in repository
  return '/videos/showreel-sample.webm';
}

export default function PlayReelSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const { settings } = usePortfolio();
  const { t } = useLanguage();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Background color starts white/cream (#e8e8e4) following Hero section,
  // then seamlessly shifts into deep green (#1b4d3e) following About section below
  const backgroundColor = useTransform(
    scrollYProgress,
    [0.15, 0.45, 0.75],
    ['#e8e8e4', '#174235', '#1b4d3e']
  );

  // Headline text color: dark #111111 on white/cream, pure white on green
  const textColor = useTransform(
    scrollYProgress,
    [0.15, 0.45, 0.75],
    ['#111111', '#ffffff', '#ffffff']
  );

  // Highlight underline color: deep green on light, neon lime on dark green
  const highlightColor = useTransform(
    scrollYProgress,
    [0.15, 0.45, 0.75],
    ['#1b4d3e', '#d4e157', '#d4e157']
  );

  // Eyebrow badge styles
  const badgeBg = useTransform(
    scrollYProgress,
    [0.15, 0.45, 0.75],
    ['rgba(27, 77, 62, 0.08)', 'rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.1)']
  );
  const badgeBorder = useTransform(
    scrollYProgress,
    [0.15, 0.45, 0.75],
    ['rgba(27, 77, 62, 0.2)', 'rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.15)']
  );
  const badgeTextColor = useTransform(
    scrollYProgress,
    [0.15, 0.45, 0.75],
    ['#1b4d3e', '#d4e157', '#d4e157']
  );

  // Subtext color: dark muted on light, white muted on green
  const subtextColor = useTransform(
    scrollYProgress,
    [0.15, 0.45, 0.75],
    ['rgba(17, 17, 17, 0.75)', 'rgba(255, 255, 255, 0.85)', 'rgba(255, 255, 255, 0.85)']
  );

  // Parallax scale & subtle displacement
  const cardScale = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.94, 1, 0.96]);
  const cardY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const videoSrc = resolveVideoSrc(settings.showreelUrl);

  // Auto-play local video muted only when in viewport, pause when out of view (improves Core Web Vitals & saves CPU)
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !videoSrc) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch(() => {});
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [videoSrc]);

  return (
    <motion.section
      ref={containerRef}
      id="showreel"
      style={{ backgroundColor, position: 'relative', zIndex: 30, willChange: 'background-color' }}
      className="relative z-30 py-[16vh] sm:py-[20vh] px-4 sm:px-8 overflow-hidden flex flex-col items-center justify-center text-center"
    >
      {/* Top Eyebrow Badge & Main Headline */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-4 mb-8 sm:mb-12 z-10 max-w-3xl"
      >
        <motion.span
          style={{ backgroundColor: badgeBg, borderColor: badgeBorder, color: badgeTextColor }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-[0.2em] border backdrop-blur-xs"
        >
          <Code2 size={13} />
          <span>{t('playReel.badge')}</span>
        </motion.span>

        <motion.h2
          style={{ color: textColor }}
          className="font-display font-medium text-3xl sm:text-5xl md:text-6xl tracking-tight leading-[1.15]"
        >
          {t('playReel.headline1')}{' '}
          <motion.span
            style={{ color: highlightColor }}
            className="underline decoration-current underline-offset-8"
          >
            {t('playReel.headlineHighlight')}
          </motion.span>
          <br className="hidden sm:inline" /> {t('playReel.headline2')}
        </motion.h2>
      </motion.div>

      {/* Interactive PLAY REEL Capsule */}
      <motion.div
        style={{ scale: cardScale, y: cardY, willChange: 'transform' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative w-full max-w-4xl h-[32vh] sm:h-[42vh] md:h-[46vh] rounded-[36px] sm:rounded-[64px] bg-[#09120e] border border-white/20 overflow-hidden cursor-pointer shadow-2xl flex items-center justify-center my-4 z-10 select-none transition-all duration-300 hover:border-[#d4e157]/60 hover:shadow-[0_0_50px_rgba(212,225,87,0.3)]"
      >
        {/* ── VIDEO LAYER ─────────────────────────────────── */}
        {videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-label="Full-stack developer showreel"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 z-0 ${
              isHovered ? 'opacity-100 scale-102 brightness-105' : 'opacity-35 scale-100 brightness-75'
            }`}
          />
        ) : (
          /* Placeholder when no video is uploaded yet */
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-0 opacity-30 pointer-events-none">
            <div className="w-16 h-16 rounded-2xl border border-white/20 flex items-center justify-center">
              <Play size={28} className="text-white/60 translate-x-0.5" />
            </div>
            <p className="text-white/40 text-xs font-mono tracking-wider">NO VIDEO UPLOADED</p>
          </div>
        )}

        {/* Ambient Gradient Overlay (fades on hover to let video pop) */}
        <div
          className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1b4d3e]/80 via-[#0a1813] to-black transition-opacity duration-700 pointer-events-none z-1 ${
            isHovered ? 'opacity-20' : 'opacity-75'
          }`}
        />

        {/* Ambient Fluid Glow */}
        <div className="absolute w-[280px] sm:w-[380px] h-[280px] sm:h-[380px] rounded-full bg-[#d4e157]/20 blur-[100px] animate-pulse pointer-events-none z-1" />

        {/* Top-Left Floating Badge */}
        <div className="absolute top-4 sm:top-6 left-6 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-[11px] font-mono tracking-wider text-[#d4e157] z-20">
          <span className="w-2 h-2 rounded-full bg-[#d4e157] animate-pulse" />
          <span>FULL-STACK SYSTEM REEL</span>
        </div>

        {/* Center Content: Typography & Pill (Fades out smoothly on hover so the video plays crystal clear) */}
        <div
          className={`relative z-10 flex flex-col items-center justify-center px-4 space-y-4 transition-all duration-500 ${
            isHovered && videoSrc ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
          }`}
        >
          <h3 className="font-display font-bold text-5xl sm:text-8xl md:text-9xl tracking-[-0.05em] text-[#d4e157] uppercase select-none drop-shadow-lg">
            PLAY REEL
          </h3>

          <div className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono uppercase tracking-widest text-white transition-all shadow-lg group-hover:bg-[#d4e157] group-hover:text-[#111111]">
            <Play size={14} className="fill-current translate-x-0.5 text-[#d4e157] group-hover:text-[#111111]" />
            <span>{t('playReel.playButton')}</span>
          </div>
        </div>

        {/* Subtle hover pulse border effect */}
        {isHovered && (
          <div className="absolute inset-0 border-2 border-[#d4e157]/30 rounded-[36px] sm:rounded-[64px] pointer-events-none z-20 transition-all duration-300" />
        )}
      </motion.div>

      {/* Subtext Paragraph */}
      <motion.p
        style={{ color: subtextColor }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mt-6 sm:mt-10 text-base sm:text-xl md:text-2xl font-display font-light max-w-3xl leading-relaxed z-10"
      >
        {t('playReel.subtext')}
      </motion.p>
    </motion.section>
  );
}
