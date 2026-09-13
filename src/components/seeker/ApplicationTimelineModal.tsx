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
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative bg-zinc-950 rounded-3xl shadow-2xl border border-red-900/60 w-full max-w-md overflow-hidden z-10 my-auto">
        {/* Laser line on top */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600 via-orange-500 to-red-600" />

        {/* Header */}
        <div className="bg-gradient-to-r from-zinc-950 via-red-950/60 to-zinc-950 p-5 text-white relative border-b border-red-950/60">
          <button
            onClick={onClose}
            aria-label="Close timeline dialog"
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-900/80 hover:bg-red-950/80 text-zinc-400 hover:text-white border border-zinc-800 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 mb-1">
            <Building2 className="w-3.5 h-3.5 text-red-500" />
            <span className="font-medium text-zinc-300">{application.businessName}</span>
          </div>

          <h3 className="text-xl font-extrabold tracking-tight text-zinc-100 pr-6">
            {application.jobTitle}
          </h3>

          <div className="flex items-center gap-2 mt-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono text-zinc-300 bg-zinc-900/90 border border-zinc-800">
              Applied {application.appliedDate}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-red-950/70 text-red-300 border border-red-800/60 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-red-400" />
              {application.matchPercentage}% AI Match
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Current Status Highlight Banner */}
          <div className="bg-zinc-900/80 border border-red-900/50 rounded-2xl p-3.5 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                CURRENT STAGE TELEMETRY
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-base font-extrabold font-mono text-zinc-100">
                  {currentStatus}
                </span>
              </div>
            </div>
            <span className="text-xs font-mono text-zinc-400">
              Shift: {application.workingHours}
            </span>
          </div>

          {/* Stepper Pipeline */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-1.5">
              <span>Application Lifecycle Timeline</span>
            </h4>

            {isRejected ? (
              <div className="bg-zinc-900 border border-red-900/60 rounded-2xl p-4 text-zinc-300 text-xs font-mono">
                <p className="font-bold text-red-400 mb-1">Application Closed</p>
                <p>The employer selected another candidate whose profile more closely met the requirements for this specific slot.</p>
              </div>
            ) : (
              <div className="space-y-4 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-800">
                {STAGES.map((stage, idx) => {
                  const isCompleted = idx <= currentStageIndex;
                  const isCurrent = idx === currentStageIndex;

                  // Find log event from timeline
                  const event = application.timeline.find((t) => t.status === stage);

                  return (
                    <div key={stage} className="relative flex items-start gap-3.5 pl-1">
                      {/* Step Circle */}
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0 z-10 transition-all ${
                          isCurrent
                            ? 'bg-red-600 text-white ring-4 ring-red-600/30 scale-110 shadow-lg shadow-red-900'
                            : isCompleted
                            ? 'bg-red-700 text-white shadow-xs'
                            : 'bg-zinc-900 border border-zinc-800 text-zinc-600'
                        }`}
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
                            className={`text-xs font-mono font-bold tracking-wider uppercase ${
                              isCurrent
                                ? 'text-red-400'
                                : isCompleted
                                ? 'text-zinc-200'
                                : 'text-zinc-600'
                            }`}
                          >
                            {stage}
                          </p>
                          {event && (
                            <span className="text-[10px] text-zinc-500 font-mono">
                              {event.date}
                            </span>
                          )}
                        </div>

                        {event && (
                          <p className="text-[11px] text-zinc-400 font-mono mt-0.5 leading-tight">
                            {event.note}
                          </p>
                        )}
                        {!event && isCompleted && (
                          <p className="text-[11px] text-zinc-500 font-mono mt-0.5">Completed</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Store Tip */}
          <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-xl p-3 flex items-start gap-2.5 text-xs text-zinc-400 font-mono">
            <Clock className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
            <p>
              Local store managers usually respond within 24 hours. When shortlisted, status upgrades immediately with direct shift contact details.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-zinc-950 border-t border-zinc-800/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-mono font-bold rounded-xl border border-zinc-800 transition-colors cursor-pointer"
          >
            DISMISS
          </button>
        </div>
      </div>
    </div>
  );
};
