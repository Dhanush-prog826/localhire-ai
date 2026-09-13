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
    <div className={`rounded-xl ${compact ? 'bg-black/80 p-3 border border-zinc-800' : 'bg-black/90 p-4 border border-zinc-800 shadow-inner'}`}>
      <div className="flex items-center gap-1.5 mb-2.5">
        <CheckCircle2 className="w-3.5 h-3.5 text-red-400" />
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-400">
          NEURAL MATCH TELEMETRY
        </span>
      </div>

      <div className="space-y-2 text-xs font-sans">
        {/* Skills Match */}
        <div className="flex items-start gap-2">
          <div className="w-5 h-5 rounded bg-zinc-900 border border-zinc-800 text-red-400 flex items-center justify-center shrink-0 mt-0.5">
            <Wrench className="w-3 h-3" />
          </div>
          <div>
            <span className="font-semibold text-zinc-200">Skills match: </span>
            <span className="text-zinc-400">{analysis.skillsMatch}</span>
          </div>
        </div>

        {/* Availability Match */}
        <div className="flex items-start gap-2">
          <div className="w-5 h-5 rounded bg-zinc-900 border border-zinc-800 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
            <Clock className="w-3 h-3" />
          </div>
          <div>
            <span className="font-semibold text-zinc-200">Availability match: </span>
            <span className="text-zinc-400">{analysis.availabilityMatch}</span>
          </div>
        </div>

        {/* Distance Match */}
        <div className="flex items-start gap-2">
          <div className="w-5 h-5 rounded bg-zinc-900 border border-zinc-800 text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
            <MapPin className="w-3 h-3" />
          </div>
          <div>
            <span className="font-semibold text-zinc-200">Distance match: </span>
            <span className="text-zinc-400">{analysis.distanceMatch}</span>
          </div>
        </div>

        {/* Job Type Match */}
        <div className="flex items-start gap-2">
          <div className="w-5 h-5 rounded bg-zinc-900 border border-zinc-800 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
            <Briefcase className="w-3 h-3" />
          </div>
          <div>
            <span className="font-semibold text-zinc-200">Job type match: </span>
            <span className="text-zinc-400">{analysis.jobTypeMatch}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

