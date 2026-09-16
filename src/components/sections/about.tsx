'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio, getLocalizedAbout } from '@/context/portfolio-context';
import { useLanguage } from '@/context/language-context';
import { COLORS, RADIUS, SHADOWS, MOTION } from '@/lib/design-tokens';

export default function AboutSection() {
  const { about } = usePortfolio();
  const { lang, t } = useLanguage();
  const locAbout = getLocalizedAbout(about, lang);

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: MOTION.ease,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: MOTION.ease },
    },
  };

  return (
    <section
      id="about"
      className="relative z-30 min-h-[90svh] bg-[#1b4d3e] text-white flex items-center justify-center py-[18vh] sm:py-[22vh] px-6 text-center grain overflow-hidden"
      style={{ position: 'relative', zIndex: 30 }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="max-w-5xl mx-auto flex flex-col items-center justify-center"
      >
        {/* Dynamic Eyebrow */}
        <motion.p
          variants={itemVariants}
          className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-white/55 mb-8 sm:mb-10 font-mono"
        >
          {locAbout.eyebrow} <span className="text-[#d4e157] font-semibold">{locAbout.eyebrowHighlight}</span>
        </motion.p>

        {/* Dynamic Headline */}
        <motion.h2
          variants={itemVariants}
          className="font-display font-medium leading-[1.02] tracking-[-0.04em] text-white max-w-4xl"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
        >
          {locAbout.headline || (lang === 'id' ? t('about.headline') : about.headline)}{' '}
          <span className="text-[#d4e157]">
            {locAbout.headlineHighlight || (lang === 'id' ? t('about.headlineHighlight') : about.headlineHighlight)}
          </span>
        </motion.h2>

        {/* Dynamic Subtitle */}
        <motion.p
          variants={itemVariants}
          className="mt-6 sm:mt-8 text-white/70 text-lg sm:text-2xl font-light max-w-xl leading-relaxed"
        >
          {locAbout.subtext || (lang === 'id' ? t('about.subtext') : about.subtext)}
        </motion.p>
      </motion.div>
    </section>
  );
}
