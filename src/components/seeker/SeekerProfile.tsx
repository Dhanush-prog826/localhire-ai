import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SeekerEditProfileModal } from './SeekerEditProfileModal';
import {
  MapPin,
  Clock,
  Briefcase,
  Wrench,
  Navigation,
  Edit3,
  Calendar,
  Mail,
  Phone,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const SeekerProfile: React.FC = () => {
  const { seekerProfile, updateSeekerProfile, applications, savedJobIds } = useApp();
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      {/* Profile Header Card */}
      <div className="bg-zinc-950/90 border border-blue-950/70 rounded-3xl p-5 sm:p-7 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-4">
            {/* Profile Photo Placeholder with Avatar */}
            <div className="relative">
              {seekerProfile.avatarUrl ? (
                <img
                  src={seekerProfile.avatarUrl}
                  alt={seekerProfile.name}
                  className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-cyan-500/50 shadow-lg"
                />
              ) : (
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-cyan-500 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-blue-950">
                  {seekerProfile.name[0] || 'R'}
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-cyan-500 ring-2 ring-zinc-950 flex items-center justify-center text-zinc-950 shadow-xs" title="Verified Profile">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-100">
                  {seekerProfile.name}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-950/60 text-cyan-400 border border-blue-800/50 uppercase tracking-wider">
                  JOB SEEKER
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-400 font-mono mt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                  {seekerProfile.age} years
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  {seekerProfile.location}
                </span>
              </div>
            </div>
          </div>

          {/* Edit Profile Button */}
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-mono font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 border border-blue-500/30 transition-all active:scale-98 cursor-pointer shrink-0 shadow-md shadow-blue-950"
          >
            <Edit3 className="w-4 h-4" />
            <span>EDIT PROFILE</span>
          </button>
        </div>

        {/* Short Bio */}
        {seekerProfile.bio && (
          <p className="text-xs sm:text-sm text-zinc-300 mt-4 leading-relaxed bg-zinc-900/80 p-3.5 rounded-2xl border border-zinc-800/80 font-mono">
            {seekerProfile.bio}
          </p>
        )}

        {/* Activity Quick Stats */}
        <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-zinc-800/80 text-center">
          <div className="bg-zinc-900/70 border border-zinc-800/80 rounded-xl p-2.5">
            <p className="text-base sm:text-lg font-mono font-extrabold text-cyan-400">
              {applications.length}
            </p>
            <p className="text-[10px] text-zinc-400 font-mono uppercase font-semibold">
              Applications
            </p>
          </div>
          <div className="bg-zinc-900/70 border border-zinc-800/80 rounded-xl p-2.5">
            <p className="text-base sm:text-lg font-mono font-extrabold text-blue-400">
              {savedJobIds.length}
            </p>
            <p className="text-[10px] text-zinc-400 font-mono uppercase font-semibold">
              Saved Jobs
            </p>
          </div>
          <div className="bg-zinc-900/70 border border-zinc-800/80 rounded-xl p-2.5">
            <p className="text-base sm:text-lg font-mono font-extrabold text-sky-400">
              {seekerProfile.maxDistanceKm} km
            </p>
            <p className="text-[10px] text-zinc-400 font-mono uppercase font-semibold">
              Max Radius
            </p>
          </div>
        </div>
      </div>

      {/* Profile Details Grid */}
      <div className="bg-zinc-950/90 border border-blue-950/60 rounded-3xl p-5 sm:p-7 shadow-xl space-y-6">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Hyperlocal Matching Telemetry</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Skills */}
          <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-4">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-zinc-300 mb-2">
              <Wrench className="w-4 h-4 text-cyan-400" />
              <span>Skills</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {seekerProfile.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-blue-950/60 text-cyan-300 border border-blue-800/50"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-4">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-zinc-300 mb-2">
              <Clock className="w-4 h-4 text-sky-400" />
              <span>Availability</span>
            </div>
            <p className="text-sm font-bold text-zinc-100">
              {seekerProfile.availability}
            </p>
            <p className="text-[11px] text-zinc-500 font-mono mt-0.5">
              Evening micro-shifts & flexible slots
            </p>
          </div>

          {/* Preferred Job Type */}
          <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-4">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-zinc-300 mb-2">
              <Briefcase className="w-4 h-4 text-cyan-400" />
              <span>Preferred Job Type</span>
            </div>
            <p className="text-sm font-bold text-zinc-100">
              {seekerProfile.preferredJobType}
            </p>
            <p className="text-[11px] text-zinc-500 font-mono mt-0.5">
              Short daily shifts / weekend assignments
            </p>
          </div>

          {/* Preferred Working Hours */}
          <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-4">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-zinc-300 mb-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>Preferred Working Hours</span>
            </div>
            <p className="text-sm font-bold text-zinc-100">
              {seekerProfile.preferredWorkingHours}
            </p>
            <p className="text-[11px] text-zinc-500 font-mono mt-0.5">
              Target shift timing for AI filtering
            </p>
          </div>

          {/* Maximum Travel Distance */}
          <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-4 sm:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-zinc-300">
                <Navigation className="w-4 h-4 text-cyan-400" />
                <span>Maximum Travel Distance</span>
              </div>
              <span className="text-xs font-mono font-bold text-cyan-400 bg-blue-950/60 px-2.5 py-0.5 rounded-md border border-blue-800/50">
                Within {seekerProfile.maxDistanceKm} km
              </span>
            </div>
            <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-600 via-cyan-400 to-sky-400 h-full rounded-full transition-all"
                style={{ width: `${Math.min(100, (seekerProfile.maxDistanceKm / 15) * 100)}%` }}
              />
            </div>
            <p className="text-[11px] text-zinc-500 font-mono mt-2">
              Only jobs within ~10-15 minutes cycle or commute from {seekerProfile.location} are recommended.
            </p>
          </div>
        </div>

        {/* Contact Info Preview */}
        <div className="pt-3 border-t border-zinc-800/80 flex flex-wrap gap-4 text-xs text-zinc-400 font-mono">
          <span className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-zinc-500" />
            {seekerProfile.email}
          </span>
          <span className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-zinc-500" />
            {seekerProfile.phone}
          </span>
          <span className="flex items-center gap-1.5 text-cyan-400 ml-auto font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            Clearance Verified
          </span>
        </div>
      </div>

      {/* Edit Profile Modal Dialog */}
      <SeekerEditProfileModal
        profile={seekerProfile}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={updateSeekerProfile}
      />
    </div>
  );
};
