'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, Calendar, Tag, Code2, Globe, Github, X, Eye } from 'lucide-react';
import { usePortfolio } from '@/context/portfolio-context';
import SmoothScroll from '@/components/site/smooth-scroll';
import TopBar from '@/components/site/top-bar';
import FloatingNav from '@/components/site/floating-nav';
import QuickInfoTab from '@/components/site/quick-info-tab';
import SocialIcons from '@/components/site/social-icons';
import ContactFooter from '@/components/sections/contact-footer';

export default function ProjectDetailPage() {
  const params = useParams();
  const { works } = usePortfolio();
  const [selectedLightboxImage, setSelectedLightboxImage] = useState<string | null>(null);

  const idNum = Number(params?.id);
  const project = works.find((w) => w.id === idNum);

  if (!project) {
    return (
      <main className="min-h-screen bg-[#f4f4f0] flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-3xl font-bold font-display">Project Not Found</h1>
        <p className="mt-2 text-sm text-[#111111]/60">The requested project could not be found.</p>
        <Link
          href="/projects"
          className="mt-6 px-6 py-3 rounded-full bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider"
        >
          Back to Projects
        </Link>
      </main>
    );
  }

  const currentIndex = works.findIndex((w) => w.id === idNum);
  const nextProject = works[(currentIndex + 1) % works.length];

  const galleryImages =
    project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];

  return (
    <SmoothScroll>
      <main className="relative w-full bg-[#e8e8e4] text-[#111111] min-h-screen">
        <TopBar />
        <FloatingNav />
        <QuickInfoTab />
        <SocialIcons />

        {/* Page Content Panel (z-20 sitting above ContactFooter z-10) */}
        <div className="relative z-20 bg-[#e8e8e4] rounded-b-3xl shadow-2xl mb-0">
          <article className="pt-32 sm:pt-40 pb-24 px-6 sm:px-12 lg:px-20 max-w-6xl mx-auto space-y-12 sm:space-y-16">
            {/* Back Navigation */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#111111]/60 hover:text-[#111111] transition-colors group"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back to Selected Projects</span>
              </Link>
            </motion.div>

            {/* Project Title Header */}
            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display font-medium text-4xl sm:text-6xl md:text-7xl tracking-[-0.04em] text-[#111111]"
              >
                {project.title}
              </motion.h1>

              <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-b border-black/10 py-4 text-xs font-mono uppercase tracking-wider text-[#111111]/70">
                <div className="flex items-center gap-2">
                  <Tag size={14} className="text-[#1b4d3e]" />
                  <span>{project.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-[#1b4d3e]" />
                  <span>{project.year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Code2 size={14} className="text-[#1b4d3e]" />
                  <span>
                    {project.technologies && project.technologies.length > 0
                      ? project.technologies.slice(0, 3).join(' · ')
                      : 'Full Stack & AI'}
                  </span>
                </div>
              </div>
            </div>

            {/* Primary Featured Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelectedLightboxImage(project.image)}
              className="group relative w-full aspect-[16/9] rounded-3xl overflow-hidden bg-[#e5e5e0] border border-black/10 shadow-xl cursor-pointer"
            >
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 text-[#111111] font-semibold text-xs uppercase tracking-wider backdrop-blur-md shadow-lg">
                  <Eye size={14} />
                  <span>Click for Fullscreen View</span>
                </div>
              </div>
            </motion.div>

            {/* Action Links & Overview Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-4">
              {/* Left: Overview & Technology Badges */}
              <div className="lg:col-span-8 space-y-6">
                <h2 className="text-2xl font-display font-semibold text-[#111111]">Project Overview</h2>
                <p className="text-base sm:text-lg text-[#111111]/80 leading-relaxed font-light">
                  {project.description ||
                    `High-performance application developed for ${project.title}. Designed with careful attention to system architecture, UI/UX responsiveness, and optimized performance.`}
                </p>

                {/* Technologies Badges */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[#111111]/55">
                      Technologies &amp; Frameworks
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3.5 py-1.5 rounded-full bg-white border border-black/10 text-xs font-medium text-[#111111]/80 shadow-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Live Demo & GitHub Action Card */}
              <div className="lg:col-span-4 space-y-6">
                <div className="p-6 rounded-3xl bg-white text-[#111111] border border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.06)] space-y-5">
                  <div>
                    <h3 className="text-lg font-display font-semibold text-[#111111]">Live Project Links</h3>
                    <p className="text-xs text-[#111111]/60 font-light mt-1 leading-relaxed">
                      Inspect the live application preview or explore the repository on GitHub.
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-3 px-4 rounded-2xl bg-[#d4e157] text-[#111111] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#c8d54c] transition-all shadow-sm transform hover:-translate-y-0.5"
                      >
                        <Globe size={14} />
                        <span>Live Preview ↗</span>
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-3 px-4 rounded-2xl bg-[#111111] text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#262626] transition-all shadow-sm transform hover:-translate-y-0.5"
                      >
                        <Github size={14} />
                        <span>GitHub Repository ↗</span>
                      </a>
                    )}

                    {!project.demoUrl && !project.githubUrl && (
                      <a
                        href="https://github.com/filamsi"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-3 px-4 rounded-2xl bg-[#d4e157] text-[#111111] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#c8d54c] transition-all shadow-sm transform hover:-translate-y-0.5"
                      >
                        <Github size={14} />
                        <span>Visit GitHub Profile</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Multi-Photo Gallery Showcase */}
            {galleryImages.length > 1 && (
              <div className="space-y-6 pt-8 border-t border-black/10">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-display font-semibold text-[#111111]">
                    Multi-Photo Gallery
                  </h2>
                  <span className="font-mono text-xs text-[#111111]/50 uppercase tracking-wider">
                    [{galleryImages.length} Screenshots]
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {galleryImages.map((img, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: idx * 0.08 }}
                      onClick={() => setSelectedLightboxImage(img)}
                      className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#e5e5e0] border border-black/10 shadow-md cursor-pointer"
                    >
                      <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="p-3 rounded-full bg-white/90 text-[#111111] shadow-lg">
                          <Eye size={16} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Next Project Footer Link */}
            {nextProject && (
              <div className="pt-16 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <span className="text-xs font-mono uppercase tracking-wider text-[#111111]/50">
                  Next Project
                </span>
                <Link
                  href={`/projects/${nextProject.id}`}
                  className="group flex items-center gap-3 text-2xl sm:text-4xl font-display font-medium text-[#111111] hover:text-[#1b4d3e] transition-colors"
                >
                  <span>{nextProject.title}</span>
                  <span className="text-base font-normal opacity-60 group-hover:translate-x-2 transition-transform">
                    →
                  </span>
                </Link>
              </div>
            )}
          </article>
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedLightboxImage && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedLightboxImage(null)}
                className="absolute inset-0 bg-black/90 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative max-w-5xl max-h-[85vh] z-10 overflow-hidden rounded-2xl shadow-2xl"
              >
                <button
                  onClick={() => setSelectedLightboxImage(null)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-black/70 text-white hover:bg-[#d4e157] hover:text-[#111111] transition-colors z-20"
                >
                  <X size={20} />
                </button>
                <img
                  src={selectedLightboxImage}
                  alt="Lightbox Full View"
                  className="w-full h-auto max-h-[85vh] object-contain rounded-2xl"
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Contact Footer (z-10 sitting underneath) */}
        <ContactFooter />
      </main>
    </SmoothScroll>
  );
}
