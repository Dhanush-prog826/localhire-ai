import React from 'react';
import type { SeekerTab, MerchantTab, UserRole } from '../types';
import {
  LayoutDashboard,
  Briefcase,
  FileCheck2,
  User,
  Users,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface BottomNavProps {
  role: UserRole;
  seekerTab: SeekerTab;
  setSeekerTab: (tab: SeekerTab) => void;
  merchantTab: MerchantTab;
  setMerchantTab: (tab: MerchantTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  role,
  seekerTab,
  setSeekerTab,
  merchantTab,
  setMerchantTab,
}) => {
  const { applications, applicants } = useApp();

  if (role === 'seeker') {
    const activeAppCount = applications.length;

    return (
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#050505]/95 backdrop-blur-md border-t border-blue-950/70 py-1.5 px-3 sm:hidden shadow-2xl shadow-blue-950/40">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
        <div className="flex items-center justify-around">
          {/* 1. Dashboard */}
          <button
            onClick={() => setSeekerTab('dashboard')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
              seekerTab === 'dashboard'
                ? 'text-cyan-400 font-bold'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-[10px] font-mono">Dashboard</span>
          </button>

          {/* 2. Jobs */}
          <button
            onClick={() => setSeekerTab('jobs')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
              seekerTab === 'jobs'
                ? 'text-cyan-400 font-bold'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Briefcase className="w-5 h-5" />
            <span className="text-[10px] font-mono">Jobs</span>
          </button>

          {/* 3. Applications */}
          <button
            onClick={() => setSeekerTab('applications')}
            className={`relative flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
              seekerTab === 'applications'
                ? 'text-cyan-400 font-bold'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <div className="relative">
              <FileCheck2 className="w-5 h-5" />
              {activeAppCount > 0 && (
                <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-[9px] font-bold flex items-center justify-center shadow-xs shadow-cyan-500/50 font-mono">
                  {activeAppCount}
                </span>
              )}
            </div>
            <span className="text-[10px] font-mono">Applications</span>
          </button>

          {/* 4. Profile */}
          <button
            onClick={() => setSeekerTab('profile')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
              seekerTab === 'profile'
                ? 'text-cyan-400 font-bold'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px] font-mono">Profile</span>
          </button>
        </div>
      </nav>
    );
  }

  // Merchant Role Bottom Nav
  const activeApplicantCount = applicants.length;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#050505]/95 backdrop-blur-md border-t border-blue-950/70 py-1.5 px-3 sm:hidden shadow-2xl shadow-blue-950/40">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
      <div className="flex items-center justify-around">
        {/* 1. Dashboard */}
        <button
          onClick={() => setMerchantTab('dashboard')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
            merchantTab === 'dashboard'
              ? 'text-cyan-400 font-bold'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] font-mono">Dashboard</span>
        </button>

        {/* 2. Jobs */}
        <button
          onClick={() => setMerchantTab('jobs')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
            merchantTab === 'jobs'
              ? 'text-cyan-400 font-bold'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <Briefcase className="w-5 h-5" />
          <span className="text-[10px] font-mono">Jobs</span>
        </button>

        {/* 3. Applicants */}
        <button
          onClick={() => setMerchantTab('applicants')}
          className={`relative flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
            merchantTab === 'applicants'
              ? 'text-cyan-400 font-bold'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <div className="relative">
            <Users className="w-5 h-5" />
            {activeApplicantCount > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-[9px] font-bold flex items-center justify-center shadow-xs shadow-cyan-500/50 font-mono">
                {activeApplicantCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-mono">Applicants</span>
        </button>

        {/* 4. Profile */}
        <button
          onClick={() => setMerchantTab('profile')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
            merchantTab === 'profile'
              ? 'text-cyan-400 font-bold'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-mono">Profile</span>
        </button>
      </div>
    </nav>
  );
};
