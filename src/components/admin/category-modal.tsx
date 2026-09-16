'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Tags,
  X,
  Plus,
  Edit2,
  Trash2,
  Check,
  Languages,
  Sparkles,
  AlertCircle,
  FolderGit2,
} from 'lucide-react';
import { usePortfolio, CategoryItem } from '@/context/portfolio-context';
import { useLanguage } from '@/context/language-context';
import { translateIdToEnWithTechProtection } from '@/lib/tech-whitelist';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CategoryModal({ isOpen, onClose }: CategoryModalProps) {
  const { categories, updateCategories, works } = usePortfolio();
  const { lang } = useLanguage();
  const isId = lang === 'id';

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formNameId, setFormNameId] = useState('');
  const [formNameEn, setFormNameEn] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Count projects using each category
  const getCategoryProjectCount = (cat: CategoryItem) => {
    return works.filter((w) => {
      const matchId = (w.category_id || '').toLowerCase() === cat.name_id.toLowerCase();
      const matchEn = (w.category_en || '').toLowerCase() === cat.name_en.toLowerCase();
      const matchRaw = (w.category || '').toLowerCase() === cat.name_id.toLowerCase() || (w.category || '').toLowerCase() === cat.name_en.toLowerCase();
      return matchId || matchEn || matchRaw;
    }).length;
  };

  const resetForm = () => {
    setEditingId(null);
    setFormNameId('');
    setFormNameEn('');
    setError(null);
  };

  const handleStartEdit = (cat: CategoryItem) => {
    setEditingId(cat.id);
    setFormNameId(cat.name_id);
    setFormNameEn(cat.name_en);
    setError(null);
  };

  const handleAutoTranslate = () => {
    if (!formNameId.trim()) return;
    const translated = translateIdToEnWithTechProtection(formNameId.trim());
    setFormNameEn(translated);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formNameId.trim()) {
      setError(isId ? 'Nama kategori ID wajib diisi.' : 'Category ID name is required.');
      return;
    }

    const trimmedId = formNameId.trim();
    const trimmedEn = formNameEn.trim() || trimmedId;

    // Check duplicate
    const isDuplicate = categories.some(
      (c) => c.id !== editingId && (c.name_id.toLowerCase() === trimmedId.toLowerCase() || c.name_en.toLowerCase() === trimmedEn.toLowerCase())
    );
    if (isDuplicate) {
      setError(isId ? 'Kategori dengan nama ini sudah ada.' : 'A category with this name already exists.');
      return;
    }

    setIsSaving(true);
    try {
      if (editingId) {
        // Edit existing
        const updated = categories.map((c) =>
          c.id === editingId ? { ...c, name_id: trimmedId, name_en: trimmedEn } : c
        );
        await updateCategories(updated);
      } else {
        // Add new
        const slug = trimmedId.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `cat-${Date.now()}`;
        const newCat: CategoryItem = {
          id: slug,
          name_id: trimmedId,
          name_en: trimmedEn,
        };
        await updateCategories([...categories, newCat]);
      }
      resetForm();
    } catch (err) {
      console.error('Failed to save category:', err);
      setError(isId ? 'Gagal menyimpan kategori.' : 'Failed to save category.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (cat: CategoryItem) => {
    const count = getCategoryProjectCount(cat);
    const msg = isId
      ? `Hapus kategori "${cat.name_id}"? ${count > 0 ? `(${count} proyek sedang menggunakan kategori ini)` : ''}`
      : `Delete category "${cat.name_en}"? ${count > 0 ? `(${count} projects are using this category)` : ''}`;

    if (!confirm(msg)) return;

    try {
      const updated = categories.filter((c) => c.id !== cat.id);
      await updateCategories(updated);
      if (editingId === cat.id) resetForm();
    } catch (err) {
      console.error('Failed to delete category:', err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            className="relative z-10 w-full max-w-2xl bg-admin-card border border-admin-border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto text-admin-text"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-admin-border pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-admin-badge-bg text-admin-badge-text border border-admin-badge-border flex items-center justify-center shrink-0 shadow-2xs">
                  <Tags size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-display font-medium text-admin-text">
                    {isId ? 'Kelola Kategori Proyek' : 'Manage Project Categories'}
                  </h3>
                  <p className="text-xs text-admin-muted mt-0.5">
                    {isId
                      ? 'Atur kategori singkat & rapi untuk filter pill di halaman proyek'
                      : 'Configure concise & clean categories for project page filter pills'}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl border border-admin-border flex items-center justify-center text-admin-muted hover:text-admin-text hover:bg-admin-surface transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form to Add / Edit Category */}
            <form onSubmit={handleSave} className="p-4 sm:p-5 bg-admin-surface border border-admin-border rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-admin-primary flex items-center gap-1.5">
                  <Sparkles size={13} />
                  <span>
                    {editingId
                      ? (isId ? 'Edit Kategori Terpilih' : 'Edit Selected Category')
                      : (isId ? 'Tambah Kategori Baru' : 'Add New Category')}
                  </span>
                </span>

                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="text-xs text-admin-muted hover:text-admin-text underline"
                  >
                    {isId ? 'Batal Edit' : 'Cancel Edit'}
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-admin-text font-medium flex items-center gap-1.5">
                    <span>🇮🇩 Nama Kategori (ID)</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formNameId}
                    onChange={(e) => {
                      setFormNameId(e.target.value);
                      setError(null);
                    }}
                    placeholder="mis. Web App, AI & ML, Mobile App"
                    className="w-full bg-admin-input border border-admin-border rounded-xl px-3.5 py-2.5 text-xs text-admin-text focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-admin-text font-medium flex items-center gap-1.5">
                      <span>🇬🇧 Category Name (EN)</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleAutoTranslate}
                      className="text-[11px] text-blue-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
                      title="Auto translate from ID"
                    >
                      <Languages size={12} />
                      <span>{isId ? 'Salin/Terjemahkan' : 'Translate'}</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    value={formNameEn}
                    onChange={(e) => setFormNameEn(e.target.value)}
                    placeholder="e.g. Web App, AI & ML, Mobile App"
                    className="w-full bg-admin-input border border-admin-border rounded-xl px-3.5 py-2.5 text-xs text-admin-text focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-2xs"
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-2.5 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-600 dark:text-rose-400 text-xs">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-admin-primary text-admin-primary-fg text-xs font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-sm disabled:opacity-50"
                >
                  {editingId ? <Check size={14} /> : <Plus size={14} />}
                  <span>
                    {editingId
                      ? (isId ? 'Simpan Perubahan' : 'Save Changes')
                      : (isId ? 'Tambahkan Kategori' : 'Add Category')}
                  </span>
                </button>
              </div>
            </form>

            {/* List of Existing Categories */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-admin-muted">
                  {isId ? 'Daftar Kategori Aktif' : 'Active Category List'} ({categories.length})
                </h4>
                <span className="text-[11px] text-admin-muted">
                  {isId ? 'Singkat & terorganisir' : 'Concise & organized'}
                </span>
              </div>

              <div className="divide-y divide-admin-border border border-admin-border rounded-2xl overflow-hidden bg-admin-card">
                {categories.map((cat) => {
                  const count = getCategoryProjectCount(cat);
                  const isSelected = editingId === cat.id;

                  return (
                    <div
                      key={cat.id}
                      className={`flex items-center justify-between p-3.5 transition-colors ${
                        isSelected ? 'bg-admin-primary/10' : 'hover:bg-admin-surface/50'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="px-2.5 py-1 rounded-lg bg-admin-badge-bg text-admin-badge-text border border-admin-badge-border text-xs font-semibold shrink-0">
                          {cat.name_id}
                        </span>
                        <span className="text-xs text-admin-muted truncate">
                          EN: <strong className="text-admin-text font-medium">{cat.name_en}</strong>
                        </span>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-admin-surface text-admin-muted border border-admin-border shrink-0">
                          {count} {isId ? 'proyek' : 'projects'}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 shrink-0 ml-3">
                        <button
                          type="button"
                          onClick={() => handleStartEdit(cat)}
                          className="p-1.5 rounded-lg text-admin-muted hover:text-admin-primary hover:bg-admin-surface transition-colors"
                          title={isId ? 'Edit Kategori' : 'Edit Category'}
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(cat)}
                          className="p-1.5 rounded-lg text-admin-muted hover:text-rose-600 hover:bg-rose-500/10 transition-colors"
                          title={isId ? 'Hapus Kategori' : 'Delete Category'}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}

                {categories.length === 0 && (
                  <div className="p-6 text-center text-xs text-admin-muted">
                    {isId ? 'Belum ada kategori yang dibuat.' : 'No categories created yet.'}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-2 flex justify-end border-t border-admin-border">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-xs font-medium bg-admin-surface border border-admin-border text-admin-text rounded-xl hover:bg-admin-card transition-colors"
              >
                {isId ? 'Selesai' : 'Done'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
