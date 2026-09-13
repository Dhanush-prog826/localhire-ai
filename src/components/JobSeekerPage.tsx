import React, { useState } from 'react';
import type { Job, JobSeekerExtraction } from '../types';
import { INITIAL_SEEKER_QUERY, DEFAULT_JOBS } from '../data/mockData';
import { parseJobSeekerQuery, filterAndRankJobs } from '../utils/aiParser';
import { AiExtractionCard } from './AiExtractionCard';
import { JobCard } from './JobCard';
import {
  Sparkles,
  Search,
  RotateCcw,
  CheckCircle,
} from 'lucide-react';

interface JobSeekerPageProps {
  onViewJob: (job: Job) => void;
}

export const JobSeekerPage: React.FC<JobSeekerPageProps> = ({ onViewJob }) => {
  // Input query state
  const [query, setQuery] = useState<string>(INITIAL_SEEKER_QUERY);
  // Whether search has been performed
  const [hasSearched, setHasSearched] = useState<boolean>(true);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Extracted AI understand state
  const [extraction, setExtraction] = useState<JobSeekerExtraction>(() =>
    parseJobSeekerQuery(INITIAL_SEEKER_QUERY)
  );

  // Matched jobs list
  const [matchedJobs, setMatchedJobs] = useState<Job[]>(() =>
    filterAndRankJobs(parseJobSeekerQuery(INITIAL_SEEKER_QUERY), DEFAULT_JOBS)
  );

  // Execute AI matching
  const handleFindMatches = (queryToSearch: string = query) => {
    setIsSearching(true);
    setHasSearched(true);

    // Simulate AI parsing delay for realistic startup feel
    setTimeout(() => {
      const parsed = parseJobSeekerQuery(queryToSearch);
      setExtraction(parsed);
      const ranked = filterAndRankJobs(parsed, DEFAULT_JOBS);
      setMatchedJobs(ranked);
      setIsSearching(false);
    }, 450);
  };

  // Quick preset queries for effortless testing
  const presetQueries = [
    {
      label: 'Default Test (6 PM–10 PM, Excel, 5 km)',
      text: "I can work from 6 PM to 10 PM, I know basic Excel, and I'm looking for a part-time job within 5 km.",
    },
    {
      label: 'Morning Cafe Barista (8 AM–1 PM, 3 km)',
      text: "I want a morning part-time job at a cafe or food outlet from 8 AM to 1 PM, within 3 km.",
    },
    {
      label: 'Evening Math Tutor (6 PM–9 PM, 4 km)',
      text: "Looking for part-time teaching or tutoring in math from 6 PM to 9 PM within 4 km.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-2.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Natural Language Job Search</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Find Your Local Part-Time Match
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Tell us your available hours, your skills, and how far you want to travel.
        </p>
      </div>

      {/* Large Natural Language Input Box */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-4 sm:p-6 shadow-sm relative focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all">
        <label
          htmlFor="seeker-query"
          className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center justify-between"
        >
          <span className="flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-indigo-600" />
            Your Availability & Skills
          </span>
          <span className="text-[11px] font-normal text-slate-600 lowercase">
            natural language prompt
          </span>
        </label>

        <textarea
          id="seeker-query"
          rows={3}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="I can work from 6 PM to 10 PM, I know basic Excel, and I'm looking for a part-time job within 5 km."
          className="w-full text-slate-900 text-sm sm:text-base placeholder:text-slate-600 border border-slate-200 rounded-2xl p-3.5 sm:p-4 focus:outline-none focus:bg-slate-50/50 resize-none font-medium leading-relaxed"
        />

        {/* Action Bar: Quick Presets & Button */}
        <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
          {/* Quick presets */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
            <span className="text-[11px] font-medium text-slate-600 shrink-0">
              Try:
            </span>
            {presetQueries.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setQuery(preset.text);
                  handleFindMatches(preset.text);
                }}
                className="shrink-0 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 text-[11px] font-medium transition-colors cursor-pointer"
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Primary Action Button: "Find My Matches" */}
          <button
            type="button"
            onClick={() => handleFindMatches(query)}
            disabled={isSearching || !query.trim()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-indigo-500/20 active:scale-98 transition-all cursor-pointer shrink-0"
          >
            <Sparkles className={`w-4 h-4 ${isSearching ? 'animate-spin' : ''}`} />
            <span>{isSearching ? 'Analyzing...' : 'Find My Matches'}</span>
          </button>
        </div>
      </div>

      {/* AI UNDERSTANDS Section */}
      {hasSearched && (
        <section className="space-y-6">
          <AiExtractionCard extraction={extraction} isAnalyzing={isSearching} />

          {/* Matches Header */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                <span>Top Hyperlocal Job Matches</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {matchedJobs.length} Nearby Opportunities
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Sorted by AI match score • Within {extraction.distance} • Time slot: {extraction.availability}
              </p>
            </div>

            <button
              onClick={() => {
                setQuery(INITIAL_SEEKER_QUERY);
                handleFindMatches(INITIAL_SEEKER_QUERY);
              }}
              className="text-xs font-semibold text-slate-500 hover:text-indigo-600 flex items-center gap-1 transition-colors cursor-pointer"
              title="Reset query to default"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>

          {/* 3 Sample Job Matches Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {matchedJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onViewJob={onViewJob}
                showBreakdownInline={true}
              />
            ))}
          </div>

          {/* Local Proximity Trust Guarantee Banner */}
          <div className="bg-slate-100/70 border border-slate-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Zero Commute Fatigue:</strong> All 3 businesses are verified local stores within your selected radius.
              </span>
            </div>
            <span className="text-[11px] font-semibold text-indigo-600 shrink-0">
              ⚡ Instant Direct Connect Enabled
            </span>
          </div>
        </section>
      )}
    </div>
  );
};
