'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Pin, Home, Briefcase, User, Sparkles, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="pin-card-yellow p-10 sm:p-12 rounded-3xl pin-shadow w-full max-w-xl text-center space-y-6 relative border border-amber-300"
      >
        {/* Floating Pushpin Accent */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-red-500">
          <motion.div
            animate={{ rotate: [10, -10, 10], y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          >
            <Pin className="w-12 h-12 fill-red-500 drop-shadow-md" />
          </motion.div>
        </div>

        {/* 404 Number Badge */}
        <div className="pt-4 space-y-2">
          <span className="inline-flex items-center gap-1.5 bg-pine text-marigold font-heading font-black text-xs px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 fill-marigold" /> Error 404 — Pinned Page Missing
          </span>
          <h1 className="text-6xl sm:text-7xl font-heading font-black text-pine tracking-tight">
            404
          </h1>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-heading font-extrabold text-pine">
            Lost on Campus?
          </h2>
          <p className="text-moss-dark font-medium text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            The page you are looking for has been moved, renamed, or unpinned from our university bulletin board.
          </p>
        </div>

        {/* Quick Shortcut Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/" className="btn-pin-primary text-xs py-3 px-6 w-full sm:w-auto inline-flex items-center justify-center gap-2">
            <Home className="w-4 h-4" /> Return to Home
          </Link>
          <Link href="/jobs" className="btn-pin-secondary text-xs py-3 px-6 w-full sm:w-auto inline-flex items-center justify-center gap-2">
            <Briefcase className="w-4 h-4 text-marigold" /> Explore Campus Jobs
          </Link>
        </div>

        <div className="pt-4 border-t border-amber-200/80">
          <Link href="/dashboard" className="text-xs font-bold text-moss-dark hover:text-pine inline-flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
