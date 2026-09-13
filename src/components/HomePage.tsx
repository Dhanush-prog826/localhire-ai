import React from 'react';
import {
  MapPin,
  Clock,
  ArrowRight,
  Briefcase,
  Store,
  CheckCircle2,
  Zap,
  TrendingUp,
  Search,
  ShieldCheck,
  Bot,
  Compass,
  FileX,
  Navigation,
  Crosshair,
  Cpu,
  Radio,
  Sliders,
  Sparkles,
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
    <div className="relative space-y-16 sm:space-y-24 pb-24 overflow-hidden text-slate-100">
      {/* BACKGROUND ATMOSPHERE: Deep dark obsidian with electric blue & Thor-lightning aura */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Electric Blue Radial Flares */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-gradient-to-b from-blue-600/15 via-cyan-900/10 to-transparent blur-[130px] rounded-full animate-pulse-electric" />
        <div className="absolute top-[35%] right-[-10%] w-[600px] h-[600px] bg-blue-950/25 blur-[140px] rounded-full" />
        <div className="absolute top-[65%] left-[-10%] w-[550px] h-[550px] bg-cyan-950/20 blur-[130px] rounded-full" />

        {/* Tactical Holographic Grid Lines */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(to right, #0ea5e9 1px, transparent 1px), linear-gradient(to bottom, #0ea5e9 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />

        {/* Electric Energy Horizon Glow */}
        <div className="absolute top-40 left-0 right-0 h-96 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent" />
      </div>

      {/* 1. HERO SECTION: STREAMLINED & CRYSTAL-CLEAR */}
      <section className="relative text-center pt-8 sm:pt-14 max-w-5xl mx-auto px-4">
        {/* Clean System Status Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-zinc-950/90 border border-cyan-500/40 text-cyan-300 text-xs font-mono tracking-wider mb-6 shadow-[0_0_20px_rgba(14,165,233,0.3)]">
          <Zap className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400 animate-lightning" />
          <span className="uppercase font-semibold">HYPERLOCAL AI MATCHING // 5.0 KM RADIUS</span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-300 font-sans text-[11px]">Bangalore Pilot</span>
        </div>

        {/* Main Headline: Unmistakable Value Proposition */}
        <div className="relative mb-5">
          <div className="absolute inset-0 -z-10 blur-3xl bg-blue-600/20 rounded-full w-3/4 mx-auto animate-pulse-electric" />
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase leading-none">
            LOCALHIRE <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-sky-400 bg-clip-text text-transparent">AI</span>
          </h1>

          <p className="mt-4 text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-100 max-w-3xl mx-auto leading-tight">
            Find nearby part-time work that{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-sky-300 to-blue-400">
              actually fits your schedule.
            </span>
          </p>
        </div>

        {/* Crystal Clear Explanation */}
        <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed mb-8 font-medium">
          Connects job seekers with local businesses within <strong>5 km</strong>. Zero resumes, zero 40 km commutes—just 3–4 hour micro-shifts matched by AI.
        </p>

        {/* DUAL INTERACTIVE PRIMARY ACTION CARDS (Instant Clarity for New Visitors) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto mb-10 text-left">
          {/* OPTION 1: JOB SEEKER */}
          <div
            onClick={onFindJob}
            className="group relative bg-zinc-950/90 hover:bg-zinc-900/90 border-2 border-cyan-500/60 hover:border-cyan-400 rounded-2xl p-6 shadow-[0_0_25px_rgba(14,165,233,0.25)] hover:shadow-[0_0_35px_rgba(56,189,248,0.5)] transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between active:scale-[0.99]"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.8)]" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-cyan-500/50 flex items-center justify-center text-cyan-400 shadow-[0_0_12px_rgba(14,165,233,0.4)]">
                  <Briefcase className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-950/80 text-cyan-300 border border-cyan-500/40">
                  FOR JOB SEEKERS
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-black text-white group-hover:text-cyan-200 transition-colors">
                I Need a Part-Time Job
              </h2>
              <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                Discover part-time shifts within 5 km that match your specific free hours and skills.
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
              <span className="text-[11px] font-mono text-cyan-400 font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Rahul • 94% Match Demo
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-white bg-blue-600 group-hover:bg-blue-500 px-3 py-1.5 rounded-lg shadow-sm transition-colors">
                <span>Find Matches</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>

          {/* OPTION 2: EMPLOYER / MERCHANT */}
          <div
            onClick={onPostJob}
            className="group relative bg-zinc-950/90 hover:bg-zinc-900/90 border border-zinc-800 hover:border-cyan-500/60 rounded-2xl p-6 shadow-xl hover:shadow-[0_0_30px_rgba(14,165,233,0.3)] transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between active:scale-[0.99]"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-700 group-hover:border-cyan-500/40 flex items-center justify-center text-zinc-300 group-hover:text-cyan-400 shadow-sm transition-colors">
                  <Store className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-zinc-900 text-zinc-400 border border-zinc-700">
                  FOR BUSINESSES
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-black text-white group-hover:text-cyan-200 transition-colors">
                I Want to Hire Staff
              </h2>
              <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                Describe your staffing needs in plain English and view verified nearby candidates.
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
              <span className="text-[11px] font-mono text-zinc-400 font-semibold">
                ABC Supermarket • 12 Candidates
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-zinc-200 bg-zinc-800 group-hover:bg-zinc-700 px-3 py-1.5 rounded-lg shadow-sm transition-colors">
                <span>Post a Job</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </div>

        {/* Natural Language Prompt Console Preview */}
        <div className="max-w-2xl mx-auto bg-zinc-950/90 border border-blue-950/70 hover:border-cyan-500/60 rounded-2xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.8)] text-left mb-6 transition-all group backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-950/50 border border-blue-800/40 flex items-center justify-center text-cyan-400 shrink-0 shadow-[0_0_12px_rgba(14,165,233,0.3)]">
              <Search className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">
                  NATURAL LANGUAGE SEARCH TERMINAL
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-xs sm:text-sm font-mono text-zinc-200 truncate">
                "I can work from 6 PM to 10 PM, I know basic Excel, and I'm looking for a part-time job within 5 km."
              </p>
            </div>
            <button
              type="button"
              onClick={onFindJob}
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-[11px] font-mono font-bold text-white shadow-[0_0_12px_rgba(14,165,233,0.4)] cursor-pointer shrink-0 transition-colors"
            >
              <span>Test AI Match</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Quick Sign In link */}
        {onSignIn && (
          <p className="text-xs text-zinc-500">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onSignIn}
              className="text-cyan-400 font-semibold hover:text-cyan-300 underline underline-offset-4 cursor-pointer"
            >
              Sign In to Portal →
            </button>
          </p>
        )}
      </section>

      {/* GLOWING SECTION DIVIDER */}
      <div className="relative max-w-4xl mx-auto px-4">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 bg-[#050505] text-[10px] font-mono uppercase tracking-widest text-cyan-400">
          // AI MATCH CORE //
        </div>
      </div>

      {/* 2. CINEMATIC "AI CORE" MATCH ENGINE VISUAL */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/50 border border-blue-800/40 text-cyan-300 text-xs font-mono font-bold mb-3 shadow-[0_0_12px_rgba(14,165,233,0.25)]">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>NEURAL MATCHING ENGINE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white uppercase max-w-2xl mx-auto">
            "AI understands your skills, availability, and location, then finds the best nearby matches."
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-lg mx-auto">
            Hyperlocal parameters converge instantly into a transparent compatibility score.
          </p>
        </div>

        {/* Interactive Futuristic Holographic HUD Display */}
        <div className="relative bg-gradient-to-b from-zinc-950/90 via-black to-zinc-950/95 border border-blue-950/80 rounded-3xl p-6 sm:p-10 shadow-[0_10px_50px_rgba(0,0,0,0.9)] backdrop-blur-xl overflow-hidden">
          {/* Subtle Grid Background */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle, #38bdf8 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          />

          {/* Holographic Radar Ring behind Center Core */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-96 sm:h-96 rounded-full border border-blue-900/20 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-blue-800/25 border-dashed animate-hud-spin pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-60 sm:h-60 rounded-full border border-cyan-700/30 animate-hud-spin-reverse pointer-events-none" />

          {/* Central AI Match Engine Visual + Output Card Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left 7 Columns: Orbital Inputs converging to AI Core */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center min-h-[340px] relative py-4">
              {/* Central Glowing Core */}
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-black via-zinc-950 to-blue-950 border-2 border-cyan-500/80 flex flex-col items-center justify-center text-center shadow-[0_0_40px_rgba(14,165,233,0.5)] z-20 group">
                <div className="absolute inset-2 rounded-full border border-cyan-400/30 animate-ping opacity-30" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 via-cyan-400 to-sky-300 flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.9)] mb-1.5 animate-lightning">
                  <Bot className="w-4 h-4 text-black font-black" />
                </div>
                <span className="text-[11px] sm:text-xs font-mono font-black tracking-widest text-white uppercase">
                  AI CORE
                </span>
                <span className="text-[9px] font-mono text-cyan-400 font-bold uppercase">
                  MATCH ENGINE
                </span>
                <div className="flex items-center gap-1 mt-1 text-[8px] font-mono text-zinc-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>CONVERGING</span>
                </div>
              </div>

              {/* 5 Orbiting Data Stream Nodes */}
              {/* Node 1: Skills (Top) */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-xl bg-zinc-900/90 border border-blue-800/40 text-zinc-200 text-xs font-mono flex items-center gap-2 shadow-[0_0_15px_rgba(14,165,233,0.2)] animate-float-particle">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                <span>SKILLS: Excel, Billing</span>
              </div>

              {/* Node 2: Location (Top Left) */}
              <div className="absolute top-16 left-0 sm:left-4 px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-blue-800/40 text-zinc-200 text-xs font-mono flex items-center gap-2 shadow-[0_0_15px_rgba(14,165,233,0.2)]">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>LOC: Indiranagar</span>
              </div>

              {/* Node 3: Availability (Top Right) */}
              <div className="absolute top-16 right-0 sm:right-4 px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-blue-800/40 text-zinc-200 text-xs font-mono flex items-center gap-2 shadow-[0_0_15px_rgba(14,165,233,0.2)]">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>TIME: 6 PM - 10 PM</span>
              </div>

              {/* Node 4: Distance (Bottom Left) */}
              <div className="absolute bottom-2 left-2 sm:left-8 px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-blue-800/40 text-zinc-200 text-xs font-mono flex items-center gap-2 shadow-[0_0_15px_rgba(14,165,233,0.2)]">
                <Navigation className="w-3.5 h-3.5 text-sky-400" />
                <span>DIST: 2.1 KM &lt; 5 KM</span>
              </div>

              {/* Node 5: Experience (Bottom Right) */}
              <div className="absolute bottom-2 right-2 sm:right-8 px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-blue-800/40 text-zinc-200 text-xs font-mono flex items-center gap-2 shadow-[0_0_15px_rgba(14,165,233,0.2)]">
                <Compass className="w-3.5 h-3.5 text-emerald-400" />
                <span>EXP: Micro-shift</span>
              </div>
            </div>

            {/* Right 5 Columns: The Generated 94% MATCH Outcome Card */}
            <div className="lg:col-span-5 bg-gradient-to-b from-zinc-900/90 to-black border-2 border-cyan-500/70 rounded-2xl p-6 shadow-[0_0_35px_rgba(14,165,233,0.35)] relative overflow-hidden">
              <div className="absolute top-0 right-0 px-3 py-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-[10px] font-mono font-black uppercase tracking-wider rounded-bl-xl shadow-[0_0_12px_rgba(14,165,233,0.8)]">
                BEST MATCH
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="text-xs font-mono tracking-wider text-cyan-300 uppercase">
                  MATCH RESULT GENERATED
                </span>
              </div>

              {/* Circular Compatibility Indicator */}
              <div className="flex items-center gap-4 my-4">
                <div className="relative w-20 h-20 shrink-0 flex items-center justify-center rounded-full bg-zinc-950 border-2 border-cyan-400/80 shadow-[0_0_20px_rgba(14,165,233,0.6)]">
                  <div className="absolute inset-1 rounded-full border border-cyan-400/30 animate-ping opacity-25" />
                  <div className="text-center">
                    <span className="text-2xl font-black text-white leading-none">94%</span>
                    <span className="block text-[8px] font-mono uppercase text-cyan-400 tracking-wider">
                      SCORE
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-black text-white tracking-tight leading-tight">
                    Billing Assistant
                  </h3>
                  <p className="text-xs font-medium text-zinc-400 mt-0.5">
                    ABC Supermarket • 2.1 km away
                  </p>
                  <p className="text-[11px] font-mono text-emerald-400 font-semibold mt-1">
                    ₹6,000 / month • 6 PM – 10 PM
                  </p>
                </div>
              </div>

              {/* Verified Analysis Metrics */}
              <div className="space-y-2 pt-3 border-t border-zinc-800 text-xs font-mono text-zinc-300">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Skill Alignment:</span>
                  <span className="text-emerald-400 font-bold">100% (Excel Match)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Schedule Overlap:</span>
                  <span className="text-emerald-400 font-bold">100% (Evening Slot)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Commute Time:</span>
                  <span className="text-sky-400 font-bold">~8 mins (Cycle)</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onFindJob}
                className="w-full mt-5 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_18px_rgba(14,165,233,0.5)] flex items-center justify-center gap-2 cursor-pointer font-mono"
              >
                <span>Inspect in Seeker Console</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* GLOWING SECTION DIVIDER */}
      <div className="relative max-w-4xl mx-auto px-4">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 bg-[#050505] text-[10px] font-mono uppercase tracking-widest text-cyan-400">
          // 3-STEP WORKFLOW //
        </div>
      </div>

      {/* 3. HOW IT WORKS: CLEAN 3-STEP FLOW */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
            How LocalHire AI Works
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Zero paperwork. Three simple steps from plain language to verified employment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 01 */}
          <div className="bg-zinc-950/80 border border-zinc-800 hover:border-cyan-500/60 rounded-2xl p-6 shadow-xl backdrop-blur-md transition-all group relative hover:-translate-y-1">
            <div className="text-4xl sm:text-5xl font-black font-mono text-zinc-800 group-hover:text-cyan-500/30 transition-colors mb-2">
              01
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                TELL US WHAT YOU NEED
              </h3>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Enter your available hours, practical skills, or hiring requirement in plain words. No PDF resume uploads or corporate formalities.
            </p>
            <div className="mt-4 pt-3 border-t border-zinc-900 text-[11px] font-mono text-zinc-500 flex items-center justify-between">
              <span>INPUT PROTOCOL</span>
              <span className="text-cyan-400 font-semibold">NLP PARSED</span>
            </div>
          </div>

          {/* Step 02 */}
          <div className="bg-zinc-950/80 border border-zinc-800 hover:border-cyan-500/60 rounded-2xl p-6 shadow-xl backdrop-blur-md transition-all group relative hover:-translate-y-1">
            <div className="text-4xl sm:text-5xl font-black font-mono text-zinc-800 group-hover:text-cyan-500/30 transition-colors mb-2">
              02
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                AI FINDS YOUR MATCH
              </h3>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Our matching engine filters jobs strictly within 5 km, computes schedule compatibility, and ranks opportunities with transparent % scores.
            </p>
            <div className="mt-4 pt-3 border-t border-zinc-900 text-[11px] font-mono text-zinc-500 flex items-center justify-between">
              <span>RADIUS CHECK</span>
              <span className="text-cyan-400 font-semibold">&le; 5.0 KM GEOFENCE</span>
            </div>
          </div>

          {/* Step 03 */}
          <div className="bg-zinc-950/80 border border-zinc-800 hover:border-cyan-500/60 rounded-2xl p-6 shadow-xl backdrop-blur-md transition-all group relative hover:-translate-y-1">
            <div className="text-4xl sm:text-5xl font-black font-mono text-zinc-800 group-hover:text-cyan-500/30 transition-colors mb-2">
              03
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                CONNECT &amp; GET HIRED
              </h3>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              1-click application submission with live status telemetry (Applied → Under Review → Shortlisted → Interview → Accepted).
            </p>
            <div className="mt-4 pt-3 border-t border-zinc-900 text-[11px] font-mono text-zinc-500 flex items-center justify-between">
              <span>APPLICATION TRACKING</span>
              <span className="text-cyan-400 font-semibold">REAL-TIME HUD</span>
            </div>
          </div>
        </div>
      </section>

      {/* GLOWING SECTION DIVIDER */}
      <div className="relative max-w-4xl mx-auto px-4">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 bg-[#050505] text-[10px] font-mono uppercase tracking-widest text-cyan-400">
          // THE LOCAL ADVANTAGE //
        </div>
      </div>

      {/* 4. CONTRAST CALLOUT: WHY LOCALHIRE AI IS DIFFERENT */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-zinc-950/90 border border-blue-950/70 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-3xl font-extrabold text-white uppercase">
              Why LocalHire AI is Different
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Traditional job boards fail local part-time ecosystems. Here is the operational comparison:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Standard Job Boards */}
            <div className="bg-black/60 border border-zinc-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-zinc-300 font-mono font-bold text-xs uppercase">
                <span className="w-5 h-5 rounded-md bg-zinc-800 text-zinc-400 flex items-center justify-center text-xs">
                  ✕
                </span>
                <span>STANDARD JOB BOARDS (INDEED / LINKEDIN)</span>
              </div>
              <ul className="text-xs text-zinc-400 space-y-3 font-sans">
                <li className="flex items-start gap-2.5">
                  <Navigation className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-zinc-200">20–40 km commutes:</strong> Lists roles across the city, making 3-hour evening shifts impossible.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <FileX className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-zinc-200">Resume heavy:</strong> Demands PDF resumes and cover letters for grocery or cashier roles.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Briefcase className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-zinc-200">Full-time bias:</strong> Built for 9-to-5 corporate positions, ignoring flexible micro-shifts.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-zinc-200">Black-hole silence:</strong> Submissions wait for weeks with zero response or visibility.
                  </span>
                </li>
              </ul>
            </div>

            {/* LocalHire AI Command */}
            <div className="bg-gradient-to-b from-blue-950/30 to-black border border-cyan-500/50 rounded-2xl p-5 space-y-3 shadow-[0_0_25px_rgba(14,165,233,0.15)]">
              <div className="flex items-center gap-2 text-cyan-300 font-mono font-bold text-xs uppercase">
                <span className="w-5 h-5 rounded-md bg-blue-600/30 text-cyan-400 flex items-center justify-center text-xs border border-cyan-500/40">
                  ✓
                </span>
                <span>LOCALHIRE AI (HYPERLOCAL AI MATCHING)</span>
              </div>
              <ul className="text-xs text-zinc-200 space-y-3 font-sans">
                <li className="flex items-start gap-2.5">
                  <Crosshair className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Strict ≤ 5 km radius:</strong> Only jobs reachable by a 10-minute cycle or quick walk.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Bot className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Zero resumes required:</strong> Type 1 sentence in natural language; AI parses capabilities.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">3–4 hr micro-shifts:</strong> Built for students, homemakers, and second-income earners.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Live telemetry tracking:</strong> Clear progression from Applied → Review → Shortlisted → Accepted.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TACTICAL PROTOTYPE TELEMETRY STATS */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-gradient-to-r from-zinc-950 via-zinc-900/90 to-zinc-950 rounded-3xl p-6 sm:p-8 border border-blue-950/60 shadow-2xl relative">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-b border-zinc-800 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                PROTOTYPE TELEMETRY READOUT
              </span>
            </div>
            <span className="text-[11px] font-mono text-zinc-400">
              SIMULATED CLUSTER: INDIRANAGAR // KORAMANGALA
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            {/* Stat 1 */}
            <div className="p-4 bg-zinc-950/80 rounded-2xl border border-zinc-800/80">
              <p className="text-3xl sm:text-4xl font-black font-mono text-cyan-400">
                50+
              </p>
              <p className="text-xs font-bold text-zinc-200 mt-1 uppercase">
                Local Jobs
              </p>
              <p className="text-[10px] font-mono text-zinc-500 mt-0.5">
                Active within 5 km
              </p>
            </div>

            {/* Stat 2 */}
            <div className="p-4 bg-zinc-950/80 rounded-2xl border border-zinc-800/80">
              <p className="text-3xl sm:text-4xl font-black font-mono text-zinc-100">
                120+
              </p>
              <p className="text-xs font-bold text-zinc-200 mt-1 uppercase">
                Job Seekers
              </p>
              <p className="text-[10px] font-mono text-zinc-500 mt-0.5">
                Students &amp; Micro-earners
              </p>
            </div>

            {/* Stat 3 */}
            <div className="p-4 bg-zinc-950/80 rounded-2xl border border-zinc-800/80">
              <p className="text-3xl sm:text-4xl font-black font-mono text-amber-400">
                85%
              </p>
              <p className="text-xs font-bold text-zinc-200 mt-1 uppercase">
                Match Accuracy
              </p>
              <p className="text-[10px] font-mono text-zinc-500 mt-0.5">
                NLP time &amp; skill fit
              </p>
            </div>

            {/* Stat 4 */}
            <div className="p-4 bg-zinc-950/80 rounded-2xl border border-zinc-800/80">
              <p className="text-3xl sm:text-4xl font-black font-mono text-sky-400">
                &lt; 3.2 km
              </p>
              <p className="text-xs font-bold text-zinc-200 mt-1 uppercase">
                Avg. Commute
              </p>
              <p className="text-[10px] font-mono text-zinc-500 mt-0.5">
                10-min cycle or walk
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-center gap-2 text-[11px] font-mono text-zinc-500">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Telemetry calibrated for hackathon evaluation and prototype verification.</span>
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE LIVE DEMO SANDBOX */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-gradient-to-r from-blue-950/60 via-zinc-950 to-black rounded-3xl p-6 sm:p-8 text-white border border-cyan-500/50 shadow-[0_0_40px_rgba(14,165,233,0.25)] relative overflow-hidden">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-cyan-400 animate-lightning" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
              INTERACTIVE HACKATHON SANDBOX
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black uppercase">
            Test Both Sides of the Platform
          </h3>

          <p className="text-zinc-300 text-xs sm:text-sm max-w-xl mt-1 mb-6">
            Launch directly into the Seeker AI Console (Rahul, 94% Match) or Merchant Mission Control (ABC Supermarket, 12 applicants).
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={onFindJob}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(14,165,233,0.5)] transition-all cursor-pointer active:scale-98 font-mono"
            >
              <Briefcase className="w-4 h-4" />
              <span>Launch Job Seeker Demo</span>
            </button>

            <button
              type="button"
              onClick={onPostJob}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 hover:border-cyan-500 font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer active:scale-98 font-mono"
            >
              <Store className="w-4 h-4 text-cyan-400" />
              <span>Launch Merchant Demo</span>
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-xs text-zinc-500 pt-6">
        <div className="flex items-center justify-center gap-2 mb-1 text-zinc-300 font-mono font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
          <span>LOCALHIRE AI // COMMAND SYSTEM ONLINE</span>
        </div>
        <p className="font-mono text-[11px] text-zinc-600">
          Hyperlocal AI Part-Time Matching • Built with React, TypeScript, Vite &amp; Tailwind CSS
        </p>
      </footer>
    </div>
  );
};


