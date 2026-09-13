import React, { useState } from 'react';
import type { SeekerTab, Job, Application, ApplicationStatus } from '../../types';
import { useApp } from '../../context/AppContext';
import { INITIAL_SEEKER_QUERY } from '../../data/mockData';
import { parseJobSeekerQuery, filterAndRankJobs } from '../../utils/aiParser';
import { AiExtractionCard } from '../AiExtractionCard';
import { JobCard } from '../JobCard';
import { SeekerProfile } from './SeekerProfile';
import { ApplicationTimelineModal } from './ApplicationTimelineModal';
import {
  Sparkles,
  Search,
  Bookmark,
  BookmarkCheck,
  FileCheck2,
  Building2,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';

interface SeekerDashboardProps {
  activeTab: SeekerTab;
  setActiveTab: (tab: SeekerTab) => void;
  onViewJob: (job: Job) => void;
}

export const SeekerDashboard: React.FC<SeekerDashboardProps> = ({
  activeTab,
  setActiveTab,
  onViewJob,
}) => {
  const {
    seekerProfile,
    jobs,
    applications,
    savedJobIds,
    toggleSaveJob,
  } = useApp();

  // Natural language search state inside Jobs/Dashboard
  const [query, setQuery] = useState<string>(INITIAL_SEEKER_QUERY);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [extraction, setExtraction] = useState(() => parseJobSeekerQuery(INITIAL_SEEKER_QUERY));
  const [rankedJobs, setRankedJobs] = useState<Job[]>(() =>
    filterAndRankJobs(parseJobSeekerQuery(INITIAL_SEEKER_QUERY), jobs)
  );

  // Selected application for timeline modal
  const [selectedAppForTimeline, setSelectedAppForTimeline] = useState<Application | null>(null);

  const handleSearch = (newQuery: string = query) => {
    setIsSearching(true);
    setTimeout(() => {
      const parsed = parseJobSeekerQuery(newQuery);
      setExtraction(parsed);
      setRankedJobs(filterAndRankJobs(parsed, jobs));
      setIsSearching(false);
    }, 350);
  };

  // Helper for status badge styling
  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'Applied':
        return {
          bg: 'bg-blue-950/60 text-blue-300 border-blue-800/60',
          dot: 'bg-blue-400',
        };
      case 'Under Review':
        return {
          bg: 'bg-amber-950/60 text-amber-300 border-amber-800/60',
          dot: 'bg-amber-400 animate-pulse',
        };
      case 'Shortlisted':
        return {
          bg: 'bg-cyan-950/70 text-cyan-300 border-cyan-700/70 shadow-xs shadow-cyan-950',
          dot: 'bg-cyan-400 animate-pulse',
        };
      case 'Interview':
        return {
          bg: 'bg-purple-950/60 text-purple-300 border-purple-800/60',
          dot: 'bg-purple-400',
        };
      case 'Accepted':
        return {
          bg: 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60',
          dot: 'bg-emerald-400',
        };
      case 'Rejected':
        return {
          bg: 'bg-zinc-900 text-zinc-400 border-zinc-800',
          dot: 'bg-zinc-500',
        };
      default:
        return {
          bg: 'bg-zinc-900 text-zinc-300 border-zinc-800',
          dot: 'bg-zinc-400',
        };
    }
  };

  // Saved jobs list
  const savedJobs = jobs.filter((j) => savedJobIds.includes(j.id));

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6 pb-20 sm:pb-8">
      {/* Top Desktop Navigation Tabs */}
      <div className="hidden sm:flex items-center justify-between border-b border-blue-950/60 pb-3">
        <div>
          <h2 className="text-xl font-extrabold text-zinc-100 flex items-center gap-2">
            <span>Welcome back, {seekerProfile.name}</span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-950/60 text-cyan-400 border border-blue-800/50 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              VERIFIED CANDIDATE
            </span>
          </h2>
          <p className="text-xs text-zinc-400 font-mono mt-0.5">
            {seekerProfile.location} • Preferred shift: {seekerProfile.preferredWorkingHours} (Radar: {seekerProfile.maxDistanceKm} km)
          </p>
        </div>

        {/* Tactical Command Tabs */}
        <div className="flex items-center gap-1 bg-zinc-950/90 p-1 rounded-2xl border border-blue-950/60 shadow-md">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-sm shadow-blue-950'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
            }`}
          >
            OVERVIEW
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'jobs'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-sm shadow-blue-950'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
            }`}
          >
            YOUR AI MATCHES
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'applications'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-sm shadow-blue-950'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
            }`}
          >
            <span>APPLICATION STATUS</span>
            {applications.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-cyan-500 text-black text-[10px] font-bold flex items-center justify-center">
                {applications.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'saved'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-sm shadow-blue-950'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
            }`}
          >
            SAVED JOBS ({savedJobIds.length})
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-sm shadow-blue-950'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
            }`}
          >
            PROFILE
          </button>
        </div>
      </div>

      {/* RENDER VIEW ACCORDING TO ACTIVE TAB */}

      {/* 1. DASHBOARD OVERVIEW TAB */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-zinc-950/85 border border-blue-950/50 hover:border-cyan-500/50 rounded-2xl p-4 shadow-lg transition-all">
              <p className="text-xs text-zinc-400 font-mono uppercase tracking-wider">Active Applications</p>
              <p className="text-2xl font-extrabold text-cyan-400 mt-1">
                {applications.length}
              </p>
              <p className="text-[11px] text-zinc-500 font-mono mt-0.5">Live status telemetry</p>
            </div>

            <div className="bg-zinc-950/85 border border-blue-950/50 hover:border-cyan-500/50 rounded-2xl p-4 shadow-lg transition-all">
              <p className="text-xs text-zinc-400 font-mono uppercase tracking-wider">Saved Jobs</p>
              <p className="text-2xl font-extrabold text-sky-400 mt-1">
                {savedJobIds.length}
              </p>
              <p className="text-[11px] text-zinc-500 font-mono mt-0.5">Ready for quick apply</p>
            </div>

            <div className="bg-zinc-950/85 border border-blue-950/50 hover:border-cyan-500/50 rounded-2xl p-4 shadow-lg transition-all">
              <p className="text-xs text-zinc-400 font-mono uppercase tracking-wider">Nearby Openings</p>
              <p className="text-2xl font-extrabold text-blue-400 mt-1">
                {jobs.length}
              </p>
              <p className="text-[11px] text-zinc-500 font-mono mt-0.5">Within 5 km radius</p>
            </div>

            <div className="bg-zinc-950/85 border border-blue-950/50 hover:border-cyan-500/50 rounded-2xl p-4 shadow-lg transition-all">
              <p className="text-xs text-zinc-400 font-mono uppercase tracking-wider">Highest Match</p>
              <p className="text-2xl font-extrabold text-emerald-400 mt-1">
                94%
              </p>
              <p className="text-[11px] text-zinc-500 font-mono mt-0.5">Billing Assistant (ABC)</p>
            </div>
          </div>

          {/* Active Application Status Alert / Banner */}
          {applications.length > 0 && (
            <div className="bg-zinc-950/90 border border-blue-900/50 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 via-cyan-400 to-sky-400" />
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-blue-950/70 border border-blue-800/50 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  APPLICATION DISPATCH TELEMETRY
                </span>
                <h4 className="text-sm sm:text-base font-bold text-zinc-100 mt-1.5">
                  {applications[0].jobTitle} at {applications[0].businessName}
                </h4>
                <p className="text-xs text-zinc-400 font-mono mt-0.5">
                  Status: <strong className="text-zinc-200">{applications[0].status}</strong> • Applied: {applications[0].appliedDate}
                </p>
              </div>

              <button
                onClick={() => setSelectedAppForTimeline(applications[0])}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold text-cyan-300 bg-blue-950/50 hover:bg-blue-900/60 border border-blue-800/60 shadow-sm transition-colors cursor-pointer"
              >
                <span>VIEW TIMELINE</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Quick AI Search & Matching Box */}
          <div className="bg-zinc-950/90 border border-blue-950/70 focus-within:border-cyan-500/60 rounded-3xl p-5 shadow-lg space-y-3 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-zinc-100">
                  AI Job Recommendation Engine
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('jobs')}
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
              >
                <span>Explore all jobs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <textarea
              rows={2}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="I can work from 6 PM to 10 PM, I know basic Excel, and I'm looking for a part-time job within 5 km."
              className="w-full text-zinc-100 placeholder:text-zinc-500 text-sm bg-zinc-900/90 border border-zinc-800/90 rounded-2xl p-3 focus:outline-none focus:border-cyan-500/60 resize-none font-mono"
            />

            <div className="flex justify-between items-center pt-1">
              <span className="text-[11px] font-mono text-zinc-500">
                Matches for {seekerProfile.location} & {seekerProfile.skills.slice(0, 2).join(', ')}
              </span>
              <button
                onClick={() => handleSearch(query)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-mono font-bold shadow-md shadow-blue-950 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>UPDATE MATCHES</span>
              </button>
            </div>
          </div>

          {/* Top 3 Recommended Jobs preview */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm sm:text-base font-mono font-bold uppercase tracking-wider text-zinc-100">
                Recommended Jobs for You
              </h3>
              <span className="text-xs font-mono text-zinc-500">
                Top 3 Hyperlocal Matches
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {rankedJobs.slice(0, 3).map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onViewJob={onViewJob}
                  showBreakdownInline={false}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. RECOMMENDED JOBS TAB */}
      {activeTab === 'jobs' && (
        <div className="space-y-6">
          {/* Natural Language Prompt & AI Card */}
          <div className="bg-zinc-950/90 border border-blue-950/70 focus-within:border-cyan-500/60 rounded-3xl p-5 shadow-lg space-y-4 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-zinc-100">
                  Search Jobs in Plain Language
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-2 py-0.5 rounded-md">
                NLP MATCH ACTIVE
              </span>
            </div>

            <textarea
              rows={2}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="I can work from 6 PM to 10 PM, I know basic Excel, and I'm looking for a part-time job within 5 km."
              className="w-full text-zinc-100 placeholder:text-zinc-500 text-sm bg-zinc-900/90 border border-zinc-800/90 rounded-2xl p-3 focus:outline-none focus:border-cyan-500/60 resize-none font-mono"
            />

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-2 border-t border-zinc-800/80">
              <div className="flex items-center gap-1.5 text-xs overflow-x-auto pb-1 sm:pb-0">
                <span className="text-zinc-500 text-[11px] font-mono">Quick:</span>
                <button
                  onClick={() => {
                    const q = "I can work from 6 PM to 10 PM, I know basic Excel, and I'm looking for a part-time job within 5 km.";
                    setQuery(q);
                    handleSearch(q);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-[11px] font-mono border border-zinc-800 cursor-pointer"
                >
                  Evening Billing & Excel (6-10 PM)
                </button>
                <button
                  onClick={() => {
                    const q = "Morning cafe barista 7 AM to 11 AM within 3 km.";
                    setQuery(q);
                    handleSearch(q);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-[11px] font-mono border border-zinc-800 cursor-pointer"
                >
                  Morning Cafe (7-11 AM)
                </button>
              </div>

              <button
                onClick={() => handleSearch(query)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-mono font-bold shadow-md shadow-blue-950 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>FIND MY MATCHES</span>
              </button>
            </div>
          </div>

          {/* AI UNDERSTANDS CARD */}
          <AiExtractionCard extraction={extraction} isAnalyzing={isSearching} />

          {/* Jobs List Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-mono font-bold uppercase tracking-wider text-zinc-100 flex items-center gap-2">
              <span>All Nearby Job Matches</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-950/60 text-cyan-300 border border-blue-800/50 font-mono font-bold">
                {rankedJobs.length} Found
              </span>
            </h3>
            <span className="text-xs font-mono text-zinc-500">
              Sorted by Match %
            </span>
          </div>

          {/* Jobs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {rankedJobs.map((job) => {
              const isSaved = savedJobIds.includes(job.id);
              return (
                <div key={job.id} className="relative">
                  <button
                    onClick={() => toggleSaveJob(job.id)}
                    title={isSaved ? 'Remove from saved' : 'Save job'}
                    className={`absolute top-4 right-16 z-20 w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                      isSaved
                        ? 'bg-cyan-950/80 border-cyan-600 text-cyan-300 shadow-sm shadow-cyan-950'
                        : 'bg-zinc-900/90 border-zinc-800 text-zinc-400 hover:text-cyan-400'
                    }`}
                  >
                    {isSaved ? (
                      <BookmarkCheck className="w-4 h-4 fill-cyan-500 text-cyan-300" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>

                  <JobCard
                    job={job}
                    onViewJob={onViewJob}
                    showBreakdownInline={true}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. MY APPLICATIONS TAB */}
      {activeTab === 'applications' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg sm:text-xl font-mono font-extrabold uppercase tracking-wider text-zinc-100">
                Application Status Feed
              </h3>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
                Real-time telemetry and status updates from neighborhood employers.
              </p>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-blue-950/60 text-cyan-300 border border-blue-800/50">
              {applications.length} Submitted
            </span>
          </div>

          {applications.length === 0 ? (
            <div className="bg-zinc-950/80 border border-blue-950/50 rounded-3xl p-12 text-center space-y-3">
              <FileCheck2 className="w-12 h-12 text-zinc-700 mx-auto" />
              <h4 className="text-base font-bold text-zinc-300 font-mono">No applications dispatched</h4>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto font-mono">
                Explore recommended part-time roles near you and submit your first 1-click application!
              </p>
              <button
                onClick={() => setActiveTab('jobs')}
                className="mt-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-mono font-bold hover:from-blue-500 hover:to-cyan-500 cursor-pointer shadow-md shadow-blue-950"
              >
                BROWSE RECOMMENDED JOBS
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {applications.map((app) => {
                const badge = getStatusBadge(app.status);

                return (
                  <div
                    key={app.id}
                    className="bg-zinc-950/85 border border-blue-950/50 hover:border-cyan-500/50 rounded-2xl p-4 sm:p-5 shadow-lg transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h4 className="text-base font-bold text-zinc-100 group-hover:text-cyan-400 transition-colors truncate">
                          {app.jobTitle}
                        </h4>
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-blue-950/60 text-cyan-300 border border-blue-800/50">
                          {app.matchPercentage}% AI Match
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-400 font-mono">
                        <span className="font-semibold text-zinc-200 flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5 text-zinc-500" />
                          {app.businessName}
                        </span>
                        <span>•</span>
                        <span className="text-zinc-500">Applied: {app.appliedDate}</span>
                        <span>•</span>
                        <span className="text-zinc-500">{app.workingHours}</span>
                        <span>•</span>
                        <span className="font-bold text-cyan-400">{app.salary}</span>
                      </div>
                    </div>

                    {/* Status Pill & Timeline Button */}
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-800/80">
                      {/* Visual Status Pill */}
                      <div
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border ${badge.bg}`}
                      >
                        <span className={`w-2 h-2 rounded-full ${badge.dot}`} />
                        <span>{app.status}</span>
                      </div>

                      <button
                        onClick={() => setSelectedAppForTimeline(app)}
                        className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold text-cyan-300 bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-800/50 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span>TIMELINE</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 4. SAVED JOBS TAB */}
      {activeTab === 'saved' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg sm:text-xl font-mono font-extrabold uppercase tracking-wider text-zinc-100">
                Saved Jobs
              </h3>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
                Bookmarked opportunities for quick reference and dispatch.
              </p>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-blue-950/60 text-cyan-300 border border-blue-800/50">
              {savedJobs.length} Saved
            </span>
          </div>

          {savedJobs.length === 0 ? (
            <div className="bg-zinc-950/80 border border-blue-950/50 rounded-3xl p-12 text-center space-y-3">
              <Bookmark className="w-12 h-12 text-zinc-700 mx-auto" />
              <h4 className="text-base font-bold text-zinc-300 font-mono">No saved jobs bookmarked</h4>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto font-mono">
                Bookmark local jobs by clicking the bookmark icon to review and apply later.
              </p>
              <button
                onClick={() => setActiveTab('jobs')}
                className="mt-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-mono font-bold hover:from-blue-500 hover:to-cyan-500 cursor-pointer shadow-md shadow-blue-950"
              >
                BROWSE RECOMMENDED JOBS
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {savedJobs.map((job) => (
                <div key={job.id} className="relative">
                  <button
                    onClick={() => toggleSaveJob(job.id)}
                    className="absolute top-4 right-16 z-20 w-8 h-8 rounded-full border bg-cyan-950/80 border-cyan-600 text-cyan-300 flex items-center justify-center cursor-pointer shadow-sm shadow-cyan-950"
                    title="Remove from saved"
                  >
                    <BookmarkCheck className="w-4 h-4 fill-cyan-500" />
                  </button>

                  <JobCard
                    job={job}
                    onViewJob={onViewJob}
                    showBreakdownInline={false}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 5. PROFILE TAB */}
      {activeTab === 'profile' && <SeekerProfile />}

      {/* Application Timeline Modal */}
      <ApplicationTimelineModal
        application={selectedAppForTimeline}
        isOpen={Boolean(selectedAppForTimeline)}
        onClose={() => setSelectedAppForTimeline(null)}
      />
    </div>
  );
};
