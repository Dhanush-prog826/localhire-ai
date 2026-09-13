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
      <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-7 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-600 via-teal-500 to-indigo-600" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-4">
            {/* Store Photo / Avatar */}
            <div className="relative">
              {merchantProfile.avatarUrl ? (
                <img
                  src={merchantProfile.avatarUrl}
                  alt={merchantProfile.businessName}
                  className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-emerald-50 shadow-md"
                />
              ) : (
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center text-2xl font-bold shadow-md">
                  <Store className="w-8 h-8" />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {merchantProfile.businessName}
                </h2>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Verified Merchant
                </span>
              </div>

              <p className="text-xs font-semibold text-indigo-700 mt-0.5">
                {merchantProfile.businessType}
              </p>

              <p className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                {merchantProfile.location}
              </p>
            </div>
          </div>

          {/* Edit Profile Button */}
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 transition-all active:scale-98 cursor-pointer shrink-0"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Business Metrics Banner */}
        <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-slate-100 text-center">
          <div className="bg-slate-50 rounded-xl p-2.5">
            <p className="text-base sm:text-lg font-extrabold text-emerald-700">
              {merchantJobs.length}
            </p>
            <p className="text-[10px] text-slate-500 uppercase font-semibold">
              Posted Jobs
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-2.5">
            <p className="text-base sm:text-lg font-extrabold text-indigo-600">
              {applicants.length}
            </p>
            <p className="text-[10px] text-slate-500 uppercase font-semibold">
              Total Applicants
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-2.5">
            <p className="text-base sm:text-lg font-extrabold text-purple-600">
              {applicants.filter((a) => a.status === 'Shortlisted').length}
            </p>
            <p className="text-[10px] text-slate-500 uppercase font-semibold">
              Shortlisted
            </p>
          </div>
        </div>
      </div>

      {/* Business Details Card */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-7 shadow-xs space-y-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-emerald-600" />
          Store Profile & Verification
        </h3>

        {/* Description */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Business Description
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
            {merchantProfile.businessDescription}
          </p>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
              <User className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-semibold">Contact Person</span>
            </div>
            <p className="text-sm font-bold text-slate-900">
              {merchantProfile.contactPerson}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
              <Phone className="w-3.5 h-3.5 text-indigo-600" />
              <span className="font-semibold">Phone Number</span>
            </div>
            <p className="text-sm font-bold text-slate-900">
              {merchantProfile.phone}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
              <Mail className="w-3.5 h-3.5 text-teal-600" />
              <span className="font-semibold">Official Email</span>
            </div>
            <p className="text-sm font-bold text-slate-900">
              {merchantProfile.email}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-semibold">Merchant Status</span>
            </div>
            <p className="text-sm font-bold text-emerald-700 flex items-center gap-1">
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
