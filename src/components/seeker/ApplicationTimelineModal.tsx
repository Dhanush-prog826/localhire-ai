import React from 'react';
import type { Application, ApplicationStatus } from '../../types';
import { X, CheckCircle2, Clock, Sparkles, Building2 } from 'lucide-react';

interface ApplicationTimelineModalProps {
  application: Application | null;
  isOpen: boolean;
  onClose: () => void;
}

const STAGES: ApplicationStatus[] = [
  'Applied',
  'Under Review',
  'Shortlisted',
  'Interview',
  'Accepted',
];

export const ApplicationTimelineModal: React.FC<ApplicationTimelineModalProps> = ({
  application,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !application) return null;

  const currentStatus = application.status;
  const isRejected = currentStatus === 'Rejected';

  // Get index of current stage in standard progression
  const currentStageIndex = STAGES.indexOf(currentStatus);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200/90 w-full max-w-md overflow-hidden z-10 my-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-emerald-600 p-5 text-white relative">
          <button
            onClick={onClose}
            aria-label="Close timeline dialog"
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-1.5 text-xs text-indigo-100 mb-1">
            <Building2 className="w-3.5 h-3.5" />
            <span className="font-medium">{application.businessName}</span>
          </div>

          <h3 className="text-xl font-bold tracking-tight text-white pr-6">
            {application.jobTitle}
          </h3>

          <div className="flex items-center gap-2 mt-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-xs">
              Applied {application.appliedDate}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-400/25 border border-emerald-300/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {application.matchPercentage}% AI Match
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Current Status Highlight Banner */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Current Status
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-base font-extrabold text-slate-900">
                  {currentStatus}
                </span>
              </div>
            </div>
            <span className="text-xs font-medium text-slate-500">
              Shift: {application.workingHours}
            </span>
          </div>

          {/* Stepper Pipeline */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4">
              Application Lifecycle Timeline
            </h4>

            {isRejected ? (
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-rose-800 text-xs">
                <p className="font-bold mb-1">Application Closed</p>
                <p>The employer selected another candidate whose profile more closely met the requirements for this specific slot.</p>
              </div>
            ) : (
              <div className="space-y-4 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {STAGES.map((stage, idx) => {
                  const isCompleted = idx <= currentStageIndex;
                  const isCurrent = idx === currentStageIndex;

                  // Find log event from timeline
                  const event = application.timeline.find((t) => t.status === stage);

                  return (
                    <div key={stage} className="relative flex items-start gap-3.5 pl-1">
                      {/* Step Circle */}
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 z-10 transition-all ${
                          isCompleted
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-slate-200 text-slate-500'
                        } ${isCurrent ? 'ring-4 ring-emerald-100 scale-110' : ''}`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <span>{idx + 1}</span>
                        )}
                      </div>

                      {/* Stage info */}
                      <div className="flex-1 pb-1">
                        <div className="flex items-center justify-between">
                          <p
                            className={`text-xs font-bold ${
                              isCurrent
                                ? 'text-indigo-600'
                                : isCompleted
                                ? 'text-slate-900'
                                : 'text-slate-400'
                            }`}
                          >
                            {stage}
                          </p>
                          {event && (
                            <span className="text-[10px] text-slate-400 font-medium">
                              {event.date}
                            </span>
                          )}
                        </div>

                        {event && (
                          <p className="text-[11px] text-slate-600 mt-0.5 leading-tight">
                            {event.note}
                          </p>
                        )}
                        {!event && isCompleted && (
                          <p className="text-[11px] text-slate-400 mt-0.5">Completed</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Store Tip */}
          <div className="bg-indigo-50/70 border border-indigo-150 rounded-xl p-3 flex items-start gap-2.5 text-xs text-indigo-900">
            <Clock className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <p>
              Local store managers usually respond within 24 hours. When shortlisted, you will receive an interview slot alert here and on WhatsApp.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
