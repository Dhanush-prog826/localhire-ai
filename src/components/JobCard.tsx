import React from 'react';
import type { Job } from '../types';
import { MapPin, Clock, Banknote, Wrench, Eye, ChevronDown, ChevronUp } from 'lucide-react';
import { MatchBreakdown } from './MatchBreakdown';

interface JobCardProps {
  job: Job;
  onViewJob: (job: Job) => void;
  showBreakdownInline?: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  onViewJob,
  showBreakdownInline = true,
}) => {
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);
  const percentage = job.matchAnalysis.percentage;
  const isBestMatch = percentage >= 90;

  return (
    <article className="bg-zinc-950/85 border border-red-950/50 hover:border-red-600/60 rounded-2xl p-4 sm:p-5 shadow-[0_8px_30px_rgba(0,0,0,0.8)] hover:shadow-[0_8px_35px_rgba(220,38,38,0.25)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden backdrop-blur-xl">
      {/* Top subtle red laser sweep line on card hover */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div>
        {/* Top Header: Title, Business Name & Match Badge */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                {job.businessCategory}
              </span>
              {isBestMatch && (
                <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded bg-red-950/80 text-red-300 border border-red-800/60 shadow-[0_0_8px_rgba(220,38,38,0.5)]">
                  BEST MATCH
                </span>
              )}
              {job.urgencyTag && (
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/40">
                  {job.urgencyTag}
                </span>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-black text-white group-hover:text-red-400 transition-colors truncate">
              {job.title}
            </h3>

            <p className="text-xs font-medium text-zinc-400">
              {job.businessName} • <span className="font-mono text-[11px] text-zinc-500">{job.locationArea}</span>
            </p>
          </div>

          {/* Circular / Semi-Circular Match Compatibility Indicator */}
          <div className="shrink-0 text-right">
            <div className="relative w-14 h-14 rounded-full bg-black/90 border-2 border-red-600/70 flex flex-col items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.4)] group-hover:border-red-500 group-hover:shadow-[0_0_20px_rgba(220,38,38,0.7)] transition-all">
              <span className="text-sm font-black text-white font-mono leading-none">
                {percentage}%
              </span>
              <span className="text-[8px] font-mono uppercase text-red-400 font-bold tracking-tight">
                MATCH
              </span>
            </div>
          </div>
        </div>

        {/* 4 Core Quick Stats: Distance, Working Hours, Salary, Required Skills */}
        <div className="grid grid-cols-2 gap-2 my-3.5 py-3 border-y border-zinc-900 text-xs font-mono">
          {/* Distance */}
          <div className="flex items-center gap-2 text-zinc-300">
            <div className="w-6 h-6 rounded-lg bg-zinc-900 text-red-400 border border-red-950/60 flex items-center justify-center shrink-0">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-zinc-500 uppercase">DISTANCE</p>
              <p className="font-bold text-zinc-200 truncate">
                {job.distanceDisplay}
              </p>
            </div>
          </div>

          {/* Working Hours */}
          <div className="flex items-center gap-2 text-zinc-300">
            <div className="w-6 h-6 rounded-lg bg-zinc-900 text-amber-400 border border-amber-950/60 flex items-center justify-center shrink-0">
              <Clock className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-zinc-500 uppercase">TIME SLOT</p>
              <p className="font-bold text-zinc-200 truncate">
                {job.workingHours}
              </p>
            </div>
          </div>

          {/* Salary */}
          <div className="flex items-center gap-2 text-zinc-300">
            <div className="w-6 h-6 rounded-lg bg-zinc-900 text-emerald-400 border border-emerald-950/60 flex items-center justify-center shrink-0">
              <Banknote className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-zinc-500 uppercase">COMPENSATION</p>
              <p className="font-bold text-emerald-400 truncate">
                {job.salary}
              </p>
            </div>
          </div>

          {/* Required Skills */}
          <div className="flex items-center gap-2 text-zinc-300">
            <div className="w-6 h-6 rounded-lg bg-zinc-900 text-red-400 border border-red-950/60 flex items-center justify-center shrink-0">
              <Wrench className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-zinc-500 uppercase">KEY SKILL</p>
              <p className="font-bold text-zinc-200 truncate">
                {job.requiredSkills[0] || 'Excel required'}
              </p>
            </div>
          </div>
        </div>

        {/* Inline "Why this matches" section */}
        {showBreakdownInline && (
          <div className="mb-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex items-center justify-between text-left py-1 text-xs font-mono font-bold text-zinc-400 hover:text-red-400 focus:outline-none transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span>AI MATCH TELEMETRY</span>
              </span>
              {isExpanded ? (
                <ChevronUp className="w-3.5 h-3.5 text-zinc-500" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
              )}
            </button>

            {isExpanded && (
              <div className="mt-2">
                <MatchBreakdown analysis={job.matchAnalysis} compact={true} />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Card Action: "View Job" button */}
      <div className="pt-3 border-t border-zinc-900 flex items-center justify-between gap-3">
        <span className="text-[11px] font-mono text-zinc-500">
          POSTED {job.postedTimeAgo.toUpperCase()}
        </span>
        <button
          type="button"
          onClick={() => onViewJob(job)}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 active:scale-98 shadow-[0_0_12px_rgba(220,38,38,0.3)] hover:shadow-[0_0_20px_rgba(220,38,38,0.6)] transition-all cursor-pointer font-mono"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>INSPECT</span>
        </button>
      </div>
    </article>
  );
};

