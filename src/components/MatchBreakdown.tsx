import React from 'react';
import type { MatchAnalysis } from '../types';
import { CheckCircle2, Clock, MapPin, Wrench, Briefcase } from 'lucide-react';

interface MatchBreakdownProps {
  analysis: MatchAnalysis;
  compact?: boolean;
}

export const MatchBreakdown: React.FC<MatchBreakdownProps> = ({
  analysis,
  compact = false,
}) => {
  return (
    <div className={`rounded-xl ${compact ? 'bg-slate-50 p-3 border border-slate-200/80' : 'bg-slate-50/90 p-4 border border-slate-200'}`}>
      <div className="flex items-center gap-1.5 mb-2.5">
        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
        <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Why this matches
        </span>
      </div>

      <div className="space-y-2 text-xs">
        {/* Skills Match */}
        <div className="flex items-start gap-2">
          <div className="w-5 h-5 rounded-md bg-emerald-100/80 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
            <Wrench className="w-3 h-3" />
          </div>
          <div>
            <span className="font-semibold text-slate-800">Skills match: </span>
            <span className="text-slate-600">{analysis.skillsMatch}</span>
          </div>
        </div>

        {/* Availability Match */}
        <div className="flex items-start gap-2">
          <div className="w-5 h-5 rounded-md bg-amber-100/80 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
            <Clock className="w-3 h-3" />
          </div>
          <div>
            <span className="font-semibold text-slate-800">Availability match: </span>
            <span className="text-slate-600">{analysis.availabilityMatch}</span>
          </div>
        </div>

        {/* Distance Match */}
        <div className="flex items-start gap-2">
          <div className="w-5 h-5 rounded-md bg-rose-100/80 text-rose-700 flex items-center justify-center shrink-0 mt-0.5">
            <MapPin className="w-3 h-3" />
          </div>
          <div>
            <span className="font-semibold text-slate-800">Distance match: </span>
            <span className="text-slate-600">{analysis.distanceMatch}</span>
          </div>
        </div>

        {/* Job Type Match */}
        <div className="flex items-start gap-2">
          <div className="w-5 h-5 rounded-md bg-indigo-100/80 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
            <Briefcase className="w-3 h-3" />
          </div>
          <div>
            <span className="font-semibold text-slate-800">Job type match: </span>
            <span className="text-slate-600">{analysis.jobTypeMatch}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
