'use client';

import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <div className="fixed right-0 top-0 bottom-0 z-40 w-1 pointer-events-none flex flex-col justify-start">
      {/* Background Track Line */}
      <div className="w-full h-full bg-black/10" />

      {/* Active Filled Line (Lime #d4e157) */}
      <motion.div
        style={{ scaleY, transformOrigin: 'top' }}
        className="absolute top-0 right-0 w-full h-full bg-[#d4e157] shadow-[0_0_8px_#d4e157]"
      />
    </div>
  );
}
