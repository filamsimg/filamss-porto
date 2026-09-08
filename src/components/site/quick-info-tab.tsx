'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileDown } from 'lucide-react';
import { usePortfolio } from '@/context/portfolio-context';
import { getWhatsAppUrl } from '@/lib/whatsapp';

export default function QuickInfoTab() {
  const [isOpen, setIsOpen] = useState(false);
  const { quickInfo, settings } = usePortfolio();

  const whatsappUrl = getWhatsAppUrl(
    settings.whatsappNumber,
    `Halo ${settings.brandName || 'Filamsi'}, saya tertarik untuk berdiskusi mengenai proyek setelah melihat portofolio Anda.`
  );
  const resumeUrl = settings.resumeUrl || '/uploads/resume.pdf';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Vertical Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-3 top-1/2 -translate-y-1/2 z-50 rounded-full bg-white py-3.5 px-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] ring-1 ring-black/5 flex items-center justify-center hover:scale-105 transition-transform"
        style={{ writingMode: 'vertical-rl', transform: 'translateY(-50%) rotate(180deg)' }}
        aria-label="Open Quick Info"
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#111111]">
          Quick info
        </span>
      </button>

      {/* Drawer & Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
            />

            {/* Sliding Drawer */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              className="fixed right-0 top-0 h-full w-[88vw] max-w-sm bg-[#1b4d3e] text-white p-6 sm:p-8 flex flex-col justify-between shadow-2xl z-10 overflow-y-auto"
            >
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-xs uppercase tracking-[0.18em] font-semibold text-[#d4e157]">
                    Quick info
                  </span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    aria-label="Close Quick Info"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Dynamic Info Rows */}
                <div className="space-y-4 pt-1">
                  {quickInfo.map((row, idx) => {
                    const isContact = row.label.toLowerCase().includes('contact');

                    return (
                      <div key={idx} className="flex flex-col gap-1 border-b border-white/10 pb-3">
                        <span className="text-[10px] uppercase tracking-[0.14em] text-white/50">
                          {row.label}
                        </span>
                        {isContact ? (
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-base sm:text-lg font-medium text-white hover:text-[#d4e157] transition-colors flex items-center justify-between group"
                            title="Chat via WhatsApp"
                          >
                            <span>{row.value}</span>
                            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 group-hover:bg-[#25D366] group-hover:text-black transition-colors">
                              WhatsApp
                            </span>
                          </a>
                        ) : (
                          <span className="text-base sm:text-lg font-medium text-white">
                            {row.value}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Direct Action Button: Resume Download */}
                <div className="pt-2">
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    download
                    className="group flex items-center justify-between w-full py-3.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium text-xs tracking-wider uppercase transition-all duration-200 hover:border-white/40 active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileDown size={16} className="text-[#d4e157] group-hover:translate-y-0.5 transition-transform" />
                      <span>Download Resume</span>
                    </div>
                    <span className="text-[10px] font-mono text-white/50 group-hover:text-white transition-colors">
                      PDF
                    </span>
                  </a>
                </div>
              </div>

              {/* Bottom Paragraph */}
              <div className="pt-6 mt-6 border-t border-white/10">
                <p className="text-xs sm:text-sm font-light text-white/70 leading-relaxed">
                  {settings.quickInfoNote || "Looking for a thoughtful developer partner? Let's talk about your project."}
                </p>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
