'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2, Layers, Languages, Compass, User, Check, Loader2 } from 'lucide-react';
import { AboutData, ServiceItem, ValueItem } from '@/context/portfolio-context';
import { useLanguage } from '@/context/language-context';
import { translateIdToEnWithTechProtection } from '@/lib/tech-whitelist';

interface TabAboutProps {
  about: AboutData;
  onSave: (data: Partial<AboutData>) => Promise<void>;
}

export default function TabAbout({ about, onSave }: TabAboutProps) {
  const [form, setForm] = useState<AboutData>({
    ...about,
    eyebrow_id: about.eyebrow_id || about.eyebrow || '',
    eyebrow_en: about.eyebrow_en || '',
    eyebrowHighlight_id: about.eyebrowHighlight_id || about.eyebrowHighlight || '',
    eyebrowHighlight_en: about.eyebrowHighlight_en || '',
    headline_id: about.headline_id || about.headline || '',
    headline_en: about.headline_en || '',
    headlineHighlight_id: about.headlineHighlight_id || about.headlineHighlight || '',
    headlineHighlight_en: about.headlineHighlight_en || '',
    subtext_id: about.subtext_id || about.subtext || '',
    subtext_en: about.subtext_en || '',
    services: (about.services || []).map((s) => ({
      ...s,
      title_id: s.title_id || s.title || '',
      title_en: s.title_en || '',
      desc_id: s.desc_id || s.desc || '',
      desc_en: s.desc_en || '',
    })),
    values: (about.values || []).map((v) => ({
      ...v,
      label_id: v.label_id || v.label || '',
      label_en: v.label_en || '',
      quote_id: v.quote_id || v.quote || '',
      quote_en: v.quote_en || '',
    })),
  });

  const [translateSuccess, setTranslateSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { lang, t } = useLanguage();
  const isId = lang === 'id';

  useEffect(() => {
    setForm({
      ...about,
      eyebrow_id: about.eyebrow_id || about.eyebrow || '',
      eyebrow_en: about.eyebrow_en || '',
      eyebrowHighlight_id: about.eyebrowHighlight_id || about.eyebrowHighlight || '',
      eyebrowHighlight_en: about.eyebrowHighlight_en || '',
      headline_id: about.headline_id || about.headline || '',
      headline_en: about.headline_en || '',
      headlineHighlight_id: about.headlineHighlight_id || about.headlineHighlight || '',
      headlineHighlight_en: about.headlineHighlight_en || '',
      subtext_id: about.subtext_id || about.subtext || '',
      subtext_en: about.subtext_en || '',
      services: (about.services || []).map((s) => ({
        ...s,
        title_id: s.title_id || s.title || '',
        title_en: s.title_en || '',
        desc_id: s.desc_id || s.desc || '',
        desc_en: s.desc_en || '',
      })),
      values: (about.values || []).map((v) => ({
        ...v,
        label_id: v.label_id || v.label || '',
        label_en: v.label_en || '',
        quote_id: v.quote_id || v.quote || '',
        quote_en: v.quote_en || '',
      })),
    });
  }, [about]);

  const handleAutoTranslate = () => {
    const enEyebrow = translateIdToEnWithTechProtection(form.eyebrow_id || form.eyebrow || '');
    const enEyebrowHighlight = translateIdToEnWithTechProtection(
      form.eyebrowHighlight_id || form.eyebrowHighlight || ''
    );
    const enHeadline = translateIdToEnWithTechProtection(form.headline_id || form.headline || '');
    const enHeadlineHighlight = translateIdToEnWithTechProtection(
      form.headlineHighlight_id || form.headlineHighlight || ''
    );
    const enSubtext = translateIdToEnWithTechProtection(form.subtext_id || form.subtext || '');

    const updatedServices = (form.services || []).map((s) => ({
      ...s,
      title_en: translateIdToEnWithTechProtection(s.title_id || s.title || ''),
      desc_en: translateIdToEnWithTechProtection(s.desc_id || s.desc || ''),
    }));

    const updatedValues = (form.values || []).map((v) => ({
      ...v,
      label_en: translateIdToEnWithTechProtection(v.label_id || v.label || ''),
      quote_en: translateIdToEnWithTechProtection(v.quote_id || v.quote || ''),
    }));

    setForm((prev) => ({
      ...prev,
      eyebrow_en: enEyebrow,
      eyebrowHighlight_en: enEyebrowHighlight,
      headline_en: enHeadline,
      headlineHighlight_en: enHeadlineHighlight,
      subtext_en: enSubtext,
      services: updatedServices,
      values: updatedValues,
    }));

    setTranslateSuccess(true);
    setTimeout(() => setTranslateSuccess(false), 5000);
  };

  const handleServiceField = (
    index: number,
    field: 'num' | 'title_id' | 'title_en' | 'desc_id' | 'desc_en',
    value: string
  ) => {
    const updated = [...(form.services || [])];
    if (field === 'title_id') {
      updated[index] = { ...updated[index], title_id: value, title: value };
    } else if (field === 'desc_id') {
      updated[index] = { ...updated[index], desc_id: value, desc: value };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    setForm({ ...form, services: updated });
  };

  const handleAddService = () => {
    const current = form.services || [];
    const nextNum = String(current.length + 1).padStart(2, '0');
    const newService: ServiceItem = {
      num: nextNum,
      title: 'Layanan Baru',
      title_id: 'Layanan Baru',
      title_en: 'New Capability',
      desc: 'Deskripsi spesialisasi atau penawaran layanan.',
      desc_id: 'Deskripsi spesialisasi atau penawaran layanan.',
      desc_en: 'Description of your specialization or service offering.',
    };
    setForm({ ...form, services: [...current, newService] });
  };

  const handleDeleteService = (index: number) => {
    const updated = (form.services || []).filter((_, i) => i !== index);
    setForm({ ...form, services: updated });
  };

  const handleValueField = (
    index: number,
    field: 'label_id' | 'label_en' | 'quote_id' | 'quote_en',
    value: string
  ) => {
    const updated = [...(form.values || [])];
    if (field === 'label_id') {
      updated[index] = { ...updated[index], label_id: value, label: value };
    } else if (field === 'quote_id') {
      updated[index] = { ...updated[index], quote_id: value, quote: value };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    setForm({ ...form, values: updated });
  };

  const handleAddValue = () => {
    const current = form.values || [];
    const newValue: ValueItem = {
      label: 'Nilai Baru',
      label_id: 'Nilai Baru',
      label_en: 'New Value',
      quote: 'Pernyataan filosofi desain atau engineering.',
      quote_id: 'Pernyataan filosofi desain atau engineering.',
      quote_en: 'Statement reflecting your design/engineering philosophy.',
    };
    setForm({ ...form, values: [...current, newValue] });
  };

  const handleDeleteValue = (index: number) => {
    const updated = (form.values || []).filter((_, i) => i !== index);
    setForm({ ...form, values: updated });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const payload: Partial<AboutData> = {
        eyebrow: form.eyebrow_id || form.eyebrow,
        eyebrow_id: form.eyebrow_id || form.eyebrow,
        eyebrow_en: form.eyebrow_en || form.eyebrow_id || form.eyebrow,

        eyebrowHighlight: form.eyebrowHighlight_id || form.eyebrowHighlight,
        eyebrowHighlight_id: form.eyebrowHighlight_id || form.eyebrowHighlight,
        eyebrowHighlight_en: form.eyebrowHighlight_en || form.eyebrowHighlight_id || form.eyebrowHighlight,

        headline: form.headline_id || form.headline,
        headline_id: form.headline_id || form.headline,
        headline_en: form.headline_en || form.headline_id || form.headline,

        headlineHighlight: form.headlineHighlight_id || form.headlineHighlight,
        headlineHighlight_id: form.headlineHighlight_id || form.headlineHighlight,
        headlineHighlight_en: form.headlineHighlight_en || form.headlineHighlight_id || form.headlineHighlight,

        subtext: form.subtext_id || form.subtext,
        subtext_id: form.subtext_id || form.subtext,
        subtext_en: form.subtext_en || form.subtext_id || form.subtext,

        services: (form.services || []).map((s) => ({
          num: s.num,
          title: s.title_id || s.title,
          title_id: s.title_id || s.title,
          title_en: s.title_en || s.title_id || s.title,
          desc: s.desc_id || s.desc,
          desc_id: s.desc_id || s.desc,
          desc_en: s.desc_en || s.desc_id || s.desc,
        })),

        values: (form.values || []).map((v) => ({
          label: v.label_id || v.label,
          label_id: v.label_id || v.label,
          label_en: v.label_en || v.label_id || v.label,
          quote: v.quote_id || v.quote,
          quote_id: v.quote_id || v.quote,
          quote_en: v.quote_en || v.quote_id || v.quote,
        })),
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
            <User size={18} className="text-admin-primary" />
            <h2 className="text-xl sm:text-2xl font-display font-medium text-admin-text tracking-tight">
              {t('admin.about.title')}
            </h2>
          </div>
          <p className="text-xs text-admin-muted mt-1">
            {t('admin.about.subtitle')}
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
            <span>Terjemahkan Seluruh ID ➔ EN</span>
          </button>
        </div>
      </div>

      {/* Main Headline & Eyebrow Card */}
      <div className="p-6 bg-admin-card border border-admin-border rounded-2xl space-y-5 shadow-2xs">
        <h3 className="text-xs uppercase tracking-wider text-admin-primary font-bold">
          Header & Pengantar
        </h3>

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

        {/* Eyebrow */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs text-admin-text font-medium block">
              Teks Eyebrow
            </label>
            <input
              type="text"
              value={form.eyebrow_id ?? ''}
              onChange={(e) =>
                setForm({ ...form, eyebrow_id: e.target.value, eyebrow: e.target.value })
              }
              placeholder="mis. FULL-STACK DEVELOPER"
              className="w-full bg-admin-input border border-admin-border rounded-xl px-3.5 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-admin-text font-medium block">
              Eyebrow Text
            </label>
            <input
              type="text"
              value={form.eyebrow_en ?? ''}
              onChange={(e) => setForm({ ...form, eyebrow_en: e.target.value })}
              placeholder="e.g. FULL-STACK DEVELOPER"
              className="w-full bg-admin-input border border-admin-border rounded-xl px-3.5 py-2.5 text-sm text-admin-text focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-2xs transition-all"
            />
          </div>
        </div>

        {/* Eyebrow Highlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs text-admin-text font-medium block">
              Kata Sorotan Eyebrow
            </label>
            <input
              type="text"
              value={form.eyebrowHighlight_id ?? ''}
              onChange={(e) =>
                setForm({
                  ...form,
                  eyebrowHighlight_id: e.target.value,
                  eyebrowHighlight: e.target.value,
                })
              }
              placeholder="mis. NEXT.JS & LARAVEL"
              className="w-full bg-admin-input border border-admin-border rounded-xl px-3.5 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-admin-text font-medium block">
              Eyebrow Highlight Word
            </label>
            <input
              type="text"
              value={form.eyebrowHighlight_en ?? ''}
              onChange={(e) => setForm({ ...form, eyebrowHighlight_en: e.target.value })}
              placeholder="e.g. NEXT.JS & LARAVEL"
              className="w-full bg-admin-input border border-admin-border rounded-xl px-3.5 py-2.5 text-sm text-admin-text focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-2xs transition-all"
            />
          </div>
        </div>

        {/* Headline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs text-admin-text font-medium block">
              Judul Utama
            </label>
            <input
              type="text"
              value={form.headline_id ?? ''}
              onChange={(e) =>
                setForm({ ...form, headline_id: e.target.value, headline: e.target.value })
              }
              placeholder="mis. Membangun aplikasi web modern"
              className="w-full bg-admin-input border border-admin-border rounded-xl px-3.5 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-admin-text font-medium block">
              Headline Text
            </label>
            <input
              type="text"
              value={form.headline_en ?? ''}
              onChange={(e) => setForm({ ...form, headline_en: e.target.value })}
              placeholder="e.g. Building modern web applications"
              className="w-full bg-admin-input border border-admin-border rounded-xl px-3.5 py-2.5 text-sm text-admin-text focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-2xs transition-all"
            />
          </div>
        </div>

        {/* Headline Highlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs text-admin-text font-medium block">
              Kata Sorotan Judul
            </label>
            <input
              type="text"
              value={form.headlineHighlight_id ?? ''}
              onChange={(e) =>
                setForm({
                  ...form,
                  headlineHighlight_id: e.target.value,
                  headlineHighlight: e.target.value,
                })
              }
              placeholder="mis. & terukur."
              className="w-full bg-admin-input border border-admin-border rounded-xl px-3.5 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-admin-text font-medium block">
              Headline Highlight Word
            </label>
            <input
              type="text"
              value={form.headlineHighlight_en ?? ''}
              onChange={(e) => setForm({ ...form, headlineHighlight_en: e.target.value })}
              placeholder="e.g. & scalable."
              className="w-full bg-admin-input border border-admin-border rounded-xl px-3.5 py-2.5 text-sm text-admin-text focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-2xs transition-all"
            />
          </div>
        </div>

        {/* Subtext */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs text-admin-text font-medium block">
              Paragraf Penjelasan Utama
            </label>
            <textarea
              rows={3}
              value={form.subtext_id ?? ''}
              onChange={(e) =>
                setForm({ ...form, subtext_id: e.target.value, subtext: e.target.value })
              }
              placeholder="Spesialisasi dalam pengembangan web end-to-end..."
              className="w-full bg-admin-input border border-admin-border rounded-xl px-3.5 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs resize-none transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-admin-text font-medium block">
              Main Subtext Paragraph
            </label>
            <textarea
              rows={3}
              value={form.subtext_en ?? ''}
              onChange={(e) => setForm({ ...form, subtext_en: e.target.value })}
              placeholder="Specializing in end-to-end web development..."
              className="w-full bg-admin-input border border-admin-border rounded-xl px-3.5 py-2.5 text-sm text-admin-text focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-2xs resize-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="p-6 bg-admin-card border border-admin-border rounded-2xl space-y-5 shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers size={16} className="text-admin-primary" />
            <h3 className="text-xs uppercase tracking-wider text-admin-text font-bold">
              Layanan & Keahlian Utama (Services)
            </h3>
          </div>
          <button
            type="button"
            onClick={handleAddService}
            className="flex items-center gap-1.5 text-xs bg-admin-surface hover:bg-admin-surface-hover text-admin-text px-3 py-1.5 rounded-lg border border-admin-border transition-colors font-medium"
          >
            <Plus size={14} className="text-admin-primary" /> Tambah Layanan
          </button>
        </div>

        <div className="space-y-4">
          {(form.services || []).map((service, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-admin-surface/70 border border-admin-border space-y-3 shadow-2xs"
            >
              {/* Card top bar */}
              <div className="flex items-center justify-between gap-3 pb-2 border-b border-admin-border/60">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-admin-muted uppercase">No.</span>
                  <input
                    type="text"
                    placeholder="01"
                    value={service.num}
                    onChange={(e) => handleServiceField(idx, 'num', e.target.value)}
                    className="w-12 bg-admin-input border border-admin-border rounded-lg px-2 py-1 text-xs text-admin-primary font-bold text-center focus:outline-none focus:border-admin-primary"
                  />
                  <span className="text-xs font-semibold text-admin-text ml-1">
                    Layanan #{idx + 1}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteService(idx)}
                  className="p-1.5 text-red-500 hover:text-red-600 hover:bg-red-50/20 rounded-lg transition-colors"
                  title="Hapus Layanan"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              {/* Service Title */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-admin-text block">
                    Judul Layanan (ID)
                  </label>
                  <input
                    type="text"
                    placeholder="mis. Frontend & Next.js"
                    value={service.title_id || service.title || ''}
                    onChange={(e) => handleServiceField(idx, 'title_id', e.target.value)}
                    className="w-full bg-admin-input border border-admin-border rounded-lg px-3 py-2 text-xs text-admin-text font-medium focus:outline-none focus:border-admin-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-admin-text block">
                    Service Title (EN)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Frontend & Next.js"
                    value={service.title_en || ''}
                    onChange={(e) => handleServiceField(idx, 'title_en', e.target.value)}
                    className="w-full bg-admin-input border border-admin-border rounded-lg px-3 py-2 text-xs text-admin-text font-medium focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Service Description */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-admin-text block">
                    Deskripsi Layanan (ID)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Deskripsi layanan dan teknologi yang digunakan..."
                    value={service.desc_id || service.desc || ''}
                    onChange={(e) => handleServiceField(idx, 'desc_id', e.target.value)}
                    className="w-full bg-admin-input border border-admin-border rounded-lg p-2.5 text-xs text-admin-text focus:outline-none focus:border-admin-primary resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-admin-text block">
                    Service Description (EN)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Service description and key tech stack..."
                    value={service.desc_en || ''}
                    onChange={(e) => handleServiceField(idx, 'desc_en', e.target.value)}
                    className="w-full bg-admin-input border border-admin-border rounded-lg p-2.5 text-xs text-admin-text focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="p-6 bg-admin-card border border-admin-border rounded-2xl space-y-5 shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass size={16} className="text-admin-primary" />
            <h3 className="text-xs uppercase tracking-wider text-admin-text font-bold">
              Filosofi & Nilai Kerja (Values)
            </h3>
          </div>
          <button
            type="button"
            onClick={handleAddValue}
            className="flex items-center gap-1.5 text-xs bg-admin-surface hover:bg-admin-surface-hover text-admin-text px-3 py-1.5 rounded-lg border border-admin-border transition-colors font-medium"
          >
            <Plus size={14} className="text-admin-primary" /> Tambah Nilai
          </button>
        </div>

        <div className="space-y-4">
          {(form.values || []).map((val, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-admin-surface/70 border border-admin-border space-y-3 shadow-2xs"
            >
              <div className="flex items-center justify-between pb-2 border-b border-admin-border/60">
                <span className="text-xs font-semibold text-admin-text">
                  Nilai Kerja #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleDeleteValue(idx)}
                  className="p-1.5 text-red-500 hover:text-red-600 hover:bg-red-50/20 rounded-lg transition-colors"
                  title="Hapus Nilai"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              {/* Value Label */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-admin-text block">
                    Label Nilai (ID)
                  </label>
                  <input
                    type="text"
                    placeholder="mis. Pendekatan, Nilai Kerja, Mindset"
                    value={val.label_id || val.label || ''}
                    onChange={(e) => handleValueField(idx, 'label_id', e.target.value)}
                    className="w-full bg-admin-input border border-admin-border rounded-lg px-3 py-2 text-xs text-admin-text font-medium focus:outline-none focus:border-admin-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-admin-text block">
                    Value Label (EN)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Approach, Values, Mindset"
                    value={val.label_en || ''}
                    onChange={(e) => handleValueField(idx, 'label_en', e.target.value)}
                    className="w-full bg-admin-input border border-admin-border rounded-lg px-3 py-2 text-xs text-admin-text font-medium focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Value Quote */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-admin-text block">
                    Kutipan Filosofi (ID)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Kutipan atau pernyataan filosofi engineering..."
                    value={val.quote_id || val.quote || ''}
                    onChange={(e) => handleValueField(idx, 'quote_id', e.target.value)}
                    className="w-full bg-admin-input border border-admin-border rounded-lg p-2.5 text-xs text-admin-text focus:outline-none focus:border-admin-primary resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-admin-text block">
                    Philosophical Quote (EN)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Philosophical quote or statement..."
                    value={val.quote_en || ''}
                    onChange={(e) => handleValueField(idx, 'quote_en', e.target.value)}
                    className="w-full bg-admin-input border border-admin-border rounded-lg p-2.5 text-xs text-admin-text focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 bg-admin-primary text-admin-primary-fg font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-xl hover:bg-admin-primary-hover transition-all shadow-sm disabled:opacity-50"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {t('admin.about.save')}
        </button>
      </div>
    </motion.form>
  );
}
