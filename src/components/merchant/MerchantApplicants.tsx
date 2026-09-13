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
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Under Review':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Shortlisted':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Interview':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Accepted':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Rejected':
        return 'bg-slate-100 text-slate-600 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Applicant Count Metric */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
              {targetJob ? `Applicants for ${targetJob.title}` : 'All Candidate Applications'}
            </h3>
            {filterJobId && (
              <button
                onClick={onClearFilter}
                className="text-xs text-indigo-600 font-semibold hover:underline cursor-pointer"
              >
                (View all jobs)
              </button>
            )}
          </div>
          <p className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-emerald-600" />
            <span>👥 {filteredApplicants.length} people applied</span>
          </p>
        </div>

        {/* Status Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          {['all', 'Applied', 'Under Review', 'Shortlisted', 'Interview', 'Accepted'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold shrink-0 transition-colors cursor-pointer ${
                statusFilter === st
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st === 'all' ? 'All' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Applicants List Grid */}
      {filteredApplicants.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center text-slate-500">
          <Users className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="font-semibold text-sm">No applicants found for this filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredApplicants.map((app) => (
            <div
              key={app.id}
              className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs hover:shadow-md hover:border-emerald-200 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header: Name, Age, and AI Match Score */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-base text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {app.name}
                      </h4>
                      <span className="text-xs font-medium text-slate-500">
                        {app.age} years
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Applied for: <strong>{app.jobTitle}</strong>
                    </p>
                  </div>

                  {/* Prominent Match % Badge */}
                  <div className="px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-extrabold flex items-center gap-1 shrink-0">
                    <Sparkles className="w-3 h-3" />
                    <span>{app.matchPercentage}% Match</span>
                  </div>
                </div>

                {/* 4 Details: Distance, Availability, Skills, Status */}
                <div className="space-y-1.5 text-xs text-slate-600 my-3 py-2.5 border-y border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span className="font-medium text-slate-800">{app.distance}</span>
                    <span className="text-slate-400 text-[10px]">(Sector 14)</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="font-medium text-slate-800">{app.availability}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    <span className="font-medium text-slate-800 truncate">
                      {app.skills.join(', ')}
                    </span>
                  </div>
                </div>

                {/* Application Status */}
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">Status:</span>
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
              <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedApplicant(app)}
                  className="py-2 px-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1 cursor-pointer"
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
                      ? 'bg-indigo-100 text-indigo-800 cursor-default'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
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
                      ? 'bg-slate-200 text-slate-500 cursor-default'
                      : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200'
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
