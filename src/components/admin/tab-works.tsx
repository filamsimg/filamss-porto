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
} from 'lucide-react';
import { WorkItem } from '@/context/portfolio-context';

interface TabWorksProps {
  works: WorkItem[];
  onOpenAdd: () => void;
  onEdit: (w: WorkItem) => void;
  onDelete: (id: number, title: string) => Promise<void>;
}

export default function TabWorks({ works, onOpenAdd, onEdit, onDelete }: TabWorksProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const filteredWorks = works.filter((w) => {
    const q = searchQuery.toLowerCase();
    const matchTitle = w.title.toLowerCase().includes(q);
    const matchCategory = w.category.toLowerCase().includes(q);
    const matchTech = (w.technologies || []).some((t) => t.toLowerCase().includes(q));
    const matchYear = w.year.toLowerCase().includes(q);
    return matchTitle || matchCategory || matchTech || matchYear;
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
              Projects Management
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-admin-surface text-admin-muted border border-admin-border font-medium">
              {works.length} items
            </span>
          </div>
          <p className="text-xs text-admin-muted mt-1">
            Enterprise data table &amp; CRUD operations for portfolio showcase items.
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

          <button
            onClick={onOpenAdd}
            className="flex items-center gap-2 bg-admin-primary text-admin-primary-fg font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl hover:bg-admin-primary-hover transition-all shadow-sm shrink-0"
          >
            <Plus size={15} /> New Project
          </button>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex items-center gap-3 bg-admin-card border border-admin-border px-3.5 py-2.5 rounded-xl focus-within:border-admin-primary focus-within:ring-1 focus-within:ring-admin-primary shadow-2xs transition-all">
        <Search size={16} className="text-admin-subtle shrink-0" />
        <input
          type="text"
          placeholder="Search projects by title, category, year, or tech stack..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent text-xs text-admin-text placeholder:text-admin-subtle focus:outline-none"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-[11px] font-medium text-admin-muted hover:text-admin-text px-1.5 py-0.5 rounded bg-admin-surface"
          >
            Clear
          </button>
        )}
      </div>

      {/* Data Presentation: Table View or Grid View */}
      {filteredWorks.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-admin-surface border border-admin-border space-y-3">
          <p className="text-sm text-admin-muted font-medium">No projects found matching &ldquo;{searchQuery}&rdquo;</p>
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs text-admin-primary underline font-medium"
          >
            Reset filter
          </button>
        </div>
      ) : viewMode === 'table' ? (
        /* Classic AdminLTE Data Table */
        <div className="rounded-xl border border-admin-border overflow-hidden bg-admin-card shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-admin-border bg-admin-surface text-[11px] uppercase tracking-wider text-admin-muted font-semibold">
                  <th className="py-3.5 px-4 w-16">Preview</th>
                  <th className="py-3.5 px-4">Project &amp; Category</th>
                  <th className="py-3.5 px-4 w-24">Year</th>
                  <th className="py-3.5 px-4 hidden md:table-cell">Technologies</th>
                  <th className="py-3.5 px-4 text-right w-36">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-border text-xs">
                {filteredWorks.map((w) => (
                  <tr
                    key={w.id}
                    className="hover:bg-admin-surface/70 transition-colors group"
                  >
                    {/* Thumbnail */}
                    <td className="py-3 px-4">
                      <div className="w-12 h-10 rounded-lg bg-admin-surface border border-admin-border overflow-hidden shrink-0">
                        <img
                          src={w.image}
                          alt={w.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </td>

                    {/* Title & Category */}
                    <td className="py-3 px-4">
                      <div className="space-y-0.5">
                        <span className="font-medium text-sm text-admin-text group-hover:text-admin-primary transition-colors block">
                          {w.title}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-admin-muted">
                            {w.category}
                          </span>
                          {w.isTall && (
                            <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-admin-surface text-admin-muted border border-admin-border">
                              Tall
                            </span>
                          )}
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
                        {(w.technologies || []).slice(0, 3).map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded text-[10px] font-medium bg-admin-surface text-admin-muted border border-admin-border"
                          >
                            {t}
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
                          title="Edit Project"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => onDelete(w.id, w.title)}
                          className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-500/10 transition-colors"
                          title="Delete Project"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Modern Grid Card View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWorks.map((w) => (
            <div
              key={w.id}
              className="group bg-admin-card border border-admin-border hover:border-admin-primary/40 shadow-2xs hover:shadow-sm rounded-xl overflow-hidden flex flex-col justify-between transition-all"
            >
              <div>
                <div className="relative aspect-[16/10] bg-admin-surface overflow-hidden">
                  <img
                    src={w.image}
                    alt={w.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 right-2.5">
                    <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-admin-card/90 text-admin-text border border-admin-border shadow-xs">
                      {w.year}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="text-[11px] text-admin-muted">{w.category}</div>
                  <h3 className="text-admin-text font-medium text-sm group-hover:text-admin-primary transition-colors truncate">
                    {w.title}
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
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(w.id, w.title)}
                    className="p-1 text-red-500 hover:text-red-700"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
