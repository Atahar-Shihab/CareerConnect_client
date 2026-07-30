'use client';

import { useAuth } from '@/context/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Pin, Briefcase, Trash2, Plus, AlertCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ManageListingsPage() {
  const { user, token } = useAuth();
  const queryClient = useQueryClient();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  const { data: employerJobs, isLoading } = useQuery({
    queryKey: ['employerJobs'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/jobs/employer/my-jobs`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch employer jobs');
      return res.json();
    },
    enabled: !!token,
  });

  const deleteJob = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${API_URL}/api/jobs/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete job');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employerJobs'] });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    }
  });

  if (!user) {
    return (
      <div className="py-20 text-center max-w-md mx-auto">
        <div className="glass-card p-8 rounded-3xl pin-shadow border border-moss-light">
          <AlertCircle className="w-12 h-12 text-marigold mx-auto mb-4" />
          <h2 className="text-xl font-heading font-extrabold text-pine mb-2">Authentication Required</h2>
          <p className="text-moss-dark text-sm mb-6">Please log in to manage your listings.</p>
          <Link href="/login" className="btn-pin-primary flex justify-center items-center">
            Go to Login <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pin-card-yellow p-8 md:p-10 rounded-3xl pin-shadow relative">
        <div className="absolute -top-4 left-10 text-red-500">
          <Pin className="w-8 h-8 fill-red-500 drop-shadow-sm rotate-12" />
        </div>

        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-heading font-extrabold text-pine flex items-center gap-2">
                <Briefcase className="w-8 h-8 text-marigold" /> Manage Listings
              </h2>
              <p className="text-moss-dark font-medium mt-2">
                View and manage the opportunities you've posted.
              </p>
            </div>
            <Link href="/items/add" className="btn-pin-primary shrink-0">
              <Plus className="w-5 h-5 mr-1" /> Post New
            </Link>
          </div>

          {isLoading ? (
            <p className="text-sm text-moss-dark font-semibold py-12 text-center">Loading listings...</p>
          ) : (
            <div className="space-y-6">
              {employerJobs?.map((job: any) => (
                <div key={job._id} className="bg-white/80 p-6 rounded-2xl border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:shadow-md">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-pine/10 text-pine inline-block mb-2">
                      {job.type}
                    </span>
                    <h3 className="text-xl font-heading font-extrabold text-pine">{job.title}</h3>
                    <p className="text-sm font-semibold text-moss mt-1">{job.location} • {job.companyName}</p>
                    <p className="text-xs font-bold text-marigold-hover mt-2">
                      {job.applications?.length || 0} Applicant(s)
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      if(window.confirm('Are you sure you want to delete this listing?')) {
                        deleteJob.mutate(job._id);
                      }
                    }}
                    disabled={deleteJob.isPending}
                    className="p-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors border border-red-200"
                    title="Delete Listing"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}

              {employerJobs?.length === 0 && (
                <div className="text-center py-16 bg-white/50 rounded-2xl border border-dashed border-amber-300">
                  <p className="text-sm font-bold text-moss-dark mb-4">You haven't posted any listings yet.</p>
                  <Link href="/items/add" className="btn-pin-secondary text-sm">
                    Create Your First Listing
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
