import React from 'react';
import type { JobSeekerExtraction } from '../types';
import { Sparkles, Clock, MapPin, Wrench, Briefcase, CheckCircle2 } from 'lucide-react';

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
      <div className="bg-gradient-to-r from-indigo-50/90 via-emerald-50/70 to-indigo-50/90 border border-indigo-200/80 rounded-2xl p-5 shadow-xs animate-pulse">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-indigo-600 animate-spin" />
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
            LocalHire AI is analyzing your criteria...
          </span>
        </div>
        <p className="text-sm text-slate-600">
          Extracting hours, skills, travel radius, and matching with local neighborhood businesses...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-indigo-200/80 rounded-2xl p-5 shadow-sm relative overflow-hidden transition-all">
      {/* Decorative gradient highlight bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-emerald-500 to-teal-400" />

      <div className="flex items-center justify-between mb-3.5 pt-1">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
              AI UNDERSTANDS:
            </h3>
            <p className="text-[11px] text-slate-500">Parsed instantly from your natural language</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          <span>Extracted</span>
        </div>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {/* Job Type */}
        <div className="bg-slate-50/80 hover:bg-indigo-50/40 border border-slate-200/80 rounded-xl p-3 transition-colors">
          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium mb-1">
            <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
            <span>Job type</span>
          </div>
          <p className="text-sm font-bold text-slate-900 truncate">
            {extraction.jobType}
          </p>
        </div>

        {/* Skills */}
        <div className="bg-slate-50/80 hover:bg-indigo-50/40 border border-slate-200/80 rounded-xl p-3 transition-colors">
          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium mb-1">
            <Wrench className="w-3.5 h-3.5 text-emerald-600" />
            <span>Skills</span>
          </div>
          <p className="text-sm font-bold text-slate-900 truncate">
            {extraction.skills.join(', ') || 'Excel'}
          </p>
        </div>

        {/* Availability */}
        <div className="bg-slate-50/80 hover:bg-indigo-50/40 border border-slate-200/80 rounded-xl p-3 transition-colors">
          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium mb-1">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>Availability</span>
          </div>
          <p className="text-sm font-bold text-slate-900 truncate">
            {extraction.availability}
          </p>
        </div>

        {/* Distance */}
        <div className="bg-slate-50/80 hover:bg-indigo-50/40 border border-slate-200/80 rounded-xl p-3 transition-colors">
          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium mb-1">
            <MapPin className="w-3.5 h-3.5 text-rose-600" />
            <span>Distance</span>
          </div>
          <p className="text-sm font-bold text-slate-900 truncate">
            {extraction.distance}
          </p>
        </div>
      </div>
    </div>
  );
};
