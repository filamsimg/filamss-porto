'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2, Layers, Sparkles, User } from 'lucide-react';
import { AboutData, ServiceItem, ValueItem } from '@/context/portfolio-context';

interface TabAboutProps {
  about: AboutData;
  onSave: (data: Partial<AboutData>) => Promise<void>;
}

export default function TabAbout({ about, onSave }: TabAboutProps) {
  const [form, setForm] = useState<AboutData>(about);

  useEffect(() => {
    setForm(about);
  }, [about]);

  // Services handlers
  const handleServiceChange = (index: number, field: keyof ServiceItem, value: string) => {
    const updated = [...(form.services || [])];
    updated[index] = { ...updated[index], [field]: value };
    setForm({ ...form, services: updated });
  };

  const handleAddService = () => {
    const current = form.services || [];
    const nextNum = String(current.length + 1).padStart(2, '0');
    const newService: ServiceItem = {
      num: nextNum,
      title: 'New Capability',
      desc: 'Description of your specialization or service offering.',
    };
    setForm({ ...form, services: [...current, newService] });
  };

  const handleDeleteService = (index: number) => {
    const updated = (form.services || []).filter((_, i) => i !== index);
    setForm({ ...form, services: updated });
  };

  // Values handlers
  const handleValueChange = (index: number, field: keyof ValueItem, value: string) => {
    const updated = [...(form.values || [])];
    updated[index] = { ...updated[index], [field]: value };
    setForm({ ...form, values: updated });
  };

  const handleAddValue = () => {
    const current = form.values || [];
    const newValue: ValueItem = {
      label: 'New Value',
      quote: 'Statement reflecting your design/engineering philosophy.',
    };
    setForm({ ...form, values: [...current, newValue] });
  };

  const handleDeleteValue = (index: number) => {
    const updated = (form.values || []).filter((_, i) => i !== index);
    setForm({ ...form, values: updated });
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
            <User size={18} className="text-admin-primary" />
            <h2 className="text-xl sm:text-2xl font-display font-medium text-admin-text tracking-tight">
              About &amp; Capabilities
            </h2>
          </div>
          <p className="text-xs text-admin-muted mt-1">
            Configure page headers, core service offerings, and personal engineering values.
          </p>
        </div>
      </div>

      {/* Main Headline & Eyebrow */}
      <div className="p-5 bg-admin-card border border-admin-border rounded-2xl space-y-5 shadow-2xs">
        <h3 className="text-xs uppercase tracking-wider text-admin-primary font-bold">
          Header &amp; Introduction
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-wider text-admin-text font-semibold">
              Eyebrow Text
            </label>
            <input
              type="text"
              value={form.eyebrow || ''}
              onChange={(e) => setForm({ ...form, eyebrow: e.target.value })}
              className="w-full bg-admin-input border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-wider text-admin-text font-semibold">
              Eyebrow Highlight Word
            </label>
            <input
              type="text"
              value={form.eyebrowHighlight || ''}
              onChange={(e) => setForm({ ...form, eyebrowHighlight: e.target.value })}
              className="w-full bg-admin-input border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-wider text-admin-text font-semibold">
              Headline Text
            </label>
            <input
              type="text"
              value={form.headline || ''}
              onChange={(e) => setForm({ ...form, headline: e.target.value })}
              className="w-full bg-admin-input border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-wider text-admin-text font-semibold">
              Headline Highlight Word
            </label>
            <input
              type="text"
              value={form.headlineHighlight || ''}
              onChange={(e) => setForm({ ...form, headlineHighlight: e.target.value })}
              className="w-full bg-admin-input border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs uppercase tracking-wider text-admin-text font-semibold">
            Main Subtext Paragraph
          </label>
          <textarea
            rows={2}
            value={form.subtext || ''}
            onChange={(e) => setForm({ ...form, subtext: e.target.value })}
            className="w-full bg-admin-input border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs resize-none transition-all"
          />
        </div>
      </div>

      {/* Services / Capabilities Section */}
      <div className="p-5 bg-admin-card border border-admin-border rounded-2xl space-y-5 shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers size={16} className="text-admin-primary" />
            <h3 className="text-xs uppercase tracking-wider text-admin-text font-bold">
              Core Capabilities / Services
            </h3>
          </div>
          <button
            type="button"
            onClick={handleAddService}
            className="flex items-center gap-1.5 text-xs bg-admin-surface hover:bg-admin-surface-hover text-admin-text px-3 py-1.5 rounded-lg border border-admin-border transition-colors font-medium"
          >
            <Plus size={14} className="text-admin-primary" /> Add Service
          </button>
        </div>

        <div className="space-y-3">
          {(form.services || []).map((service, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-admin-surface/70 border border-admin-border space-y-3 shadow-2xs"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 w-full">
                  <input
                    type="text"
                    placeholder="01"
                    value={service.num}
                    onChange={(e) => handleServiceChange(idx, 'num', e.target.value)}
                    className="w-14 bg-admin-input border border-admin-border rounded-lg px-2.5 py-1.5 text-xs text-admin-primary font-bold text-center focus:outline-none focus:border-admin-primary"
                  />
                  <input
                    type="text"
                    placeholder="Service Title (e.g. Frontend & Next.js)"
                    value={service.title}
                    onChange={(e) => handleServiceChange(idx, 'title', e.target.value)}
                    className="flex-1 bg-admin-input border border-admin-border rounded-lg px-3 py-1.5 text-sm text-admin-text font-medium focus:outline-none focus:border-admin-primary"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteService(idx)}
                  className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50/20 rounded-lg transition-colors"
                  title="Delete Service"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <textarea
                rows={2}
                placeholder="Service description and key tech stack..."
                value={service.desc}
                onChange={(e) => handleServiceChange(idx, 'desc', e.target.value)}
                className="w-full bg-admin-input border border-admin-border rounded-lg p-2.5 text-xs text-admin-text focus:outline-none focus:border-admin-primary resize-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Philosophy & Values Section */}
      <div className="p-5 bg-admin-card border border-admin-border rounded-2xl space-y-5 shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-admin-primary" />
            <h3 className="text-xs uppercase tracking-wider text-admin-text font-bold">
              Philosophy &amp; Values
            </h3>
          </div>
          <button
            type="button"
            onClick={handleAddValue}
            className="flex items-center gap-1.5 text-xs bg-admin-surface hover:bg-admin-surface-hover text-admin-text px-3 py-1.5 rounded-lg border border-admin-border transition-colors font-medium"
          >
            <Plus size={14} className="text-admin-primary" /> Add Value
          </button>
        </div>

        <div className="space-y-3">
          {(form.values || []).map((val, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-admin-surface/70 border border-admin-border space-y-3 shadow-2xs"
            >
              <div className="flex items-center justify-between gap-3">
                <input
                  type="text"
                  placeholder="Label (e.g. Approach, Values, Mindset)"
                  value={val.label}
                  onChange={(e) => handleValueChange(idx, 'label', e.target.value)}
                  className="w-1/2 bg-admin-input border border-admin-border rounded-lg px-3 py-1.5 text-xs uppercase tracking-wide text-admin-text font-medium focus:outline-none focus:border-admin-primary"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteValue(idx)}
                  className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50/20 rounded-lg transition-colors"
                  title="Delete Value"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <textarea
                rows={2}
                placeholder="Philosophical quote or statement..."
                value={val.quote}
                onChange={(e) => handleValueChange(idx, 'quote', e.target.value)}
                className="w-full bg-admin-input border border-admin-border rounded-lg p-2.5 text-xs text-admin-text focus:outline-none focus:border-admin-primary resize-none"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          className="flex items-center gap-2 bg-admin-primary text-admin-primary-fg font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-xl hover:bg-admin-primary-hover transition-all shadow-sm"
        >
          <Save size={16} /> Save About &amp; Services
        </button>
      </div>
    </motion.form>
  );
}
