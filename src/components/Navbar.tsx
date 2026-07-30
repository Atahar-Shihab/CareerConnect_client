'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Pin, Briefcase, Sparkles, LogOut, Home, Menu, X, ChevronDown, Plus, List, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import ThemeSwitcher from './ThemeSwitcher';

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-3 z-50 max-w-7xl mx-auto px-3 sm:px-6 mb-6 sm:mb-8">
      <div className="glass-card rounded-full px-4 sm:px-6 py-3 pin-shadow flex items-center justify-between border border-white/70 shadow-lg backdrop-blur-xl">
        
        {/* BRAND LOGO */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-pine via-pine-light to-pine flex items-center justify-center text-marigold shadow-md">
            <Pin className="w-4 h-4 sm:w-5 sm:h-5 fill-marigold" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-heading font-black text-lg sm:text-2xl text-pine tracking-tight">CareerConnect</span>
              <span className="hidden sm:inline-block bg-marigold/20 text-pine-dark text-[9px] font-black uppercase px-2 py-0.5 rounded-full border border-marigold/30">
                BD Campus
              </span>
            </div>
          </div>
        </Link>

        {/* DESKTOP CENTER NAVIGATION DOCK */}
        <nav className="hidden md:flex items-center gap-1 bg-moss-light/60 p-1.5 rounded-full border border-moss/20 shadow-inner">
          <Link 
            href="/" 
            className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition-all relative ${pathname === '/' ? 'text-pine' : 'text-moss-dark hover:text-pine'}`}
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
            className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition-all relative ${pathname.startsWith('/jobs') ? 'text-pine' : 'text-moss-dark hover:text-pine'}`}
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
              className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition-all relative ${pathname === '/dashboard' ? 'text-pine' : 'text-moss-dark hover:text-pine'}`}
            >
              {pathname === '/dashboard' && (
                <motion.div layoutId="nav-bg" className="absolute inset-0 bg-white rounded-full shadow-md" transition={{ type: 'spring', duration: 0.5 }} />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-pine" /> Dashboard
              </span>
            </Link>
          )}

          {/* MORE DROPDOWN */}
          <div className="relative" ref={moreRef}>
            <button
              onClick={() => setMoreMenuOpen(!moreMenuOpen)}
              className="px-4 py-1.5 rounded-full text-xs font-extrabold transition-all text-moss-dark hover:text-pine flex items-center gap-1.5"
            >
              More <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {moreMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.95 }}
                  className="absolute left-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-2xl p-2 shadow-xl border border-moss-light z-50 space-y-1"
                >
                  <Link 
                    href="/items/add" 
                    onClick={() => setMoreMenuOpen(false)}
                    className="w-full px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 text-pine hover:bg-moss-light/40 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5 text-marigold" /> Add Listing
                  </Link>
                  <Link 
                    href="/items/manage" 
                    onClick={() => setMoreMenuOpen(false)}
                    className="w-full px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 text-pine hover:bg-moss-light/40 transition-colors"
                  >
                    <List className="w-3.5 h-3.5 text-marigold" /> Manage Listings
                  </Link>
                  <Link 
                    href="/about" 
                    onClick={() => setMoreMenuOpen(false)}
                    className="w-full px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 text-pine hover:bg-moss-light/40 transition-colors"
                  >
                    <Info className="w-3.5 h-3.5 text-marigold" /> About
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* RIGHT ACTION CONTROLS & THEME SWITCHER */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <ThemeSwitcher />

          {/* Desktop User Info */}
          {user ? (
            <div className="hidden md:flex items-center gap-3">
              <div className="flex flex-col text-right">
                <span className="text-xs font-extrabold text-pine line-clamp-1">{user.name}</span>
                <span className="text-[9px] uppercase tracking-widest font-black text-marigold-hover">
                  {user.role}
                </span>
              </div>
              
              <button 
                onClick={logout}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-moss-light text-pine flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-colors shadow-sm"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/login" className="px-3 py-1.5 rounded-full text-xs font-extrabold text-pine hover:bg-pine/5 transition-colors">
                Log In
              </Link>
              <Link href="/register" className="btn-pin-primary text-xs py-1.5 px-4">
                Join Now
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-full bg-moss-light text-pine flex items-center justify-center border border-moss/20"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-pine" /> : <Menu className="w-5 h-5 text-pine" />}
          </button>
        </div>

      </div>

      {/* MOBILE DRAWER NAVIGATION MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="md:hidden mt-2 bg-white/95 backdrop-blur-2xl rounded-3xl p-5 border border-moss-light pin-shadow space-y-4"
          >
            <div className="flex flex-col space-y-2">
              <Link 
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`p-3 rounded-xl text-xs font-extrabold flex items-center gap-2.5 transition-colors ${pathname === '/' ? 'bg-pine text-white' : 'text-pine hover:bg-moss-light/50'}`}
              >
                <Home className="w-4 h-4 text-marigold" /> Home
              </Link>

              <Link 
                href="/jobs"
                onClick={() => setMobileMenuOpen(false)}
                className={`p-3 rounded-xl text-xs font-extrabold flex items-center gap-2.5 transition-colors ${pathname.startsWith('/jobs') ? 'bg-pine text-white' : 'text-pine hover:bg-moss-light/50'}`}
              >
                <Briefcase className="w-4 h-4 text-marigold" /> Explore Jobs
              </Link>

              {user && (
                <Link 
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-3 rounded-xl text-xs font-extrabold flex items-center gap-2.5 transition-colors ${pathname === '/dashboard' ? 'bg-pine text-white' : 'text-pine hover:bg-moss-light/50'}`}
                >
                  <Sparkles className="w-4 h-4 text-marigold" /> Dashboard
                </Link>
              )}

              <Link 
                href="/items/add"
                onClick={() => setMobileMenuOpen(false)}
                className={`p-3 rounded-xl text-xs font-extrabold flex items-center gap-2.5 transition-colors ${pathname === '/items/add' ? 'bg-pine text-white' : 'text-pine hover:bg-moss-light/50'}`}
              >
                <Plus className="w-4 h-4 text-marigold" /> Add Listing
              </Link>
              
              <Link 
                href="/items/manage"
                onClick={() => setMobileMenuOpen(false)}
                className={`p-3 rounded-xl text-xs font-extrabold flex items-center gap-2.5 transition-colors ${pathname === '/items/manage' ? 'bg-pine text-white' : 'text-pine hover:bg-moss-light/50'}`}
              >
                <List className="w-4 h-4 text-marigold" /> Manage Listings
              </Link>

              <Link 
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`p-3 rounded-xl text-xs font-extrabold flex items-center gap-2.5 transition-colors ${pathname === '/about' ? 'bg-pine text-white' : 'text-pine hover:bg-moss-light/50'}`}
              >
                <Info className="w-4 h-4 text-marigold" /> About
              </Link>
            </div>

            <div className="pt-3 border-t border-moss-light">
              {user ? (
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <p className="text-xs font-extrabold text-pine">{user.name}</p>
                    <p className="text-[10px] text-moss-dark font-bold uppercase">{user.role}</p>
                  </div>
                  <button 
                    onClick={() => { setMobileMenuOpen(false); logout(); }}
                    className="btn-pin-secondary text-xs py-1.5 px-4 flex items-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Log Out
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 pt-1">
                  <Link 
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center py-2 rounded-xl text-xs font-extrabold border border-moss-light text-pine"
                  >
                    Log In
                  </Link>
                  <Link 
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center btn-pin-primary text-xs py-2"
                  >
                    Join Now
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
