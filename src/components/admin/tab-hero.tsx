'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Upload, Loader2, LayoutTemplate, Languages, Check } from 'lucide-react';
import { HeroData } from '@/context/portfolio-context';
import { useLanguage } from '@/context/language-context';
import { translateIdToEnWithTechProtection } from '@/lib/tech-whitelist';

interface TabHeroProps {
  hero: HeroData;
  onSave: (data: Partial<HeroData>) => Promise<void>;
}

export default function TabHero({ hero, onSave }: TabHeroProps) {
  const [form, setForm] = useState<HeroData>({
    ...hero,
    titleLine1_id: hero.titleLine1_id || hero.titleLine1 || '',
    titleLine1_en: hero.titleLine1_en || '',
    titleLine2_id: hero.titleLine2_id || hero.titleLine2 || '',
    titleLine2_en: hero.titleLine2_en || '',
    subtext_id: hero.subtext_id || hero.subtext || '',
    subtext_en: hero.subtext_en || '',
  });

  const [translateSuccess, setTranslateSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { lang, t } = useLanguage();
  const isId = lang === 'id';

  useEffect(() => {
    setForm({
      ...hero,
      titleLine1_id: hero.titleLine1_id || hero.titleLine1 || '',
      titleLine1_en: hero.titleLine1_en || '',
      titleLine2_id: hero.titleLine2_id || hero.titleLine2 || '',
      titleLine2_en: hero.titleLine2_en || '',
      subtext_id: hero.subtext_id || hero.subtext || '',
      subtext_en: hero.subtext_en || '',
    });
  }, [hero]);

  const handleAutoTranslate = () => {
    const srcLine1 = form.titleLine1_id || form.titleLine1 || '';
    const srcLine2 = form.titleLine2_id || form.titleLine2 || '';
    const srcSubtext = form.subtext_id || form.subtext || '';

    const enLine1 = translateIdToEnWithTechProtection(srcLine1);
    const enLine2 = translateIdToEnWithTechProtection(srcLine2);
    const enSubtext = translateIdToEnWithTechProtection(srcSubtext);

    setForm((prev) => ({
      ...prev,
      titleLine1_en: enLine1,
      titleLine2_en: enLine2,
      subtext_en: enSubtext,
    }));

    setTranslateSuccess(true);
    setTimeout(() => setTranslateSuccess(false), 5000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
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
          setForm((prev) => ({ ...prev, portraitUrl: data.url }));
        }
      }
    } catch (err) {
      console.error('Portrait upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const payload: Partial<HeroData> = {
        titleLine1: form.titleLine1_id || form.titleLine1,
        titleLine1_id: form.titleLine1_id || form.titleLine1,
        titleLine1_en: form.titleLine1_en || form.titleLine1_id || form.titleLine1,

        titleLine2: form.titleLine2_id || form.titleLine2,
        titleLine2_id: form.titleLine2_id || form.titleLine2,
        titleLine2_en: form.titleLine2_en || form.titleLine2_id || form.titleLine2,

        subtext: form.subtext_id || form.subtext,
        subtext_id: form.subtext_id || form.subtext,
        subtext_en: form.subtext_en || form.subtext_id || form.subtext,

        portraitUrl: form.portraitUrl,
      };

      await onSave(payload);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-admin-border">
        <div>
          <div className="flex items-center gap-2">
            <LayoutTemplate size={18} className="text-admin-primary" />
            <h2 className="text-xl sm:text-2xl font-display font-medium text-admin-text tracking-tight">
              {t('admin.hero.title')}
            </h2>
          </div>
          <p className="text-xs text-admin-muted mt-1">
            {t('admin.hero.subtitle')}
          </p>
        </div>

        {/* Action Button: Auto-Translate Assistant */}
        <div className="flex items-center gap-2">
          {translateSuccess && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 px-2.5 py-1 bg-emerald-500/10 rounded-lg animate-fade-in">
              <Check size={13} />
              <span>Draf terjemahan terisi rapi!</span>
            </span>
          )}

          <button
            type="button"
            onClick={handleAutoTranslate}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-admin-surface hover:bg-admin-surface-hover border border-admin-border text-admin-text text-xs font-medium transition-all active:scale-95 shadow-2xs shrink-0"
            title="Otomatis isi draf bahasa Inggris dari bahasa Indonesia"
          >
            <Languages size={14} className="text-admin-primary" />
            <span>Terjemahkan ID ➔ EN</span>
          </button>
        </div>
      </div>

      {/* Main Hero Fields Card */}
      <div className="p-6 bg-admin-card border border-admin-border rounded-2xl space-y-5 shadow-2xs">
        {/* Clean Column Headers */}
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

        {/* Headline Line 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs text-admin-text font-medium block">
              Judul Baris 1
            </label>
            <input
              type="text"
              value={form.titleLine1_id ?? ''}
              onChange={(e) =>
                setForm({ ...form, titleLine1_id: e.target.value, titleLine1: e.target.value })
              }
              placeholder="mis. Full-Stack"
              className="w-full bg-admin-input border border-admin-border rounded-xl px-3.5 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-admin-text font-medium block">
              Headline Line 1
            </label>
            <input
              type="text"
              value={form.titleLine1_en ?? ''}
              onChange={(e) => setForm({ ...form, titleLine1_en: e.target.value })}
              placeholder="e.g. Full-Stack"
              className="w-full bg-admin-input border border-admin-border rounded-xl px-3.5 py-2.5 text-sm text-admin-text focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-2xs transition-all"
            />
          </div>
        </div>

        {/* Headline Line 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs text-admin-text font-medium block">
              Judul Baris 2
            </label>
            <input
              type="text"
              value={form.titleLine2_id ?? ''}
              onChange={(e) =>
                setForm({ ...form, titleLine2_id: e.target.value, titleLine2: e.target.value })
              }
              placeholder="mis. Developer"
              className="w-full bg-admin-input border border-admin-border rounded-xl px-3.5 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-admin-text font-medium block">
              Headline Line 2
            </label>
            <input
              type="text"
              value={form.titleLine2_en ?? ''}
              onChange={(e) => setForm({ ...form, titleLine2_en: e.target.value })}
              placeholder="e.g. Developer"
              className="w-full bg-admin-input border border-admin-border rounded-xl px-3.5 py-2.5 text-sm text-admin-text focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-2xs transition-all"
            />
          </div>
        </div>

        {/* Subtext */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs text-admin-text font-medium block">
              Deskripsi Subtext
            </label>
            <textarea
              rows={3}
              value={form.subtext_id ?? ''}
              onChange={(e) =>
                setForm({ ...form, subtext_id: e.target.value, subtext: e.target.value })
              }
              placeholder="Spesialisasi di Next.js, React, TypeScript & Laravel..."
              className="w-full bg-admin-input border border-admin-border rounded-xl px-3.5 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs resize-none transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-admin-text font-medium block">
              Subtext Description
            </label>
            <textarea
              rows={3}
              value={form.subtext_en ?? ''}
              onChange={(e) => setForm({ ...form, subtext_en: e.target.value })}
              placeholder="Specializing in Next.js, React, TypeScript & Laravel..."
              className="w-full bg-admin-input border border-admin-border rounded-xl px-3.5 py-2.5 text-sm text-admin-text focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-2xs resize-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Hero Portrait File Upload */}
      <div className="p-6 bg-admin-card border border-admin-border rounded-2xl space-y-4 shadow-2xs">
        <label className="text-xs text-admin-text font-medium block">
          Foto Potret Developer (Hero)
        </label>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="w-16 h-20 rounded-xl bg-admin-surface border border-admin-border overflow-hidden shrink-0 shadow-xs">
            <img
              src={form.portraitUrl}
              alt="Portrait Preview"
              className="w-full h-full object-cover filter grayscale"
            />
          </div>

          <div className="flex-1 w-full">
            <label className="cursor-pointer flex items-center justify-center gap-2 p-4 rounded-xl bg-admin-surface hover:bg-admin-surface-hover border border-dashed border-admin-border text-xs font-medium text-admin-text transition-colors shadow-2xs">
              {isUploading ? (
                <>
                  <Loader2 size={16} className="animate-spin text-admin-primary" />
                  <span>Mengonversi ke WebP...</span>
                </>
              ) : (
                <>
                  <Upload size={16} className="text-admin-primary" />
                  <span>Unggah Foto Hero Baru</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 bg-admin-primary text-admin-primary-fg font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-xl hover:bg-admin-primary-hover transition-all shadow-sm disabled:opacity-50"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {t('admin.hero.save')}
        </button>
      </div>
    </motion.form>
  );
}
