'use client';

import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Pin, Search, MapPin, Sparkles, ChevronRight, SlidersHorizontal, ArrowUpDown, Loader2 } from 'lucide-react';

export default function JobsPage() {
  const { token } = useAuth();
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterSkill, setFilterSkill] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);
  const [allJobs, setAllJobs] = useState<any[]>([]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  const buildQueryParams = () => {
    const params = new URLSearchParams();
    params.set('page', String(page));
    params.set('limit', '12');
    params.set('sort', sortBy);
    if (filterType && filterType !== 'all') params.set('type', filterType);
    if (filterLocation) params.set('location', filterLocation);
    if (filterSkill) params.set('skill', filterSkill);
    return params.toString();
  };

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['jobs', page, sortBy, filterType, filterLocation, filterSkill],
    queryFn: async () => {
      const headers: HeadersInit = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${API_URL}/api/jobs?${buildQueryParams()}`, { headers });
      if (!res.ok) return { jobs: [], total: 0, page: 1, limit: 12, hasMore: false };
      const result = await res.json();
      
      // Support both old array response and new paginated response
      if (Array.isArray(result)) {
        return { jobs: result, total: result.length, page: 1, limit: 12, hasMore: false };
      }
      return result;
    },
  });

  // Client-side search filter on top of server-side results
  const serverJobs = data?.jobs || [];
  const filteredJobs = serverJobs.filter((job: any) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (job.title || '').toLowerCase().includes(q) || 
           (job.companyName || '').toLowerCase().includes(q) ||
           (job.description || '').toLowerCase().includes(q);
  });

  const hasMore = data?.hasMore || false;
  const total = data?.total || 0;

  const handleLoadMore = () => setPage(prev => prev + 1);

  const handleFilterReset = () => {
    setSearch('');
    setFilterType('all');
    setFilterLocation('');
    setFilterSkill('');
    setSortBy('newest');
    setPage(1);
  };

  // Skeleton card component
  const SkeletonCard = () => (
    <div className="pin-card-yellow p-5 rounded-2xl pin-shadow animate-pulse">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="h-5 w-20 bg-moss-light/60 rounded-full" />
        <div className="h-4 w-16 bg-moss-light/60 rounded-md" />
      </div>
      <div className="h-6 w-3/4 bg-moss-light/60 rounded-lg mb-2" />
      <div className="h-4 w-1/2 bg-moss-light/60 rounded-md mb-4" />
      <div className="h-4 w-full bg-moss-light/40 rounded-md mb-1.5" />
      <div className="h-4 w-5/6 bg-moss-light/40 rounded-md mb-1.5" />
      <div className="h-4 w-2/3 bg-moss-light/40 rounded-md mb-5" />
      <div className="flex gap-1.5 mb-5">
        <div className="h-5 w-14 bg-moss-light/50 rounded-md" />
        <div className="h-5 w-16 bg-moss-light/50 rounded-md" />
        <div className="h-5 w-12 bg-moss-light/50 rounded-md" />
      </div>
      <div className="pt-3 border-t border-amber-200/40 flex items-center justify-between">
        <div className="h-4 w-28 bg-moss-light/50 rounded-md" />
        <div className="h-8 w-24 bg-moss-light/60 rounded-full" />
      </div>
    </div>
  );

  return (
    <div className="space-y-6 pb-16">
      
      {/* HEADER & SEARCH */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-pine tracking-tight flex items-center gap-3">
              <Pin className="w-7 h-7 sm:w-8 sm:h-8 text-marigold fill-marigold rotate-12" />
              Campus Opportunities
            </h1>
            <p className="text-moss-dark font-medium text-sm mt-1">Browse verified tech jobs & internships. {total > 0 && <span className="text-pine font-bold">{total} postings available</span>}</p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/items/add" className="btn-pin-primary text-xs py-2 px-4">
              + Post New Job
            </Link>
          </div>
        </div>

        {/* SEARCH & FILTER CONTROL BAR */}
        <div className="glass-card p-3 rounded-2xl space-y-3 border border-moss-light">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-moss absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search by job title, company, or skills..."
                className="w-full bg-white/70 border border-moss-light pl-10 pr-4 py-2 rounded-xl text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-marigold"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 shrink-0">
              <ArrowUpDown className="w-3.5 h-3.5 text-moss" />
              <select
                value={sortBy}
                onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
                className="bg-white/70 border border-moss-light px-3 py-2 rounded-xl text-xs font-bold text-pine focus:outline-none focus:ring-2 focus:ring-marigold appearance-none cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-moss shrink-0" />
            
            {/* Type Filter */}
            <div className="flex items-center gap-1 bg-moss-light/50 p-1 rounded-xl overflow-x-auto">
              {['all', 'full-time', 'internship', 'part-time'].map((type) => (
                <button
                  key={type}
                  onClick={() => { setFilterType(type); setPage(1); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all whitespace-nowrap ${filterType === type ? 'bg-pine text-white shadow-sm' : 'text-moss-dark hover:text-pine'}`}
                >
                  {type === 'all' ? 'All Types' : type}
                </button>
              ))}
            </div>

            {/* Location Filter */}
            <input
              type="text"
              placeholder="📍 Location..."
              value={filterLocation}
              onChange={(e) => { setFilterLocation(e.target.value); setPage(1); }}
              className="bg-white/70 border border-moss-light px-3 py-1.5 rounded-xl text-xs font-medium text-pine focus:outline-none focus:ring-2 focus:ring-marigold w-28 sm:w-32"
            />

            {/* Skill Filter */}
            <input
              type="text"
              placeholder="🛠 Skill..."
              value={filterSkill}
              onChange={(e) => { setFilterSkill(e.target.value); setPage(1); }}
              className="bg-white/70 border border-moss-light px-3 py-1.5 rounded-xl text-xs font-medium text-pine focus:outline-none focus:ring-2 focus:ring-marigold w-28 sm:w-32"
            />

            {(filterLocation || filterSkill || filterType !== 'all' || sortBy !== 'newest') && (
              <button
                onClick={handleFilterReset}
                className="text-[11px] font-bold text-marigold-hover hover:text-pine transition-colors underline"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* JOBS BOARD GRID */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredJobs.map((job: any, index: number) => (
              <motion.div
                key={job._id || index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ y: -4, rotate: index % 2 === 0 ? 0.5 : -0.5 }}
                className="pin-card-yellow p-5 rounded-2xl pin-shadow relative flex flex-col justify-between group"
              >
                {/* Pushpin Decorative Icon */}
                <div className="absolute -top-3 left-6 text-red-500 z-10">
                  <Pin className="w-5 h-5 fill-red-500 drop-shadow-sm rotate-12" />
                </div>

                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pine/10 text-pine uppercase tracking-wider">
                      {job.type || 'Job'}
                    </span>
                    <span className="text-[10px] font-semibold text-moss flex items-center gap-0.5">
                      <MapPin className="w-3 h-3" /> {job.location || 'Remote'}
                    </span>
                  </div>

                  <h3 className="text-base font-heading font-extrabold text-pine group-hover:text-marigold-hover transition-colors mb-0.5 line-clamp-2">
                    {job.title}
                  </h3>
                  <p className="text-xs font-bold text-moss-dark mb-3">{job.companyName}</p>

                  <p className="text-xs text-pine/80 line-clamp-3 leading-relaxed mb-4">
                    {job.description}
                  </p>

                  {/* Skill Pills */}
                  {job.requirements && Array.isArray(job.requirements) && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {job.requirements.slice(0, 4).map((req: string, i: number) => (
                        <span key={i} className="text-[10px] font-semibold bg-white/80 border border-amber-200 text-pine px-1.5 py-0.5 rounded-md">
                          #{req}
                        </span>
                      ))}
                      {job.requirements.length > 4 && (
                        <span className="text-[10px] font-semibold text-moss">+{job.requirements.length - 4}</span>
                      )}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-amber-200/60 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-pine/70 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-marigold fill-marigold" /> AI Match Ready
                  </span>

                  <Link 
                    href={`/jobs/${job._id}`}
                    className="inline-flex items-center gap-0.5 text-[11px] font-extrabold bg-pine text-white px-3 py-1.5 rounded-full hover:bg-pine-light transition-colors"
                  >
                    View <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}

            {filteredJobs.length === 0 && (
              <div className="col-span-full py-16 text-center glass-card rounded-2xl">
                <p className="text-moss-dark font-semibold">No campus jobs matching your search criteria.</p>
                <button onClick={handleFilterReset} className="btn-pin-secondary text-xs mt-3">Clear Filters</button>
              </div>
            )}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="text-center pt-4">
              <button
                onClick={handleLoadMore}
                disabled={isFetching}
                className="btn-pin-primary text-xs py-2.5 px-8 inline-flex items-center gap-2"
              >
                {isFetching ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Loading...</>
                ) : (
                  'Load More Postings'
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
