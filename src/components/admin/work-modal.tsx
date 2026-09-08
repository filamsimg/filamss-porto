'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Loader2, Plus, Globe, Github } from 'lucide-react';
import { WorkItem } from '@/context/portfolio-context';

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
  const [form, setForm] = useState<Omit<WorkItem, 'id'>>({
    title: '',
    category: '',
    year: '2026',
    image: '',
    isTall: false,
    gallery: [],
    demoUrl: '',
    githubUrl: '',
    description: '',
    technologies: [],
  });

  const [techInput, setTechInput] = useState('');
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);

  useEffect(() => {
    setForm({
      title: initialData.title || '',
      category: initialData.category || '',
      year: initialData.year || '2026',
      image: initialData.image || '',
      isTall: Boolean(initialData.isTall),
      gallery: initialData.gallery || (initialData.image ? [initialData.image] : []),
      demoUrl: initialData.demoUrl || '',
      githubUrl: initialData.githubUrl || '',
      description: initialData.description || '',
      technologies: initialData.technologies || [],
    });
    setTechInput((initialData.technologies || []).join(', '));
  }, [initialData, isOpen]);

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
      const formData = new FormData();
      Array.from(files).forEach((f) => formData.append('file', f));

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.urls && data.urls.length > 0) {
          setForm((prev) => ({
            ...prev,
            gallery: [...(prev.gallery || []), ...data.urls],
          }));
        }
      }
    } catch (err) {
      console.error('Gallery upload failed:', err);
    } finally {
      setIsUploadingGallery(false);
    }
  };

  const handleRemoveGalleryImage = (indexToRemove: number) => {
    setForm((prev) => ({
      ...prev,
      gallery: (prev.gallery || []).filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsedTechs = techInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    await onSave({
      ...form,
      technologies: parsedTechs,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            className="relative z-10 w-full max-w-2xl bg-admin-card border border-admin-border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto text-admin-text"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-admin-border pb-4">
              <div>
                <h3 className="text-xl font-display font-medium text-admin-text">
                  {editingId !== null ? 'Edit Project' : 'Add New Project'}
                </h3>
                <p className="text-xs text-admin-muted mt-0.5">
                  Upload screenshot files &amp; configure project metadata
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-xs font-medium text-admin-muted hover:text-admin-text px-2.5 py-1.5 rounded-xl hover:bg-admin-surface transition-colors"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="block text-[11px] uppercase tracking-wider text-admin-text font-semibold">
                    Project Title
                  </label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. Athena Shield"
                    className="w-full bg-admin-input border border-admin-border rounded-xl px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] uppercase tracking-wider text-admin-text font-semibold">
                    Year
                  </label>
                  <input
                    type="text"
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    className="w-full bg-admin-input border border-admin-border rounded-xl px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] uppercase tracking-wider text-admin-text font-semibold">
                  Category / Subtitle
                </label>
                <input
                  type="text"
                  required
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="e.g. AI Comment Moderation & YouTube API"
                  className="w-full bg-admin-input border border-admin-border rounded-xl px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs"
                />
              </div>

              {/* Cover Image File Upload */}
              <div className="space-y-2">
                <label className="block text-[11px] uppercase tracking-wider text-admin-text font-semibold">
                  Primary Cover Image
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
                        <span>Converting to WebP...</span>
                      </>
                    ) : (
                      <>
                        <Upload size={16} className="text-admin-primary" />
                        <span>Upload Cover Image (PNG/JPG)</span>
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

              {/* Multi-Photo Gallery Uploader */}
              <div className="space-y-2 pt-1 border-t border-admin-border">
                <div className="flex items-center justify-between">
                  <label className="block text-[11px] uppercase tracking-wider text-admin-text font-semibold">
                    Project Gallery Screenshots ({form.gallery?.length || 0} Photos)
                  </label>

                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-admin-badge-bg text-admin-badge-text border border-admin-badge-border text-[11px] font-semibold hover:opacity-90 transition-opacity">
                    {isUploadingGallery ? (
                      <Loader2 size={12} className="animate-spin" />
                    ) : (
                      <Plus size={12} />
                    )}
                    <span>Add Screenshots</span>
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

                {/* Gallery Thumbnails List */}
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5 pt-1">
                  {(form.gallery || []).map((imgUrl, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-video rounded-lg overflow-hidden bg-admin-surface border border-admin-border group shadow-2xs"
                    >
                      <img src={imgUrl} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveGalleryImage(idx)}
                        className="absolute top-1 right-1 p-0.5 rounded-full bg-black/70 text-white hover:bg-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Demo URL & GitHub Repository URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 border-t border-admin-border">
                <div className="space-y-1.5">
                  <label className="block text-[11px] uppercase tracking-wider text-admin-text font-semibold flex items-center gap-1.5">
                    <Globe size={12} className="text-admin-primary" />
                    <span>Live Demo URL (Optional)</span>
                  </label>
                  <input
                    type="url"
                    value={form.demoUrl || ''}
                    onChange={(e) => setForm({ ...form, demoUrl: e.target.value })}
                    placeholder="https://my-demo-app.vercel.app"
                    className="w-full bg-admin-input border border-admin-border rounded-xl px-4 py-2.5 text-xs text-admin-text focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] uppercase tracking-wider text-admin-text font-semibold flex items-center gap-1.5">
                    <Github size={12} className="text-admin-primary" />
                    <span>GitHub Repo URL (Optional)</span>
                  </label>
                  <input
                    type="url"
                    value={form.githubUrl || ''}
                    onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                    placeholder="https://github.com/filamsi/project"
                    className="w-full bg-admin-input border border-admin-border rounded-xl px-4 py-2.5 text-xs text-admin-text focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs"
                  />
                </div>
              </div>

              {/* Technologies Tags */}
              <div className="space-y-1.5">
                <label className="block text-[11px] uppercase tracking-wider text-admin-text font-semibold">
                  Technologies (Comma Separated)
                </label>
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  placeholder="e.g. Next.js, React, Tailwind CSS, Python, IndoBERT"
                  className="w-full bg-admin-input border border-admin-border rounded-xl px-4 py-2.5 text-xs text-admin-text focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs"
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="block text-[11px] uppercase tracking-wider text-admin-text font-semibold">
                  Detailed Description
                </label>
                <textarea
                  rows={3}
                  value={form.description || ''}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Provide an overview of the system architecture and key features..."
                  className="w-full bg-admin-input border border-admin-border rounded-xl px-4 py-2.5 text-xs text-admin-text focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs resize-none"
                />
              </div>

              {/* Layout Option */}
              <div className="pt-1">
                <label className="flex items-center gap-3 text-xs text-admin-text cursor-pointer select-none font-medium">
                  <input
                    type="checkbox"
                    checked={form.isTall}
                    onChange={(e) => setForm({ ...form, isTall: e.target.checked })}
                    className="w-4 h-4 rounded accent-admin-primary"
                  />
                  <span>Tall Card Layout (3/4 aspect ratio)</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col-reverse sm:flex-row justify-end gap-3 border-t border-admin-border">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-admin-surface hover:bg-admin-surface-hover border border-admin-border text-admin-text font-medium text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-admin-primary text-admin-primary-fg font-bold text-xs uppercase tracking-wider hover:bg-admin-primary-hover transition-colors shadow-sm"
                >
                  {editingId !== null ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
