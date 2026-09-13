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
    <header className="sticky top-0 z-40 bg-[#050505]/85 backdrop-blur-xl border-b border-red-950/40 shadow-[0_4px_30px_rgba(220,38,38,0.08)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand Logo & Arc Emblem (Clickable to go Home) */}
        <div
          onClick={onNavigateHome}
          className="flex items-center gap-2.5 text-left group cursor-pointer shrink-0"
          title="Return to Command Center"
        >
          {/* Arc Core Emblem */}
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-900 via-black to-red-950/80 border border-red-800/50 flex items-center justify-center text-white shadow-[0_0_15px_rgba(220,38,38,0.35)] group-hover:shadow-[0_0_25px_rgba(220,38,38,0.6)] group-hover:border-red-500 transition-all">
            <div className="absolute inset-1 rounded-lg border border-red-500/30 animate-pulse" />
            <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center shadow-[0_0_8px_rgba(239,68,68,0.8)]">
              <Zap className="w-2.5 h-2.5 text-black fill-black" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-red-400 transition-colors">
                LOCALHIRE<span className="text-red-500 ml-1 text-sm bg-red-950/60 px-1.5 py-0.5 rounded border border-red-800/60 shadow-[0_0_8px_rgba(220,38,38,0.4)]">AI</span>
              </span>
            </div>
            <p className="text-[10px] font-mono tracking-widest text-zinc-400 hidden sm:block uppercase">
              HYPERLOCAL COMMAND // 5KM
            </p>
          </div>
        </div>

        {/* Central Tactical Navigation (Home, Find Jobs, Post a Job, Login) */}
        <nav className="hidden md:flex items-center gap-1 bg-zinc-950/80 border border-red-950/40 p-1 rounded-xl shadow-inner">
          <button
            type="button"
            onClick={onNavigateHome}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              currentView === 'home'
                ? 'bg-red-600/20 text-white border border-red-600/50 shadow-[0_0_10px_rgba(220,38,38,0.3)]'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Home className="w-3.5 h-3.5 text-red-400" />
            <span>Home</span>
            {currentView === 'home' && (
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_6px_#ef4444]" />
            )}
          </button>

          <button
            type="button"
            onClick={onFindJob || onNavigatePortal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              currentView === 'portal' && currentUser?.role === 'seeker'
                ? 'bg-red-600/20 text-white border border-red-600/50 shadow-[0_0_10px_rgba(220,38,38,0.3)]'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-zinc-300" />
            <span>Find Jobs</span>
            {currentView === 'portal' && currentUser?.role === 'seeker' && (
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_6px_#ef4444]" />
            )}
          </button>

          <button
            type="button"
            onClick={onPostJob || onNavigatePortal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              currentView === 'portal' && currentUser?.role === 'merchant'
                ? 'bg-red-600/20 text-white border border-red-600/50 shadow-[0_0_10px_rgba(220,38,38,0.3)]'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5 text-zinc-300" />
            <span>Post a Job</span>
            {currentView === 'portal' && currentUser?.role === 'merchant' && (
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_6px_#ef4444]" />
            )}
          </button>

          {!currentUser && (
            <button
              type="button"
              onClick={onOpenLogin}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentView === 'login'
                  ? 'bg-red-600/20 text-white border border-red-600/50 shadow-[0_0_10px_rgba(220,38,38,0.3)]'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <LogIn className="w-3.5 h-3.5 text-red-400" />
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
                className="flex items-center gap-2 pl-2 pr-3 py-1 bg-zinc-950/90 rounded-xl border border-red-950/60 shadow-xs cursor-pointer hover:border-red-600/50 transition-colors"
                title="Open Command Dashboard"
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-[0_0_8px_rgba(220,38,38,0.4)] ${
                    currentUser.role === 'seeker'
                      ? 'bg-gradient-to-tr from-red-700 to-red-500'
                      : 'bg-gradient-to-tr from-zinc-800 to-red-700'
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
                  <p className="text-[10px] font-mono font-semibold text-red-400 uppercase leading-none">
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
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold text-zinc-300 bg-zinc-900 border border-zinc-800 hover:border-red-600/40 hover:text-white transition-all cursor-pointer shadow-xs"
              >
                <Repeat className="w-3.5 h-3.5 text-red-500" />
                <span>
                  {currentUser.role === 'seeker' ? 'Merchant' : 'Seeker'}
                </span>
              </button>

              {/* Logout button */}
              <button
                type="button"
                onClick={logout}
                title="Sign out"
                className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-red-950/40 rounded-xl border border-transparent hover:border-red-950 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenLogin}
              className="px-4 py-2 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 border border-red-500/50 shadow-[0_0_15px_rgba(220,38,38,0.4)] transition-all cursor-pointer"
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
                <Monitor className="w-3.5 h-3.5 text-red-400" />
                <span>Full View</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-red-400" />
                <span>HUD Frame</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

