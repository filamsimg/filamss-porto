'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { usePortfolio, getLocalizedWork } from '@/context/portfolio-context';
import { useLanguage } from '@/context/language-context';
import SmoothScroll from '@/components/site/smooth-scroll';
import TopBar from '@/components/site/top-bar';
import FloatingNav from '@/components/site/floating-nav';
import QuickInfoTab from '@/components/site/quick-info-tab';
import SocialIcons from '@/components/site/social-icons';
import ContactFooter from '@/components/sections/contact-footer';

export default function ProjectsPage() {
  const { works } = usePortfolio();
  const { lang, t } = useLanguage();

  return (
    <SmoothScroll>
      <main className="relative w-full bg-[#e8e8e4] text-[#111111] min-h-screen">
        <TopBar />
        <FloatingNav />
        <QuickInfoTab />
        <SocialIcons />

        {/* Page Content Panel (z-20 sitting above ContactFooter z-10) */}
        <div className="relative z-20 bg-[#e8e8e4] rounded-b-3xl shadow-2xl mb-0">
          <section className="pt-32 sm:pt-40 pb-24 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-baseline justify-between border-b border-black/10 pb-8 mb-12 sm:mb-16">
              <h1 className="font-display font-medium text-4xl sm:text-6xl md:text-7xl tracking-[-0.04em] text-[#111111]">
                {lang === 'id' ? 'Koleksi karya & proyek' : 'Selected projects'}
              </h1>
              <span className="font-mono text-sm sm:text-base text-[#111111]/50">
                [{works.length < 10 ? `0${works.length}` : works.length}]
              </span>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14">
              {works.map((project, idx) => {
                const localized = getLocalizedWork(project, lang);
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className={`${project.isTall ? 'md:mt-12' : ''}`}
                  >
                    <Link href={`/projects/${project.id}`} className="group block space-y-4">
                      {/* Card Media Container */}
                      <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden bg-[#e5e5e0] border border-black/5 shadow-md">
                        <img
                          src={project.image}
                          alt={localized.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />

                        {/* Hover View Floating Pill */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#d4e157] text-[#111111] font-semibold text-xs uppercase tracking-wider shadow-xl transform scale-90 group-hover:scale-100 transition-transform duration-300">
                            <span>{t('allProjects.viewProject')}</span>
                            <ArrowUpRight size={14} />
                          </div>
                        </div>
                      </div>

                      {/* Details Line */}
                      <div className="flex items-start justify-between pt-1">
                        <div>
                          <h2 className="text-xl sm:text-2xl font-display font-medium text-[#111111] group-hover:text-[#1b4d3e] transition-colors">
                            {localized.title}
                          </h2>
                          <p className="text-xs sm:text-sm text-[#111111]/60 font-light mt-0.5">
                            {localized.category}
                          </p>
                        </div>
                        <span className="font-mono text-xs text-[#111111]/50 pt-1">
                          {project.year}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Contact Footer (z-10 sitting underneath) */}
        <ContactFooter />
      </main>
    </SmoothScroll>
  );
}
