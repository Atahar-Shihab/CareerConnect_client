'use client';

import { motion } from 'framer-motion';
import { Target, Layers, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const stack = ['Next.js 14', 'Express', 'MongoDB', 'Google Gemini AI', 'Stripe'];

  return (
    <div className="space-y-16 pb-20 pt-8 max-w-4xl mx-auto px-4">
      
      {/* HEADER */}
      <section className="text-center space-y-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-heading font-extrabold text-pine"
        >
          About <span className="text-marigold">CareerConnect</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-moss-dark font-medium max-w-2xl mx-auto"
        >
          Bridging the gap between university campuses and the tech industry.
        </motion.p>
      </section>

      {/* MISSION SECTION */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="pin-card-yellow p-8 rounded-3xl pin-shadow relative"
      >
        <h2 className="text-2xl font-heading font-extrabold text-pine mb-4 flex items-center gap-2">
          <Target className="w-6 h-6 text-marigold" /> Our Mission
        </h2>
        <p className="text-pine/80 leading-relaxed font-medium">
          CareerConnect is dedicated to connecting campus talent across Bangladesh with premier tech opportunities. We aim to reduce the friction in early-career hiring by leveraging AI to match students with the right roles based on their actual skills, not just their degrees.
        </p>
      </motion.section>

      {/* HOW IT WORKS SECTION */}
      <section className="space-y-6">
        <h2 className="text-2xl font-heading font-extrabold text-pine text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6 rounded-2xl border border-moss-light text-center space-y-3 pin-shadow"
          >
            <div className="w-12 h-12 rounded-full bg-amber-50 mx-auto flex items-center justify-center border border-amber-200 shadow-sm">
              <Target className="w-6 h-6 text-marigold" />
            </div>
            <h3 className="font-extrabold text-pine">Browse</h3>
            <p className="text-xs text-moss-dark font-medium">Explore tech roles posted by top local companies.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6 rounded-2xl border border-moss-light text-center space-y-3 pin-shadow"
          >
            <div className="w-12 h-12 rounded-full bg-amber-50 mx-auto flex items-center justify-center border border-amber-200 shadow-sm">
              <Zap className="w-6 h-6 text-amber-500" />
            </div>
            <h3 className="font-extrabold text-pine">AI Match</h3>
            <p className="text-xs text-moss-dark font-medium">Gemini AI evaluates your skills and gives you a match score.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-6 rounded-2xl border border-moss-light text-center space-y-3 pin-shadow"
          >
            <div className="w-12 h-12 rounded-full bg-amber-50 mx-auto flex items-center justify-center border border-amber-200 shadow-sm">
              <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            </div>
            <h3 className="font-extrabold text-pine">Apply</h3>
            <p className="text-xs text-moss-dark font-medium">1-Click generate a tailored cover letter and apply instantly.</p>
          </motion.div>
        </div>
      </section>

      {/* TECH STACK SECTION */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="pin-card-green p-8 rounded-3xl pin-shadow text-center"
      >
        <h2 className="text-2xl font-heading font-extrabold text-pine mb-6 flex items-center justify-center gap-2">
          <Layers className="w-6 h-6 text-emerald-600" /> Powered By Modern Tech
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {stack.map((tech, idx) => (
            <span key={idx} className="bg-white text-pine font-bold text-sm px-4 py-2 rounded-full shadow-sm border border-emerald-100">
              {tech}
            </span>
          ))}
        </div>
      </motion.section>

      {/* CTA */}
      <div className="text-center pt-8">
        <Link href="/register" className="btn-pin-primary text-lg inline-flex items-center gap-2">
          Join the Platform <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

    </div>
  );
}
