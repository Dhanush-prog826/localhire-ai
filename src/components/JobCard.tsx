import React from 'react';
import type { Job } from '../types';
import { MapPin, Clock, Banknote, Wrench, Eye, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
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
  const [isExpanded, setIsExpanded] = React.useState<boolean>(true);

  const getScoreBadgeStyles = (percentage: number) => {
    if (percentage >= 90) {
      return {
        badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-emerald-500/10',
        barBg: 'bg-emerald-500',
        ringColor: 'stroke-emerald-500',
      };
    }
    if (percentage >= 80) {
      return {
        badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-300 shadow-indigo-500/10',
        barBg: 'bg-indigo-500',
        ringColor: 'stroke-indigo-500',
      };
    }
    return {
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-300 shadow-amber-500/10',
      barBg: 'bg-amber-500',
      ringColor: 'stroke-amber-500',
    };
  };

  const style = getScoreBadgeStyles(job.matchAnalysis.percentage);

  return (
    <article className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Top Header: Title, Business Name & Match Badge */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                {job.businessCategory}
              </span>
              {job.urgencyTag && (
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                  {job.urgencyTag}
                </span>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
              {job.title}
            </h3>

            <p className="text-xs sm:text-sm font-medium text-slate-600">
              {job.businessName}
            </p>
          </div>

          {/* Prominent Match Percentage Gauge / Badge */}
          <div className="shrink-0 text-right">
            <div
              className={`inline-flex flex-col items-center justify-center px-3 py-1.5 rounded-xl border ${style.badgeBg} shadow-xs`}
            >
              <div className="flex items-center gap-1 font-extrabold text-lg sm:text-xl tracking-tight leading-none">
                <Sparkles className="w-3.5 h-3.5 text-current" />
                <span>{job.matchAnalysis.percentage}%</span>
              </div>
              <span className="text-[10px] font-bold tracking-wide uppercase mt-0.5">
                Match
              </span>
            </div>
          </div>
        </div>

        {/* 4 Core Quick Stats: Distance, Working Hours, Salary, Required Skills */}
        <div className="grid grid-cols-2 gap-2 my-3.5 py-3 border-y border-slate-100 text-xs">
          {/* Distance */}
          <div className="flex items-center gap-2 text-slate-700">
            <div className="w-6 h-6 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-slate-500 font-medium">Distance</p>
              <p className="font-semibold text-slate-900 truncate">
                {job.distanceDisplay}
              </p>
            </div>
          </div>

          {/* Working Hours */}
          <div className="flex items-center gap-2 text-slate-700">
            <div className="w-6 h-6 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Clock className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-slate-500 font-medium">Working Hours</p>
              <p className="font-semibold text-slate-900 truncate">
                {job.workingHours}
              </p>
            </div>
          </div>

          {/* Salary */}
          <div className="flex items-center gap-2 text-slate-700">
            <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Banknote className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-slate-500 font-medium">Salary</p>
              <p className="font-bold text-emerald-700 truncate">
                {job.salary}
              </p>
            </div>
          </div>

          {/* Required Skills */}
          <div className="flex items-center gap-2 text-slate-700">
            <div className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Wrench className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-slate-500 font-medium">Required Skills</p>
              <p className="font-semibold text-indigo-900 truncate">
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
              className="w-full flex items-center justify-between text-left py-1 text-xs font-semibold text-slate-600 hover:text-indigo-600 focus:outline-none transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-indigo-600" />
                <span>AI Match Explanation</span>
              </span>
              {isExpanded ? (
                <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
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
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
        <span className="text-[11px] text-slate-600">
          Posted {job.postedTimeAgo}
        </span>
        <button
          onClick={() => onViewJob(job)}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-98 shadow-xs hover:shadow-md hover:shadow-indigo-500/20 transition-all cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View Job</span>
        </button>
      </div>
    </article>
  );
};
