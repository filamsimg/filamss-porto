'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  FolderGit2,
  FileText,
  Layers,
  Sparkles,
  ExternalLink,
  Plus,
  ArrowRight,
  Database,
  Cpu,
  CheckCircle2,
} from 'lucide-react';
import { usePortfolio, WorkItem } from '@/context/portfolio-context';

interface TabDashboardProps {
  onNavigate: (tabId: string) => void;
  onOpenAddWork: () => void;
  onEditWork: (work: WorkItem) => void;
}

export default function TabDashboard({ onNavigate, onOpenAddWork, onEditWork }: TabDashboardProps) {
  const { settings, hero, about, works, quickInfo } = usePortfolio();

  const servicesCount = about.services?.length || 0;
  const hasResume = Boolean(settings.resumeUrl);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Top Banner / Welcome */}
      <div className="p-6 rounded-2xl bg-admin-card border border-admin-border flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] uppercase tracking-wider text-admin-muted font-semibold">
              CMS Control Center
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-medium text-admin-text tracking-tight mt-1">
            Welcome back, {settings.brandName || 'Developer'}
          </h2>
          <p className="text-xs text-admin-muted mt-1">
            Manage your editorial portfolio, project showcases, and personal brand metadata.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenAddWork}
            className="flex items-center gap-2 bg-admin-primary text-admin-primary-fg font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl hover:bg-admin-primary-hover transition-all shadow-sm"
          >
            <Plus size={15} /> Add Project
          </button>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-admin-surface hover:bg-admin-surface-hover text-admin-text text-xs font-medium px-4 py-2.5 rounded-xl border border-admin-border shadow-2xs transition-colors"
          >
            <span>Live Site</span>
            <ExternalLink size={13} className="text-admin-muted" />
          </a>
        </div>
      </div>

      {/* KPI / Metric Stat Cards (AdminLTE Style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Total Projects */}
        <div
          onClick={() => onNavigate('works')}
          className="cursor-pointer p-4 rounded-xl bg-admin-card border border-admin-border hover:border-admin-primary/50 hover:shadow-sm transition-all group"
        >
          <div className="flex items-center justify-between text-admin-muted">
            <span className="text-xs uppercase tracking-wider font-semibold">Projects</span>
            <div className="p-2 rounded-lg bg-admin-badge-bg text-admin-badge-text border border-admin-badge-border group-hover:scale-110 transition-transform">
              <FolderGit2 size={16} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-admin-text">{works.length}</span>
            <span className="text-xs text-admin-subtle">portfolio items</span>
          </div>
          <div className="mt-2 text-[11px] text-admin-primary font-semibold flex items-center gap-1">
            <span>Manage CRUD</span>
            <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Stat 2: Core Capabilities */}
        <div
          onClick={() => onNavigate('about')}
          className="cursor-pointer p-4 rounded-xl bg-admin-card border border-admin-border hover:border-admin-primary/50 hover:shadow-sm transition-all group"
        >
          <div className="flex items-center justify-between text-admin-muted">
            <span className="text-xs uppercase tracking-wider font-semibold">Services</span>
            <div className="p-2 rounded-lg bg-admin-badge-bg text-admin-badge-text border border-admin-badge-border group-hover:scale-110 transition-transform">
              <Sparkles size={16} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-admin-text">{servicesCount}</span>
            <span className="text-xs text-admin-subtle">specializations</span>
          </div>
          <div className="mt-2 text-[11px] text-admin-primary font-semibold flex items-center gap-1">
            <span>Edit Services</span>
            <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Stat 3: Quick Info Records */}
        <div
          onClick={() => onNavigate('quickInfo')}
          className="cursor-pointer p-4 rounded-xl bg-admin-card border border-admin-border hover:border-admin-primary/50 hover:shadow-sm transition-all group"
        >
          <div className="flex items-center justify-between text-admin-muted">
            <span className="text-xs uppercase tracking-wider font-semibold">Quick Info</span>
            <div className="p-2 rounded-lg bg-admin-badge-bg text-admin-badge-text border border-admin-badge-border group-hover:scale-110 transition-transform">
              <Layers size={16} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-admin-text">{quickInfo.length}</span>
            <span className="text-xs text-admin-subtle">metadata rows</span>
          </div>
          <div className="mt-2 text-[11px] text-admin-primary font-semibold flex items-center gap-1">
            <span>Configure Drawer</span>
            <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Stat 4: Resume Status */}
        <div
          onClick={() => onNavigate('settings')}
          className="cursor-pointer p-4 rounded-xl bg-admin-card border border-admin-border hover:border-admin-primary/50 hover:shadow-sm transition-all group"
        >
          <div className="flex items-center justify-between text-admin-muted">
            <span className="text-xs uppercase tracking-wider font-semibold">Resume / CV</span>
            <div className="p-2 rounded-lg bg-admin-badge-bg text-admin-badge-text border border-admin-badge-border group-hover:scale-110 transition-transform">
              <FileText size={16} />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            {hasResume ? (
              <>
                <CheckCircle2 size={18} className="text-emerald-500" />
                <span className="text-sm font-medium text-admin-text">PDF Ready</span>
              </>
            ) : (
              <span className="text-sm font-medium text-amber-500">Not Uploaded</span>
            )}
          </div>
          <div className="mt-2 text-[11px] text-admin-primary font-semibold flex items-center gap-1">
            <span>Upload Document</span>
            <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Projects List & System Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Recent Works Quick Table (8 Cols) */}
        <div className="lg:col-span-8 p-5 rounded-2xl bg-admin-card border border-admin-border shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-admin-border">
            <div className="flex items-center gap-2">
              <FolderGit2 size={16} className="text-admin-primary" />
              <h3 className="text-xs uppercase tracking-wider text-admin-text font-semibold">
                Recent Projects
              </h3>
            </div>
            <button
              onClick={() => onNavigate('works')}
              className="text-xs text-admin-primary hover:underline font-semibold flex items-center gap-1"
            >
              <span>View All ({works.length})</span>
              <ArrowRight size={12} />
            </button>
          </div>

          <div className="divide-y divide-admin-border">
            {works.slice(0, 5).map((project) => (
              <div
                key={project.id}
                className="py-3 flex items-center justify-between gap-4 group hover:bg-admin-surface px-2 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-admin-surface border border-admin-border overflow-hidden shrink-0">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-medium text-admin-text truncate group-hover:text-admin-primary transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-[11px] text-admin-muted truncate">
                      {project.category} · {project.year}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onEditWork(project)}
                    className="px-2.5 py-1 text-xs font-medium rounded-md bg-admin-surface hover:bg-admin-surface-hover text-admin-text border border-admin-border transition-colors"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Architecture & Diagnostics (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-2xl bg-admin-card border border-admin-border shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-admin-border">
              <Database size={16} className="text-admin-primary" />
              <h3 className="text-xs uppercase tracking-wider text-admin-text font-semibold">
                Storage &amp; Server
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-admin-muted">Database Model:</span>
                <span className="text-admin-text bg-admin-surface px-2 py-0.5 rounded border border-admin-border font-medium">
                  Flat-File JSON
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-admin-muted">Data Path:</span>
                <span className="text-admin-primary font-semibold truncate max-w-[140px]" title="src/data/portfolio-db.json">
                  portfolio-db.json
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-admin-muted">Runtime Engine:</span>
                <span className="text-admin-text font-medium">Next.js 14 (Node.js)</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-admin-muted">Host Deployment:</span>
                <span className="text-emerald-500 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Self-Contained
                </span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-admin-card border border-admin-border shadow-2xs space-y-3">
            <div className="flex items-center gap-2">
              <Cpu size={16} className="text-admin-primary" />
              <h3 className="text-xs uppercase tracking-wider text-admin-text font-semibold">
                Quick Shortcuts
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => onNavigate('hero')}
                className="p-2.5 rounded-xl bg-admin-surface hover:bg-admin-surface-hover border border-admin-border text-admin-text text-left transition-colors font-medium"
              >
                ✎ Hero Title
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="p-2.5 rounded-xl bg-admin-surface hover:bg-admin-surface-hover border border-admin-border text-admin-text text-left transition-colors font-medium"
              >
                ✎ Capabilities
              </button>
              <button
                onClick={() => onNavigate('quickInfo')}
                className="p-2.5 rounded-xl bg-admin-surface hover:bg-admin-surface-hover border border-admin-border text-admin-text text-left transition-colors font-medium"
              >
                ✎ Quick Info
              </button>
              <button
                onClick={() => onNavigate('settings')}
                className="p-2.5 rounded-xl bg-admin-surface hover:bg-admin-surface-hover border border-admin-border text-admin-text text-left transition-colors font-medium"
              >
                ✎ Footer &amp; SEO
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
