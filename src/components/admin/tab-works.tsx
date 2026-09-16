'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  LayoutGrid,
  Table as TableIcon,
  ExternalLink,
  Github,
  FolderGit2,
  Tags,
} from 'lucide-react';
import { WorkItem, getLocalizedWork, usePortfolio } from '@/context/portfolio-context';
import { useLanguage } from '@/context/language-context';
import CategoryModal from '@/components/admin/category-modal';

interface TabWorksProps {
  works: WorkItem[];
  onOpenAdd: () => void;
  onEdit: (w: WorkItem) => void;
  onDelete: (id: number, title: string) => Promise<void>;
}

export default function TabWorks({ works, onOpenAdd, onEdit, onDelete }: TabWorksProps) {
  const { categories } = usePortfolio();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const { lang, t } = useLanguage();
  const isId = lang === 'id';

  const filteredWorks = works.filter((w) => {
    const locW = getLocalizedWork(w, lang);
    const q = searchQuery.toLowerCase();
    const matchTitle = (locW.title || '').toLowerCase().includes(q) || (w.title || '').toLowerCase().includes(q);
    const matchCategory = (locW.category || '').toLowerCase().includes(q) || (w.category || '').toLowerCase().includes(q);
    const matchTech = (w.technologies || []).some((tech) => tech.toLowerCase().includes(q));
    const matchYear = (w.year || '').toLowerCase().includes(q);
    const queryMatch = matchTitle || matchCategory || matchTech || matchYear;

    const catMatch =
      selectedCategory === 'all' ||
      (w.category_id && w.category_id.toLowerCase() === selectedCategory.toLowerCase()) ||
      (w.category_en && w.category_en.toLowerCase() === selectedCategory.toLowerCase()) ||
      (w.category && w.category.toLowerCase() === selectedCategory.toLowerCase());

    return queryMatch && catMatch;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-admin-border">
        <div>
          <div className="flex items-center gap-2">
            <FolderGit2 size={18} className="text-admin-primary" />
            <h2 className="text-xl sm:text-2xl font-display font-medium text-admin-text tracking-tight">
              {t('admin.works.title')}
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-admin-surface text-admin-muted border border-admin-border font-medium">
              {works.length} {t('admin.works.items')}
            </span>
          </div>
          <p className="text-xs text-admin-muted mt-1">
            {t('admin.works.subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-admin-surface p-1 rounded-xl border border-admin-border">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                viewMode === 'table' ? 'bg-admin-primary text-admin-primary-fg shadow-2xs' : 'text-admin-muted hover:text-admin-text'
              }`}
              title="Table View (AdminLTE)"
            >
              <TableIcon size={16} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                viewMode === 'grid' ? 'bg-admin-primary text-admin-primary-fg shadow-2xs' : 'text-admin-muted hover:text-admin-text'
              }`}
              title="Grid View"
            >
              <LayoutGrid size={16} />
            </button>
          </div>

          {/* Kelola Kategori Button */}
          <button
            onClick={() => setIsCategoryModalOpen(true)}
            className="flex items-center gap-2 bg-admin-surface border border-admin-border text-admin-text font-semibold text-xs tracking-wide px-3.5 py-2.5 rounded-xl hover:bg-admin-card hover:border-admin-primary transition-all shadow-2xs shrink-0"
            title={isId ? 'Kelola daftar kategori proyek' : 'Manage project categories'}
          >
            <Tags size={15} className="text-admin-primary" />
            <span>{isId ? 'Kelola Kategori' : 'Categories'}</span>
          </button>

          <button
            onClick={onOpenAdd}
            className="flex items-center gap-2 bg-admin-primary text-admin-primary-fg font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl hover:bg-admin-primary-hover transition-all shadow-sm shrink-0"
          >
            <Plus size={15} /> {t('admin.works.newProject')}
          </button>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-admin-card border border-admin-border px-3.5 py-2.5 rounded-xl focus-within:border-admin-primary focus-within:ring-1 focus-within:ring-admin-primary shadow-2xs transition-all">
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <Search size={16} className="text-admin-subtle shrink-0" />
          <input
            type="text"
            placeholder={t('admin.works.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-xs text-admin-text placeholder:text-admin-subtle focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[11px] font-medium text-admin-muted hover:text-admin-text px-1.5 py-0.5 rounded bg-admin-surface"
            >
              {isId ? 'Bersihkan' : 'Clear'}
            </button>
          )}
        </div>

        {/* Category Filter Dropdown in Admin */}
        <div className="flex items-center gap-2 border-t sm:border-t-0 sm:border-l border-admin-border pt-2 sm:pt-0 sm:pl-3 shrink-0">
          <Tags size={13} className="text-admin-muted shrink-0" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-transparent text-xs text-admin-text focus:outline-none cursor-pointer pr-2"
          >
            <option value="all" className="bg-admin-card text-admin-text">
              {isId ? 'Semua Kategori' : 'All Categories'}
            </option>
            {categories.map((c) => (
              <option key={c.id} value={isId ? c.name_id : c.name_en} className="bg-admin-card text-admin-text">
                {isId ? c.name_id : c.name_en}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Data Presentation: Table View or Grid View */}
      {filteredWorks.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-admin-surface border border-admin-border space-y-3">
          <p className="text-sm text-admin-muted font-medium">
            {searchQuery
              ? (isId ? `Tidak ada proyek yang sesuai dengan "${searchQuery}"` : `No projects found matching "${searchQuery}"`)
              : t('admin.works.noProjects')}
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-admin-primary underline font-medium"
            >
              {isId ? 'Atur ulang filter' : 'Reset filter'}
            </button>
          )}
        </div>
      ) : viewMode === 'table' ? (
        /* Classic AdminLTE Data Table */
        <div className="rounded-xl border border-admin-border overflow-hidden bg-admin-card shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-admin-border bg-admin-surface text-[11px] uppercase tracking-wider text-admin-muted font-semibold">
                  <th className="py-3.5 px-4 w-16">{t('admin.works.thThumbnail')}</th>
                  <th className="py-3.5 px-4">{t('admin.works.thTitle')}</th>
                  <th className="py-3.5 px-4 w-24">{t('admin.works.thYear')}</th>
                  <th className="py-3.5 px-4 hidden md:table-cell">{t('admin.works.thTech')}</th>
                  <th className="py-3.5 px-4 text-right w-36">{t('admin.works.thActions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-border text-xs">
                {filteredWorks.map((w) => {
                  const locW = getLocalizedWork(w, lang);
                  return (
                    <tr
                      key={w.id}
                      className="hover:bg-admin-surface/70 transition-colors group"
                    >
                      {/* Thumbnail */}
                      <td className="py-3 px-4">
                        <div className="w-12 h-10 rounded-lg bg-admin-surface border border-admin-border overflow-hidden shrink-0">
                          <img
                            src={w.image}
                            alt={locW.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      </td>

                      {/* Title & Category */}
                      <td className="py-3 px-4">
                        <div className="space-y-0.5">
                          <span className="font-medium text-sm text-admin-text group-hover:text-admin-primary transition-colors block">
                            {locW.title}
                          </span>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[11px] text-admin-muted">
                              {locW.category}
                            </span>
                            {w.isTall && (
                              <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-admin-surface text-admin-muted border border-admin-border">
                                {isId ? 'Tinggi' : 'Tall'}
                              </span>
                            )}
                            <div className="inline-flex items-center gap-1">
                              <span
                                title={w.title_id ? 'Bahasa Indonesia tersedia' : 'Belum ada terjemahan Indonesia'}
                                className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                                  w.title_id
                                    ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                                    : 'bg-admin-surface text-admin-muted border border-admin-border'
                                }`}
                              >
                                ID
                              </span>
                              <span
                                title={w.title_en ? 'English version available' : 'No English translation yet'}
                                className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                                  w.title_en
                                    ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                                    : 'bg-admin-surface text-admin-muted border border-admin-border'
                                }`}
                              >
                                EN
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Year */}
                      <td className="py-3 px-4 font-medium text-admin-text">
                        {w.year}
                      </td>

                      {/* Tech Stacks */}
                      <td className="py-3 px-4 hidden md:table-cell">
                        <div className="flex flex-wrap gap-1 max-w-sm">
                          {(w.technologies || []).slice(0, 3).map((tItem, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded text-[10px] font-medium bg-admin-surface text-admin-muted border border-admin-border"
                            >
                              {tItem}
                            </span>
                          ))}
                          {(w.technologies || []).length > 3 && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-medium text-admin-subtle bg-admin-surface">
                              +{(w.technologies || []).length - 3}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Action Buttons */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {w.demoUrl && (
                            <a
                              href={w.demoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 rounded-lg text-admin-muted hover:text-admin-text hover:bg-admin-surface transition-colors"
                              title="Open Demo URL"
                            >
                              <ExternalLink size={14} />
                            </a>
                          )}
                          {w.githubUrl && (
                            <a
                              href={w.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 rounded-lg text-admin-muted hover:text-admin-text hover:bg-admin-surface transition-colors"
                              title="Open GitHub"
                            >
                              <Github size={14} />
                            </a>
                          )}
                          <button
                            onClick={() => onEdit(w)}
                            className="p-1.5 rounded-lg text-admin-muted hover:text-admin-primary hover:bg-admin-surface transition-colors"
                            title={isId ? 'Edit Proyek' : 'Edit Project'}
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => onDelete(w.id, locW.title)}
                            className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-500/10 transition-colors"
                            title={isId ? 'Hapus Proyek' : 'Delete Project'}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Modern Grid Card View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWorks.map((w) => {
            const locW = getLocalizedWork(w, lang);
            return (
              <div
                key={w.id}
                className="group bg-admin-card border border-admin-border hover:border-admin-primary/40 shadow-2xs hover:shadow-sm rounded-xl overflow-hidden flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="relative aspect-[16/10] bg-admin-surface overflow-hidden">
                    <img
                      src={w.image}
                      alt={locW.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 right-2.5">
                      <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-admin-card/90 text-admin-text border border-admin-border shadow-xs">
                        {w.year}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="text-[11px] text-admin-muted">{locW.category}</div>
                    <h3 className="text-admin-text font-medium text-sm group-hover:text-admin-primary transition-colors truncate">
                      {locW.title}
                    </h3>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {(w.technologies || []).slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-medium px-2 py-0.5 rounded bg-admin-surface text-admin-muted border border-admin-border"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-3 border-t border-admin-border bg-admin-surface/40 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {w.demoUrl && (
                      <a
                        href={w.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 text-admin-muted hover:text-admin-text"
                        title="Demo"
                      >
                        <ExternalLink size={13} />
                      </a>
                    )}
                    {w.githubUrl && (
                      <a
                        href={w.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 text-admin-muted hover:text-admin-text"
                        title="GitHub"
                      >
                        <Github size={13} />
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onEdit(w)}
                      className="px-2.5 py-1 text-xs font-medium rounded bg-admin-card hover:bg-admin-surface text-admin-text border border-admin-border transition-colors"
                    >
                      {t('admin.dashboard.edit')}
                    </button>
                    <button
                      onClick={() => onDelete(w.id, locW.title)}
                      className="p-1 text-red-500 hover:text-red-700"
                      title={isId ? 'Hapus' : 'Delete'}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Category Manager Modal */}
      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
      />
    </motion.div>
  );
}
