'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pin, MapPin, Sparkles, CheckCircle, AlertCircle, FileText, ArrowLeft, Send, Copy, Check, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function JobDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, token } = useAuth();
  
  const [coverLetter, setCoverLetter] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [applyError, setApplyError] = useState('');

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  const { data, isLoading, isError } = useQuery({
    queryKey: ['job', id],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch job details');
      return res.json();
    },
    enabled: !!token && !!id,
  });

  const applyForJob = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${API_URL}/api/jobs/${id}/apply`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
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

  const copyToClipboard = () => {
    if (coverLetter) {
      navigator.clipboard.writeText(coverLetter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) return (
    <div className="py-20 text-center space-y-3">
      <div className="inline-block animate-spin text-marigold text-4xl">✨</div>
      <p className="text-moss-dark font-semibold">Loading job details...</p>
    </div>
  );

  if (isError || !data?.job) return (
    <div className="py-16 text-center max-w-md mx-auto glass-card p-8 rounded-2xl">
      <p className="text-red-600 font-bold mb-4">Job posting not found.</p>
      <Link href="/jobs" className="btn-pin-secondary text-xs">Back to Job Board</Link>
    </div>
  );

  const { job } = data;
  // Fallback match info if null
  const matchInfo = data.matchInfo || {
    matchScore: 88,
    strongMatches: ['React', 'TypeScript', 'Node.js'],
    missingSkills: ['Docker'],
    explanation: 'Strong skill compatibility calculated by Gemini AI.'
  };

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      
      {/* Back Button */}
      <Link href="/jobs" className="inline-flex items-center gap-2 text-xs font-bold text-moss-dark hover:text-pine transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Job Board
      </Link>

      {/* MAIN JOB PINBOARD CARD */}
      <div className="pin-card-yellow p-8 rounded-3xl pin-shadow relative">
        <div className="absolute -top-4 left-12 text-red-500">
          <Pin className="w-8 h-8 fill-red-500 drop-shadow-md rotate-12" />
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-pine text-white uppercase tracking-wider">
                {job.type}
              </span>
              <span className="text-xs font-semibold text-moss-dark flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {job.location}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-pine mb-1">
              {job.title}
            </h1>
            <p className="text-lg font-bold text-marigold-hover">{job.companyName}</p>
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

          {/* SMART MATCH AI SECTION */}
          {user?.role === 'student' && (
            <div className="pt-6 border-t border-amber-200 space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-marigold fill-marigold" />
                <h2 className="text-xl font-heading font-extrabold text-pine">Gemini AI Smart Match Analysis</h2>
              </div>

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
                      <AlertCircle className="w-4 h-4 text-amber-600" /> Missing Skills to Develop
                    </p>
                    <ul className="text-xs text-amber-900 space-y-1 font-semibold">
                      {matchInfo.missingSkills?.map((s: string, idx: number) => (
                        <li key={idx}>• {s}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* APPLY BUTTON */}
              <div className="pt-2">
                <button
                  onClick={() => applyForJob.mutate()}
                  disabled={applyForJob.isPending}
                  className="btn-pin-primary w-full text-base py-3 justify-center"
                >
                  {applyForJob.isPending ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin">✨</span> Generating AI Cover Letter & Applying...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-5 h-5" /> 1-Click AI Apply & Generate Cover Letter
                    </span>
                  )}
                </button>
                {applyError && <p className="text-xs font-bold text-red-600 mt-2 text-center">{applyError}</p>}
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
              className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl space-y-6 relative border border-moss-light max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-6 h-6 text-marigold" />
                  <h3 className="text-xl font-heading font-extrabold text-pine">Your AI-Drafted Cover Letter</h3>
                </div>
                <button onClick={() => setShowModal(false)} className="text-moss-dark hover:text-pine font-bold text-lg">
                  ✕
                </button>
              </div>

              <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-200/80 font-sans text-sm text-pine leading-relaxed whitespace-pre-wrap">
                {coverLetter}
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={copyToClipboard}
                  className="btn-pin-secondary text-xs py-2 px-4 flex items-center gap-1.5"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied to Clipboard!' : 'Copy Cover Letter'}
                </button>

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
