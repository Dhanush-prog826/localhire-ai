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
          bg: 'bg-blue-50 text-blue-700 border-blue-200',
          dot: 'bg-blue-500',
        };
      case 'Under Review':
        return {
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
          dot: 'bg-amber-500 animate-pulse',
        };
      case 'Shortlisted':
        return {
          bg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dot: 'bg-indigo-600',
        };
      case 'Interview':
        return {
          bg: 'bg-purple-50 text-purple-700 border-purple-200',
          dot: 'bg-purple-600',
        };
      case 'Accepted':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dot: 'bg-emerald-600',
        };
      case 'Rejected':
        return {
          bg: 'bg-slate-100 text-slate-600 border-slate-200',
          dot: 'bg-slate-400',
        };
      default:
        return {
          bg: 'bg-slate-100 text-slate-700 border-slate-200',
          dot: 'bg-slate-500',
        };
    }
  };

  // Saved jobs list
  const savedJobs = jobs.filter((j) => savedJobIds.includes(j.id));

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6 pb-20 sm:pb-8">
      {/* Top Desktop Navigation Tabs */}
      <div className="hidden sm:flex items-center justify-between border-b border-slate-200 pb-3">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <span>Welcome back, {seekerProfile.name}</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Verified Seeker
            </span>
          </h2>
          <p className="text-xs text-slate-500">
            {seekerProfile.location} • Preferred shift: {seekerProfile.preferredWorkingHours} (within {seekerProfile.maxDistanceKm} km)
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'jobs'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Recommended Jobs
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'applications'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>My Applications</span>
            {applications.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                {applications.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'saved'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Saved ({savedJobIds.length})
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Profile
          </button>
        </div>
      </div>

      {/* RENDER VIEW ACCORDING TO ACTIVE TAB */}

      {/* 1. DASHBOARD OVERVIEW TAB */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs">
              <p className="text-xs text-slate-500 font-semibold">Active Applications</p>
              <p className="text-2xl font-extrabold text-indigo-600 mt-1">
                {applications.length}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">Track status updates</p>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs">
              <p className="text-xs text-slate-500 font-semibold">Saved Jobs</p>
              <p className="text-2xl font-extrabold text-emerald-600 mt-1">
                {savedJobIds.length}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">Ready for quick apply</p>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs">
              <p className="text-xs text-slate-500 font-semibold">Nearby Openings</p>
              <p className="text-2xl font-extrabold text-purple-600 mt-1">
                {jobs.length}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">Within 5 km radius</p>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs">
              <p className="text-xs text-slate-500 font-semibold">Highest Match</p>
              <p className="text-2xl font-extrabold text-teal-600 mt-1">
                94%
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">Billing Assistant (ABC)</p>
            </div>
          </div>

          {/* Active Application Status Alert / Banner */}
          {applications.length > 0 && (
            <div className="bg-gradient-to-r from-amber-50 to-indigo-50 border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-full">
                  Application Update
                </span>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 mt-1">
                  {applications[0].jobTitle} at {applications[0].businessName}
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Status: <strong>{applications[0].status}</strong> • Applied: {applications[0].appliedDate}
                </p>
              </div>

              <button
                onClick={() => setSelectedAppForTimeline(applications[0])}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-indigo-700 bg-white border border-indigo-200 shadow-2xs hover:bg-indigo-50 transition-colors cursor-pointer"
              >
                <span>View Timeline</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Quick AI Search & Matching Box */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  AI Job Recommendation Engine
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('jobs')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
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
              className="w-full text-slate-900 text-sm border border-slate-200 rounded-2xl p-3 focus:outline-none focus:bg-slate-50 resize-none font-medium"
            />

            <div className="mt-3 flex justify-between items-center">
              <span className="text-[11px] text-slate-500">
                Matches based on {seekerProfile.location} & {seekerProfile.skills.slice(0, 2).join(', ')}
              </span>
              <button
                onClick={() => handleSearch(query)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Update Matches</span>
              </button>
            </div>
          </div>

          {/* Top 3 Recommended Jobs preview */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-slate-900">
                Recommended Jobs for You
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                Showing top 3 matches
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
          <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Search Jobs in Plain Language
                </h3>
              </div>
              <span className="text-[11px] text-indigo-600 font-medium bg-indigo-50 px-2 py-0.5 rounded-md">
                NLP Match Active
              </span>
            </div>

            <textarea
              rows={2}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="I can work from 6 PM to 10 PM, I know basic Excel, and I'm looking for a part-time job within 5 km."
              className="w-full text-slate-900 text-sm border border-slate-200 rounded-2xl p-3 focus:outline-none focus:bg-slate-50 resize-none font-medium"
            />

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-xs overflow-x-auto pb-1 sm:pb-0">
                <span className="text-slate-400 text-[11px]">Quick:</span>
                <button
                  onClick={() => {
                    const q = "I can work from 6 PM to 10 PM, I know basic Excel, and I'm looking for a part-time job within 5 km.";
                    setQuery(q);
                    handleSearch(q);
                  }}
                  className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] hover:bg-indigo-50 cursor-pointer"
                >
                  Evening Billing & Excel (6-10 PM)
                </button>
                <button
                  onClick={() => {
                    const q = "Morning cafe barista 7 AM to 11 AM within 3 km.";
                    setQuery(q);
                    handleSearch(q);
                  }}
                  className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] hover:bg-indigo-50 cursor-pointer"
                >
                  Morning Cafe (7-11 AM)
                </button>
              </div>

              <button
                onClick={() => handleSearch(query)}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Find My Matches</span>
              </button>
            </div>
          </div>

          {/* AI UNDERSTANDS CARD */}
          <AiExtractionCard extraction={extraction} isAnalyzing={isSearching} />

          {/* Jobs List Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>All Nearby Job Matches</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">
                {rankedJobs.length} Found
              </span>
            </h3>
            <span className="text-xs text-slate-500">
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
                        ? 'bg-amber-50 border-amber-300 text-amber-600'
                        : 'bg-white/90 border-slate-200 text-slate-400 hover:text-amber-600'
                    }`}
                  >
                    {isSaved ? (
                      <BookmarkCheck className="w-4 h-4 fill-amber-500 text-amber-600" />
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
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                My Job Applications
              </h3>
              <p className="text-xs text-slate-500">
                Track every application and real-time status updates from neighborhood employers.
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              {applications.length} Submitted
            </span>
          </div>

          {applications.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-3">
              <FileCheck2 className="w-12 h-12 text-slate-300 mx-auto" />
              <h4 className="text-base font-bold text-slate-800">No applications yet</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Explore recommended part-time roles near you and submit your first 1-click application!
              </p>
              <button
                onClick={() => setActiveTab('jobs')}
                className="mt-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 cursor-pointer"
              >
                Browse Recommended Jobs
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {applications.map((app) => {
                const badge = getStatusBadge(app.status);

                return (
                  <div
                    key={app.id}
                    className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs hover:shadow-xs hover:border-indigo-200 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h4 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                          {app.jobTitle}
                        </h4>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {app.matchPercentage}% AI Match
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600">
                        <span className="font-semibold text-slate-800 flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          {app.businessName}
                        </span>
                        <span>•</span>
                        <span className="text-slate-500">Applied: {app.appliedDate}</span>
                        <span>•</span>
                        <span className="text-slate-500">{app.workingHours}</span>
                        <span>•</span>
                        <span className="font-bold text-emerald-700">{app.salary}</span>
                      </div>
                    </div>

                    {/* Status Pill & Timeline Button */}
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      {/* Visual Status Pill */}
                      <div
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${badge.bg}`}
                      >
                        <span className={`w-2 h-2 rounded-full ${badge.dot}`} />
                        <span>{app.status}</span>
                      </div>

                      <button
                        onClick={() => setSelectedAppForTimeline(app)}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-200 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span>Timeline</span>
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
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                Saved Jobs
              </h3>
              <p className="text-xs text-slate-500">
                Bookmarked part-time opportunities for quick reference and application.
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
              {savedJobs.length} Saved
            </span>
          </div>

          {savedJobs.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-3">
              <Bookmark className="w-12 h-12 text-slate-300 mx-auto" />
              <h4 className="text-base font-bold text-slate-800">No saved jobs yet</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Bookmark local jobs by clicking the bookmark icon so you can review and apply later.
              </p>
              <button
                onClick={() => setActiveTab('jobs')}
                className="mt-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 cursor-pointer"
              >
                Browse Recommended Jobs
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {savedJobs.map((job) => (
                <div key={job.id} className="relative">
                  <button
                    onClick={() => toggleSaveJob(job.id)}
                    className="absolute top-4 right-16 z-20 w-8 h-8 rounded-full border bg-amber-50 border-amber-300 text-amber-600 flex items-center justify-center cursor-pointer"
                    title="Remove from saved"
                  >
                    <BookmarkCheck className="w-4 h-4 fill-amber-500" />
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
