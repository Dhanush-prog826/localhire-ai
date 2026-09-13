import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  MapPin,
  LogOut,
  Repeat,
  Smartphone,
  Monitor,
  User,
  Store,
} from 'lucide-react';

interface NavbarProps {
  isMobileFrame: boolean;
  setIsMobileFrame: (val: boolean) => void;
  onOpenLogin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isMobileFrame,
  setIsMobileFrame,
  onOpenLogin,
}) => {
  const { currentUser, seekerProfile, merchantProfile, switchRole, logout } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-2.5 text-left group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-tight text-slate-900">
                LocalHire<span className="text-emerald-600"> AI</span>
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Sparkles className="w-2.5 h-2.5 mr-0.5 text-emerald-600" />
                Hyperlocal
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Find the right part-time work, near you.
            </p>
          </div>
        </div>

        {/* Right side controls: User session, Role switcher, Mobile frame toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {currentUser ? (
            <div className="flex items-center gap-2">
              {/* Active Profile Pill */}
              <div className="flex items-center gap-2 pl-2 pr-3 py-1 bg-slate-100 rounded-2xl border border-slate-200">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                    currentUser.role === 'seeker' ? 'bg-indigo-600' : 'bg-emerald-600'
                  }`}
                >
                  {currentUser.role === 'seeker' ? (
                    <User className="w-3.5 h-3.5" />
                  ) : (
                    <Store className="w-3.5 h-3.5" />
                  )}
                </div>
                <div className="text-left hidden xs:block sm:block">
                  <p className="text-xs font-bold text-slate-900 leading-tight">
                    {currentUser.role === 'seeker'
                      ? seekerProfile.name
                      : merchantProfile.businessName}
                  </p>
                  <p className="text-[10px] font-semibold text-slate-500 uppercase leading-none">
                    {currentUser.role === 'seeker' ? 'Job Seeker' : 'Merchant'}
                  </p>
                </div>
              </div>

              {/* Quick Role Switcher Button (Demo feature) */}
              <button
                type="button"
                onClick={() =>
                  switchRole(currentUser.role === 'seeker' ? 'merchant' : 'seeker')
                }
                title={`Switch role to ${
                  currentUser.role === 'seeker' ? 'Merchant' : 'Job Seeker'
                }`}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 shadow-2xs transition-colors cursor-pointer"
              >
                <Repeat className="w-3.5 h-3.5 text-indigo-600" />
                <span>
                  Switch to {currentUser.role === 'seeker' ? 'Merchant' : 'Seeker'}
                </span>
              </button>

              {/* Logout button */}
              <button
                type="button"
                onClick={logout}
                title="Sign out"
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenLogin}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all cursor-pointer"
            >
              Sign In
            </button>
          )}

          {/* Desktop Only: Phone Frame Simulator Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileFrame(!isMobileFrame)}
            title={isMobileFrame ? 'Switch to responsive view' : 'Preview mobile hackathon frame'}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-colors ml-1 cursor-pointer"
          >
            {isMobileFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-slate-500" />
                <span>Full View</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-indigo-600" />
                <span>Mobile Preview</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
