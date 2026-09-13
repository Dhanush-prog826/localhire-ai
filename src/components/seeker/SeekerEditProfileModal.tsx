import React, { useState } from 'react';
import type { SeekerProfile } from '../../types';
import { X, Save, User, MapPin, Clock, Briefcase, Wrench, Navigation } from 'lucide-react';

interface SeekerEditProfileModalProps {
  profile: SeekerProfile;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: Partial<SeekerProfile>) => void;
}

export const SeekerEditProfileModal: React.FC<SeekerEditProfileModalProps> = ({
  profile,
  isOpen,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState<string>(profile.name);
  const [age, setAge] = useState<number>(profile.age);
  const [location, setLocation] = useState<string>(profile.location);
  const [skillsText, setSkillsText] = useState<string>(profile.skills.join(', '));
  const [availability, setAvailability] = useState<string>(profile.availability);
  const [preferredJobType, setPreferredJobType] = useState<string>(profile.preferredJobType);
  const [preferredWorkingHours, setPreferredWorkingHours] = useState<string>(
    profile.preferredWorkingHours
  );
  const [maxDistanceKm, setMaxDistanceKm] = useState<number>(profile.maxDistanceKm);
  const [bio, setBio] = useState<string>(profile.bio || '');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const skillsArray = skillsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    onSave({
      name,
      age: Number(age),
      location,
      skills: skillsArray.length > 0 ? skillsArray : ['Excel'],
      availability,
      preferredJobType,
      preferredWorkingHours,
      maxDistanceKm: Number(maxDistanceKm),
      bio,
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
            <h3 className="text-lg font-mono font-bold uppercase tracking-wider text-zinc-100">Edit Job Seeker Profile</h3>
            <p className="text-xs font-mono text-zinc-400">
              Update parameters for AI hyperlocal job matching
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close edit profile dialog"
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
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 font-mono focus:outline-none focus:border-red-600/70"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-1">
                Age (years)
              </label>
              <input
                type="number"
                required
                min={16}
                max={70}
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-3 py-2 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 font-mono focus:outline-none focus:border-red-600/70"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-1">
              Your Location
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-red-500 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Sector 14, Main Road"
                className="w-full pl-9 pr-3 py-2 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 font-mono focus:outline-none focus:border-red-600/70"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-1">
              Skills (comma separated)
            </label>
            <div className="relative">
              <Wrench className="w-4 h-4 text-orange-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={skillsText}
                onChange={(e) => setSkillsText(e.target.value)}
                placeholder="Excel, Billing, Fast Typing, Cash Handling"
                className="w-full pl-9 pr-3 py-2 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 font-mono focus:outline-none focus:border-red-600/70"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-1">
                Availability
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-amber-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  placeholder="6 PM – 10 PM"
                  className="w-full pl-9 pr-3 py-2 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 font-mono focus:outline-none focus:border-red-600/70"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-1">
                Preferred Working Hours
              </label>
              <input
                type="text"
                required
                value={preferredWorkingHours}
                onChange={(e) => setPreferredWorkingHours(e.target.value)}
                placeholder="6 PM – 10 PM"
                className="w-full px-3 py-2 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 font-mono focus:outline-none focus:border-red-600/70"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-1">
                Preferred Job Type
              </label>
              <div className="relative">
                <Briefcase className="w-4 h-4 text-red-400 absolute left-3 top-3" />
                <select
                  value={preferredJobType}
                  onChange={(e) => setPreferredJobType(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 font-mono focus:outline-none focus:border-red-600/70"
                >
                  <option value="Part-time">Part-time</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Freelance / Gig">Freelance / Gig</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-1">
                Max Travel Distance (km)
              </label>
              <div className="relative">
                <Navigation className="w-4 h-4 text-red-500 absolute left-3 top-3" />
                <input
                  type="number"
                  required
                  min={1}
                  max={30}
                  value={maxDistanceKm}
                  onChange={(e) => setMaxDistanceKm(Number(e.target.value))}
                  className="w-full pl-9 pr-3 py-2 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 font-mono focus:outline-none focus:border-red-600/70"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-1">
              Short Bio / Introduction
            </label>
            <textarea
              rows={2}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell nearby businesses about your work background..."
              className="w-full px-3 py-2 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 font-mono focus:outline-none focus:border-red-600/70 resize-none"
            />
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
              className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-mono font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-red-950 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>SAVE CHANGES</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
