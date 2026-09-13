import React, { useState } from 'react';
import type { EmployerExtraction, CandidateMatch } from '../types';
import { INITIAL_EMPLOYER_QUERY, MOCK_CANDIDATE_MATCHES } from '../data/mockData';
import { parseEmployerQuery } from '../utils/aiParser';
import {
  Sparkles,
  PlusCircle,
  Briefcase,
  Clock,
  Banknote,
  Wrench,
  CheckCircle2,
  Users,
  Store,
  MapPin,
  Send,
  RotateCcw,
} from 'lucide-react';

interface EmployerPageProps {
  onNotify: (msg: string) => void;
}

export const EmployerPage: React.FC<EmployerPageProps> = ({ onNotify }) => {
  const [query, setQuery] = useState<string>(INITIAL_EMPLOYER_QUERY);
  const [hasCreated, setHasCreated] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [contactedCandidates, setContactedCandidates] = useState<Record<string, boolean>>({});

  // Extracted employer parameters
  const [extraction, setExtraction] = useState<EmployerExtraction>(() =>
    parseEmployerQuery(INITIAL_EMPLOYER_QUERY)
  );

  const handleCreateJob = (queryToPost: string = query) => {
    setIsProcessing(true);
    setHasCreated(true);

    setTimeout(() => {
      const parsed = parseEmployerQuery(queryToPost);
      setExtraction(parsed);
      setIsProcessing(false);
      onNotify('Job posted successfully! AI matched 3 local candidates nearby.');
    }, 450);
  };

  const handleContactCandidate = (candidate: CandidateMatch) => {
    setContactedCandidates((prev) => ({ ...prev, [candidate.id]: true }));
    onNotify(`Interview invite sent to ${candidate.name} via WhatsApp!`);
  };

  const presetEmployerQueries = [
    {
      label: 'Default Test (Billing, 6 PM–10 PM, ₹6k)',
      text: "I need someone for billing from 6 PM to 10 PM. Excel knowledge preferred. ₹6,000 per month.",
    },
    {
      label: 'Cafe Counter (7 AM–11 AM, ₹7.5k)',
      text: "Need a morning cafe counter barista and order taker from 7 AM to 11 AM. ₹7,500 per month.",
    },
    {
      label: 'Clinic Reception (5 PM–9 PM, ₹8k)',
      text: "Hiring evening front desk assistant for clinic from 5 PM to 9 PM. Computer skills needed. ₹8,000 per month.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold mb-2.5">
          <Store className="w-3.5 h-3.5 text-emerald-600" />
          <span>Employer & Business Portal</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Post a Hyperlocal Part-Time Job
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Describe what you need in plain words. AI structures the requirements and matches nearby workers instantly.
        </p>
      </div>

      {/* Natural Language Job Posting Box */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-4 sm:p-6 shadow-sm focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500 transition-all">
        <label
          htmlFor="employer-query"
          className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center justify-between"
        >
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Describe Your Job Requirement
          </span>
          <span className="text-[11px] font-normal text-slate-600 lowercase">
            natural language posting
          </span>
        </label>

        <textarea
          id="employer-query"
          rows={3}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="I need someone for billing from 6 PM to 10 PM. Excel knowledge preferred. ₹6,000 per month."
          className="w-full text-slate-900 text-sm sm:text-base placeholder:text-slate-600 border border-slate-200 rounded-2xl p-3.5 sm:p-4 focus:outline-none focus:bg-slate-50/50 resize-none font-medium leading-relaxed"
        />

        {/* Action Bar: Presets & Button */}
        <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
            <span className="text-[11px] font-medium text-slate-600 shrink-0">
              Templates:
            </span>
            {presetEmployerQueries.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setQuery(preset.text);
                  handleCreateJob(preset.text);
                }}
                className="shrink-0 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 text-[11px] font-medium transition-colors cursor-pointer"
              >
                {preset.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => handleCreateJob(query)}
            disabled={isProcessing || !query.trim()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-emerald-600/20 active:scale-98 transition-all cursor-pointer shrink-0"
          >
            <PlusCircle className={`w-4 h-4 ${isProcessing ? 'animate-spin' : ''}`} />
            <span>{isProcessing ? 'Extracting...' : 'Create Job'}</span>
          </button>
        </div>
      </div>

      {/* AI EXTRACTION RESULTS */}
      {hasCreated && (
        <section className="space-y-6">
          {/* Information Extracted Card */}
          <div className="bg-white border border-emerald-200/90 rounded-2xl p-5 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500" />

            <div className="flex items-center justify-between mb-4 pt-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
                    INFORMATION EXTRACTED FROM DESCRIPTION:
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Structured hiring parameters parsed automatically by AI
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Ready to Publish</span>
              </div>
            </div>

            {/* The 5 Required Extracted Fields */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {/* 1. Position */}
              <div className="bg-slate-50/90 border border-slate-200/80 rounded-xl p-3">
                <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium mb-1">
                  <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Position</span>
                </div>
                <p className="text-sm font-bold text-slate-900 truncate">
                  {extraction.position}
                </p>
              </div>

              {/* 2. Skills */}
              <div className="bg-slate-50/90 border border-slate-200/80 rounded-xl p-3">
                <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium mb-1">
                  <Wrench className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Skills</span>
                </div>
                <p className="text-sm font-bold text-slate-900 truncate">
                  {extraction.skills.join(', ') || 'Excel'}
                </p>
              </div>

              {/* 3. Working Hours */}
              <div className="bg-slate-50/90 border border-slate-200/80 rounded-xl p-3">
                <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium mb-1">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Working hours</span>
                </div>
                <p className="text-sm font-bold text-slate-900 truncate">
                  {extraction.workingHours}
                </p>
              </div>

              {/* 4. Salary */}
              <div className="bg-slate-50/90 border border-slate-200/80 rounded-xl p-3">
                <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium mb-1">
                  <Banknote className="w-3.5 h-3.5 text-teal-600" />
                  <span>Salary</span>
                </div>
                <p className="text-sm font-bold text-emerald-700 truncate">
                  {extraction.salary}
                </p>
              </div>

              {/* 5. Job Type */}
              <div className="bg-slate-50/90 border border-slate-200/80 rounded-xl p-3 col-span-2 sm:col-span-1">
                <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                  <span>Job type</span>
                </div>
                <p className="text-sm font-bold text-slate-900 truncate">
                  {extraction.jobType}
                </p>
              </div>
            </div>
          </div>

          {/* Instant Candidate Matching Section */}
          <div>
            <div className="flex items-center justify-between mb-3 pt-2">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-600" />
                  <span>Instant Candidate Matches</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    3 Available Nearby
                  </span>
                </h3>
                <p className="text-xs text-slate-500">
                  Local job seekers within 3 km matching your required shift ({extraction.workingHours}) and skills.
                </p>
              </div>

              <button
                onClick={() => {
                  setQuery(INITIAL_EMPLOYER_QUERY);
                  handleCreateJob(INITIAL_EMPLOYER_QUERY);
                }}
                className="text-xs font-semibold text-slate-500 hover:text-emerald-600 flex items-center gap-1 transition-colors cursor-pointer"
                title="Reset to default employer prompt"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>

            {/* Candidate Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {MOCK_CANDIDATE_MATCHES.map((cand) => (
                <div
                  key={cand.id}
                  className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs hover:shadow-sm hover:border-emerald-200 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-emerald-500 text-white font-bold text-xs flex items-center justify-center">
                        {cand.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>

                      <div className="px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-extrabold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>{cand.matchPercentage}% Match</span>
                      </div>
                    </div>

                    <h4 className="font-bold text-sm text-slate-900">
                      {cand.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-tight">
                      {cand.headline}
                    </p>

                    <div className="mt-3 space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-2.5">
                      <div className="flex items-center gap-1.5 text-slate-700">
                        <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span className="truncate">{cand.distance}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-700">
                        <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="truncate">{cand.availability}</span>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1">
                      {cand.skills.slice(0, 3).map((s, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-700"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => handleContactCandidate(cand)}
                      disabled={contactedCandidates[cand.id]}
                      className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        contactedCandidates[cand.id]
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-900 hover:bg-emerald-600 text-white shadow-xs'
                      }`}
                    >
                      {contactedCandidates[cand.id] ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Invite Sent</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Send WhatsApp Invite</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
