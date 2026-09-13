export type UserRole = 'seeker' | 'merchant';

export type PageTab = 'home' | 'seeker' | 'employer';

export type ApplicationStatus =
  | 'Applied'
  | 'Under Review'
  | 'Shortlisted'
  | 'Interview'
  | 'Accepted'
  | 'Rejected';

export interface TimelineEvent {
  status: ApplicationStatus;
  date: string;
  note: string;
}

export interface SeekerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  location: string;
  skills: string[];
  availability: string;
  preferredJobType: string;
  preferredWorkingHours: string;
  maxDistanceKm: number;
  avatarUrl?: string;
  bio?: string;
}

export interface MerchantProfile {
  id: string;
  businessName: string;
  businessType: string;
  location: string;
  email: string;
  phone: string;
  contactPerson: string;
  businessDescription: string;
  avatarUrl?: string;
}

export interface User {
  id: string;
  role: UserRole;
  email: string;
  seekerProfile?: SeekerProfile;
  merchantProfile?: MerchantProfile;
}

export interface JobSeekerExtraction {
  jobType: string;
  skills: string[];
  availability: string;
  distance: string;
  rawQuery: string;
}

export interface EmployerExtraction {
  position: string;
  skills: string[];
  workingHours: string;
  salary: string;
  jobType: string;
  location: string;
  rawQuery: string;
}

export interface MatchAnalysis {
  percentage: number;
  skillsMatch: string;
  availabilityMatch: string;
  distanceMatch: string;
  jobTypeMatch: string;
}

export interface Job {
  id: string;
  title: string;
  businessName: string;
  businessCategory: 'Retail' | 'Cafe & Food' | 'Healthcare' | 'Education' | 'Logistics';
  distanceKm: number;
  distanceDisplay: string;
  workingHours: string;
  salary: string;
  requiredSkills: string[];
  jobType: string;
  locationArea: string;
  description: string;
  perks: string[];
  matchAnalysis: MatchAnalysis;
  urgencyTag?: string;
  postedTimeAgo: string;
  merchantId: string;
  applicantCount: number;
  shortlistedCount: number;
  status: 'Active' | 'Closed';
}

export interface ApplicantRecord {
  id: string;
  seekerId: string;
  name: string;
  age: number;
  distance: string;
  skills: string[];
  availability: string;
  matchPercentage: number;
  status: ApplicationStatus;
  appliedDate: string;
  jobId: string;
  jobTitle: string;
  timeline: TimelineEvent[];
  notes?: string;
}

export interface CandidateMatch {
  id: string;
  name: string;
  headline: string;
  distance: string;
  availability: string;
  skills: string[];
  matchPercentage: number;
}

export interface Application {
  id: string;
  jobId: string;
  seekerId: string;
  jobTitle: string;
  businessName: string;
  salary: string;
  workingHours: string;
  locationArea: string;
  appliedDate: string;
  status: ApplicationStatus;
  matchPercentage: number;
  timeline: TimelineEvent[];
}

export type SeekerTab = 'dashboard' | 'jobs' | 'applications' | 'saved' | 'profile';
export type MerchantTab = 'dashboard' | 'jobs' | 'applicants' | 'profile';
