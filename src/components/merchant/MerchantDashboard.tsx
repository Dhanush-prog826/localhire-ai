import React, { useState } from 'react';
import type { MerchantTab } from '../../types';
import { useApp } from '../../context/AppContext';
import { INITIAL_EMPLOYER_QUERY } from '../../data/mockData';
import { parseEmployerQuery } from '../../utils/aiParser';
import { MerchantApplicants } from './MerchantApplicants';
import { MerchantProfile } from './MerchantProfile';
import {
  Users,
  PlusCircle,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface MerchantDashboardProps {
  activeTab: MerchantTab;
  setActiveTab: (tab: MerchantTab) => void;
  onNotify: (msg: string) => void;
}

export const MerchantDashboard: React.FC<MerchantDashboardProps> = ({
  activeTab,
  setActiveTab,
  onNotify,
}) => {
  const { merchantProfile, jobs, applicants, createJob } = useApp();

  // Selected job for viewing applicants
  const [filterJobId, setFilterJobId] = useState<string | undefined>('job-1');

  // Natural language job posting state
  const [query, setQuery] = useState<string>(INITIAL_EMPLOYER_QUERY);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [extraction, setExtraction] = useState(() => ({
    ...parseEmployerQuery(INITIAL_EMPLOYER_QUERY),
    location: merchantProfile.location,
  }));

  // Merchant's jobs
  const myJobs = jobs.filter((j) => j.merchantId === merchantProfile.id);

  // Execute NLP extraction & job creation
  const handleCreateJob = (queryToPost: string = query) => {
    setIsProcessing(true);
    setTimeout(() => {
      const parsed = parseEmployerQuery(queryToPost);
      const fullExtraction = {
        ...parsed,
        location: merchantProfile.location,
      };
      setExtraction(fullExtraction);

      // Create the job into state
      const created = createJob({
        title: parsed.position,
        salary: parsed.salary,
        workingHours: parsed.workingHours,
        requiredSkills: parsed.skills,
        jobType: parsed.jobType,
        locationArea: merchantProfile.location,
        description: `Looking for reliable staff for ${parsed.position}. Shift: ${parsed.workingHours}. Knowledge in ${parsed.skills.join(', ')}.`,
      });

      setIsProcessing(false);
      onNotify(`Job "${created.title}" is now active on the hyperlocal feed!`);
    }, 400);
  };

  const handleOpenJobApplicants = (jobId: string) => {
    setFilterJobId(jobId);
    setActiveTab('applicants');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6 pb-20 sm:pb-8">
      {/* Top Header & Desktop Nav */}
      <div className="hidden sm:flex items-center justify-between border-b border-slate-200 pb-3">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <span>{merchantProfile.businessName}</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Employer Portal
            </span>
          </h2>
          <p className="text-xs text-slate-500">
            {merchantProfile.businessType} • {merchantProfile.location}
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'jobs'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            My Job Posts ({myJobs.length})
          </button>
          <button
            onClick={() => {
              setFilterJobId(undefined);
              setActiveTab('applicants');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'applicants'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Applicants</span>
            <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
              {applicants.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Store Profile
          </button>
        </div>
      </div>

      {/* RENDER BY ACTIVE TAB */}

      {/* 1. MERCHANT DASHBOARD OVERVIEW */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Key Store Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs">
              <p className="text-xs text-slate-500 font-semibold">Active Job Posts</p>
              <p className="text-2xl font-extrabold text-emerald-700 mt-1">
                {myJobs.length}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">Live on hyperlocal feed</p>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs">
              <p className="text-xs text-slate-500 font-semibold">Total Applicants</p>
              <p className="text-2xl font-extrabold text-indigo-600 mt-1">
                {applicants.length}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">👥 Local candidates</p>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs">
              <p className="text-xs text-slate-500 font-semibold">Shortlisted</p>
              <p className="text-2xl font-extrabold text-purple-600 mt-1">
                {applicants.filter((a) => a.status === 'Shortlisted').length}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">Ready for interview</p>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs">
              <p className="text-xs text-slate-500 font-semibold">Accepted Hires</p>
              <p className="text-2xl font-extrabold text-teal-600 mt-1">
                {applicants.filter((a) => a.status === 'Accepted').length}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">Confirmed shifts</p>
            </div>
          </div>

          {/* Quick Post & Primary Job Banner */}
          <div className="bg-gradient-to-r from-emerald-800 to-slate-900 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10 max-w-xl space-y-3">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 inline-flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Featured Active Job
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold">
                Billing Assistant • 6 PM – 10 PM
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                12 candidates applied within 5 km. 4 shortlisted. Review applications now to schedule shift trials.
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                <button
                  onClick={() => handleOpenJobApplicants('job-1')}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-98 cursor-pointer flex items-center gap-1.5"
                >
                  <Users className="w-4 h-4" />
                  <span>Review 12 Applicants</span>
                </button>
                <button
                  onClick={() => setActiveTab('jobs')}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all cursor-pointer"
                >
                  Post Another Opening
                </button>
              </div>
            </div>
          </div>

          {/* My Jobs Preview */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                My Job Posts
              </h3>
              <button
                onClick={() => setActiveTab('jobs')}
                className="text-xs font-semibold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View all posts</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {myJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 className="text-base font-bold text-slate-900">
                        {job.title}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {job.businessName} • {job.locationArea}
                      </p>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Status: {job.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 my-3 py-2 border-y border-slate-100 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400">Salary</span>
                      <p className="font-bold text-emerald-700">{job.salary}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400">Hours</span>
                      <p className="font-semibold text-slate-900">{job.workingHours}</p>
                    </div>
                  </div>

                  {/* Applicant and Shortlisted counts */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="text-xs font-bold text-slate-700">
                      <span>👥 {job.applicantCount} Applicants</span>
                      <span className="mx-2 text-slate-300">•</span>
                      <span className="text-indigo-600">{job.shortlistedCount} Shortlisted</span>
                    </div>

                    <button
                      onClick={() => handleOpenJobApplicants(job.id)}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Open Job
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. MY JOB POSTS & NATURAL LANGUAGE POSTING TAB */}
      {activeTab === 'jobs' && (
        <div className="space-y-8">
          {/* Natural Language Job Creator Box */}
          <div className="bg-white border border-emerald-200/90 rounded-3xl p-5 sm:p-6 shadow-sm focus-within:ring-2 focus-within:ring-emerald-500 transition-all">
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="merchant-nl-post"
                className="text-xs font-bold uppercase tracking-wider text-emerald-950 flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Create Job with AI (Natural Language)</span>
              </label>
              <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold">
                AI Auto-Extraction
              </span>
            </div>

            <textarea
              id="merchant-nl-post"
              rows={3}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="I need someone for billing from 6 PM to 10 PM. Excel knowledge preferred. ₹6,000 per month."
              className="w-full text-slate-900 text-sm sm:text-base placeholder:text-slate-400 border border-slate-200 rounded-2xl p-3.5 focus:outline-none focus:bg-slate-50/50 resize-none font-medium leading-relaxed"
            />

            <div className="mt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-xs overflow-x-auto pb-1 sm:pb-0">
                <span className="text-slate-400 text-[11px]">Presets:</span>
                <button
                  type="button"
                  onClick={() => {
                    const q = "I need someone for billing from 6 PM to 10 PM. Excel knowledge preferred. ₹6,000 per month.";
                    setQuery(q);
                    handleCreateJob(q);
                  }}
                  className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] hover:bg-emerald-50 cursor-pointer shrink-0"
                >
                  Billing Assistant (6-10 PM)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const q = "Hiring evening cashier from 5 PM to 9 PM. ₹7,000 per month in Sector 14.";
                    setQuery(q);
                    handleCreateJob(q);
                  }}
                  className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] hover:bg-emerald-50 cursor-pointer shrink-0"
                >
                  Evening Cashier (5-9 PM)
                </button>
              </div>

              <button
                type="button"
                onClick={() => handleCreateJob(query)}
                disabled={isProcessing || !query.trim()}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <PlusCircle className={`w-4 h-4 ${isProcessing ? 'animate-spin' : ''}`} />
                <span>{isProcessing ? 'Extracting & Posting...' : 'Create Job'}</span>
              </button>
            </div>
          </div>

          {/* AI Extracted Parameters Breakdown Card */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>AI Extracted Job Parameters</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-xs">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-semibold block">Job Title</span>
                <span className="font-bold text-slate-900 truncate block">{extraction.position}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-semibold block">Required Skills</span>
                <span className="font-bold text-slate-900 truncate block">{extraction.skills.join(', ')}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-semibold block">Working Hours</span>
                <span className="font-bold text-slate-900 truncate block">{extraction.workingHours}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-semibold block">Salary</span>
                <span className="font-bold text-emerald-700 truncate block">{extraction.salary}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-semibold block">Job Type</span>
                <span className="font-bold text-purple-700 truncate block">{extraction.jobType}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-semibold block">Location</span>
                <span className="font-bold text-rose-700 truncate block">{extraction.location}</span>
              </div>
            </div>
          </div>

          {/* All Posted Jobs List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                All Posted Jobs
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                {myJobs.length} Active Positions
              </span>
            </div>

            <div className="space-y-3">
              {myJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs hover:shadow-sm hover:border-emerald-200 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h4 className="text-base font-bold text-slate-900 truncate">
                        {job.title}
                      </h4>
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Status: {job.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600">
                      <span className="font-bold text-emerald-700">{job.salary}</span>
                      <span>•</span>
                      <span>{job.workingHours}</span>
                      <span>•</span>
                      <span>{job.locationArea}</span>
                    </div>

                    {/* Applicant & Shortlisted Counts (Prompt requirement) */}
                    <div className="mt-2.5 flex items-center gap-3 text-xs font-bold">
                      <span className="text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg">
                        👥 {job.applicantCount} Applicants
                      </span>
                      <span className="text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg">
                        {job.shortlistedCount} Shortlisted
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                    <button
                      onClick={() => handleOpenJobApplicants(job.id)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>View Applicants ({job.applicantCount})</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. APPLICANTS TAB */}
      {activeTab === 'applicants' && (
        <MerchantApplicants
          filterJobId={filterJobId}
          onClearFilter={() => setFilterJobId(undefined)}
        />
      )}

      {/* 4. MERCHANT STORE PROFILE TAB */}
      {activeTab === 'profile' && <MerchantProfile />}
    </div>
  );
};
