'use client';

import React, { useState, useEffect } from 'react';
import { usePortfolio, WorkItem } from '@/context/portfolio-context';

import AdminHeader from '@/components/admin/admin-header';
import AdminSidebar from '@/components/admin/admin-sidebar';
import AdminLockScreen from '@/components/admin/admin-lock-screen';
import AdminToast from '@/components/admin/admin-toast';

import TabDashboard from '@/components/admin/tab-dashboard';
import TabSettings from '@/components/admin/tab-settings';
import TabHero from '@/components/admin/tab-hero';
import TabAbout from '@/components/admin/tab-about';
import TabWorks from '@/components/admin/tab-works';
import TabQuickInfo from '@/components/admin/tab-quick-info';
import WorkModal from '@/components/admin/work-modal';
import { AdminThemeProvider } from '@/context/admin-theme-context';

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Works Modal State
  const [isWorkModalOpen, setIsWorkModalOpen] = useState(false);
  const [editingWorkId, setEditingWorkId] = useState<number | null>(null);
  const [workModalForm, setWorkModalForm] = useState<Omit<WorkItem, 'id'>>({
    title: '',
    category: '',
    year: '2026',
    image: '',
    isTall: false,
  });

  const {
    settings,
    hero,
    about,
    works,
    quickInfo,
    footer,
    updateSettings,
    updateHero,
    updateAbout,
    updateFooter,
    addWork,
    updateWork,
    deleteWork,
    updateQuickInfo,
  } = usePortfolio();

  useEffect(() => {
    setMounted(true);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenAddWork = () => {
    setEditingWorkId(null);
    setWorkModalForm({ title: '', category: '', year: '2026', image: '', isTall: false });
    setIsWorkModalOpen(true);
  };

  const handleEditWorkClick = (w: WorkItem) => {
    setEditingWorkId(w.id);
    setWorkModalForm({
      title: w.title,
      category: w.category,
      year: w.year,
      image: w.image,
      isTall: w.isTall,
      gallery: w.gallery,
      demoUrl: w.demoUrl,
      githubUrl: w.githubUrl,
      description: w.description,
      technologies: w.technologies,
    });
    setIsWorkModalOpen(true);
  };

  const handleSaveWorkModal = async (data: Omit<WorkItem, 'id'>) => {
    if (editingWorkId !== null) {
      await updateWork(editingWorkId, data);
      triggerToast(`Updated project "${data.title}"`);
    } else {
      await addWork(data);
      triggerToast(`Created new project "${data.title}"`);
    }
    setIsWorkModalOpen(false);
  };

  const handleDeleteWork = async (id: number, title: string) => {
    if (confirm(`Delete project "${title}"?`)) {
      await deleteWork(id);
      triggerToast(`Project "${title}" deleted.`);
    }
  };

  if (!mounted) return <div className="min-h-screen bg-slate-50" />;

  return (
    <AdminThemeProvider>
      {!isAuthenticated ? (
        <AdminLockScreen
          onUnlock={() => {
            setIsAuthenticated(true);
            triggerToast('Welcome back! Admin panel unlocked.');
          }}
        />
      ) : (
        <div className="min-h-screen bg-admin-bg text-admin-text flex flex-col font-sans selection:bg-admin-primary selection:text-white transition-colors duration-200">
          <AdminToast message={toastMessage} />

          <AdminHeader
            brandName={settings.brandName}
            activeTab={activeTab}
            onLock={() => {
              setIsAuthenticated(false);
              triggerToast('Session locked.');
            }}
          />

          <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start">
            <AdminSidebar
              activeTab={activeTab}
              onSelectTab={setActiveTab}
              projectCount={works.length}
              quickInfoCount={quickInfo.length}
            />

            <main className="flex-1 w-full min-w-0 bg-admin-card border border-admin-border rounded-2xl p-5 sm:p-7 shadow-sm transition-colors duration-200">
              {activeTab === 'dashboard' && (
                <TabDashboard
                  onNavigate={(tab) => setActiveTab(tab)}
                  onOpenAddWork={handleOpenAddWork}
                  onEditWork={handleEditWorkClick}
                />
              )}

              {activeTab === 'settings' && (
                <TabSettings
                  settings={settings}
                  footer={footer}
                  onSave={async (data) => {
                    await updateSettings(data);
                    triggerToast('Site settings & footer saved!');
                  }}
                  onSaveFooter={async (data) => {
                    await updateFooter(data);
                  }}
                />
              )}

              {activeTab === 'hero' && (
                <TabHero
                  hero={hero}
                  onSave={async (data) => {
                    await updateHero(data);
                    triggerToast('Hero content saved!');
                  }}
                />
              )}

              {activeTab === 'about' && (
                <TabAbout
                  about={about}
                  onSave={async (data) => {
                    await updateAbout(data);
                    triggerToast('About content saved!');
                  }}
                />
              )}

              {activeTab === 'works' && (
                <TabWorks
                  works={works}
                  onOpenAdd={handleOpenAddWork}
                  onEdit={handleEditWorkClick}
                  onDelete={handleDeleteWork}
                />
              )}

              {activeTab === 'quickInfo' && (
                <TabQuickInfo
                  quickInfo={quickInfo}
                  onSave={async (rows) => {
                    await updateQuickInfo(rows);
                    triggerToast('Quick Info rows updated!');
                  }}
                />
              )}
            </main>
          </div>

          <WorkModal
            isOpen={isWorkModalOpen}
            editingId={editingWorkId}
            initialData={workModalForm}
            onClose={() => setIsWorkModalOpen(false)}
            onSave={handleSaveWorkModal}
          />
        </div>
      )}
    </AdminThemeProvider>
  );
}

