'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Play, X, ExternalLink, Code2, Video } from 'lucide-react';
import { usePortfolio } from '@/context/portfolio-context';
import { useLanguage } from '@/context/language-context';

/**
 * Utility to parse various video URLs (YouTube, Vimeo, MP4) into an optimized embed format.
 */
function parseVideoEmbedUrl(url?: string): {
  type: 'youtube' | 'vimeo' | 'video' | 'fallback';
  src: string;
} {
  if (!url || !url.trim()) return { type: 'fallback', src: '' };

  const cleanUrl = url.trim();

  // 1. YouTube (Regular, Shorts, Embed, youtu.be)
  const ytMatch = cleanUrl.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/i
  );
  if (ytMatch && ytMatch[1]) {
    return {
      type: 'youtube',
      src: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1&rel=0&modestbranding=1`,
    };
  }

  // 2. Vimeo
  const vimeoMatch = cleanUrl.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      type: 'vimeo',
      src: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&title=0&byline=0&portrait=0`,
    };
  }

  // 3. Direct HTML5 Video (.mp4, .webm, .ogg)
  if (/\.(mp4|webm|ogg)($|\?)/i.test(cleanUrl)) {
    return {
      type: 'video',
      src: cleanUrl,
    };
  }

  // Fallback (e.g. GitHub URL or placeholder)
  return { type: 'fallback', src: cleanUrl };
}

export default function PlayReelSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { settings } = usePortfolio();
  const { t, lang } = useLanguage();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Parallax scale & gentle vertical displacement
  const cardScale = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.92, 1, 0.96]);
  const cardY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const videoInfo = parseVideoEmbedUrl(settings.showreelUrl);

  // Close modal on Escape key and lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalOpen(false);
    };

    if (modalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalOpen]);

  return (
    <section
      ref={containerRef}
      id="showreel"
      className="relative bg-[#1b4d3e] text-white py-[14vh] sm:py-[18vh] px-4 sm:px-8 overflow-hidden flex flex-col items-center justify-center text-center grain"
    >
      {/* Top Eyebrow Badge & Main Headline */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-4 mb-8 sm:mb-12 z-10 max-w-3xl"
      >
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 text-[#d4e157] text-xs font-mono uppercase tracking-[0.2em] border border-white/15 backdrop-blur-xs">
          <Code2 size={13} />
          <span>{t('playReel.badge')}</span>
        </span>

        <h2 className="font-display font-medium text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.12]">
          {t('playReel.headline1')}{' '}
          <span className="text-[#d4e157] underline decoration-[#d4e157]/40 underline-offset-8">
            {t('playReel.headlineHighlight')}
          </span>
          <br className="hidden sm:inline" /> {t('playReel.headline2')}
        </h2>
      </motion.div>

      {/* Interactive PLAY REEL Capsule */}
      <motion.div
        style={{ scale: cardScale, y: cardY }}
        onClick={() => setModalOpen(true)}
        className="group relative w-full max-w-4xl h-[28vh] sm:h-[40vh] md:h-[44vh] rounded-[36px] sm:rounded-[64px] bg-[#09120e] border border-white/20 overflow-hidden cursor-pointer shadow-2xl flex items-center justify-center my-4 z-10 select-none transition-all duration-300 hover:border-[#d4e157]/50"
      >
        {/* Ambient Gradient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1b4d3e]/85 via-[#0a1813] to-black opacity-85 group-hover:scale-105 transition-transform duration-700" />

        {/* Ambient Fluid Glow */}
        <div className="absolute w-[280px] sm:w-[380px] h-[280px] sm:h-[380px] rounded-full bg-[#d4e157]/20 blur-[100px] animate-pulse pointer-events-none" />

        {/* Headline & Trigger */}
        <div className="relative z-10 flex flex-col items-center justify-center px-4">
          <h3 className="font-display font-bold text-5xl sm:text-8xl md:text-9xl tracking-[-0.05em] text-[#d4e157] group-hover:text-white transition-colors duration-500 uppercase">
            PLAY REEL
          </h3>

          <div className="mt-3 sm:mt-5 flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-mono uppercase tracking-widest text-white group-hover:bg-[#d4e157] group-hover:text-[#111111] group-hover:shadow-[0_0_30px_rgba(212,225,87,0.4)] transition-all">
            <Play size={13} className="fill-current translate-x-0.5" />
            <span>{t('playReel.playButton')}</span>
          </div>
        </div>
      </motion.div>

      {/* Subtext Paragraph */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mt-6 sm:mt-10 text-base sm:text-xl md:text-2xl font-display font-light text-white/85 max-w-3xl leading-relaxed z-10"
      >
        {t('playReel.subtext')}
      </motion.p>

      {/* Video Reel Modal Overlay */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl bg-[#0e1613] border border-white/20 rounded-3xl p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center text-center shadow-2xl z-10 max-h-[92vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 sm:p-2.5 rounded-full bg-white/10 text-white hover:bg-[#d4e157] hover:text-[#111111] transition-colors z-20"
                title={lang === 'id' ? 'Tutup (Esc)' : 'Close (Esc)'}
              >
                <X size={18} />
              </button>

              {/* Video Player Display: YouTube / Vimeo / MP4 / Fallback */}
              {videoInfo.type === 'youtube' || videoInfo.type === 'vimeo' ? (
                <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black">
                  <iframe
                    src={videoInfo.src}
                    title="System Showreel Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
              ) : videoInfo.type === 'video' ? (
                <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black">
                  <video
                    src={videoInfo.src}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                /* Fallback State: Styled Preview Card */
                <div className="w-full aspect-video max-w-3xl rounded-2xl bg-gradient-to-br from-[#1b4d3e]/40 to-[#070e0b] border border-white/15 p-6 sm:p-10 flex flex-col items-center justify-center text-center space-y-5">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#d4e157] text-[#111111] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                    <Video size={30} className="sm:size-8" />
                  </div>

                  <div className="space-y-2 max-w-xl">
                    <h4 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white">
                      {t('playReel.modalTitle')}
                    </h4>
                    <p className="text-xs sm:text-sm font-light text-white/80 leading-relaxed">
                      {t('playReel.modalDesc')}{' '}
                      <span className="text-[#d4e157] font-medium">
                        {settings.brandName || 'Filamsi Mabda Ghifary'}
                      </span>
                      .
                    </p>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={settings.showreelUrl || 'https://github.com/filamsi'}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#d4e157] text-[#111111] font-semibold text-xs uppercase tracking-wider hover:bg-[#e4f167] shadow-lg transition-all"
                    >
                      <span>{t('playReel.viewRepo')}</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>

                  <p className="text-xs font-mono text-white/50 pt-2 max-w-md">
                    {t('playReel.comingSoon')}
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
