import type { skills } from "../data/skills";

export type SkillName = typeof skills[number]['skill']

export interface Project {
    id: number;
    img?: string[];
    name: string;
    description: string;
    github: string;
    preview?: string;
    category: string;
    features: string[];
    technologies: SkillName[];
}

export interface CategoryProject {
    category: string;
    label: string;
}