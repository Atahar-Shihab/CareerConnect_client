'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Pin, Briefcase, Sparkles, LogOut, Home, Menu, X, ChevronDown, Plus, List, Info, User, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import ThemeSwitcher from './ThemeSwitcher';

const navLinks = [
  { href: '/', label: 'Home', icon: Home, match: (p: string) => p === '/' },
  { href: '/jobs', label: 'Explore Jobs', icon: Briefcase, match: (p: string) => p.startsWith('/jobs') },
];

const moreLinks = [
  { href: '/items/add', label: 'Post Listing', icon: Plus },
  { href: '/items/manage', label: 'My Listings', icon: List },
  { href: '/about', label: 'About', icon: Info },
  { href: '/contact', label: 'Contact', icon: MessageSquare },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreMenuOpen(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileMenuOpen(false); }, [pathname]);

  const userInitials = user?.name
    ?.split(' ')
    .map((n: string) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || '?';

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Subtle gradient accent line at the very top */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-marigold to-transparent" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-2 pb-1">
        <nav className="glass-card rounded-2xl px-4 sm:px-5 py-2.5 flex items-center justify-between border border-white/50 shadow-lg backdrop-blur-xl">
          
          {/* ─── BRAND ─── */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pine to-pine-light flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <Pin className="w-4.5 h-4.5 text-marigold fill-marigold transition-transform group-hover:rotate-12" />
              </div>
              {/* Subtle glow on hover */}
              <div className="absolute inset-0 rounded-xl bg-marigold/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-heading font-black text-xl text-pine tracking-tight">
                Career<span className="text-marigold">Connect</span>
              </span>
              <span className="hidden lg:inline-block text-[8px] font-black uppercase px-1.5 py-0.5 rounded-md bg-pine/8 text-pine/60 border border-pine/10 tracking-widest">
                BD
              </span>
            </div>
          </Link>

          {/* ─── DESKTOP NAV PILLS ─── */}
          <div className="hidden md:flex items-center gap-1 bg-moss-light/40 p-1 rounded-xl border border-moss/10">
            {navLinks.map((link) => {
              const isActive = link.match(pathname);
              return (
                <Link key={link.href} href={link.href} className="relative px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all">
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white rounded-lg shadow-sm border border-moss-light/50"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 flex items-center gap-1.5 ${isActive ? 'text-pine' : 'text-moss-dark hover:text-pine'}`}>
                    <link.icon className={`w-3.5 h-3.5 ${isActive ? 'text-marigold' : ''}`} />
                    {link.label}
                  </span>
                </Link>
              );
            })}

            {user && (
              <Link href="/dashboard" className="relative px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all">
                {pathname === '/dashboard' && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white rounded-lg shadow-sm border border-moss-light/50"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 flex items-center gap-1.5 ${pathname === '/dashboard' ? 'text-pine' : 'text-moss-dark hover:text-pine'}`}>
                  <Sparkles className={`w-3.5 h-3.5 ${pathname === '/dashboard' ? 'text-marigold' : ''}`} />
                  Dashboard
                </span>
              </Link>
            )}

            {/* More Dropdown */}
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${moreMenuOpen ? 'text-pine bg-white/60' : 'text-moss-dark hover:text-pine'}`}
              >
                More
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${moreMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {moreMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-52 bg-surface-elevated rounded-xl p-1.5 shadow-2xl border border-moss-light/60 z-50 ring-1 ring-black/5"
                  >
                    <div className="px-3 py-2 border-b border-moss-light/40 mb-1">
                      <p className="text-[9px] font-black uppercase tracking-widest text-moss/60">Quick Links</p>
                    </div>
                    {moreLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMoreMenuOpen(false)}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${pathname === link.href ? 'bg-pine text-background' : 'text-pine hover:bg-moss-light/40'}`}
                      >
                        <link.icon className={`w-3.5 h-3.5 ${pathname === link.href ? 'text-marigold' : 'text-moss'}`} />
                        {link.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ─── RIGHT CONTROLS ─── */}
          <div className="flex items-center gap-2 shrink-0">
            <ThemeSwitcher />

            {/* Desktop: User Avatar or Auth Buttons */}
            {user ? (
              <div className="hidden md:block relative" ref={userRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-xl hover:bg-moss-light/40 transition-colors group"
                >
                  <div className="text-right hidden lg:block">
                    <p className="text-[11px] font-bold text-pine leading-tight line-clamp-1 max-w-[100px]">{user.name}</p>
                    <p className="text-[8px] font-black uppercase tracking-widest text-marigold">{user.role}</p>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pine to-pine-light flex items-center justify-center text-white text-[11px] font-black shadow-sm group-hover:shadow-md transition-shadow">
                    {userInitials}
                  </div>
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 bg-surface-elevated rounded-xl p-1.5 shadow-2xl border border-moss-light/60 z-50 ring-1 ring-black/5"
                    >
                      {/* User info header */}
                      <div className="px-3 py-2.5 border-b border-moss-light/40 mb-1">
                        <p className="text-xs font-bold text-pine truncate">{user.name}</p>
                        <p className="text-[10px] text-moss-dark truncate">{user.email}</p>
                      </div>

                      <Link
                        href="/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-pine hover:bg-moss-light/40 transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-moss" /> Dashboard
                      </Link>
                      <Link
                        href="/items/add"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-pine hover:bg-moss-light/40 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5 text-moss" /> Post a Listing
                      </Link>
                      <Link
                        href="/items/manage"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-pine hover:bg-moss-light/40 transition-colors"
                      >
                        <List className="w-3.5 h-3.5 text-moss" /> My Listings
                      </Link>

                      <div className="border-t border-moss-light/40 mt-1 pt-1">
                        <button
                          onClick={() => { setUserMenuOpen(false); logout(); }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-3.5 h-3.5" /> Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-1.5">
                <Link
                  href="/login"
                  className="px-4 py-1.5 rounded-lg text-xs font-bold text-pine hover:bg-moss-light/40 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-1.5 rounded-lg text-xs font-bold bg-pine text-white hover:bg-pine-light transition-colors shadow-sm"
                >
                  Join Free
                </Link>
              </div>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 rounded-xl bg-moss-light/60 text-pine flex items-center justify-center border border-moss/15 hover:bg-moss-light transition-colors"
              aria-label="Toggle Navigation"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>

        </nav>
      </div>

      {/* ─── MOBILE DRAWER ─── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-pine/20 backdrop-blur-sm z-40"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="md:hidden fixed top-[58px] left-3 right-3 bg-surface-elevated rounded-2xl border border-moss-light/60 shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-4 space-y-1">
                {/* Main Links */}
                {[...navLinks, ...(user ? [{ href: '/dashboard', label: 'Dashboard', icon: Sparkles, match: (p: string) => p === '/dashboard' }] : [])].map((link) => {
                  const isActive = link.match(pathname);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${isActive ? 'bg-pine text-background shadow-sm' : 'text-pine hover:bg-moss-light/40'}`}
                    >
                      <link.icon className={`w-4.5 h-4.5 ${isActive ? 'text-marigold' : 'text-moss'}`} />
                      {link.label}
                    </Link>
                  );
                })}

                {/* Divider */}
                <div className="border-t border-moss-light/40 my-2" />

                {/* More Links */}
                {moreLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${pathname === link.href ? 'bg-pine text-background shadow-sm' : 'text-pine/80 hover:bg-moss-light/40 hover:text-pine'}`}
                  >
                    <link.icon className={`w-4 h-4 ${pathname === link.href ? 'text-marigold' : 'text-moss'}`} />
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Bottom Auth Section */}
              <div className="px-4 pb-4 pt-2 border-t border-moss-light/40">
                {user ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-pine to-pine-light flex items-center justify-center text-white text-xs font-black shadow-sm">
                        {userInitials}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-pine">{user.name}</p>
                        <p className="text-[10px] text-moss-dark font-semibold">{user.role}</p>
                      </div>
                    </div>
                    <button
                      onClick={logout}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors flex items-center gap-1.5"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Link href="/login" className="flex-1 text-center py-2.5 rounded-xl text-sm font-bold border border-moss-light text-pine hover:bg-moss-light/30 transition-colors">
                      Log In
                    </Link>
                    <Link href="/register" className="flex-1 text-center py-2.5 rounded-xl text-sm font-bold bg-pine text-white hover:bg-pine-light transition-colors shadow-sm">
                      Join Free
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
