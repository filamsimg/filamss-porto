'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { usePortfolio, getLocalizedHero } from '@/context/portfolio-context';
import { useLanguage } from '@/context/language-context';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { hero } = usePortfolio();
  const { lang } = useLanguage();
  const locHero = getLocalizedHero(hero, lang);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Sinking Scroll Animation — wrap in useSpring for buttery smooth parallax
  const SPRING = { stiffness: 80, damping: 20, mass: 0.5 };
  const rawPortraitY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const rawTextY     = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const portraitY    = useSpring(rawPortraitY, SPRING);
  const textY        = useSpring(rawTextY, SPRING);
  const opacity      = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const lineVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { y: '110%' },
    visible: {
      y: '0%',
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative z-20 min-h-[85svh] sm:min-h-[100svh] w-full bg-[#e8e8e4] text-[#111111] overflow-hidden grain flex flex-col justify-center pt-20 pb-12 sm:pt-28 sm:pb-20 px-4 xs:px-6 sm:px-12 lg:px-20"
      style={{ position: 'relative', zIndex: 20 }}
    >
      {/* 1. Main Hero Content — Side-by-side on mobile (Photo LEFT, Text RIGHT), stacked with offsets on desktop */}
      <motion.div
        style={{ y: textY, opacity, willChange: 'transform' }}
        className="relative z-30 w-full max-w-7xl mx-auto flex flex-row items-center justify-between gap-2 xs:gap-4 sm:block"
      >
        {/* Mobile Portrait — on the LEFT in mobile mode */}
        <motion.div
          style={{ y: portraitY, opacity, willChange: 'transform' }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="w-[36%] xs:w-[40%] max-w-[155px] shrink-0 flex items-end justify-start sm:hidden pointer-events-none select-none z-20 self-center"
        >
          <div className="relative w-full h-[230px] xs:h-[270px] overflow-hidden [mask-image:linear-gradient(to_bottom,black_82%,transparent_100%)] flex items-end justify-start">
            <img
              src={hero.portraitUrl || '/images/portrait-hero.png'}
              alt="Developer Portrait"
              className="h-full w-auto object-cover object-top filter grayscale contrast-[1.05] opacity-95 drop-shadow-sm"
              draggable={false}
            />
          </div>
        </motion.div>

        {/* Text Column — on the RIGHT in mobile mode */}
        <div className="flex-1 min-w-0 sm:w-full pl-1 xs:pl-3 sm:pl-0">
          <motion.h1
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            className="font-display font-normal text-[#111111] leading-[0.92] sm:leading-[0.88] tracking-[-0.045em] select-none text-[2rem] xs:text-[2.4rem] sm:text-[clamp(2.8rem,10vw,8.2rem)]"
          >
            {/* Line 1 — beside photo on mobile, indented right on sm+ */}
            <span className="block overflow-hidden pb-0.5 sm:pb-2 text-left sm:pl-[20vw] lg:pl-[24vw]">
              <motion.span variants={wordVariants} className="block">
                {locHero.titleLine1 || 'Full-Stack'}
              </motion.span>
            </span>

            {/* Line 2 — beside photo on mobile, indented right on sm+ */}
            {locHero.titleLine2 ? (
              <span className="block overflow-hidden pb-0.5 sm:pb-2 text-left sm:pl-[28vw] lg:pl-[34vw]">
                <motion.span variants={wordVariants} className="block font-normal">
                  {locHero.titleLine2}
                </motion.span>
              </span>
            ) : null}
          </motion.h1>

          {/* Subtext — beside photo on mobile, indented on sm+ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3.5 sm:mt-6 text-left sm:pl-[40vw] lg:pl-[38vw] relative z-30"
          >
            <p className="text-xs sm:text-sm text-[#111111]/75 font-normal tracking-tight max-w-[220px] xs:max-w-[250px] sm:max-w-xs leading-relaxed">
              {locHero.subtext}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* 3. Desktop Portrait — preserved exactly as original: pinned bottom-left */}
      <motion.div
        style={{ y: portraitY, opacity, willChange: 'transform' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="hidden sm:block absolute left-[3%] lg:left-[5%] bottom-0 z-10 sm:h-[75vh] lg:h-[84vh] sm:max-w-[60vw] lg:max-w-none pointer-events-none select-none"
      >
        <img
          src={hero.portraitUrl || '/images/portrait-hero.png'}
          alt="Developer Portrait"
          className="h-full w-auto object-cover object-top filter grayscale contrast-[1.05] sm:opacity-80 sm:mix-blend-multiply lg:opacity-100"
          draggable={false}
        />
      </motion.div>
    </section>
  );
}
