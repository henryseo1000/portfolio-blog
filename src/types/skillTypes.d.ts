import CategoryType from "./categoryTypes";

export interface SkillTypes {
    name: string;
    skill_level: "high" | "normal" | "low";
    category?: CategoryType[];
    svg: React.ReactNode
    description?: string;
    onClick?: () => {};
}