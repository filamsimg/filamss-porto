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
      className="relative z-20 min-h-[100svh] w-full bg-[#e8e8e4] text-[#111111] overflow-hidden grain flex flex-col justify-between pt-24 sm:pt-28 pb-20 px-4 sm:px-12 lg:px-20"
      style={{ position: 'relative', zIndex: 20 }}
    >
      {/* 1. Background Typography Layer */}
      <motion.div
        style={{ y: textY, opacity, willChange: 'transform' }}
        className="relative z-10 w-full max-w-7xl mx-auto my-auto pt-2 sm:pt-8 flex flex-col justify-center"
      >
        <motion.h1
          variants={lineVariants}
          initial="hidden"
          animate="visible"
          className="font-display font-normal text-[#111111] leading-[0.9] sm:leading-[0.88] tracking-[-0.045em] select-none"
          style={{ fontSize: 'clamp(2.4rem, 8.5vw, 8.2rem)' }}
        >
          {/* Line 1 (Web) */}
          <span className="block overflow-hidden pb-1 sm:pb-2 pl-0 sm:pl-[24vw]">
            <motion.span variants={wordVariants} className="block">
              {locHero.titleLine1 || 'Web'}
            </motion.span>
          </span>

          {/* Line 2 (Developer) */}
          {locHero.titleLine2 ? (
            <span className="block overflow-hidden pb-1 sm:pb-2 pl-10 sm:pl-[34vw]">
              <motion.span variants={wordVariants} className="block font-normal">
                {locHero.titleLine2}
              </motion.span>
            </span>
          ) : null}
        </motion.h1>

        {/* Subtext description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 sm:mt-6 pl-10 sm:pl-[35vw] z-30"
        >
          <p className="text-xs sm:text-sm text-[#111111]/75 font-normal tracking-tight max-w-[260px] sm:max-w-xs leading-relaxed">
            {locHero.subtext}
          </p>
        </motion.div>
      </motion.div>

      {/* 2. Cutout Portrait Image FOREGROUND Layer */}
      <motion.div
        style={{ y: portraitY, opacity, willChange: 'transform' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-0 sm:left-[3%] lg:left-[5%] bottom-0 z-30 h-[62vh] sm:h-[84vh] max-w-[85vw] pointer-events-none select-none"
      >
        <img
          src={hero.portraitUrl}
          alt="Developer Portrait"
          className="h-full w-auto object-cover object-top filter grayscale contrast-[1.08] mix-blend-multiply opacity-80 sm:opacity-100"
          draggable={false}
        />
      </motion.div>
    </section>
  );
}
