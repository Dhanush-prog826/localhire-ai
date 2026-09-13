import React from 'react';
import type { JobSeekerExtraction } from '../types';
import { Sparkles, Clock, MapPin, Wrench, Briefcase, CheckCircle2, Cpu } from 'lucide-react';

interface AiExtractionCardProps {
  extraction: JobSeekerExtraction;
  isAnalyzing?: boolean;
}

export const AiExtractionCard: React.FC<AiExtractionCardProps> = ({
  extraction,
  isAnalyzing = false,
}) => {
  if (isAnalyzing) {
    return (
      <div className="relative bg-zinc-950/90 border border-red-600/40 rounded-2xl p-5 shadow-lg shadow-red-950/20 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 animate-[laser-sweep_2s_ease-in-out_infinite]" />
        <div className="flex items-center gap-2 mb-2">
          <Cpu className="w-5 h-5 text-red-500 animate-spin" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-400">
            LOCALHIRE AI NEURAL PARSER ACTIVE...
          </span>
        </div>
        <p className="text-xs text-zinc-400 font-mono">
          Deconstructing natural language query: extracting shift hours, candidate competencies, geospatial coordinates, and ranking neighborhood opportunities...
        </p>
      </div>
    );
  }

  return (
    <div className="relative bg-zinc-950/90 border border-red-950/60 hover:border-red-900/60 rounded-2xl p-5 shadow-lg transition-all overflow-hidden group">
      {/* Top laser accent */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 opacity-80" />

      <div className="flex items-center justify-between mb-3.5 pt-0.5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-red-950/40 border border-red-800/40 flex items-center justify-center text-red-400 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
          </div>
          <div>
            <h3 className="text-xs font-mono font-extrabold uppercase tracking-wider text-zinc-100 flex items-center gap-1.5">
              <span>AI UNDERSTANDS:</span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            </h3>
            <p className="text-[11px] text-zinc-500 font-mono">Synthesized instantly from natural language input</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-red-400 bg-red-950/50 px-2.5 py-1 rounded-full border border-red-800/40">
          <CheckCircle2 className="w-3 h-3 text-red-400" />
          <span>PARSED</span>
        </div>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {/* Job Type */}
        <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-xl p-3 hover:border-red-900/50 transition-colors">
          <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-medium mb-1">
            <Briefcase className="w-3.5 h-3.5 text-red-400" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">Job type</span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-zinc-100 truncate">
            {extraction.jobType}
          </p>
        </div>

        {/* Skills */}
        <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-xl p-3 hover:border-red-900/50 transition-colors">
          <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-medium mb-1">
            <Wrench className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">Skills</span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-zinc-100 truncate">
            {extraction.skills.join(', ') || 'Excel'}
          </p>
        </div>

        {/* Availability */}
        <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-xl p-3 hover:border-red-900/50 transition-colors">
          <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-medium mb-1">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">Availability</span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-zinc-100 truncate">
            {extraction.availability}
          </p>
        </div>

        {/* Distance */}
        <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-xl p-3 hover:border-red-900/50 transition-colors">
          <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-medium mb-1">
            <MapPin className="w-3.5 h-3.5 text-red-500" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">Distance</span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-zinc-100 truncate">
            {extraction.distance}
          </p>
        </div>
      </div>
    </div>
  );
};

