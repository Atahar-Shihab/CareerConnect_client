'use client';

import { useAuth } from '@/context/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Pin, Plus, AlertCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function PostListingPage() {
  const { user, token } = useAuth();
  const queryClient = useQueryClient();
  const router = useRouter();

  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('Dhaka');
  const [jobType, setJobType] = useState('full-time');
  const [description, setDescription] = useState('');
  const [requirementsInput, setRequirementsInput] = useState('');

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

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
      router.push('/items/manage');
    }
  });

  if (!user) {
    return (
      <div className="py-20 text-center max-w-md mx-auto">
        <div className="glass-card p-8 rounded-3xl pin-shadow border border-moss-light">
          <AlertCircle className="w-12 h-12 text-marigold mx-auto mb-4" />
          <h2 className="text-xl font-heading font-extrabold text-pine mb-2">Authentication Required</h2>
          <p className="text-moss-dark text-sm mb-6">Please log in to post a new listing.</p>
          <Link href="/login" className="btn-pin-primary flex justify-center items-center">
            Go to Login <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pin-card-green p-8 md:p-10 rounded-3xl pin-shadow relative">
        <div className="absolute -top-4 left-10 text-emerald-600">
          <Pin className="w-8 h-8 fill-emerald-600 drop-shadow-sm rotate-12" />
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-heading font-extrabold text-pine flex items-center gap-2">
              <Plus className="w-8 h-8 text-pine" /> Post a New Listing
            </h2>
            <p className="text-moss-dark font-medium mt-2">
              Share your opportunity with the campus network.
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
          }} className="space-y-6">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-extrabold uppercase text-pine mb-1.5">Job Title</label>
                <input 
                  type="text" required
                  placeholder="e.g. Junior Software Engineer"
                  className="w-full bg-white border border-emerald-200 p-3 rounded-xl text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-pine mb-1.5">Company Name</label>
                <input 
                  type="text" required
                  placeholder="e.g. TechCorp Bangladesh"
                  className="w-full bg-white border border-emerald-200 p-3 rounded-xl text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-extrabold uppercase text-pine mb-1.5">Location</label>
                <input 
                  type="text" required
                  placeholder="e.g. Dhaka (Gulshan) or Remote"
                  className="w-full bg-white border border-emerald-200 p-3 rounded-xl text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-pine mb-1.5">Employment Type</label>
                <select 
                  className="w-full bg-white border border-emerald-200 p-3 rounded-xl text-sm font-semibold text-pine focus:outline-none focus:ring-2 focus:ring-pine"
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
              <label className="block text-xs font-extrabold uppercase text-pine mb-1.5">Description</label>
              <textarea 
                required rows={5}
                placeholder="Describe the job role, responsibilities, and team culture..."
                className="w-full bg-white border border-emerald-200 p-3 rounded-xl text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase text-pine mb-1.5">Required Skills (Comma separated)</label>
              <input 
                type="text" 
                placeholder="React, TypeScript, Node.js"
                className="w-full bg-white border border-emerald-200 p-3 rounded-xl text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine"
                value={requirementsInput}
                onChange={(e) => setRequirementsInput(e.target.value)}
              />
            </div>

            <div className="pt-2">
              <button type="submit" className="w-full sm:w-auto btn-pin-secondary text-base px-8 py-3" disabled={createJob.isPending}>
                {createJob.isPending ? 'Publishing...' : 'Publish Job to Pinboard'}
              </button>
            </div>

          </form>
        </div>
      </motion.div>
    </div>
  );
}
