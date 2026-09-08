'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink, Lock, HardDrive, ChevronRight, Sun, Moon } from 'lucide-react';
import { useAdminTheme } from '@/context/admin-theme-context';

interface AdminHeaderProps {
  brandName: string;
  activeTab: string;
  onLock: () => void;
}

const TAB_TITLES: Record<string, { group: string; title: string }> = {
  dashboard: { group: 'Overview', title: 'Dashboard Metrics' },
  hero: { group: 'Content Management', title: 'Hero Banner' },
  about: { group: 'Content Management', title: 'About & Services' },
  works: { group: 'Content Management', title: 'Projects Data Table' },
  quickInfo: { group: 'Content Management', title: 'Quick Info Drawer' },
  settings: { group: 'Settings & System', title: 'Site, Footer & SEO' },
};

export default function AdminHeader({ brandName, activeTab, onLock }: AdminHeaderProps) {
  const currentNav = TAB_TITLES[activeTab] || { group: 'Admin', title: activeTab };
  const { theme, toggleTheme } = useAdminTheme();

  return (
    <header className="sticky top-0 z-40 bg-admin-card/95 backdrop-blur-md border-b border-admin-border px-4 sm:px-8 py-3 flex items-center justify-between gap-4 shadow-sm transition-colors duration-200">
      {/* Brand & Breadcrumbs */}
      <div className="flex items-center gap-4 min-w-0">
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-admin-primary flex items-center justify-center text-admin-accent font-bold text-xs shadow-sm">
            {brandName.charAt(0) || 'P'}
          </div>
          <div className="hidden sm:block leading-none">
            <span className="text-xs font-bold text-admin-text tracking-wide block truncate max-w-[140px]">
              {brandName}
            </span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold tracking-wide">PortoCMS v2.4</span>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block h-5 w-[1px] bg-admin-border shrink-0" />

        {/* Breadcrumb Navigation (AdminLTE / Filament Style) */}
        <nav className="hidden md:flex items-center gap-1.5 text-xs text-admin-muted min-w-0">
          <span className="font-medium">Admin</span>
          <ChevronRight size={12} className="text-admin-subtle shrink-0" />
          <span className="truncate">{currentNav.group}</span>
          <ChevronRight size={12} className="text-admin-subtle shrink-0" />
          <span className="text-admin-text font-semibold truncate">{currentNav.title}</span>
        </nav>
      </div>

      {/* Right Tools & Actions */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Server Status Pill */}
        <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-admin-badge-bg border border-admin-badge-border text-[11px] text-admin-badge-text font-medium">
          <HardDrive size={12} />
          <span>Persistent DB</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        {/* Theme Switcher Toggle (Light / Dark) */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-1.5 text-xs font-medium text-admin-muted hover:text-admin-text px-2.5 py-1.5 rounded-lg bg-admin-surface hover:bg-admin-surface-hover border border-admin-border transition-colors shadow-2xs"
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
          {theme === 'light' ? (
            <>
              <Moon size={13} className="text-slate-600" />
              <span className="hidden sm:inline">Dark</span>
            </>
          ) : (
            <>
              <Sun size={13} className="text-amber-400" />
              <span className="hidden sm:inline">Light</span>
            </>
          )}
        </button>

        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-1.5 text-xs font-medium text-admin-text hover:opacity-80 px-3 py-1.5 rounded-lg bg-admin-surface hover:bg-admin-surface-hover border border-admin-border transition-colors shadow-2xs"
        >
          <span>Live Site</span>
          <ExternalLink size={12} className="text-admin-subtle" />
        </Link>

        <button
          onClick={onLock}
          className="flex items-center gap-1.5 text-xs font-medium text-admin-muted hover:text-red-500 px-3 py-1.5 rounded-lg border border-admin-border hover:border-red-300 hover:bg-red-500/10 transition-colors"
          title="Lock Admin Session"
        >
          <Lock size={12} />
          <span className="hidden sm:inline">Lock</span>
        </button>
      </div>
    </header>
  );
}

