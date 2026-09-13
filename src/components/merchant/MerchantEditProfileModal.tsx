import React, { useState } from 'react';
import type { MerchantProfile } from '../../types';
import { X, Save, Store, MapPin, Phone, Mail, User, FileText } from 'lucide-react';

interface MerchantEditProfileModalProps {
  profile: MerchantProfile;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: Partial<MerchantProfile>) => void;
}

export const MerchantEditProfileModal: React.FC<MerchantEditProfileModalProps> = ({
  profile,
  isOpen,
  onClose,
  onSave,
}) => {
  const [businessName, setBusinessName] = useState<string>(profile.businessName);
  const [businessType, setBusinessType] = useState<string>(profile.businessType);
  const [location, setLocation] = useState<string>(profile.location);
  const [contactPerson, setContactPerson] = useState<string>(profile.contactPerson);
  const [email, setEmail] = useState<string>(profile.email);
  const [phone, setPhone] = useState<string>(profile.phone);
  const [businessDescription, setBusinessDescription] = useState<string>(
    profile.businessDescription
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      businessName,
      businessType,
      location,
      contactPerson,
      email,
      phone,
      businessDescription,
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative bg-zinc-950 rounded-3xl shadow-2xl border border-red-900/60 w-full max-w-lg overflow-hidden z-10 my-auto">
        {/* Top laser line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600 via-orange-500 to-red-600" />

        {/* Header */}
        <div className="bg-gradient-to-r from-zinc-950 via-red-950/60 to-zinc-950 p-5 text-white flex items-center justify-between border-b border-red-950/60">
          <div>
            <h3 className="text-lg font-mono font-bold uppercase tracking-wider text-zinc-100">Edit Merchant Business Profile</h3>
            <p className="text-xs font-mono text-zinc-400">
              Update store information displayed to nearby candidates
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close edit merchant dialog"
            className="w-8 h-8 rounded-full bg-zinc-900/80 hover:bg-red-950/80 text-zinc-400 hover:text-white border border-zinc-800 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-1">
                Business Name
              </label>
              <div className="relative">
                <Store className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 font-mono focus:outline-none focus:border-red-600/70"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-1">
                Business Type
              </label>
              <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 font-mono focus:outline-none focus:border-red-600/70"
              >
                <option value="Retail & Grocery">Retail & Grocery</option>
                <option value="Cafe & Restaurant">Cafe & Restaurant</option>
                <option value="Healthcare & Clinic">Healthcare & Clinic</option>
                <option value="Education & Coaching">Education & Coaching</option>
                <option value="Logistics & Delivery">Logistics & Delivery</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-1">
              Store / Business Location
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-red-500 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Shop 12, Main Market, Sector 14"
                className="w-full pl-9 pr-3 py-2 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 font-mono focus:outline-none focus:border-red-600/70"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-1">
              Contact Person / Hiring Manager
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-orange-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                placeholder="Rajesh Gupta (Store Manager)"
                className="w-full pl-9 pr-3 py-2 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 font-mono focus:outline-none focus:border-red-600/70"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-1">
                Official Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-amber-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 font-mono focus:outline-none focus:border-red-600/70"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-red-500 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 font-mono focus:outline-none focus:border-red-600/70"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-1">
              Business Description
            </label>
            <div className="relative">
              <FileText className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
              <textarea
                rows={3}
                required
                value={businessDescription}
                onChange={(e) => setBusinessDescription(e.target.value)}
                placeholder="Describe your store, operating hours, and work culture..."
                className="w-full pl-9 pr-3 py-2 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 font-mono focus:outline-none focus:border-red-600/70 resize-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono font-semibold text-zinc-400 hover:text-zinc-200 bg-zinc-900 border border-zinc-800 rounded-xl transition-colors cursor-pointer"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-mono font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-red-950 active:scale-98 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>SAVE PROFILE</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
