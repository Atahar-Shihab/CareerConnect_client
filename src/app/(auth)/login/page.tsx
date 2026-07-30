'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Pin, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGoogleLogin } from '@react-oauth/google';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      login(data.token, data.user);
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // Real Interactive Google OAuth Login via @react-oauth/google
  const googleLoginHandler = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/auth/google`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            credential: tokenResponse.access_token, 
            role: 'student' 
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        login(data.token, data.user);
      } catch (err: any) {
        setError(err.message || 'Google OAuth Sign-in failed');
      } finally {
        setLoading(false);
      }
    },
    onError: () => setError('Google Sign-in popup failed or was cancelled.'),
  });

  const setDemoUser = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password123');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-8 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="pin-card-yellow p-8 rounded-3xl pin-shadow w-full max-w-md relative"
      >
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-red-500">
          <Pin className="w-8 h-8 fill-red-500 drop-shadow-md rotate-12" />
        </div>

        <div className="text-center space-y-2 mb-6 pt-2">
          <h1 className="text-3xl font-heading font-extrabold text-pine">Welcome Back</h1>
          <p className="text-moss-dark text-xs font-semibold">Sign in to access your campus job board & AI match features.</p>
        </div>

        {/* REAL GOOGLE OAUTH POPUP BUTTON */}
        <button
          type="button"
          onClick={() => googleLoginHandler()}
          className="w-full bg-white border border-amber-300 hover:bg-amber-50 text-pine font-bold text-sm py-2.5 px-4 rounded-2xl flex items-center justify-center gap-3 shadow-sm transition-all mb-4"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          Continue with Google
        </button>

        <div className="relative flex py-2 items-center mb-4">
          <div className="flex-grow border-t border-amber-300"></div>
          <span className="flex-shrink mx-3 text-xs font-bold text-moss-dark">OR</span>
          <div className="flex-grow border-t border-amber-300"></div>
        </div>

        {/* DEMO ACCELERATOR BADGES */}
        <div className="bg-white/80 p-3 rounded-2xl border border-amber-200 mb-6 space-y-1.5">
          <p className="text-[11px] font-extrabold uppercase text-pine flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-marigold fill-marigold" /> Quick Demo One-Click Fill:
          </p>
          <div className="flex gap-2">
            <button 
              type="button"
              onClick={() => setDemoUser('shihab@brac.bd.com')}
              className="flex-1 text-[11px] font-bold bg-pine/10 text-pine py-1.5 px-2 rounded-lg hover:bg-pine hover:text-white transition-colors"
            >
              🎓 Shihab (BRAC Univ)
            </button>
            <button 
              type="button"
              onClick={() => setDemoUser('hr@techcorp.bd')}
              className="flex-1 text-[11px] font-bold bg-marigold/20 text-pine-dark py-1.5 px-2 rounded-lg hover:bg-marigold transition-colors"
            >
              🏢 HR Demo
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-bold p-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-extrabold uppercase text-pine mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-moss absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="email" required
                placeholder="shihab@brac.bd.com"
                className="w-full bg-white border border-amber-200 pl-9 pr-3 py-2.5 rounded-xl text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-marigold"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-extrabold uppercase text-pine mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-moss absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="password" required
                placeholder="••••••••"
                className="w-full bg-white border border-amber-200 pl-9 pr-3 py-2.5 rounded-xl text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-marigold"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn-pin-primary w-full text-sm py-3 justify-center mt-2" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs font-semibold text-moss-dark mt-6">
          Don't have an account? <Link href="/register" className="text-marigold-hover font-bold hover:underline">Register here</Link>
        </p>
      </motion.div>
    </div>
  );
}
