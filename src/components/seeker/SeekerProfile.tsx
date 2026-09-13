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
      <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-7 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-4">
            {/* Profile Photo Placeholder with Avatar */}
            <div className="relative">
              {seekerProfile.avatarUrl ? (
                <img
                  src={seekerProfile.avatarUrl}
                  alt={seekerProfile.name}
                  className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-indigo-50 shadow-md"
                />
              ) : (
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-indigo-500 to-emerald-500 text-white flex items-center justify-center text-2xl font-bold shadow-md">
                  {seekerProfile.name[0] || 'R'}
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 ring-2 ring-white flex items-center justify-center text-white" title="Verified Profile">
                <CheckCircle2 className="w-3 h-3" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {seekerProfile.name}
                </h2>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Job Seeker
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {seekerProfile.age} years
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  {seekerProfile.location}
                </span>
              </div>
            </div>
          </div>

          {/* Edit Profile Button */}
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-indigo-700 bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-200 transition-all active:scale-98 cursor-pointer shrink-0"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Short Bio */}
        {seekerProfile.bio && (
          <p className="text-xs sm:text-sm text-slate-600 mt-4 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
            {seekerProfile.bio}
          </p>
        )}

        {/* Activity Quick Stats */}
        <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-slate-100 text-center">
          <div className="bg-slate-50 rounded-xl p-2">
            <p className="text-base sm:text-lg font-extrabold text-indigo-600">
              {applications.length}
            </p>
            <p className="text-[10px] text-slate-500 uppercase font-semibold">
              Applications
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-2">
            <p className="text-base sm:text-lg font-extrabold text-emerald-600">
              {savedJobIds.length}
            </p>
            <p className="text-[10px] text-slate-500 uppercase font-semibold">
              Saved Jobs
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-2">
            <p className="text-base sm:text-lg font-extrabold text-purple-600">
              {seekerProfile.maxDistanceKm} km
            </p>
            <p className="text-[10px] text-slate-500 uppercase font-semibold">
              Max Radius
            </p>
          </div>
        </div>
      </div>

      {/* Profile Details Grid */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          Hyperlocal Matching Preferences
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Skills */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2">
              <Wrench className="w-4 h-4 text-emerald-600" />
              <span>Skills</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {seekerProfile.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>Availability</span>
            </div>
            <p className="text-sm font-bold text-slate-900">
              {seekerProfile.availability}
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Evening micro-shifts & flexible slots
            </p>
          </div>

          {/* Preferred Job Type */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2">
              <Briefcase className="w-4 h-4 text-indigo-600" />
              <span>Preferred Job Type</span>
            </div>
            <p className="text-sm font-bold text-slate-900">
              {seekerProfile.preferredJobType}
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Short daily shifts / weekend assignments
            </p>
          </div>

          {/* Preferred Working Hours */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2">
              <Clock className="w-4 h-4 text-purple-600" />
              <span>Preferred Working Hours</span>
            </div>
            <p className="text-sm font-bold text-slate-900">
              {seekerProfile.preferredWorkingHours}
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Target shift timing for AI filtering
            </p>
          </div>

          {/* Maximum Travel Distance */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                <Navigation className="w-4 h-4 text-rose-500" />
                <span>Maximum Travel Distance</span>
              </div>
              <span className="text-xs font-extrabold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                Within {seekerProfile.maxDistanceKm} km
              </span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all"
                style={{ width: `${Math.min(100, (seekerProfile.maxDistanceKm / 15) * 100)}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Only jobs within ~10-15 minutes cycle or commute from {seekerProfile.location} are recommended.
            </p>
          </div>
        </div>

        {/* Contact Info Preview */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-4 text-xs text-slate-600">
          <span className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-slate-400" />
            {seekerProfile.email}
          </span>
          <span className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-slate-400" />
            {seekerProfile.phone}
          </span>
          <span className="flex items-center gap-1.5 text-emerald-700 ml-auto font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Identity Verified
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
