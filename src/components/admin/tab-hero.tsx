'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Upload, Loader2, Sparkles } from 'lucide-react';
import { HeroData } from '@/context/portfolio-context';

interface TabHeroProps {
  hero: HeroData;
  onSave: (data: Partial<HeroData>) => Promise<void>;
}

export default function TabHero({ hero, onSave }: TabHeroProps) {
  const [form, setForm] = useState(hero);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setForm(hero);
  }, [hero]);

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
    await onSave(form);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-admin-border">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-admin-primary" />
            <h2 className="text-xl sm:text-2xl font-display font-medium text-admin-text tracking-tight">
              Hero Section Content
            </h2>
          </div>
          <p className="text-xs text-admin-muted mt-1">
            Customize main hero headline text, subtext, and portrait image asset.
          </p>
        </div>
      </div>

      <div className="p-5 bg-admin-card border border-admin-border rounded-2xl space-y-5 shadow-2xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-wider text-admin-text font-semibold">
              Headline Line 1
            </label>
            <input
              type="text"
              value={form.titleLine1}
              onChange={(e) => setForm({ ...form, titleLine1: e.target.value })}
              className="w-full bg-admin-input border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-wider text-admin-text font-semibold">
              Headline Line 2
            </label>
            <input
              type="text"
              value={form.titleLine2}
              onChange={(e) => setForm({ ...form, titleLine2: e.target.value })}
              className="w-full bg-admin-input border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs uppercase tracking-wider text-admin-text font-semibold">
            Subtext Description
          </label>
          <textarea
            rows={2}
            value={form.subtext}
            onChange={(e) => setForm({ ...form, subtext: e.target.value })}
            className="w-full bg-admin-input border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs resize-none transition-all"
          />
        </div>
      </div>

      {/* Hero Portrait File Upload */}
      <div className="p-5 bg-admin-card border border-admin-border rounded-2xl space-y-4 shadow-2xs">
        <label className="block text-xs uppercase tracking-wider text-admin-text font-semibold">
          Hero Portrait Image
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
                  <span>Converting to WebP...</span>
                </>
              ) : (
                <>
                  <Upload size={16} className="text-admin-primary" />
                  <span>Upload New Hero Portrait</span>
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
          className="flex items-center gap-2 bg-admin-primary text-admin-primary-fg font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-xl hover:bg-admin-primary-hover transition-all shadow-sm"
        >
          <Save size={16} /> Save Hero Section
        </button>
      </div>
    </motion.form>
  );
}
