'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Search, X, ChevronDown, RotateCcw, FolderGit2 } from 'lucide-react';
import { usePortfolio, getLocalizedWork } from '@/context/portfolio-context';
import { useLanguage } from '@/context/language-context';
import SmoothScroll from '@/components/site/smooth-scroll';
import TopBar from '@/components/site/top-bar';
import FloatingNav from '@/components/site/floating-nav';
import QuickInfoTab from '@/components/site/quick-info-tab';
import SocialIcons from '@/components/site/social-icons';
import ContactFooter from '@/components/sections/contact-footer';

const PROJECTS_PER_PAGE = 6;

export default function ProjectsPage() {
  const { works, categories: masterCategories } = usePortfolio();
  const { lang, t } = useLanguage();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(PROJECTS_PER_PAGE);

  // Derive concise categories dynamically: prioritize master categories from CMS (only show those with projects)
  const displayCategories = useMemo(() => {
    if (masterCategories && masterCategories.length > 0) {
      return masterCategories
        .map((m) => {
          const name = lang === 'id' ? m.name_id : m.name_en;
          const count = works.filter((w) => {
            const matchId = (w.category_id || '').toLowerCase() === m.name_id.toLowerCase();
            const matchEn = (w.category_en || '').toLowerCase() === m.name_en.toLowerCase();
            const matchRaw =
              (w.category || '').toLowerCase() === m.name_id.toLowerCase() ||
              (w.category || '').toLowerCase() === m.name_en.toLowerCase();
            return matchId || matchEn || matchRaw;
          }).length;

          return { id: m.id, name, count, rawId: m.name_id, rawEn: m.name_en };
        })
        .filter((m) => m.count > 0); // Hide empty categories that clutter the UI
    }

    // Fallback if master categories empty
    const set = new Set<string>();
    works.forEach((w) => {
      const cat = lang === 'id' ? w.category_id || w.category : w.category_en || w.category;
      if (cat && cat.trim()) set.add(cat.trim());
    });
    return Array.from(set)
      .map((name, idx) => ({
        id: `cat-${idx}`,
        name,
        count: works.filter((w) => {
          const c = lang === 'id' ? w.category_id || w.category : w.category_en || w.category;
          return c && c.toLowerCase() === name.toLowerCase();
        }).length,
        rawId: name,
        rawEn: name,
      }))
      .filter((m) => m.count > 0);
  }, [masterCategories, works, lang]);

  // Filter projects by category and search keyword
  const filteredProjects = useMemo(() => {
    return works.filter((project) => {
      const localized = getLocalizedWork(project, lang);

      // Category matching
      let categoryMatch = selectedCategory === 'all';
      if (!categoryMatch) {
        const target = displayCategories.find((c) => c.id === selectedCategory || c.name.toLowerCase() === selectedCategory.toLowerCase());
        if (target) {
          const matchId = (project.category_id || '').toLowerCase() === target.rawId.toLowerCase();
          const matchEn = (project.category_en || '').toLowerCase() === target.rawEn.toLowerCase();
          const matchRaw =
            (project.category || '').toLowerCase() === target.rawId.toLowerCase() ||
            (project.category || '').toLowerCase() === target.rawEn.toLowerCase();
          categoryMatch = matchId || matchEn || matchRaw;
        } else {
          const curCat = lang === 'id' ? project.category_id || project.category : project.category_en || project.category;
          categoryMatch = Boolean(curCat && curCat.toLowerCase() === selectedCategory.toLowerCase());
        }
      }

      // Keyword search matching
      const query = searchQuery.toLowerCase().trim();
      if (!query) return categoryMatch;

      const titleMatch = localized.title.toLowerCase().includes(query);
      const descMatch = (localized.description || '').toLowerCase().includes(query);
      const catMatch = (localized.category || '').toLowerCase().includes(query);
      const techMatch = (project.technologies || []).some((tech) => tech.toLowerCase().includes(query));

      return categoryMatch && (titleMatch || descMatch || catMatch || techMatch);
    });
  }, [works, selectedCategory, searchQuery, displayCategories, lang]);

  // Slice for pagination / load more
  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  // Handle category change: reset visible count
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setVisibleCount(PROJECTS_PER_PAGE);
  };

  // Handle search change: reset visible count
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setVisibleCount(PROJECTS_PER_PAGE);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setVisibleCount(PROJECTS_PER_PAGE);
  };

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
            {/* Header Title & Count */}
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 border-b border-black/10 pb-8 mb-8 sm:mb-10">
              <div>
                <h1 className="font-display font-medium text-4xl sm:text-6xl md:text-7xl tracking-[-0.04em] text-[#111111]">
                  {t('allProjects.title')}
                </h1>
                <p className="mt-3 text-sm sm:text-base text-[#111111]/70 font-light max-w-xl">
                  {t('allProjects.subtitle')}
                </p>
              </div>
              <span className="font-mono text-sm sm:text-base text-[#111111]/50 self-start md:self-auto">
                [{filteredProjects.length < 10 ? `0${filteredProjects.length}` : filteredProjects.length} / {works.length}]
              </span>
            </div>

            {/* Filter & Search Bar Toolbar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 sm:mb-14">
              {/* Category Filter Pills (Clean, wrapping naturally without truncation) */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => handleCategoryChange('all')}
                  className={`relative px-4 py-2 rounded-full text-xs tracking-wider transition-colors select-none ${
                    selectedCategory === 'all'
                      ? 'text-[#111111] font-bold'
                      : 'text-[#111111]/60 hover:text-[#111111] bg-black/[0.04] hover:bg-black/[0.08] font-medium'
                  }`}
                >
                  {selectedCategory === 'all' && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 rounded-full bg-[#d4e157] shadow-xs"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">
                    {t('allProjects.all')}
                  </span>
                </button>

                {displayCategories.map((cat) => {
                  const isSelected = selectedCategory === cat.id || selectedCategory.toLowerCase() === cat.name.toLowerCase();

                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`relative px-4 py-2 rounded-full text-xs tracking-wider transition-colors select-none ${
                        isSelected
                          ? 'text-[#111111] font-bold'
                          : 'text-[#111111]/60 hover:text-[#111111] bg-black/[0.04] hover:bg-black/[0.08] font-medium'
                      }`}
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="activeCategoryPill"
                          className="absolute inset-0 rounded-full bg-[#d4e157] shadow-xs"
                          transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                        />
                      )}
                      <span className="relative z-10">
                        {cat.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Instant Search Bar */}
              <div className="relative w-full md:w-64 lg:w-72 shrink-0">
                <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-[#111111]/40">
                  <Search size={15} />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder={t('allProjects.searchPlaceholder')}
                  className="w-full pl-10 pr-9 py-2 rounded-full bg-white/90 border border-black/10 focus:border-[#1b4d3e] focus:ring-1 focus:ring-[#1b4d3e] text-xs sm:text-sm text-[#111111] placeholder:text-[#111111]/40 outline-none transition-all shadow-2xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setVisibleCount(PROJECTS_PER_PAGE);
                    }}
                    className="absolute inset-y-0 right-3 flex items-center text-[#111111]/40 hover:text-[#111111] transition-colors"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Projects Grid with AnimatePresence */}
            {visibleProjects.length > 0 ? (
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14">
                <AnimatePresence mode="popLayout">
                  {visibleProjects.map((project, idx) => {
                    const localized = getLocalizedWork(project, lang);
                    return (
                      <motion.div
                        key={project.id}
                        layout
                        initial={{ opacity: 0, y: 40, scale: 0.97 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.94 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.55, delay: (idx % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className={`${project.isTall ? 'md:mt-10' : ''}`}
                      >
                        <Link href={`/projects/${project.id}`} className="group block space-y-4">
                          {/* Card Media Container */}
                          <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden bg-[#e5e5e0] border border-black/5 shadow-md">
                            <img
                              src={project.image}
                              alt={localized.title}
                              loading="lazy"
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
                            <div className="space-y-1">
                              <h2 className="text-xl sm:text-2xl font-display font-medium text-[#111111] group-hover:text-[#1b4d3e] transition-colors">
                                {localized.title}
                              </h2>
                              <p className="text-xs sm:text-sm text-[#111111]/60 font-light">
                                {localized.category}
                              </p>
                            </div>
                            <span className="font-mono text-xs text-[#111111]/50 pt-1 shrink-0">
                              {project.year}
                            </span>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            ) : (
              /* Empty State when 0 search/filter results */
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-20 px-6 rounded-3xl bg-white/40 border border-black/5 flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-black/5 flex items-center justify-center text-[#111111]/50">
                  <FolderGit2 size={26} />
                </div>
                <div className="space-y-1 max-w-sm">
                  <h3 className="font-display font-medium text-lg text-[#111111]">
                    {t('allProjects.empty')}
                  </h3>
                  <p className="text-xs text-[#111111]/60">
                    {lang === 'id'
                      ? 'Coba ganti kata kunci pencarian atau pilih kategori lain.'
                      : 'Try adjusting your search terms or select another category.'}
                  </p>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1b4d3e] text-white hover:bg-[#153b2f] text-xs font-semibold tracking-wider transition-colors shadow-sm cursor-pointer"
                >
                  <RotateCcw size={13} />
                  <span>{t('allProjects.resetFilter')}</span>
                </button>
              </motion.div>
            )}

            {/* Load More Pagination Button */}
            {hasMore && (
              <div className="mt-16 sm:mt-20 flex flex-col items-center justify-center space-y-3">
                <button
                  onClick={() => setVisibleCount((prev) => prev + PROJECTS_PER_PAGE)}
                  className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#1b4d3e] hover:bg-[#153b2f] text-white font-semibold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>
                    {t('allProjects.loadMore')} (+{Math.min(PROJECTS_PER_PAGE, filteredProjects.length - visibleCount)})
                  </span>
                  <ChevronDown size={15} className="group-hover:translate-y-0.5 transition-transform" />
                </button>

                <p className="text-xs font-mono text-[#111111]/50">
                  {t('allProjects.showing')} {visibleProjects.length} {t('allProjects.of')} {filteredProjects.length}{' '}
                  {t('allProjects.projectsCount')}
                </p>
              </div>
            )}
          </section>
        </div>

        {/* Contact Footer (z-10 sitting underneath) */}
        <ContactFooter />
      </main>
    </SmoothScroll>
  );
}
