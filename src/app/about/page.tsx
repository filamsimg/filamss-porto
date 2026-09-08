'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '@/context/portfolio-context';
import SmoothScroll from '@/components/site/smooth-scroll';
import TopBar from '@/components/site/top-bar';
import FloatingNav from '@/components/site/floating-nav';
import QuickInfoTab from '@/components/site/quick-info-tab';
import SocialIcons from '@/components/site/social-icons';
import ContactFooter from '@/components/sections/contact-footer';

export default function AboutPage() {
  const { settings, hero, about } = usePortfolio();

  const services = about.services || [];
  const values = about.values || [];

  return (
    <SmoothScroll>
      <main className="relative w-full bg-[#e8e8e4] text-[#111111] min-h-screen">
        <TopBar />
        <FloatingNav />
        <QuickInfoTab />
        <SocialIcons />

        {/* Page Content Panel (z-20 sitting above ContactFooter z-10) */}
        <div className="relative z-20 bg-[#e8e8e4] rounded-b-3xl shadow-2xl mb-0">
          {/* Hero Banner Section */}
          <section className="pt-32 sm:pt-40 pb-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-12">
            <div className="border-b border-black/10 pb-8 flex items-baseline justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-[#111111]/50">
                About · {settings.brandName}
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-[#1b4d3e] font-semibold">
                Full-Stack Developer
              </span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-medium text-4xl sm:text-6xl md:text-7xl tracking-[-0.04em] text-[#111111] max-w-4xl leading-[1.05]"
            >
              Building performant web apps with Next.js, Laravel &amp; AI
            </motion.h1>

            <p className="text-xl sm:text-2xl text-[#111111]/80 font-light max-w-3xl leading-relaxed">
              {about.subtext ||
                'Specializing in end-to-end web development across Next.js, React, and Laravel ecosystems, enhanced with seamless AI model integrations.'}
            </p>
          </section>

          {/* Developer Image & Highlight Banner */}
          <section className="px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
                className="lg:col-span-5 aspect-[4/5] rounded-3xl overflow-hidden bg-white border border-black/10 shadow-xl"
              >
                <img
                  src={hero.portraitUrl || '/images/portrait-hero.png'}
                  alt={settings.brandName}
                  className="w-full h-full object-cover object-top filter grayscale contrast-105"
                />
              </motion.div>

              <div className="lg:col-span-7 space-y-6 lg:pl-6">
                <h2 className="font-display font-medium text-3xl sm:text-5xl tracking-tight text-[#111111]">
                  Hands-on engineering for modern web products &amp; AI systems.
                </h2>
                <p className="text-base sm:text-lg text-[#111111]/70 font-light leading-relaxed">
                  Graduate in Information Technology from Universitas Harkat Negeri Tegal. Specialized in modern full-stack development with Next.js, React, and TypeScript, backed by Laravel development and AI model integration.
                </p>
              </div>
            </div>
          </section>

          {/* Services / What I Can Help With */}
          <section className="bg-[#1b4d3e] text-white py-24 px-6 sm:px-12 lg:px-20 rounded-2xl mx-4 sm:mx-8">
            <div className="max-w-7xl mx-auto space-y-16">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#d4e157]">
                  Technical Stack &amp; Expertise
                </span>
                <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight mt-2">
                  Core Capabilities
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map((s) => (
                  <div
                    key={s.num}
                    className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#d4e157] transition-all space-y-6 group"
                  >
                    <span className="font-mono text-xs text-[#d4e157] block">{s.num}</span>
                    <h3 className="font-display font-bold text-2xl text-white group-hover:text-[#d4e157] transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-sm font-light text-white/80 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Philosophy & Values Section */}
          <section className="py-24 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-black/10 pt-16">
              {values.map((v) => (
                <div key={v.label} className="space-y-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#111111]/50">
                    {v.label}
                  </span>
                  <p className="font-display font-medium text-xl sm:text-2xl text-[#111111] leading-snug">
                    {v.quote}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Contact Footer (z-10 sitting underneath) */}
        <ContactFooter />
      </main>
    </SmoothScroll>
  );
}
