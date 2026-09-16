'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Loader2, Plus, Globe, Github, Languages, Check, FolderGit2, Tags } from 'lucide-react';
import { WorkItem, usePortfolio } from '@/context/portfolio-context';
import { translateIdToEnWithTechProtection } from '@/lib/tech-whitelist';
import { useLanguage } from '@/context/language-context';

interface WorkModalProps {
  isOpen: boolean;
  editingId: number | null;
  initialData: Omit<WorkItem, 'id'>;
  onClose: () => void;
  onSave: (data: Omit<WorkItem, 'id'>) => Promise<void>;
}

export default function WorkModal({
  isOpen,
  editingId,
  initialData,
  onClose,
  onSave,
}: WorkModalProps) {
  const { categories } = usePortfolio();
  const { lang } = useLanguage();
  const isId = lang === 'id';
  const [translateSuccess, setTranslateSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [form, setForm] = useState<Omit<WorkItem, 'id'>>({
    title: '',
    title_id: '',
    title_en: '',
    category: '',
    category_id: '',
    category_en: '',
    year: '2026',
    image: '',
    isTall: false,
    gallery: [],
    demoUrl: '',
    githubUrl: '',
    description: '',
    description_id: '',
    description_en: '',
    technologies: [],
  });

  const [techInput, setTechInput] = useState('');
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);

  useEffect(() => {
    const titleId = initialData.title_id || initialData.title || '';
    const titleEn = initialData.title_en || initialData.title || '';
    const catId = initialData.category_id || initialData.category || '';
    const catEn = initialData.category_en || initialData.category || '';
    const descId = initialData.description_id || initialData.description || '';
    const descEn = initialData.description_en || initialData.description || '';

    setForm({
      title: titleId,
      title_id: titleId,
      title_en: titleEn,
      category: catId,
      category_id: catId,
      category_en: catEn,
      year: initialData.year || '2026',
      image: initialData.image || '',
      isTall: Boolean(initialData.isTall),
      gallery: initialData.gallery || (initialData.image ? [initialData.image] : []),
      demoUrl: initialData.demoUrl || '',
      githubUrl: initialData.githubUrl || '',
      description: descId,
      description_id: descId,
      description_en: descEn,
      technologies: initialData.technologies || [],
    });
    setTechInput((initialData.technologies || []).join(', '));
    setTranslateSuccess(false);
  }, [initialData, isOpen]);

  const handleAutoTranslate = () => {
    const srcTitle = form.title_id || form.title || '';
    const srcCat = form.category_id || form.category || '';
    const srcDesc = form.description_id || form.description || '';

    const enTitle = translateIdToEnWithTechProtection(srcTitle);
    const enCat = translateIdToEnWithTechProtection(srcCat);
    const enDesc = translateIdToEnWithTechProtection(srcDesc);

    setForm((prev) => ({
      ...prev,
      title_en: enTitle,
      category_en: enCat,
      description_en: enDesc,
    }));

    setTranslateSuccess(true);
    setTimeout(() => setTranslateSuccess(false), 5000);
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingCover(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          setForm((prev) => ({
            ...prev,
            image: data.url,
            gallery: prev.gallery && prev.gallery.length > 0 ? prev.gallery : [data.url],
          }));
        }
      }
    } catch (err) {
      console.error('Cover upload failed:', err);
    } finally {
      setIsUploadingCover(false);
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploadingGallery(true);
    try {
      const newUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append('file', files[i]);
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        if (res.ok) {
          const data = await res.json();
          if (data.url) newUrls.push(data.url);
        }
      }

      if (newUrls.length > 0) {
        setForm((prev) => ({
          ...prev,
          gallery: [...(prev.gallery || []), ...newUrls],
        }));
      }
    } catch (err) {
      console.error('Gallery upload failed:', err);
    } finally {
      setIsUploadingGallery(false);
    }
  };

  const handleRemoveGalleryImage = (idxToRemove: number) => {
    setForm((prev) => {
      const updated = (prev.gallery || []).filter((_, i) => i !== idxToRemove);
      return {
        ...prev,
        gallery: updated,
        image: updated.length > 0 ? updated[0] : '',
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const parsedTechs = techInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const finalTitle = form.title_id || form.title;
      const finalCategory = form.category_id || form.category;
      const finalDescription = form.description_id || form.description;

      await onSave({
        ...form,
        title: finalTitle,
        title_id: finalTitle,
        title_en: form.title_en || finalTitle,
        category: finalCategory,
        category_id: finalCategory,
        category_en: form.category_en || finalCategory,
        description: finalDescription,
        description_id: finalDescription,
        description_en: form.description_en || finalDescription,
        technologies: parsedTechs,
      });
    } finally {
      setIsSaving(false);
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

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            className="relative z-10 w-full max-w-3xl bg-admin-card border border-admin-border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto text-admin-text"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-admin-border pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-admin-badge-bg text-admin-badge-text border border-admin-badge-border flex items-center justify-center shrink-0 shadow-2xs">
                  <FolderGit2 size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-display font-medium text-admin-text">
                    {editingId !== null ? (isId ? 'Edit Proyek' : 'Edit Project') : (isId ? 'Tambah Proyek Baru' : 'Add New Project')}
                  </h3>
                  <p className="text-xs text-admin-muted mt-0.5">
                    {isId
                      ? 'Kelola metadata proyek dwi bahasa, tautan demo, & galeri screenshot'
                      : 'Configure bilingual project metadata, demo links & screenshot gallery'}
                  </p>
                </div>
              </div>

              {/* Translation Assistant Button */}
              <div className="flex items-center gap-2">
                {translateSuccess && (
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 px-2.5 py-1 bg-emerald-500/10 rounded-lg animate-fade-in">
                    <Check size={13} />
                    <span>Draf EN terisi!</span>
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleAutoTranslate}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-admin-surface hover:bg-admin-surface-hover border border-admin-border text-admin-text text-xs font-medium transition-all active:scale-95 shadow-2xs shrink-0"
                  title="Otomatis terjemahkan judul, kategori, dan deskripsi ke bahasa Inggris"
                >
                  <Languages size={14} className="text-admin-primary" />
                  <span>Terjemahkan ID ➔ EN</span>
                </button>
                <button
                  onClick={onClose}
                  className="text-xs font-medium text-admin-muted hover:text-admin-text p-2 rounded-xl hover:bg-admin-surface transition-colors ml-1"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Section 1: Bilingual Content Card (Strict 50/50 Grid) */}
              <div className="p-6 bg-admin-surface/70 border border-admin-border rounded-2xl space-y-5 shadow-2xs">
                {/* Column Headers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2 border-b border-admin-border/60">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-mono text-[10px] font-bold">
                      ID
                    </span>
                    <span className="text-xs font-semibold text-admin-text">
                      Bahasa Indonesia (Default Utama)
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-700 dark:text-blue-400 font-mono text-[10px] font-bold">
                        EN
                      </span>
                      <span className="text-xs font-semibold text-admin-text">
                        English (Global)
                      </span>
                    </div>
                    <span className="text-[11px] text-admin-muted">Bisa diedit bebas</span>
                  </div>
                </div>

                {/* Project Title (50/50) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs text-admin-text font-medium block">
                      Judul Proyek
                    </label>
                    <input
                      type="text"
                      required
                      value={form.title_id || ''}
                      onChange={(e) => setForm({ ...form, title_id: e.target.value, title: e.target.value })}
                      placeholder="mis. Athena Shield"
                      className="w-full bg-admin-input border border-admin-border rounded-xl px-3.5 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-admin-text font-medium block">
                      Project Title
                    </label>
                    <input
                      type="text"
                      required
                      value={form.title_en || ''}
                      onChange={(e) => setForm({ ...form, title_en: e.target.value })}
                      placeholder="e.g. Athena Shield"
                      className="w-full bg-admin-input border border-admin-border rounded-xl px-3.5 py-2.5 text-sm text-admin-text focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-2xs transition-all"
                    />
                  </div>
                </div>

                {/* Category Section with Quick Select Chips */}
                <div className="space-y-3 p-4 bg-admin-surface/60 border border-admin-border rounded-2xl">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-admin-primary flex items-center gap-1.5">
                      <Tags size={13} />
                      <span>{isId ? 'Pilih Kategori Singkat (Rekomendasi)' : 'Quick Category Preset'}</span>
                    </span>
                    <span className="text-[11px] text-admin-muted">
                      {isId ? 'Klik salah satu untuk mengisi otomatis ID & EN' : 'Click to autofill ID & EN'}
                    </span>
                  </div>

                  {/* Preset Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {categories.map((cat) => {
                      const isActive =
                        form.category_id?.toLowerCase() === cat.name_id.toLowerCase() ||
                        form.category_en?.toLowerCase() === cat.name_en.toLowerCase();

                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            setForm((prev) => ({
                              ...prev,
                              category: cat.name_id,
                              category_id: cat.name_id,
                              category_en: cat.name_en,
                            }));
                          }}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                            isActive
                              ? 'bg-admin-primary text-admin-primary-fg shadow-xs scale-102 ring-1 ring-admin-primary font-semibold'
                              : 'bg-admin-card text-admin-muted border border-admin-border hover:text-admin-text hover:bg-admin-surface'
                          }`}
                        >
                          {isId ? cat.name_id : cat.name_en}
                        </button>
                      );
                    })}
                  </div>

                  {/* Category Inputs (50/50 - Perfectly Aligned) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
                    <div className="space-y-1.5">
                      <label className="text-xs text-admin-text font-medium block">
                        Kategori Singkat (ID)
                      </label>
                      <input
                        type="text"
                        required
                        value={form.category_id || ''}
                        onChange={(e) => setForm({ ...form, category_id: e.target.value, category: e.target.value })}
                        placeholder="mis. Web App, AI & ML"
                        className="w-full bg-admin-input border border-admin-border rounded-xl px-3.5 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-admin-text font-medium block">
                        Short Category (EN)
                      </label>
                      <input
                        type="text"
                        required
                        value={form.category_en || ''}
                        onChange={(e) => setForm({ ...form, category_en: e.target.value })}
                        placeholder="e.g. Web App, AI & ML"
                        className="w-full bg-admin-input border border-admin-border rounded-xl px-3.5 py-2.5 text-sm text-admin-text focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-2xs transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Description (50/50) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs text-admin-text font-medium block">
                      Deskripsi Lengkap Proyek
                    </label>
                    <textarea
                      rows={3}
                      value={form.description_id || ''}
                      onChange={(e) => setForm({ ...form, description_id: e.target.value, description: e.target.value })}
                      placeholder="Jelaskan arsitektur sistem, fitur utama, dan solusi teknis dalam Bahasa Indonesia..."
                      className="w-full bg-admin-input border border-admin-border rounded-xl px-3.5 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs resize-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-admin-text font-medium block">
                      Full Project Description
                    </label>
                    <textarea
                      rows={3}
                      value={form.description_en || ''}
                      onChange={(e) => setForm({ ...form, description_en: e.target.value })}
                      placeholder="Explain system architecture, key features, and technical highlights in English..."
                      className="w-full bg-admin-input border border-admin-border rounded-xl px-3.5 py-2.5 text-sm text-admin-text focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-2xs resize-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Metadata Proyek (Tahun, Stack, Tautan) */}
              <div className="p-6 bg-admin-card border border-admin-border rounded-2xl space-y-4 shadow-2xs">
                <h4 className="text-xs uppercase tracking-wider text-admin-primary font-bold">
                  Metadata & Spesifikasi Proyek
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  {/* Tahun Pembuatan */}
                  <div className="sm:col-span-3 space-y-1.5">
                    <label className="text-xs text-admin-text font-medium block">
                      Tahun Rilis
                    </label>
                    <input
                      type="text"
                      value={form.year}
                      onChange={(e) => setForm({ ...form, year: e.target.value })}
                      placeholder="2026"
                      className="w-full bg-admin-input border border-admin-border rounded-xl px-3.5 py-2.5 text-xs text-admin-text focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs"
                    />
                  </div>

                  {/* Technologies Tags */}
                  <div className="sm:col-span-9 space-y-1.5">
                    <label className="text-xs text-admin-text font-medium block">
                      Teknologi & Stack (Pisahkan dengan koma)
                    </label>
                    <input
                      type="text"
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      placeholder="mis. Python, IndoBERTweet, TensorFlow, YouTube API v3, React"
                      className="w-full bg-admin-input border border-admin-border rounded-xl px-3.5 py-2.5 text-xs text-admin-text focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs"
                    />
                  </div>
                </div>

                {/* Demo URL & GitHub Repo */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-admin-text font-medium flex items-center gap-1.5">
                      <Globe size={13} className="text-admin-primary" />
                      <span>Tautan Live Demo (Opsional)</span>
                    </label>
                    <input
                      type="url"
                      value={form.demoUrl || ''}
                      onChange={(e) => setForm({ ...form, demoUrl: e.target.value })}
                      placeholder="https://my-demo-app.vercel.app"
                      className="w-full bg-admin-input border border-admin-border rounded-xl px-3.5 py-2.5 text-xs text-admin-text focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-admin-text font-medium flex items-center gap-1.5">
                      <Github size={13} className="text-admin-primary" />
                      <span>Repository GitHub (Opsional)</span>
                    </label>
                    <input
                      type="url"
                      value={form.githubUrl || ''}
                      onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                      placeholder="https://github.com/filamsi/project"
                      className="w-full bg-admin-input border border-admin-border rounded-xl px-3.5 py-2.5 text-xs text-admin-text focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs"
                    />
                  </div>
                </div>

                {/* Tall Card Layout */}
                <div className="pt-1">
                  <label className="flex items-center gap-3 text-xs text-admin-text cursor-pointer select-none font-medium">
                    <input
                      type="checkbox"
                      checked={form.isTall}
                      onChange={(e) => setForm({ ...form, isTall: e.target.checked })}
                      className="w-4 h-4 rounded accent-admin-primary"
                    />
                    <span>Tata Letak Kartu Vertikal (rasio foto 3/4)</span>
                  </label>
                </div>
              </div>

              {/* Section 3: Media & Gambar */}
              <div className="p-6 bg-admin-card border border-admin-border rounded-2xl space-y-4 shadow-2xs">
                <h4 className="text-xs uppercase tracking-wider text-admin-primary font-bold">
                  Gambar Sampul & Tangkapan Layar Galeri
                </h4>

                {/* Cover Image File Upload */}
                <div className="space-y-2">
                  <label className="text-xs text-admin-text font-medium block">
                    Foto Sampul Proyek (Cover Image)
                  </label>

                  <div className="flex items-center gap-4">
                    {form.image ? (
                      <div className="relative w-28 h-20 rounded-xl overflow-hidden bg-admin-surface border border-admin-border shrink-0 shadow-2xs">
                        <img src={form.image} alt="Cover Preview" className="w-full h-full object-cover" />
                      </div>
                    ) : null}

                    <label className="flex-1 cursor-pointer flex items-center justify-center gap-2 p-4 rounded-xl bg-admin-surface hover:bg-admin-surface-hover border border-dashed border-admin-border text-xs font-medium text-admin-text transition-colors shadow-2xs">
                      {isUploadingCover ? (
                        <>
                          <Loader2 size={16} className="animate-spin text-admin-primary" />
                          <span>Mengonversi ke WebP...</span>
                        </>
                      ) : (
                        <>
                          <Upload size={16} className="text-admin-primary" />
                          <span>{form.image ? 'Ganti Foto Sampul' : 'Unggah Foto Sampul (WebP/JPG/PNG)'}</span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverUpload}
                        disabled={isUploadingCover}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Gallery Screenshots */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-admin-text font-medium block">
                      Galeri Screenshot Proyek ({form.gallery?.length || 0} Foto)
                    </label>
                    <label className="cursor-pointer text-xs font-medium text-admin-primary hover:underline flex items-center gap-1">
                      {isUploadingGallery ? (
                        <>
                          <Loader2 size={13} className="animate-spin" />
                          <span>Mengunggah...</span>
                        </>
                      ) : (
                        <>
                          <Plus size={13} />
                          <span>Tambah Screenshot</span>
                        </>
                      )}
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleGalleryUpload}
                        disabled={isUploadingGallery}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="flex flex-wrap gap-2.5 p-3 rounded-xl bg-admin-surface border border-admin-border min-h-[70px] items-center">
                    {(!form.gallery || form.gallery.length === 0) && (
                      <span className="text-xs text-admin-muted italic px-2">Belum ada tangkapan layar galeri.</span>
                    )}
                    {(form.gallery || []).map((imgUrl, i) => (
                      <div key={i} className="relative group w-20 h-14 rounded-lg overflow-hidden border border-admin-border bg-admin-card shadow-2xs">
                        <img src={imgUrl} alt={`Screenshot ${i + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(i)}
                          className="absolute inset-0 bg-red-600/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Hapus gambar"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-admin-border">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl border border-admin-border text-xs font-semibold text-admin-muted hover:text-admin-text hover:bg-admin-surface transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-admin-primary text-admin-primary-fg text-xs font-bold uppercase tracking-wider hover:bg-admin-primary-hover active:scale-[0.99] transition-all shadow-sm disabled:opacity-50 flex items-center gap-2"
                >
                  {isSaving ? <Loader2 size={15} className="animate-spin" /> : null}
                  <span>{editingId !== null ? 'Simpan Perubahan' : 'Tambah Proyek'}</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
