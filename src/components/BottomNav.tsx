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
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-1.5 px-3 sm:hidden shadow-lg">
        <div className="flex items-center justify-around">
          {/* 1. Dashboard */}
          <button
            onClick={() => setSeekerTab('dashboard')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
              seekerTab === 'dashboard'
                ? 'text-indigo-600 font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-[10px]">Dashboard</span>
          </button>

          {/* 2. Jobs */}
          <button
            onClick={() => setSeekerTab('jobs')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
              seekerTab === 'jobs'
                ? 'text-indigo-600 font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Briefcase className="w-5 h-5" />
            <span className="text-[10px]">Jobs</span>
          </button>

          {/* 3. Applications */}
          <button
            onClick={() => setSeekerTab('applications')}
            className={`relative flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
              seekerTab === 'applications'
                ? 'text-indigo-600 font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div className="relative">
              <FileCheck2 className="w-5 h-5" />
              {activeAppCount > 0 && (
                <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-indigo-600 text-white text-[9px] font-bold flex items-center justify-center">
                  {activeAppCount}
                </span>
              )}
            </div>
            <span className="text-[10px]">Applications</span>
          </button>

          {/* 4. Profile */}
          <button
            onClick={() => setSeekerTab('profile')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
              seekerTab === 'profile'
                ? 'text-indigo-600 font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px]">Profile</span>
          </button>
        </div>
      </nav>
    );
  }

  // Merchant Role Bottom Nav
  const activeApplicantCount = applicants.length;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-1.5 px-3 sm:hidden shadow-lg">
      <div className="flex items-center justify-around">
        {/* 1. Dashboard */}
        <button
          onClick={() => setMerchantTab('dashboard')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
            merchantTab === 'dashboard'
              ? 'text-emerald-600 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px]">Dashboard</span>
        </button>

        {/* 2. Jobs */}
        <button
          onClick={() => setMerchantTab('jobs')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
            merchantTab === 'jobs'
              ? 'text-emerald-600 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Briefcase className="w-5 h-5" />
          <span className="text-[10px]">Jobs</span>
        </button>

        {/* 3. Applicants */}
        <button
          onClick={() => setMerchantTab('applicants')}
          className={`relative flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
            merchantTab === 'applicants'
              ? 'text-emerald-600 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="relative">
            <Users className="w-5 h-5" />
            {activeApplicantCount > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-emerald-600 text-white text-[9px] font-bold flex items-center justify-center">
                {activeApplicantCount}
              </span>
            )}
          </div>
          <span className="text-[10px]">Applicants</span>
        </button>

        {/* 4. Profile */}
        <button
          onClick={() => setMerchantTab('profile')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
            merchantTab === 'profile'
              ? 'text-emerald-600 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px]">Profile</span>
        </button>
      </div>
    </nav>
  );
};
