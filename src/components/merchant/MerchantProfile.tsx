import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MerchantEditProfileModal } from './MerchantEditProfileModal';
import {
  Store,
  MapPin,
  Mail,
  Phone,
  User,
  Edit3,
  ShieldCheck,
  Building2,
} from 'lucide-react';

export const MerchantProfile: React.FC = () => {
  const { merchantProfile, updateMerchantProfile, jobs, applicants } = useApp();
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const merchantJobs = jobs.filter((j) => j.merchantId === merchantProfile.id);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      {/* Merchant Header Card */}
      <div className="bg-zinc-950/90 border border-blue-950/60 rounded-3xl p-5 sm:p-7 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-4">
            {/* Store Photo / Avatar */}
            <div className="relative">
              {merchantProfile.avatarUrl ? (
                <img
                  src={merchantProfile.avatarUrl}
                  alt={merchantProfile.businessName}
                  className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-cyan-500/50 shadow-lg"
                />
              ) : (
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-cyan-500 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-blue-950">
                  <Store className="w-8 h-8" />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-100">
                  {merchantProfile.businessName}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-950/60 text-cyan-400 border border-blue-800/50 uppercase tracking-wider">
                  VERIFIED MERCHANT
                </span>
              </div>

              <p className="text-xs font-mono font-semibold text-cyan-400 mt-0.5">
                {merchantProfile.businessType}
              </p>

              <p className="flex items-center gap-1 text-xs font-mono text-zinc-400 mt-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                {merchantProfile.location}
              </p>
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

        {/* Business Metrics Banner */}
        <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-zinc-800/80 text-center font-mono">
          <div className="bg-zinc-900/70 border border-zinc-800/80 rounded-xl p-2.5">
            <p className="text-base sm:text-lg font-extrabold text-cyan-400">
              {merchantJobs.length}
            </p>
            <p className="text-[10px] text-zinc-400 uppercase font-semibold">
              Posted Jobs
            </p>
          </div>
          <div className="bg-zinc-900/70 border border-zinc-800/80 rounded-xl p-2.5">
            <p className="text-base sm:text-lg font-extrabold text-blue-400">
              {applicants.length}
            </p>
            <p className="text-[10px] text-zinc-400 uppercase font-semibold">
              Total Applicants
            </p>
          </div>
          <div className="bg-zinc-900/70 border border-zinc-800/80 rounded-xl p-2.5">
            <p className="text-base sm:text-lg font-extrabold text-sky-400">
              {applicants.filter((a) => a.status === 'Shortlisted').length}
            </p>
            <p className="text-[10px] text-zinc-400 uppercase font-semibold">
              Shortlisted
            </p>
          </div>
        </div>
      </div>

      {/* Business Details Card */}
      <div className="bg-zinc-950/90 border border-blue-950/60 rounded-3xl p-5 sm:p-7 shadow-xl space-y-5 font-mono">
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-cyan-400" />
          <span>Store Profile & Verification Dossier</span>
        </h3>

        {/* Description */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
            Business Description
          </h4>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed bg-zinc-900/80 p-4 rounded-2xl border border-zinc-800">
            {merchantProfile.businessDescription}
          </p>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-3.5">
            <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-1">
              <User className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-semibold">Contact Person</span>
            </div>
            <p className="text-sm font-bold text-zinc-100">
              {merchantProfile.contactPerson}
            </p>
          </div>

          <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-3.5">
            <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-1">
              <Phone className="w-3.5 h-3.5 text-sky-400" />
              <span className="font-semibold">Phone Number</span>
            </div>
            <p className="text-sm font-bold text-zinc-100">
              {merchantProfile.phone}
            </p>
          </div>

          <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-3.5">
            <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-1">
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span className="font-semibold">Official Email</span>
            </div>
            <p className="text-sm font-bold text-zinc-100">
              {merchantProfile.email}
            </p>
          </div>

          <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-3.5">
            <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-semibold">Merchant Status</span>
            </div>
            <p className="text-sm font-bold text-cyan-400 flex items-center gap-1">
              Active Employer in Sector 14
            </p>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <MerchantEditProfileModal
        profile={merchantProfile}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={updateMerchantProfile}
      />
    </div>
  );
};
