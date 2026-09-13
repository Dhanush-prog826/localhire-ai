import React from 'react';
import type { ApplicantRecord, ApplicationStatus } from '../../types';
import {
  X,
  MapPin,
  Clock,
  Wrench,
  Sparkles,
  Calendar,
  ThumbsUp,
  XCircle,
  MessageSquare,
  Award,
} from 'lucide-react';

interface ApplicantProfileModalProps {
  applicant: ApplicantRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (applicantId: string, newStatus: ApplicationStatus, note?: string) => void;
}

export const ApplicantProfileModal: React.FC<ApplicantProfileModalProps> = ({
  applicant,
  isOpen,
  onClose,
  onStatusChange,
}) => {
  if (!isOpen || !applicant) return null;

  const handleAction = (status: ApplicationStatus, note?: string) => {
    onStatusChange(applicant.id, status, note);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative bg-zinc-950 rounded-3xl shadow-2xl border border-red-900/60 w-full max-w-lg overflow-hidden z-10 my-auto">
        {/* Top laser line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600 via-orange-500 to-red-600" />

        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-zinc-950 via-red-950/60 to-zinc-950 p-5 sm:p-6 text-white relative border-b border-red-950/60">
          <button
            onClick={onClose}
            aria-label="Close applicant dialog"
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-900/80 hover:bg-red-950/80 text-zinc-400 hover:text-white border border-zinc-800 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-zinc-900/90 text-zinc-300 border border-zinc-800 uppercase tracking-wider">
              Applied for {applicant.jobTitle}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-red-950/70 text-red-300 border border-red-800/60 uppercase tracking-wider">
              {applicant.status}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-100">
                {applicant.name}
              </h3>
              <p className="text-xs font-mono text-zinc-400 flex items-center gap-2 mt-1">
                <span>{applicant.age} yrs</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-red-500" />
                  {applicant.distance}
                </span>
              </p>
            </div>

            {/* Match Score */}
            <div className="px-3.5 py-2 rounded-xl bg-red-950/80 border border-red-700/80 text-center font-mono font-extrabold shadow-md shadow-red-950">
              <span className="text-lg leading-none text-red-400 block">{applicant.matchPercentage}%</span>
              <p className="text-[9px] uppercase tracking-wider text-red-300 mt-0.5">AI MATCH</p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[70vh] overflow-y-auto font-mono">
          {/* Key Attributes */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-3">
              <div className="flex items-center gap-1 text-zinc-500 text-[11px] mb-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>AVAILABILITY</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-zinc-100">
                {applicant.availability}
              </p>
            </div>

            <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-3">
              <div className="flex items-center gap-1 text-zinc-500 text-[11px] mb-1">
                <Calendar className="w-3.5 h-3.5 text-red-400" />
                <span>APPLIED DATE</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-zinc-100">
                {applicant.appliedDate}
              </p>
            </div>
          </div>

          {/* Skills Breakdown */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-orange-400" />
              <span>Skills & Competencies</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {applicant.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-red-950/60 text-red-300 border border-red-800/50"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* AI Match Notes */}
          <div className="bg-zinc-900/90 border border-red-950/60 rounded-2xl p-4 text-xs text-zinc-300 space-y-1.5">
            <p className="font-bold flex items-center gap-1.5 text-red-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-red-500" />
              <span>AI Evaluation Insights:</span>
            </p>
            <p className="text-zinc-400 leading-relaxed">
              Candidate lives {applicant.distance} which ensures reliable on-time arrival for the evening shift. Availability ({applicant.availability}) completely matches store billing counter rush hours.
            </p>
          </div>

          {/* Notes */}
          {applicant.notes && (
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-1">
                Hiring Notes
              </h4>
              <p className="text-xs text-zinc-400 bg-zinc-900/80 p-3 rounded-xl border border-zinc-800">
                {applicant.notes}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons in Footer */}
        <div className="p-4 sm:p-5 bg-zinc-950 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2 font-mono">
          <button
            onClick={() => handleAction('Rejected', 'Candidate not shortlisted for this shift')}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-zinc-400 hover:text-red-400 bg-zinc-900 hover:bg-red-950/50 border border-zinc-800 transition-colors cursor-pointer flex items-center gap-1"
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Reject</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleAction('Shortlisted', 'Shortlisted for in-store interview')}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-red-300 bg-red-950/60 hover:bg-red-900/70 border border-red-800/60 transition-colors cursor-pointer flex items-center gap-1"
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>Shortlist</span>
            </button>

            <button
              onClick={() => handleAction('Interview', 'Interview slot scheduled via WhatsApp')}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-orange-300 bg-orange-950/60 hover:bg-orange-900/70 border border-orange-800/60 transition-colors cursor-pointer flex items-center gap-1"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Interview</span>
            </button>

            <button
              onClick={() => handleAction('Accepted', 'Offer letter sent and accepted!')}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 shadow-md shadow-red-950 active:scale-98 transition-all cursor-pointer flex items-center gap-1"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Accept Offer</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

