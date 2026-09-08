'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2, Layers } from 'lucide-react';
import { QuickInfoRow } from '@/context/portfolio-context';

interface TabQuickInfoProps {
  quickInfo: QuickInfoRow[];
  onSave: (rows: QuickInfoRow[]) => Promise<void>;
}

export default function TabQuickInfo({ quickInfo, onSave }: TabQuickInfoProps) {
  const [rows, setRows] = useState<QuickInfoRow[]>(quickInfo);

  useEffect(() => {
    setRows(quickInfo);
  }, [quickInfo]);

  const handleChange = (index: number, field: 'label' | 'value', val: string) => {
    const updated = [...rows];
    updated[index][field] = val;
    setRows(updated);
  };

  const handleAdd = () => {
    setRows([...rows, { label: 'New Label', value: 'New Value' }]);
  };

  const handleDelete = (index: number) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(rows);
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
            <Layers size={18} className="text-admin-primary" />
            <h2 className="text-xl sm:text-2xl font-display font-medium text-admin-text tracking-tight">
              Quick Info Drawer Rows
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-admin-surface text-admin-muted border border-admin-border font-medium">
              {rows.length} rows
            </span>
          </div>
          <p className="text-xs text-admin-muted mt-1">
            Manage key-value metadata pairs displayed in the vertical sliding drawer.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-admin-surface hover:bg-admin-surface-hover text-xs text-admin-text border border-admin-border shadow-2xs transition-colors self-start sm:self-auto font-medium"
        >
          <Plus size={14} className="text-admin-primary" />
          <span>Add Row</span>
        </button>
      </div>

      <div className="space-y-3 pt-1">
        {rows.map((row, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 p-3 rounded-xl bg-admin-surface border border-admin-border shadow-2xs transition-colors"
          >
            <input
              type="text"
              placeholder="Label (e.g. Based in)"
              value={row.label}
              onChange={(e) => handleChange(idx, 'label', e.target.value)}
              className="w-1/3 min-w-[120px] bg-admin-input border border-admin-border rounded-lg px-3.5 py-2.5 text-xs uppercase tracking-wide text-admin-text font-medium focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs transition-all"
            />
            <input
              type="text"
              placeholder="Value (e.g. Tegal, Indonesia)"
              value={row.value}
              onChange={(e) => handleChange(idx, 'value', e.target.value)}
              className="flex-1 min-w-0 bg-admin-input border border-admin-border rounded-lg px-3.5 py-2.5 text-xs text-admin-text font-medium focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary shadow-2xs transition-all"
            />
            <button
              type="button"
              onClick={() => handleDelete(idx)}
              className="p-2 text-red-500 hover:text-red-700 hover:bg-red-500/10 rounded-lg transition-colors shrink-0"
              title="Delete row"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          className="flex items-center gap-2 bg-admin-primary text-admin-primary-fg font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-xl hover:bg-admin-primary-hover transition-all shadow-sm"
        >
          <Save size={16} /> Save Quick Info
        </button>
      </div>
    </motion.form>
  );
}
