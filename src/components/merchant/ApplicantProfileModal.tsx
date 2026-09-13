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
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200/90 w-full max-w-lg overflow-hidden z-10 my-auto">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 p-5 sm:p-6 text-white relative">
          <button
            onClick={onClose}
            aria-label="Close applicant dialog"
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-xs">
              Applied for {applicant.jobTitle}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-400/30 border border-emerald-300/40">
              {applicant.status}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                {applicant.name}
              </h3>
              <p className="text-xs text-emerald-100 flex items-center gap-2 mt-1">
                <span>{applicant.age} years</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {applicant.distance}
                </span>
              </p>
            </div>

            {/* Match Score */}
            <div className="px-3 py-1.5 rounded-xl bg-white text-emerald-800 text-center font-extrabold shadow-sm">
              <span className="text-lg leading-none">{applicant.matchPercentage}%</span>
              <p className="text-[9px] uppercase tracking-wider">AI Match</p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Key Attributes */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3">
              <div className="flex items-center gap-1 text-slate-500 text-[11px] mb-1">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>Availability</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-900">
                {applicant.availability}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3">
              <div className="flex items-center gap-1 text-slate-500 text-[11px] mb-1">
                <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                <span>Applied Date</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-900">
                {applicant.appliedDate}
              </p>
            </div>
          </div>

          {/* Skills Breakdown */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-emerald-600" />
              <span>Skills & Competencies</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {applicant.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* AI Match Notes */}
          <div className="bg-indigo-50/70 border border-indigo-150 rounded-2xl p-4 text-xs text-indigo-950 space-y-1.5">
            <p className="font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>AI Evaluation Insights:</span>
            </p>
            <p className="text-indigo-900 leading-relaxed">
              Candidate lives {applicant.distance} which ensures reliable on-time arrival for the evening shift. Availability ({applicant.availability}) completely matches store billing counter rush hours.
            </p>
          </div>

          {/* Notes */}
          {applicant.notes && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Hiring Notes
              </h4>
              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                {applicant.notes}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons in Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-2">
          <button
            onClick={() => handleAction('Rejected', 'Candidate not shortlisted for this shift')}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer flex items-center gap-1"
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Reject</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleAction('Shortlisted', 'Shortlisted for in-store interview')}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors cursor-pointer flex items-center gap-1"
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>Shortlist</span>
            </button>

            <button
              onClick={() => handleAction('Interview', 'Interview slot scheduled via WhatsApp')}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors cursor-pointer flex items-center gap-1"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Interview</span>
            </button>

            <button
              onClick={() => handleAction('Accepted', 'Offer letter sent and accepted!')}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm active:scale-98 transition-all cursor-pointer flex items-center gap-1"
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
