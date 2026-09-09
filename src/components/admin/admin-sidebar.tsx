'use client';

import React from 'react';
import { LucideIcon, LayoutDashboard, LayoutTemplate, User, FolderGit2, Layers, Sliders, Database, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export interface NavSection {
  title: string;
  items: {
    id: string;
    label: string;
    icon: LucideIcon;
    badge?: number | string;
  }[];
}

interface AdminSidebarProps {
  activeTab: string;
  onSelectTab: (id: string) => void;
  projectCount: number;
  quickInfoCount: number;
}

export default function AdminSidebar({
  activeTab,
  onSelectTab,
  projectCount,
  quickInfoCount,
}: AdminSidebarProps) {
  const { lang } = useLanguage();
  const isId = lang === 'id';

  const sections: NavSection[] = [
    {
      title: isId ? 'RINGKASAN' : 'OVERVIEW',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      ],
    },
    {
      title: isId ? 'MANAJEMEN KONTEN' : 'CONTENT MANAGEMENT',
      items: [
        { id: 'hero', label: isId ? 'Banner Utama (Hero)' : 'Hero Banner', icon: LayoutTemplate },
        { id: 'about', label: isId ? 'Tentang & Layanan' : 'About & Services', icon: User },
        { id: 'works', label: isId ? 'Koleksi Proyek' : 'Projects / Works', icon: FolderGit2, badge: projectCount },
        { id: 'quickInfo', label: isId ? 'Tab Info Cepat' : 'Quick Info Tabs', icon: Layers, badge: quickInfoCount },
      ],
    },
    {
      title: isId ? 'PENGATURAN SISTEM' : 'SETTINGS & SYSTEM',
      items: [
        { id: 'settings', label: isId ? 'Situs, Footer & SEO' : 'Site, Footer & SEO', icon: Sliders },
      ],
    },
  ];

  return (
    <aside className="w-full md:w-64 shrink-0 space-y-6">
      {/* Navigation Groups */}
      <div className="space-y-6">
        {sections.map((sec, secIdx) => (
          <div key={secIdx} className="space-y-1.5">
            <div className="text-[10px] uppercase tracking-wider text-admin-subtle px-3 font-semibold">
              {sec.title}
            </div>

            <nav className="flex md:flex-col overflow-x-auto md:overflow-visible gap-1 pb-1 md:pb-0 no-scrollbar">
              {sec.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectTab(item.id)}
                    className={`shrink-0 md:shrink flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-xs font-medium tracking-wide transition-all ${
                      isActive
                        ? 'bg-admin-primary text-admin-primary-fg font-semibold shadow-sm'
                        : 'text-admin-muted hover:text-admin-text hover:bg-admin-surface border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 whitespace-nowrap">
                      <Icon
                        size={16}
                        className={isActive ? 'text-admin-accent' : 'text-admin-subtle'}
                      />
                      <span>{item.label}</span>
                    </div>

                    {item.badge !== undefined && (
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-medium shrink-0 ${
                          isActive
                            ? 'bg-white/20 text-white font-semibold'
                            : 'bg-admin-surface text-admin-muted border border-admin-border'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* System Status Panel (AdminLTE widget style) */}
      <div className="hidden md:block p-3.5 rounded-xl bg-admin-card border border-admin-border shadow-2xs space-y-2 text-[11px] text-admin-muted transition-colors duration-200">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-admin-muted">
            <Database size={12} className="text-admin-primary" />
            <span>Database</span>
          </span>
          <span className="text-admin-badge-text font-semibold bg-admin-badge-bg px-1.5 py-0.5 rounded border border-admin-badge-border text-[10px]">
            {isId ? 'Siap' : 'Ready'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-admin-muted">
            <ShieldCheck size={12} className="text-admin-primary" />
            <span>Session</span>
          </span>
          <span className="text-admin-text font-medium">{isId ? 'Terlindungi' : 'Protected'}</span>
        </div>
        <div className="pt-1.5 border-t border-admin-border text-[10px] text-admin-subtle truncate">
          Engine: Next.js 14 App Router
        </div>
      </div>
    </aside>
  );
}
