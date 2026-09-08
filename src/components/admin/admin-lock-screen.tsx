'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock, ShieldCheck, ArrowLeft } from 'lucide-react';

interface AdminLockScreenProps {
  onUnlock: () => void;
}

export default function AdminLockScreen({ onUnlock }: AdminLockScreenProps) {
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetPin = process.env.NEXT_PUBLIC_ADMIN_PIN || '123456';
    if (pinInput.trim() === targetPin) {
      setPinError(false);
      onUnlock();
    } else {
      setPinError(true);
    }
  };

  return (
    <div className="min-h-screen bg-admin-bg text-admin-text flex items-center justify-center p-6 relative overflow-hidden transition-colors duration-200">
      {/* Subtle decorative background grid / radial tint */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-admin-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md bg-admin-card border border-admin-border rounded-2xl p-8 shadow-xl space-y-6 transition-colors duration-200"
      >
        <div className="w-14 h-14 rounded-xl bg-admin-badge-bg text-admin-badge-text border border-admin-badge-border flex items-center justify-center mx-auto shadow-2xs">
          <Lock size={26} className="stroke-[2.2]" />
        </div>

        <div className="text-center space-y-1.5">
          <h1 className="text-2xl font-display font-medium text-admin-text tracking-tight">
            Portfolio CMS Lock
          </h1>
          <p className="text-xs text-admin-muted">
            Enter security PIN to edit live content &amp; Supabase DB.
          </p>
        </div>

        <form onSubmit={handlePinSubmit} className="space-y-4 pt-1">
          <div className="relative">
            <input
              type="password"
              placeholder="••••••"
              value={pinInput}
              onChange={(e) => {
                setPinInput(e.target.value);
                if (pinError) setPinError(false);
              }}
              className="w-full bg-admin-input border border-admin-border rounded-xl px-4 py-3.5 text-center text-2xl tracking-[0.4em] text-admin-text placeholder:text-admin-subtle focus:outline-none focus:bg-admin-card focus:border-admin-primary focus:ring-1 focus:ring-admin-primary transition-all shadow-2xs"
            />
            {pinError && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-500 text-center mt-2 font-medium"
              >
                Incorrect PIN. Please try again.
              </motion.p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-admin-primary text-admin-primary-fg font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl hover:bg-admin-primary-hover active:scale-[0.99] transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <ShieldCheck size={17} /> Unlock Dashboard
          </button>
        </form>

        <div className="text-center pt-2 border-t border-admin-border">
          <Link
            href="/"
            className="text-xs text-admin-muted hover:text-admin-text inline-flex items-center gap-1.5 transition-colors font-medium"
          >
            <ArrowLeft size={14} /> Return to Public Portfolio
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

