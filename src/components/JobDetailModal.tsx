import React from 'react';
import type { Job } from '../types';
import {
  X,
  MapPin,
  Clock,
  Banknote,
  Wrench,
  Sparkles,
  Send,
  Building2,
  Check,
  ShieldCheck,
  Navigation,
} from 'lucide-react';
import { MatchBreakdown } from './MatchBreakdown';

interface JobDetailModalProps {
  job: Job | null;
  onClose: () => void;
  onApply: (job: Job) => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({
  job,
  onClose,
  onApply,
}) => {
  const [applied, setApplied] = React.useState<boolean>(false);

  React.useEffect(() => {
    setApplied(false);
  }, [job]);

  if (!job) return null;

  const handleApplyClick = () => {
    setApplied(true);
    onApply(job);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="job-dialog-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150"
    >
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/90 w-full max-w-xl overflow-hidden z-10 my-auto animate-in zoom-in-95 duration-150">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-emerald-600 p-5 sm:p-6 text-white relative">
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors focus:outline-none cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-xs">
              {job.businessCategory}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-400/25 text-emerald-100 border border-emerald-300/30">
              {job.jobType}
            </span>
          </div>

          <h2 id="job-dialog-title" className="text-xl sm:text-2xl font-bold tracking-tight text-white pr-8">
            {job.title}
          </h2>

          <div className="flex items-center gap-2 text-indigo-100 text-sm mt-1">
            <Building2 className="w-4 h-4" />
            <span className="font-medium">{job.businessName}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {job.locationArea}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Match Score Spotlight Banner */}
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-indigo-50 border border-emerald-200/90 rounded-2xl p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex flex-col items-center justify-center shadow-md shadow-emerald-500/20 shrink-0">
                <span className="text-lg font-extrabold leading-none">
                  {job.matchAnalysis.percentage}%
                </span>
                <span className="text-[9px] uppercase font-bold tracking-wider">
                  Match
                </span>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Hyperlocal AI Recommendation
                </p>
                <p className="text-xs text-slate-600">
                  Ideal match based on your exact working hours and travel radius.
                </p>
              </div>
            </div>
            <div className="hidden sm:block text-right shrink-0">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white border border-emerald-200 text-emerald-800 shadow-2xs">
                Verified Store
              </span>
            </div>
          </div>

          {/* 4 Core Job Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3">
              <div className="flex items-center gap-1 text-slate-500 text-[11px] mb-0.5">
                <MapPin className="w-3 h-3 text-rose-500" />
                <span>Distance</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-900">
                {job.distanceDisplay}
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-0.5">
                <Navigation className="w-2.5 h-2.5 text-indigo-500" /> ~7 min cycle
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3">
              <div className="flex items-center gap-1 text-slate-500 text-[11px] mb-0.5">
                <Clock className="w-3 h-3 text-amber-500" />
                <span>Working Hours</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-900">
                {job.workingHours}
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">Evening slot</p>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3">
              <div className="flex items-center gap-1 text-slate-500 text-[11px] mb-0.5">
                <Banknote className="w-3 h-3 text-emerald-600" />
                <span>Salary</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-emerald-700">
                {job.salary}
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">Fixed monthly</p>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3">
              <div className="flex items-center gap-1 text-slate-500 text-[11px] mb-0.5">
                <Wrench className="w-3 h-3 text-indigo-600" />
                <span>Required Skills</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                {job.requiredSkills[0]}
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">Verified</p>
            </div>
          </div>

          {/* Why This Matches (Comprehensive 4-part breakdown) */}
          <div>
            <MatchBreakdown analysis={job.matchAnalysis} compact={false} />
          </div>

          {/* Job Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">
              About the Role
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/50 p-3 rounded-xl border border-slate-100">
              {job.description}
            </p>
          </div>

          {/* Skills & Perks Tags */}
          <div className="space-y-3">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">
                Skills Needed
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {job.requiredSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-150"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">
                Store Perks
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {job.perks.map((perk, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700"
                  >
                    <Check className="w-3 h-3 text-emerald-600" />
                    {perk}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer / Quick Action */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-500 hidden sm:flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Direct employer contact • No agency fees</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handleApplyClick}
              disabled={applied}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer ${
                applied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-md hover:shadow-indigo-500/20 active:scale-98'
              }`}
            >
              {applied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Application Sent!</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Connect with Business</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
