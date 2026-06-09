import { IconType } from "react-icons";

export interface Skill {
  id: number;
  skill: string;
  icon: IconType;
  category: string;
}

export interface Category {
  category: string;
  label: string;
}
