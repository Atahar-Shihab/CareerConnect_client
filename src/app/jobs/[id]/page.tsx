'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pin, MapPin, Sparkles, CheckCircle, AlertCircle, FileText, ArrowLeft, Send, Copy, Check, LogIn, RefreshCw, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function JobDetailsPage() {
  const { id } = useParams();
  const { user, token } = useAuth();
  
  const [coverLetter, setCoverLetter] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [applyError, setApplyError] = useState('');
  const [tone, setTone] = useState('Formal');
  const [length, setLength] = useState('Medium');

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  const { data, isLoading, isError } = useQuery({
    queryKey: ['job', id],
    queryFn: async () => {
      const headers: HeadersInit = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${API_URL}/api/jobs/${id}`, { headers });
      if (!res.ok) throw new Error('Failed to fetch job details');
      return res.json();
    },
    enabled: !!id,
  });

  const applyForJob = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${API_URL}/api/jobs/${id}/apply`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tone, length })
      });
      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error);
      return resData;
    },
    onSuccess: (resData) => {
      setCoverLetter(resData.aiCoverLetter);
      setShowModal(true);
      setApplyError('');
    },
    onError: (err: any) => {
      setApplyError(err.message || 'Failed to apply');
    }
  });

  const draftCoverLetter = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${API_URL}/api/jobs/${id}/draft-cover-letter`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tone, length })
      });
      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error);
      return resData;
    },
    onSuccess: (resData) => {
      setCoverLetter(resData.coverLetter);
      setShowModal(true);
    },
    onError: (err: any) => {
      setApplyError(err.message || 'Failed to draft cover letter');
    }
  });

  const copyToClipboard = () => {
    if (coverLetter) {
      navigator.clipboard.writeText(coverLetter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Skeleton loader
  if (isLoading) return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto animate-pulse">
      <div className="h-4 w-32 bg-moss-light/60 rounded-md" />
      <div className="pin-card-yellow p-8 rounded-3xl pin-shadow space-y-6">
        <div className="flex gap-2">
          <div className="h-6 w-20 bg-moss-light/60 rounded-full" />
          <div className="h-5 w-24 bg-moss-light/60 rounded-md" />
        </div>
        <div className="h-10 w-3/4 bg-moss-light/60 rounded-lg" />
        <div className="h-5 w-1/3 bg-moss-light/50 rounded-md" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-moss-light/40 rounded-md" />
          <div className="h-4 w-5/6 bg-moss-light/40 rounded-md" />
          <div className="h-4 w-4/6 bg-moss-light/40 rounded-md" />
        </div>
        <div className="flex gap-2">
          {[1,2,3,4].map(i => <div key={i} className="h-7 w-20 bg-moss-light/50 rounded-lg" />)}
        </div>
      </div>
    </div>
  );

  if (isError || !data?.job) return (
    <div className="py-16 text-center max-w-md mx-auto glass-card p-8 rounded-2xl">
      <p className="text-red-600 font-bold mb-4">Job posting not found.</p>
      <Link href="/jobs" className="btn-pin-secondary text-xs">Back to Job Board</Link>
    </div>
  );

  const { job } = data;
  const matchInfo = data.matchInfo;
  const hasMatch = matchInfo && matchInfo.matchAvailable !== false && matchInfo.matchScore !== undefined;

  // Company initials for the banner
  const companyInitials = (job.companyName || 'CC')
    .split(' ')
    .map((w: string) => w[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      
      {/* Back Button */}
      <Link href="/jobs" className="inline-flex items-center gap-2 text-xs font-bold text-moss-dark hover:text-pine transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Job Board
      </Link>

      {/* COMPANY BANNER */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-pine flex items-center justify-center text-marigold font-heading font-black text-xl shadow-md shrink-0">
          {companyInitials}
        </div>
        <div>
          <p className="text-lg font-bold text-marigold-hover">{job.companyName}</p>
          <p className="text-xs text-moss-dark font-medium flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {job.location}
          </p>
        </div>
      </div>

      {/* MAIN JOB PINBOARD CARD */}
      <div className="pin-card-yellow p-6 sm:p-8 rounded-3xl pin-shadow relative">
        <div className="absolute -top-4 left-12 text-red-500">
          <Pin className="w-8 h-8 fill-red-500 drop-shadow-md rotate-12" />
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-pine text-white uppercase tracking-wider">
                {job.type}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-pine mb-1">
              {job.title}
            </h1>
          </div>

          <div className="prose text-pine/90 max-w-none space-y-4">
            <h3 className="text-base font-extrabold text-pine uppercase tracking-wider">Job Description</h3>
            <p className="leading-relaxed font-normal bg-white/60 p-4 rounded-xl border border-amber-200">{job.description}</p>
          </div>

          {job.requirements && job.requirements.length > 0 && (
            <div>
              <h3 className="text-xs font-extrabold text-pine uppercase tracking-wider mb-2">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.requirements.map((req: string, i: number) => (
                  <span key={i} className="text-xs font-bold bg-white border border-amber-300 text-pine px-3 py-1 rounded-lg">
                    #{req}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* SMART MATCH AI SECTION - only when logged in */}
          {user && (
            <div className="pt-6 border-t border-amber-200 space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-marigold fill-marigold" />
                <h2 className="text-xl font-heading font-extrabold text-pine">Gemini AI Smart Match Analysis</h2>
              </div>

              {hasMatch ? (
                <div className="glass-card p-6 rounded-2xl space-y-4 border border-moss/30">
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-full bg-pine flex items-center justify-center text-marigold font-heading font-black text-xl shadow-md shrink-0">
                      {matchInfo.matchScore}%
                    </div>
                    <div>
                      <p className="font-extrabold text-pine text-base">Compatibility Score</p>
                      <p className="text-xs text-moss-dark font-medium">{matchInfo.explanation}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-200">
                      <p className="text-xs font-extrabold text-emerald-800 flex items-center gap-1.5 mb-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600" /> Strong Matches
                      </p>
                      <ul className="text-xs text-emerald-900 space-y-1 font-semibold">
                        {matchInfo.strongMatches?.map((s: string, idx: number) => (
                          <li key={idx}>✓ {s}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-amber-50/80 p-3.5 rounded-xl border border-amber-200">
                      <p className="text-xs font-extrabold text-amber-800 flex items-center gap-1.5 mb-2">
                        <AlertCircle className="w-4 h-4 text-amber-600" /> Skills to Develop
                      </p>
                      <ul className="text-xs text-amber-900 space-y-1 font-semibold">
                        {matchInfo.missingSkills?.map((s: string, idx: number) => (
                          <li key={idx}>• {s}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="glass-card p-6 rounded-2xl border border-moss/30 text-center space-y-2">
                  <Sparkles className="w-8 h-8 text-moss/40 mx-auto" />
                  <p className="text-sm font-semibold text-moss-dark">AI Match temporarily unavailable</p>
                  <p className="text-xs text-moss">Complete your profile with skills to enable AI matching, or try again later.</p>
                </div>
              )}

              {/* COVER LETTER CONTROLS */}
              <div className="space-y-3">
                {/* Tone & Length Selectors */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <label className="text-[10px] font-extrabold text-pine uppercase tracking-wider">Tone:</label>
                    <select
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                      className="bg-white/70 border border-moss-light px-2 py-1 rounded-lg text-xs font-bold text-pine focus:outline-none focus:ring-2 focus:ring-marigold"
                    >
                      <option value="Formal">Formal</option>
                      <option value="Enthusiastic">Enthusiastic</option>
                      <option value="Concise">Concise</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <label className="text-[10px] font-extrabold text-pine uppercase tracking-wider">Length:</label>
                    <select
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      className="bg-white/70 border border-moss-light px-2 py-1 rounded-lg text-xs font-bold text-pine focus:outline-none focus:ring-2 focus:ring-marigold"
                    >
                      <option value="Short">Short</option>
                      <option value="Medium">Medium</option>
                      <option value="Long">Long</option>
                    </select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => draftCoverLetter.mutate()}
                    disabled={draftCoverLetter.isPending}
                    className="btn-pin-secondary flex-1 text-sm py-2.5 justify-center flex items-center gap-2"
                  >
                    {draftCoverLetter.isPending ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Drafting Preview...</>
                    ) : (
                      <><FileText className="w-4 h-4" /> Draft Cover Letter (Preview)</>
                    )}
                  </button>

                  <button
                    onClick={() => applyForJob.mutate()}
                    disabled={applyForJob.isPending}
                    className="btn-pin-primary flex-1 text-sm py-2.5 justify-center flex items-center gap-2"
                  >
                    {applyForJob.isPending ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Applying...</>
                    ) : (
                      <><Send className="w-4 h-4" /> 1-Click AI Apply</>
                    )}
                  </button>
                </div>

                {applyError && <p className="text-xs font-bold text-red-600 text-center">{applyError}</p>}
              </div>
            </div>
          )}

          {/* Not logged in CTA */}
          {!user && (
            <div className="pt-6 border-t border-amber-200">
              <div className="glass-card p-6 rounded-2xl text-center space-y-3 border border-moss/30">
                <LogIn className="w-8 h-8 text-marigold mx-auto" />
                <p className="text-sm font-bold text-pine">Sign in to apply & get AI-powered match analysis</p>
                <Link href="/login" className="btn-pin-primary text-sm py-2.5 px-8 inline-block">
                  Log In to Apply
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* AI COVER LETTER MODAL */}
      <AnimatePresence>
        {showModal && coverLetter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-pine/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 relative border border-moss-light max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-6 h-6 text-marigold" />
                  <h3 className="text-lg sm:text-xl font-heading font-extrabold text-pine">Your AI-Drafted Cover Letter</h3>
                </div>
                <button onClick={() => setShowModal(false)} className="text-moss-dark hover:text-pine font-bold text-lg">
                  ✕
                </button>
              </div>

              <div className="bg-amber-50/50 p-4 sm:p-6 rounded-2xl border border-amber-200/80 font-sans text-sm text-pine leading-relaxed whitespace-pre-wrap">
                {coverLetter}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="btn-pin-secondary text-xs py-2 px-4 flex items-center gap-1.5"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>

                  <button
                    onClick={() => { setCoverLetter(null); setShowModal(false); draftCoverLetter.mutate(); }}
                    className="btn-pin-secondary text-xs py-2 px-4 flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-4 h-4" /> Regenerate
                  </button>
                </div>

                <button
                  onClick={() => setShowModal(false)}
                  className="btn-pin-primary text-xs py-2 px-6"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
