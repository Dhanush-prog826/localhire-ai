import React from 'react';
import type { PageTab } from '../types';
import {
  Sparkles,
  MapPin,
  Clock,
  ArrowRight,
  Briefcase,
  Store,
  CheckCircle2,
  Zap,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (tab: PageTab) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12 sm:space-y-16 pb-12">
      {/* Hero Section */}
      <section className="text-center pt-6 sm:pt-10 max-w-3xl mx-auto px-4">
        {/* Hyperlocal AI Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50/90 border border-indigo-200/80 text-indigo-700 text-xs sm:text-sm font-semibold mb-6 shadow-2xs">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>Hyperlocal AI Part-Time Matching</span>
        </div>

        {/* Main App Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight sm:leading-none mb-4">
          LocalHire <span className="text-emerald-600">AI</span>
        </h1>

        {/* Tagline */}
        <p className="text-xl sm:text-2xl md:text-3xl font-bold text-indigo-700 tracking-tight mb-6">
          "Find the right part-time work, near you."
        </p>

        {/* Problem Explanation */}
        <div className="bg-white/80 border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-xs text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto text-left space-y-2.5">
          <p>
            <strong className="text-slate-900 font-semibold">The Problem: </strong>
            Traditional job boards are designed for full-time corporate roles or long citywide commutes. Meanwhile, neighborhood stores, local cafes, clinics, and coaching institutes struggle to find reliable part-time staff for specific 3–4 hour evening or morning slots.
          </p>
          <p className="text-slate-600">
            <strong className="text-indigo-600 font-semibold">Our AI Solution: </strong>
            LocalHire AI bridges this hyper-local gap. Just describe your available hours, skills, and preferred distance in plain words — our AI matches you with genuine part-time jobs within a 5 km radius in seconds.
          </p>
        </div>

        {/* Two Required CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8">
          <button
            onClick={() => onNavigate('seeker')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/25 active:scale-98 transition-all cursor-pointer group"
          >
            <Briefcase className="w-5 h-5" />
            <span>Find a Part-Time Job</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => onNavigate('employer')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base text-slate-800 bg-white hover:bg-emerald-50 border-2 border-emerald-500/70 hover:border-emerald-600 shadow-sm active:scale-98 transition-all cursor-pointer group"
          >
            <Store className="w-5 h-5 text-emerald-600" />
            <span>Post a Job</span>
            <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Live Neighborhood Activity Indicator */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs font-semibold text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Over 28 local micro-shifts and evening jobs active nearby right now</span>
        </div>
      </section>

      {/* How LocalHire AI Works (3 Pillars) */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            How LocalHire AI Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            No resume upload, no endless forms. Just plain natural language.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Card 1 */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs hover:shadow-sm transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              1. Type in Plain English
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              "I know Excel, can work 6 PM to 10 PM within 5 km." AI extracts your exact time slot and capabilities.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs hover:shadow-sm transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              2. Hyperlocal 5 km Radius
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Save time and money. Every matched job is within walking distance or a short 10-minute cycle/two-wheeler ride.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs hover:shadow-sm transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              3. Perfect Time Slot Fit
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tailored for students, homemakers, or second-shift earners seeking predictable 3–4 hour daily shifts.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Quick Try Preview */}
      <section className="max-w-3xl mx-auto px-4">
        <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Live Prototype Preview
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold">
              Try the AI Matching Experience
            </h3>

            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              See how LocalHire AI extracts skills, time slots, and travel radius from natural language, scoring jobs like Billing Assistant at 94% Match.
            </p>

            <div className="pt-2 flex flex-wrap gap-2.5">
              <button
                onClick={() => onNavigate('seeker')}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98 cursor-pointer"
              >
                Test Job Seeker Flow (6 PM – 10 PM)
              </button>
              <button
                onClick={() => onNavigate('employer')}
                className="px-5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all cursor-pointer"
              >
                Test Employer Job Posting
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Built for Hackathon Footer Note */}
      <footer className="text-center text-xs text-slate-600 pt-4">
        <div className="flex items-center justify-center gap-1.5 mb-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>LocalHire AI • Hyperlocal Part-Time Work Platform</span>
        </div>
        <p>Built with React, TypeScript, Vite & Tailwind CSS</p>
      </footer>
    </div>
  );
};
