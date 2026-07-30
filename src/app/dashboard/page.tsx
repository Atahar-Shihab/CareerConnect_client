'use client';

import { useAuth } from '@/context/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Pin, User, Briefcase, Plus, X, Sparkles, CheckCircle, FileText, 
  BarChart3, UploadCloud, AlertTriangle, FileCheck, Layers, Clock, Send, Eye, CheckCircle2 
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

export default function DashboardPage() {
  const { user, token } = useAuth();
  const queryClient = useQueryClient();

  // Active Dashboard Tab
  const [activeTab, setActiveTab] = useState<'profile' | 'resume' | 'applications' | 'employer-jobs' | 'post-job'>('profile');

  // Student Profile State
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');

  // AI Resume State
  const [resumeText, setResumeText] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [resumeAnalysis, setResumeAnalysis] = useState<any>(null);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState('');

  // Cover Letter Modal State
  const [selectedCoverLetter, setSelectedCoverLetter] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  // Fetch Student Profile
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/profiles`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch profile');
      return res.json();
    },
    enabled: !!token && user?.role === 'student',
  });

  // Fetch Student's Applications
  const { data: myApplications, isLoading: isAppsLoading } = useQuery({
    queryKey: ['myApplications'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/jobs/my-applications`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch applications');
      return res.json();
    },
    enabled: !!token && user?.role === 'student',
  });

  // Fetch Employer's Jobs & Applicants
  const { data: employerJobs, isLoading: isEmpJobsLoading } = useQuery({
    queryKey: ['employerJobs'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/jobs/employer/my-jobs`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch employer jobs');
      return res.json();
    },
    enabled: !!token && user?.role === 'employer',
  });

  useEffect(() => {
    if (profile) {
      setBio(profile.bio || '');
      setSkills(profile.skills || []);
    }
  }, [profile]);

  useEffect(() => {
    if (user?.role === 'employer') {
      setActiveTab('employer-jobs');
    }
  }, [user]);

  const updateProfile = useMutation({
    mutationFn: async (updatedData: any) => {
      const res = await fetch(`${API_URL}/api/profiles`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error('Failed to update profile');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      alert('Profile saved successfully!');
    }
  });

  const analyzeResumeMutation = useMutation({
    mutationFn: async (text: string) => {
      const res = await fetch(`${API_URL}/api/resume/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ resumeText: text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      return data;
    },
    onSuccess: (data) => {
      setResumeAnalysis(data);
    }
  });

  const uploadPdfMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('resume', file);

      const res = await fetch(`${API_URL}/api/resume/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      return data;
    },
    onSuccess: (data) => {
      setResumeAnalysis(data.analysis);
      setUploadSuccessMsg(`Parsed "${data.fileName}". Extracted ${data.extractedSkills.length} new skills into your profile!`);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    }
  });

  const handleStripePayment = async (planType: string) => {
    try {
      const res = await fetch(`${API_URL}/api/payments/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ planType }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Stripe session failed');
      }
    } catch (err) {
      alert('Payment processing failed');
    }
  };

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  // Employer Job Posting State
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('Dhaka');
  const [jobType, setJobType] = useState('full-time');
  const [description, setDescription] = useState('');
  const [requirementsInput, setRequirementsInput] = useState('');

  const createJob = useMutation({
    mutationFn: async (newJob: any) => {
      const res = await fetch(`${API_URL}/api/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(newJob),
      });
      if (!res.ok) throw new Error('Failed to post job');
      return res.json();
    },
    onSuccess: () => {
      alert('Job posted successfully to the Campus Pinboard!');
      setJobTitle(''); setDescription(''); setRequirementsInput('');
      queryClient.invalidateQueries({ queryKey: ['employerJobs'] });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      setActiveTab('employer-jobs');
    }
  });

  // Analytics Bar Chart Data based on student skills
  const chartData = [
    { name: 'React / Next.js', score: skills.some(s => s.toLowerCase().includes('react')) ? 90 : 40, color: '#F2A900' },
    { name: 'Node.js / Express', score: skills.some(s => s.toLowerCase().includes('node')) ? 85 : 35, color: '#0D3B2E' },
    { name: 'Python / AI', score: skills.some(s => s.toLowerCase().includes('python')) ? 80 : 30, color: '#8F9779' },
    { name: 'TypeScript', score: skills.some(s => s.toLowerCase().includes('typescript')) ? 95 : 45, color: '#D99600' },
    { name: 'UI / UX Design', score: skills.some(s => s.toLowerCase().includes('design') || s.toLowerCase().includes('figma')) ? 88 : 25, color: '#175A46' }
  ];

  if (!user) return (
    <div className="py-16 text-center max-w-md mx-auto glass-card p-8 rounded-2xl">
      <Pin className="w-10 h-10 text-marigold mx-auto mb-3" />
      <p className="text-pine font-bold text-lg mb-2">Access Dashboard</p>
      <p className="text-moss-dark text-sm mb-6">Please log in to manage your student profile or post campus jobs.</p>
    </div>
  );

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      
      {/* USER WELCOME HEADER */}
      <div className="glass-card p-8 rounded-3xl pin-shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-white">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-marigold/20 text-pine border border-marigold/30">
              {user.role} Control Center
            </span>
          </div>
          <h1 className="text-3xl font-heading font-extrabold text-pine mt-1">
            Welcome back, {user.name}!
          </h1>
          <p className="text-moss-dark font-medium text-sm mt-0.5">{user.email}</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleStripePayment(user.role === 'employer' ? 'employer_featured' : 'student_badge')}
            className="btn-pin-primary text-xs py-2 px-4 flex items-center gap-1.5 shadow-md"
          >
            💳 Upgrade via Stripe (${user.role === 'employer' ? '10' : '5'} USD)
          </button>

          <div className="w-12 h-12 rounded-2xl bg-pine flex items-center justify-center text-marigold font-bold text-xl shadow-md">
            {user.name.charAt(0)}
          </div>
        </div>
      </div>

      {/* DASHBOARD TAB NAVIGATION BAR */}
      <div className="flex flex-wrap items-center gap-2 bg-moss-light/50 p-2 rounded-2xl border border-moss-light">
        {user.role === 'student' ? (
          <>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all ${activeTab === 'profile' ? 'bg-pine text-white shadow-md' : 'text-pine hover:bg-white/60'}`}
            >
              <User className="w-4 h-4 text-marigold" /> Skill Profile & Chart
            </button>
            <button
              onClick={() => setActiveTab('resume')}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all ${activeTab === 'resume' ? 'bg-pine text-white shadow-md' : 'text-pine hover:bg-white/60'}`}
            >
              <FileText className="w-4 h-4 text-marigold" /> PDF Resume & AI Studio
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all ${activeTab === 'applications' ? 'bg-pine text-white shadow-md' : 'text-pine hover:bg-white/60'}`}
            >
              <Layers className="w-4 h-4 text-marigold" /> My Applications ({myApplications?.length || 0})
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setActiveTab('employer-jobs')}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all ${activeTab === 'employer-jobs' ? 'bg-pine text-white shadow-md' : 'text-pine hover:bg-white/60'}`}
            >
              <Briefcase className="w-4 h-4 text-marigold" /> My Jobs & Applicants ({employerJobs?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('post-job')}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all ${activeTab === 'post-job' ? 'bg-pine text-white shadow-md' : 'text-pine hover:bg-white/60'}`}
            >
              <Plus className="w-4 h-4 text-marigold" /> Post New Job
            </button>
          </>
        )}
      </div>

      {/* STUDENT TAB 1: SKILL PROFILE & READINESS INDEX */}
      {user.role === 'student' && activeTab === 'profile' && (
        <div className="space-y-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pin-card-yellow p-8 rounded-3xl pin-shadow relative">
            <div className="absolute -top-4 left-10 text-red-500">
              <Pin className="w-7 h-7 fill-red-500 drop-shadow-sm rotate-12" />
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-heading font-extrabold text-pine flex items-center gap-2">
                  <User className="w-6 h-6 text-marigold" /> Student Skills Profile Builder
                </h2>
                <p className="text-moss-dark text-xs font-medium mt-1">
                  Your skills drive our Gemini AI Smart Match Engine to evaluate compatibility with top tech postings.
                </p>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                updateProfile.mutate({ bio, skills });
              }} className="space-y-5">
                
                <div>
                  <label className="block text-xs font-extrabold uppercase text-pine mb-1.5">About You / Bio</label>
                  <textarea 
                    className="w-full bg-white border border-amber-200 p-3 rounded-xl text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-marigold"
                    rows={3}
                    placeholder="Share your academic focus, projects, or career ambitions..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase text-pine mb-1.5">Technical & Professional Skills</label>
                  
                  {/* Skill Pills */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {skills.map((skill, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1.5 bg-pine text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                        #{skill}
                        <button type="button" onClick={() => removeSkill(skill)} className="hover:text-marigold">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Add a skill (e.g. React, Node.js, Python)..."
                      className="flex-1 bg-white border border-amber-200 px-4 py-2 rounded-xl text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-marigold"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
                    />
                    <button type="button" onClick={addSkill} className="btn-pin-secondary text-xs px-4">
                      <Plus className="w-4 h-4" /> Add
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button type="submit" className="btn-pin-primary text-sm px-6" disabled={updateProfile.isPending}>
                    {updateProfile.isPending ? 'Saving...' : 'Save Profile Changes'}
                  </button>
                </div>

              </form>
            </div>
          </motion.div>

          {/* RECHARTS SKILLS READINESS ANALYTICS */}
          <div className="pin-card-green p-8 rounded-3xl pin-shadow relative">
            <div className="absolute -top-4 left-10 text-emerald-600">
              <Pin className="w-7 h-7 fill-emerald-600 drop-shadow-sm rotate-12" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-heading font-extrabold text-pine flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-pine" /> Market Skill Readiness Index
                  </h2>
                  <p className="text-moss-dark text-xs font-medium mt-1">Real-time skill coverage compared against active Bangladesh tech job requirements.</p>
                </div>
                <span className="text-xs font-bold px-3 py-1 bg-pine text-white rounded-full">Recharts Analytics</span>
              </div>

              <div className="h-64 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <XAxis dataKey="name" stroke="#0D3B2E" fontSize={11} tickLine={false} />
                    <YAxis stroke="#0D3B2E" fontSize={11} domain={[0, 100]} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#FFFDF5', borderRadius: '12px', border: '1px solid #FFE8A3' }} />
                    <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STUDENT TAB 2: PDF RESUME & AI STUDIO */}
      {user.role === 'student' && activeTab === 'resume' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 rounded-3xl pin-shadow border border-moss-light space-y-6">
          <div>
            <h2 className="text-2xl font-heading font-extrabold text-pine flex items-center gap-2">
              <FileText className="w-6 h-6 text-marigold" /> Gemini AI Resume & PDF Parser Studio
            </h2>
            <p className="text-moss-dark text-xs font-medium mt-1">
              Upload your PDF resume to automatically extract skills & evaluate your resume readiness with Google Gemini AI.
            </p>
          </div>

          <div className="border-2 border-dashed border-amber-300 rounded-2xl p-6 bg-amber-50/40 text-center space-y-4">
            <UploadCloud className="w-10 h-10 text-marigold mx-auto" />
            <div>
              <p className="text-sm font-extrabold text-pine">Upload Your PDF Resume</p>
              <p className="text-xs text-moss-dark font-medium mt-0.5">Supports text-based .pdf resume documents up to 10MB</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <input 
                type="file" 
                accept=".pdf"
                className="hidden"
                id="pdf-upload-input"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setPdfFile(file);
                    uploadPdfMutation.mutate(file);
                  }
                }}
              />
              <label 
                htmlFor="pdf-upload-input"
                className="btn-pin-primary text-xs py-2.5 px-6 cursor-pointer inline-flex items-center gap-2"
              >
                <UploadCloud className="w-4 h-4" /> {uploadPdfMutation.isPending ? 'Parsing PDF...' : 'Select PDF File'}
              </label>
            </div>

            {pdfFile && (
              <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-amber-200 text-xs font-bold text-pine">
                <FileCheck className="w-4 h-4 text-emerald-600" /> {pdfFile.name}
              </div>
            )}

            {uploadSuccessMsg && (
              <p className="text-xs font-bold text-emerald-700 bg-emerald-100 p-2.5 rounded-xl text-center">
                {uploadSuccessMsg}
              </p>
            )}
          </div>

          <div className="pt-2 space-y-3">
            <label className="block text-xs font-extrabold uppercase text-pine">Or Paste Resume Text Snippet</label>
            <textarea 
              rows={3}
              placeholder="Paste your resume text here..."
              className="w-full bg-white border border-moss-light p-3 rounded-xl text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-marigold"
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
            />
            <button
              type="button"
              onClick={() => analyzeResumeMutation.mutate(resumeText)}
              disabled={analyzeResumeMutation.isPending || !resumeText.trim()}
              className="btn-pin-secondary text-xs py-2 px-5"
            >
              {analyzeResumeMutation.isPending ? 'Analyzing Text...' : 'Analyze Text Snippet'}
            </button>
          </div>

          {resumeAnalysis && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-amber-50/90 p-6 rounded-2xl border border-amber-200 space-y-4">
              <div className="flex items-center justify-between border-b border-amber-200/80 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-marigold fill-marigold" />
                  <span className="font-heading font-bold text-pine">Gemini Resume Evaluation Score</span>
                </div>
                <span className="text-xl font-extrabold text-marigold-hover">{resumeAnalysis.readinessScore}/100</span>
              </div>

              <p className="text-xs text-pine font-medium leading-relaxed">{resumeAnalysis.overallFeedback}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/80 p-3.5 rounded-xl border border-emerald-200">
                  <p className="text-xs font-extrabold text-emerald-800 flex items-center gap-1 mb-1">
                    <CheckCircle className="w-4 h-4 text-emerald-600" /> Key Strengths
                  </p>
                  <ul className="text-xs text-pine space-y-1 font-medium">
                    {resumeAnalysis.strengths?.map((s: string, i: number) => <li key={i}>✓ {s}</li>)}
                  </ul>
                </div>

                <div className="bg-white/80 p-3.5 rounded-xl border border-amber-200">
                  <p className="text-xs font-extrabold text-amber-800 flex items-center gap-1 mb-1">
                    <AlertTriangle className="w-4 h-4 text-amber-600" /> Keyword Enhancements
                  </p>
                  <ul className="text-xs text-pine space-y-1 font-medium">
                    {resumeAnalysis.improvements?.map((s: string, i: number) => <li key={i}>• {s}</li>)}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* STUDENT TAB 3: MY SUBMITTED APPLICATIONS */}
      {user.role === 'student' && activeTab === 'applications' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pin-card-yellow p-8 rounded-3xl pin-shadow relative">
          <div className="absolute -top-4 left-10 text-amber-600">
            <Pin className="w-7 h-7 fill-amber-600 drop-shadow-sm rotate-12" />
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-heading font-extrabold text-pine flex items-center gap-2">
                <Layers className="w-6 h-6 text-marigold" /> My Submitted Applications
              </h2>
              <p className="text-moss-dark text-xs font-medium mt-1">Track the status of your applications and preview your generated AI cover letters.</p>
            </div>

            {isAppsLoading ? (
              <p className="text-xs text-moss font-semibold py-8 text-center">Loading applications...</p>
            ) : (
              <div className="space-y-4">
                {myApplications?.map((app: any) => (
                  <div key={app._id} className="bg-white/80 p-5 rounded-2xl border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          {app.status}
                        </span>
                        <span className="text-[11px] font-semibold text-moss">Applied on {new Date(app.appliedAt).toLocaleDateString()}</span>
                      </div>
                      <h3 className="text-lg font-heading font-extrabold text-pine">{app.jobId?.title || 'Job Opportunity'}</h3>
                      <p className="text-xs font-bold text-marigold-hover">{app.jobId?.companyName} • {app.jobId?.location}</p>
                    </div>

                    <button
                      onClick={() => setSelectedCoverLetter(app.aiCoverLetter)}
                      className="btn-pin-secondary text-xs py-2 px-4 flex items-center gap-1.5 shrink-0"
                    >
                      <Eye className="w-3.5 h-3.5" /> View AI Cover Letter
                    </button>
                  </div>
                ))}

                {myApplications?.length === 0 && (
                  <div className="text-center py-12 bg-white/50 rounded-2xl">
                    <p className="text-xs font-bold text-moss-dark">No applications submitted yet. Browse jobs to apply!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* EMPLOYER TAB 1: MY POSTED JOBS & APPLICANTS */}
      {user.role === 'employer' && activeTab === 'employer-jobs' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pin-card-yellow p-8 rounded-3xl pin-shadow relative">
          <div className="absolute -top-4 left-10 text-red-500">
            <Pin className="w-7 h-7 fill-red-500 drop-shadow-sm rotate-12" />
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-heading font-extrabold text-pine flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-marigold" /> My Posted Opportunities & Student Applicants
              </h2>
              <p className="text-moss-dark text-xs font-medium mt-1">Review student applicants who applied to your campus job postings.</p>
            </div>

            {isEmpJobsLoading ? (
              <p className="text-xs text-moss font-semibold py-8 text-center">Loading posted jobs...</p>
            ) : (
              <div className="space-y-6">
                {employerJobs?.map((job: any) => (
                  <div key={job._id} className="bg-white/80 p-6 rounded-2xl border border-amber-200 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-pine/10 text-pine">
                          {job.type}
                        </span>
                        <h3 className="text-xl font-heading font-extrabold text-pine mt-1">{job.title}</h3>
                        <p className="text-xs font-semibold text-moss">{job.location} • {job.companyName}</p>
                      </div>

                      <span className="text-xs font-extrabold px-3 py-1 bg-marigold/20 text-pine-dark rounded-full">
                        {job.applications?.length || 0} Student Applicants
                      </span>
                    </div>

                    {/* Applicants List */}
                    {job.applications && job.applications.length > 0 ? (
                      <div className="space-y-2 pt-2 border-t border-amber-200/60">
                        <p className="text-xs font-extrabold uppercase text-pine">Student Applicants:</p>
                        {job.applications.map((app: any) => (
                          <div key={app._id} className="bg-amber-50/60 p-3 rounded-xl flex items-center justify-between text-xs">
                            <div>
                              <p className="font-bold text-pine">{app.studentId?.name || 'Student Candidate'}</p>
                              <p className="text-moss font-medium">{app.studentId?.email}</p>
                            </div>
                            <button
                              onClick={() => setSelectedCoverLetter(app.aiCoverLetter)}
                              className="btn-pin-primary text-[11px] py-1.5 px-3 flex items-center gap-1"
                            >
                              <FileText className="w-3.5 h-3.5" /> Read Cover Letter
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-moss italic pt-2">No applications received yet for this job.</p>
                    )}
                  </div>
                ))}

                {employerJobs?.length === 0 && (
                  <div className="text-center py-12 bg-white/50 rounded-2xl">
                    <p className="text-xs font-bold text-moss-dark">No campus jobs posted yet. Click "Post New Job" to publish an opportunity!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* EMPLOYER TAB 2: POST NEW CAMPUS OPPORTUNITY */}
      {user.role === 'employer' && activeTab === 'post-job' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pin-card-green p-8 rounded-3xl pin-shadow relative">
          <div className="absolute -top-4 left-10 text-emerald-600">
            <Pin className="w-7 h-7 fill-emerald-600 drop-shadow-sm rotate-12" />
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-heading font-extrabold text-pine flex items-center gap-2">
                <Plus className="w-6 h-6 text-pine" /> Post a Campus Job Opportunity
              </h2>
              <p className="text-moss-dark text-xs font-medium mt-1">
                Post your job or internship to Bangladeshi university campuses instantly.
              </p>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              createJob.mutate({
                title: jobTitle,
                companyName: companyName || user.name,
                location,
                type: jobType,
                description,
                requirements: requirementsInput.split(',').map(s => s.trim()).filter(Boolean)
              });
            }} className="space-y-4">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold uppercase text-pine mb-1">Job Title</label>
                  <input 
                    type="text" required
                    placeholder="e.g. Junior Software Engineer"
                    className="w-full bg-white border border-emerald-200 p-2.5 rounded-xl text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase text-pine mb-1">Company Name</label>
                  <input 
                    type="text" required
                    placeholder="e.g. TechCorp Bangladesh"
                    className="w-full bg-white border border-emerald-200 p-2.5 rounded-xl text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold uppercase text-pine mb-1">Location</label>
                  <input 
                    type="text" required
                    placeholder="e.g. Dhaka (Gulshan) or Remote"
                    className="w-full bg-white border border-emerald-200 p-2.5 rounded-xl text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase text-pine mb-1">Employment Type</label>
                  <select 
                    className="w-full bg-white border border-emerald-200 p-2.5 rounded-xl text-sm font-semibold text-pine focus:outline-none focus:ring-2 focus:ring-pine"
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                  >
                    <option value="full-time">Full-Time</option>
                    <option value="internship">Internship</option>
                    <option value="part-time">Part-Time</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-pine mb-1">Description</label>
                <textarea 
                  required rows={4}
                  placeholder="Describe the job role, responsibilities, and team culture..."
                  className="w-full bg-white border border-emerald-200 p-2.5 rounded-xl text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-pine mb-1">Required Skills (Comma separated)</label>
                <input 
                  type="text" 
                  placeholder="React, TypeScript, Node.js"
                  className="w-full bg-white border border-emerald-200 p-2.5 rounded-xl text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine"
                  value={requirementsInput}
                  onChange={(e) => setRequirementsInput(e.target.value)}
                />
              </div>

              <button type="submit" className="btn-pin-secondary text-sm px-6" disabled={createJob.isPending}>
                {createJob.isPending ? 'Publishing...' : 'Publish Job to Pinboard'}
              </button>

            </form>
          </div>
        </motion.div>
      )}

      {/* VIEW AI COVER LETTER MODAL */}
      <AnimatePresence>
        {selectedCoverLetter && (
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
                  <h3 className="text-xl font-heading font-extrabold text-pine">AI-Generated Cover Letter</h3>
                </div>
                <button onClick={() => setSelectedCoverLetter(null)} className="text-moss-dark hover:text-pine font-bold text-lg">
                  ✕
                </button>
              </div>

              <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-200/80 font-sans text-sm text-pine leading-relaxed whitespace-pre-wrap">
                {selectedCoverLetter}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSelectedCoverLetter(null)}
                  className="btn-pin-primary text-xs py-2 px-6"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
