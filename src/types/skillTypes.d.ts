export interface SkillTypes {
    name: string;
    skill_level: "high" | "normal" | "low";
    category?: "front" | "back" | "embedded" | "cloud" | "App";
    svg: React.ReactNode
    description?: string;
}