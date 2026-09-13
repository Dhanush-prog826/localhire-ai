import type { JobSeekerExtraction, EmployerExtraction, Job } from '../types';
import { INITIAL_JOBS } from '../data/mockData';

/**
 * Intelligent client-side AI NLP simulation.
 * Parses natural language input from job seekers into structured intent parameters.
 */
export function parseJobSeekerQuery(text: string): JobSeekerExtraction {
  const lower = text.toLowerCase();

  // 1. Extract Job Type
  let jobType = 'Part-time';
  if (lower.includes('full-time') || lower.includes('full time')) {
    jobType = 'Full-time';
  } else if (lower.includes('freelance') || lower.includes('gig')) {
    jobType = 'Freelance / Gig';
  } else if (lower.includes('internship') || lower.includes('intern')) {
    jobType = 'Internship';
  }

  // 2. Extract Skills
  const knownSkills = [
    { key: 'excel', label: 'Excel' },
    { key: 'tally', label: 'Tally ERP' },
    { key: 'barista', label: 'Coffee / Barista' },
    { key: 'cash', label: 'Cash Handling' },
    { key: 'billing', label: 'Retail Billing' },
    { key: 'math', label: 'Mathematics' },
    { key: 'teach', label: 'Teaching' },
    { key: 'computer', label: 'Computer Basics' },
    { key: 'typing', label: 'Fast Typing' },
    { key: 'pos', label: 'POS Terminal' },
    { key: 'delivery', label: 'Local Delivery' },
    { key: 'reception', label: 'Front Desk' },
    { key: 'inventory', label: 'Inventory' },
  ];

  const matchedSkills: string[] = [];
  for (const s of knownSkills) {
    if (lower.includes(s.key)) {
      matchedSkills.push(s.label);
    }
  }
  if (matchedSkills.length === 0) {
    if (lower.includes('excel') || lower.includes('sheet') || lower.includes('data')) {
      matchedSkills.push('Excel');
    } else {
      matchedSkills.push('Excel');
    }
  }

  // 3. Extract Availability
  const timeRegex = /(\d{1,2}(?::\d{2})?\s*(?:am|pm)?\s*(?:to|-|–)\s*\d{1,2}(?::\d{2})?\s*(?:am|pm))/i;
  const timeMatch = text.match(timeRegex);

  let availability = '6 PM – 10 PM';
  if (timeMatch) {
    availability = timeMatch[0].replace(/-/g, '–');
  } else if (lower.includes('evening')) {
    availability = '6 PM – 10 PM';
  } else if (lower.includes('morning')) {
    availability = '8 AM – 1 PM';
  } else if (lower.includes('afternoon')) {
    availability = '1 PM – 5 PM';
  } else if (lower.includes('weekend')) {
    availability = 'Weekends 10 AM – 6 PM';
  }

  // 4. Extract Distance
  const distRegex = /(?:within|under|in)?\s*(\d+(?:\.\d+)?)\s*(?:km|kms|kilometers)/i;
  const distMatch = text.match(distRegex);

  let distance = 'Within 5 km';
  if (distMatch) {
    distance = `Within ${distMatch[1]} km`;
  }

  return {
    jobType,
    skills: matchedSkills,
    availability,
    distance,
    rawQuery: text,
  };
}

/**
 * Parses natural language input from employers into structured hiring parameters.
 */
export function parseEmployerQuery(text: string): EmployerExtraction {
  const lower = text.toLowerCase();

  // 1. Position extraction
  let position = 'Billing Assistant';
  if (lower.includes('billing')) {
    position = 'Billing Assistant';
  } else if (lower.includes('barista') || lower.includes('cafe')) {
    position = 'Cafe Barista';
  } else if (lower.includes('clerk') || lower.includes('store')) {
    position = 'Store Clerk';
  } else if (lower.includes('front desk') || lower.includes('reception')) {
    position = 'Front Desk Executive';
  } else if (lower.includes('tutor') || lower.includes('teach')) {
    position = 'Subject Tutor';
  } else if (lower.includes('delivery')) {
    position = 'Delivery Assistant';
  }

  // 2. Skills
  const detectedSkills: string[] = [];
  if (lower.includes('excel')) detectedSkills.push('Excel');
  if (lower.includes('billing')) detectedSkills.push('Computerized Billing');
  if (lower.includes('cash')) detectedSkills.push('Cash Handling');
  if (lower.includes('pos')) detectedSkills.push('POS Terminal');
  if (lower.includes('inventory')) detectedSkills.push('Inventory Logging');
  if (detectedSkills.length === 0) detectedSkills.push('Excel', 'Billing Software');

  // 3. Working hours
  const timeRegex = /(\d{1,2}(?::\d{2})?\s*(?:am|pm)?\s*(?:to|-|–)\s*\d{1,2}(?::\d{2})?\s*(?:am|pm))/i;
  const timeMatch = text.match(timeRegex);
  let workingHours = '6 PM – 10 PM';
  if (timeMatch) {
    workingHours = timeMatch[0].replace(/-/g, '–');
  }

  // 4. Salary
  const salaryRegex = /(?:₹|rs\.?|inr)?\s*(\d{1,2}(?:,\d{3})+|\d{3,6})\s*(?:per\s*month|\/month|\/mo|pm)?/i;
  const salaryMatch = text.match(salaryRegex);
  let salary = '₹6,000/month';
  if (salaryMatch) {
    salary = `₹${salaryMatch[1]}/month`;
  }

  // 5. Job type
  let jobType = 'Part-time';
  if (lower.includes('full time') || lower.includes('full-time')) {
    jobType = 'Full-time';
  }

  // 6. Location
  let location = 'Main Market, Sector 14';
  if (lower.includes('sector 14')) {
    location = 'Sector 14, Main Market';
  } else if (lower.includes('arcade')) {
    location = 'High Street Arcade';
  }

  return {
    position,
    skills: detectedSkills,
    workingHours,
    salary,
    jobType,
    location,
    rawQuery: text,
  };
}

/**
 * Filter and sort jobs based on parsed seeker criteria.
 */
export function filterAndRankJobs(extraction: JobSeekerExtraction, allJobs: Job[] = INITIAL_JOBS): Job[] {
  const isDefaultQuery =
    extraction.rawQuery.toLowerCase().includes('6 pm to 10 pm') &&
    extraction.rawQuery.toLowerCase().includes('excel');

  if (isDefaultQuery) {
    return allJobs.slice(0, 3);
  }

  const parsedDistKm = parseFloat(extraction.distance.replace(/[^\d.]/g, '')) || 5;

  return allJobs
    .map((job) => {
      let score = 70;
      if (job.distanceKm <= parsedDistKm) {
        score += 12;
      } else {
        score -= 15;
      }

      const hasSkill = extraction.skills.some((skill) =>
        job.requiredSkills.some((r) => r.toLowerCase().includes(skill.toLowerCase()))
      );
      if (hasSkill) score += 12;

      const finalScore = Math.min(96, Math.max(65, score));

      return {
        ...job,
        matchAnalysis: {
          ...job.matchAnalysis,
          percentage: finalScore,
          skillsMatch: hasSkill
            ? `Direct skill alignment: Your background in ${extraction.skills.join(', ')} matches this role.`
            : `Transferable skills: Good entry-level match with quick training provided.`,
          distanceMatch:
            job.distanceKm <= parsedDistKm
              ? `Within your ${extraction.distance} radius (${job.distanceDisplay}).`
              : `Slightly beyond your requested radius (${job.distanceDisplay}).`,
        },
      };
    })
    .sort((a, b) => b.matchAnalysis.percentage - a.matchAnalysis.percentage)
    .slice(0, 3);
}
