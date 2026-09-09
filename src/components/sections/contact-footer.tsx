'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { usePortfolio } from '@/context/portfolio-context';
import { useLanguage } from '@/context/language-context';
import { MOTION } from '@/lib/design-tokens';

export default function ContactFooter() {
  const containerRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const { settings, hero, footer } = usePortfolio();
  const { lang, t } = useLanguage();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  const rawPortraitY = useTransform(scrollYProgress, [0, 1], [40, -10]);
  const portraitY = useSpring(rawPortraitY, MOTION.spring);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(settings.contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer
      ref={containerRef}
      id="contact"
      className="sticky bottom-0 z-10 min-h-screen w-full bg-[#1b4d3e] text-white grain flex flex-col justify-between pt-[10vh] sm:pt-[14vh] pb-10 px-4 sm:px-6 overflow-hidden"
      style={{ position: 'sticky', bottom: 0, zIndex: 10 }}
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center text-center my-auto w-full">
        {/* Headline */}
        <div className="flex flex-col items-center justify-center font-display font-medium leading-[0.9] tracking-[-0.045em]">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-white"
            style={{ fontSize: 'clamp(2.5rem, 11vw, 9rem)' }}
          >
            {lang === 'id' ? t('footer.headline1') : (footer.headlineLine1 || "Let's work")}
          </motion.h2>

          {/* Parallax portrait circle */}
          <motion.div
            style={{ y: portraitY }}
            className="h-[18vh] sm:h-[28vh] aspect-square rounded-full overflow-hidden bg-[#e2e2dc] border-4 border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.4)] -my-[2vh] sm:-my-[4vh] z-10 flex items-center justify-center relative"
          >
            <img
              src={hero.portraitUrl}
              alt="Developer Portrait"
              className="w-full h-full object-cover object-top filter grayscale brightness-60 contrast-80"
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#d4e157]"
            style={{ fontSize: 'clamp(2.5rem, 11vw, 9rem)' }}
          >
            {lang === 'id' ? t('footer.headline2') : (footer.headlineLine2 || 'together')}
          </motion.h2>
        </div>

        {/* Email */}
        <div className="mt-8 sm:mt-12 flex flex-col items-center gap-3 w-full max-w-lg px-2">
          <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-white/55">
            {lang === 'id' ? t('footer.emailPrompt') : (footer.emailLabel || 'Drop me an email')}
          </span>
          <div className="flex items-center justify-center gap-2.5 w-full max-w-full">
            <a
              href={`mailto:${settings.contactEmail}`}
              className="text-base sm:text-2xl md:text-3xl font-medium text-white hover:text-[#d4e157] transition-colors truncate max-w-[80vw]"
            >
              {settings.contactEmail}
            </a>
            <button
              onClick={handleCopyEmail}
              className="h-9 w-9 sm:h-11 sm:w-11 shrink-0 rounded-xl bg-[#d4e157] text-[#111111] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-md"
              aria-label="Copy Email"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="w-full max-w-5xl mx-auto pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/45 font-mono">
        <span>©{new Date().getFullYear()} {settings.brandName}</span>
        <span className="uppercase tracking-[0.18em]">
          {lang === 'id' ? t('footer.copyright') : (footer.copyrightNote || 'Designed & built with care')}
        </span>
      </div>
    </footer>
  );
}
