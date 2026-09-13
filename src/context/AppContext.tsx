import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  User,
  UserRole,
  SeekerProfile,
  MerchantProfile,
  Job,
  Application,
  ApplicantRecord,
  ApplicationStatus,
} from '../types';
import {
  DEMO_SEEKER_PROFILE,
  DEMO_MERCHANT_PROFILE,
  INITIAL_JOBS,
  INITIAL_APPLICATIONS,
  INITIAL_APPLICANTS,
} from '../data/mockData';

interface AppContextType {
  currentUser: User | null;
  seekerProfile: SeekerProfile;
  merchantProfile: MerchantProfile;
  jobs: Job[];
  applications: Application[];
  applicants: ApplicantRecord[];
  savedJobIds: string[];
  login: (role: UserRole, email?: string, isDemo?: boolean) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  applyToJob: (job: Job) => { success: boolean; message: string };
  toggleSaveJob: (jobId: string) => boolean;
  updateApplicationStatus: (
    recordId: string,
    newStatus: ApplicationStatus,
    note?: string
  ) => void;
  updateSeekerProfile: (updated: Partial<SeekerProfile>) => void;
  updateMerchantProfile: (updated: Partial<MerchantProfile>) => void;
  createJob: (newJob: Partial<Job>) => Job;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Current user state (starts with demo seeker or null for login portal)
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('localhire_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return {
      id: DEMO_SEEKER_PROFILE.id,
      role: 'seeker',
      email: DEMO_SEEKER_PROFILE.email,
      seekerProfile: DEMO_SEEKER_PROFILE,
    };
  });

  // 2. Seeker Profile state
  const [seekerProfile, setSeekerProfile] = useState<SeekerProfile>(() => {
    const saved = localStorage.getItem('localhire_seeker_profile');
    return saved ? JSON.parse(saved) : DEMO_SEEKER_PROFILE;
  });

  // 3. Merchant Profile state
  const [merchantProfile, setMerchantProfile] = useState<MerchantProfile>(() => {
    const saved = localStorage.getItem('localhire_merchant_profile');
    return saved ? JSON.parse(saved) : DEMO_MERCHANT_PROFILE;
  });

  // 4. Jobs state
  const [jobs, setJobs] = useState<Job[]>(() => {
    const saved = localStorage.getItem('localhire_jobs');
    return saved ? JSON.parse(saved) : INITIAL_JOBS;
  });

  // 5. Seeker Applications state
  const [applications, setApplications] = useState<Application[]>(() => {
    const saved = localStorage.getItem('localhire_applications');
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  // 6. Merchant Applicants state
  const [applicants, setApplicants] = useState<ApplicantRecord[]>(() => {
    const saved = localStorage.getItem('localhire_applicants');
    return saved ? JSON.parse(saved) : INITIAL_APPLICANTS;
  });

  // 7. Saved Jobs
  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('localhire_saved_jobs');
    return saved ? JSON.parse(saved) : ['job-2'];
  });

  // Synchronize to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('localhire_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('localhire_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('localhire_seeker_profile', JSON.stringify(seekerProfile));
  }, [seekerProfile]);

  useEffect(() => {
    localStorage.setItem('localhire_merchant_profile', JSON.stringify(merchantProfile));
  }, [merchantProfile]);

  useEffect(() => {
    localStorage.setItem('localhire_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('localhire_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('localhire_applicants', JSON.stringify(applicants));
  }, [applicants]);

  useEffect(() => {
    localStorage.setItem('localhire_saved_jobs', JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  // Login handler
  const login = (role: UserRole, email: string = '') => {
    if (role === 'seeker') {
      const user: User = {
        id: seekerProfile.id,
        role: 'seeker',
        email: email || seekerProfile.email,
        seekerProfile,
      };
      setCurrentUser(user);
    } else {
      const user: User = {
        id: merchantProfile.id,
        role: 'merchant',
        email: email || merchantProfile.email,
        merchantProfile,
      };
      setCurrentUser(user);
    }
  };

  // Logout handler
  const logout = () => {
    setCurrentUser(null);
  };

  // Quick Role Switcher
  const switchRole = (newRole: UserRole) => {
    if (newRole === 'seeker') {
      setCurrentUser({
        id: seekerProfile.id,
        role: 'seeker',
        email: seekerProfile.email,
        seekerProfile,
      });
    } else {
      setCurrentUser({
        id: merchantProfile.id,
        role: 'merchant',
        email: merchantProfile.email,
        merchantProfile,
      });
    }
  };

  // Seeker applies to a job
  const applyToJob = (job: Job) => {
    const existing = applications.find((a) => a.jobId === job.id);
    if (existing) {
      return { success: false, message: `You have already applied for ${job.title}!` };
    }

    const todayDate = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
    });
    const nowTime = new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    // 1. Create Application for Job Seeker
    const newApp: Application = {
      id: `app-${Date.now()}`,
      jobId: job.id,
      seekerId: seekerProfile.id,
      jobTitle: job.title,
      businessName: job.businessName,
      salary: job.salary,
      workingHours: job.workingHours,
      locationArea: job.locationArea,
      appliedDate: todayDate,
      status: 'Applied',
      matchPercentage: job.matchAnalysis.percentage,
      timeline: [
        {
          status: 'Applied',
          date: `${todayDate}, ${nowTime}`,
          note: `Application submitted with your AI profile (${seekerProfile.skills.slice(0, 2).join(', ')}, ${seekerProfile.availability}).`,
        },
      ],
    };

    // 2. Create ApplicantRecord for Merchant
    const newApplicantRecord: ApplicantRecord = {
      id: `app-rec-${seekerProfile.id}-${job.id}`,
      seekerId: seekerProfile.id,
      jobId: job.id,
      jobTitle: job.title,
      name: seekerProfile.name,
      age: seekerProfile.age,
      distance: `${job.distanceKm} km away`,
      skills: seekerProfile.skills,
      availability: seekerProfile.availability,
      matchPercentage: job.matchAnalysis.percentage,
      status: 'Applied',
      appliedDate: todayDate,
      timeline: newApp.timeline,
      notes: `New application received via LocalHire AI match.`,
    };

    setApplications((prev) => [newApp, ...prev]);
    setApplicants((prev) => [newApplicantRecord, ...prev]);

    // 3. Increment Job applicant count
    setJobs((prev) =>
      prev.map((j) =>
        j.id === job.id ? { ...j, applicantCount: j.applicantCount + 1 } : j
      )
    );

    return { success: true, message: `Application submitted to ${job.businessName}!` };
  };

  // Toggle Save Job
  const toggleSaveJob = (jobId: string) => {
    let saved = false;
    setSavedJobIds((prev) => {
      if (prev.includes(jobId)) {
        saved = false;
        return prev.filter((id) => id !== jobId);
      } else {
        saved = true;
        return [...prev, jobId];
      }
    });
    return saved;
  };

  // Merchant updates application status (Shortlist, Reject, Interview, Accept)
  const updateApplicationStatus = (
    recordId: string,
    newStatus: ApplicationStatus,
    note?: string
  ) => {
    const todayDate = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
    });
    const nowTime = new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    let targetJobId = '';
    let targetSeekerId = '';

    // 1. Update applicant record
    setApplicants((prev) =>
      prev.map((rec) => {
        if (rec.id === recordId) {
          targetJobId = rec.jobId;
          targetSeekerId = rec.seekerId;
          const newEvent = {
            status: newStatus,
            date: `${todayDate}, ${nowTime}`,
            note:
              note ||
              `Status updated to "${newStatus}" by ${merchantProfile.businessName}.`,
          };
          return {
            ...rec,
            status: newStatus,
            timeline: [...rec.timeline, newEvent],
          };
        }
        return rec;
      })
    );

    // 2. Synchronize to Job Seeker's application view
    setApplications((prev) =>
      prev.map((app) => {
        if (
          (targetSeekerId && app.seekerId === targetSeekerId && app.jobId === targetJobId) ||
          app.id === recordId
        ) {
          const newEvent = {
            status: newStatus,
            date: `${todayDate}, ${nowTime}`,
            note:
              note ||
              `Status updated to "${newStatus}" by ${merchantProfile.businessName}.`,
          };
          return {
            ...app,
            status: newStatus,
            timeline: [...app.timeline, newEvent],
          };
        }
        return app;
      })
    );

    // 3. If new status is Shortlisted, update job count metrics
    if (newStatus === 'Shortlisted') {
      setJobs((prev) =>
        prev.map((j) =>
          j.id === targetJobId ? { ...j, shortlistedCount: j.shortlistedCount + 1 } : j
        )
      );
    }
  };

  // Update Seeker Profile
  const updateSeekerProfile = (updated: Partial<SeekerProfile>) => {
    setSeekerProfile((prev) => {
      const next = { ...prev, ...updated };
      if (currentUser && currentUser.role === 'seeker') {
        setCurrentUser({ ...currentUser, seekerProfile: next });
      }
      return next;
    });
  };

  // Update Merchant Profile
  const updateMerchantProfile = (updated: Partial<MerchantProfile>) => {
    setMerchantProfile((prev) => {
      const next = { ...prev, ...updated };
      if (currentUser && currentUser.role === 'merchant') {
        setCurrentUser({ ...currentUser, merchantProfile: next });
      }
      return next;
    });
  };

  // Merchant creates a new job
  const createJob = (newJobData: Partial<Job>): Job => {
    const newJob: Job = {
      id: `job-${Date.now()}`,
      title: newJobData.title || 'Billing Assistant',
      businessName: merchantProfile.businessName,
      businessCategory: (newJobData.businessCategory as any) || 'Retail',
      distanceKm: 2.1,
      distanceDisplay: '2.1 km away',
      workingHours: newJobData.workingHours || '6 PM – 10 PM',
      salary: newJobData.salary || '₹6,000/month',
      requiredSkills: newJobData.requiredSkills || ['Excel required', 'Billing'],
      jobType: newJobData.jobType || 'Part-time',
      locationArea: merchantProfile.location,
      description:
        newJobData.description ||
        `Looking for part-time staff for ${newJobData.title || 'billing'}. Hours: ${newJobData.workingHours || '6 PM – 10 PM'}.`,
      perks: ['Weekly off', 'Friendly staff', 'On-time monthly pay'],
      urgencyTag: 'Just Posted',
      postedTimeAgo: 'Just now',
      merchantId: merchantProfile.id,
      applicantCount: 0,
      shortlistedCount: 0,
      status: 'Active',
      matchAnalysis: {
        percentage: 95,
        skillsMatch: 'High alignment with your listed profile skills.',
        availabilityMatch: 'Matches your preferred evening working hours.',
        distanceMatch: `Within walking distance from ${merchantProfile.location}.`,
        jobTypeMatch: 'Part-time micro-shift fit.',
      },
    };

    setJobs((prev) => [newJob, ...prev]);
    return newJob;
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        seekerProfile,
        merchantProfile,
        jobs,
        applications,
        applicants,
        savedJobIds,
        login,
        logout,
        switchRole,
        applyToJob,
        toggleSaveJob,
        updateApplicationStatus,
        updateSeekerProfile,
        updateMerchantProfile,
        createJob,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
