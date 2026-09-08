'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Calendar, Tag, Code2, Sparkles } from 'lucide-react';
import { usePortfolio } from '@/context/portfolio-context';
import SmoothScroll from '@/components/site/smooth-scroll';
import TopBar from '@/components/site/top-bar';
import FloatingNav from '@/components/site/floating-nav';
import QuickInfoTab from '@/components/site/quick-info-tab';
import SocialIcons from '@/components/site/social-icons';
import ContactFooter from '@/components/sections/contact-footer';

export default function WorkDetailPage() {
  const params = useParams();
  const { works } = usePortfolio();

  const idNum = Number(params?.id);
  const work = works.find((w) => w.id === idNum);

  if (!work) {
    return (
      <main className="min-h-screen bg-[#f4f4f0] flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-3xl font-bold font-display">Project Not Found</h1>
        <p className="mt-2 text-sm text-[#111111]/60">The requested work project could not be found.</p>
        <Link
          href="/works"
          className="mt-6 px-6 py-3 rounded-full bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider"
        >
          Back to Works
        </Link>
      </main>
    );
  }

  // Find next project
  const currentIndex = works.findIndex((w) => w.id === idNum);
  const nextWork = works[(currentIndex + 1) % works.length];

  return (
    <SmoothScroll>
      <main className="relative w-full bg-[#f4f4f0] text-[#111111] min-h-screen">
        <TopBar />
        <FloatingNav />
        <QuickInfoTab />
        <SocialIcons />

        <article className="pt-32 sm:pt-40 pb-24 px-6 sm:px-12 lg:px-20 max-w-6xl mx-auto space-y-12 sm:space-y-16">
          {/* Back Navigation */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Link
              href="/works"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#111111]/60 hover:text-[#111111] transition-colors group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Selected Works</span>
            </Link>
          </motion.div>

          {/* Project Title Header */}
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display font-medium text-4xl sm:text-6xl md:text-7xl tracking-[-0.04em] text-[#111111]"
            >
              {work.title}
            </motion.h1>

            <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-b border-black/10 py-4 text-xs font-mono uppercase tracking-wider text-[#111111]/70">
              <div className="flex items-center gap-2">
                <Tag size={14} className="text-[#1b4d3e]" />
                <span>{work.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-[#1b4d3e]" />
                <span>{work.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <Code2 size={14} className="text-[#1b4d3e]" />
                <span>Next.js · React · Tailwind</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="w-full aspect-[16/9] rounded-3xl overflow-hidden bg-[#e5e5e0] border border-black/10 shadow-xl"
          >
            <img src={work.image} alt={work.title} className="w-full h-full object-cover" />
          </motion.div>

          {/* Project Overview & Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-4">
            <div className="lg:col-span-8 space-y-6">
              <h2 className="text-2xl font-display font-semibold text-[#111111]">Project Overview</h2>
              <p className="text-base sm:text-lg text-[#111111]/80 leading-relaxed font-light">
                High-performance digital experience built specifically for {work.title}. Designed with careful attention to UI/UX hierarchy, performance, and SEO optimization.
              </p>

              <div className="p-6 rounded-2xl bg-white border border-black/10 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#1b4d3e]">
                  <Sparkles size={16} />
                  <span>Key Technical Deliverables</span>
                </div>
                <ul className="text-xs sm:text-sm text-[#111111]/70 space-y-2 list-disc list-inside font-light">
                  <li>Custom responsive interface designed using Next.js App Router and Framer Motion.</li>
                  <li>Integrated RESTful APIs and real-time data processing workflows.</li>
                  <li>Optimized performance, SEO scoring, and multi-device accessibility.</li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-3xl bg-[#121c19] text-white space-y-4 shadow-lg">
                <h3 className="text-lg font-display font-semibold">Live Project</h3>
                <p className="text-xs text-white/70 font-light">
                  Explore the live deployment or view source code repository on GitHub.
                </p>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 rounded-full bg-[#d4e157] text-[#111111] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#e4f167] transition-colors"
                >
                  <span>Visit Repository</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Next Project Footer Link */}
          {nextWork && (
            <div className="pt-16 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <span className="text-xs font-mono uppercase tracking-wider text-[#111111]/50">
                Next Project
              </span>
              <Link
                href={`/works/${nextWork.id}`}
                className="group flex items-center gap-3 text-2xl sm:text-4xl font-display font-medium text-[#111111] hover:text-[#1b4d3e] transition-colors"
              >
                <span>{nextWork.title}</span>
                <span className="text-base font-normal opacity-60 group-hover:translate-x-2 transition-transform">
                  →
                </span>
              </Link>
            </div>
          )}
        </article>

        {/* Contact Footer */}
        <ContactFooter />
      </main>
    </SmoothScroll>
  );
}
