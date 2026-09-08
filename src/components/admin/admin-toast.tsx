'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface AdminToastProps {
  message: string | null;
}

export default function AdminToast({ message }: AdminToastProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.96 }}
          className="fixed top-5 right-6 z-50 px-4 py-3 rounded-xl bg-admin-card border border-admin-border text-admin-text font-medium text-xs shadow-lg flex items-center gap-2.5 transition-colors"
        >
          <div className="w-5 h-5 rounded-full bg-admin-badge-bg text-admin-badge-text flex items-center justify-center shrink-0">
            <CheckCircle2 size={13} className="stroke-[2.5]" />
          </div>
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

