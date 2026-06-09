import { IconType } from "react-icons";

export interface SocialItem {
  icon: IconType;
  name: string;
  link: string;
}

export interface PersonalData {
  role: string;
  email: string;
  whatsapp: string;
  bio: string;
  socials: SocialItem[];
}

export interface ExperienceItem {
  id: number;
  period: string;
  title: string;
  company: string;
  description: string[];
}

export interface EducationItem {
  id: number;
  period: string;
  title: string;
  company: string;
  description: string[];
}

export interface ExpertiseItem {
  id: number;
  icon: IconType;
  title: string;
  description: string;
}

export interface AboutInfo {
  personalData: PersonalData;
  experiences: ExperienceItem[];
  education: EducationItem[];
  expertise: ExpertiseItem[];
}
