import { SkillTypes } from "@/types/skillTypes";

import ReactLogo from "../../public/svg/react.svg";
import NextLogo from "../../public/svg/nextjs.svg";
import HTML5Logo from "../../public/svg/html5.svg";
import JavascriptLogo from "../../public/svg/javascript.svg";
import TailwindLogo from "../../public/svg/tailwind-css.svg";

const skills : SkillTypes[] = [
    {
        name : "React",
        skill_level: "normal",
        category: ["front"],
        svg: <ReactLogo/>,
        description: "관련 프로젝트 / 글"
    },
    {
        name : "Next JS",
        skill_level: "normal",
        category: ["front", "back"],
        svg: <NextLogo/>,
        description: "관련 프로젝트 / 글"
    },
    {
        name : "HTML",
        skill_level: "high",
        category: ["front"],
        svg: <HTML5Logo/>,
        description: "관련 프로젝트 / 글"
    },
    {
        name : "JS/TS",
        skill_level: "high",
        category: ["front", "back", "game"],
        svg: <JavascriptLogo/>,
        description: "관련 프로젝트 / 글"
    },
    {
        name : "Tailwind CSS",
        skill_level: "normal",
        category: ["front"],
        svg: <TailwindLogo/>,
        description: "관련 프로젝트 / 글"
    },
    {
        name : "React-Native",
        skill_level: "low",
        category: ["app"],
        svg: <ReactLogo/>,
        description: "관련 프로젝트 / 글"
    },
    {
        name : "Spring",
        skill_level: "low",
        category: ["back"],
        svg: <ReactLogo/>,
        description: "관련 프로젝트 / 글"
    },
    {
        name : "C#",
        skill_level: "low",
        category: ["game"],
        svg: <ReactLogo/>,
        description: "관련 프로젝트 / 글"
    },
    {
        name : "C/C++",
        skill_level: "high",
        category: ["embedded"],
        svg: <ReactLogo/>,
        description: "관련 프로젝트 / 글"
    },
    {
        name : "Python",
        skill_level: "normal",
        category: ["ai", "back"],
        svg: <ReactLogo/>,
        description: "관련 프로젝트 / 글"
    },
];

export default skills