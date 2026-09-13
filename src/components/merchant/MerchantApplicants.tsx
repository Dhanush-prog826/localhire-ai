import React, { useState } from 'react';
import type { ApplicantRecord, ApplicationStatus } from '../../types';
import { useApp } from '../../context/AppContext';
import { ApplicantProfileModal } from './ApplicantProfileModal';
import {
  Users,
  Sparkles,
  MapPin,
  Clock,
  Wrench,
  Eye,
  ThumbsUp,
  XCircle,
  Filter,
} from 'lucide-react';

interface MerchantApplicantsProps {
  filterJobId?: string;
  onClearFilter?: () => void;
}

export const MerchantApplicants: React.FC<MerchantApplicantsProps> = ({
  filterJobId,
  onClearFilter,
}) => {
  const { applicants, updateApplicationStatus, jobs } = useApp();

  const [selectedApplicant, setSelectedApplicant] = useState<ApplicantRecord | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Filter applicants
  const filteredApplicants = applicants.filter((app) => {
    if (filterJobId && app.jobId !== filterJobId) return false;
    if (statusFilter !== 'all' && app.status !== statusFilter) return false;
    return true;
  });

  const targetJob = filterJobId ? jobs.find((j) => j.id === filterJobId) : null;

  const handleQuickStatusChange = (
    applicantId: string,
    newStatus: ApplicationStatus,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    updateApplicationStatus(applicantId, newStatus);
  };

  const getStatusBadgeStyle = (status: ApplicationStatus) => {
    switch (status) {
      case 'Applied':
        return 'bg-blue-950/60 text-blue-300 border-blue-800/60';
      case 'Under Review':
        return 'bg-amber-950/60 text-amber-300 border-amber-800/60';
      case 'Shortlisted':
        return 'bg-red-950/70 text-red-300 border-red-700/70 shadow-xs shadow-red-950';
      case 'Interview':
        return 'bg-purple-950/60 text-purple-300 border-purple-800/60';
      case 'Accepted':
        return 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60';
      case 'Rejected':
        return 'bg-zinc-900 text-zinc-400 border-zinc-800';
      default:
        return 'bg-zinc-900 text-zinc-400 border-zinc-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Applicant Count Metric */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-950/90 border border-red-950/60 rounded-2xl p-5 shadow-lg">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg sm:text-xl font-mono font-extrabold uppercase tracking-wider text-zinc-100">
              {targetJob ? `Applicants for ${targetJob.title}` : 'All Candidate Applications'}
            </h3>
            {filterJobId && (
              <button
                onClick={onClearFilter}
                className="text-xs font-mono text-red-400 hover:underline cursor-pointer"
              >
                (View all jobs)
              </button>
            )}
          </div>
          <p className="text-xs font-mono font-bold text-red-400 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-red-500" />
            <span>👥 {filteredApplicants.length} CANDIDATES DISPATCHED</span>
          </p>
        </div>

        {/* Status Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs font-mono">
          <Filter className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
          {['all', 'Applied', 'Under Review', 'Shortlisted', 'Interview', 'Accepted'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold shrink-0 transition-colors cursor-pointer border ${
                statusFilter === st
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white border-red-500 shadow-sm shadow-red-950'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border-zinc-800 hover:bg-zinc-800'
              }`}
            >
              {st === 'all' ? 'All' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Applicants List Grid */}
      {filteredApplicants.length === 0 ? (
        <div className="bg-zinc-950/80 border border-red-950/50 rounded-3xl p-12 text-center text-zinc-500 font-mono">
          <Users className="w-10 h-10 text-zinc-700 mx-auto mb-2" />
          <p className="font-semibold text-sm text-zinc-400">No applicants found for this filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredApplicants.map((app) => (
            <div
              key={app.id}
              className="bg-zinc-950/85 border border-red-950/50 hover:border-red-600/50 rounded-2xl p-4 sm:p-5 shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header: Name, Age, and AI Match Score */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-base text-zinc-100 group-hover:text-red-400 transition-colors">
                        {app.name}
                      </h4>
                      <span className="text-xs font-mono text-zinc-400">
                        {app.age} yrs
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-zinc-400">
                      Applied for: <strong className="text-zinc-200">{app.jobTitle}</strong>
                    </p>
                  </div>

                  {/* Prominent Match % Badge */}
                  <div className="px-2.5 py-1 rounded-xl bg-red-950/70 text-red-300 border border-red-800/60 text-xs font-mono font-extrabold flex items-center gap-1 shrink-0 shadow-sm shadow-red-950">
                    <Sparkles className="w-3 h-3 text-red-400" />
                    <span>{app.matchPercentage}% Match</span>
                  </div>
                </div>

                {/* 4 Details: Distance, Availability, Skills, Status */}
                <div className="space-y-1.5 text-xs font-mono text-zinc-400 my-3 py-2.5 border-y border-zinc-800/80">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span className="font-medium text-zinc-200">{app.distance}</span>
                    <span className="text-zinc-500 text-[10px]">(Sector 14)</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="font-medium text-zinc-200">{app.availability}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                    <span className="font-medium text-zinc-200 truncate">
                      {app.skills.join(', ')}
                    </span>
                  </div>
                </div>

                {/* Application Status */}
                <div className="mb-4 flex items-center justify-between font-mono">
                  <span className="text-[11px] text-zinc-400">Status:</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusBadgeStyle(
                      app.status
                    )}`}
                  >
                    ● {app.status}
                  </span>
                </div>
              </div>

              {/* Action Buttons: [View Profile] [Shortlist] [Reject] */}
              <div className="pt-3 border-t border-zinc-800/80 grid grid-cols-3 gap-1.5 font-mono">
                <button
                  type="button"
                  onClick={() => setSelectedApplicant(app)}
                  className="py-2 px-2 rounded-xl text-xs font-semibold text-zinc-300 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => handleQuickStatusChange(app.id, 'Shortlisted', e)}
                  disabled={app.status === 'Shortlisted'}
                  className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    app.status === 'Shortlisted'
                      ? 'bg-red-950/70 text-red-400 border border-red-800/60 cursor-default'
                      : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-sm shadow-red-950'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{app.status === 'Shortlisted' ? 'Shortlisted' : 'Shortlist'}</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => handleQuickStatusChange(app.id, 'Rejected', e)}
                  disabled={app.status === 'Rejected'}
                  className={`py-2 px-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    app.status === 'Rejected'
                      ? 'bg-zinc-900 text-zinc-600 border border-zinc-800 cursor-default'
                      : 'bg-zinc-900/90 hover:bg-red-950/40 text-zinc-400 hover:text-red-400 border border-zinc-800'
                  }`}
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Reject</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Applicant Detail Profile Modal */}
      <ApplicantProfileModal
        applicant={selectedApplicant}
        isOpen={Boolean(selectedApplicant)}
        onClose={() => setSelectedApplicant(null)}
        onStatusChange={updateApplicationStatus}
      />
    </div>
  );
};
