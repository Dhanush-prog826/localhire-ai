import React from 'react';
import { useApp } from '../context/AppContext';
import {
  LogOut,
  Repeat,
  Smartphone,
  Monitor,
  User,
  Store,
  Home,
  Briefcase,
  PlusCircle,
  LogIn,
  Zap,
} from 'lucide-react';

interface NavbarProps {
  isMobileFrame: boolean;
  setIsMobileFrame: (val: boolean) => void;
  currentView?: 'home' | 'portal' | 'login';
  onNavigateHome?: () => void;
  onNavigatePortal?: () => void;
  onFindJob?: () => void;
  onPostJob?: () => void;
  onOpenLogin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isMobileFrame,
  setIsMobileFrame,
  currentView = 'home',
  onNavigateHome,
  onNavigatePortal,
  onFindJob,
  onPostJob,
  onOpenLogin,
}) => {
  const { currentUser, seekerProfile, merchantProfile, switchRole, logout } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-[#050505]/85 backdrop-blur-xl border-b border-blue-950/60 shadow-[0_4px_30px_rgba(14,165,233,0.1)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand Logo & Arc Emblem (Clickable to go Home) */}
        <div
          onClick={onNavigateHome}
          className="flex items-center gap-2.5 text-left group cursor-pointer shrink-0"
          title="Return to Command Center"
        >
          {/* Thor Lightning Arc Core Emblem */}
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-900 via-black to-blue-950/80 border border-blue-800/50 flex items-center justify-center text-white shadow-[0_0_18px_rgba(14,165,233,0.4)] group-hover:shadow-[0_0_28px_rgba(56,189,248,0.7)] group-hover:border-cyan-400 transition-all">
            <div className="absolute inset-1 rounded-lg border border-cyan-500/40 animate-pulse" />
            <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-blue-600 via-cyan-400 to-sky-300 flex items-center justify-center shadow-[0_0_10px_rgba(56,189,248,0.9)] animate-lightning">
              <Zap className="w-2.5 h-2.5 text-black fill-black" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                LOCALHIRE<span className="text-cyan-400 ml-1 text-sm bg-blue-950/70 px-1.5 py-0.5 rounded border border-blue-800/60 shadow-[0_0_10px_rgba(14,165,233,0.5)] font-mono">AI</span>
              </span>
            </div>
            <p className="text-[10px] font-mono tracking-widest text-zinc-400 hidden sm:block uppercase">
              HYPERLOCAL COMMAND // 5KM
            </p>
          </div>
        </div>

        {/* Central Tactical Navigation (Home, Find Jobs, Post a Job, Login) */}
        <nav className="hidden md:flex items-center gap-1 bg-zinc-950/80 border border-blue-950/50 p-1 rounded-xl shadow-inner">
          <button
            type="button"
            onClick={onNavigateHome}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              currentView === 'home'
                ? 'bg-blue-600/25 text-white border border-cyan-500/50 shadow-[0_0_12px_rgba(14,165,233,0.35)]'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Home className="w-3.5 h-3.5 text-cyan-400" />
            <span>Home</span>
            {currentView === 'home' && (
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
            )}
          </button>

          <button
            type="button"
            onClick={onFindJob || onNavigatePortal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              currentView === 'portal' && currentUser?.role === 'seeker'
                ? 'bg-blue-600/25 text-white border border-cyan-500/50 shadow-[0_0_12px_rgba(14,165,233,0.35)]'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-zinc-300" />
            <span>Find Jobs</span>
            {currentView === 'portal' && currentUser?.role === 'seeker' && (
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
            )}
          </button>

          <button
            type="button"
            onClick={onPostJob || onNavigatePortal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              currentView === 'portal' && currentUser?.role === 'merchant'
                ? 'bg-blue-600/25 text-white border border-cyan-500/50 shadow-[0_0_12px_rgba(14,165,233,0.35)]'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5 text-zinc-300" />
            <span>Post a Job</span>
            {currentView === 'portal' && currentUser?.role === 'merchant' && (
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
            )}
          </button>

          {!currentUser && (
            <button
              type="button"
              onClick={onOpenLogin}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentView === 'login'
                  ? 'bg-blue-600/25 text-white border border-cyan-500/50 shadow-[0_0_12px_rgba(14,165,233,0.35)]'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <LogIn className="w-3.5 h-3.5 text-cyan-400" />
              <span>Login</span>
            </button>
          )}
        </nav>

        {/* Right side controls: User session, Role switcher, Mobile frame toggle */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {currentUser ? (
            <div className="flex items-center gap-2">
              {/* Active Profile Pill */}
              <div
                onClick={onNavigatePortal}
                className="flex items-center gap-2 pl-2 pr-3 py-1 bg-zinc-950/90 rounded-xl border border-blue-950/60 shadow-xs cursor-pointer hover:border-cyan-500/50 transition-colors"
                title="Open Command Dashboard"
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-[0_0_8px_rgba(14,165,233,0.5)] ${
                    currentUser.role === 'seeker'
                      ? 'bg-gradient-to-tr from-blue-700 to-cyan-500'
                      : 'bg-gradient-to-tr from-zinc-800 to-blue-700'
                  }`}
                >
                  {currentUser.role === 'seeker' ? (
                    <User className="w-3.5 h-3.5" />
                  ) : (
                    <Store className="w-3.5 h-3.5" />
                  )}
                </div>
                <div className="text-left hidden xs:block sm:block">
                  <p className="text-xs font-bold text-zinc-200 leading-tight">
                    {currentUser.role === 'seeker'
                      ? seekerProfile.name
                      : merchantProfile.businessName}
                  </p>
                  <p className="text-[10px] font-mono font-semibold text-cyan-400 uppercase leading-none">
                    {currentUser.role === 'seeker' ? 'SEEKER CORE' : 'MERCHANT HUB'}
                  </p>
                </div>
              </div>

              {/* Quick Role Switcher Button */}
              <button
                type="button"
                onClick={() =>
                  switchRole(currentUser.role === 'seeker' ? 'merchant' : 'seeker')
                }
                title={`Switch role to ${
                  currentUser.role === 'seeker' ? 'Merchant' : 'Job Seeker'
                }`}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold text-zinc-300 bg-zinc-900 border border-zinc-800 hover:border-cyan-500/50 hover:text-white transition-all cursor-pointer shadow-xs"
              >
                <Repeat className="w-3.5 h-3.5 text-cyan-400" />
                <span>
                  {currentUser.role === 'seeker' ? 'Merchant' : 'Seeker'}
                </span>
              </button>

              {/* Logout button */}
              <button
                type="button"
                onClick={logout}
                title="Sign out"
                className="p-1.5 text-zinc-400 hover:text-cyan-400 hover:bg-blue-950/40 rounded-xl border border-transparent hover:border-blue-950 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenLogin}
              className="px-4 py-2 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 hover:from-blue-500 hover:to-cyan-500 border border-cyan-400/50 shadow-[0_0_18px_rgba(14,165,233,0.5)] transition-all cursor-pointer"
            >
              Sign In
            </button>
          )}

          {/* Desktop Only: Phone Frame Simulator Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileFrame(!isMobileFrame)}
            title={isMobileFrame ? 'Switch to responsive view' : 'Preview mobile hackathon frame'}
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-zinc-400 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-colors ml-1 cursor-pointer"
          >
            {isMobileFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-cyan-400" />
                <span>Full View</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                <span>HUD Frame</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

