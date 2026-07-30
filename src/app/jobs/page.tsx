'use client';

import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Pin, Search, MapPin, Briefcase, Sparkles, Filter, ChevronRight } from 'lucide-react';

export default function JobsPage() {
  const { token } = useAuth();
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  const { data: jobs, isLoading } = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/jobs`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch jobs');
      return res.json();
    },
    enabled: !!token,
  });

  const filteredJobs = jobs?.filter((job: any) => {
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase()) || 
                          job.companyName.toLowerCase().includes(search.toLowerCase()) ||
                          job.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterType === 'all' || job.type === filterType;
    return matchesSearch && matchesFilter;
  });

  if (!token) return (
    <div className="py-16 text-center max-w-md mx-auto glass-card p-8 rounded-2xl pin-shadow">
      <Pin className="w-12 h-12 text-marigold mx-auto mb-4" />
      <h2 className="text-2xl font-heading font-bold text-pine mb-2">Campus Job Pinboard</h2>
      <p className="text-moss-dark text-sm mb-6">Please log in to view active university job postings and AI match scores.</p>
      <Link href="/login" className="btn-pin-primary text-sm">Log In Now</Link>
    </div>
  );

  return (
    <div className="space-y-8 pb-16">
      
      {/* HEADER & SEARCH */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-heading font-extrabold text-pine tracking-tight flex items-center gap-3">
              <Pin className="w-8 h-8 text-marigold fill-marigold rotate-12" />
              Campus Opportunities
            </h1>
            <p className="text-moss-dark font-medium text-sm mt-1">Browse verified Bangladeshi tech jobs & internships matched for your skills.</p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="btn-pin-primary text-xs py-2 px-4">
              + Post New Job
            </Link>
          </div>
        </div>

        {/* SEARCH & FILTER CONTROL BAR */}
        <div className="glass-card p-3 rounded-2xl flex flex-col sm:flex-row items-center gap-3 border border-moss-light">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-moss absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search by job title, company, or skills (e.g. React, Node)..."
              className="w-full bg-white/70 border border-moss-light pl-10 pr-4 py-2 rounded-xl text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-marigold"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-1 bg-moss-light/50 p-1 rounded-xl w-full sm:w-auto overflow-x-auto">
            {['all', 'full-time', 'internship', 'part-time'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${filterType === type ? 'bg-pine text-white shadow-sm' : 'text-moss-dark hover:text-pine'}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* JOBS BOARD GRID */}
      {isLoading ? (
        <div className="text-center py-20">
          <div className="inline-block animate-spin text-marigold text-3xl">✨</div>
          <p className="text-moss font-semibold mt-2">Loading campus postings...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredJobs?.map((job: any, index: number) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4, rotate: index % 2 === 0 ? 0.5 : -0.5 }}
              className="pin-card-yellow p-6 rounded-2xl pin-shadow relative flex flex-col justify-between group"
            >
              {/* Pushpin Decorative Icon */}
              <div className="absolute -top-3 left-8 text-red-500 z-10">
                <Pin className="w-6 h-6 fill-red-500 drop-shadow-sm rotate-12" />
              </div>

              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-pine/10 text-pine uppercase tracking-wider">
                    {job.type}
                  </span>
                  <span className="text-xs font-semibold text-moss flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {job.location}
                  </span>
                </div>

                <h3 className="text-xl font-heading font-extrabold text-pine group-hover:text-marigold-hover transition-colors mb-1">
                  {job.title}
                </h3>
                <p className="text-sm font-bold text-moss-dark mb-4">{job.companyName}</p>

                <p className="text-sm text-pine/80 line-clamp-3 leading-relaxed mb-6">
                  {job.description}
                </p>

                {/* Skill Pills */}
                {job.requirements && job.requirements.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {job.requirements.map((req: string, i: number) => (
                      <span key={i} className="text-[11px] font-semibold bg-white/80 border border-amber-200 text-pine px-2 py-0.5 rounded-md">
                        #{req}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-amber-200/60 flex items-center justify-between">
                <span className="text-xs font-bold text-pine/70 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-marigold fill-marigold" /> Gemini AI Match Ready
                </span>

                <Link 
                  href={`/jobs/${job._id}`}
                  className="inline-flex items-center gap-1 text-xs font-extrabold bg-pine text-white px-4 py-2 rounded-full hover:bg-pine-light transition-colors"
                >
                  View Details <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}

          {filteredJobs?.length === 0 && (
            <div className="col-span-full py-16 text-center glass-card rounded-2xl">
              <p className="text-moss-dark font-semibold">No campus jobs matching your search criteria.</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
