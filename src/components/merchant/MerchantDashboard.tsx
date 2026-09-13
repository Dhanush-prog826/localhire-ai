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
      <div className="hidden sm:flex items-center justify-between border-b border-red-950/40 pb-3">
        <div>
          <h2 className="text-xl font-extrabold text-zinc-100 flex items-center gap-2">
            <span>{merchantProfile.businessName}</span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-red-950/60 text-red-400 border border-red-800/50 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              COMMAND POST // VERIFIED EMPLOYER
            </span>
          </h2>
          <p className="text-xs font-mono text-zinc-400 mt-0.5">
            {merchantProfile.businessType} • {merchantProfile.location}
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 bg-zinc-950/90 p-1 rounded-2xl border border-red-950/60 shadow-md">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-sm shadow-red-950'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
            }`}
          >
            OVERVIEW
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'jobs'
                ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-sm shadow-red-950'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
            }`}
          >
            MY JOB POSTS ({myJobs.length})
          </button>
          <button
            onClick={() => {
              setFilterJobId(undefined);
              setActiveTab('applicants');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'applicants'
                ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-sm shadow-red-950'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
            }`}
          >
            <span>APPLICANTS</span>
            <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
              {applicants.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-sm shadow-red-950'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
            }`}
          >
            STORE PROFILE
          </button>
        </div>
      </div>

      {/* RENDER BY ACTIVE TAB */}

      {/* 1. MERCHANT DASHBOARD OVERVIEW */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Key Store Metrics: 12 APPLICANTS, 4 SHORTLISTED, 1 INTERVIEW, 1 OPEN POSITION */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-zinc-950/85 border border-red-950/50 hover:border-red-900/60 rounded-2xl p-4 shadow-lg transition-all">
              <p className="text-xs text-zinc-400 font-mono uppercase tracking-wider">Total Applicants</p>
              <p className="text-2xl font-mono font-extrabold text-red-500 mt-1">
                {applicants.length}
              </p>
              <p className="text-[11px] text-zinc-500 font-mono mt-0.5">Local candidates in range</p>
            </div>

            <div className="bg-zinc-950/85 border border-red-950/50 hover:border-red-900/60 rounded-2xl p-4 shadow-lg transition-all">
              <p className="text-xs text-zinc-400 font-mono uppercase tracking-wider">Shortlisted</p>
              <p className="text-2xl font-mono font-extrabold text-orange-400 mt-1">
                {applicants.filter((a) => a.status === 'Shortlisted').length || 4}
              </p>
              <p className="text-[11px] text-zinc-500 font-mono mt-0.5">Vetted for shift trial</p>
            </div>

            <div className="bg-zinc-950/85 border border-red-950/50 hover:border-red-900/60 rounded-2xl p-4 shadow-lg transition-all">
              <p className="text-xs text-zinc-400 font-mono uppercase tracking-wider">Interview Slots</p>
              <p className="text-2xl font-mono font-extrabold text-amber-400 mt-1">
                {applicants.filter((a) => a.status === 'Interview').length || 1}
              </p>
              <p className="text-[11px] text-zinc-500 font-mono mt-0.5">Scheduled this week</p>
            </div>

            <div className="bg-zinc-950/85 border border-red-950/50 hover:border-red-900/60 rounded-2xl p-4 shadow-lg transition-all">
              <p className="text-xs text-zinc-400 font-mono uppercase tracking-wider">Open Positions</p>
              <p className="text-2xl font-mono font-extrabold text-emerald-400 mt-1">
                {myJobs.length || 1}
              </p>
              <p className="text-[11px] text-zinc-500 font-mono mt-0.5">Live on hyperlocal radar</p>
            </div>
          </div>

          {/* Quick Post & Primary Job Banner */}
          <div className="bg-zinc-950/90 border border-red-900/60 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 opacity-90" />
            
            <div className="relative z-10 max-w-xl space-y-3">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-red-950/70 text-red-400 border border-red-800/60 inline-flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-red-400" />
                Featured Active Job Assignment
              </span>
              <h3 className="text-xl sm:text-2xl font-mono font-extrabold text-zinc-100">
                Billing Assistant • 6 PM – 10 PM
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-mono">
                12 candidates applied within 5 km. 4 shortlisted. Review applications now to schedule shift trials.
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                <button
                  onClick={() => handleOpenJobApplicants('job-1')}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-mono font-bold text-xs shadow-md shadow-red-950 transition-all active:scale-98 cursor-pointer flex items-center gap-1.5"
                >
                  <Users className="w-4 h-4" />
                  <span>REVIEW 12 APPLICANTS</span>
                </button>
                <button
                  onClick={() => setActiveTab('jobs')}
                  className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-mono font-semibold text-xs border border-zinc-800 transition-all cursor-pointer"
                >
                  POST ANOTHER OPENING
                </button>
              </div>
            </div>
          </div>

          {/* My Jobs Preview */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-mono font-bold uppercase tracking-wider text-zinc-100">
                My Posted Openings
              </h3>
              <button
                onClick={() => setActiveTab('jobs')}
                className="text-xs font-mono text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
              >
                <span>View all posts</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {myJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-zinc-950/85 border border-red-950/50 hover:border-red-600/50 rounded-2xl p-5 shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 className="text-base font-bold text-zinc-100">
                        {job.title}
                      </h4>
                      <p className="text-xs text-zinc-500 font-mono">
                        {job.businessName} • {job.locationArea}
                      </p>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-red-950/60 text-red-400 border border-red-800/50">
                      STATUS: {job.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 my-3 py-2 border-y border-zinc-800/80 text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase">Salary</span>
                      <p className="font-bold text-red-400">{job.salary}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase">Hours</span>
                      <p className="font-semibold text-zinc-200">{job.workingHours}</p>
                    </div>
                  </div>

                  {/* Applicant and Shortlisted counts */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="text-xs font-mono font-bold text-zinc-400 flex items-center gap-2">
                      <span>👥 {job.applicantCount} APPLICANTS</span>
                      <span className="text-zinc-700">•</span>
                      <span className="text-red-400">{job.shortlistedCount} SHORTLISTED</span>
                    </div>

                    <button
                      onClick={() => handleOpenJobApplicants(job.id)}
                      className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-red-950 text-zinc-200 hover:text-red-300 border border-zinc-800 hover:border-red-800/60 text-xs font-mono font-semibold transition-colors cursor-pointer"
                    >
                      OPEN JOB
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
          <div className="bg-zinc-950/90 border border-red-950/70 focus-within:border-red-600/70 rounded-3xl p-5 sm:p-6 shadow-xl transition-all">
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="merchant-nl-post"
                className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-100 flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-red-500" />
                <span>Create Job with AI (Natural Language)</span>
              </label>
              <span className="text-[10px] font-mono font-bold text-red-400 bg-red-950/60 border border-red-800/50 px-2 py-0.5 rounded-md">
                AI AUTO-EXTRACTION ACTIVE
              </span>
            </div>

            <textarea
              id="merchant-nl-post"
              rows={3}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="I need someone for billing from 6 PM to 10 PM. Excel knowledge preferred. ₹6,000 per month."
              className="w-full text-zinc-100 text-sm sm:text-base placeholder:text-zinc-500 bg-zinc-900/90 border border-zinc-800 rounded-2xl p-3.5 focus:outline-none focus:border-red-600/70 resize-none font-mono leading-relaxed"
            />

            <div className="mt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-zinc-800/80">
              <div className="flex items-center gap-1.5 text-xs overflow-x-auto pb-1 sm:pb-0">
                <span className="text-zinc-500 text-[11px] font-mono">Presets:</span>
                <button
                  type="button"
                  onClick={() => {
                    const q = "I need someone for billing from 6 PM to 10 PM. Excel knowledge preferred. ₹6,000 per month.";
                    setQuery(q);
                    handleCreateJob(q);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-[11px] font-mono border border-zinc-800 cursor-pointer shrink-0"
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
                  className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-[11px] font-mono border border-zinc-800 cursor-pointer shrink-0"
                >
                  Evening Cashier (5-9 PM)
                </button>
              </div>

              <button
                type="button"
                onClick={() => handleCreateJob(query)}
                disabled={isProcessing || !query.trim()}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 disabled:opacity-50 text-white font-mono font-bold text-xs sm:text-sm shadow-md shadow-red-950 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <PlusCircle className={`w-4 h-4 ${isProcessing ? 'animate-spin' : ''}`} />
                <span>{isProcessing ? 'EXTRACTING & POSTING...' : 'DISPATCH OPENING'}</span>
              </button>
            </div>
          </div>

          {/* AI Extracted Parameters Breakdown Card */}
          <div className="bg-zinc-950/90 border border-red-950/60 rounded-2xl p-5 shadow-lg">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-red-500" />
              <span>AI Extracted Parameters Breakdown</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-xs font-mono">
              <div className="bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800">
                <span className="text-[10px] text-zinc-500 uppercase font-semibold block">Job Title</span>
                <span className="font-bold text-zinc-100 truncate block">{extraction.position}</span>
              </div>
              <div className="bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800">
                <span className="text-[10px] text-zinc-500 uppercase font-semibold block">Required Skills</span>
                <span className="font-bold text-zinc-100 truncate block">{extraction.skills.join(', ')}</span>
              </div>
              <div className="bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800">
                <span className="text-[10px] text-zinc-500 uppercase font-semibold block">Working Hours</span>
                <span className="font-bold text-zinc-100 truncate block">{extraction.workingHours}</span>
              </div>
              <div className="bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800">
                <span className="text-[10px] text-zinc-500 uppercase font-semibold block">Salary</span>
                <span className="font-bold text-red-400 truncate block">{extraction.salary}</span>
              </div>
              <div className="bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800">
                <span className="text-[10px] text-zinc-500 uppercase font-semibold block">Job Type</span>
                <span className="font-bold text-orange-400 truncate block">{extraction.jobType}</span>
              </div>
              <div className="bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800">
                <span className="text-[10px] text-zinc-500 uppercase font-semibold block">Location</span>
                <span className="font-bold text-red-500 truncate block">{extraction.location}</span>
              </div>
            </div>
          </div>

          {/* All Posted Jobs List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-mono font-bold uppercase tracking-wider text-zinc-100">
                Active Job Positions
              </h3>
              <span className="text-xs font-mono text-zinc-500">
                {myJobs.length} Live Openings
              </span>
            </div>

            <div className="space-y-3">
              {myJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-zinc-950/85 border border-red-950/50 hover:border-red-600/50 rounded-2xl p-5 shadow-lg transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h4 className="text-base font-bold text-zinc-100 truncate">
                        {job.title}
                      </h4>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-red-950/60 text-red-400 border border-red-800/50">
                        STATUS: {job.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-400 font-mono">
                      <span className="font-bold text-red-400">{job.salary}</span>
                      <span>•</span>
                      <span>{job.workingHours}</span>
                      <span>•</span>
                      <span>{job.locationArea}</span>
                    </div>

                    {/* Applicant & Shortlisted Counts */}
                    <div className="mt-2.5 flex items-center gap-3 text-xs font-mono font-bold">
                      <span className="text-zinc-300 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-lg">
                        👥 {job.applicantCount} APPLICANTS
                      </span>
                      <span className="text-red-400 bg-red-950/60 border border-red-800/50 px-2.5 py-1 rounded-lg">
                        {job.shortlistedCount} SHORTLISTED
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                    <button
                      onClick={() => handleOpenJobApplicants(job.id)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-mono font-bold shadow-md shadow-red-950 transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>VIEW APPLICANTS ({job.applicantCount})</span>
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
