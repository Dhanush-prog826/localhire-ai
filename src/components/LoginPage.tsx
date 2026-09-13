import React, { useState } from 'react';
import type { UserRole } from '../types';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Lock,
  Mail,
  User,
  Store,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess?: () => void;
  onBackToHome?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onBackToHome,
}) => {
  const { login } = useApp();

  const [role, setRole] = useState<UserRole>('seeker');
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [identifier, setIdentifier] = useState<string>('rahul.seeker@example.com');
  const [password, setPassword] = useState<string>('password123');
  const [name, setName] = useState<string>('Rahul Sharma');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      login(role, identifier, false);
      setIsLoading(false);
      if (onLoginSuccess) onLoginSuccess();
    }, 350);
  };

  const handleQuickDemoLogin = (targetRole: UserRole) => {
    setIsLoading(true);
    setTimeout(() => {
      login(targetRole, '', true);
      setIsLoading(false);
      if (onLoginSuccess) onLoginSuccess();
    }, 200);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Electric Blue Atmospheric Lighting & Background Flares */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-b from-blue-600/15 via-cyan-950/10 to-transparent blur-[120px] rounded-full animate-pulse-electric" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, #0ea5e9 1px, transparent 1px), linear-gradient(to bottom, #0ea5e9 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Thor Lightning Arc Core Emblem */}
        <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-zinc-900 via-black to-blue-950 border border-blue-800/60 flex items-center justify-center text-white shadow-[0_0_25px_rgba(14,165,233,0.4)] mb-4 group relative">
          <div className="absolute inset-1 rounded-xl border border-cyan-500/40 animate-pulse" />
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-600 via-cyan-400 to-sky-300 flex items-center justify-center shadow-[0_0_10px_rgba(56,189,248,0.9)] animate-lightning">
            <Zap className="w-3.5 h-3.5 text-black fill-black" />
          </div>
        </div>

        {/* Large Cinematic Heading */}
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase leading-none">
          Welcome to LocalHire AI
        </h1>
        <p className="text-sm sm:text-base font-medium text-zinc-400 mt-2">
          "Find work that fits you."
        </p>
      </div>

      {/* Main Login Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-zinc-950/90 backdrop-blur-2xl py-7 sm:py-9 px-5 sm:px-8 shadow-[0_15px_50px_rgba(0,0,0,0.9)] rounded-3xl border border-blue-950/70 relative">
          {onBackToHome && (
            <div className="mb-4">
              <button
                type="button"
                onClick={onBackToHome}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-zinc-400 hover:text-cyan-400 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>← BACK TO COMMAND CENTER</span>
              </button>
            </div>
          )}

          {/* Role Selection Toggle */}
          <div className="mb-6">
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2">
              SELECT OPERATIONAL ROLE
            </label>
            <div className="grid grid-cols-2 gap-2 bg-black/80 p-1.5 rounded-2xl border border-zinc-800">
              <button
                type="button"
                onClick={() => {
                  setRole('seeker');
                  setIdentifier('rahul.seeker@example.com');
                }}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  role === 'seeker'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-[0_0_15px_rgba(14,165,233,0.4)] border border-cyan-400/50'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Job Seeker</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setRole('merchant');
                  setIdentifier('store@abcsupermarket.com');
                }}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  role === 'merchant'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-[0_0_15px_rgba(14,165,233,0.4)] border border-cyan-400/50'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Store className="w-4 h-4" />
                <span>Merchant</span>
              </button>
            </div>
          </div>

          {/* Form Header */}
          <div className="mb-5 flex items-center justify-between border-b border-zinc-800/80 pb-3">
            <h2 className="text-sm sm:text-base font-bold text-white uppercase font-mono">
              {isSignUp ? 'REGISTER PROFILE' : `ACCESS AS ${role === 'seeker' ? 'JOB SEEKER' : 'MERCHANT'}`}
            </h2>
            <span className="text-[10px] font-mono text-cyan-400 font-bold bg-blue-950/60 border border-blue-800/40 px-2 py-0.5 rounded">
              {role === 'seeker' ? 'CANDIDATE' : 'EMPLOYER'}
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">
                  {role === 'seeker' ? 'FULL NAME' : 'BUSINESS NAME'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={role === 'seeker' ? 'e.g. Rahul Sharma' : 'e.g. ABC Supermarket'}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-black/60 border border-zinc-800 rounded-xl text-sm text-white focus:bg-black focus:outline-none focus:border-cyan-400/80 font-medium transition-colors placeholder:text-zinc-600"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">
                EMAIL OR MOBILE NUMBER
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="name@example.com or +91 98..."
                  className="w-full pl-9 pr-3.5 py-2.5 bg-black/60 border border-zinc-800 rounded-xl text-sm text-white focus:bg-black focus:outline-none focus:border-cyan-400/80 font-medium transition-colors placeholder:text-zinc-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">
                ACCESS KEY (PASSWORD)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-black/60 border border-zinc-800 rounded-xl text-sm text-white focus:bg-black focus:outline-none focus:border-cyan-400/80 font-medium transition-colors placeholder:text-zinc-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 hover:from-blue-500 hover:to-cyan-500 border border-cyan-400/50 shadow-[0_0_20px_rgba(14,165,233,0.4)] active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider font-mono"
            >
              {isLoading ? (
                <Sparkles className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>{isSignUp ? 'CREATE PROFILE' : 'ENTER TERMINAL'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Toggle Sign In / Create Account */}
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
            >
              {isSignUp
                ? 'Already have credentials? Sign in'
                : "New personnel? Create account"}
            </button>
          </div>

          {/* 1-Click Demo Shortcut Section */}
          <div className="mt-6 pt-5 border-t border-zinc-800">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-3 justify-center">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>1-CLICK DEMO ACCESS PROTOCOL</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('seeker')}
                className="p-3 rounded-xl border border-zinc-800 bg-black/60 hover:border-cyan-500/50 hover:bg-zinc-900 text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                    R
                  </div>
                  <span className="text-xs font-bold text-zinc-100 group-hover:text-cyan-300 transition-colors truncate">
                    Demo Seeker
                  </span>
                </div>
                <p className="text-[11px] font-mono text-zinc-400 mt-1 pl-8">
                  Rahul (19y • 94% Match)
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('merchant')}
                className="p-3 rounded-xl border border-zinc-800 bg-black/60 hover:border-cyan-500/50 hover:bg-zinc-900 text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-zinc-800 text-cyan-400 border border-cyan-500/40 flex items-center justify-center text-xs font-bold shrink-0">
                    A
                  </div>
                  <span className="text-xs font-bold text-zinc-100 group-hover:text-cyan-300 transition-colors truncate">
                    Demo Merchant
                  </span>
                </div>
                <p className="text-[11px] font-mono text-zinc-400 mt-1 pl-8">
                  ABC Supermarket (12 Apps)
                </p>
              </button>
            </div>
          </div>
        </div>

        {/* Security badge */}
        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs font-mono text-zinc-500">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>LocalHire AI Protocol // Safe Mock Telemetry</span>
        </div>
      </div>
    </div>
  );
};

