'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Pin, Briefcase, Sparkles, LogOut, LayoutDashboard, Home, User as UserIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import ThemeSwitcher from './ThemeSwitcher';

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  return (
    <header className="sticky top-4 z-50 max-w-7xl mx-auto px-4 mb-8">
      <div className="glass-card rounded-full px-6 py-3.5 pin-shadow flex items-center justify-between border border-white/70 shadow-lg backdrop-blur-xl">
        
        {/* BRAND LOGO */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pine via-pine-light to-pine flex items-center justify-center text-marigold shadow-md group-hover:rotate-12 transition-transform duration-300">
            <Pin className="w-5 h-5 fill-marigold" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-black text-2xl text-pine tracking-tight">CareerConnect</span>
              <span className="bg-marigold/20 text-pine-dark text-[9px] font-black uppercase px-2 py-0.5 rounded-full border border-marigold/30">
                BD Campus
              </span>
            </div>
          </div>
        </Link>

        {/* CENTER NAVIGATION PILL DOCK */}
        <nav className="hidden md:flex items-center gap-1 bg-moss-light/60 p-1.5 rounded-full border border-moss/20 shadow-inner">
          <Link 
            href="/" 
            className={`px-5 py-2 rounded-full text-xs font-extrabold transition-all relative ${pathname === '/' ? 'text-pine' : 'text-moss-dark hover:text-pine'}`}
          >
            {pathname === '/' && (
              <motion.div layoutId="nav-bg" className="absolute inset-0 bg-white rounded-full shadow-md" transition={{ type: 'spring', duration: 0.5 }} />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-marigold" /> Home
            </span>
          </Link>

          <Link 
            href="/jobs" 
            className={`px-5 py-2 rounded-full text-xs font-extrabold transition-all relative ${pathname.startsWith('/jobs') ? 'text-pine' : 'text-moss-dark hover:text-pine'}`}
          >
            {pathname.startsWith('/jobs') && (
              <motion.div layoutId="nav-bg" className="absolute inset-0 bg-white rounded-full shadow-md" transition={{ type: 'spring', duration: 0.5 }} />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-marigold" /> Explore Jobs
            </span>
          </Link>

          {user && (
            <Link 
              href="/dashboard" 
              className={`px-5 py-2 rounded-full text-xs font-extrabold transition-all relative ${pathname === '/dashboard' ? 'text-pine' : 'text-moss-dark hover:text-pine'}`}
            >
              {pathname === '/dashboard' && (
                <motion.div layoutId="nav-bg" className="absolute inset-0 bg-white rounded-full shadow-md" transition={{ type: 'spring', duration: 0.5 }} />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-pine" /> Dashboard
              </span>
            </Link>
          )}
        </nav>

        {/* RIGHT ACTION CONTROLS & THEMES */}
        <div className="flex items-center gap-3 shrink-0">
          <ThemeSwitcher />

          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden lg:flex flex-col text-right">
                <span className="text-xs font-extrabold text-pine line-clamp-1">{user.name}</span>
                <span className="text-[9px] uppercase tracking-widest font-black text-marigold-hover">
                  {user.role}
                </span>
              </div>
              
              <button 
                onClick={logout}
                className="w-9 h-9 rounded-full bg-moss-light text-pine flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-colors shadow-sm"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login" className="px-4 py-2 rounded-full text-xs font-extrabold text-pine hover:bg-pine/5 transition-colors">
                Log In
              </Link>
              <Link href="/register" className="btn-pin-primary text-xs py-2 px-5">
                Join Now
              </Link>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
