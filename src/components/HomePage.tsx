import React from 'react';
import {
  Sparkles,
  MapPin,
  Clock,
  ArrowRight,
  Briefcase,
  Store,
  CheckCircle2,
  Zap,
  TrendingUp,
  Search,
  Users,
  ShieldCheck,
  Bot,
  Compass,
  FileX,
  Navigation,
} from 'lucide-react';

interface HomePageProps {
  onFindJob: () => void;
  onPostJob: () => void;
  onSignIn?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onFindJob,
  onPostJob,
  onSignIn,
}) => {
  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* 1. HERO SECTION */}
      <section className="text-center pt-6 sm:pt-12 max-w-4xl mx-auto px-4">
        {/* Hackathon Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs sm:text-sm font-semibold mb-6 shadow-2xs">
          <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
          <span>Hyperlocal AI Part-Time Matching • Hackathon Prototype</span>
        </div>

        {/* Problem Headline (Goal 1) */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight sm:leading-none mb-4">
          Find nearby part-time work that{' '}
          <span className="bg-gradient-to-r from-indigo-600 to-emerald-600 bg-clip-text text-transparent">
            actually fits you.
          </span>
        </h1>

        {/* Connects Job Seekers <-> Local Businesses (Goal 2) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base font-bold text-slate-700 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-50 text-indigo-800 border border-indigo-100">
            <Users className="w-4 h-4 text-indigo-600" />
            Job Seekers
          </span>
          <span className="text-emerald-600 font-extrabold text-lg sm:text-xl">
            ↔
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100">
            <Store className="w-4 h-4 text-emerald-600" />
            Local Businesses
          </span>
        </div>

        {/* Subtitle / Context Explanation */}
        <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-6">
          No 40 km commutes, no 5-page resumes, and no corporate spam. Just 3–4
          hour neighborhood micro-shifts matched to your exact evening or morning hours.
        </p>

        {/* Plain Language Prompt Teaser Box */}
        <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-left mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
            <Search className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Natural Language Prompt Example
            </p>
            <p className="text-xs sm:text-sm font-medium text-slate-800 italic">
              "I can work from 6 PM to 10 PM, I know basic Excel, and I'm looking for a part-time job within 5 km."
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center px-2 py-1 rounded-md bg-emerald-50 text-[11px] font-bold text-emerald-700 border border-emerald-200">
            Instant Match
          </span>
        </div>

        {/* Two Clear Primary Buttons (Goal 4) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
          <button
            type="button"
            onClick={onFindJob}
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/25 active:scale-98 transition-all cursor-pointer group"
          >
            <Briefcase className="w-5 h-5 text-indigo-100" />
            <span>Find a Job</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            type="button"
            onClick={onPostJob}
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base text-slate-800 bg-white hover:bg-emerald-50/80 border-2 border-emerald-500 hover:border-emerald-600 shadow-sm active:scale-98 transition-all cursor-pointer group"
          >
            <Store className="w-5 h-5 text-emerald-600" />
            <span>Post a Job</span>
            <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Sign In Quick Link */}
        {onSignIn && (
          <p className="mt-4 text-xs text-slate-500">
            Already have a profile?{' '}
            <button
              type="button"
              onClick={onSignIn}
              className="text-indigo-600 font-semibold hover:underline cursor-pointer"
            >
              Sign in to your dashboard
            </button>
          </p>
        )}
      </section>

      {/* 2. REALISTIC PROTOTYPE STATS / TRUST SECTION (Goal 6) */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Prototype Demo Metrics
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium text-center sm:text-right">
              Simulated Bangalore Hyperlocal Cluster (Indiranagar &amp; Koramangala)
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            {/* Metric 1 */}
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-emerald-400">
                50+
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">
                Local Jobs
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Active within 5 km
              </p>
            </div>

            {/* Metric 2 */}
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-indigo-300">
                120+
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">
                Job Seekers
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Students &amp; micro-earners
              </p>
            </div>

            {/* Metric 3 */}
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-amber-400">
                85%
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">
                Average Match Accuracy
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                NLP time &amp; skill fit
              </p>
            </div>

            {/* Metric 4 */}
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-sky-400">
                &lt; 3.2 km
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">
                Avg. Commute
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                10-min cycle or walk
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              All prototype metrics represent pre-seeded demo activity for evaluation.
            </span>
          </div>
        </div>
      </section>

      {/* 3. STRONG AI-FOCUSED SECTION (Goal 3) */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-2">
            <Bot className="w-3.5 h-3.5" />
            <span>AI Hyperlocal Engine</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight max-w-2xl mx-auto">
            "AI understands your skills, availability, location and preferences, then finds the best nearby matches."
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-lg mx-auto">
            Instead of searching by vague keywords, our NLP model interprets conversational inputs and checks 4 vital matching dimensions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* AI Pillar 1 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs hover:border-indigo-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              1. Availability Parsing
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Detects specific daily windows like "6 PM to 10 PM" or "Morning 7 AM" to guarantee zero schedule clashes.
            </p>
          </div>

          {/* AI Pillar 2 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs hover:border-emerald-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              2. Hyperlocal Geofencing
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Enforces a strict 5 km radius. Never travel across the city for a 4-hour evening role.
            </p>
          </div>

          {/* AI Pillar 3 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs hover:border-amber-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              3. Capability Extraction
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Extracts practical skills (Excel, Cashier, Tally, Barista) from conversational text without complex resumes.
            </p>
          </div>

          {/* AI Pillar 4 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs hover:border-purple-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              4. Match Scoring
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Calculates transparent compatibility % (e.g. 94% Match) with a clear explanation of why a job fits you.
            </p>
          </div>
        </div>
      </section>

      {/* 4. CONTRAST CALLOUT: WHY WE ARE DIFFERENT (Goal 8) */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Why LocalHire AI is Different
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Traditional job boards fail local part-time hiring. Here is why we built LocalHire AI:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Traditional Boards Box */}
            <div className="bg-rose-50/50 border border-rose-200/70 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
                <span className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center text-xs">
                  ✕
                </span>
                <span>Standard Job Boards (Indeed, LinkedIn, Naukri)</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-2.5">
                <li className="flex items-start gap-2">
                  <Navigation className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>20–40 km commutes:</strong> Show listings from anywhere in the city, making 3-hour shifts unviable.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <FileX className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Resume heavy:</strong> Require PDF CVs, cover letters, and endless form fills.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Briefcase className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Full-time bias:</strong> Built for 9-to-5 corporate roles, ignoring evening &amp; weekend micro-shifts.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Black-hole hiring:</strong> Applications sit for weeks with zero response or status visibility.
                  </span>
                </li>
              </ul>
            </div>

            {/* LocalHire AI Box */}
            <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-xs">
                  ✓
                </span>
                <span>LocalHire AI (Hyperlocal Matching)</span>
              </div>
              <ul className="text-xs text-slate-700 space-y-2.5">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Strict ≤ 5 km radius:</strong> Only jobs reachable by a 10-minute cycle or quick walk.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Bot className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Zero resumes required:</strong> Type 1 sentence in natural language; AI parses skills &amp; availability.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>3–4 hr micro-shifts:</strong> Built for students, homemakers, and second-income seekers.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Live tracking:</strong> Transparent timeline from Applied → Under Review → Shortlisted → Accepted.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW LOCALHIRE AI WORKS (Goal 5) */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            How LocalHire AI Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Simple, transparent, and built for speed in 3 simple steps:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Step 1 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs relative">
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white text-xs font-bold mb-3">
              1
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1.5">
              Step 1: Tell us what you need
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Job seekers enter their available hours and skills in plain words. Merchants post open shifts in 30 seconds without paperwork.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs relative">
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-600 text-white text-xs font-bold mb-3">
              2
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1.5">
              Step 2: AI finds compatible opportunities
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our matching algorithm evaluates distance (≤ 5 km), shift schedule overlap, and capabilities to deliver instant high-confidence matches.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs relative">
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-500 text-white text-xs font-bold mb-3">
              3
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1.5">
              Step 3: Apply and track your application
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Submit applications with 1 click. Watch real-time status updates through our visual hiring timeline as merchants review your profile.
            </p>
          </div>
        </div>
      </section>

      {/* 6. HACKATHON LIVE DEMO LAUNCHER */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-gradient-to-tr from-indigo-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Interactive Prototype Sandbox
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold">
            Test Both Sides of the Platform
          </h3>

          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mt-1 mb-6">
            Try the live prototype directly as Rahul (Job Seeker with 94% match) or ABC Supermarket (Merchant reviewing 12 applicants).
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onFindJob}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98 cursor-pointer"
            >
              <Briefcase className="w-4 h-4" />
              <span>Launch Job Seeker Demo</span>
            </button>

            <button
              type="button"
              onClick={onPostJob}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all cursor-pointer"
            >
              <Store className="w-4 h-4 text-emerald-300" />
              <span>Launch Merchant Demo</span>
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-xs text-slate-500 pt-4">
        <div className="flex items-center justify-center gap-1.5 mb-1 text-slate-700 font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>LocalHire AI • Hyperlocal Part-Time Work Platform</span>
        </div>
        <p>Built with React, TypeScript, Vite &amp; Tailwind CSS for Hackathon Prototype</p>
      </footer>
    </div>
  );
};

