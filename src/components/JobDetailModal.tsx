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
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150"
    >
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative bg-zinc-950 rounded-2xl sm:rounded-3xl shadow-2xl border border-red-900/60 w-full max-w-xl overflow-hidden z-10 my-auto text-zinc-100 animate-in zoom-in-95 duration-150">
        {/* Top glowing laser line */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 shadow-[0_0_12px_rgba(239,68,68,0.7)]" />

        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-zinc-950 via-red-950/60 to-zinc-950 p-5 sm:p-6 text-white relative border-b border-red-950/60">
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-zinc-400 hover:text-white flex items-center justify-center transition-colors focus:outline-none cursor-pointer border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold font-mono bg-white/10 text-zinc-300 border border-white/10">
              {job.businessCategory}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold font-mono bg-red-950/70 text-red-300 border border-red-500/40">
              {job.jobType}
            </span>
          </div>

          <h2 id="job-dialog-title" className="text-xl sm:text-2xl font-bold tracking-tight text-white pr-8 font-mono">
            {job.title}
          </h2>

          <div className="flex items-center gap-2 text-zinc-400 text-sm mt-1">
            <Building2 className="w-4 h-4 text-red-400" />
            <span className="font-medium text-zinc-200">{job.businessName}</span>
            <span className="text-zinc-600">•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              {job.locationArea}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Match Score Spotlight Banner */}
          <div className="bg-gradient-to-r from-red-950/40 via-zinc-900 to-zinc-950 border border-red-900/50 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-inner">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-700 text-white flex flex-col items-center justify-center shadow-lg shadow-red-950/50 border border-red-400/40 shrink-0 font-mono">
                <span className="text-lg font-extrabold leading-none">
                  {job.matchAnalysis.percentage}%
                </span>
                <span className="text-[9px] uppercase font-bold tracking-wider">
                  Match
                </span>
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-100 flex items-center gap-1.5 font-mono">
                  <Sparkles className="w-4 h-4 text-red-400" />
                  Hyperlocal AI Recommendation
                </p>
                <p className="text-xs text-zinc-400">
                  Target locked based on your exact working hours and travel radius.
                </p>
              </div>
            </div>
            <div className="hidden sm:block text-right shrink-0">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-zinc-900 border border-red-900/50 text-red-300 shadow-2xs font-mono">
                Verified Clearance
              </span>
            </div>
          </div>

          {/* 4 Core Job Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3">
              <div className="flex items-center gap-1 text-zinc-400 text-[11px] mb-0.5">
                <MapPin className="w-3 h-3 text-red-400" />
                <span>Distance</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-zinc-100 font-mono">
                {job.distanceDisplay}
              </p>
              <p className="text-[10px] text-zinc-500 mt-0.5 flex items-center gap-0.5 font-mono">
                <Navigation className="w-2.5 h-2.5 text-red-400" /> ~7 min cycle
              </p>
            </div>

            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3">
              <div className="flex items-center gap-1 text-zinc-400 text-[11px] mb-0.5">
                <Clock className="w-3 h-3 text-orange-400" />
                <span>Working Hours</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-zinc-100 font-mono">
                {job.workingHours}
              </p>
              <p className="text-[10px] text-zinc-500 mt-0.5">Evening slot</p>
            </div>

            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3">
              <div className="flex items-center gap-1 text-zinc-400 text-[11px] mb-0.5">
                <Banknote className="w-3 h-3 text-emerald-400" />
                <span>Salary</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-emerald-400 font-mono">
                {job.salary}
              </p>
              <p className="text-[10px] text-zinc-500 mt-0.5">Fixed monthly</p>
            </div>

            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3">
              <div className="flex items-center gap-1 text-zinc-400 text-[11px] mb-0.5">
                <Wrench className="w-3 h-3 text-red-400" />
                <span>Required Skills</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-zinc-100 font-mono truncate">
                {job.requiredSkills[0]}
              </p>
              <p className="text-[10px] text-zinc-500 mt-0.5">Verified</p>
            </div>
          </div>

          {/* Why This Matches (Comprehensive 4-part breakdown) */}
          <div>
            <MatchBreakdown analysis={job.matchAnalysis} compact={false} />
          </div>

          {/* Job Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5 font-mono">
              About the Role
            </h4>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed bg-zinc-900/60 p-3.5 rounded-xl border border-zinc-800/80">
              {job.description}
            </p>
          </div>

          {/* Skills & Perks Tags */}
          <div className="space-y-3">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5 font-mono">
                Skills Needed
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {job.requiredSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium font-mono bg-red-950/40 text-red-200 border border-red-900/50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5 font-mono">
                Store Perks
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {job.perks.map((perk, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-900 text-zinc-300 border border-zinc-800"
                  >
                    <Check className="w-3 h-3 text-red-400" />
                    {perk}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer / Quick Action */}
        <div className="p-4 sm:p-5 bg-zinc-950 border-t border-zinc-800/80 flex items-center justify-between gap-3">
          <div className="text-xs text-zinc-400 hidden sm:flex items-center gap-1.5 font-mono">
            <ShieldCheck className="w-4 h-4 text-red-400" />
            <span>Direct employer contact • No agency fees</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition-colors cursor-pointer font-mono"
            >
              Close
            </button>
            <button
              onClick={handleApplyClick}
              disabled={applied}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer font-mono ${
                applied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-lg shadow-red-950/50 hover:shadow-red-600/30 border border-red-500/40 active:scale-98'
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
