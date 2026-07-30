'use client';

import Link from 'next/link';
import { Pin, Heart, Globe, Mail, ArrowUpRight, Code2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-moss-light/80 bg-white/60 backdrop-blur-md pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-6 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* COLUMN 1: BRAND INFO */}
          <div className="space-y-3 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-pine flex items-center justify-center text-marigold shadow-md">
                <Pin className="w-4 h-4 fill-marigold" />
              </div>
              <span className="font-heading font-black text-xl text-pine tracking-tight">CareerConnect</span>
            </Link>
            <p className="text-xs text-moss-dark font-medium leading-relaxed">
              Your bridge from campus to career. Connecting Bangladeshi university students with top tech opportunities using Google Gemini 2.5 Pro AI.
            </p>
          </div>

          {/* COLUMN 2: QUICK NAVIGATION */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase text-pine tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs font-bold text-moss-dark">
              <li>
                <Link href="/" className="hover:text-pine transition-colors flex items-center gap-1">
                  Home <ArrowUpRight className="w-3 h-3 text-marigold" />
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="hover:text-pine transition-colors flex items-center gap-1">
                  Campus Job Board <ArrowUpRight className="w-3 h-3 text-marigold" />
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-pine transition-colors flex items-center gap-1">
                  Dashboard & AI Studio <ArrowUpRight className="w-3 h-3 text-marigold" />
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-pine transition-colors flex items-center gap-1">
                  Student / Employer Login <ArrowUpRight className="w-3 h-3 text-marigold" />
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: UNIVERSITY NETWORK */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase text-pine tracking-wider">Connected Campuses</h4>
            <div className="flex flex-wrap gap-1.5 text-[11px] font-bold">
              {['BRAC University', 'BUET', 'Dhaka University', 'North South University', 'IUT'].map((uni, idx) => (
                <span key={idx} className="bg-moss-light/70 text-pine px-2.5 py-1 rounded-md border border-moss/20">
                  🎓 {uni}
                </span>
              ))}
            </div>
          </div>

          {/* COLUMN 4: AUTHOR & LINKS */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase text-pine tracking-wider">Developed By</h4>
            <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200 space-y-2">
              <p className="text-xs font-extrabold text-pine">Atahar Shihab</p>
              <p className="text-[11px] text-moss-dark font-medium">Full Stack Web & AI Software Engineer</p>
              <div className="flex items-center gap-2 pt-1">
                <a 
                  href="https://github.com/Atahar-Shihab" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-lg bg-pine text-white flex items-center justify-center hover:bg-pine-light transition-colors"
                  title="GitHub Profile"
                >
                  <Code2 className="w-3.5 h-3.5" />
                </a>
                <a 
                  href="https://atahar-shihab-portfolio.vercel.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-lg bg-marigold text-pine flex items-center justify-center hover:bg-marigold-hover transition-colors"
                  title="Portfolio Website"
                >
                  <Globe className="w-3.5 h-3.5" />
                </a>
                <a 
                  href="mailto:shihabatahar@gmail.com" 
                  className="w-7 h-7 rounded-lg bg-moss-light text-pine flex items-center justify-center hover:bg-moss/40 transition-colors"
                  title="Contact Email"
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="pt-6 border-t border-moss-light/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold text-moss-dark">
          <p>© {new Date().getFullYear()} CareerConnect BD Campus. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> by <span className="font-extrabold text-pine">Atahar Shihab</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
