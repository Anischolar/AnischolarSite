
export interface FormData {
  fullName: string;
  email: string;
  phone: string;
  jobTitle: string;
  company: string;
  skills: string[];
  experience: string;
  education: string;
  achievements: string;
  whyInterested: string;
  additionalInfo?: string;
}

export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  skills: string[];
  experience: string;
  education: string;
  interests: string[];
  achievements: string;
}

export interface JobApplicationData {
  jobTitle: string;
  company: string;
  whyInterested: string;
  additionalInfo?: string;
}

export interface AchievementData {
  achievements: string;
  additionalInfo?: string;
}

export interface GeneratedLetter {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

export interface AIExpandRequestField {
  field: 'whyInterested' | 'achievements';
  currentValue: string;
  jobTitle?: string;
  company?: string;
  skills?: string[];
}

export interface AIExpandResponse {
  expandedContent: string;
}

