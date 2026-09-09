'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Upload, Loader2, FileText, Globe, MessageSquareQuote, Sliders } from 'lucide-react';
import { SiteSettings, FooterData } from '@/context/portfolio-context';
import { useLanguage } from '@/context/language-context';

interface TabSettingsProps {
  settings: SiteSettings;
  footer?: FooterData;
  onSave: (data: Partial<SiteSettings>) => Promise<void>;
  onSaveFooter?: (data: Partial<FooterData>) => Promise<void>;
}

export default function TabSettings({ settings, footer, onSave, onSaveFooter }: TabSettingsProps) {
  const [form, setForm] = useState(settings);
  const { lang, t } = useLanguage();
  const isId = lang === 'id';
  const [footerForm, setFooterForm] = useState<FooterData>(
    footer || {
      headlineLine1: "Let's work",
      headlineLine2: 'together',
      emailLabel: 'Drop me an email',
      copyrightNote: 'Designed & built with care',
    }
  );
  const [isUploadingFavicon, setIsUploadingFavicon] = useState(false);
  const [isUploadingResume, setIsUploadingResume] = useState(false);

  useEffect(() => {
    setForm(settings);
  }, [settings]);

  useEffect(() => {
    if (footer) setFooterForm(footer);
  }, [footer]);

  const handleFaviconUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingFavicon(true);
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
          setForm((prev) => ({ ...prev, faviconUrl: data.url }));
        }
      }
    } catch (err) {
      console.error('Favicon upload error:', err);
    } finally {
      setIsUploadingFavicon(false);
    }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingResume(true);
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
          setForm((prev) => ({ ...prev, resumeUrl: data.url }));
        }
      }
    } catch (err) {
      console.error('Resume upload error:', err);
    } finally {
      setIsUploadingResume(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(form);
    if (onSaveFooter) {
      await onSaveFooter(footerForm);
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-admin-border">
        <div>
          <div className="flex items-center gap-2">
            <Sliders size={18} className="text-admin-primary" />
            <h2 className="text-xl sm:text-2xl font-display font-medium text-admin-text tracking-tight">
              {t('admin.settings.title')}
            </h2>
          </div>
          <p className="text-xs text-admin-muted mt-1">
            {t('admin.settings.subtitle')}
          </p>
        </div>
      </div>

      {/* Brand & Direct Contact */}
      <div className="p-5 bg-admin-card border border-admin-border rounded-2xl space-y-5 shadow-2xs">
        <h3 className="text-xs uppercase tracking-wider text-admin-primary font-bold">
          {isId ? 'Identitas Merek & Kontak Langsung' : 'Brand & Direct Channels'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-wider text-admin-text font-semibold">
              {isId ? 'Nama Merek / Developer' : 'Brand / Developer Name'}
            </label>
            <input
              type="text"
              value={form.brandName || ''}
              onChange={(e) => setForm({ ...form, brandName: e.target.value })}
              className="w-full bg-admin-input border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-wider text-admin-text font-semibold">
              {isId ? 'Email Kontak' : 'Contact Email'}
            </label>
            <input
              type="email"
              value={form.contactEmail || ''}
              onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
              className="w-full bg-admin-input border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs transition-all"
            />
          </div>

          {/* WhatsApp Number */}
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-wider text-admin-text font-semibold">
              {isId ? 'Nomor WhatsApp (Chat Langsung)' : 'WhatsApp Number (Direct Chat)'}
            </label>
            <input
              type="text"
              placeholder="0858-5368-5622 atau +62858..."
              value={form.whatsappNumber || ''}
              onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
              className="w-full bg-admin-input border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs transition-all"
            />
            <p className="text-[11px] text-admin-muted">
              {isId
                ? 'Terkoneksi langsung ke link wa.me pada floating icon & baris kontak Quick Info.'
                : 'Directly linked to wa.me on floating icon & Quick Info drawer.'}
            </p>
          </div>

          {/* Instagram Profile URL */}
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-wider text-admin-text font-semibold">
              {isId ? 'URL Profil Instagram' : 'Instagram Profile URL'}
            </label>
            <input
              type="url"
              placeholder="https://instagram.com/username"
              value={form.instagramUrl || ''}
              onChange={(e) => setForm({ ...form, instagramUrl: e.target.value })}
              className="w-full bg-admin-input border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs transition-all"
            />
            <p className="text-[11px] text-admin-muted">
              {isId
                ? 'Terkoneksi langsung ke floating icon Instagram.'
                : 'Directly linked to Instagram floating icon.'}
            </p>
          </div>

          {/* Showreel Video URL */}
          <div className="space-y-2 md:col-span-2">
            <label className="block text-xs uppercase tracking-wider text-admin-text font-semibold">
              {isId ? 'URL Video Showreel (YouTube / Vimeo / MP4)' : 'Showreel Video URL (YouTube / Vimeo / MP4)'}
            </label>
            <input
              type="url"
              placeholder="https://www.youtube.com/watch?v=... atau https://vimeo.com/... atau link video"
              value={form.showreelUrl || ''}
              onChange={(e) => setForm({ ...form, showreelUrl: e.target.value })}
              className="w-full bg-admin-input border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs transition-all"
            />
            <p className="text-[11px] text-admin-muted">
              {isId
                ? 'Video kompilasi karya ini akan otomatis dimainkan dalam modal ketika pengunjung mengeklik "PLAY REEL" di beranda.'
                : 'This project showcase video will automatically play inside the modal when visitors click "PLAY REEL" on the homepage.'}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Headline & Call to Action */}
      <div className="p-5 bg-admin-card border border-admin-border rounded-2xl space-y-5 shadow-2xs">
        <div className="flex items-center gap-2">
          <MessageSquareQuote size={16} className="text-admin-primary" />
          <h3 className="text-xs uppercase tracking-wider text-admin-text font-bold">
            {isId ? 'Kustomisasi Footer Kontak' : 'Contact Footer Customization'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-wider text-admin-text font-semibold">
              {isId ? 'Judul Baris 1' : 'Headline Line 1'}
            </label>
            <input
              type="text"
              placeholder="Let's work"
              value={footerForm.headlineLine1 || ''}
              onChange={(e) => setFooterForm({ ...footerForm, headlineLine1: e.target.value })}
              className="w-full bg-admin-input border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-wider text-admin-text font-semibold">
              {isId ? 'Judul Baris 2 (Aksen)' : 'Headline Line 2 (Accent)'}
            </label>
            <input
              type="text"
              placeholder="together"
              value={footerForm.headlineLine2 || ''}
              onChange={(e) => setFooterForm({ ...footerForm, headlineLine2: e.target.value })}
              className="w-full bg-admin-input border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-wider text-admin-text font-semibold">
              {isId ? 'Label Ajakan Email' : 'Email Invitation Label'}
            </label>
            <input
              type="text"
              placeholder="Drop me an email"
              value={footerForm.emailLabel || ''}
              onChange={(e) => setFooterForm({ ...footerForm, emailLabel: e.target.value })}
              className="w-full bg-admin-input border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-wider text-admin-text font-semibold">
              {isId ? 'Catatan Hak Cipta' : 'Copyright Note'}
            </label>
            <input
              type="text"
              placeholder="Designed & built with care"
              value={footerForm.copyrightNote || ''}
              onChange={(e) => setFooterForm({ ...footerForm, copyrightNote: e.target.value })}
              className="w-full bg-admin-input border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs"
            />
          </div>
        </div>
      </div>

      {/* Quick Info Closing Note & SEO */}
      <div className="p-5 bg-admin-card border border-admin-border rounded-2xl space-y-5 shadow-2xs">
        <div className="flex items-center gap-2">
          <Globe size={16} className="text-admin-primary" />
          <h3 className="text-xs uppercase tracking-wider text-admin-text font-bold">
            {isId ? 'Catatan Info Cepat & SEO' : 'Quick Info Note & SEO'}
          </h3>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-wider text-admin-text font-semibold">
              {isId ? 'Catatan Bawah Laci Info Cepat' : 'Quick Info Drawer Bottom Note'}
            </label>
            <textarea
              rows={2}
              placeholder="Looking for a thoughtful developer partner? Let's talk about your project."
              value={form.quickInfoNote || ''}
              onChange={(e) => setForm({ ...form, quickInfoNote: e.target.value })}
              className="w-full bg-admin-input border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider text-admin-text font-semibold">
                {isId ? 'Judul Halaman SEO' : 'SEO Page Title'}
              </label>
              <input
                type="text"
                placeholder="Developer Name | Full-Stack Web Developer"
                value={form.seoTitle || ''}
                onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
                className="w-full bg-admin-input border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider text-admin-text font-semibold">
                {isId ? 'Deskripsi Meta SEO' : 'SEO Meta Description'}
              </label>
              <input
                type="text"
                placeholder="Brief description for search engines and social shares..."
                value={form.seoDescription || ''}
                onChange={(e) => setForm({ ...form, seoDescription: e.target.value })}
                className="w-full bg-admin-input border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Resume / CV Section */}
      <div className="p-5 bg-admin-card border border-admin-border rounded-2xl space-y-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <label className="block text-xs uppercase tracking-wider text-admin-text font-semibold">
            {isId ? 'Dokumen Resume / CV (PDF)' : 'Resume / CV Document (PDF)'}
          </label>
          {form.resumeUrl && (
            <a
              href={form.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-admin-primary hover:underline flex items-center gap-1 font-semibold"
            >
              <FileText size={13} /> {isId ? 'Lihat Resume Saat Ini' : 'View Current Resume'}
            </a>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          <div className="space-y-1">
            <input
              type="text"
              placeholder="/uploads/resume.pdf atau URL eksternal"
              value={form.resumeUrl || ''}
              onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })}
              className="w-full bg-admin-input border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs transition-all"
            />
            <p className="text-[11px] text-admin-muted">
              {isId
                ? 'Bisa upload file PDF baru di samping atau masukkan URL link dokumen langsung.'
                : 'Upload a new PDF file or paste a direct document URL.'}
            </p>
          </div>

          <div>
            <label className="cursor-pointer flex items-center justify-center gap-2 p-3.5 rounded-xl bg-admin-surface hover:bg-admin-surface-hover border border-dashed border-admin-border text-xs font-medium text-admin-text transition-colors shadow-2xs">
              {isUploadingResume ? (
                <>
                  <Loader2 size={16} className="animate-spin text-admin-primary" />
                  <span>{isId ? 'Mengunggah PDF...' : 'Uploading PDF...'}</span>
                </>
              ) : (
                <>
                  <Upload size={16} className="text-admin-primary" />
                  <span>{isId ? 'Unggah Resume (PDF)' : 'Upload Resume (PDF)'}</span>
                </>
              )}
              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleResumeUpload}
                disabled={isUploadingResume}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Favicon File Upload */}
      <div className="p-5 bg-admin-card border border-admin-border rounded-2xl space-y-4 shadow-2xs">
        <label className="block text-xs uppercase tracking-wider text-admin-text font-semibold">
          {isId ? 'Favicon / Logo Merek' : 'Favicon / Brand Logo'}
        </label>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="w-14 h-14 rounded-2xl bg-admin-surface border border-admin-border overflow-hidden shrink-0 flex items-center justify-center shadow-xs">
            <img
              src={form.faviconUrl}
              alt="Favicon Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>

          <div className="flex-1 w-full">
            <label className="cursor-pointer flex items-center justify-center gap-2 p-4 rounded-xl bg-admin-surface hover:bg-admin-surface-hover border border-dashed border-admin-border text-xs font-medium text-admin-text transition-colors shadow-2xs">
              {isUploadingFavicon ? (
                <>
                  <Loader2 size={16} className="animate-spin text-admin-primary" />
                  <span>{isId ? 'Mengonversi ke WebP...' : 'Converting to WebP...'}</span>
                </>
              ) : (
                <>
                  <Upload size={16} className="text-admin-primary" />
                  <span>{isId ? 'Unggah Favicon / Logo Baru' : 'Upload New Favicon / Logo'}</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFaviconUpload}
                disabled={isUploadingFavicon}
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
          <Save size={16} /> {t('admin.settings.save')}
        </button>
      </div>
    </motion.form>
  );
}
