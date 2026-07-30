'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Pin, Sparkles, Zap, FileText, Building2, CheckCircle2, ArrowRight, Star, 
  GraduationCap, MapPin, ChevronDown, Award, Users, ShieldCheck, Heart
} from 'lucide-react';

export default function HomePage() {
  const { user } = useAuth();
  
  // Interactive AI Match Simulator State
  const [selectedRole, setSelectedRole] = useState('fullstack');

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const roleSimulations: Record<string, any> = {
    fullstack: {
      title: 'Full Stack Engineer',
      company: 'Pathao Tech',
      score: 94,
      matched: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
      missing: ['Docker'],
      explanation: 'Exceptional match for web architecture & database requirements.'
    },
    ai: {
      title: 'AI Product Engineering Fellow',
      company: 'Brain Station 23',
      score: 88,
      matched: ['Python', 'LLM API', 'Node.js'],
      missing: ['PyTorch', 'FastAPI'],
      explanation: 'Strong alignment with AI API integration & backend tooling.'
    },
    design: {
      title: 'UI/UX Product Designer',
      company: 'ShopUp',
      score: 91,
      matched: ['Figma', 'User Research', 'Wireframing'],
      missing: ['Design Systems'],
      explanation: 'Great candidate for user-centered design & prototyping.'
    }
  };

  const currentSim = roleSimulations[selectedRole];

  // Marquee Data
  const partnerCompanies = [
    { name: 'Brain Station 23', location: 'Dhaka', tag: 'AI & Enterprise' },
    { name: 'Pathao Tech', location: 'Dhaka', tag: 'Logistics & Tech' },
    { name: 'ShopUp', location: 'Banani', tag: 'Fintech & Retail' },
    { name: 'bKash Tech', location: 'Dhaka', tag: 'MFS & Banking' },
    { name: 'TechCorp BD', location: 'Gulshan', tag: 'Web3 & SaaS' },
    { name: 'Therap BD', location: 'Mohakhali', tag: 'Healthcare Tech' },
    { name: 'Chaldal Tech', location: 'Dhaka', tag: 'E-commerce' }
  ];

  const campusSkills = [
    '#Next.js 14', '#Google Gemini AI', '#TypeScript', '#React Native', 
    '#Express.js', '#MongoDB Atlas', '#Figma UX', '#Python LLM', '#Tailwind CSS'
  ];

  const faqList = [
    {
      q: 'How does the Gemini AI Smart Match Engine work?',
      a: 'When you create a student profile, our Google Gemini AI analyzes your skills against active employer job postings, calculating a compatibility score along with highlighted strengths and missing skill recommendations.'
    },
    {
      q: 'Can students from any university in Bangladesh join?',
      a: 'Yes! CareerSetu is open to students and recent graduates from all public & private universities in Bangladesh including BRAC University, BUET, DU, NSU, IUT, and more.'
    },
    {
      q: 'How does 1-Click AI Cover Letter generation work?',
      a: 'When applying to a job posting, Gemini AI automatically generates a customized, professional cover letter contextualized specifically to your profile and the employer’s requirements.'
    },
    {
      q: 'Can any logged-in user post job opportunities?',
      a: 'Yes! Any registered user can toggle employer mode on their dashboard to post campus internships or full-time jobs for Bangladeshi students.'
    }
  ];

  return (
    <div className="space-y-24 pb-20 overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="relative pt-6 pb-12">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-marigold/15 border border-marigold/40 text-pine font-bold text-xs uppercase tracking-wider shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-marigold fill-marigold" />
            <span>AI-Powered Bangladeshi Campus Hiring</span>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-heading font-extrabold text-pine tracking-tight leading-[1.1]"
          >
            Your Bridge from <br />
            <span className="relative inline-block text-marigold">
              Campus to Career.
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-pine/30" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0 10 Q 50 20 100 10" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-pine/80 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            CareerConnect pairs Bangladeshi university students with top local tech companies using automated Gemini AI matching & 1-click tailored cover letters.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            {!user ? (
              <>
                <Link href="/register" className="btn-pin-primary text-lg">
                  Explore Postings <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/login" className="btn-pin-secondary text-lg">
                  Log In
                </Link>
              </>
            ) : (
              <Link href="/jobs" className="btn-pin-primary text-lg">
                View Job Board <ArrowRight className="w-5 h-5" />
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* INFINITE MARQUEE SWIPER SECTION (LEFT TO RIGHT & RIGHT TO LEFT) */}
      <section className="space-y-6 relative py-4 bg-moss-light/30 rounded-3xl p-6 border border-moss-light">
        <div className="text-center space-y-1">
          <p className="text-xs font-extrabold uppercase tracking-widest text-pine">Featured Hiring Ecosystem</p>
          <h2 className="text-2xl font-heading font-extrabold text-pine">Top Companies & Active Campus Skills</h2>
        </div>

        {/* Row 1: Left to Right Marquee */}
        <div className="overflow-hidden relative py-2">
          <div className="animate-marquee-left flex gap-4">
            {[...partnerCompanies, ...partnerCompanies].map((comp, idx) => (
              <div key={idx} className="pin-card-yellow px-5 py-3 rounded-2xl pin-shadow flex items-center gap-3 shrink-0 border border-amber-200">
                <Building2 className="w-5 h-5 text-marigold-hover" />
                <div>
                  <p className="text-sm font-extrabold text-pine">{comp.name}</p>
                  <p className="text-[11px] font-semibold text-moss-dark">{comp.location} • {comp.tag}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Right to Left Marquee */}
        <div className="overflow-hidden relative py-2">
          <div className="animate-marquee-right flex gap-3">
            {[...campusSkills, ...campusSkills, ...campusSkills].map((skill, idx) => (
              <span key={idx} className="bg-pine text-white text-xs font-bold px-4 py-2 rounded-full shadow-sm shrink-0 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-marigold" /> {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE AI SMART MATCH SIMULATOR WIDGET */}
      <section className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest px-3 py-1 bg-marigold/20 text-pine rounded-full border border-marigold/30">
            Interactive Experience
          </span>
          <h2 className="text-3xl font-heading font-extrabold text-pine">Test Gemini AI Match Simulator</h2>
          <p className="text-moss-dark text-sm max-w-xl mx-auto">Select a target career path below to see how our AI evaluates real profile compatibility.</p>
        </div>

        {/* Simulator Card */}
        <div className="pin-card-yellow p-8 rounded-3xl pin-shadow relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-red-500">
            <Pin className="w-8 h-8 fill-red-500 drop-shadow-md rotate-12" />
          </div>

          <div className="space-y-6">
            {/* Role Selectors */}
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setSelectedRole('fullstack')}
                className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all border ${selectedRole === 'fullstack' ? 'bg-pine text-white border-pine shadow-md' : 'bg-white text-pine border-amber-200'}`}
              >
                💻 Full Stack Engineer
              </button>
              <button
                onClick={() => setSelectedRole('ai')}
                className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all border ${selectedRole === 'ai' ? 'bg-pine text-white border-pine shadow-md' : 'bg-white text-pine border-amber-200'}`}
              >
                🤖 AI Product Fellow
              </button>
              <button
                onClick={() => setSelectedRole('design')}
                className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all border ${selectedRole === 'design' ? 'bg-pine text-white border-pine shadow-md' : 'bg-white text-pine border-amber-200'}`}
              >
                🎨 UI/UX Designer
              </button>
            </div>

            {/* Live Simulated Result */}
            <motion.div 
              key={selectedRole}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-6 rounded-2xl border border-moss/30 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-heading font-extrabold text-pine">{currentSim.title}</h3>
                  <p className="text-xs font-bold text-marigold-hover">{currentSim.company}</p>
                </div>

                <div className="w-16 h-16 rounded-full bg-pine flex items-center justify-center text-marigold font-heading font-black text-xl shadow-md">
                  {currentSim.score}%
                </div>
              </div>

              <p className="text-xs text-pine font-medium italic">{currentSim.explanation}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-emerald-50/90 p-3.5 rounded-xl border border-emerald-200">
                  <p className="text-xs font-extrabold text-emerald-800 flex items-center gap-1 mb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Matched Skills
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {currentSim.matched.map((s: string, idx: number) => (
                      <span key={idx} className="text-[11px] font-bold bg-white text-emerald-800 px-2 py-0.5 rounded border border-emerald-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-amber-50/90 p-3.5 rounded-xl border border-amber-200">
                  <p className="text-xs font-extrabold text-amber-800 flex items-center gap-1 mb-1.5">
                    <Zap className="w-4 h-4 text-amber-600" /> Recommended Additions
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {currentSim.missing.map((s: string, idx: number) => (
                      <span key={idx} className="text-[11px] font-bold bg-white text-amber-900 px-2 py-0.5 rounded border border-amber-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* CAMPUS NETWORK LEADERBOARD */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-heading font-extrabold text-pine">Connected University Campuses</h2>
          <p className="text-moss-dark text-sm">Empowering students across leading academic institutions in Bangladesh.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { uni: 'BRAC University', code: 'BRACU', students: '1,400+ Active', placement: '96% Hired' },
            { uni: 'BUET', code: 'BUET', students: '1,850+ Active', placement: '98% Hired' },
            { uni: 'Dhaka University', code: 'DU', students: '2,100+ Active', placement: '94% Hired' },
            { uni: 'North South University', code: 'NSU', students: '1,200+ Active', placement: '93% Hired' }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -4, rotate: idx % 2 === 0 ? 0.5 : -0.5 }}
              className="pin-card-green p-6 rounded-2xl pin-shadow text-center space-y-2 relative"
            >
              <div className="w-10 h-10 rounded-xl bg-pine text-marigold font-heading font-extrabold text-xs flex items-center justify-center mx-auto shadow-sm">
                {item.code}
              </div>
              <h3 className="font-heading font-extrabold text-lg text-pine">{item.uni}</h3>
              <p className="text-xs font-bold text-moss-dark">{item.students}</p>
              <div className="pt-2 border-t border-moss-light">
                <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                  {item.placement}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* STUDENT TESTIMONIALS PINBOARD */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-heading font-extrabold text-pine">Student Success Stories</h2>
          <p className="text-moss-dark text-sm">Hear from students who bridged campus life to their dream tech roles.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Shihab', uni: 'BRAC University', role: 'Full Stack Engineer @ TechCorp', review: 'CareerConnect evaluated my React and Node skills and drafted an AI cover letter that landed me my first tech role in Gulshan!' },
            { name: 'Tanvir Hossain', uni: 'BUET', role: 'AI Intern @ Brain Station 23', review: 'The Smart Match score showed me exact missing skills in Python LLMs so I knew what to study before applying.' },
            { name: 'Ayesha Rahman', uni: 'Dhaka University', role: 'UI/UX Fellow @ ShopUp', review: 'Applying with 1-click tailored cover letters saved me hours during final semester exams.' }
          ].map((t, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -4, rotate: idx % 2 === 0 ? -1 : 1 }}
              className="pin-card-yellow p-6 rounded-2xl pin-shadow relative space-y-4"
            >
              <div className="absolute -top-3 left-6 text-red-500">
                <Pin className="w-5 h-5 fill-red-500 drop-shadow-sm rotate-12" />
              </div>
              <div className="flex items-center gap-1 text-marigold">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-marigold" />)}
              </div>
              <p className="text-xs text-pine font-medium leading-relaxed italic">"{t.review}"</p>
              <div className="pt-2 border-t border-amber-200 flex items-center justify-between">
                <div>
                  <p className="text-sm font-extrabold text-pine">{t.name}</p>
                  <p className="text-[11px] font-bold text-moss-dark">{t.uni}</p>
                </div>
                <span className="text-[10px] font-bold text-pine bg-marigold/20 px-2 py-1 rounded">
                  {t.role}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-heading font-extrabold text-pine">Frequently Asked Questions</h2>
          <p className="text-moss-dark text-sm">Everything you need to know about CareerConnect campus hiring.</p>
        </div>

        <div className="space-y-3">
          {faqList.map((faq, idx) => (
            <div key={idx} className="glass-card rounded-2xl border border-moss-light overflow-hidden pin-shadow">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left font-heading font-extrabold text-pine text-base flex items-center justify-between hover:bg-moss-light/30 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-moss transition-transform ${openFaq === idx ? 'rotate-180 text-marigold-hover' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="p-5 pt-0 text-xs font-medium text-pine/80 leading-relaxed border-t border-moss-light/50 bg-white/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="pin-card-green p-10 rounded-3xl pin-shadow text-center space-y-6 relative max-w-4xl mx-auto border border-emerald-300">
        <div className="space-y-3">
          <h2 className="text-4xl font-heading font-extrabold text-pine">Ready to Bridge Your Career?</h2>
          <p className="text-moss-dark font-medium text-sm max-w-xl mx-auto">
            Join thousands of university students getting matched to top tech companies in Bangladesh today.
          </p>
        </div>
        <div>
          <Link href="/register" className="btn-pin-primary text-lg px-8 py-3.5">
            Get Started Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
}
