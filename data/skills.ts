import { LuWebhook } from "react-icons/lu";
import type { Skill } from "../types/Skill";
import { SiJavascript, SiReact, SiAngular, SiTypescript, SiNodedotjs, SiGit, SiPhp, SiSass, SiJquery, SiBootstrap, SiMysql, SiFigma, SiTailwindcss, SiNextdotjs, SiClaude, SiGooglegemini, SiPrisma, SiN8N, SiSqlite } from "react-icons/si";

export const skills: Skill[] = [
  { id: 1, skill: 'NextJs', icon: SiNextdotjs, category: 'front-end' },
  { id: 2, skill: 'React', icon: SiReact, category: 'front-end' },
  { id: 3, skill: 'TypeScript', icon: SiTypescript, category: 'front-end' },
  { id: 4, skill: 'JavaScript', icon: SiJavascript, category: 'front-end' },
  { id: 5, skill: 'Tailwind', icon: SiTailwindcss, category: 'front-end' },
  { id: 6, skill: 'Sass', icon: SiSass, category: 'front-end' },
  { id: 7, skill: 'Bootstrap', icon: SiBootstrap, category: 'front-end' },
  { id: 8, skill: 'jQuery', icon: SiJquery, category: 'front-end' },
  { id: 9, skill: 'Angular', icon: SiAngular, category: 'front-end' },
  { id: 10, skill: 'NodeJs', icon: SiNodedotjs, category: 'back-end' },
  { id: 11, skill: 'PHP', icon: SiPhp, category: 'back-end' },
  { id: 12, skill: 'Prisma (ORM)', icon: SiPrisma, category: 'database' },
  { id: 13, skill: 'MySQL', icon: SiMysql, category: 'database' },
  { id: 14, skill: 'SQLite', icon: SiSqlite, category: 'database' },
  { id: 15, skill: 'Figma', icon: SiFigma, category: 'design' },
  { id: 16, skill: 'Git', icon: SiGit, category: 'tools' },
  { id: 17, skill: 'Claude', icon: SiClaude, category: 'tools' },
  { id: 18, skill: 'MCP (Model Context Protocol)', icon: LuWebhook, category: 'tools' },
  { id: 19, skill: 'Antigravity', icon: SiGooglegemini, category: 'tools' },
  { id: 20, skill: 'n8n', icon: SiN8N, category: 'tools' },
];

export const categoriesSkills: Record<string, string> = {
  'front-end': 'Front-End',
  'back-end': 'Back-End',
  'tools': 'Ferramentas',
  'database': 'Banco de Dados',
  'design': 'Design',
};