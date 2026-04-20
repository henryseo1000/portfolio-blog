import { SkillTypes } from "@/types/skillTypes";

import ReactLogo from "../../public/svg/react.svg";
import NextLogo from "../../public/svg/nextjs.svg";
import HTML5Logo from "../../public/svg/html5.svg";
import JavascriptLogo from "../../public/svg/javascript.svg";
import TailwindLogo from "../../public/svg/tailwind-css.svg";
import FlaskLogo from "../../public/svg/flask.svg";
import PythonLogo from "../../public/svg/python.svg";
import CppLogo from "../../public/svg/cpp.svg";
import CsharpLogo from "../../public/svg/c-sharp.svg";
import SpringLogo from "../../public/svg/spring.svg";

const skills : SkillTypes[] = [
    {
        name : "React",
        skill_level: "normal",
        category: ["front"],
        svg: <ReactLogo/>,
        description: "퍼블리싱, API 연결, 라우팅, 컴포넌트 제작 경험"
    },
    {
        name : "Next JS",
        skill_level: "normal",
        category: ["front", "back"],
        svg: <NextLogo/>,
        description: "퍼블리싱, API 제작, (동적)라우팅, 컴포넌트 제작 경험"
    },
    {
        name : "HTML",
        skill_level: "high",
        category: ["front"],
        svg: <HTML5Logo/>,
        description: "퍼블리싱, JS, CSS와 연계해 간단한 인터렉션, UI 제작"
    },
    {
        name : "JS/TS",
        skill_level: "high",
        category: ["front", "back", "game"],
        svg: <JavascriptLogo/>,
        description: "JS나 TS를 이용한 객체지향적 프로그래밍(Class / Interface 이용)"
    },
    {
        name : "Tailwind CSS",
        skill_level: "normal",
        category: ["front"],
        svg: <TailwindLogo/>,
        description: "Tailwind v3 사용 경험 보유"
    },
    {
        name : "React-Native",
        skill_level: "low",
        category: ["app"],
        svg: <ReactLogo/>,
        description: "간단한 앱 제작 경험 보유"
    },
    {
        name : "Spring",
        skill_level: "low",
        category: ["back"],
        svg: <SpringLogo/>,
        description: "MySQL / H2와 연계, 외부 API를 이용한 처리 가능"
    },
    {
        name : "C#",
        skill_level: "low",
        category: ["game"],
        svg: <CsharpLogo/>,
        description: "플래피버드 구현"
    },
    {
        name : "C/C++",
        skill_level: "high",
        category: ["embedded"],
        svg: <CppLogo/>,
        description: "기본"
    },
    {
        name : "Python",
        skill_level: "normal",
        category: ["ai", "back"],
        svg: <PythonLogo/>,
        description: "기본"
    },
    {
        name : "Flask",
        skill_level: "normal",
        category: ["ai", "back"],
        svg: <FlaskLogo className=""/>,
        description: "API 제작 가능, HTML 서버 구현 가능"
    },
];

export default skills