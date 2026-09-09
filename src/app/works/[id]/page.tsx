'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Calendar, Tag, Code2, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '@/context/portfolio-context';
import SmoothScroll from '@/components/site/smooth-scroll';
import TopBar from '@/components/site/top-bar';
import FloatingNav from '@/components/site/floating-nav';
import QuickInfoTab from '@/components/site/quick-info-tab';
import SocialIcons from '@/components/site/social-icons';
import ContactFooter from '@/components/sections/contact-footer';

export default function WorkDetailPage() {
  const params = useParams();
  const { works, isLoaded } = usePortfolio();
  const workId = Number(params.id);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#f7f7f5] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#1b4d3e] border-t-transparent animate-spin" />
      </div>
    );
  }

  const work = works.find((w) => w.id === workId);

  if (!work) {
    return notFound();
  }

  // Find next project
  const currentIndex = works.findIndex((w) => w.id === workId);
  const nextWork = works[(currentIndex + 1) % works.length];

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#f7f7f5] text-[#111111] flex flex-col justify-between selection:bg-[#1b4d3e] selection:text-white">
        <TopBar />
        <QuickInfoTab />
        <FloatingNav />
        <SocialIcons />

        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-8 pt-32 pb-20 w-full space-y-12">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/#works"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#111111]/60 hover:text-[#111111] font-mono transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to Projects</span>
            </Link>
          </motion.div>

          {/* Title & Metadata Header */}
          <div className="space-y-4 border-b border-black/10 pb-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-wider text-[#111111]/60"
            >
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 border border-black/5">
                <Tag size={12} />
                {work.category}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 border border-black/5">
                <Calendar size={12} />
                {work.year}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-7xl font-display font-medium text-[#111111] tracking-tight leading-[1.05]"
            >
              {work.title}
            </motion.h1>
          </div>

          {/* Hero Media Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full aspect-[16/9] rounded-3xl overflow-hidden bg-[#e5e5e0] border border-black/10 shadow-xl"
          >
            <img src={work.image} alt={work.title} className="w-full h-full object-cover" />
          </motion.div>

          {/* Overview & Tech Stack Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-4">
            <div className="lg:col-span-8 space-y-6">
              <h2 className="text-2xl font-display font-semibold text-[#111111]">Project Overview</h2>
              <p className="text-base sm:text-lg text-[#111111]/80 leading-relaxed font-light">
                High-performance digital experience built specifically for {work.title}. Designed with careful attention to UI/UX hierarchy, performance, and SEO optimization.
              </p>

              <div className="p-6 rounded-2xl bg-white border border-black/10 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#1b4d3e]">
                  <CheckCircle2 size={16} />
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
        </main>

        {/* Contact Footer */}
        <ContactFooter />
      </div>
    </SmoothScroll>
  );
}
