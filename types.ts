
export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  demoUrl: string;
  repoUrl: string;
  videoUrl?: string; // Added for recorded demonstrations
  isCapstone?: boolean;
  features?: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  level?: string;
  url?: string;
  skills?: string[];
}

export interface Reference {
  name: string;
  role: string;
  company: string;
  contact: string;
  email: string | null;
}

export interface UserProfile {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone?: string;
  linkedin: string;
  github: string;
  location: string;
  about: string;
  futureGoals: string;
}

export interface ResumeData {
  summary: string;
  experience: {
    role: string;
    company: string;
    duration: string;
    points: string[];
  }[];
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
}

export enum AppMode {
  VIEW = 'VIEW',
  EDIT = 'EDIT',
  PRESENTATION = 'PRESENTATION',
  RESUME_OPTIMIZER = 'RESUME_OPTIMIZER'
}
