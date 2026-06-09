import { LuWebhook } from "react-icons/lu";
import type { Category, Skill } from "../types/Skill";
import { SiJavascript, SiReact, SiAngular, SiTypescript, SiNodedotjs, SiGit, SiPhp, SiSass, SiJquery, SiBootstrap, SiMysql, SiFigma, SiTailwindcss, SiNextdotjs, SiClaude, SiGooglegemini } from "react-icons/si";

export const skills: Skill[] = [
  { id: 1, skill: 'NextJs', icon: SiNextdotjs, category: 'front-end' },
  { id: 2, skill: 'React', icon: SiReact, category: 'front-end' },
  { id: 3, skill: 'Tailwind', icon: SiTailwindcss, category: 'front-end' },
  { id: 4, skill: 'NodeJs', icon: SiNodedotjs, category: 'back-end' },
  { id: 5, skill: 'MCP', icon: LuWebhook, category: 'tools' },
  { id: 6, skill: 'Antigravity', icon: SiGooglegemini, category: 'tools' },
  { id: 7, skill: 'JavaScript', icon: SiJavascript, category: 'front-end' },
  { id: 8, skill: 'TypeScript', icon: SiTypescript, category: 'front-end' },
  { id: 9, skill: 'Angular', icon: SiAngular, category: 'front-end' },
  { id: 10, skill: 'Git', icon: SiGit, category: 'tools' },
  { id: 11, skill: 'PHP', icon: SiPhp, category: 'back-end' },
  { id: 12, skill: 'Sass', icon: SiSass, category: 'front-end' },
  { id: 13, skill: 'jQuery', icon: SiJquery, category: 'front-end' },
  { id: 14, skill: 'Bootstrap', icon: SiBootstrap, category: 'front-end' },
  { id: 15, skill: 'MySQL', icon: SiMysql, category: 'back-end' },
  { id: 16, skill: 'Figma', icon: SiFigma, category: 'tools' },
  { id: 17, skill: 'Claude', icon: SiClaude, category: 'tools' },
];