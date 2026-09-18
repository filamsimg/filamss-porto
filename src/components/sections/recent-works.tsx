'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { usePortfolio, getLocalizedWork } from '@/context/portfolio-context';
import { useLanguage } from '@/context/language-context';
import { MOTION, RADIUS, SHADOWS } from '@/lib/design-tokens';

export default function RecentWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { works } = usePortfolio();
  const { lang, t } = useLanguage();

  const recentWorks = React.useMemo(() => {
    return [...works]
      .sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        return b.id - a.id;
      })
      .slice(0, 6);
  }, [works]);

  const [vw, setVw] = useState(1200);
  useEffect(() => {
    const updateVw = () => setVw(window.innerWidth);
    updateVw();
    window.addEventListener('resize', updateVw);
    return () => window.removeEventListener('resize', updateVw);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const isMobile = vw < 640;
  const CARD_W = isMobile ? Math.min(vw * 0.75, 300) : Math.min(400, vw * 0.28 || 340);
  const CARD_GAP = isMobile ? 24 : 40;
  const TOTAL_W = recentWorks.length * (CARD_W + CARD_GAP);
  const START_X = vw || 1200;
  const LAND_X = isMobile ? vw * 0.06 : (vw || 1200) * 0.06;
  const END_X = LAND_X - (TOTAL_W - CARD_W);

  const rawCardsX: MotionValue<number> = useTransform(
    scrollYProgress,
    [0.22, 0.95],
    [START_X, END_X]
  );

  const cardsX = useSpring(rawCardsX, MOTION.spring);

  const cardsOpacity = useTransform(scrollYProgress, [0.18, 0.32], [0, 1]);
  const eyebrowOpacity = useTransform(
    scrollYProgress,
    [0.30, 0.42, 0.85, 0.93],
    [0, 1, 1, 0]
  );

  const rawTitleY = useTransform(
    scrollYProgress,
    [0, 0.25, 0.65],
    [0, 0, -48]
  );
  const titleY = useSpring(rawTitleY, MOTION.spring);
  const titleScale = useTransform(scrollYProgress, [0, 0.25, 0.65], [1, 1, 0.78]);
  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.20, 0.68, 0.84],
    [1, 1, 0.45, 0]
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={`relative z-40 bg-[#e8e8e4] text-[#111111] ${RADIUS.panelTop} -mt-4 ${RADIUS.panelBottom} ${SHADOWS.panelBottom}`}
      style={{ height: '350vh', position: 'relative', zIndex: 40 }}
    >
      {/* ── STICKY VIEWPORT ──────────────────────────────────── */}
      <div
        className="sticky top-0 h-screen overflow-hidden flex items-center justify-center"
        style={{ willChange: 'transform' }}
      >
        {/* ── TITLE — z-10 (BEHIND cards) ─────────────────── */}
        <motion.div
          style={{ y: titleY, scale: titleScale, opacity: titleOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 z-10 pointer-events-none select-none"
        >
          <h2
            className="font-display font-medium text-[#111111] tracking-[-0.04em] text-center leading-none"
            style={{ fontSize: 'clamp(2.4rem, 13vw, 11rem)' }}
          >
            {lang === 'id' ? 'Proyek pilihan' : 'Recent projects'}
          </h2>
        </motion.div>

        {/* ── TOP EYEBROW + VIEW ALL ───────────────────────── */}
        <motion.div
          style={{ opacity: eyebrowOpacity }}
          className="absolute top-7 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30"
        >
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#111111]/50">
            {recentWorks.length} {lang === 'id' ? 'Karya' : 'Recent'} ·
          </span>
          <Link
            href="/projects"
            className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-[0.18em] text-[#111111] hover:opacity-60 transition-opacity bg-black/5 px-3 py-1.5 rounded-full border border-black/10"
          >
            <span>{t('projects.viewAll')}</span>
            <ArrowUpRight size={12} />
          </Link>
        </motion.div>

        {/* ── HORIZONTAL CARDS TRACK — z-20 (IN FRONT of title) ── */}
        <motion.div
          style={{ opacity: cardsOpacity }}
          className="relative z-20 w-full flex items-center overflow-visible"
        >
          <motion.div
            style={{ x: cardsX, willChange: 'transform' }}
            className="flex gap-6 sm:gap-10 w-max px-4 sm:px-0"
          >
            {recentWorks.map((project) => {
              const localized = getLocalizedWork(project, lang);
              return (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="group relative flex flex-col gap-3 shrink-0 cursor-pointer"
                  style={{ width: `${CARD_W}px` }}
                >
                  {/* Card Media Container */}
                  <div
                    className={`relative w-full rounded-2xl overflow-hidden bg-[#d9d9d4] border border-black/10 shadow-lg ${project.isTall ? 'aspect-[3/4]' : 'aspect-[16/11]'
                      }`}
                  >
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={localized.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        style={{ willChange: 'transform' }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-[#111111]/25 text-xs font-mono uppercase tracking-widest">
                          No Image
                        </span>
                      </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-[#111111]/0 group-hover:bg-[#111111]/28 transition-colors duration-400 flex items-end justify-between p-5">
                      <span className="text-white/90 text-[11px] font-mono uppercase tracking-wider opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                        {localized.category}
                      </span>
                      <div className="h-9 w-9 rounded-full bg-[#d4e157] text-[#111111] flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                        <ArrowUpRight size={16} strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>

                  {/* Card info */}
                  <div className="flex items-start justify-between gap-2 px-0.5">
                    <div className="min-w-0">
                      <h3 className="text-sm sm:text-base font-medium text-[#111111] leading-tight truncate group-hover:text-[#1b4d3e] transition-colors duration-300">
                        {localized.title}
                      </h3>
                      <p className="text-xs text-[#111111]/45 mt-0.5">
                        {localized.category}
                      </p>
                    </div>
                    <span className="text-xs font-mono text-[#111111]/38 shrink-0 pt-0.5">
                      {project.year}
                    </span>
                  </div>
                </Link>
              );
            })}
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
